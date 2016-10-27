package com.xnjr.home.front.ao;

public interface IDemandAO {
	/**
	 * 新增需求
	 * @param name
	 * @param qualityCode
	 * @param expCompany
	 * @param urgentLevel
	 * @param description
	 * @param publisher
	 * @return
	 */
	public Object addDemand(String name, String qualityCode, String expCompany, 
			String urgentLevel, String description, String publisher);
	
	/**
	 * 修改需求
	 * @param code
	 * @param name
	 * @param qualityCode
	 * @param expCompany
	 * @param urgentLevel
	 * @param description
	 * @param publisher
	 * @return
	 */
	public Object editDemand(String code, String name, String qualityCode,
			String expCompany, String urgentLevel, String description, String publisher);
	
	/**
	 * 删除需求
	 * @param code
	 * @return
	 */
	public Object deleteDemand(String code);
	
	/**
	 * 分页查询需求
	 * @param publisher
	 * @param qualityCode
	 * @param urgentLevel
	 * @param dateStart
	 * @param dateEnd
	 * @param dealer
	 * @param start
	 * @param limit
	 * @return
	 */
	public Object queryPageDemand(String publisher, String qualityCode, String urgentLevel,
			String dateStart, String dateEnd, String dealer, String start, String limit);
	
	/**
	 * 详情查询需求
	 * @param code
	 * @return
	 */
	public Object queryDemandInfo(String code);
}
