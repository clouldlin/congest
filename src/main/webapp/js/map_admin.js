////////////////////////////////////////////////////////////////////////////////
///		행정동 선택시의 지도 컨트롤 관련 함수들...
////////////////////////////////////////////////////////////////////////////////
///

function setMapInitPosition() {
	map.setCenter(new OpenLayers.LonLat(INIT_LON, INIT_LAT), INIT_LEVEL);
}


function moveMapPositionTo(sidoName, gugunName)
{
//	alert(sidoName + "," + gugunName);
	if (null == map)
	{
		debug_msg("map 객체가 null 이므로 작업을 수행할 수 없습니다.", DEBUG_MSG_WINDOW);
	}

/*	// 지도 이동 테스트
	if (sidoName == '서울특별시' && gugunName == '종로구') {
		if (map != null) {
			map.setCenter(new OpenLayers.LonLat(14135012.547689248, 4520123.305972628), 15);
		}
	}
*/
	var tLon = INIT_LON;
	var tLat = INIT_LAT;
	var tZoomLevel = INIT_LEVEL;

	if ("전국" == sidoName)
	{
		tLon = 126.992113;
		tlat = 37.552136;
		tZoomLevel = 8;
	}
	else if ("서울특별시" == sidoName)
	{		
		if("전체" == gugunName)
		{
			tLon = 126.99211337;
			tLat = 37.5521358104;
			tZoomLevel = 11;
		}
		else if ('종로구' == gugunName)
		{
			tLon = 126.977671938;
			tLat = 37.5943514644;
			tZoomLevel = 13;
		}
		else if ('중구' == gugunName)
		{
			tLon = 126.995880621;
			tLat = 37.5600929247;
			tZoomLevel = 14;
		}
		else if ('용산구' == gugunName)
		{
			tLon = 126.980170483;
			tLat = 37.5324755646;
			tZoomLevel = 14;
		}
		else if ( '성동구' == gugunName)
		{
			tLon = 127.041262015;
			tLat = 37.5512858105;
			tZoomLevel = 14;
		}
		else if ( '광진구' == gugunName)
		{
			tLon = 127.086623396;
			tLat = 37.5465638129;
			tZoomLevel = 14;
		}
		else if ( '동대문구' == gugunName)
		{
			tLon = 127.055204957;
			tLat = 37.5819354563;
			tZoomLevel = 14;
		}
		else if ( '중랑구' == gugunName)
		{
			tLon = 127.093001627;
			tLat = 37.5979937099;
			tZoomLevel = 14;
		}
		else if ( '성북구' == gugunName)
		{
			tLon = 127.018030153;
			tLat = 37.6058516659;
			tZoomLevel = 13;
		}
		else if ( '강북구' == gugunName)
		{
			tLon = 127.011090731;
			tLat = 37.6435228669;
			tZoomLevel = 13;
		}
		else if ( '도봉구' == gugunName)
		{
			tLon = 127.032385431;
			tLat = 37.6691651161;
			tZoomLevel = 13;
		}
		else if ( '노원구' == gugunName)
		{
			tLon = 127.075267565;
			tLat = 37.652088787;
			tZoomLevel = 13;
		}
		else if ( '은평구' == gugunName)
		{
			tLon = 126.928840599;
			tLat = 37.6198686346;
			tZoomLevel = 13;
		}
		else if ( '서대문구' == gugunName)
		{
			tLon = 126.939010189;
			tLat = 37.5774811729;
			tZoomLevel = 13;
		}
		else if ( '마포구' == gugunName)
		{
			tLon = 126.909878601;
			tLat = 37.5582482978;
			tZoomLevel = 13;
		}
		else if ( '양천구' == gugunName)
		{
			tLon = 126.856294332;
			tLat = 37.524810559;
			tZoomLevel = 14;
		}
		else if ( '강서구' == gugunName)
		{
			tLon = 126.824522531;
			tLat = 37.561101833;
			tZoomLevel = 13;
		}
		else if ( '구로구' == gugunName)
		{
			tLon = 126.856810171;
			tLat = 37.4945645172;
			tZoomLevel = 14;
		}
		else if ( '금천구' == gugunName)
		{
			tLon = 126.90128063;
			tLat = 37.4604796617;
			tZoomLevel = 14;
		}
		else if ( '영등포구' == gugunName)
		{
			tLon = 126.90999619;
			tLat = 37.5201630537;
			tZoomLevel = 13;
		}
		else if ( '동작구' == gugunName)
		{
			tLon = 126.952233069;
			tLat = 37.4996499692;
			tZoomLevel = 14;
		}
		else if ( '관악구' == gugunName)
		{
			tLon = 126.946011173;
			tLat = 37.4672114355;
			tZoomLevel = 13;
		}
		else if ( '서초구' == gugunName)
		{
			tLon = 127.031168465;
			tLat = 37.4737555465;
			tZoomLevel = 13;
		}
		else if ( '강남구' == gugunName)
		{
			tLon = 127.062673621;
			tLat = 37.4972514878;
			tZoomLevel = 13;
		}
		else if ( '송파구' == gugunName)
		{
			tLon = 127.115307241;
			tLat = 37.5050730966;
			tZoomLevel = 13;
		}
		else 
		{
			tLon = 127.146914859;
			tLat = 37.5511766798;
			tZoomLevel = 13;
		}
	}

	else if ('부산광역시' == sidoName)
	{		
		if ('전체' == gugunName)
		{
			tLon = 129.05946951;
			tLat = 35.2005513107;
			tZoomLevel = 11;
		}
		else if ('중구' == gugunName)
		{
			tLon = 129.031943999;
			tLat = 35.105511496;
			tZoomLevel = 15;
		}
		else if ('서구' == gugunName)
		{
			tLon = 129.014843912;
			tLat = 35.1023894919;
			tZoomLevel = 14;
		}
		else if ('동구' == gugunName)
		{
			tLon = 129.044707203;
			tLat = 35.1292337291;
			tZoomLevel = 14;
		}
		else if ('영도구' == gugunName)
		{
			tLon = 129.064971019;
			tLat = 35.0785983654;
			tZoomLevel = 14;
		}
		else if ('부산진구' == gugunName)
		{
			tLon = 129.043069977;
			tLat = 35.1650018141;
			tZoomLevel = 14;
		}
		else if ('동래구' == gugunName)
		{
			tLon = 129.078985249;
			tLat = 35.2063025986;
			tZoomLevel = 14;
		}
		else if ('남구' == gugunName)
		{
			tLon = 129.094050753;
			tLat = 35.1263173089;
			tZoomLevel = 14;
		}
		else if ('북구' == gugunName)
		{
			tLon = 129.024177248;
			tLat = 35.2303662084;
			tZoomLevel = 13;
		}
		else if ('해운대구' == gugunName)
		{
			tLon = 129.153668525;
			tLat = 35.1937749476;
			tZoomLevel = 13;
		}
		else if ('사하구' == gugunName)
		{
			tLon = 128.974138545;
			tLat = 35.0884582998;
			tZoomLevel = 13;
		}
		else if ('금정구' == gugunName)
		{
			tLon = 129.091719256;
			tLat = 35.2589637917;
			tZoomLevel = 13;
		}
		else if ('강서구' == gugunName)
		{
			tLon = 128.891929709;
			tLat = 35.1361528861;
			tZoomLevel = 12;
		}
		else if ('연제구' == gugunName)
		{
			tLon = 129.083034011;
			tLat = 35.182345421;
			tZoomLevel = 15;
		}
		else if ('수영구' == gugunName)
		{
			tLon = 129.111563109;
			tLat = 35.161351003;
			tZoomLevel = 15;
		}
		else if ('사상구' == gugunName)
		{
			tLon = 128.986799116;
			tLat = 35.1579856597;
			tZoomLevel = 13;
		}
		else
		{
			tLon = 129.201458714;
			tLat = 35.2970430916;
			tZoomLevel = 12;
		}
	}
	
	else if ('대구광역시' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 128.565528861;
			tLat = 35.829684525;
			tZoomLevel = 11;
		}
		else if ('중구' == gugunName)
		{
			tLon = 128.593509817;
			tLat = 35.8665626635;
			tZoomLevel = 15;
		}
		else if ('동구' == gugunName)
		{
			tLon = 128.685796492;
			tLat = 35.9345728325;
			tZoomLevel = 12;
		}
		else if ('서구' == gugunName)
		{
			tLon = 128.549723381;
			tLat = 35.8752089242;
			tZoomLevel = 14;
		}
		else if ('남구' == gugunName)
		{
			tLon = 128.585406374;
			tLat = 35.8353423641;
			tZoomLevel = 14;
		}
		else if ('북구' == gugunName)
		{
			tLon = 128.577431625;
			tLat = 35.9287100614;
			tZoomLevel = 13;
		}
		else if ('수성구' == gugunName)
		{
			tLon = 128.661459608;
			tLat = 35.8341956858;
			tZoomLevel = 13;
		}
		else if ('달서구' == gugunName)
		{
			tLon = 128.528537597;
			tLat = 35.8275809235;
			tZoomLevel = 13;
		}
		else
		{
			tLon = 128.49864881;
			tLat = 35.7593557338;
			tZoomLevel = 12;
		}
	}

	else if ('인천광역시' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 126.378395608;
			tLat = 37.5801427405;
			tZoomLevel = 10;
		}
		else if ('중구' == gugunName)
		{
			tLon = 126.480921625;
			tLat = 37.468303514;
			tZoomLevel = 12;
		}
		else if ('동구' == gugunName)
		{
			tLon = 126.639021333;
			tLat = 37.4832193188;
			tZoomLevel = 14;
		}
		else if ('남구' == gugunName)
		{
			tLon = 126.66496627;
			tLat = 37.4528736633;
			tZoomLevel = 14;
		}
		else if ('연수구' == gugunName)
		{
			tLon = 126.652535013;
			tLat = 37.3899474474;
			tZoomLevel = 13;
		}
		else if ('남동구' == gugunName)
		{
			tLon = 126.726712156;
			tLat = 37.4308121956;
			tZoomLevel = 13;
		}
		else if ('부평구' == gugunName)
		{
			tLon = 126.721202806;
			tLat = 37.4966948765;
			tZoomLevel = 13;
		}
		else if ('계양구' == gugunName)
		{
			tLon = 126.734950032;
			tLat = 37.5572458448;
			tZoomLevel = 13;
		}
		else if ('서구' == gugunName)
		{
			tLon = 126.652150388;
			tLat = 37.5603976055;
			tZoomLevel = 12;
		}
		else if ('강화군' == gugunName)
		{
			tLon = 126.401829842;
			tLat = 37.7099085274;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 125.87327;
			tLat = 37.5222026022;
			tZoomLevel = 10;
		}
	}

	else if ('광주광역시' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 126.835802465;
			tLat = 35.1556854924;
			tZoomLevel = 12;
		}
		else if ('동구' == gugunName)
		{
			tLon = 126.949351262;
			tLat = 35.1173119933;
			tZoomLevel = 13;
		}
		else if ('서구' == gugunName)
		{
			tLon = 126.850521009;
			tLat = 35.1356869183;
			tZoomLevel = 13;
		}
		else if ('남구' == gugunName)
		{
			tLon = 126.856879688;
			tLat = 35.0940658835;
			tZoomLevel = 13;
		}
		else if ('북구' == gugunName)
		{
			tLon = 126.926083094;
			tLat = 35.1928251647;
			tZoomLevel = 12;
		}
		else
		{
			tLon = 126.752827785;
			tLat = 35.1650602962;
			tZoomLevel = 13;
		}
	}

	else if ('대전광역시' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 127.393991516;
			tLat = 36.3399578994;
			tZoomLevel = 11;
		}
		else if ('동구' == gugunName)
		{
			tLon = 127.475073515;
			tLat = 36.3238424441;
			tZoomLevel = 12;
		}
		else if ('중구' == gugunName)
		{
			tLon = 127.41130841;
			tLat = 36.2808318579;
			tZoomLevel = 12;
		}
		else if ('서구' == gugunName)
		{
			tLon = 127.345225197;
			tLat = 36.280622785;
			tZoomLevel = 12;
		}
		else if ('유성구' == gugunName)
		{
			tLon = 127.333030237;
			tLat = 36.3768691546;
			tZoomLevel = 12;
		}
		else
		{
			tLon = 127.440516778;
			tLat = 36.4122683586;
			tZoomLevel = 12;
		}
	}

	else if ('울산광역시' == sidoName)
	{
		if ('전체' == sidoName)
		{
			tLon = 129.238260668;
			tLat = 35.5536153657;
			tZoomLevel = 11;
		}
		else if ('중구' == gugunName)
		{
			tLon = 129.30956012;
			tLat = 35.5709476796;
			tZoomLevel = 13;
		}
		else if ('남구' == gugunName)
		{
			tLon = 129.330530519;
			tLat = 35.5158243374;
			tZoomLevel = 13;
		}
		else if ('동구' == gugunName)
		{
			tLon = 129.425317649;
			tLat = 35.5246879805;
			tZoomLevel = 13;
		}
		else if ('북구' == gugunName)
		{
			tLon = 129.37985951;
			tLat = 35.6098260155;
			tZoomLevel = 12;
		}
		else
		{
			tLon = 129.186520723;
			tLat = 35.5462126912;
			tZoomLevel = 11;
		}
	}

	else if ('경기도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 127.179100268;
			tLat = 37.5437880529;
			tZoomLevel = 9;
		}
		else if ('수원시' == gugunName)
		{
			tLon = 127.01738;
			tLat = 37.27964;
			tZoomLevel = 12;
		}
		else if ('성남시' == gugunName)
		{
			tLon = 127.11900;
			tLat = 37.41447;
			tZoomLevel = 12;
		}
		else if ('의정부시' == gugunName)
		{
			tLon = 127.068088019;
			tLat = 37.7362653597;
			tZoomLevel = 13;
		}
		else if ('안양시' == gugunName)
		{
			tLon = 126.92897;
			tLat = 37.40219;
			tZoomLevel = 13;
		}
		else if ('부천시' == gugunName)
		{
			tLon = 126.79027;
			tLat = 37.50799;
			tZoomLevel = 13;
		}
		else if ('광명시' == gugunName)
		{
			tLon = 126.864866955;
			tLat = 37.4453885124;
			tZoomLevel = 13;
		}
		else if ('평택시' == gugunName)
		{
			tLon = 126.995071996;
			tLat = 37.015806158;
			tZoomLevel = 12;
		}
		else if ('동두천시' == gugunName)
		{
			tLon = 127.077976379;
			tLat = 37.9165376188;
			tZoomLevel = 13;
		}
		else if ('안산시' == gugunName)
		{
			tLon = 126.68367;
			tLat = 37.29056;
			tZoomLevel = 12;
		}
		else if ('고양시' == gugunName)
		{
			tLon = 126.84434;
			tLat = 37.67253;
			tZoomLevel = 12;
		}
		else if ('과천시' == gugunName)
		{
			tLon = 127.003130853;
			tLat = 37.4336626661;
			tZoomLevel = 13;
		}
		else if ('구리시' == gugunName)
		{
			tLon = 127.130746942;
			tLat = 37.6004760415;
			tZoomLevel = 13;
		}
		else if ('남양주시' == gugunName)
		{
			tLon = 127.243202313;
			tLat = 37.6631778324;
			tZoomLevel = 11;
		}
		else if ('오산시' == gugunName)
		{
			tLon = 127.051182174;
			tLat = 37.1634037077;
			tZoomLevel = 13;
		}
		else if ('시흥시' == gugunName)
		{
			tLon = 126.787419628;
			tLat = 37.3891306803;
			tZoomLevel = 12;
		}
		else if ('군포시' == gugunName)
		{
			tLon = 126.921303483;
			tLat = 37.3432154979;
			tZoomLevel = 13;
		}
		else if ('의왕시' == gugunName)
		{
			tLon = 126.989634594;
			tLat = 37.3623620835;
			tZoomLevel = 13;
		}
		else if ('하남시' == gugunName)
		{
			tLon = 127.206220072;
			tLat = 37.5229188092;
			tZoomLevel = 13;
		}
		else if ('용인시' == gugunName)
		{
			tLon = 127.20414;
			tLat = 37.23810;
			tZoomLevel = 11;
		}
		else if ('파주시' == gugunName)
		{
			tLon = 126.820222226;
			tLat = 37.845836216;
			tZoomLevel = 11;
		}
		else if ('이천시' == gugunName)
		{
			tLon = 127.48107709;
			tLat = 37.20999101;
			tZoomLevel = 11;
		}
		else if ('안성시' == gugunName)
		{
			tLon = 127.302998316;
			tLat = 37.0349326927;
			tZoomLevel = 11;
		}
		else if ('김포시' == gugunName)
		{
			tLon = 126.624845466;
			tLat = 37.678413808;
			tZoomLevel = 12;
		}
		else if ('화성시' == gugunName)
		{
			tLon = 126.872927755;
			tLat = 37.1655635599;
			tZoomLevel = 11;
		}
		else if ('광주시' == gugunName)
		{
			tLon = 127.301159117;
			tLat = 37.4029889409;
			tZoomLevel = 11;
		}
		else if ('양주시' == gugunName)
		{
			tLon = 127.001251933;
			tLat = 37.808700342;
			tZoomLevel = 11;
		}
		else if ('포천시' == gugunName)
		{
			tLon = 127.250455938;
			tLat = 37.9700709877;
			tZoomLevel = 11;
		}
		else if ('여주군' == gugunName)
		{
			tLon = 127.615732952;
			tLat = 37.3025202422;
			tZoomLevel = 11;
		}
		else if ('연천군' == gugunName)
		{
			tLon = 126.994441282;
			tLat = 38.111917829;
			tZoomLevel = 11;
		}
		else if ('가평군' == gugunName)
		{
			tLon = 127.450293064;
			tLat = 37.8186915048;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 127.578678703;
			tLat = 37.5182327188;
			tZoomLevel = 11;
		}
	}

	else if ('강원도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 128.29602858;
			tLat = 37.7304994543;
			tZoomLevel = 9;
		}
		else if ('춘천시' == gugunName)
		{
			tLon = 127.740096882;
			tLat = 37.8901381535;
			tZoomLevel = 11;
		}
		else if ('원주시' == gugunName)
		{
			tLon = 127.931101875;
			tLat = 37.3083907205;
			tZoomLevel = 11;
		}
		else if ('강릉시' == gugunName)
		{
			tLon = 128.832016079;
			tLat = 37.7095093556;
			tZoomLevel = 11;
		}
		else if ('동해시' == gugunName)
		{
			tLon = 129.056056906;
			tLat = 37.5071695574;
			tZoomLevel = 12;
		}
		else if ('태백시' == gugunName)
		{
			tLon = 128.980152651;
			tLat = 37.1728629258;
			tZoomLevel = 11;
		}
		else if ('속초시' == gugunName)
		{
			tLon = 128.520212465;
			tLat = 38.176382828;
			tZoomLevel = 13;
		}
		else if ('삼척시' == gugunName)
		{
			tLon = 129.122094768;
			tLat = 37.2775832358;
			tZoomLevel = 11;
		}
		else if ('홍천군' == gugunName)
		{
			tLon = 128.074201966;
			tLat = 37.7448889638;
			tZoomLevel = 10;
		}
		else if ('횡성군' == gugunName)
		{
			tLon = 128.077351669;
			tLat = 37.5097745549;
			tZoomLevel = 11;
		}
		else if ('영월군' == gugunName)
		{
			tLon = 128.501349173;
			tLat = 37.2036267529;
			tZoomLevel = 11;
		}
		else if ('평창군' == gugunName)
		{
			tLon = 128.482629943;
			tLat = 37.5565884503;
			tZoomLevel = 10;
		}
		else if ('정선군' == gugunName)
		{
			tLon = 128.73927487;
			tLat = 37.3787156556;
			tZoomLevel = 11;
		}
		else if ('철원군' == gugunName)
		{
			tLon = 127.354005188;
			tLat = 38.235538534;
			tZoomLevel = 11;
		}
		else if ('화천군' == gugunName)
		{
			tLon = 127.687853746;
			tLat = 38.1613323752;
			tZoomLevel = 11;
		}
		else if ('양구군' == gugunName)
		{
			tLon = 127.992748388;
			tLat = 38.1912977691;
			tZoomLevel = 11;
		}
		else if ('인제군' == gugunName)
		{
			tLon = 128.262736401;
			tLat = 38.0680853741;
			tZoomLevel = 10;
		}
		else if ('고성군' == gugunName)
		{
			tLon = 128.400667843;
			tLat = 38.3765736395;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 128.595876372;
			tLat = 38.0048283491;
			tZoomLevel = 11;
		}
	}

	else if ('충청북도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 127.831465606;
			tLat = 36.7387233326;
			tZoomLevel = 9;
		}
		else if ('청주시' == gugunName)
		{
			tLon = 127.49133;
			tLat = 36.63580;
			tZoomLevel = 13;
		}
		else if ('충주시' == gugunName)
		{
			tLon = 127.895704456;
			tLat = 37.0152595478;
			tZoomLevel = 11;
		}
		else if ('제천시' == gugunName)
		{
			tLon = 128.141011967;
			tLat = 37.0600898391;
			tZoomLevel = 11;
		}
		else if ('청원군' == gugunName)
		{
			tLon = 127.505332991;
			tLat = 36.6246191166;
			tZoomLevel = 11;
		}
		else if ('보은군' == gugunName)
		{
			tLon = 127.729455823;
			tLat = 36.4900232344;
			tZoomLevel = 11;
		}
		else if ('옥천군' == gugunName)
		{
			tLon = 127.656709654;
			tLat = 36.3205714929;
			tZoomLevel = 11;
		}
		else if ('영동군' == gugunName)
		{
			tLon = 127.81435652;
			tLat = 36.1595449021;
			tZoomLevel = 11;
		}
		else if ('진천군' == gugunName)
		{
			tLon = 127.440484993;
			tLat = 36.8708224311;
			tZoomLevel = 12;
		}
		else if ('괴산군' == gugunName)
		{
			tLon = 127.829615381;
			tLat = 36.7695043385;
			tZoomLevel = 11;
		}
		else if ('음성군' == gugunName)
		{
			tLon = 127.614424859;
			tLat = 36.9759855584;
			tZoomLevel = 11;
		}
		else if ('단양군' == gugunName)
		{
			tLon = 128.387913958;
			tLat = 36.9943312448;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 127.604575917;
			tLat = 36.7865404129;
			tZoomLevel = 12;
		}
	}

	else if ('충청남도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 126.844217697;
			tLat = 36.530357843;
			tZoomLevel = 9;
		}
		else if ('천안시' == gugunName)
		{
			tLon = 127.19732;
			tLat = 36.80267;
			tZoomLevel = 11;
		}
		else if ('공주시' == gugunName)
		{
			tLon = 127.075338163;
			tLat = 36.4798006661;
			tZoomLevel = 11;
		}
		else if ('보령시' == gugunName)
		{
			tLon = 126.59187963;
			tLat = 36.3467207102;
			tZoomLevel = 11;
		}
		else if ('아산시' == gugunName)
		{
			tLon = 126.980491686;
			tLat = 36.8070527722;
			tZoomLevel = 11;
		}
		else if ('서산시' == gugunName)
		{
			tLon = 126.461781808;
			tLat = 36.7909720591;
			tZoomLevel = 11;
		}
		else if ('논산시' == gugunName)
		{
			tLon = 127.157957679;
			tLat = 36.1908985986;
			tZoomLevel = 11;
		}
		else if ('계룡시' == gugunName)
		{
			tLon = 127.234364903;
			tLat = 36.2912549156;
			tZoomLevel = 13;
		}
		else if ('당진시' == gugunName)
		{
			tLon = 126.651198579;
			tLat = 36.904528117;
			tZoomLevel = 11;
		}
		else if ('금산군' == gugunName)
		{
			tLon = 127.478297126;
			tLat = 36.1192703778;
			tZoomLevel = 11;
		}
		else if ('부여군' == gugunName)
		{
			tLon = 126.85700491;
			tLat = 36.2463958531;
			tZoomLevel = 11;
		}
		else if ('서천군' == gugunName)
		{
			tLon = 126.703936148;
			tLat = 36.1065106554;
			tZoomLevel = 12;
		}
		else if ('청양군' == gugunName)
		{
			tLon = 126.853210395;
			tLat = 36.4306271734;
			tZoomLevel = 11;
		}
		else if ('홍성군' == gugunName)
		{
			tLon = 126.622905831;
			tLat = 36.5695935997;
			tZoomLevel = 12;
		}
		else if ('예산군' == gugunName)
		{
			tLon = 126.784186374;
			tLat = 36.6704751346;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 126.284175678;
			tLat = 36.6977652264;
			tZoomLevel = 10;
		}
	}

	else if ('전라북도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 127.144985582;
			tLat = 35.714814157;
			tZoomLevel = 9;
		}
		else if ('전주시' == gugunName)
		{
			tLon = 127.11859;
			tLat = 35.83416;
			tZoomLevel = 12;
		}
		else if ('군산시' == gugunName)
		{
			tLon = 126.724171855;
			tLat = 35.9516278583;
			tZoomLevel = 12;
		}
		else if ('익산시' == gugunName)
		{
			tLon = 126.989376051;
			tLat = 36.0232510204;
			tZoomLevel = 11;
		}
		else if ('정읍시' == gugunName)
		{
			tLon = 126.904987644;
			tLat = 35.6029883289;
			tZoomLevel = 11;
		}
		else if ('남원시' == gugunName)
		{
			tLon = 127.44141544;
			tLat = 35.4223998991;
			tZoomLevel = 11;
		}
		else if ('김제시' == gugunName)
		{
			tLon = 126.906985463;
			tLat = 35.8037450125;
			tZoomLevel = 12;
		}
		else if ('완주군' == gugunName)
		{
			tLon = 127.215240875;
			tLat = 35.9188205051;
			tZoomLevel = 10;
		}
		else if ('진안군' == gugunName)
		{
			tLon = 127.430103551;
			tLat = 35.8287942206;
			tZoomLevel = 11;
		}
		else if ('무주군' == gugunName)
		{
			tLon = 127.712952521;
			tLat = 35.9392799239;
			tZoomLevel = 11;
		}
		else if ('장수군' == gugunName)
		{
			tLon = 127.544136097;
			tLat = 35.657132528;
			tZoomLevel = 11;
		}
		else if ('임실군' == gugunName)
		{
			tLon = 127.236112959;
			tLat = 35.5977483204;
			tZoomLevel = 11;
		}
		else if ('순창군' == gugunName)
		{
			tLon = 127.089813921;
			tLat = 35.4336279916;
			tZoomLevel = 11;
		}
		else if ('고창군' == gugunName)
		{
			tLon = 126.615736717;
			tLat = 35.4483261929;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 126.639882344;
			tLat = 35.6767414449;
			tZoomLevel = 11;
		}
	}

	else if ('전라남도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 126.887773734;
			tLat = 34.8710274286;
			tZoomLevel = 9;
		}
		else if ('목포시' == gugunName)
		{
			tLon = 126.389190642;
			tLat = 34.8033721683;
			tZoomLevel = 13;
		}
		else if ('여수시' == gugunName)
		{
			tLon = 127.652516814;
			tLat = 34.6962549884;
			tZoomLevel = 10;
		}
		else if ('순천시' == gugunName)
		{
			tLon = 127.389266157;
			tLat = 34.9947420835;
			tZoomLevel = 11;
		}
		else if ('나주시' == gugunName)
		{
			tLon = 126.719688609;
			tLat = 34.9882148621;
			tZoomLevel = 11;
		}
		else if ('광양시' == gugunName)
		{
			tLon = 127.656217647;
			tLat = 35.0191681395;
			tZoomLevel = 11;
		}
		else if ('담양군' == gugunName)
		{
			tLon = 126.995361581;
			tLat = 35.2915294186;
			tZoomLevel = 11;
		}
		else if ('곡성군' == gugunName)
		{
			tLon = 127.263666793;
			tLat = 35.2166758523;
			tZoomLevel = 11;
		}
		else if ('구례군' == gugunName)
		{
			tLon = 127.503208268;
			tLat = 35.2369616565;
			tZoomLevel = 11;
		}
		else if ('고흥군' == gugunName)
		{
			tLon = 127.315931368;
			tLat = 34.5973697213;
			tZoomLevel = 11;
		}
		else if ('보성군' == gugunName)
		{
			tLon = 127.162350429;
			tLat = 34.8146255992;
			tZoomLevel = 11;
		}
		else if ('화순군' == gugunName)
		{
			tLon = 127.033457185;
			tLat = 35.0083123023;
			tZoomLevel = 11;
		}
		else if ('장흥군' == gugunName)
		{
			tLon = 126.921885943;
			tLat = 34.6762654238;
			tZoomLevel = 11;
		}
		else if ('강진군' == gugunName)
		{
			tLon = 126.77220628;
			tLat = 34.6198451756;
			tZoomLevel = 11;
		}
		else if ('해남군' == gugunName)
		{
			tLon = 126.514650373;
			tLat = 34.553084694;
			tZoomLevel = 11;
		}
		else if ('영암군' == gugunName)
		{
			tLon = 126.632330528;
			tLat = 34.8022106547;
			tZoomLevel = 11;
		}
		else if ('무안군' == gugunName)
		{
			tLon = 126.422549019;
			tLat = 34.9568469103;
			tZoomLevel = 11;
		}
		else if ('함평군' == gugunName)
		{
			tLon = 126.535123759;
			tLat = 35.1126816364;
			tZoomLevel = 11;
		}
		else if ('영광군' == gugunName)
		{
			tLon = 126.445854559;
			tLat = 35.2765932631;
			tZoomLevel = 11;
		}
		else if ('장성군' == gugunName)
		{
			tLon = 126.768730524;
			tLat = 35.3294681971;
			tZoomLevel = 11;
		}
		else if ('완도군' == gugunName)
		{
			tLon = 126.785311246;
			tLat = 34.2948523975;
			tZoomLevel = 11;
		}
		else if ('진도군' == gugunName)
		{
			tLon = 126.207666074;
			tLat = 34.4334072079;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 126.037059382;
			tLat = 34.8008201449;
			tZoomLevel = 10;
		}
	}

	else if ('경상북도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 128.749598184;
			tLat = 36.3488145265;
			tZoomLevel = 9;
		}
		else if ('포항시' == gugunName)
		{
			tLon = 129.35712;
			tLat = 36.06796;
			tZoomLevel = 10;
		}
		else if ('경주시' == gugunName)
		{
			tLon = 129.235849206;
			tLat = 35.8265978876;
			tZoomLevel = 11;
		}
		else if ('김천시' == gugunName)
		{
			tLon = 128.078071498;
			tLat = 36.0604916678;
			tZoomLevel = 10;
		}
		else if ('안동시' == gugunName)
		{
			tLon = 128.779994162;
			tLat = 36.5802730691;
			tZoomLevel = 10;
		}
		else if ('구미시' == gugunName)
		{
			tLon = 128.355485074;
			tLat = 36.2077061062;
			tZoomLevel = 11;
		}
		else if ('영주시' == gugunName)
		{
			tLon = 128.597829399;
			tLat = 36.8704683216;
			tZoomLevel = 11;
		}
		else if ('영천시' == gugunName)
		{
			tLon = 128.942508846;
			tLat = 36.0157209571;
			tZoomLevel = 11;
		}
		else if ('상주시' == gugunName)
		{
			tLon = 128.066883553;
			tLat = 36.4295106471;
			tZoomLevel = 11;
		}
		else if ('문경시' == gugunName)
		{
			tLon = 128.148810468;
			tLat = 36.6905939105;
			tZoomLevel = 11;
		}
		else if ('경산시' == gugunName)
		{
			tLon = 128.809244377;
			tLat = 35.8337089834;
			tZoomLevel = 11;
		}
		else if ('군위군' == gugunName)
		{
			tLon = 128.648502461;
			tLat = 36.1702050263;
			tZoomLevel = 11;
		}
		else if ('의성군' == gugunName)
		{
			tLon = 128.615192016;
			tLat = 36.3619687605;
			tZoomLevel = 11;
		}
		else if ('청송군' == gugunName)
		{
			tLon = 129.057380825;
			tLat = 36.357192156;
			tZoomLevel = 11;
		}
		else if ('영양군' == gugunName)
		{
			tLon = 129.145179675;
			tLat = 36.6972300684;
			tZoomLevel = 11;
		}
		else if ('영덕군' == gugunName)
		{
			tLon = 129.317925649;
			tLat = 36.4824754612;
			tZoomLevel = 11;
		}
		else if ('청도군' == gugunName)
		{
			tLon = 128.78564201;
			tLat = 35.6725644085;
			tZoomLevel = 11;
		}
		else if ('고령군' == gugunName)
		{
			tLon = 128.305790893;
			tLat = 35.736301672;
			tZoomLevel = 11;
		}
		else if ('성주군' == gugunName)
		{
			tLon = 128.234195924;
			tLat = 35.9070044196;
			tZoomLevel = 11;
		}
		else if ('칠곡군' == gugunName)
		{
			tLon = 128.462981112;
			tLat = 36.0156147247;
			tZoomLevel = 12;
		}
		else if ('예천군' == gugunName)
		{
			tLon = 128.422586593;
			tLat = 36.6542184667;
			tZoomLevel = 11;
		}
		else if ('봉화군' == gugunName)
		{
			tLon = 128.913032806;
			tLat = 36.9344887285;
			tZoomLevel = 11;
		}
		else if ('울진군' == gugunName)
		{
			tLon = 129.313033543;
			tLat = 36.9042176051;
			tZoomLevel = 10;
		}
		else
		{
			tLon = 130.862953836;
			tLat = 37.5023247559;
			tZoomLevel = 12;
		}
	}

	else if ('경상남도' == sidoName)
	{
		if ('전체' == gugunName)
		{
			tLon = 128.26109287;
			tLat = 35.3209960771;
			tZoomLevel = 9;
		}
		else if ('진주시' == gugunName)
		{
			tLon = 128.129792554;
			tLat = 35.2051237516;
			tZoomLevel = 11;
		}
		else if ('통영시' == gugunName)
		{
			tLon = 128.375054359;
			tLat = 34.8268664093;
			tZoomLevel = 11;
		}
		else if ('사천시' == gugunName)
		{
			tLon = 128.037374995;
			tLat = 35.0487400844;
			tZoomLevel = 11;
		}
		else if ('김해시' == gugunName)
		{
			tLon = 128.8454036;
			tLat = 35.2719514359;
			tZoomLevel = 11;
		}
		else if ('밀양시' == gugunName)
		{
			tLon = 128.789330734;
			tLat = 35.498100736;
			tZoomLevel = 11;
		}
		else if ('거제시' == gugunName)
		{
			tLon = 128.623482785;
			tLat = 34.8702345165;
			tZoomLevel = 11;
		}
		else if ('양산시' == gugunName)
		{
			tLon = 129.041263939;
			tLat = 35.401332;
			tZoomLevel = 11;
		}
		else if ('창원시' == gugunName)
		{
			tLon = 128.62035;
			tLat = 35.20171;
			tZoomLevel = 11;
		}
		else if ('의령군' == gugunName)
		{
			tLon = 128.277356554;
			tLat = 35.3923201396;
			tZoomLevel = 11;
		}
		else if ('함안군' == gugunName)
		{
			tLon = 128.431233035;
			tLat = 35.2911442226;
			tZoomLevel = 11;
		}
		else if ('창녕군' == gugunName)
		{
			tLon = 128.492831632;
			tLat = 35.5084050576;
			tZoomLevel = 11;
		}
		else if ('고성군' == gugunName)
		{
			tLon = 128.29103391;
			tLat = 35.0155604439;
			tZoomLevel = 11;
		}
		else if ('남해군' == gugunName)
		{
			tLon = 127.942180027;
			tLat = 34.8185674708;
			tZoomLevel = 11;
		}
		else if ('하동군' == gugunName)
		{
			tLon = 127.779474439;
			tLat = 35.1373770616;
			tZoomLevel = 11;
		}
		else if ('산청군' == gugunName)
		{
			tLon = 127.88437372;
			tLat = 35.3685397922;
			tZoomLevel = 11;
		}
		else if ('함양군' == gugunName)
		{
			tLon = 127.72185815;
			tLat = 35.5514934792;
			tZoomLevel = 11;
		}
		else if ('거창군' == gugunName)
		{
			tLon = 127.904181857;
			tLat = 35.7324858391;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 128.141635799;
			tLat = 35.576537628;
			tZoomLevel = 11;
		}
	}

	else
	{
		if ('전체' == gugunName)
		{
			tLon = 126.553987435;
			tLat = 33.3873862815;
			tZoomLevel = 11;			
		}
		else if ('제주시' == gugunName)
		{
			tLon = 126.530023637;
			tLat = 33.4435561003;
			tZoomLevel = 11;
		}
		else
		{
			tLon = 126.581052994;
			tLat = 33.3239461072;
			tZoomLevel = 11;
		}
	}

	moveToOnMap(tLon, tLat, tZoomLevel);
/*	var lonlat = new OpenLayers.LonLat(tLon, tLat);
	lonlat.transform(map.displayProjection, map.baseLayer.projection);
	map.setCenter(lonlat, tZoomLevel);
*/	
}
