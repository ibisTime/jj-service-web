package com.xnjr.home.front.req;

public class XN612030Req extends APageReq {
	//服务名称
	private String name;
	//状态
	private String status;
	//公司编号
	private String companyCode;
	//公司名称
	private String companyName;
	//资质编号
	private String qualityCode;
	//是否热门	1 是 0 否
	private String isHot;
	//发布人
	private String pubisher;
	//处理人
	private String dealer;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getQualityCode() {
		return qualityCode;
	}
	public void setQualityCode(String qualityCode) {
		this.qualityCode = qualityCode;
	}
	public String getIsHot() {
		return isHot;
	}
	public void setIsHot(String isHot) {
		this.isHot = isHot;
	}
	public String getPubisher() {
		return pubisher;
	}
	public void setPubisher(String pubisher) {
		this.pubisher = pubisher;
	}
	public String getDealer() {
		return dealer;
	}
	public void setDealer(String dealer) {
		this.dealer = dealer;
	}
}
