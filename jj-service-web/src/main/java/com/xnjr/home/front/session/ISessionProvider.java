package com.xnjr.home.front.session;


/**
 * 真正的会话提供者
 * 
 * @author: xuebj07252
 * @since: 2014-4-4 下午12:52:50
 * @history:
 */
public interface ISessionProvider {
    String SESSION_KEY_USER = "user";

    /**
     * 存放登录用户信息
     * 
     * @param userDetail
     * @create: 2014-4-4 下午12:56:32 xuebj07252
     * @history:
     */
    public void setUserDetail(AUserDetail userDetail);

    /**
     * 移除用户信息
     * 
     * @param userDetail
     * @create: 2014-4-4 下午12:56:32 xuebj07252
     * @history:
     */
    public void removeUserDetail();

    /**
     * 获取用户对象
     * @return 
     * @create: 2014-8-19 下午8:49:49 miyb
     * @history:
     */
    public AUserDetail getUserDetail();

    /**
     * 存放值
     * 
     * @param name
     * @param value
     * @create: 2014-4-4 下午12:56:55 xuebj07252
     * @history:
     */
    public void setAttribute(String name, Object value);

    /**
     * 获取key为name的值
     * 
     * @param request
     * @param name
     * @create: 2014-4-4 下午1:50:17 xuebj07252
     * @history:
     */
    public Object getAttribute(String name);

    /**
     * 移除某个值
     * 
     * @param name
     * @create: 2014-4-4 下午12:57:12 xuebj07252
     * @history:
     */
    public void removeAttribute(String name);

}
