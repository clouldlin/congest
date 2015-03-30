OpenLayers.ProxyHost 	= "/CongestionMapV2/cgi-bin/proxy.cgi?url=";

// 상수 설정
var INIT_LON			= 14243425.793355;
var INIT_LAT			= 4342305.8698004;
var INIT_LEVEL			= 8;

// 지도 객체
var map 				= null;
var info;
var searchMarkers		= null;

// 기본 레이어 객체
var vBase				= null;		// 일반
var vSatellite			= null;		// 위성
var vHybrid				= null;		// 겹쳐보기

// 외부 레이어 객체
var gRoadMap			= null;
var gSatelliteMap		= null;
var openStreetMap 		= null;

// 레이어 이름
var CIRL_LAYER			= "CIRL_LAYER";

// 현재 생성된 존 레이어 객체
var gCurrentZoneLayer_sido 		= null;
var gCurrentZoneLayer_sigungu	= null;
var gCurrentZoneLayer_emd 		= null;

// 디버그용 함수
var DEBUG_MSG_ALERT		= 0;
var DEBUG_MSG_WINDOW	= 1;
function debug_msg(msg, option)
{
	// default 매개 변수 지정
	option = option || 0;

	switch (option) 
	{
		case DEBUG_MSG_ALERT: 	alert(msg);		break;
		case DEBUG_MSG_WINDOW: 	alert(msg);		break; 
		default: 				alert(msg); 	break;
	}
}

// 실시간 교통 정보에서 WMS 데이터를 받아오기 위한 콜백 함수
function callback_ITSTrafficInfo_GetURL(bounds) 
{
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();

	var path = "http://openapi.its.go.kr/api/wmtsTile?key=1415602655312&zoom="+z+"&row="+y+"&col="+x;
//	alert (path);
	return path;
}

// HTML body가 로드 될 때 초기화 작업 수행
function init()
{
	// 각종 데이터 초기화
	initData();

	// 지도 초기화
	initMap();
}

var arConIndicatorName;				// 혼잡지표
var arConIndicatorZoneName;			// 혼잡지표 - 행정구역
var arConIndicatorRoadLevelName;	// 혼잡지표 - 도로등급
function initData()
{
	arConIndicatorName = new Array(4);
	arConIndicatorName[0] = "con";
	arConIndicatorName[1] = "co2";
	arConIndicatorName[2] = "fuel";
	arConIndicatorName[3] = "delay";

	arConIndicatorZoneName = new Array(3);
	arConIndicatorZoneName[0] = "zone_sido_";
	arConIndicatorZoneName[1] = "zone_sigungu_";
	arConIndicatorZoneName[2] = "zone_emd_";

	arConIndicatorRoadLevelName = new Array(7);
	arConIndicatorRoadLevelName[0] = 101;
	arConIndicatorRoadLevelName[1] = 102;
	arConIndicatorRoadLevelName[2] = 103;
	arConIndicatorRoadLevelName[3] = 104;
	arConIndicatorRoadLevelName[4] = 105;
	arConIndicatorRoadLevelName[5] = 106;
	arConIndicatorRoadLevelName[6] = 107;
}

