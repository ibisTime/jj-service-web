/**
 * @Title SessionUser.java 
 * @Package com.hsnet.pz.session 
 * @Description 
 * @author miyb  
 * @date 2014-8-19 下午4:46:22 
 * @version V1.0   
 */
package com.xnjr.home.front.session;


/** 
 * @author: miyb 
 * @since: 2014-8-19 下午4:46:22 
 * @history:
 */
public class SessionUser extends AUserDetail {
    private String user_id;

    private String account_number;

    public SessionUser() {
    }

    public SessionUser(String user_id, String account_number) {
        this.user_id = user_id;
        this.account_number = account_number;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getAccount_number() {
        return account_number;
    }

    public void setAccount_number(String account_number) {
        this.account_number = account_number;
    }

}
