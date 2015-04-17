package go.kr.congest.web.map.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import go.kr.congest.web.map.service.MapService;


@Service("mapService")
public class MapServiceImpl extends AbstractServiceImpl implements MapService {

	@Resource(name="mapDAO")
	MapDAO mapdDAO;

}
