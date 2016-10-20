/*
 * 文件名称: BaseRuntimeException.java
 * 包路径:com.hundsun.hsnet.itrade.service.sdk.common.exception
 * 创建日期: 2014-3-13
 * 作者: xuebj07252
 * 系统名称: web 交易行情
 * 模块名称: 交易
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */

package com.xnjr.home.front.base;

import java.util.Collection;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.xnjr.home.front.enums.ESeparator;
import com.xnjr.home.front.exception.Error;

/**
 * 基本异常类，所有产生的异常最终都需要封装成此类 或其子类
 * 自定义异常需要继承此异常类
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-13 下午2:07:36<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */
@JsonFilter(value = "baseRuntimeException")
public abstract class BaseRuntimeException extends RuntimeException {
    /**
     * serialVersionUID:
     */
    private static final long serialVersionUID = -5087090997512824055L;

    /**
     * success: 标示请求成功与否
     */
    protected Boolean success = Boolean.FALSE;

    /**
     * eType: 异常类型
     */
    protected Integer eType;

    /**
     * 异常信息，用于覆盖父类中的异常信息
     */
    protected String message;

    /**
     * 异常信息，自定义信息
     */
    protected String msg;

    /**
     * exceptions: 异常信息集合
     */
    protected Collection<Error> exceptions;

    public BaseRuntimeException() {
        super();
    }

    public BaseRuntimeException(String... params) {
        addErrorMessage(params);
    }

    /**
     * 增加一个异常信息
     * 作者:xuebj07252 
     * 创建时间:2014-3-25 下午4:20:51
     * @param params
     */
    public abstract void addErrorMessage(String... params);

    /**
     * @return  success
     */
    public Boolean getSuccess() {
        return this.success;
    }

    /**
     * @param success 设置 success 
     */
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    /**
     * @return  exceptions
     */
    public Collection<Error> getExceptions() {
        return this.exceptions;
    }

    /**
     * @param exceptions 设置 exceptions 
     */
    public void setExceptions(Collection<Error> exceptions) {
        this.exceptions = exceptions;
    }

    /**
     * @return  eType
     */
    public Integer geteType() {
        return this.eType;
    }

    /**
     * 设置 异常类型
     * @param eType
     */
    public void seteType(Integer eType) {
        this.eType = eType;
    }

    /**
     * @return  message
     */
    @Override
    public String getMessage() {
        return StringUtils.isBlank(message) ? super.getMessage() : this.message;
    }

    /**
     * @param message 设置 message 
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return  message
     */
    public String getMsg() {
        return StringUtils.isBlank(message) ? this.toMsg() : this.message;
    }

    /**
     * @param message 设置 message 
     */
    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * 设置异常信息，需要子类实现
     */
    public void toMessage() {
        StringBuilder message = new StringBuilder();
        for (Error msg : getExceptions()) {
            message.append(msg.getInfo()).append(ESeparator.SEMICOLON.value());
        }
        message.deleteCharAt(message.length() - 1).append(
            ESeparator.PERIOD.value());
        setMessage(message.toString());
    }

    /**
     * 设置异常信息，需要子类实现
     */
    public String toMsg() {
        StringBuilder msg = new StringBuilder();
        for (Error ex : getExceptions()) {
            msg.append(ex.getInfo()).append(ESeparator.SEMICOLON.value());
        }
        msg.deleteCharAt(msg.length() - 1);
        String res = msg.toString();
        setMsg(res);
        return res;
    }

    /**
     * 需要打包的属性字段，子类可以覆盖此方法，已达到自定义打包字段的功能
     * @return
     */
    public String[] packProperties() {
        // return new String[]{ "success", "eType","exceptions"};
        return new String[] { "success", "msg" };
    }

}
