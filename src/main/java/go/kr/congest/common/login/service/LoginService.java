package go.kr.congest.common.login.service;

import go.kr.congest.common.vo.LoginVO;

import java.util.Map;


public interface LoginService {
	public Integer loginUserCheck(Map<String, String> commandMap);

	public LoginVO selectUserById(Map<String, String> commandMap);
}
