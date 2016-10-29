package com.xnjr.home.front.ao;

public interface IResumeAO {
	/**
	 * 发布简历
	 * @param name
	 * @param isWork
	 * @param preCompName
	 * @param prePosName
	 * @param preWorkTime
	 * @param preMsalary
	 * @param preDescription
	 * @param education
	 * @param isTz
	 * @param studyTime
	 * @param school
	 * @param profession
	 * @param type
	 * @param expPosition
	 * @param expMsalary
	 * @param expProvince
	 * @param expCity
	 * @param workStatus
	 * @param isOpen
	 * @param publisher
	 * @return
	 */
	public Object publishResume(String name, String isWork, String preCompName,
    		String prePosName, String preWorkTime, String preMsalary, String preDescription,
    		String education, String isTz, String studyTime, String school,
    		String profession, String type, String expPosition, String expMsalary,
    		String expProvince, String expCity, String workStatus, String isOpen, String publisher);
	/**
	 * 修改简历
	 * @param code
	 * @param name
	 * @param isWork
	 * @param preCompName
	 * @param prePosName
	 * @param preWorkTime
	 * @param preMsalary
	 * @param preDescription
	 * @param education
	 * @param isTz
	 * @param studyTime
	 * @param school
	 * @param profession
	 * @param type
	 * @param expPosition
	 * @param expMsalary
	 * @param expProvince
	 * @param expCity
	 * @param workStatus
	 * @param isOpen
	 * @param publisher
	 * @return
	 */
	public Object editResume(String code, String name, String isWork, String preCompName,
    		String prePosName, String preWorkTime, String preMsalary, String preDescription,
    		String education, String isTz, String studyTime, String school,
    		String profession, String type, String expPosition, String expMsalary,
    		String expProvince, String expCity, String workStatus, String isOpen, String publisher);
	
	/**
	 * 删除简历
	 * @param code
	 * @return
	 */
	public Object deleteResume(String code);
	
	/**
	 * 分页查询简历
	 * @param mobile
	 * @param expPosition
	 * @param expProvince
	 * @param expCity
	 * @param publisher
	 * @param start
	 * @param limit
	 * @return
	 */
	public Object queryPageResume(String mobile, String expPosition, String expProvince, 
			String expCity, String publisher, String start, String limit);
	
	/**
	 * 列表查询简历
	 * @param publisher
	 * @return
	 */
	public Object queryListResume(String publisher);
	
	/**
	 * 详情查询简历
	 * @param code
	 * @return
	 */
	public Object queryResumeInfo(String code);
}
