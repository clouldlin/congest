package go.kr.congest.common.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import go.kr.congest.common.code.CommonCodeService;
import go.kr.congest.common.login.LoginSessionManager;
import go.kr.congest.common.util.string.CommonStringUtil;
import go.kr.congest.common.vo.CommonVO;
import go.kr.congest.common.vo.LoginVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

public class CommonAbstarctController {

	final static Logger logger = LoggerFactory.getLogger(CommonAbstarctController.class);

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;
	
	@Resource(name = "commonCodeService")
	protected CommonCodeService commonCodeService;
	
	@Resource(name = "loginSessionManager")
	protected LoginSessionManager loginSessionManager;
	
	/**
	 * 공통코드를 조회해서 List로 넘겨준다.
	 * 
	 * @see
	 */
	protected List listCommCode(String grpCd) {

		grpCd = CommonStringUtil.isNullBlank(grpCd);
		CommonVO searchVO = new CommonVO();
		searchVO.setGrpCd(grpCd);
		List codeList = null;

		/* 분류 선택에 의한 하위 코드 리스트 불러오기 */
		try {
			codeList = commonCodeService.selectListCode(searchVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return codeList;
	}
	
	/**
	 * PaginationInfo 에 페이지에 대한 정보를 셋팅해 준다. pageRecourdCount 에 대한 셋팅
	 * 
	 * @see
	 */
	protected PaginationInfo setPaginationInfo(CommonVO searchVO, Map<String, String> commandMap) {

		/** pageing setting */
		PaginationInfo pageInfo = new PaginationInfo();
		pageInfo.setCurrentPageNo(searchVO.getPageIndex()); // 현재 페이지 번호
		pageInfo.setRecordCountPerPage(searchVO.getPageUnit()); // 한 페이지에 게시되는
																// 게시물 건수
		pageInfo.setPageSize(searchVO.getPageSize()); // 페이징 리스트의 사이즈

		/** pageing setting */
		int firstRecordIndex = pageInfo.getFirstRecordIndex();
		int recordCountPerPage = pageInfo.getRecordCountPerPage();
		commandMap.put("firstIndex", firstRecordIndex + "");
		commandMap.put("lastIndex", (recordCountPerPage + firstRecordIndex)	+ "");

		return pageInfo;
	}
	
	/**
	 * 로그인 vo getter 메서드
	 * null일 수도 있다 .
	 * @return 로그인 vo
	 */
	protected LoginVO getLoginVO() {
		LoginVO getLoginVO = null;
		if(loginSessionManager.getLoginVO() != null){
			getLoginVO = loginSessionManager.getLoginVO();
		}else{
			getLoginVO = new LoginVO();
		}
		return getLoginVO;
	}

	/**
	 * 로그인 vo remove 메서드
	 */
	protected void removeLoginVO() {
		loginSessionManager.removeLoginVO();
	}

	/**
	 * 세션을 생성해준다.
	 *
	 * @param DspCoLoginVO
	 */
	protected void setSession(LoginVO loginVO) {
		loginSessionManager.setSession(loginVO);
	}

	/**
	 * 세션을 삭제한다.
	 *
	 * @param request
	 */
	protected void removeSession(HttpServletRequest req) {
		loginSessionManager.removeSession(req);
	}
	
	
}
