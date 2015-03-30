// 시도 정보d
var sido = new Array(
	Array('0'	, '전국'),	
	Array('10'  , '서울특별시'),
	Array('20'  , '부산광역시'),
	Array('30'  , '대구광역시'),
	Array('40'  , '인천광역시'),
	Array('50'  , '광주광역시'),
	Array('60'  , '대전광역시'),
	Array('70'  , '울산광역시'),
	Array('80'  , '경기도'),
	Array('90'  , '강원도'),
	Array('100' , '충청북도'),
	Array('110' , '충청남도'),
	Array('120' , '전라북도'),
	Array('130' , '전라남도'),
	Array('140' , '경상북도'),
	Array('150' , '경상남도'),
	Array('160' , '제주특별자치도')
);

// 시군구 정보
var sigungu = new Array();

sigungu['0']	= null; 
sigungu['10']	= '전체,종로구,중구,용산구,성동구,광진구,동대문구,중랑구,성북구,강북구,도봉구,노원구,은평구,서대문구,마포구,양천구,강서구,구로구,금천구,영등포구,동작구,관악구,서초구,강남구,송파구,강동구';
sigungu['20']	= '전체,중구,서구,동구,영도구,부산진구,동래구,남구,북구,해운대구,사하구,금정구,강서구,연제구,수영구,사상구,기장군';
sigungu['30']	= '전체,중구,동구,서구,남구,북구,수성구,달서구,달성군';
sigungu['40']	= '전체,중구,동구,남구,연수구,남동구,부평구,계양구,서구,강화군,옹진군';
sigungu['50']	= '전체,동구,서구,남구,북구,광산구';
sigungu['60']	= '전체,동구,중구,서구,유성구,대덕구';
sigungu['70']	= '전체,중구,남구,동구,북구,울주군';
sigungu['80']	= '전체,수원시,성남시,의정부시,안양시,부천시,광명시,평택시,동두천시,안산시,고양시,과천시,구리시,남양주시,오산시,시흥시,군포시,의왕시,하남시,용인시,파주시,이천시,안성시,김포시,화성시,광주시,양주시,포천시,여주군,연천군,가평군,양평군';
sigungu['90']	= '전체,춘천시,원주시,강릉시,동해시,태백시,속초시,삼척시,홍천군,횡성군,영월군,평창군,정선군,철원군,화천군,양구군,인제군,고성군,양양군';
sigungu['100']	= '전체,청주시,충주시,제천시,청원군,보은군,옥천군,영동군,진천군,괴산군,음성군,단양군,증평군';
sigungu['110']	= '전체,천안시,공주시,보령시,아산시,서산시,논산시,계룡시,당진시,금산군,부여군,서천군,청양군,홍성군,예산군,태안군';
sigungu['120']	= '전체,전주시,군산시,익산시,정읍시,남원시,김제시,완주군,진안군,무주군,장수군,임실군,순창군,고창군,부안군';
sigungu['130']	= '전체,목포시,여수시,순천시,나주시,광양시,담양군,곡성군,구례군,고흥군,보성군,화순군,장흥군,강진군,해남군,영암군,무안군,함평군,영광군,장성군,완도군,진도군,신안군';
sigungu['140']	= '전체,포항시,경주시,김천시,안동시,구미시,영주시,영천시,상주시,문경시,경산시,군위군,의성군,청송군,영양군,영덕군,청도군,고령군,성주군,칠곡군,예천군,봉화군,울진군,울릉군';
sigungu['150']	= '전체,진주시,통영시,사천시,김해시,밀양시,거제시,양산시,창원시,의령군,함안군,창녕군,고성군,남해군,하동군,산청군,함양군,거창군,합천군';
sigungu['160']	= '전체,제주시,서귀포시';

$(function() {	
	init_admin_option();
	init_jui();
});

// JUI 초기화 작업 수행
function init_jui()
{	
	jui.ready([ "ui.paging", "uix.xtable" ], function(paging, xtable) {
		paging_1 = paging("#paging_1", {
	        pageCount: 20,
	        screenCount: 3,
	        event: {
	            page: function(pNo) {
	            	xtable_1.page(pNo);
	            }
	        }
	    });
		
		xtable_1 = xtable("#xtable_1", {
			fields: [ "name" ],
			resize: true,
			sort: true,
			buffer: "page", // scroll, page, s-page
			bufferCount: 20,
			
			event: {
				select: function(row) {
					selectEventOnTable(row);
				}
			}
		});
	});
}

var currentPointInfo;	// 지도 이동을 위한 좌표 정보를 저장하기 위한 배열
function selectEventOnTable(row)
{
//	alert("index(" + row.index + "), name(" + row.data.name + ")");
//	alert(currentPointInfo[row.index][0] + ", " + currentPointInfo[row.index][1]);
	moveToOnMap(currentPointInfo[row.index][0], currentPointInfo[row.index][1], 15);
	ShowMarkerOnSearchResultLayer(currentPointInfo[row.index][0], currentPointInfo[row.index][1], row.data.name);
}

