package com.xnjr.home.front.req;

public class XN612070Req {
	
	//mobile(选填)	手机号
	private String mobile;

	//expPosition(选填)	期望职位
	private String expPosition;

	//expProvince(选填)	期望省份
	private String expProvince;

	//expCity(选填)	期望城市
	private String expCity;

	//publisher (选填)	发布人编号
	private String publisher;

	//start（必填）	第几页
	private String start;
	
	//limit（必填）	页面个数
	private String limit;
	
	private String status;
	
	private String isOpen;

	public String getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(String isOpen) {
		this.isOpen = isOpen;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getExpPosition() {
		return expPosition;
	}

	public void setExpPosition(String expPosition) {
		this.expPosition = expPosition;
	}

	public String getExpProvince() {
		return expProvince;
	}

	public void setExpProvince(String expProvince) {
		this.expProvince = expProvince;
	}

	public String getExpCity() {
		return expCity;
	}

	public void setExpCity(String expCity) {
		this.expCity = expCity;
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
