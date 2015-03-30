package go.kr.congest.web.map.web;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import go.kr.congest.common.controller.CommonAbstarctController;
import go.kr.congest.common.file.CommonFileUtil;
import go.kr.congest.common.file.service.CommonFileService;
import go.kr.congest.web.board.service.BoardService;

import java.util.Map;

import javax.annotation.Resource;
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
	BoardService boardService;
	
    @Resource(name = "commonFileUtil")
    private CommonFileUtil commonFileUtil;

    @Resource(name = "commonFileService")
    private CommonFileService commonfileService;
	
	/** BOARD_ID Generation Service */
	@Resource(name = "egovBoardIdGnrService")
	private EgovIdGnrService egovBoardIdGnrService;
	
	@RequestMapping("map.do")
	public String map(Map<String,String> commandMap, ModelMap model, HttpServletRequest request) throws Exception {
		
		return "map/map";
	}

}
