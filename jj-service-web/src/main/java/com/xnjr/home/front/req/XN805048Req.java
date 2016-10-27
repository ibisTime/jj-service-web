package com.xnjr.home.front.req;

public class XN805048Req {
	//手机号
	private String mobile;
	//短信验证码
	private String smsCaptcha;
	//新登录密码
	private String newLoginPwd;
	//登陆密码强度
	private String loginPwdStrength;
	
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getSmsCaptcha() {
		return smsCaptcha;
	}
	public void setSmsCaptcha(String smsCaptcha) {
		this.smsCaptcha = smsCaptcha;
	}
	public String getNewLoginPwd() {
		return newLoginPwd;
	}
	public void setNewLoginPwd(String newLoginPwd) {
		this.newLoginPwd = newLoginPwd;
	}
	public String getLoginPwdStrength() {
		return loginPwdStrength;
	}
	public void setLoginPwdStrength(String loginPwdStrength) {
		this.loginPwdStrength = loginPwdStrength;
	}
}
