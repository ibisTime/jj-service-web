/**
 * @Title BaseController.java 
 * @Package com.hsnet.pz.controller 
 * @Description 
 * @author miyb  
 * @date 2014-8-19 上午10:54:17 
 * @version V1.0   
 */
package com.xnjr.home.front.controller;

import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.xnjr.home.front.base.ControllerContext;
import com.xnjr.home.front.session.ISessionProvider;
import com.xnjr.home.front.session.SessionUser;

@Controller
public class BaseController {

    @Autowired
    protected ISessionProvider sessionProvider;

    /**
     * 获取session user
     * 
     * @return
     */
    protected SessionUser getSessionUser() {
        SessionUser user = (SessionUser) sessionProvider.getUserDetail();
        return user;
    }

    protected SessionUser getSessionUser(String userId) {
        SessionUser user = null;
        if (StringUtils.isBlank(userId)) {
            user = getSessionUser();
        } else {
            user = new SessionUser();
            user.setUserId(userId);
        }
        return user;
    }

    protected void setSessionUser(SessionUser user) {
        sessionProvider.setUserDetail(user);
    }

    protected String getSessionUserId(String userId) {
        if (StringUtils.isBlank(userId)) {
            SessionUser user = getSessionUser();
            if (user == null) {
                return "";
            }
            userId = user.getUserId();
        }
        return userId;
    }

    /**
     * 获取IP地址
     * 
     * @return
     */
    protected String getRemoteHost() {
        String ip = ControllerContext.getRequest().getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
    }
    
    public static String unPwdUserId(String tokenId) {
        String userId = null;
        if (StringUtils.isNotBlank(tokenId)) {
            userId = tokenId.substring(1, tokenId.indexOf("|"));
        }
        return userId;
    }

    public static String pwdUserId(String userId) {
        int random = Math.abs(new Random().nextInt()) % 50 + 50;
        return "U" + userId + "|" + random;
    }

}