// 지도 초기화 작업
function initMap()
{
//	debug_msg("지도 초기화 작업 시작!");

	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
	OpenLayers.Util.onImageLoadErrorColor = "transparent";
		
	var maxBounds	= new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
	var tileSize	= new OpenLayers.Size(256, 256);
	
	var options = {
		maxExtent: maxBounds,			// 지도 영역이 표현하는 지도의 실세계 영역
		restrictedExtent: maxBounds,
		titleSize: tileSize,			// 지도 영역에 불러올 타일 이미지의 가로/세로 사이즈
		numZoomLevels: 21,				// 지도의 줌 레벨
		maxResolution: 156543.0339,		// 지도의 해상도
//		allOverlays: true,
		controls: [],					// 지도를 컨트롤하는 컨트롤러
//		eventListeners: {zoomend: setTextScale, "move": moveEvent},
		projection: 'EPSG:900913',		// 지도의 좌표계
		displayProjection: 'EPSG:4326',
//		allOverlays: true,				// 모든 지도의 레이어를 띄운다.
		units: 'm'
	};

	// 지도 객체와 DIV 연결
	map = new OpenLayers.Map('map', options);

	// 레이어 생성
	createLayer_Default();
//	createLayer_Zone();
//	createLayer_ZoneLink();
	createLayer_GoogleMaps();
	createLayer_OpenStreetMap();
	createLayer_ITSTrafficInfo();
	
	// WMSGetFeatureInfo
	setWMSGetFeatureInfo();

	// Controls 설정
//	map.addControl(new OpenLayers.Control.LayerSwitcher());		// 레이어 목록을 나열하고 레이어 별 on/off 를 설정하는 컨트롤
	map.addControl(new OpenLayers.Control.PanZoomBar());		// 지도 이동/확대할 수 있는 기능을 가지는 컨트롤
	map.addControl(new OpenLayers.Control.MousePosition());		// 지도 영역 위에 마우스 포인터 위치를 실세계 좌표로 변환하여 지도 영역 하단에 표시
	map.addControl(new OpenLayers.Control.Navigation());		// 지도를 마우스를 이용하여 상하좌우로 이동하고 마우스 휠을 통해 확대/축소
	map.addControl(new OpenLayers.Control.ScaleLine());			// 지도 화면에 현재 축척 표시
//	map.addControl(new OpenLayers.Control.Graticule());			// 지도 위에 경위도 격자선 생성
//	map.addControl(new OpenLayers.Control.Attribution({separator:" "}));
/*	map.addControl(new OpenLayers.Control.OverviewMap({
		size: new OpenLayers.Size(100, 100),
		layers: [map.layers[1].clone(), map.layers[0].clone()],
		maximized: true}));										// 미니맵: 생성시 오류 발생?? - 2014.11.10
*/
	var mapBounds = new OpenLayers.Bounds(123.75, 32.063956, 131.000977, 44.402392);
	map.zoomToExtent(mapBounds.transform(map.displayProjection, map.projection)); //vworld 영역으로 중심점 설정

	map.setCenter(new OpenLayers.LonLat(INIT_LON, INIT_LAT), INIT_LEVEL);
//	map.zoomTo(INIT_LEVEL);
	
	// 검색 결과용 Marker를 생성
	searchMarkers = new OpenLayers.Layer.Markers("SearchResultMarkers");   			
    map.addLayer(searchMarkers);
}

// 레이어 클릭시 정보를 보여주기 위한 처리
function setWMSGetFeatureInfo()
{
	// 참고: http://www.berndresch.com/blog/2011/11/01/installing-a-cgi-proxy-on-tomcat/
	info = new OpenLayers.Control.WMSGetFeatureInfo({
        url: 'http://192.168.40.26/geoserver/qbicmapV2/wms', 
//		layerUrls: ["http://localhost:8080/geoserver/gwc/service/wms"],
        title: 'FeatureInfoByClicking',
        queryVisible: true,
        eventListeners: {
            getfeatureinfo: function(event) 
            {
//            	alert("이벤트 등록!");
            	var msg = event.text;
            	if (msg.length <= 0) {
            		msg = "System could not get WMS feature information!"
            	}
                map.addPopup(new OpenLayers.Popup.FramedCloud("defaultFeatureInfo", map.getLonLatFromPixel(event.xy), null, event.text, null, true));
            }
        }
    });
    map.addControl(info);
    info.activate();
}

// 기본 레이어 생성
function createLayer_Default()
{	 
	// 일반
	vBase 		= new vworld.Layers.Base('VBASE');		
	map.addLayer(vBase);
	// 위성		
	vSatellite	= new vworld.Layers.Satellite('VSAT');	
	map.addLayer(vSatellite);	
	// 겹쳐보기
	vHybrid		= new vworld.Layers.Hybrid('VHYBRID');	
	map.addLayer(vHybrid);		
}

// 행정구역(Zone) 레이어 생성
function createLayer_Zone()
{
	for (var i = 0 ; i < arConIndicatorName.length ; i++) 
	{
		// Zone Layer
		for (var j = 0 ; j < arConIndicatorZoneName.length ; j++) 
		{
			var tlayername = arConIndicatorZoneName[j] + arConIndicatorName[i];
			var tparamlayers = 'qbicmapV2:' + tlayername;
			var tlayer = new OpenLayers.Layer.WMS(
				tlayername,
				'http://192.168.40.26/geoserver/qbicmapV2/wms',
				{
					layers : tparamlayers,
					isBaseLayer : false,		// 해당 옵션을 주어야 오버레이가능
					transparent : true
				}
			);
			tlayer.setVisibility(false);
			map.addLayer(tlayer);
		}
	}
}

