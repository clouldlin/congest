<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Congestion Map Version 2.0</title>
		
		<!-- css -->
		<link rel="stylesheet" type="text/css" href="css/default.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/lib/jui/jui.min.css">
		
		<!-- jQuery 관련 임포트 -->
		<script src="${pageContext.request.contextPath}/s/jquery-1.8.3.min.js"></script>
		
		<!-- jui 관련 임포트 -->
		<script src="${pageContext.request.contextPath}/lib/jui/lib/jquery.binder.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/jui.min.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/base.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/core.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/ui/dropdown.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/ui/modal.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/ui/paging.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/uix/table.js"></script>
		<script src="${pageContext.request.contextPath}/lib/jui/js/uix/xtable.js"></script>
		
		<!-- IE 하위 버전 호완성 -->
		<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		
		<!-- 지도 관련 기본 script 임포트 -->
		<script src="http://www.openlayers.org/api/2.13/OpenLayers.js" type="text/javascript"></script>
		<!-- 로컬 인증키 사용  -->
		<script type="text/javascript" src="http://map.vworld.kr/js/apis.do?type=Base&apiKey=C0B20EA3-3299-3A95-A036-6E17EEB79FFE"></script>
		
		<!-- 구글 지도 관련 script 임포트 -->
		<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
		<!-- UI script 임포트 -->    
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/ui.js" charset="utf-8"></script>
		
		<!-- 지도 컨트롤 관련 script 임포트 -->    
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/map.js" charset="utf-8"></script>    
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/map_admin.js" charset="utf-8"></script>
		
		<!-- 검색 관련 script 임포트 -->
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/search.js" charset="utf-8"></script>
	</head> 
	
	<body class="jui" onload="init()">
		<header class="top">
			<a href="main.html"><img id="headerLogo" src="images/logo.png" alt="The smartest map in the world - QbicMap"></a>
			<img id="headerSlogan" src="images/slogan.png" alt="You can find the place making you happy!!">
		</header>
	
		<!-- 메뉴 네비게이션 영역 -->
		<nav>
			<ul>
				<li><a href="WhatIsCongestionMap.html">혼잡지도란</a></li>
				&nbsp|&nbsp
				<li><a href="WhatIsCongestion.html">혼잡이란</a></li>
				&nbsp|&nbsp
				<li><a href="index.html">혼잡지표</a></li>
				&nbsp|&nbsp
				<li><a href="congestion_cost.html">혼잡비용</a></li>
				&nbsp|&nbsp
				<li><a href="congestion_volume.html">교통량</a></li>
				&nbsp|&nbsp
				<li><a href="congestion_speed.html">속도</a></li>
				&nbsp|&nbsp
				<li><a href="faq.html">FAQ</a></li>
				&nbsp|&nbsp
				<li><a href="help.html">HELP</a></li>
			</ul>
		</nav>
		  
		  <!-- 사이드 바 영역 -->
		<section id="sidebar">
			<!-- Tab 메뉴
			원본 소스 코드 - http://circlash.tistory.com/703 
			좀 더 쉬운 탭 소스 코드: http://jsfiddle.net/3n74v/
			-->
			<div id="sidebar_tab_menu">
				<!-- 라디오 버튼 -->
				<input id="tab1" type="radio" name="tab" checked="checked" />
				<input id="tab2" type="radio" name="tab" />
				
				<!-- 라벨: 화면에 표시되는 탭 제목 -->
				<label for="tab1">혼잡지도</label>
				<label for="tab2">위치검색</label>      
				
				<!-- 탭 내용: 탭 제목을 선택했을 때 표시되는 영역 -->
				<!-- 혼잡지도 -->
				<div class="tab1_content">
					
					<div class="tab1_content_items">
						::혼잡지표 항목:&nbsp&nbsp
						<select id="id_congestion_indicators" name="con_" onchange="javascript:initConIndicators();">
							<option value="null">선택</option>
							<option value="netcon_wd">주중-혼잡강도</option>
							<option value="oldcon_wd">주중-기존 혼잡강도</option><!-- 옵션 추가항목 -->
							<option value="co2_wd">주중-CO2 배출량</option>
							<option value="fuel_wd">주중-유류 소모량</option>
							<option value="delay_wd">주중-평균 지체</option>
							<!-- 옵션 추가항목 -->
							<option value="netcon_h">주말-혼잡강도</option>
							<option value="oldcon_h">주말-기존 혼잡강도</option>
							<option value="co2_h">주말-CO2 배출량</option>
							<option value="fuel_h">주말-유류 소모량</option>
							<option value="delay_h">주말-평균 지체</option>
						</select>
					</div>
					
					<div class="tab1_content_items">            
						<div class="content_items_title">
							::행정구역
						</div>
						<div class="content_items_item_area">
							<!-- 에러! 앞의 두개의 checkbox는 알 수 없는 이유로 표시가 되지 않는다. -->
							<input type="checkbox" name="checkbox_zone" value="null">
							<input type="checkbox" name="checkbox_zone" value="null">
							<!-- <input type="checkbox" name="checkbox_zone" value="zone_sido_"onclick="javascript:setLayerVisibility(this, value, 1);">시도<br/> -->
							<input type="checkbox" name="checkbox_zone" id="id_zone_sido" value="zone_sido_"onclick="javascript:setZoneVisibility();">시도<br/>
							<!-- <input type="checkbox" name="checkbox_zone" value="zone_sigungu_" onclick="javascript:setLayerVisibility(this, value, 1);">시군구<br/> -->
							<input type="checkbox" name="checkbox_zone" id="id_zone_sigungu" value="zone_sigungu_" onclick="javascript:setZoneVisibility();">시군구<br/>
							<!-- <input type="checkbox" name="checkbox_zone" value="zone_emd_"onclick="javascript:setLayerVisibility(this, value, 1);">읍면동 -->
							<input type="checkbox" name="checkbox_zone" id="id_zone_emd" value="zone_emd_"onclick="javascript:setZoneVisibility();">읍면동
						</div>
					</div>
					
					<div class="tab1_content_items">
						<div class="content_items_title">
							::도로등급
						</div>
						<div class="content_items_item_area">
							<!-- 에러! 앞의 두개의 checkbox는 알 수 없는 이유로 표시가 되지 않는다. -->
							<input type="checkbox" name="" value="null">
							<input type="checkbox" name="" value="null">
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_101" value="101" onclick="javascript:setCIRLLinkLayerVisibility();">고속도로<br/>
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_102" value="102" onclick="javascript:setCIRLLinkLayerVisibility();">도시고속국도<br/>
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_103" value="103" onclick="javascript:setCIRLLinkLayerVisibility();">일반국도<br/>
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_104" value="104" onclick="javascript:setCIRLLinkLayerVisibility();">특별광역시도<br/>
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_105" value="105" onclick="javascript:setCIRLLinkLayerVisibility();">국가지원지방도<br/>
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_106" value="106" onclick="javascript:setCIRLLinkLayerVisibility();">지방도<br/>
							<input type="checkbox" name="checkbox_roadlevel" id="id_con_idctr_107" value="107" onclick="javascript:setCIRLLinkLayerVisibility();">시군도<br/>
						</div>            
					</div>
					
					<div class="tab1_content_items">
						<div class="content_items_title">
							::Legend
						</div>            
						<div class="content_items_item_area">
							<img id="legend" src="images/legend.png" alt="The explanation of legend.">
						</div>
					</div>
					
					<div class="tab1_content_items">
						<div class="content_items_title">
							::혼잡지표 설명
						</div>
						<div class="content_items_item_area">
							<p>
							- 혼잡강도&#40;&#37;&#41;&#58; 해당 도로구간을 이용한 차량이&nbsp;&nbsp;경험한 총 통행시간대비 혼잡 경계속도 이하로&nbsp; 주행한 차량의 총 통행시간 비율<br><br>
							- CO2배출량&#58; 해당 도로구간을 이용한 차량이&nbsp;&nbsp; 배출한 평균 CO2배출량&#40;g&#47;Km&#47;대&#41;<br><br>
							- 연료소모량&#58; 특정 시간대에 도로구간을 이용한&nbsp;&nbsp;차량의 평균 유류소모량&#40;l&#47;Km&#47;대&#41;<br><br>
							- 지체시간&#58; 특정 시간대에 도로구간을 이용한&nbsp;&nbsp;차량의 평균 제어지체&#40;&#47;Km&#47;대&#41;<br><br>
							</p>
							<p>
							※ 본 분석결과는 2013년12월~2014년1월의 네<br>&nbsp;&nbsp; 비게이션 자료를 분석한 결과입니다.
							</p>
						</div>
					</div>
				</div>
				
				<!-- 위치 검색 -->
				<div class="tab2_content">
