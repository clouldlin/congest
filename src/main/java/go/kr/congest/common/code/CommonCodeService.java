package go.kr.congest.common.code;

import go.kr.congest.common.vo.CommonVO;

import java.util.List;

public interface CommonCodeService {

	public List selectListCode(CommonVO searchVO) throws Exception;

}
