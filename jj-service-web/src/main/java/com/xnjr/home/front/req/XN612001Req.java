package com.xnjr.home.front.req;

public class XN612001Req {
	
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

	//pyNum(必填)	棚影数量
	private String pyNum;

	//sysNum(必填)	摄影师数量
	private String sysNum;

	//isDz(必填)	是否接受定制需求	1 是 0 否
	private String isDz;

	//scpslm(必填)	擅长拍摄类目
	private String scpslm;

	//works(必填)	代表作品
	private String works;

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

	public String getPyNum() {
		return pyNum;
	}

	public void setPyNum(String pyNum) {
		this.pyNum = pyNum;
	}

	public String getSysNum() {
		return sysNum;
	}

	public void setSysNum(String sysNum) {
		this.sysNum = sysNum;
	}

	public String getIsDz() {
		return isDz;
	}

	public void setIsDz(String isDz) {
		this.isDz = isDz;
	}

	public String getScpslm() {
		return scpslm;
	}

	public void setScpslm(String scpslm) {
		this.scpslm = scpslm;
	}

	public String getWorks() {
		return works;
	}

	public void setWorks(String works) {
		this.works = works;
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
