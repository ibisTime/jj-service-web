/*
 * 文件名称: ExceptionTypeConstants.java
 * 包路径:com.hundsun.hsnet.itrade.service.core.exception
 * 创建日期: 2014-3-25
 * 作者: xuebj07252
 * 系统名称: web 交易行情
 * 模块名称: 交易
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */

package com.xnjr.home.front.exception;

/**
 *  Exception 类型 定义
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午4:06:08<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */

public enum ExceptionTypeConstants {
    /**
     * SYSTEM_EXCEPTION: 系统异常
     */
    SYSTEM_EXCEPTION(0),

    /**
     * DATA_VALIDATION_EXCEPTION: 数据绑定验证异常
     */
    DATA_VALIDATION_EXCEPTION(1),

    /** 
     * @Fields BIZ_EXCEPTION :  业务异常
     */
    BIZ_EXCEPTION(2);

    private int id;

    ExceptionTypeConstants(int id) {
        this.id = id;
    }

    public int value() {
        return this.id;
    }
}