// 행정구역(Zone), 도로등급(Link) 레이어 생성
/*function createLayer_ZoneLink()
{
	for (var i = 0 ; i < arConIndicatorName.length ; i++) 
	{
		// Zone Layer
		for (var j = 0 ; j < arConIndicatorZoneName.length ; j++) 
		{
			var tlayername = arConIndicatorZoneName[j] + arConIndicatorName[i];
			var tparamlayers = 'qbicmapV2:' + tlayername;
//			alert("msg: " + tparamlayers);
			var tlayer = new OpenLayers.Layer.WMS(
				tlayername,
				'http://192.168.40.26/geoserver/qbicmapV2/wms',
				{
					layers : tparamlayers,
					isBaseLayer : false,		// 해당 옵션을 주어야 오버레이가능
					transparent : true
				}
			);
			tlayer.setVisibility(false);
			map.addLayer(tlayer);
		}
		
		// Link Layer
		for (var j = 0 ; j < arConIndicatorRoadLevelName.length ; j++) 
		{
			var tparamlayers = "klink_congestion_" + arConIndicatorName[i]; 
			var tlayername = tparamlayers + "_" + arConIndicatorRoadLevelName[j];
			var cqlfilter = "road_rank = " + arConIndicatorRoadLevelName[j];
//			var cqlfilter = "road_rank in (101, 102)";	// 이런식으로 이용도 가능하다.
			var tlayer = new OpenLayers.Layer.WMS(
				tlayername,
				'http://192.168.40.26/geoserver/qbicmapV2/wms',
				{
					layers : tparamlayers,
					isBaseLayer : false,		// 해당 옵션을 주어야 오버레이가능
					CQL_FILTER: cqlfilter,		// 필터 적용
					transparent : true				
				}
			);
			tlayer.setVisibility(false);
			map.addLayer(tlayer);
		}
	}
}
*/
// 구글 지도 레이어 생성
function createLayer_GoogleMaps()
{
	if (null != map)
	{
//*
		gRoadMap = new OpenLayers.Layer.Google("Google Roadmap", {
			type: google.maps.MapTypeId.ROADMAP,
			sphericalMercator: true
		});
		map.addLayer(gRoadMap);
//		gslayer.mapObject.addOverlay(new GStreetviewOverlay());
/*/ 	
		// customed style 적용
		gRoadMap = new OpenLayers.Layer.Google("Google Roadmap", {
			type: 'styled'
		});
		map.addLayer(gRoadMap);

		var stylez = [{
			featureType: "all", 
			elementType: "all", 
			stylers: [ { visibility: "simplified" }, 
			{ gamma: 0.50 }, 
			{ saturation: -100 } ] 
		}];

		var styledMapOptions = {name: "Styled Map"};
		var styledMapType = new google.maps.StyledMapType(stylez, styledMapOptions);

		alert("adsf");
		gRoadMap.mapObject.mapTypes.set('styled', styledMapType);
	    gRoadMap.mapObject.setMapTypeId('styled');
//*/		
		gSatelliteMap = new OpenLayers.Layer.Google("Google Satellite", {
			type: google.maps.MapTypeId.SATELLITE,
			sphericalMercator: true
		});		
		map.addLayer(gSatelliteMap);
/*
		var tlayer = null;
		tlayer = new OpenLayers.Layer.Google("Google Hybrid", {
			type: google.maps.MapTypeId.HYBRID,
			sphericalMercator: true
		});		
		map.addLayer(tlayer);

		tlayer = new OpenLayers.Layer.Google("Google Terrain", {
			type: google.maps.MapTypeId.TERRAIN,
			sphericalMercator: true
		});		
		map.addLayer(tlayer);
*/
		map.zoomToMaxExtent();
	}
	else
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
	}
}

