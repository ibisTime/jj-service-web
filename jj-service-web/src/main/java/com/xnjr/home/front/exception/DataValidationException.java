package com.xnjr.home.front.exception;

import java.util.LinkedHashSet;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.xnjr.home.front.base.BaseRuntimeException;

/**
 * 表单异常类，例如form表单数据验证
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午2:13:54<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */
@SuppressWarnings("serial")
@JsonFilter(value = "dataException")
public class DataValidationException extends BaseRuntimeException {

    public DataValidationException() {
        super();
        seteType(ExceptionTypeConstants.DATA_VALIDATION_EXCEPTION.value());
    }

    public DataValidationException(String filedName, String errorInfo) {
        super(filedName, errorInfo);
        seteType(ExceptionTypeConstants.DATA_VALIDATION_EXCEPTION.value());
    }

    @Override
    public void addErrorMessage(String... params) {
        if (null == exceptions) {
            exceptions = new LinkedHashSet<Error>();
        }
        exceptions.add(new ErrorFiled(params[0], params[1]));
    }

    @Override
    public void toMessage() {
        StringBuilder message = new StringBuilder();
        for (Object filed : this.getExceptions()) {
            message.append(((ErrorFiled) filed).getInfo()).append("/n");
        }
        this.setMessage(message.toString());
    }
}
