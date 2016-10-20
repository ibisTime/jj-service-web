package com.xnjr.home.front.session;

/**
 * 
 * <一句话功能简述> 会员抽象类，子类会员对象比较继承此对象，否则无法放入会话中 <功能详细描述>
 * 
 * @author zhanggl10620
 * @version [version 1.0, 2014-7-30]
 * @see [相关类/方法]
 * @since [产品/模块版本]
 */
public abstract class AUserDetail {

    /**
     * 
     * <一句话功能简述> 判断会员 登录会话是否有效，子类必须覆盖此方法 <功能详细描述>
     * 
     * @return
     * @see [类、类#方法、类#成员]
     */
    public Boolean isValid() {
        return Boolean.TRUE;
    }

}