// OpenStreetMap 레이어 생성
function createLayer_OpenStreetMap()
{
	if (null != map)
	{
/*		openStreetMap = new OpenLayers.Layer.OSM("OSM Transport", [
			"http://a.tile2.opencyclemap.org/transport/${z}/${x}/${y}.png",
			"http://b.tile2.opencyclemap.org/transport/${z}/${x}/${y}.png",
			"http://c.tile2.opencyclemap.org/transport/${z}/${x}/${y}.png",
		]);
*/		if (!OpenLayers.CANVAS_SUPPORTED) 
		{
            var unsupported = OpenLayers.Util.getElement('unsupported');
            unsupported.innerHTML = 'Your browser does not support canvas, nothing to see here !';
        }

        openStreetMap = new OpenLayers.Layer.OSM('Simple OSM Map', null, {
            eventListeners: {
                tileloaded: function(evt) 
                {
                    var ctx = evt.tile.getCanvasContext();
                    if (ctx) 
                    {
                        var imgd = ctx.getImageData(0, 0, evt.tile.size.w, evt.tile.size.h);
                        var pix = imgd.data;
                        for (var i = 0, n = pix.length; i < n; i += 4)
                        {
                            pix[i] = pix[i + 1] = pix[i + 2] = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) / 8;
                        }
                        ctx.putImageData(imgd, 0, 0);
                        evt.tile.imgDiv.removeAttribute("crossorigin");
                        evt.tile.imgDiv.src = ctx.canvas.toDataURL();
                    }
                }
            }
        });
        map.addLayer(openStreetMap);
		map.zoomToMaxExtent();
	}
	else
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
	}
}

// 실시간 교통 정보 레이어 생성
function createLayer_ITSTrafficInfo()
{
//	alert("ITS");
	if (null != map)
	{
		var itsLayer = new OpenLayers.Layer.TMS(
			"ITSTrafficInfo",
			"http://example.com/",
			{
				'type': 'gif',
				'getURL': callback_ITSTrafficInfo_GetURL
			});
		itsLayer.isBaseLayer = false;
		itsLayer.setVisibility(false);
		map.addLayer(itsLayer);
	}
	else
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
	}
}

/*
// OpenStreetMap 레이어 추가
function addLayer_OpenStreetMap()
{
	if (null != map)
	{
		var osm = new OpenLayers.Layer.OSM();
		var options = {
			serviceVersion : "",
			layername: "",
			isBaseLayer: false,
			opacity : 1,
			type: 'png',
			transitionEffect: 'resize',
			tileSize: new OpenLayers.Size(256,256),
			min_level : 7,
			max_level : 18,
			buffer:0
		};
		map.addLayer(osm);
	}
	else
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
	}
}
*/

// 모든 Zone, Link 레이어를 숨긴다.
function hideLayer_ZoneLink()
{
	for (var i = 0 ; i < arConIndicatorName.length ; i++)
	{
		for (var j = 0 ; j < arConIndicatorZoneName.length ; j++)
		{
			var tlayername = arConIndicatorZoneName[j] + arConIndicatorName[i];
			var tlayer = map.getLayersByName(tlayername);
			if (null != tlayer)
			{
				tlayer[0].setVisibility(false);
			}
		}
	}
}

function createZone(zone_layername)
{
		var tlayer = new OpenLayers.Layer.WMS(
			zone_layername,
			'http://192.168.40.26/geoserver/qbicmapV2/wms',
			{
				layers : zone_layername,
				isBaseLayer : false,		// 해당 옵션을 주어야 오버레이가능
				transparent : true
			}
		);
		map.addLayer(tlayer);
		return tlayer;
}

// 행정구역 레이어 생성
function setZoneVisibility()
{
	var bzone_sido = document.getElementById('id_zone_sido').checked;
	var bzone_sigungu = document.getElementById('id_zone_sigungu').checked;
	var bzone_emd = document.getElementById('id_zone_emd').checked;
	
	// zone_sido, zone_sigungu, zone_emd
	var sidoIDvalue = document.getElementById('id_zone_sido').value;
	var sigunguIDvalue = document.getElementById('id_zone_sigungu').value;
	var emdIDvalue = document.getElementById('id_zone_emd').value;

	// con_, cost_, volume_, speed_
	var conNamevalue = document.getElementById("id_congestion_indicators").name;
	// 지표에 해당하는 value값 ex)netcon_wd, oldcon_wd, co2_wd ....
	var conIDvalue = document.getElementById("id_congestion_indicators").value;

	if (conIDvalue == "null") return;

	var tlayername_sido = sidoIDvalue + conNamevalue + conIDvalue;
	var tlayername_sigungu = sigunguIDvalue + conNamevalue + conIDvalue;
	var tlayername_emd = emdIDvalue + conNamevalue + conIDvalue;

	if (bzone_sido == true) 
	{
		if (isLayerCreated(tlayername_sido) == false) 
		{
			gCurrentZoneLayer_sido = createZone(tlayername_sido);
		}
	} 
	else 
	{
		deleteLayer(tlayername_sido);
	}

	if (bzone_sigungu == true)
	{
		if (isLayerCreated(tlayername_sigungu) == false) 
		{
			gCurrentZoneLayer_sigungu = createZone(tlayername_sigungu);
		}
	}
	else
	{
		deleteLayer(tlayername_sigungu);
	}

	if (bzone_emd == true)
	{
		if (isLayerCreated(tlayername_emd) == false) 
		{
			gCurrentZoneLayer_emd = createZone(tlayername_emd);
		}
	}
	else
	{
		deleteLayer(tlayername_emd);
	}
}

