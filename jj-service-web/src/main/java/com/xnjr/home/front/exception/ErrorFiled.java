/*
 * 文件名称: ErrorFiled.java
 * 包路径:com.hundsun.hsnet.itrade.web.core.exception
 * 创建日期: 2014-3-25
 * 作者: xuebj07252
 * 系统名称: web 交易行情
 * 模块名称: 交易
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */

package com.xnjr.home.front.exception;

/**
 * [TODO 功能说明: 写明作用，调用方式，使用场景，以及特殊情况]
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午2:18:02<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */

public class ErrorFiled  extends Error {
    /**
     * name: 错误表单字段名称 <input name=""> name 属性值
     */
    private String name;

   /**
     * @param name
     * @param info
     */
    public ErrorFiled(String name, String info) {
        super();
        this.name = name;
        this.info = info;
    }

    /**
     * @return  name
     */
    public String getName() {
        return this.name;
    }

    /**
     * @param name 设置 name 
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return  info
     */
    public String getInfo() {
        return this.info;
    }

    /**
     * @param info 设置 info 
     */
    public void setInfo(String info) {
        this.info = info;
    }
}
