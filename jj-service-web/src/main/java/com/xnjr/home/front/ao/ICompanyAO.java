package com.xnjr.home.front.ao;

public interface ICompanyAO {
    /**
     * 获取公司信息
     * @param code
     * @return 
     * @create: 2015年9月9日 下午4:48:58 myb858
     * @history:
     */
    Object doGetCompany(String code);
    
    Object getCompanyByUrl(String url);
}
