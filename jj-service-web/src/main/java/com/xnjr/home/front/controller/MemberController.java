package com.xnjr.home.front.controller;

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
    public Object doPersonRegister(@RequestParam("loginName") String mobile,
            @RequestParam("captcha") String captcha,
            @RequestParam("userReferee") String userReferee) {

        String sessionId = ControllerContext.getRequest().getSession().getId();
        boolean flag = imageCaptchaService.validateResponseForID(sessionId,
            captcha);
        imageCaptchaService.removeCaptcha(sessionId);
        if (!flag) { // 验证码正确
            throw new BizException("83099901", "图片验证码不正确");
        }
        return userAO.doRegister(mobile, userReferee);
    }
    
    //服务方注册
    @RequestMapping(value = "/regist/comp", method = RequestMethod.POST)
    @ResponseBody
    public Object doCompRegister(){
    	return true;
    }

    //需求方登录
    @RequestMapping(value = "/login/person", method = RequestMethod.POST)
    @ResponseBody
    public Object doPersonLogin(@RequestParam("loginName") String loginName,
            @RequestParam("loginPwd") String loginPwd,
            @RequestParam("terminalType") String terminalType,
            @RequestParam(value = "kind", required = false) String kind) {
        /*XN805043Res res = userAO.doLogin(loginName, loginPwd, kind);
        XN805056Res res1 = userAO.doGetUser(res.getUserId());
        if (ETermType.WEB.getCode().equals(terminalType)) {
            SessionUser sessionUser = new SessionUser();
            sessionUser.setUserId(res.getUserId());
            sessionUser.setKind(res1.getKind());
            // 创建session
            setSessionUser(sessionUser);
        }*//*
          * else if (ETermType.APP.getCode().equals(terminalType)) { TokenDO
          * tokenDO = new TokenDO(); String userId = res.getUserId(); //
          * userId是否存在 User user = userDAO.getUser(userId); if (user != null) {
          * userDAO.del(userId); } String tokenId =
          * OrderNoGenerater.generateM(userId); // userId,tokenId保存在本地 User
          * userdo = new User(); userdo.setUserId(userId);
          * userdo.setTokenId(tokenId); userDAO.saveUser(userdo);
          * tokenDO.setTokenId(tokenId); tokenDO.setUserId(userId); // return
          * tokenDO给app客户端 return tokenDO; }
          */
        return userAO.doLogin(loginName, loginPwd, kind);
    }
    
    //服务方登录
    @RequestMapping(value = "/login/comp", method = RequestMethod.POST)
    @ResponseBody
    public Object doCompLogin(){
    	return true;
    }
    
    //需求方用户详情
    @RequestMapping(value = "/info/person", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetUser() {
        return userAO.doGetUser(getSessionUserId(""));
    }
    
    //服务方用户详情
    @RequestMapping(value = "/info/comp", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetCompUser() {
        return userAO.doGetUser(this.getSessionUser().getCompanyCode());
    }


    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public boolean logout() {
        sessionProvider.removeAttribute(ISessionProvider.SESSION_KEY_USER);
        return true;
    }


    // ****登陆密码start******
    @RequestMapping(value = "/loginpwd/reset", method = RequestMethod.POST)
    @ResponseBody
    public boolean doResetLoginPwd(@RequestParam("oldLoginPwd") String oldPwd,
            @RequestParam("newLoginPwd") String newPwd,
            @RequestParam(value = "userId", required = false) String userId) {
        userAO.doResetLoginPwd(getSessionUserId(userId), oldPwd, newPwd);
        // 重新登陆
        return logout();
    }

    @RequestMapping(value = "/loginpwd/find", method = RequestMethod.POST)
    @ResponseBody
    public boolean doFindLoginPwd(@RequestParam("mobile") String mobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam("newLoginPwd") String newLoginPwd) {
        userAO.doFindLoginPwd(mobile, newLoginPwd, smsCaptcha);
        return true;
    }

    // ****登陆密码end******

    // ****交易密码end****
    // **** 换手机号start************
    @RequestMapping(value = "/mobile/change", method = RequestMethod.POST)
    @ResponseBody
    public boolean doChangeMobile(
            @RequestParam("newMobile") String newMobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam(value = "tradePwd", required = false) String tradePwd,
            @RequestParam(value = "userId", required = false) String userId) {

        userAO.doChangeMoblie(getSessionUserId(userId), newMobile, smsCaptcha,
            tradePwd);
        return true;
    }

    // **** 换手机号end************

}
