/**
 * @Title ESmsBizType.java 
 * @Package com.ibis.pz.enums 
 * @Description 
 * @author miyb  
 * @date 2015-4-14 下午2:45:40 
 * @version V1.0   
 */
package com.xnjr.home.front.enums;

/** 
 * @author: miyb 
 * @since: 2015-4-14 下午2:45:40 
 * @history:
 */
public enum ESmsBizType {
    REGISTER("805076", "需求方注册"), PERSONFINDLOGINPWD("805048", "需求方找回登录密码"),
    COMPFINDLOGINPWD("806009", "服务方找回密码"), PERSONRESETLOGINPWD("805049", "需求方重置登录密码"),
    COMPRESETLOGINPWD("", "服务方充值登录密码"), SETTRADEPWD("805045", "设置交易密码"),
    CHANGEMOBILE("805047", "需求方修改手机号码");

    ESmsBizType(String code, String value) {
        this.code = code;
        this.value = value;
    }

    private String code;

    private String value;

    public String getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }
}