function setDataToResultTable(xmlData)
{
	// 각종 정보 가져오기
//	var totalCount 			= $(xmlData).find("Poi").text();
//	var currentPageNo		= $(xmlData).find("currentPageNo").text();
//	var firstPageNo			= $(xmlData).find("firstPageNo").text();
//	var lastPageNo			= $(xmlData).find("lastPageNo").text();
//	var totalPageCount		= $(xmlData).find("totalPageCount").text();
//	var totalRecordCount	= $(xmlData).find("totalRecordCount").text();
	
	// 아이템 처리
	$items = $(xmlData).find("item");
	var cur_item_count = $items.length;
	
	// item 수만큼 루프를 돌며 처리
	var rows = [];
	var points = new Array();	// 좌표 정보를 담을 객체 생성
	$items.each(function(){		
		// find 함수로 각각의 노드 값을 구한다.
//		var ncode 		= $(this).find("NCODE").text();
//		var zip_cl		= $(this).find("ZIP_CL").text();
//		var rd_nm		= $(this).find("RD_NM").text();
		var juso		= $(this).find("juso").text();
//		var namedp		= $(this).find("nameDp").text();
		var namefull	= $(this).find("nameFull").text();
		var ypos		= $(this).find("ypos").text();
//		var pnu			= $(this).find("PNU").text();
//		var njuso		= $(this).find("njusoCL").text();
//		var weight		= $(this).find("WEIGHT").text();
		var xpos		= $(this).find("xpos").text();
//		var codename	= $(this).find("codeName").text();
		
//		rows.push({ name: namefull +" (" + juso + ")" + ", [" + xpos + ", " + ypos + "]" });
		rows.push({ name: namefull +" (" + juso + ")" });
		
		var point = new Array(parseFloat(xpos), parseFloat(ypos));
		points.push(point);
	});
	currentPointInfo = points;	// 현재 좌표 정보에 연결만 한다.
	xtable_1.update(rows);
	paging_1.reload(xtable_1.count());
}

function setNoDataToResultTable()
{
	var rows = [];
	rows.push({ name: "검색 결과가 없습니다." });
	xtable_1.update(rows);
	paging_1.reload(xtable_1.count());
}

function init_admin_option()
{
	// 시도 선택시 시군구 option 을 만든다.
	$("#sido").bind("change", function() {
		var sido = $(this).val();
		gugun_make(sido);

		map_moveto_1(sido);
	});

	$("#gugun").bind("change", function() {
		var sido = $("#sido").val();
		var gugun = $(this).val();

		map_moveto_2(sido, gugun);
	});

	// 로딩시 시도 option 을 만든다.
	for (var i=0; i<sido.length; i++) {
		$("#sido").append($('<option></option>').val(sido[i][0]).text(sido[i][1]));
	}
	$("#sido option:eq(1)").attr("selected", "selected");
	var init_val = $("#sido option:selected").val();

	gugun_make(init_val);
}

function map_moveto_1(sido) {
	// 선택된 옵션에 따라 지도 이동
	var element_sido 	= document.getElementById("sido");
	var sidoName 		= element_sido.options[element_sido.selectedIndex].text;
	
	if (sidoName == '전국') {
		setMapInitPosition();
	}
}

function map_moveto_2(sido, gugun)
{
//	alert("2222");
	// 선택된 옵션에 따라 지도 이동
	var element_sido 	= document.getElementById("sido");
	var element_gugun 	= document.getElementById("gugun");
	var sidoName 		= element_sido.options[element_sido.selectedIndex].text;
	var gugunName		= element_gugun.options[element_gugun.selectedIndex].text;
	var msg				= "";

/*
	// "- 시군구 선택 -" 또는 "전체" 라면 제외
	if (element_gugun.selectedIndex == 0 || element_gugun.selectedIndex == 1) {
		msg = sidoName + "(으)로 이동합니다.";
	} else {
		msg = sidoName + " " + gugunName + "(으)로 이동합니다.";
	}
*/	
	// 지도 이동
	moveMapPositionTo(sidoName, gugunName);
}

// 구군 불러오기
function gugun_make(sido)
{
	var gugun  = document.getElementById("gugun");

	gugun.options.length = 1;
	gugun.options[0].value = "";
	gugun.options[0].text  = "- 시/군/구 선택 -";
	gugun.options[0].selected = true;
	if (!sido) {
		return;
	}
	if(sigungu[sido] != null){
		sojae = sigungu[sido].split(",");
		gugun.options.length = sojae.length+1;
		for (i=0; i<sojae.length; i++) {
			gugun.options[i+1].value = (sojae[i] == "없음") ? "" : i;
			gugun.options[i+1].text = sojae[i];
		}
	}
}
