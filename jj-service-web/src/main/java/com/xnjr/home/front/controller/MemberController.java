package com.xnjr.home.front.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.ISmsAO;
import com.xnjr.home.front.ao.IUserAO;
import com.xnjr.home.front.base.ControllerContext;
import com.xnjr.home.front.captcha.MyCaptchaService;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.session.ISessionProvider;
import com.xnjr.home.front.session.SessionUser;


@Controller
@RequestMapping(value = "/user")
public class MemberController extends BaseController {
    @Autowired
    IUserAO userAO;

    @Autowired
    ISmsAO smsAO;

    @Resource(name = "imageCaptchaService")
    private MyCaptchaService imageCaptchaService;

    // ****主流程start************
    @RequestMapping(value = "/mobile/check", method = RequestMethod.POST)
    @ResponseBody
    public Object checkMobileExist(@RequestParam("loginName") String mobile) {
        return userAO.checkMobileExit(mobile);
    }
    
    //需求方注册
    @RequestMapping(value = "/regist/person", method = RequestMethod.POST)
    @ResponseBody
    public Object doPersonRegister(
    		@RequestParam("mobile") String mobile,
    		@RequestParam("loginPwd") String loginPwd,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam(value = "userReferee", required = false) String userReferee) {
    	userAO.doPersonRegister(mobile, loginPwd, userReferee, smsCaptcha);
    	Map map = userAO.doPersonLogin(mobile, loginPwd);
        Map map1 = userAO.doGetUser((String)map.get("userId"));
        SessionUser sessionUser = new SessionUser();
        sessionUser.setKind("f1");
        sessionUser.setUserId((String)map.get("userId"));
        // 创建session
        setSessionUser(sessionUser);
        return map1;
    }
    
    //服务方注册
    @RequestMapping(value = "/regist/comp", method = RequestMethod.POST)
    @ResponseBody
    public Object doCompRegister(
    		@RequestParam("type") String type,
    		@RequestParam("name") String name,
            @RequestParam("gsyyzzh") String gsyyzzh,
            @RequestParam("contacts") String contacts,
            @RequestParam("mobile") String mobile,
            @RequestParam("loginName") String loginName,
            @RequestParam("password") String password,
            @RequestParam("province") String province,
            @RequestParam("city") String city,
            @RequestParam("area") String area){
    	userAO.doCompRegister(type, name, gsyyzzh,
    			contacts, mobile, loginName, password,
    			province, city, area);
    	Map map = userAO.doCompLogin(loginName, password);
        Map map1 = userAO.doGetCompanyInfo((String)map.get("companyCode"));
        SessionUser sessionUser = new SessionUser();
        sessionUser.setKind("comp");
        sessionUser.setCompanyCode((String)map.get("companyCode"));
        // 创建session
        setSessionUser(sessionUser);
    	return map1;
    }

    //需求方登录
    @RequestMapping(value = "/login/person", method = RequestMethod.POST)
    @ResponseBody
    public Object doPersonLogin(
    		@RequestParam("captcha") String captcha,
    		@RequestParam("loginName") String loginName,
            @RequestParam("loginPwd") String loginPwd) {
    	String sessionId = ControllerContext.getRequest().getSession().getId();
    	boolean flag = imageCaptchaService.validateResponseForID(sessionId,
    			captcha);
    	imageCaptchaService.removeCaptcha(sessionId);
    	if (!flag) { // 验证码正确
    		throw new BizException("83099901", "图片验证码不正确");
    	}
        Map map = userAO.doPersonLogin(loginName, loginPwd);
        Map map1 = userAO.doGetUser((String)map.get("userId"));
        SessionUser sessionUser = new SessionUser();
        sessionUser.setKind("f1");
        sessionUser.setUserId((String)map.get("userId"));
        // 创建session
        setSessionUser(sessionUser);
        return map1;
    }
    
    //服务方登录
    @RequestMapping(value = "/login/comp", method = RequestMethod.POST)
    @ResponseBody
    public Object doCompLogin(
    		@RequestParam("captcha") String captcha,
    		@RequestParam("loginName") String loginName,
            @RequestParam("password") String password){
    	String sessionId = ControllerContext.getRequest().getSession().getId();
    	boolean flag = imageCaptchaService.validateResponseForID(sessionId,
    			captcha);
    	imageCaptchaService.removeCaptcha(sessionId);
    	if (!flag) { // 验证码正确
    		throw new BizException("83099901", "图片验证码不正确");
    	}
    	Map map = userAO.doCompLogin(loginName, password);
        Map map1 = userAO.doGetCompanyInfo((String)map.get("companyCode"));
        SessionUser sessionUser = new SessionUser();
        sessionUser.setKind("comp");
        sessionUser.setCompanyCode((String)map.get("companyCode"));
        // 创建session
        setSessionUser(sessionUser);
    	return map1;
    }
    
