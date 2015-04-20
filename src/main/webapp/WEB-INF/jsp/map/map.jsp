<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" language="java"%>
<%@ include file="/WEB-INF/jsp/common/inc/taglib.jsp"%>
<c:import url="/WEB-INF/jsp/map/inc/common.jsp" />
</head>
<body class="jui">
	<div id="wrap_map">
		<div id="header_map">
			<c:import url="/WEB-INF/jsp/map/inc/header.jsp" />
		</div>
		<c:import url="/WEB-INF/jsp/map/inc/login.jsp" />
		<div id="container_map">
			<c:import url="/WEB-INF/jsp/map/inc/leftmenu.jsp" />
			<c:import url="/WEB-INF/jsp/map/inc/map.jsp" />
		</div>
	</div>
	<div id="footer">
		<c:import url="/WEB-INF/jsp/map/inc/footer.jsp" />
	</div>
</body>
</html>