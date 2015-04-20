package go.kr.congest.common.login.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;
import go.kr.congest.common.vo.LoginVO;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("loginDAO")
public class LoginDAO extends EgovAbstractDAO {

	public Integer loginUserCheck(Map<String, String> commandMap){
		return (Integer)selectByPk("LoginSQL001.loginUserCheck", commandMap);
	}

	public LoginVO selectUserById(Map<String, String> commandMap) {
		return (LoginVO)selectByPk("LoginSQL001.selectUserById", commandMap);
	}
}