<!-- vworld에서 제공하는 Sample Code  
					<form action="http://map.vworld.kr/search.do" method="get">
						<input type="hidden" name="" value="null">
						<input type="hidden" name="" value="null">
						<input type="text" name="callback" value = "callbackFunc">
						<input type="text" name="q" value = "범계역">
						<input type="text" name="category" value = "Poi">
						<input type="text" name="pageUnit" value = "10">
						<input type="text" name="pageIndex" value = "1">
						<input type="text" name="output" value = "xml">
						<input type="text" name="apiKey" value = "9646EC51-28C2-32FA-A555-66EAF06096FF">	
						<input type="submit" value = "submit">
					</form>
-->					
					<div id="serch_option">
						<!-- 에러! 앞의 두개는 알 수 없는 이유로 표시가 되지 않는다. -->
						<input type="hidden" name="" value="null" />
						<input type="hidden" name="" value="null" />
						<input type="text" id="search_query" />
						<input type="button" onclick="searchByVWorldOpenAPI()" value="검색" />
					</div>
					
					<div id="search_result">					
						<!---------------------- 위치 검색 결과, JUI Library 사용 ---------------------->
						<!--------- 참고: http://seogi1004.github.io/jui/doc/index.html ---------->
						<!----------------------------------------------------------------------->
						<!-- 테이블  -->
						<div id="xtable_1" class="xtable xtable-rect" style="width: 100%;">
							<table class="table table-simple table-headline">
								<thead>
									<tr>
										<th>검색결과</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>

						<script data-jui="#xtable_1" data-tpl="row" type="text/template">
						<tr>
    						<td><!= name !></td>
						</tr>
						</script>

						<script data-jui="#xtable_1" data-tpl="none" type="text/template">
						<tr>
    						<td colspan="3" class="none">검색 결과가 없습니다.</td>
						</tr>
						</script>

						<script data-jui="#xtable_1" data-tpl="loading" type="text/template">
    						<div class="loading"></div>
						</script>
						
						<!-- 페이징 -->
						<div id="paging_1" class="paging" style="width: 100%; margin-top: 3px;">
							<a href="#" class="prev">Previous</a>
							<div class="list"></div>
							<a href="#" class="next">Next</a>
						</div>
		
						<script data-jui="#paging_1" data-tpl="pages" type="text/template">
							<! for(var i = 0; i < pages.length; i++) { !>
								<a href="#" class="page"><!= pages[i] !></a>
							<! } !>
						</script>
						</div>
						<!---------------------------------------------------------------------->					
				</div>	
			</div> <!-- <div id="css_tabs"> -->
		</section> <!-- <section id="sidebar"> -->
		
		<!-- 지도 및 지도 옵션 영역 -->
		<section id="main">
			<!-- 일반/위성/구글(일바)/구글(영상), 교통소통정보/CCTV -->
			<div id="map_option">
				<button onclick="javascript:setMapBaseLayer(1);">일반지도</button>
				<button onclick="javascript:setMapBaseLayer(2);">위성지도</button>
				<button onclick="javascript:setMapBaseLayer(3);">GM</button>
				<button onclick="javascript:setMapBaseLayer(4);">GS</button>
				<button onclick="javascript:setMapBaseLayer(5);">OM</button>
				&nbsp|&nbsp
				<input type="checkbox" name="map_option" value="VHYBRID" checked="checked" onclick="javascript:toggleLayerByCheckBox(this, value);">Hybrid
				<input type="checkbox" name="map_option" value="StreetMap">StreetMap
				<input type="checkbox" name="map_option" value="CCTV">CCTV
				<input type="checkbox" name="map_option" value="ITSTrafficInfo" onclick="javascript:toggleLayerByCheckBox(this, value);">실시간 소통 정보
			</div>
			
			<!-- 시도, 시군구 옵션 선택 영역 -->
			<div id="sido_option">
				<select class="d_form_custom" name="sido" id="sido">
					<option value="">- 시/도 선택 -</option>
				</select>
				<select class="d_form_custom" name="gugun" id="gugun">
					<option>------</option>
				</select>
			</div>
			
			<!-- 지도 표출 영역 -->
			<div id="map"></div>
			
		</section> <!-- <section id="main"> -->
		
		<!-- footer 영역: 개발시에는 디버그 용으로 사용된다. -->
		<div id="footer">
			&copy; 2014, QBICWARE
			<br>
			Copyright 2014 Qbicware Inc. All rights resered.
		</div>
	</body>
</html>