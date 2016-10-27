package com.xnjr.home.front.req;

public class XN612111Req {
	
	//companyCode (选填)	公司编号
	private String companyCode;

	//publisher (选填)	发布人
	private String publisher;

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

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
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
