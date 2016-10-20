package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.ICompanyAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;

@Service
public class CompanyAOImpl implements ICompanyAO {

    @Override
    public Object doGetCompany(String code) {
        return BizConnecter.getBizData("806010",
            JsonUtils.string2Json("code", code), Object.class);
    }

    public Object getCompanyByUrl(String url){
    	return BizConnecter.getBizData("806015",
    		JsonUtils.string2Json("domain", url), Object.class);
    }
}
