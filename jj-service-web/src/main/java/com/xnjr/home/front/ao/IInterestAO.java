package com.xnjr.home.front.ao;

public interface IInterestAO {
	/**
	 * 需求方对服务感兴趣，公司对需求感兴趣，公司对简历感兴趣
	 * @param fromUser
	 * @param toCode
	 * @param type
	 * @return
	 */
	Object interested(String fromUser, String toCode, String type);
	
	/**
	 * 个人对公司职位感兴趣，投递简历
	 * @param userId
	 * @param resumeCode
	 * @param positionCode
	 * @return
	 */
	Object applyPosition(String userId, String resumeCode, String positionCode);
	
	/**
	 * 删除感兴趣服务
	 * @param code
	 * @return
	 */
	Object delete(String code);
	
	/**
	 * 处理对服务/需求/简历感兴趣的意向，以及申请职位的意向，状态更改为已完成(简单查看)
	 * @param code
	 * @param dealNote
	 * @param dealer
	 * @return
	 */
	Object handle(String code, String dealNote, String dealer);
	
	/**
	 * 感兴趣分页查询服务
	 * @param fromUser
	 * @param toCode
	 * @param companyCode
	 * @param start
	 * @param limit
	 * @return
	 */
	Object queryPageInterestServer(String fromUser, String toCode,
			String companyCode, String start, String limit);
	
	/**
	 * 分页查询感兴趣需求
	 * @param companyCode
	 * @param publisher
	 * @param start
	 * @param limit
	 * @return
	 */
	Object queryPageInterestDemand(String companyCode, String publisher,
			String start, String limit);
	
	/**
	 * 分页查询感兴趣简历
	 * @param companyCode
	 * @param publisher
	 * @param start
	 * @param limit
	 * @return
	 */
	Object queryPageInterestResume(String companyCode, String publisher,
			String start, String limit);
	
	/**
	 * 分页查询申请职位或者应聘简历信息
	 * @param companyCode
	 * @param fromUser
	 * @param start
	 * @param limit
	 * @return
	 */
	Object queryPageInterestPosition(String companyCode, String fromUser,
			String start, String limit);
}
