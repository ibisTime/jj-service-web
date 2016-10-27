package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IDictAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN807706Req;

@Service
public class DictAOImpl implements IDictAO {

    public Object queryDictList(String type, String parentKey, String dkey) {
        XN807706Req req = new XN807706Req();
        req.setType(type);
        req.setParentKey(parentKey);
        req.setDkey(dkey);
        return BizConnecter.getBizData("807706", JsonUtils.object2Json(req),
            Object.class);
    }

}
