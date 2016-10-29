package com.xnjr.home.front.req;

public class XN806151Req {
	
	//certificateCode（选填）	资质编号
	private String certificateCode;

	//companyCode（必填）	公司编号
	private String companyCode;
	
	//status（选填）	状态	0 待审核 1 审核通过 2 审核不通过
	private String status;
	
	//applyUser（选填）	申请人
	private String applyUser;
	
	//approveUser（选填）	审批人
	private String approveUser;

	public String getCertificateCode() {
		return certificateCode;
	}

	public void setCertificateCode(String certificateCode) {
		this.certificateCode = certificateCode;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getApplyUser() {
		return applyUser;
	}

	public void setApplyUser(String applyUser) {
		this.applyUser = applyUser;
	}

	public String getApproveUser() {
		return approveUser;
	}

	public void setApproveUser(String approveUser) {
		this.approveUser = approveUser;
	}
	
}
