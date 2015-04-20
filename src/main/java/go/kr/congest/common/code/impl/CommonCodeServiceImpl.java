package go.kr.congest.common.code.impl;

import go.kr.congest.common.code.CommonCodeService;
import go.kr.congest.common.vo.CommonVO;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("commonCodeService")
public class CommonCodeServiceImpl implements CommonCodeService {

	@Resource(name = "commonCodeDAO")
	CommonCodeDAO commonCodeDAO;

	@Override
	public List selectListCode(CommonVO searchVO) throws Exception {
		return commonCodeDAO.selectListCode(searchVO);
	}

}
