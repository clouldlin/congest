package go.kr.congest.web.map.web;

import go.kr.congest.common.controller.CommonAbstarctController;
import go.kr.congest.web.map.service.MapService;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/map/")
public class MapController extends CommonAbstarctController {
	
	public static Logger logger = LoggerFactory.getLogger(MapController.class);

	@Autowired
	MapService mapService;
	
	@RequestMapping("map.do")
	public String map(Map<String,String> commandMap, ModelMap model, HttpServletRequest request) throws Exception {
		return "map.default";
	}

}
