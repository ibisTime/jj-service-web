package com.xnjr.home.front.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.xnjr.home.front.base.ControllerContext;

/** 
 * 使用http实现会话管理
 * @author: xuebj07252 
 * @since: 2014-4-4 下午12:58:01 
 * @history:
 */
public class HttpSessionProvider implements ISessionProvider {

    private static final String USER_DETAIL_KEY = "user";

    /** 
     * @see com.xnjr.account.front.json.ISessionProvider.ihoms.web.core.session.hsnet.core.session.SessionProvider#setUserDetail(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, com.xnjr.account.front.session.AUserDetail.ihoms.web.core.session.hsnet.core.session.UserDetail)
     */
    @Override
    public void setUserDetail(AUserDetail userDetail) {
        HttpSession session = getRequest().getSession();
        session.setAttribute(USER_DETAIL_KEY, userDetail);

    }

    /** 
     * @see com.xnjr.account.front.json.ISessionProvider.ihoms.web.core.session.hsnet.core.session.SessionProvider#setAttribute(javax.servlet.http.HttpServletRequest, java.lang.String, java.lang.Object)
     */
    @Override
    public void setAttribute(String name, Object value) {
        HttpSession session = getRequest().getSession();
        session.setAttribute(name, value);
    }

    /** 
     * @see com.xnjr.account.front.json.ISessionProvider.ihoms.web.core.session.hsnet.core.session.SessionProvider#removeAttribute(javax.servlet.http.HttpServletRequest, java.lang.String)
     */
    @Override
    public void removeAttribute(String name) {
        HttpSession session = getRequest().getSession(false);
        if (null != session) {
            session.removeAttribute(name);
        }

    }

    /** 
     * @see com.xnjr.account.front.json.ISessionProvider.ihoms.web.core.session.hsnet.core.session.SessionProvider#getAttribute(javax.servlet.http.HttpServletRequest, java.lang.String)
     */
    @Override
    public Object getAttribute(String name) {
        HttpSession session = getRequest().getSession(false);
        if (null != session) {
            return session.getAttribute(name);
        }
        return null;
    }

    /**
     * 
     * @see com.xnjr.account.front.json.ISessionProvider.pz.ao.session.SessionProvider#removeUserDetail(javax.servlet.http.HttpServletRequest, java.lang.String)
     */
    @Override
    public void removeUserDetail() {
        HttpSession session = getRequest().getSession();
        session.removeAttribute(USER_DETAIL_KEY);
    }

    private HttpServletRequest getRequest() {
        return ControllerContext.getRequest();
    }

    /** 
     * @see com.xnjr.account.front.json.ISessionProvider.pz.ao.session.SessionProvider#getUserDetail()
     */
    @Override
    public AUserDetail getUserDetail() {
        return (AUserDetail) getRequest().getSession().getAttribute(
            USER_DETAIL_KEY);
    }

}
