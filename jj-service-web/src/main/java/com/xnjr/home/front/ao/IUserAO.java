/**
 * @Title IUserAO.java 
 * @Package com.ibis.pz.ao 
 * @Description 
 * @author miyb  
 * @date 2015-5-12 下午1:43:05 
 * @version V1.0   
 */
package com.xnjr.home.front.ao;


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
     * 用户注册
     * @param mobile
     * @param userReferee
     * @return 
     * @create: 2015年9月19日 上午11:24:33 myb858
     * @history:
     */
    public Object doRegister(String mobile, String userReferee);

    /**
     * 用户注册(手填密码)
     * @param mobile
     * @param loginPwd
     * @param smsCaptcha
     * @param userReferee
     * @return 
     * @create: 2016年9月24日 下午4:35:57 wulq
     * @history:
     */
    public Object doReg(String mobile, String loginPwd, String smsCaptcha,
            String userReferee);

    /**
     * 用户登陆
     * @param loginName
     * @param loginPwd
     * @param loginIp
     * @param kind
     * @create: 2014-12-10 下午7:37:18 miyb
     * @history:
     */

    public Object doLogin(String loginName, String loginPwd, String kind);

    /**
     * 查询需求方用户的详细信息
     * @param userId
     * @create: 2014-12-10 下午7:37:18 miyb
     * @history:
     */
    public Object doGetUser(String userId);
    
    /**
     * 详情查询公司
     * @param code
     * @return
     */
    public Object doGetCompanyInfo(String code);

    /**
     * 找回登录密码
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
     * 重置登陆密码
     * @param userId
     * @param oldPwd
     * @param newPwd
     * @create: 2015-3-22 下午3:55:03 xieyj
     * @history:
     */
    public void doResetLoginPwd(String userId, String oldPwd, String newPwd);


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
    public void doChangeMoblie(String userId, String newMobile,
            String smsCaptcha, String tradePwd);

    /**
     * 获取登录日志
     * @param userId
     * @return 
     * @create: 2015年9月29日 上午11:53:44 myb858
     * @history:
     */
    public Object doGetLog(String userId);

}
