package com.xnjr.home.front.req;

public class XN612090Req {
	//职位名称
	private String name;
	//公司编号
	private String companyCode;
	//公司名称
	private String companyName;
	//是否热门1：是，0：否
	private String isHot;
	//第几页
	private String start;
	//页面个数
	private String limit;
	//种类
	private String kind;
	//
	private String gsProvince;
	
	private String gsCity;
	
	private String gsArea;
	
	private String orderColumn;
	
	private String orderDir;
	
	private String status;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getOrderColumn() {
		return orderColumn;
	}
	public void setOrderColumn(String orderColumn) {
		this.orderColumn = orderColumn;
	}
	public String getOrderDir() {
		return orderDir;
	}
	public void setOrderDir(String orderDir) {
		this.orderDir = orderDir;
	}
	public String getGsProvince() {
		return gsProvince;
	}
	public void setGsProvince(String gsProvince) {
		this.gsProvince = gsProvince;
	}
	public String getGsCity() {
		return gsCity;
	}
	public void setGsCity(String gsCity) {
		this.gsCity = gsCity;
	}
	public String getGsArea() {
		return gsArea;
	}
	public void setGsArea(String gsArea) {
		this.gsArea = gsArea;
	}
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getIsHot() {
		return isHot;
	}
	public void setIsHot(String isHot) {
		this.isHot = isHot;
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
