package go.kr.congest.common.login.service.impl;

import go.kr.congest.common.login.service.LoginService;
import go.kr.congest.common.vo.LoginVO;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("loginService")
public class LoginServiceImpl  implements LoginService {

	@Resource(name="loginDAO")
	private LoginDAO loginDAO;

	@Override
	public Integer loginUserCheck(Map<String, String> commandMap) {
		return loginDAO.loginUserCheck(commandMap);
	}

	@Override
	public LoginVO selectUserById(Map<String, String> commandMap) {
		return loginDAO.selectUserById(commandMap);
	}
}
