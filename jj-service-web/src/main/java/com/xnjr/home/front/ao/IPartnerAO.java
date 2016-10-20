package com.xnjr.home.front.ao;

import java.util.List;

import com.xnjr.home.front.res.Page;

public interface IPartnerAO {
    Object addPartner(String fromCompany, String fromPerson, String fromContact,
            String content, String companyCode);
}
