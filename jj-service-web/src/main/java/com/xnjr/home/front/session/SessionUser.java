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
    private String userId;

    private String accountNumber;

    private String kind;
    
    private String companyCode;

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public SessionUser() {
    }

    public SessionUser(String userId, String accountNumber) {
        this.userId = userId;
        this.accountNumber = accountNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

}
