package com.xnjr.home.front.req;

public class XN612113Req {
	
	//companyCode (选填)	公司编号
	private String companyCode;
	
	//fromUser (选填)	用户编号
	private String fromUser;
	
	//start（必填）	第几页
	private String start;
	
	//limit（必填）	页面个数
	private String limit;

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public String getFromUser() {
		return fromUser;
	}

	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}
	
}
