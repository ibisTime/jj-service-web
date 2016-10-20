package com.xnjr.home.front.session;


/**
 * userDetail 对象本地线程存储
 * @author: zhanggl10620 
 * @since: 2014-4-15 下午2:56:55 
 * @history:
 */
public class UserDetailHolder {

    public static final ThreadLocal<AUserDetail> userDetail = new ThreadLocal<AUserDetail>();

    public static AUserDetail getUserDetail() {
        return userDetail.get();
    }

    public static void setUserDeail(AUserDetail user) {
        userDetail.set(user);
    }

    public static void remove() {
        userDetail.remove();
    }
}
