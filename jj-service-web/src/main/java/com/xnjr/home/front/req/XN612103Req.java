package com.xnjr.home.front.req;

public class XN612103Req {
	
	//code(必填)	申请编号
	private String code;

	//dealNote(必填)	处理意见
	private String dealNote;

	//dealer(必填)	处理人
	private String dealer;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDealNote() {
		return dealNote;
	}

	public void setDealNote(String dealNote) {
		this.dealNote = dealNote;
	}

	public String getDealer() {
		return dealer;
	}

	public void setDealer(String dealer) {
		this.dealer = dealer;
	}

}
