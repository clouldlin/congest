package go.kr.congest.common.login.web;

import go.kr.congest.common.Constants;
import go.kr.congest.common.controller.CommonAbstarctController;
import go.kr.congest.common.login.service.LoginService;
import go.kr.congest.common.vo.LoginVO;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.WebUtils;


@Controller
@RequestMapping("/member/")
public class LoginController extends CommonAbstarctController{

	private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource(name = "loginService")
    private LoginService loginService;

	@RequestMapping("login.do")
    public String login(Map<String,String> commandMap, ModelMap model, HttpServletRequest request) throws Exception {
		
		LoginVO loginVO = loginService.selectUserById(commandMap);
	
    	if(loginVO != null && loginVO.getUserId()!= null && !"".equals(loginVO.getUserId())){
    		// 세션 생성해 주기
    		WebUtils.setSessionAttribute(request,Constants.userSession, loginVO);
    		// 현재 로그인 정보를 세션에 저장
    		loginSessionManager.setSession(loginVO);
        	return "redirect:/map/map.do";
    	}else{
    		model.addAttribute("flag" ,"0");
	    	model.addAttribute("message"   ,"아이디 또는 비밀번호가 일치하지 않습니다.");
	    	
	    	return "forward:/map/map.do";
    	}
    }
	
	@RequestMapping("logout.do")
    public String logout(Map<String,String> commandMap, ModelMap model, HttpServletRequest request) throws Exception {

    	WebUtils.setSessionAttribute(request,Constants.userSession, "");
    	removeSession(request);
    	removeLoginVO();

		return "redirect:/map/map.do";
    }

}