    //需求方用户详情
    @RequestMapping(value = "/info/person", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetUser() {
        return userAO.doGetUser(this.getSessionUser().getUserId());
    }
    
    //服务方用户详情
    @RequestMapping(value = "/info/comp", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetCompUser(@RequestParam(value = "code", required = false) String code) {
    	if(code == null){
    		code = this.getSessionUser().getCompanyCode();
    	}
        return userAO.doGetCompanyInfo(code);
    }


    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public boolean logout() {
        sessionProvider.removeAttribute(ISessionProvider.SESSION_KEY_USER);
        return true;
    }


    // ****登陆密码start******
    //需求方修改密码
    @RequestMapping(value = "/loginpwd/reset", method = RequestMethod.POST)
    @ResponseBody
    public boolean doResetLoginPwd(
    		@RequestParam("oldLoginPwd") String oldPwd,
            @RequestParam("newLoginPwd") String newPwd,
            @RequestParam(value = "userId", required = false) String userId) {
        userAO.doResetLoginPwd(this.getSessionUser().getUserId(), oldPwd, newPwd);
        // 重新登陆
        return logout();
    }

    //服务方修改密码
    @RequestMapping(value = "/loginpwd/comp/reset", method = RequestMethod.POST)
    @ResponseBody
    public boolean doResetCompLoginPwd(
    		@RequestParam("oldPassword") String oldPassword,
            @RequestParam("newPassword") String newPassword) {
        userAO.doResetCompLoginPwd(this.getSessionUser().getCompanyCode(),
        		oldPassword, newPassword);
        // 重新登陆
        return logout();
    }
    
    //需求方找回密码
    @RequestMapping(value = "/loginpwd/find", method = RequestMethod.POST)
    @ResponseBody
    public boolean doFindLoginPwd(
    		@RequestParam("mobile") String mobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam("newLoginPwd") String newLoginPwd) {
        userAO.doFindLoginPwd(mobile, newLoginPwd, smsCaptcha);
        return true;
    }
    
    //服务方找回密码
    @RequestMapping(value = "/loginpwd/comp/find", method = RequestMethod.POST)
    @ResponseBody
    public boolean doFindCompLoginPwd(
    		@RequestParam("loginName") String loginName,
    		@RequestParam("mobile") String mobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam("newPassword") String newPassword) {
    	userAO.doFindCompLoginPwd(loginName, mobile,
    			smsCaptcha, newPassword);
        return true;
    }

    // ****登陆密码end******

    // ****交易密码end****
    // **** 换手机号************
    @RequestMapping(value = "/mobile/change", method = RequestMethod.POST)
    @ResponseBody
    public boolean doChangeMobile(
            @RequestParam("newMobile") String newMobile,
            @RequestParam("smsCaptcha") String smsCaptcha) {
        userAO.doChangeMoblie(this.getSessionUser().getUserId(),
        		newMobile, smsCaptcha);
        return true;
    }
    
    //分页查询公司
    @RequestMapping(value = "/comp/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageCompany(
    		@RequestParam(value = "code", required = false) String code,
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "abbrName", required = false) String abbrName,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "isDefault", required = false) String isDefault,
    		@RequestParam(value = "location", required = false) String location,
    		@RequestParam(value = "province", required = false) String province,
    		@RequestParam(value = "city", required = false) String city,
    		@RequestParam(value = "area", required = false) String area,
    		@RequestParam(value = "userId", required = false) String userId,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit,
    		@RequestParam(value = "orderColumn", required = false) String orderColumn,
    		@RequestParam(value = "orderDir", required = false) String orderDir,
    		@RequestParam(value = "isHot", required = false) String isHot){
    	return userAO.queryPageCompany(code, name, abbrName, type,
    			isDefault, location, province, city, area,
    			userId, start, limit, orderColumn, orderDir, isHot);
    } 
    
    //修改公司信息
    @RequestMapping(value = "/comp/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editCompInfo(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "gsyyzzh", required = true) String gsyyzzh,
    		@RequestParam(value = "logo", required = true) String logo,
    		@RequestParam(value = "province", required = true) String province,
    		@RequestParam(value = "city", required = true) String city,
    		@RequestParam(value = "area", required = true) String area,
    		@RequestParam(value = "address", required = false) String address,
    		@RequestParam(value = "description", required = false) String description,
    		@RequestParam(value = "scale", required = false) String scale,
    		@RequestParam(value = "contacts", required = true) String contacts,
    		@RequestParam(value = "mobile", required = true) String mobile,
    		@RequestParam(value = "email", required = false) String email,
    		@RequestParam(value = "qq", required = false) String qq,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "slogan", required = false) String slogan,
    		@RequestParam(value = "remark", required = false) String remark){
    	return userAO.editCompanyInfo(
    			this.getSessionUser().getCompanyCode(),
    			name, gsyyzzh, logo, province, city,
    			area, address, description, scale,
    			contacts, mobile, email, qq, type,
    			slogan, remark);
    }
    
    
    //列表查询公司信息
    @RequestMapping(value = "/comp/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryListCompany(
    		@RequestParam(value = "province", required = false) String province,
    		@RequestParam(value = "city", required = false) String city){
    	return userAO.queryListCompany(province, city);
    }
}
