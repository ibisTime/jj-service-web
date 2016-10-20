package com.xnjr.home.front.exception;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.xnjr.home.front.base.BaseRuntimeException;

/**
 * 功能说明: 异常统一拦截器 继承springmvc 提供的统一异常处理类 在此基础上增加 ajax请求场景和国际化支持
 * 异常处理类型如下：
 * 1、前台抛出的基于BaseRuntimeException的异常
 * 2、其它异常
 * 以上异常统一包装成BaseRuntimeException，方便前台统一获取
 * <p>
 * 系统版本: v1.0。0<br>
 * 开发人员: xuebj07252 xuebj07252@hundsun.com <br>
 * 开发时间: 2014-2-11 <br>
 * 功能描述: 写明作用，调用方式，使用场景，以及特殊情况<br>
 */

public class ExceptionResolver extends SimpleMappingExceptionResolver {
    private static final Logger logger = LoggerFactory
        .getLogger(ExceptionResolver.class);

    @Autowired
    MessageSource messageSource;

    @Override
    protected ModelAndView doResolveException(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex) {
        /** 统一转换成BaseRuntimeException,主要是转换运行时异常为SyetemException*/
        BaseRuntimeException exception = exceptionWapper(ex);
        /** 错误信息转换：如果是体系内异常则使用错误号寻找错误信息，体系外的不处理 */
        convertErrorMessage(request, exception);
        /** 如果请求是ajax的，则将异常信息字符串直接输出 */
        if (isAjaxRequest(request, handler)) {
            return doResolveAjaxException(response, exception);
        }
        /** 使用spring mvc自带的异常处理 */
        // 设置异常信息到Message对象中
        exception.toMessage();
        return super.doResolveException(request, response, handler, exception);
    }

    /**
     * 判断是否是ajax请求
     * 
     * @param request
     * @param handler
     * @return
     */
    private boolean isAjaxRequest(HttpServletRequest request, Object handler) {
        if (request.getHeader("accept").indexOf("application/json") > -1) {
            return true;
        }
        if (request.getHeader("X-Requested-With") == null) {
            return false;
        }
        if (request.getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1) {
            return true;
        }
        return false;
    }

    /**
     * 把除BaseException和 DataValidationException异常包装为 BaseRuntimeException
     * 作者:xuebj07252 
     * 创建时间:2014-3-26 下午12:18:24
     * @param exception
     * @return
     */
    private BaseRuntimeException exceptionWapper(Exception exception) {
        if (exception instanceof BindException) {
            BaseRuntimeException ex = new DataValidationException();
            BindException bindException = (BindException) exception;
            for (FieldError filed : bindException.getFieldErrors()) {
                ex.addErrorMessage(filed.getField(), filed.getDefaultMessage());
            }
            return ex;
        }
        if (isNotBaseRuntimeException(exception)) {
            BaseRuntimeException ex = new SystemException(
                "sys.default.error.info", "服务器发生内部错误，请稍后再试或报告给网站管理员。");
            return ex;
        }
        return (BaseRuntimeException) exception;
    }

    /**
     * 异常信息国际化支持。出去DataValidationException 其他都需要做信息处理
     * @param request
     * @param ex
     */
    private void convertErrorMessage(HttpServletRequest request,
            BaseRuntimeException ex) {
        Locale locale = RequestContextUtils.getLocale(request);
        if (isNotDataValidationException(ex)) {
            if (null != ex.getExceptions()) {
                for (Object er : ex.getExceptions()) {
                    ErrorMessage error = (ErrorMessage) er;
                    if (StringUtils.isNotBlank(error.getNo())) {
                        String message = messageSource.getMessage(
                            error.getNo(), null, error.getInfo(), locale);
                        error.setInfo(message);
                    }
                }
            }
        }
    }

    /**
     * ajax时，写出异常信息到response中
     * @param response
     * @param ex
     * @return
     */
    private ModelAndView doResolveAjaxException(HttpServletResponse response,
            BaseRuntimeException ex) {
        setResponse(response);
        try {
            PrintWriter writer = response.getWriter();
            String jsonStr = JacksonUtils.toJsonString(ex, ex.packProperties());
            if (StringUtils.isNotBlank("jsonStr")) {
                writer.write(jsonStr);
            }
            writer.flush();
        } catch (IOException e) {
            logger.error("处理ajax请求 返回异常信息失败:" + e);
        }
        return new ModelAndView();
    }

    /**
     * 设置response 编码及头信息
     * @param response
    */
    private void setResponse(HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");
    }

    private Boolean isNotBaseRuntimeException(Exception exception) {
        return !isBaseRuntimeException(exception);
    }

    private Boolean isNotDataValidationException(Exception exception) {
        return !isDataValidationException(exception);
    }

    private Boolean isBaseRuntimeException(Exception exception) {
        return exception instanceof BaseRuntimeException;
    }

    private Boolean isDataValidationException(Exception exception) {
        return exception instanceof DataValidationException;
    }
}
