package com.xnjr.home.front.req;

public class XN805049Req {
	private String userId;
	private String oldLoginPwd;
	private String newLoginPwd;
	private String loginPwdStrength;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getOldLoginPwd() {
		return oldLoginPwd;
	}
	public void setOldLoginPwd(String oldLoginPwd) {
		this.oldLoginPwd = oldLoginPwd;
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