//레이어 삭제
function deleteLayer(layername)
{
	for (var i = 0; i < map.layers.length; i++)
	{
		var layer = map.layers[i];
		
        if (layer.name == layername)
        {
        	map.removeLayer(layer);
        	return;
        }
    }
}

function isLayerCreated(zone_layerName)
{
	var bReturn = false;
	for (var i = 0; i < map.layers.length; i++)
	{
		var layer = map.layers[i];
        if (layer.name == zone_layerName)
        {
        	bReturn = true;
        }
    }
	return bReturn;
}

// 혼잡 지표 도로 등급의 레이어 표출 여부를 결정한다.
//	- Link 레이어는 실시간으로 filter를 이용하여 표출한다.
//	- CIRL: Congestion Indicator Road Level
function setCIRLLinkLayerVisibility()
{
	var conIndicator_null = document.getElementById('id_congestion_indicators').value;
	
	if (conIndicator_null == "null") return;
	
	deleteLayer(CIRL_LAYER);
	
	var bConIndicator_101 = document.getElementById('id_con_idctr_101').checked;
	var bConIndicator_102 = document.getElementById('id_con_idctr_102').checked;
	var bConIndicator_103 = document.getElementById('id_con_idctr_103').checked;
	var bConIndicator_104 = document.getElementById('id_con_idctr_104').checked;
	var bConIndicator_105 = document.getElementById('id_con_idctr_105').checked;
	var bConIndicator_106 = document.getElementById('id_con_idctr_106').checked;
	var bConIndicator_107 = document.getElementById('id_con_idctr_107').checked;	

	// 선택한 것이 아무것도 없을 경우
	if (!bConIndicator_101 && !bConIndicator_102 && !bConIndicator_103 && !bConIndicator_104 &&
			!bConIndicator_105 && !bConIndicator_106 && !bConIndicator_107)
	{
		return;
	}

	// 필터 문자열 생성
	var cqlfilter = "road_rank in (";
	if(bConIndicator_101 == true)	cqlfilter += "101,";
	if(bConIndicator_102 == true)	cqlfilter += "102,";
	if(bConIndicator_103 == true)	cqlfilter += "103,";
	if(bConIndicator_104 == true)	cqlfilter += "104,";
	if(bConIndicator_105 == true)	cqlfilter += "105,";
	if(bConIndicator_106 == true)	cqlfilter += "106,";
	if(bConIndicator_107 == true)	cqlfilter += "107,";
	
	// 마지막 ','를 ')'로 바꾼다
	var tfilter = cqlfilter.substring(0, cqlfilter.length-1);
	tfilter += ")";
	cqlfilter = tfilter;
	
	var conIDvalue = document.getElementById('id_congestion_indicators').value;
	var conNamevalue = document.getElementById('id_congestion_indicators').name;
	var tparamlayers = "klink_" + conNamevalue + conIDvalue;
	var tlayer = new OpenLayers.Layer.WMS(
		CIRL_LAYER,
		'http://192.168.40.26/geoserver/qbicmapV2/wms',
		{
			layers : tparamlayers,
			isBaseLayer : false,		// 해당 옵션을 주어야 오버레이가능
			CQL_FILTER: cqlfilter,		// 필터 적용
			transparent : true
		}
	);
	map.addLayer(tlayer);
}

// 생성된 레이어의 표출 여부 결정
function setLayerVisibility(checkbox, value, type)
{
	if (null == map)
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
		return;
	}

	var selectValue = document.getElementById('id_congestion_indicators').value;
	var conNameValue = document.getElementById('id_congestion_indicators').name;
	if ("null" != selectValue) 
	{
		var tlayername;
		if (1 == type)
		{			// zone
			tlayername = value + conNameValue + selectValue;
		}
		else if (2 == type)
		{		// link
			tlayername = "klink_congestion_" + selectValue +"_" + value;
		}
		else 
		{

		}
		var tlayer = map.getLayersByName(tlayername);
		if (null != tlayer)
		{
			tlayer[0].setVisibility(checkbox.checked);
		}
	}
}

