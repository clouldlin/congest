package go.kr.congest.web.map.service;

import java.util.List;
import java.util.Map;

public interface MapService {

	public List<?> list(Map<String, String> commandMap) throws Exception;

	public Integer listTotalCount(Map<String, String> commandMap) throws Exception;

	public Map view(Map<String, String> commandMap) throws Exception;

	public void update(Map<String, String> commandMap) throws Exception;
	
	public void updateHitCount(Map<String, String> commandMap) throws Exception;
	
	public void delete(Map<String, String> commandMap) throws Exception;
	
	public void insert(Map<String,String> commandMap) throws Exception;
}
