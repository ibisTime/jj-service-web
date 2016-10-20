/*
 * 文件名称: BizException.java
 * 包路径:com.hundsun.hsnet.itrade.service.core.exception
 * 创建日期: 2014-3-25
 * 作者: xuebj07252
 * 系统名称: web 交易行情
 * 模块名称: 交易
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */

package com.xnjr.home.front.exception;

import java.util.LinkedHashSet;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.xnjr.home.front.base.BaseRuntimeException;

/**
 * 业务异常类，业务相关异常实现类
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午3:03:22<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */
@JsonFilter(value = "baseException")
public class BizException extends BaseRuntimeException {

    /** 
     * @Fields serialVersionUID : 
     */
    private static final long serialVersionUID = 6514924557145935851L;

    public BizException() {
        super();
        seteType(ExceptionTypeConstants.BIZ_EXCEPTION.value());
    }

    public BizException(String no, String info) {
        super(no, info);
        seteType(ExceptionTypeConstants.BIZ_EXCEPTION.value());
    }

    @Override
    public void addErrorMessage(String... params) {
        if (null == exceptions) {
            exceptions = new LinkedHashSet<Error>();
        }
        exceptions.add(new ErrorMessage(params[0], params[1]));
    }
}
