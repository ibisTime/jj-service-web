package com.xnjr.home.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IMenuAO;
import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806091Req;

@Service
public class MenuAOImpl implements IMenuAO {

    public Object doGetMenuList(String name, String location, String contentType,
            String companyCode) {
        if (StringUtils.isBlank(companyCode)) {
            throw new BizException("A010001", "公司编号不能为空");
        }
        XN806091Req req = new XN806091Req();
        req.setName(name);
        req.setLocation(location);
        req.setCompanyCode(companyCode);
        req.setContentType(contentType);
        req.setStatus("1");
        req.setParentCode("");
        return BizConnecter.getBizData("806091", JsonUtils.object2Json(req),
            Object.class);
    }
}
