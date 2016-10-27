package com.xnjr.home.front.req;

public class XN805130Req {
	//type（必填）	类别	类型(1 公告 2 新闻)
	private String type;
	
	//title（必填）	标题	名称
	private String title;
	
	//toCompany（选填）	面向公司
	private String toCompany;
	
	//toLevel（选填）	面向用户等级 
	private String toLevel;
	
	//toUser（必填）	面向用户
	private String toUser;
	
	//status（选填）	状态	0 待发送 1已发送
	private String status;
	
	//companyCode（选填）	公司编号
	private String companyCode;
	
	//updater（选填）	更新人
	private String updater;
	
	//start（选填）	第几页
	private String start;
	
	//limit（必填）	页面个数
	private String limit;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getToCompany() {
		return toCompany;
	}

	public void setToCompany(String toCompany) {
		this.toCompany = toCompany;
	}

	public String getToLevel() {
		return toLevel;
	}

	public void setToLevel(String toLevel) {
		this.toLevel = toLevel;
	}

	public String getToUser() {
		return toUser;
	}

	public void setToUser(String toUser) {
		this.toUser = toUser;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public String getUpdater() {
		return updater;
	}

	public void setUpdater(String updater) {
		this.updater = updater;
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
