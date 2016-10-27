package com.xnjr.home.front.ao;

public interface INewsAO {
	
	/**
	 * 分页查询广播
	 * @param type
	 * @param title
	 * @param toCompany
	 * @param toLevel
	 * @param toUser
	 * @param companyCode
	 * @param start
	 * @param limit
	 * @return
	 */
    Object queryPageNews(String type, String title,
    		String toCompany, String toLevel, String toUser,
    		String companyCode, String start, String limit);
    
    /**
     * 详情查询广播
     * @param code
     * @return
     */
    Object queryNews(String code);
}
