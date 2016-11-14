package com.xnjr.home.front.ao;

public interface IPositionAO {
	/**
	 * 发布职位
	 * @param name
	 * @param kind
	 * @param province
	 * @param city
	 * @param experience
	 * @param education
	 * @param type
	 * @param jobNum
	 * @param msalary
	 * @param description
	 * @param companyCode
	 * @param publisher
	 * @return
	 */
	public Object publishPosition(String name, String kind,
			String province, String city, String area, String experience,
			String education, String type, String jobNum,
			String msalary, String description, String companyCode,
			String publisher);
	
	/**
	 * 修改职位
	 * @param code
	 * @param name
	 * @param kind
	 * @param province
	 * @param city
	 * @param experience
	 * @param education
	 * @param type
	 * @param jobNum
	 * @param msalary
	 * @param description
	 * @param companyCode
	 * @param publisher
	 * @return
	 */
	public Object editPosition(String code, String name, String kind,
			String province, String city, String area, String experience,
			String education, String type, String jobNum,
			String msalary, String description, String companyCode,
			String publisher);
	
	/**
	 * 删除职位
	 * @param code
	 * @return
	 */
	public Object deletePosition(String code);
	
	/**
	 * 分页查询职位
	 * @param name
	 * @param companyCode
	 * @param isHot
	 * @param companyName
	 * @param kind
	 * @param start
	 * @param limit
	 * @param gsProvince
	 * @param gsCity
	 * @param gsArea
	 * @param orderColumn
	 * @param orderDir
	 * @return
	 */
	public Object queryPagePosition(String name, String companyCode, String isHot,
    		String companyName, String kind, String start, String limit,
    		String gsProvince, String gsCity, String gsArea, String orderColumn,
    		String orderDir, String status);
	
	/**
	 * 详情查询职位
	 * @param code
	 * @return
	 */
	public Object queryPositionInfo(String code);
}
