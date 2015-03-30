package go.kr.congest.common.code.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import go.kr.congest.common.vo.CommonVO;

@Repository("commonCodeDAO")
public class CommonCodeDAO extends EgovAbstractDAO {
	
	public List selectListCode(CommonVO searchVO) throws Exception {
		return list("CommonCodeSQL001.list", searchVO);
	}

}
