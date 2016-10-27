/**
 * @Title ISmsAO.java 
 * @Package com.ibis.pz.ao 
 * @Description 
 * @author miyb  
 * @date 2015-5-12 下午1:42:52 
 * @version V1.0   
 */
package com.xnjr.home.front.ao;

/** 
 * @author: miyb 
 * @since: 2015-5-12 下午1:42:52 
 * @history:
 */
public interface ISmsAO {
    /**
     * 发送短信验证码(校验短信验证码包含在具体业务中)
     * @param mobile
     * @param bizType 
     * @create: 2015-3-13 下午12:41:18 xieyj
     * @history:
     */
    public void sendSmsCaptcha(String mobile, String bizType);

}
