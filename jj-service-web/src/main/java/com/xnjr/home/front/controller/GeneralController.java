/**
 * @Title GeneralController.java 
 * @Package com.ibis.pz.controller.others 
 * @Description 
 * @author miyb  
 * @date 2015-3-22 下午8:23:09 
 * @version V1.0   
 */
package com.xnjr.home.front.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.ISmsAO;
import com.xnjr.home.front.enums.ESmsBizType;


/** 
 * @author: miyb 
 * @since: 2015-3-22 下午8:23:09 
 * @history:
 */
@Controller
@RequestMapping(value = "/gene")
public class GeneralController extends BaseController {
    @Autowired
    ISmsAO smsAO;

    // ****发送短信验证码start*******

    @RequestMapping(value = "/register/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendRegisterCode(@RequestParam("mobile") String mobile) {
    	sendPhoneCode(ESmsBizType.REGISTER.getCode(), mobile);
        return true;
    }

    @RequestMapping(value = "/person/findloginpwd/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendLoginpwdCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.PERSONFINDLOGINPWD.getCode(), mobile);
        return true;
    }
    
    @RequestMapping(value = "/comp/findloginpwd/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendCompLoginpwdCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.COMPFINDLOGINPWD.getCode(), mobile);
        return true;
    }

    @RequestMapping(value = "/changemobile/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendChangeMobileCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.CHANGEMOBILE.getCode(), mobile);
        return true;
    }

    private void sendPhoneCode(String bizType, String mobile) {
        smsAO.sendSmsCaptcha(mobile, bizType);
    }

}
