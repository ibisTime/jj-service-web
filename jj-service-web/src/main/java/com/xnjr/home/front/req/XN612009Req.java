package com.xnjr.home.front.req;

public class XN612009Req {
	
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

	//kfNum (必填)	客服人数
	private String kfNum;

	//mtradeAmount(必填)	月均交易额
	private String mtradeAmount;

	//business(必填)	客服业务	1 售前 2 售后
	private String business;

	//feeMode(必填)	收费模式	1 基础服务费+提成 2 服务费 3 提成
	private String feeMode;
	
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

	public String getKfNum() {
		return kfNum;
	}

	public void setKfNum(String kfNum) {
		this.kfNum = kfNum;
	}

	public String getMtradeAmount() {
		return mtradeAmount;
	}

	public void setMtradeAmount(String mtradeAmount) {
		this.mtradeAmount = mtradeAmount;
	}

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
	}

	public String getFeeMode() {
		return feeMode;
	}

	public void setFeeMode(String feeMode) {
		this.feeMode = feeMode;
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
