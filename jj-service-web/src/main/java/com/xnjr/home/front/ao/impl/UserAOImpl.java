package com.xnjr.home.front.ao.impl;

import java.util.Map;

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
import com.xnjr.home.front.req.XN805076Req;
import com.xnjr.home.front.req.XN806000Req;
import com.xnjr.home.front.req.XN806004Req;
import com.xnjr.home.front.req.XN806008Req;
import com.xnjr.home.front.req.XN806009Req;
import com.xnjr.home.front.req.XN806014Req;
import com.xnjr.home.front.req.XN806016Req;
import com.xnjr.home.front.util.PwdUtil;


/** 
 * @author: miyb 
 * @since: 2015-5-12 下午2:53:12 
 * @history:
 */
@Service
public class UserAOImpl implements IUserAO {

    @Override
    public Object doPersonRegister(String mobile, String loginPwd,
    		String userReferee, String smsCaptcha) {
        XN805076Req req = new XN805076Req();
        req.setLoginPwd(loginPwd);
        req.setSmsCaptcha(smsCaptcha);
        req.setMobile(mobile);
        req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(loginPwd));
        req.setUserReferee(userReferee);
        return BizConnecter.getBizData("805076", JsonUtils.object2Json(req),
        		Object.class);
    }
    
    public Object doCompRegister(String type, String name,
    		String gsyyzzh, String contacts, String mobile,
    		String loginName, String password, String province,
    		String city, String area){
    	XN806000Req req = new XN806000Req();
    	req.setArea(area);
    	req.setCity(city);
    	req.setContacts(contacts);
    	req.setGsyyzzh(gsyyzzh);
    	req.setLoginName(loginName);
    	req.setMobile(mobile);
    	req.setName(name);
    	req.setPassword(password);
    	req.setProvince(province);
    	req.setType(type);
    	return BizConnecter.getBizData("806000", JsonUtils.object2Json(req),
        		Object.class);
    }

    
    @Override
    public Map doPersonLogin(String loginName, String loginPwd) {
        XN805043Req req = new XN805043Req();
        req.setLoginName(loginName);
        req.setLoginPwd(loginPwd);
        req.setKind("f1");
        return BizConnecter.getBizData("805043", JsonUtils.object2Json(req),
        		Map.class);
    }
    
    @Override
    public Map doCompLogin(String loginName, String password){
    	XN806016Req req = new XN806016Req();
        req.setLoginName(loginName);
        req.setPassword(password);
        return BizConnecter.getBizData("806016", JsonUtils.object2Json(req),
        		Map.class);
    }

    @Override
    // XN805056Res
    public Map doGetUser(String userId) {
        if (StringUtils.isBlank(userId)) {
            throw new BizException("A010001", "用户编号不能为空");
        }
        return BizConnecter.getBizData("805056",
            JsonUtils.string2Json("userId", userId), Map.class);
    }
    
    @Override
    public Map doGetCompanyInfo(String code){
    	return BizConnecter.getBizData("806010",
                JsonUtils.string2Json("code", code), Map.class);
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
    public void doFindCompLoginPwd(String loginName, String mobile,
    		String smsCaptcha, String newPassword){
    	XN806009Req req = new XN806009Req();
    	req.setLoginName(loginName);
    	req.setMobile(mobile);
    	req.setNewPassword(newPassword);
    	req.setSmsCaptcha(smsCaptcha);
    	BizConnecter.getBizData("806009", JsonUtils.object2Json(req),
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
    
    public void doResetCompLoginPwd(String code, String oldPassword, String newPassword){
    	XN806008Req req = new XN806008Req();
    	req.setCode(code);
    	req.setNewPassword(newPassword);
    	req.setOldPassword(oldPassword);
    	BizConnecter.getBizData("806008", JsonUtils.object2Json(req),
                Object.class);
    }

    @Override
    public void doChangeMoblie(String userId, String newMobile,
            String smsCaptcha) {
        XN805047Req req = new XN805047Req();
        req.setUserId(userId);
        req.setNewMobile(newMobile);
        req.setSmsCaptcha(smsCaptcha);
        req.setTradePwd("888888");
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
	public Object editCompanyInfo(String code, String name, String gsyyzzh,
			String logo, String province, String city, String area,
			String address, String description, String scale, String contacts,
			String mobile, String email, String qq, String type, String slogan, String remark) {
		XN806004Req req = new XN806004Req();
		req.setAddress(address);
		req.setArea(area);
		req.setCity(city);
		req.setCode(code);
		req.setContacts(contacts);
		req.setDescription(description);
		req.setEmail(email);
		req.setGsyyzzh(gsyyzzh);
		req.setLogo(logo);
		req.setMobile(mobile);
		req.setName(name);
		req.setProvince(province);
		req.setQq(qq);
		req.setScale(scale);
		req.setType(type);
		req.setSlogan(slogan);
		req.setRemark(remark);
        return BizConnecter.getBizData("806004", JsonUtils.object2Json(req),
                Object.class);
	}

	@Override
	public Object queryPageCompany(String code, String name, String abbrName,
			String type, String isDefault, String location, String province,
			String city, String area, String userId, String start,
			String limit, String orderColumn, String orderDir, String isHot) {
		XN806014Req req = new XN806014Req();
        req.setAbbrName(abbrName);
        req.setArea(area);
        req.setCity(city);
        req.setCode(code);
        req.setIsDefault(isDefault);
        req.setLimit(limit);
        req.setLocation("1");
        req.setName(name);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        req.setProvince(province);
        req.setStart(start);
        req.setType(type);
        req.setUserId(userId);
        req.setIsHot(isHot);
        return BizConnecter.getBizData("806014", JsonUtils.object2Json(req),
            Object.class);
	}


}
