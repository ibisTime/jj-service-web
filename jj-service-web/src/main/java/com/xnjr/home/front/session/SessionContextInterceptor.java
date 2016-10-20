package com.xnjr.home.front.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 *  Session 会话拦截器
 * @author: xuebj07252
 * @since: 14-4-3 下午3:04
 * @history:
 */
public class SessionContextInterceptor extends HandlerInterceptorAdapter {

    private final static Logger log = LoggerFactory
        .getLogger(SessionContextInterceptor.class);

    private ISessionProvider sessionProvider;

    /**
     * 预处理
     * 未进行页面渲染
     * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
     */
    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
        AUserDetail user = sessionProvider.getUserDetail();
        if (null != user) {
            UserDetailHolder.setUserDeail(user);
            return super.preHandle(request, response, handler);
        } else {
            log.debug("请求的Controller的类是---------->"
                    + handler.getClass().getCanonicalName());
            log.debug("请求的Controller的方法是---------->"
                    + handler.getClass().getSimpleName());
            // response.sendRedirect(request.getContextPath() +
            // "/user/login.htm");
            // request.getRequestDispatcher("/user/login").(request, response);
            String url = request.getRequestURI();
            System.out.print(url);
            throw new SessionTimeoutException("登录链接已超时，请重新登录.");
        }
    }

    /**
     * 返回处理已经渲染了页面
     * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)
     */
    @Override
    public void postHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

    }

    /**
     * 后处理
     * 未进行页面渲染
     * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#afterCompletion(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
     */
    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        UserDetailHolder.remove();
        if (ex != null) {
            log.error("系统发生异常信息------------>" + ex.getStackTrace());
        }
    }

    public void setSessionProvider(ISessionProvider sessionProvider) {
        this.sessionProvider = sessionProvider;
    }

}
