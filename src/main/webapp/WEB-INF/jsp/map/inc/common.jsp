<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" language="java" %> 
<!DOCTYPE html>
<html lang="ko">
<%@ include file="/WEB-INF/jsp/common/inc/taglib.jsp"%>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Congestion Map</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/common/jui/jui.min.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/login/login.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/map/map.css'/>" />
<script type="text/javascript">
var baseUrl		= 	"<%=contextPath%>/";
</script>
<script type="text/javascript" src="<c:url value='/js/common/jquery/jquery-1.9.1.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/common/jui/jui.min.js'/>"></script> 
<script type="text/javascript" src="${pageContext.request.contextPath }/js/map/ui.js"></script>
<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="<c:url value='/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/common/login/login.js'/>"></script>