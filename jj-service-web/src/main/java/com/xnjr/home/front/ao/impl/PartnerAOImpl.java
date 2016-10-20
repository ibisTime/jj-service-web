package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IPartnerAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806060Req;

@Service
public class PartnerAOImpl implements IPartnerAO {

    public Object addPartner(String fromCompany, String fromPerson, String fromContact,
            String content, String companyCode) {
        XN806060Req req = new XN806060Req();
        req.setCompanyCode(companyCode);
        req.setContent(content);
        req.setFromCompany(fromCompany);
        req.setFromContact(fromContact);
        req.setFromPerson(fromPerson);
        return BizConnecter.getBizData("806060", JsonUtils.object2Json(req),
            Object.class);
    }
}
