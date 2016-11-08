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
	 * @param certificateType
	 * @param companyCode
	 * @param status
	 * @param approveUser
	 * @param start
	 * @param limit
	 * @return
	 */
	Object queryPageCredentials(String certificateCode, String certificateType,
			String companyCode, String status, String approveUser,
			String start, String limit);
	
	/**
	 * 列表查询公司资质
	 * @param certificateCode
	 * @param companyCode
	 * @param status
	 * @param applyUser
	 * @param approveUser
	 * @return
	 */
	Object queryListCredentials(String certificateCode,
			String companyCode, String status,
			String applyUser, String approveUser);
	
	/**
	 * 详情查询公司资质
	 * @param code
	 * @return
	 */
	Object queryCredentials(String code);
	
	/**
	 * 删除公司资质
	 * @param code
	 * @param userId
	 * @return
	 */
	Object deleteCertificates(String code, String userId);
	
	/**
	 * 修改公司资质
	 * @param code
	 * @param certificateCode
	 * @param applyUser
	 * @return
	 */
	Object editCertificates(String code, String certificateCode, String applyUser);
	
	/**
	 * 列表查询资质
	 * @param type
	 * @param name
	 * @param status
	 * @param updater
	 * @return
	 */
	Object queryListCredentials1(String type, String name,
			String status, String updater);
}
