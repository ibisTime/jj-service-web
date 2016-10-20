/*
 * 文件名称: ErrorMessage.java
 * 包路径:com.hundsun.hsnet.itrade.service.core.exception
 * 创建日期: 2014-3-25
 * 作者: xuebj07252
 * 系统名称: web 交易行情
 * 模块名称: 交易
 * 软件版权: 杭州恒生电子股份有效公司，版权所有，违者必究
 */

package com.xnjr.home.front.exception;


/**
 * 异常信息对象实体
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午4:11:03<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */
public class ErrorMessage extends Error {

    /**
     * no: 错误编号
     */
    private String no;



    public ErrorMessage() {
        super();
    }

    /**
     * @param no
     * @param info
     */
    public ErrorMessage(String no, String info) {
        super();
        this.no = no;
        this.info = info;
    }

    /**
     * @return  no
     */
    public String getNo() {
        return this.no;
    }

    /**
     * @param no 设置 no 
     */
    public void setNo(String no) {
        this.no = no;
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

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "ErrorMessage [no=" + no + ", info=" + info + "]";
    }
}
