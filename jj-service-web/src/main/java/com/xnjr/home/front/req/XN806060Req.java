package com.xnjr.home.front.req;

public class XN806060Req {
	//单位名称
	public String fromCompany;
	//联系人
	public String fromPerson;
	//联系方式
	public String fromContact;
	//合作内容
	public String content;
	//公司编号
	public String companyCode;
	
	public String getFromCompany() {
		return fromCompany;
	}
	public void setFromCompany(String fromCompany) {
		this.fromCompany = fromCompany;
	}
	public String getFromPerson() {
		return fromPerson;
	}
	public void setFromPerson(String fromPerson) {
		this.fromPerson = fromPerson;
	}
	public String getFromContact() {
		return fromContact;
	}
	public void setFromContact(String fromContact) {
		this.fromContact = fromContact;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
}
