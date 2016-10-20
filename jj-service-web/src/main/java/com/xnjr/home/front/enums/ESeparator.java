/*
 * 文件名称: Separator.java
 * 包路径:om.hundsun.hsnet.template.core.constants
 * 创建日期: 2014-3-17
 * 作者: xuebj07252
 * 系统名称: 模板工程
 * 模块名称:
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */
package com.xnjr.home.front.enums;


/**
 * 分隔符枚举类
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-17 下午4:13:34<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 *
 * ========    =======  ============================================
 */
public enum ESeparator {
    SEMICOLON(";"), COMMA(","), COLON(":"),PERIOD(".");

    private String separator;

    private ESeparator(String separator) {
        this.separator = separator;
    }

    public String value() {
        return this.separator;
    }
}
