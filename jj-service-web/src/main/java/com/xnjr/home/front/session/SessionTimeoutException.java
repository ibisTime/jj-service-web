package com.xnjr.home.front.session;

import java.util.LinkedHashSet;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.xnjr.home.front.base.BaseRuntimeException;
import com.xnjr.home.front.enums.ESeparator;
import com.xnjr.home.front.exception.Error;
import com.xnjr.home.front.exception.ErrorMessage;
import com.xnjr.home.front.exception.ExceptionTypeConstants;

/**
 * 会话超时exception
 *
 * @author: xuebj07252
 * @since: 14-4-3 下午3:18
 * @history:
 */
@SuppressWarnings("serial")
@JsonFilter(value = "sessionTimeoutException")
public class SessionTimeoutException extends BaseRuntimeException {

    /**
     * 表示会话超时
     */
    private Boolean timeout = Boolean.TRUE;

    /**
     * 会话超时信息
     */
    private String msg;

    public SessionTimeoutException() {
        super();
        seteType(ExceptionTypeConstants.BIZ_EXCEPTION.value());
    }

    public SessionTimeoutException(String... params) {
        super(params);
        seteType(ExceptionTypeConstants.BIZ_EXCEPTION.value());
    }

    @Override
    public void addErrorMessage(String... params) {
        if (null == exceptions) {
            exceptions = new LinkedHashSet<Error>();
        }
        exceptions.add(new ErrorMessage("-1000", params[0]));
    }

    /**
     * 需要的错误信息字段
     * @return
     */
    @Override
    public String[] packProperties() {
        // return new String[] { "success", "timeout", "eType", "exceptions" };
        return new String[] { "success", "timeout", "msg" };
    }

    public Boolean getTimeout() {
        return timeout;
    }

    public void setTimeout(Boolean timeout) {
        this.timeout = timeout;
    }

    public String getMsg() {
        return StringUtils.isBlank(this.msg) ? this.toMsg() : this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String toMsg() {
        StringBuilder msg = new StringBuilder();
        for (Error ex : getExceptions()) {
            msg.append(ex.getInfo()).append(ESeparator.SEMICOLON.value());
        }
        msg.deleteCharAt(msg.length() - 1);
        String res = msg.toString();
        this.setMsg(res);
        return res;
    }
}
