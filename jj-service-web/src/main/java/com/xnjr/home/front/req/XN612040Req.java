package com.xnjr.home.front.req;

public class XN612040Req {
	
	//name (必填)	需求名称
	private String name;
	
	//qualityCode (必填)	资质类型
	private String type;

	//expCompany (选填)	期望企业
	private String expCompany;

	//urgentLevel(必填)	紧急程度	1 紧急 0 不紧急
	private String urgentLevel;

	//description(必填)	详细描述
	private String description;

	//publisher(必填)	发布人
	private String publisher;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getExpCompany() {
		return expCompany;
	}

	public void setExpCompany(String expCompany) {
		this.expCompany = expCompany;
	}

	public String getUrgentLevel() {
		return urgentLevel;
	}

	public void setUrgentLevel(String urgentLevel) {
		this.urgentLevel = urgentLevel;
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
