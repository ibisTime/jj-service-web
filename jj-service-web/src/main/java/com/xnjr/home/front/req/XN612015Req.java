package com.xnjr.home.front.req;

public class XN612015Req {
	
	//code (必填)	服务编号
	private String code;
	
	//name (必填)	服务名称
	private String name;

	//companyCode(必填)	公司编号
	private String companyCode;

	//quoteMin(必填)	最小报价
	private String quoteMin;

	//quoteMax(必填)	最大报价
	private String quoteMax;

	//qualityCode(必填)	资质编号
	private String qualityCode;
	
	//bgArea (必填)	办公总面积
	private String bgArea;

	//availBgArea(必填)	可用总面积
	private String availBgArea;

	//ccArea(必填)	仓储总面积
	private String ccArea;

	//availCcArea(必填)	可用总面积
	private String availCcArea;

	//zzfw(选填)	增值服务	A 人才培训 B 代理运营 C 软件系统开发 D 营销广告 E 渠道推广 F 仓储物流
	private String zzfw;

	//introduce(选填)	产业园详细介绍
	private String introduce;

	//yhPolicy(选填)	优惠政策
	private String yhPolicy;

	//pic1(选填)	产业园照片1
	private String pic1;
	
	//pic2(选填)	产业园照片2
	private String pic2;
	
	//description(选填)	详细描述
	private String description;
	
	//publisher(必填)	发布人
	private String publisher;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
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

	public String getQuoteMin() {
		return quoteMin;
	}

	public void setQuoteMin(String quoteMin) {
		this.quoteMin = quoteMin;
	}

	public String getQuoteMax() {
		return quoteMax;
	}

	public void setQuoteMax(String quoteMax) {
		this.quoteMax = quoteMax;
	}

	public String getQualityCode() {
		return qualityCode;
	}

	public void setQualityCode(String qualityCode) {
		this.qualityCode = qualityCode;
	}

	public String getBgArea() {
		return bgArea;
	}

	public void setBgArea(String bgArea) {
		this.bgArea = bgArea;
	}

	public String getAvailBgArea() {
		return availBgArea;
	}

	public void setAvailBgArea(String availBgArea) {
		this.availBgArea = availBgArea;
	}

	public String getCcArea() {
		return ccArea;
	}

	public void setCcArea(String ccArea) {
		this.ccArea = ccArea;
	}

	public String getAvailCcArea() {
		return availCcArea;
	}

	public void setAvailCcArea(String availCcArea) {
		this.availCcArea = availCcArea;
	}

	public String getZzfw() {
		return zzfw;
	}

	public void setZzfw(String zzfw) {
		this.zzfw = zzfw;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getYhPolicy() {
		return yhPolicy;
	}

	public void setYhPolicy(String yhPolicy) {
		this.yhPolicy = yhPolicy;
	}

	public String getPic1() {
		return pic1;
	}

	public void setPic1(String pic1) {
		this.pic1 = pic1;
	}

	public String getPic2() {
		return pic2;
	}

	public void setPic2(String pic2) {
		this.pic2 = pic2;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

}
