/**
 * @Title SmsAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-12 下午2:52:31 
 * @version V1.0   
 */
package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.ISmsAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN799003Req;



/** 
 * @author: miyb 
 * @since: 2015-5-12 下午2:52:31 
 * @history:
 */
@Service
public class SmsAOImpl implements ISmsAO {

    /** 
     * @see com.ibis.pz.ao.ISmsAO#sendSmsCaptcha(java.lang.String, java.lang.String)
     */
    @Override
    public void sendSmsCaptcha(String mobile, String bizType) {
    	XN799003Req req = new XN799003Req();
        req.setMobile(mobile);
        req.setBizType(bizType);
        BizConnecter.getBizData("799003", JsonUtils.object2Json(req),
            Object.class);
    }
}