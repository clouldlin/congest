
$(document).ready(function(){
	
});

/********************************************************************************
* 기      능   	: Ajax 데이터 return 
* @param obj 	: 
* @return  		: result
********************************************************************************/
  var requestJsonData = function(url, paramsJson, type, asyncHandler, lodingHandler) {
		var asyncYn = false;
		if (type != null) type = "post"; 
		if (asyncHandler != null) asyncYn = true;
		var result = null;
		if(paramsJson == "undefined" || paramsJson == null ){
			paramsJson = null;
		} 
		var  xhr = $.ajax({
			  url: url,
			  async: asyncYn, 
			  type:type,
			  data: paramsJson ,
			  dataType: "json",
			  success: function(transport, status, xhr) {
					result = transport;
			  },
			  error: function(transport, status, xhr) {
				  //alert(url+'\n'+'시스템 관리자에게 문의 바랍니다.');
			  },
			  complete: function(transport,status,xhr) {}
		});
		return result;
  }
  
  /* =========================================================================
   * 
   * LPAD
   *  
   * =========================================================================
   */
 	  function lPad(value,totalLen,strReplace){

 			var strAdd = "";
 			var diffLen = totalLen - value.length;
 			for(var i=0;i<diffLen;i++){
 				strAdd += strReplace;
 			}
 			return strAdd+value;
 		}
  /* =========================================================================*/
  
  /* =========================================================================
   * 
   * RPAD
   *  
   * =========================================================================
   */
  	  function rPad(value,totalLen,strReplace){

  			var strAdd = "";
  			var diffLen = totalLen - value.length;
  			for(var i=0;i<diffLen;i++){
  				strAdd += strReplace;
  			}
  			return value+strAdd;
  		}
   /* =========================================================================*/
  

   /* =========================================================================*/

  /* =========================================================================
   * 
   * 날짜포맷
   *  
   * =========================================================================
   */
  	  function fn_GetTimeFormat(value, flag){
  		  
  		  if(value.indexOf('-') > 0)
  		  {
  			  return value;
  		  }
  		  if (flag == "yyyy-MM-dd")
  			  return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
  		  else
  			  return value;
  	  }
  /* =========================================================================
   * 
   * 공백값을 문자'0' 값으로 리턴
   *  
   * =========================================================================
   */
  	  function emptyToZeroString(value){
  		  if (lPad(rPad(value)) == "")
  			  return "0";
  		  else
  			  return value;
  	  }
  
  /* =========================================================================
   * 
   * 천단위 콤마
   *  
   * =========================================================================
   */
  	function thouSandComma(n) {
  		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
  		n += '';                          // 숫자를 문자열로 변환
  		 
  		while (reg.test(n))
  			n = n.replace(reg, '$1' + ',' + '$2');
  		 
  		return n;
  	}

    /* =========================================================================
     * 
     * 시스템 시간 세팅
     *  
     * =========================================================================
     */
    function getTimeStamp(flag) {
    	var d = new Date();
    	var s = '';
    	if (flag == "yyyyMMdd_HHmmss"){
  	      s = leadingZeros(d.getFullYear(), 4) + '' +
  	        leadingZeros(d.getMonth() + 1, 2) + '' +
  	        leadingZeros(d.getDate(), 2) + '_' +
  	        leadingZeros(d.getHours(), 2) + '' +
  	        leadingZeros(d.getMinutes(), 2) + '' +
  	        leadingZeros(d.getSeconds(), 2);
    	}
    	else{
	      s = leadingZeros(d.getFullYear(), 4) + '-' +
  	        leadingZeros(d.getMonth() + 1, 2) + '-' +
  	        leadingZeros(d.getDate(), 2) + ' ' +
  	        leadingZeros(d.getHours(), 2) + ':' +
  	        leadingZeros(d.getMinutes(), 2) + ':' +
  	        leadingZeros(d.getSeconds(), 2);
	    }
    	return s;
    }

    /* =========================================================================
     * 
     * 숫자의 자리수 를 0으로 채우기
     *  
     * =========================================================================
     */
    function leadingZeros(n, digits) {
      var zero = '';
      n = n.toString();
      if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    }
  	
  	/* =========================================================================
     * 
     * 해당 ID의 공백 체크
     *  
     * =========================================================================
     */
  	function fn_formValChk(id){
	 	var val_str = $('#'+id).val();
	 	if(val_str == null || val_str.length <= 0 || val_str == '')
 		{
	 		return true;
 		}
	 	else
	 	{
	 		return false;
	 	}
  	};
  	
  	/* =========================================================================
     * 
     * 파라미터 쿼리 스트링
     *  
     * =========================================================================
     */
	 var getParameter = function(qs) {
         var value = '';
         var address = unescape(location.href);
         var param= (address.slice(address .indexOf('?') + 1, address.length)).split('&');
         for (var i = 0; i < param.length; i++) {
             var name = param[i].split('=')[0];
             if (name.toUpperCase() == qs.toUpperCase()) {
                 value = param[i].split('=')[1];
                 break;
             }
         }
         return value ;
	 }
  	
  	/* =========================================================================
     * 
     * StringBuffer 사용하기
     *  
     * =========================================================================
     */
  	var StringBuffer = function() {
  	    this.buffer = new Array();
  	};
  	StringBuffer.prototype.append = function(str) {
  	    this.buffer[this.buffer.length] = str;
  	};
  	StringBuffer.prototype.toString = function() {
  	    return this.buffer.join("");
  	};
  	

 
  	