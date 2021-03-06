package com.xnjr.home.front.req;

public class XN806150Req {

	//certificateCode（必填）	资质编号
	private String certificateCode;
	
	private String certificateType;
	
	//companyCode（必填）	所属公司编号
	private String companyCode;
	
	//status（选填）	状态	0 待审核 1 审核通过 2 审核不通过
	private String status;

	//approveUser（选填）	审批人
	private String approveUser;

	//start（必填）	第几页
	private String start;

	//limit（必填）	页面个数
	private String limit;
	
	private String province;
	private String city;
	private String area;

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

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCertificateType() {
		return certificateType;
	}

	public void setCertificateType(String certificateType) {
		this.certificateType = certificateType;
	}

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

	public String getApproveUser() {
		return approveUser;
	}

	public void setApproveUser(String approveUser) {
		this.approveUser = approveUser;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}
	
}