// 혼잡 지표와 관련된 모든 옵션을 초기화 한다.
function initConIndicators()
{
	// UI 처리
	var chkbxZone = document.getElementsByName("checkbox_zone");
	for (var i = 0 ; i < chkbxZone.length ; i++)
	{
		chkbxZone[i].checked = false;
	}
	var chkbxLink = document.getElementsByName("checkbox_roadlevel");
	for (var i = 0 ; i < chkbxLink.length ; i++)
	{
		chkbxLink[i].checked = false;
	}
	
	// 생성된 모든 Popup 창 삭제
	popupClear();

	// Layer 처리
	deleteZoneLayers();
	deleteLayer(CIRL_LAYER);
}

function popupClear() {
    //alert('number of popups '+map.popups.length);
    while (map.popups.length) {
         map.removePopup(map.popups[0]);
    }
}

function deleteZoneLayers()
{
	if (gCurrentZoneLayer_sido)		map.removeLayer(gCurrentZoneLayer_sido);
	if (gCurrentZoneLayer_sigungu)	map.removeLayer(gCurrentZoneLayer_sigungu);
	if (gCurrentZoneLayer_emd)		map.removeLayer(gCurrentZoneLayer_emd);
}

function setMapBaseLayer(index)
{
	if (null == map)
	{
		debug_msg("map 객체가 null 이므로 레이어를 생성할 수 없습니다.", DEBUG_MSG_WINDOW);
		return;
	}

	switch (index)
	{
		case 1: 	map.setBaseLayer(vBase);			break;	// 일반
		case 2: 	map.setBaseLayer(vSatellite);		break;	// 위성
		case 3: 	map.setBaseLayer(gRoadMap);			break;	// 구글 지도
		case 4: 	map.setBaseLayer(gSatelliteMap);	break;	// 구글 위성 지도
		case 5: 	map.setBaseLayer(openStreetMap);	break;	// OpenStreetMap
		default:	map.setBaseLayer(vBase);
	}
}

function toggleLayerByCheckBox(checkbox, value)
{
	if (null != map)
	{
		var layername = value;
		var tlayer = map.getLayersByName(layername);
		if (null != tlayer)
		{
			tlayer[0].setVisibility(checkbox.checked);
/*			for(var i=0; i<layer.length; i++)
			{
				layer[i].setVisibility(checkbox.checked);
			}
*/		}
		else
		{
			debug_msg(layername + "객체가 찾을 수 없습니다", DEBUG_MSG_WINDOW);
		}
	}
	else
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
	}
}

function moveToOnMap(lon, lat, zoomlevel)
{
	var lonlat = new OpenLayers.LonLat(lon, lat);
	lonlat.transform(map.displayProjection, map.baseLayer.projection);
	map.setCenter(lonlat, zoomlevel);
}

function ShowMarkerOnSearchResultLayer(lon, lat, name)
{	
	searchMarkers.clearMarkers();
	var location 		= new OpenLayers.LonLat(lon, lat);
	location.transform(map.displayProjection, map.baseLayer.projection);
	var size		= new OpenLayers.Size(24, 37);
    var offset 		= new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon 		= new OpenLayers.Icon('http://192.168.40.26/CongestionMapV2/images/marker/marker.png', size, offset);
    var marker 		= new OpenLayers.Marker(location, icon.clone());
//	marker.setOpacity(0.2);
//	marker.events.register('mousedown', marker, function(evt) { alert(name + "\n[" + location.lon + ", " + location.lat + "]"); OpenLayers.Event.stop(evt); });
        
    // 참조: http://stackoverflow.com/questions/8523446/openlayers-simple-mouseover-on-marker
    var popup		= null;
    marker.events.register('mouseover', marker, function(evt) {
    	var msg		= "<div>" + name + "</div><div>[" + location.lon + ", " + location.lat + "]" + "</div>";
        popup 		= new OpenLayers.Popup.FramedCloud("Popup", location, null, msg, null, false);        
        map.addPopup(popup);
    });
    marker.events.register('mouseout', marker, function(evt) {
    	popup.hide();
    });    
    searchMarkers.addMarker(marker);
}


