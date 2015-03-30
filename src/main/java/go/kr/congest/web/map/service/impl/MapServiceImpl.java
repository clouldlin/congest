package go.kr.congest.web.map.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import go.kr.congest.web.board.service.BoardService;


@Service("mapService")
public class MapServiceImpl extends AbstractServiceImpl implements BoardService {

	@Resource(name="mapDAO")
	MapDAO boardDAO;

	@Override
	public List<?> list(Map<String, String> commandMap) throws Exception {
		return boardDAO.list(commandMap);
	}

	@Override
	public Integer listTotalCount(Map<String, String> commandMap) throws Exception {
		return boardDAO.listTotalCount(commandMap);
	}

	@Override
	public Map view(Map<String, String> commandMap) throws Exception {
		return boardDAO.view(commandMap);
	}

	@Override
	public void update(Map<String,String> commandMap) throws Exception {
		boardDAO.update(commandMap);
	}
	
	@Override
	public void updateHitCount(Map<String,String> commandMap) throws Exception {
		boardDAO.updateHitCount(commandMap);
	}
	
	@Override
	public void delete(Map<String, String> commandMap) throws Exception {
		boardDAO.delete(commandMap);
	}

	@Override
	public void insert(Map<String, String> commandMap) throws Exception {
		boardDAO.insert(commandMap);
	}

}
