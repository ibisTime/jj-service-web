package com.xnjr.home.front.req;

public class XN612100Req {
	
	//fromUser (必填)	感兴趣人/公司编号
	private String fromUser;

	//toCode (必填)	被感兴趣的服务/需求/简历编号
	private String toCode;

	//type(必填)	类型	类型(1 职位申请 2 对服务感兴趣 3 对需求感兴趣 4 对简历感兴趣)
	private String type;

	public String getFromUser() {
		return fromUser;
	}

	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}

	public String getToCode() {
		return toCode;
	}

	public void setToCode(String toCode) {
		this.toCode = toCode;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
