package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IUserAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN602601Req;
import com.xnjr.home.front.req.XN805040Req;
import com.xnjr.home.front.req.XN805043Req;
import com.xnjr.home.front.req.XN805047Req;
import com.xnjr.home.front.req.XN805048Req;
import com.xnjr.home.front.req.XN805049Req;
import com.xnjr.home.front.util.PwdUtil;


/** 
 * @author: miyb 
 * @since: 2015-5-12 下午2:53:12 
 * @history:
 */
@Service
public class UserAOImpl implements IUserAO {

    @Override
    public Object doRegister(String mobile, String userReferee) {
        XN602601Req req = new XN602601Req();
        req.setMobile(mobile);
        req.setUserReferee(userReferee);
        return BizConnecter.getBizData("602601", JsonUtils.object2Json(req),
        		Object.class);
    }

    
    @Override
    public Object doLogin(String loginName, String loginPwd, String kind) {
        if (StringUtils.isBlank(loginName)) {
            throw new BizException("A010001", "登陆名不能为空");
        }
        if (StringUtils.isBlank(loginPwd)) {
            throw new BizException("A010001", "登陆密码不能为空");
        }

        XN805043Req req = new XN805043Req();
        req.setLoginName(loginName);
        req.setLoginPwd(loginPwd);
        //req.setKind("f1");

        return BizConnecter.getBizData("805043", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    // XN805056Res
    public Object doGetUser(String userId) {
        if (StringUtils.isBlank(userId)) {
            throw new BizException("A010001", "用户编号不能为空");
        }
        return BizConnecter.getBizData("805056",
            JsonUtils.string2Json("userId", userId), Object.class);
    }

    @Override
    public void doFindLoginPwd(String mobile, String newLoginPwd,
            String smsCaptcha) {
        if (StringUtils.isBlank(mobile)) {
            throw new BizException("A010001", "手机号不能为空");
        }
        if (StringUtils.isBlank(smsCaptcha)) {
            throw new BizException("A010001", "手机验证码不能为空");
        }
        if (StringUtils.isBlank(newLoginPwd)) {
            throw new BizException("A010001", "新登录密码不能为空");
        }
        XN805048Req req = new XN805048Req();
        req.setMobile(mobile);
        req.setSmsCaptcha(smsCaptcha);
        req.setNewLoginPwd(newLoginPwd);
        req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
        BizConnecter.getBizData("805048", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public void doResetLoginPwd(String userId, String oldLoginPwd,
            String newLoginPwd) {
        if (StringUtils.isBlank(userId)) {
            throw new BizException("A010001", "用户编号不能为空");
        }
        if (StringUtils.isBlank(oldLoginPwd)) {
            throw new BizException("A010001", "原登录密码不能为空");
        }
        if (StringUtils.isBlank(newLoginPwd)) {
            throw new BizException("A010001", "新登录密码不能为空");
        }
        XN805049Req req = new XN805049Req();
        req.setUserId(userId);
        req.setOldLoginPwd(oldLoginPwd);
        req.setNewLoginPwd(newLoginPwd);
        req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
        BizConnecter.getBizData("805049", JsonUtils.object2Json(req),
            Object.class);
    }


    @Override
    public void doChangeMoblie(String userId, String newMobile,
            String smsCaptcha, String tradePwd) {
        XN805047Req req = new XN805047Req();
        req.setUserId(userId);
        req.setNewMobile(newMobile);
        req.setSmsCaptcha(smsCaptcha);
        tradePwd = "888888";
        req.setTradePwd(tradePwd);
        BizConnecter.getBizData("805047", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object doGetLog(String userId) {
        if (StringUtils.isBlank(userId)) {
            throw new BizException("A010001", "用户编号不能为空");
        }
        return BizConnecter.getBizData("fd0010",
            JsonUtils.string2Json("userId", userId), Object.class);
    }

    @Override
    // 检查手机号是否存在
    public Object checkMobileExit(String mobile) {
        if (StringUtils.isBlank(mobile)) {
            throw new BizException("A010001", "手机号不能为空");
        }
        XN805040Req req = new XN805040Req();
        req.setMobile(mobile);
        return BizConnecter.getBizData("805040", JsonUtils.object2Json(req),
            Object.class);
    }


	@Override
	public Object doReg(String mobile, String loginPwd, String smsCaptcha,
			String userReferee) {
		// TODO Auto-generated method stub
		return null;
	}
}
