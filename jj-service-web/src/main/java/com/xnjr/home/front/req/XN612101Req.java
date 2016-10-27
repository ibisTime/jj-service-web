package com.xnjr.home.front.req;

public class XN612101Req {
	
	//userId (必填)	用户编号
	private String userId;
	
	//resumeCode (必填)	简历编号
	private String resumeCode;

	//positionCode (必填)	职位编号
	private String positionCode;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getResumeCode() {
		return resumeCode;
	}

	public void setResumeCode(String resumeCode) {
		this.resumeCode = resumeCode;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}
	
}
