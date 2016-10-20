package com.xnjr.home.front.exception;

/**
 * [TODO 功能说明: 写明作用，调用方式，使用场景，以及特殊情况]
 * <p> 系统版本: v1.0.0</p><br>
 * 作者:  xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间:14-3-27 上午9:22<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * <p/>
 * ========    =======  ============================================
 */

public class Error {

    protected  String info;

    public Error() {
    }

    public Error(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
