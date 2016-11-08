/**
 * @Title IUserAO.java 
 * @Package com.ibis.pz.ao 
 * @Description 
 * @author miyb  
 * @date 2015-5-12 下午1:43:05 
 * @version V1.0   
 */
package com.xnjr.home.front.ao;

import java.util.Map;


/** 
 * @author: miyb 
 * @since: 2015-5-12 下午1:43:05 
 * @history:
 */
public interface IUserAO {
    /**
     * 手机号是否存在
     * @param mobile 
     * @create: 2016年1月21日 下午1:30:49 myb858
     * @history:
     */
    public Object checkMobileExit(String mobile);

    /**
     * 需求方注册
     * @param mobile
     * @param loginPwd
     * @param userReferee
     * @param smsCaptcha
     * @return
     */
    public Object doPersonRegister(String mobile, String loginPwd,
    		String userReferee, String smsCaptcha);
    /**
     * 服务方注册
     * @param type
     * @param name
     * @param gsyyzzh
     * @param contacts
     * @param mobile
     * @param loginName
     * @param password
     * @param province
     * @param city
     * @param area
     * @return
     */
    public Object doCompRegister(String type, String name,
    		String gsyyzzh, String contacts, String mobile,
    		String loginName, String password, String province,
    		String city, String area);
    
    /**
     * 需求方登录
     * @param loginName
     * @param loginPwd
     * @return
     */
    public Map doPersonLogin(String loginName, String loginPwd);
    
    /**
     * 服务方登录
     * @param loginName
     * @param password
     * @return
     */
    public Map doCompLogin(String loginName, String password);

    /**
     * 查询需求方用户的详细信息
     * @param userId
     * @create: 2014-12-10 下午7:37:18 miyb
     * @history:
     */
    public Map doGetUser(String userId);
    
    /**
     * 详情查询公司
     * @param code
     * @return
     */
    public Map doGetCompanyInfo(String code);

    /**
     * 找回需求方登录密码
     * @param mobile
     * @param newLoginPwd
     * @param smsCaptcha
     * @return 
     * @create: 2015年9月18日 上午10:44:31 myb858
     * @history:
     */
    public void doFindLoginPwd(String mobile, String newLoginPwd,
            String smsCaptcha);
    
    /**
     * 找回服务方登录密码
     * @param loginName
     * @param mobile
     * @param smsCaptcha
     * @param newPassword
     */
    public void doFindCompLoginPwd(String loginName, String mobile,
    		String smsCaptcha, String newPassword);

    /**
     * 重置需求方登陆密码
     * @param userId
     * @param oldPwd
     * @param newPwd
     * @create: 2015-3-22 下午3:55:03 xieyj
     * @history:
     */
    public void doResetLoginPwd(String userId, String oldPwd, String newPwd);
    
    /**
     * 重置服务方登陆密码
     * @param code
     * @param oldPassword
     * @param newPassword
     */
    public void doResetCompLoginPwd(String code, String oldPassword, String newPassword);


    /**
     * 更换手机号
     * @param userId
     * @param newMobile
     * @param smsCaptcha
     * @param tradePwd
     * @return 
     * @create: 2015年9月18日 上午11:21:26 myb858
     * @history:
     */
    public void doChangeMoblie(String userId, String newMobile, String smsCaptcha);

    /**
     * 获取登录日志
     * @param userId
     * @return 
     * @create: 2015年9月29日 上午11:53:44 myb858
     * @history:
     */
    public Object doGetLog(String userId);
    
    /**
     * 修改公司信息
     * @param code
     * @param name
     * @param gsyyzzh
     * @param logo
     * @param province
     * @param city
     * @param area
     * @param address
     * @param description
     * @param scale
     * @param contacts
     * @param mobile
     * @param email
     * @param qq
     * @param slogan
     * @param remark
     * @return
     */
    public Object editCompanyInfo(String code, String name,
    		String gsyyzzh, String logo, String province, String city,
    		String area, String address, String description, String scale,
    		String contacts, String mobile, String email, String qq,
    		String type, String slogan, String remark);
    
    /**
     * 分页查询公司
     * @param code
     * @param name
     * @param abbrName
     * @param type
     * @param isDefault
     * @param location
     * @param province
     * @param city
     * @param area
     * @param userId
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return
     */
    public Object queryPageCompany(String code, String name,
    		String abbrName, String type, String isDefault, String location,
    		String province, String city, String area, String userId,
    		String start, String limit, String orderColumn,
    		String orderDir, String isHot);
    
    /**
     * 列表查询公司
     * @param province
     * @param city
     * @return
     */
    public Object queryListCompany(String province, String city);

}
