package com.xnjr.home.front.req;

public class XN612081Req {
	
	//code (必填)	职位编号
	private String code;
	
	//name (必填)	职位名称
	private String name;
	
	//kind (必填)	职位类别
	private String kind;
	
	//province (必填)	省份
	private String province;
	
	//city(必填)	城市
	private String city;
	
	private String area;
	
	//experience (必填)	工作经验 1 1年内 2 1-3年 3 3-5年 4 5年以上
	private String experience;
	
	//education (必填)	学历	1 本科 2 大专 3 高中 4 其他
	private String education;
	
	//type(必填)	工作类型	1 全职 2 兼职 3实习
	private String type;
	
	//jobNum (必填)	招聘人数
	private String jobNum;
	
	//msalary (必填)	月薪
	private String msalary;
	
	//description (必填)	详细描述
	private String description;
	
	//companyCode (必填)	公司编号
	private String companyCode;
	
	//publisher(必填)	发布人
	private String publisher;

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

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

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
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

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getJobNum() {
		return jobNum;
	}

	public void setJobNum(String jobNum) {
		this.jobNum = jobNum;
	}

	public String getMsalary() {
		return msalary;
	}

	public void setMsalary(String msalary) {
		this.msalary = msalary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	
}
