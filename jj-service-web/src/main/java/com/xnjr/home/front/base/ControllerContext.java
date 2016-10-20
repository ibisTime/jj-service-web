package com.xnjr.home.front.base;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 控制器上下，用于获取httpservletrequest,httpservletRespose
 * 使用本地线程实现
 * @author: zhanggl10620 
 * @since: 2014-8-11 下午5:30:52 
 * @history:
 */
public class ControllerContext {
    
    private static ThreadLocal<Map<String,Object>> controllerContext = new ThreadLocal<Map<String,Object>>();
    
    public static final String HTTP_SERVLET_RQUEST = "request";

    public static final String HTTP_SERVELET_RESPONSE = "response";

    public static void set(Map<String,Object> map){
        controllerContext.set(map);
     }

    /**
     * 获取request对象
     */
    public static HttpServletRequest getRequest(){
       return  (HttpServletRequest)controllerContext.get().get(HTTP_SERVLET_RQUEST);
    }
    
    /**
     * 获取session对象
     * @return
     */
    public static HttpSession getSession(){
        HttpServletRequest reqest =  getRequest();
        return reqest.getSession(false);
    }
    
    /**
     * 获取response 对象
     * @return
     */
    public static HttpServletResponse getResponse(){
        return (HttpServletResponse)controllerContext.get().get(HTTP_SERVELET_RESPONSE);
    }
    
    public static void remove (){
        controllerContext.remove();
    }
}
