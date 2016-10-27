package com.xnjr.home.front.req;

public class XN612110Req {
	
	//fromUser(选填)	感兴趣人编号
	private String fromUser;

	//toCode(选填)	服务编号
	private String toCode;

	//companyCode(选填)	公司编号
	private String companyCode;

	//start（必填）	第几页
	private String start;

	//limit（必填）	页面个数
	private String limit;

	public String getFromUser() {
		return fromUser;
	}

	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}

	public String getToCode() {
		return toCode;
	}

	public void setToCode(String toCode) {
		this.toCode = toCode;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
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
