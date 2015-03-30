
// VWorld open API를 이용하여 검색 작업 수행
//	- AJAX를 이용하여 수행.
function searchByVWorldOpenAPI() 
{
	var keyword = $("#search_query").val();
	if (!keyword) {
		alert("검색어를 입력하세요!");
		return;
	}	
	
	var params = {"query":"", "category":"Poi", "pageUnit":"10", "pageIndex":"1"}	
	params.query = keyword;	
	var parameter = $.param(params);
//	var proxy_url = "jsp/api_proxy.jsp?" + parameter; // Open API 요청 URL 구성
	var proxy_url = "jsp/proxy_search_by_vworld.jsp?" + parameter; // Open API 요청 URL 구성, 요청 파라미터에 상관 없이 전체 결과를 한 번에 받아온다.
	
	$.ajax({
		url: proxy_url,
		type: "get", 
		contentType: "text/xml; charset=utf-8", 
		dataType: "xml",
		timeout:30000,
		error: searchByVWorldOpenAPI_error2,
		success: searchByVWorldOpenAPI_success2
//		error: searchByVWorldOpenAPI_error,
//		success: searchByVWorldOpenAPI_success
		}
	);
}

function searchByVWorldOpenAPI_success2(xmlData)
{
	setDataToResultTable(xmlData);
}

function searchByVWorldOpenAPI_error2(xhr, message, errorThrown)
{
	// 성공했지만 결과가 없다고 판단할 수 있다.
	if (xhr.status == 200) {
		setNoDataToResultTable();		
	} else {
		var msg = xhr.status + " / " + message + " / " + errorThrown;    
	    alert(msg);
	}
}

function searchByVWorldOpenAPI_success(xmlData) 
{
	$("#search_result").empty();

	// 각종 정보 가져오기
//	var totalCount 			= $(xmlData).find("Poi").text();
	var currentPageNo		= $(xmlData).find("currentPageNo").text();
	var firstPageNo			= $(xmlData).find("firstPageNo").text();
	var lastPageNo			= $(xmlData).find("lastPageNo").text();
	var totalPageCount		= $(xmlData).find("totalPageCount").text();
	var totalRecordCount	= $(xmlData).find("totalRecordCount").text();
	
	var html 	= "<br/>";
	html		+= "currentPageNo: "	+ currentPageNo 	+ "<br/>";
	html		+= "firstPageNo: " 		+ firstPageNo 		+ "<br/>";
	html		+= "lastPageNo: " 		+ lastPageNo 		+ "<br/>";
	html		+= "totalPageCount: " 	+ totalPageCount	+ "<br/>";
	html		+= "totalRecordCount: " + totalRecordCount 	+ "<br/>";	
	html		+= "<br/>"
	
	// 아이템 처리
	$items = $(xmlData).find("item");
	var cur_item_count = $items.length;
	
	// item 수만큼 루프를 돌며 처리
	html += "<table border=\"1\">";
	$items.each(function(){
		
		// find 함수로 각각의 노드 값을 구한다.
		var ncode 		= $(this).find("NCODE").text();
		var zip_cl		= $(this).find("ZIP_CL").text();
		var rd_nm		= $(this).find("RD_NM").text();
		var juso		= $(this).find("juso").text();
		var namedp		= $(this).find("nameDp").text();
		var namefull	= $(this).find("nameFull").text();
		var ypos		= $(this).find("ypos").text();
		var pnu			= $(this).find("PNU").text();
		var njuso		= $(this).find("njusoCL").text();
		var weight		= $(this).find("WEIGHT").text();
		var xpos		= $(this).find("xpos").text();
		var codename	= $(this).find("codeName").text();
		
		html += "<tr>";
		html += "<td>" + namefull + "<br/>" + juso + "</td>";
		html += "</tr>"
	});
	html += "</table>";
	
	// 결과 표시
	$("#search_result").append(html); 
}

function searchByVWorldOpenAPI_error(xhr, message, errorThrown)
{
	// 성공했지만 결과가 없다고 판단할 수 있다.
	if (xhr.status == 200) {
		alert("검색 결과가 없습니다!");
		$("#search_result").empty();		
	} else {
		var msg = xhr.status + " / " + message + " / " + errorThrown;    
	    alert(msg);
	}
}

