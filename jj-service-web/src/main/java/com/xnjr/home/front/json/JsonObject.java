package com.xnjr.home.front.json;

/**
 * JSON格式数据返回对象,封装controller 返回的对象
 * <p> 系统版本: v1.0.0</p><br>
 * 作者:  xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间:14-3-27 下午3:50<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * <p/>
 * ========    =======  ============================================
 */

public class JsonObject {

    /**
     * 请求结果
     */
    private Boolean success = Boolean.TRUE;

    /**
     * 请求结果说明
     */
    private String msg;

    /**
     * controller 方法返回数据对象
     */
    private Object data;

    public JsonObject(Object data) {
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
