package com.xnjr.home.front.req;

public class XN612030Req extends APageReq {
	//type(选填)	服务类型	1 软件外包 2摄影/拍摄 3 培训 4 店铺代运营 5 美工外包 6客服外包 7仓库配置 8 产业园
	private String type;
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
	//province(选填)	省
	private String province;
	//city(选填)	市
	private String city;
	//area(选填)	区
	private String area;
	//处理人
	private String dealer;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
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
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getDealer() {
		return dealer;
	}
	public void setDealer(String dealer) {
		this.dealer = dealer;
	}
	
}
