/*
 * 文件名称: ProxyException.java
 * 包路径:com.hundsun.hsnet.itrade.service.core.exception
 * 创建日期: 2014-3-25
 * 作者: xuebj07252
 * 系统名称: web 交易行情
 * 模块名称: 交易
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */

package com.xnjr.home.front.exception;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * 连接代理Exception 
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午2:57:04<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */
@JsonFilter(value = "baseException")
public class ConnectionProxyException extends SystemException {
    private static final long serialVersionUID = 1L;

    /**
     * @param no 错误号
     * @param info 错误信息
     */

    public ConnectionProxyException(String no, String info) {
        super(no, info);
        seteType(ExceptionTypeConstants.SYSTEM_EXCEPTION.value());
    }
}
