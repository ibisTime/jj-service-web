package com.xnjr.home.front.exception;

import java.util.LinkedHashSet;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.xnjr.home.front.base.BaseRuntimeException;

/**
 * 系统类异常信息。如 nullpointerException 等运行时异常
 * 包括连接类异常，
 * <p> 系统版本: v1.0.0</p><br>
 * 作者:  xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间:14-3-27 上午8:52<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * <p/>
 * ========    =======  ============================================
 */

@JsonFilter(value = "systemException")
public class SystemException extends BaseRuntimeException {

    /** 
     * @Fields serialVersionUID : 
     */
    private static final long serialVersionUID = 9150472741411593400L;

    public SystemException() {
        super();
    }

    public SystemException(String no, String info) {
        super(no, info);
        seteType(ExceptionTypeConstants.SYSTEM_EXCEPTION.value());
    }

    @Override
    public void addErrorMessage(String... params) {
        if (null == exceptions) {
            exceptions = new LinkedHashSet<Error>();
        }
        exceptions.add(new ErrorMessage(params[0], params[1]));
    }
}
