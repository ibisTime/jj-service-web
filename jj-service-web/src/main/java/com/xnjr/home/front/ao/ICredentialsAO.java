package com.xnjr.home.front.ao;

public interface ICredentialsAO {
	
	/**
	 * 申请公司资质
	 * @param certificateCode
	 * @param companyCode
	 * @return
	 */
	Object applyCredentials(String certificateCode,
			String companyCode);
	
	/**
	 * 分页查询公司资质
	 * @param certificateCode
	 * @param companyCode
	 * @param status
	 * @param approveUser
	 * @param start
	 * @param limit
	 * @return
	 */
	Object queryPageCredentials(String certificateCode,
			String companyCode, String status, String applyUser,
			String start, String limit);
	
	/**
	 * 详情查询公司资质
	 * @param code
	 * @return
	 */
	Object queryCredentials(String code);
}
