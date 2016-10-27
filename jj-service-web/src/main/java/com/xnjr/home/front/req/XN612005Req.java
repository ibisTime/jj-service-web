package com.xnjr.home.front.req;

public class XN612005Req {
	
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

	//tgfw(必填)	提供服务	A 运营 B 推广 C 拍摄 D 美工 E 客服 F 仓储 G 打包发货
	private String tgfw;

	//feeMode (必填)	收费模式	1 基础服务费+提成 2 服务费 3 提成
	private String feeMode;

	//payCycle (必填)	付款周期	1 月付 2 季付 3 半年付 4 年付 
	private String payCycle;

	//scyylm(必填)	擅长运营类目
	private String scyylm;

	//sucCase(必填)	成功案例
	private String sucCase;
	
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

	public String getTgfw() {
		return tgfw;
	}

	public void setTgfw(String tgfw) {
		this.tgfw = tgfw;
	}

	public String getFeeMode() {
		return feeMode;
	}

	public void setFeeMode(String feeMode) {
		this.feeMode = feeMode;
	}

	public String getPayCycle() {
		return payCycle;
	}

	public void setPayCycle(String payCycle) {
		this.payCycle = payCycle;
	}

	public String getScyylm() {
		return scyylm;
	}

	public void setScyylm(String scyylm) {
		this.scyylm = scyylm;
	}

	public String getSucCase() {
		return sucCase;
	}

	public void setSucCase(String sucCase) {
		this.sucCase = sucCase;
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
