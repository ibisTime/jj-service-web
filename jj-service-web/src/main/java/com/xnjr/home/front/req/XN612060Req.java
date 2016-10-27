package com.xnjr.home.front.req;

public class XN612060Req {
	
	//name (必填)	简历名称
	private String name;

	//isWork (必填)	是否有工作经历	1 是 0 否；有工作的情况下最近工作描述都必填
	private String isWork;

	//preCompName(必填)	公司名称
	private String preCompName;

	//prePosName(必填)	职位名称
	private String prePosName;

	//preWorkTime(必填)	工作时间
	private String preWorkTime;

	//preMsalary(必填)	月薪
	private String preMsalary;

	//工作表述
	private String preDescription;

	//education (必填)	学历	1 本科 2 大专 3 高中 4 其他
	private String education;

	//isTz (必填)	是否统招	1 是 0 否
	private String isTz;

	//studyTime (必填)	就读时间	2013-09至2016-06
	private String studyTime;

	//school (必填)	学校名称
	private String school;

	//profession (必填)	专业
	private String profession;

	//type(必填)	工作类型	1 全职 2 兼职 3实习
	private String type;

	//expPosition (必填)	期望职位	A 运营主管 B 运营总监 C 设计/美工 D 客服/售后 E 仓储管理 F 推广
	private String expPosition;

	//expMsalary (必填)	期望月薪
	private String expMsalary;

	//expProvince (必填)	期望地点(省)
	private String expProvince;

	//expCity (必填)	期望地点(市)
	private String expCity;

	//workStatus (必填)	工作状态	1 已离职，可直接上岗，2 未离职，需一段时间
	private String workStatus;

	//isOpen (必填)	是否公开	1 是 0 否
	private String isOpen;

	//publisher(必填)	发布人
	private String publisher;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIsWork() {
		return isWork;
	}

	public void setIsWork(String isWork) {
		this.isWork = isWork;
	}

	public String getPreCompName() {
		return preCompName;
	}

	public void setPreCompName(String preCompName) {
		this.preCompName = preCompName;
	}

	public String getPrePosName() {
		return prePosName;
	}

	public void setPrePosName(String prePosName) {
		this.prePosName = prePosName;
	}

	public String getPreWorkTime() {
		return preWorkTime;
	}

	public void setPreWorkTime(String preWorkTime) {
		this.preWorkTime = preWorkTime;
	}

	public String getPreMsalary() {
		return preMsalary;
	}

	public void setPreMsalary(String preMsalary) {
		this.preMsalary = preMsalary;
	}

	public String getPreDescription() {
		return preDescription;
	}

	public void setPreDescription(String preDescription) {
		this.preDescription = preDescription;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getIsTz() {
		return isTz;
	}

	public void setIsTz(String isTz) {
		this.isTz = isTz;
	}

	public String getStudyTime() {
		return studyTime;
	}

	public void setStudyTime(String studyTime) {
		this.studyTime = studyTime;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getExpPosition() {
		return expPosition;
	}

	public void setExpPosition(String expPosition) {
		this.expPosition = expPosition;
	}

	public String getExpMsalary() {
		return expMsalary;
	}

	public void setExpMsalary(String expMsalary) {
		this.expMsalary = expMsalary;
	}

	public String getExpProvince() {
		return expProvince;
	}

	public void setExpProvince(String expProvince) {
		this.expProvince = expProvince;
	}

	public String getExpCity() {
		return expCity;
	}

	public void setExpCity(String expCity) {
		this.expCity = expCity;
	}

	public String getWorkStatus() {
		return workStatus;
	}

	public void setWorkStatus(String workStatus) {
		this.workStatus = workStatus;
	}

	public String getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(String isOpen) {
		this.isOpen = isOpen;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	
}
