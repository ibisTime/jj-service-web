package com.xnjr.home.front.base;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.ServletContextAware;

/**
 * 配置静态文件工具类
 * @author: myb858 
 * @since: 2015年9月6日 下午7:14:34 
 * @history:
 */
public class ApplicationProperties implements ServletContextAware {

    private ServletContext servletContext;

    @Value("${web.basePath}")
    private String basePath;

    @Value("${web.resourceUrl}")
    private String resourceUrl;

    public ServletContext getServletContext() {
        return servletContext;
    }

    @Override
    public void setServletContext(ServletContext context) {
        context.setAttribute("basePath", basePath);
        context.setAttribute("resourceUrl", resourceUrl);
    }

    public String getBasePath() {
        return basePath;
    }

    public void setBasePath(String basePath) {
        this.basePath = basePath;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

}
