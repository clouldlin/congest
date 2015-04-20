package go.kr.congest.common.login.service;

import java.util.Map;

import go.kr.congest.common.vo.LoginVO;

public interface LoginService {
	public Integer loginUserCheck(Map<String, String> commandMap);

	public LoginVO selectUserById(Map<String, String> commandMap);
}
