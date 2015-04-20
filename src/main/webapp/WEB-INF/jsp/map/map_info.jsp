<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" language="java" %> 
<%@ include file="/WEB-INF/jsp/common/inc/taglib.jsp"%>
<c:import url="/WEB-INF/jsp/map/inc/common.jsp" />
<script type="text/javascript" src="${pageContext.request.contextPath}/${script}"></script>
</head>
<body class="jui"> 
	<div id="content_map">
		<div id="header_map">
			<c:import url="/WEB-INF/jsp/map/inc/header.jsp" />
		</div>
		<c:import url="/WEB-INF/jsp/map/inc/login.jsp" />
	
		<div class="content_area">
			<img src="${pageContext.request.contextPath}/images/map/map_info.png">
		</div>
	</div>
	<div id="footer">
		<c:import url="/WEB-INF/jsp/map/inc/footer.jsp" />
	</div>
</body>
</html>