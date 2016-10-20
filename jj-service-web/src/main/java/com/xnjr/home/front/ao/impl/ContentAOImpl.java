package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IContentAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806110Req;
import com.xnjr.home.front.req.XN806111Req;

@Service
public class ContentAOImpl implements IContentAO {

    @Override
    public Object doGetAContentPage(String kind, String title,
            String menuCode, String start, String limit) {
        XN806110Req req = new XN806110Req();
        req.setKind(kind);
        req.setTitle(title);
        req.setLimit(limit);
        req.setStart(start);
        req.setMenuCode(menuCode);
        return BizConnecter.getBizData("806110", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object doGetAContentList(String kind, String title,
            String menuCode) {
        XN806111Req req = new XN806111Req();
        req.setKind(kind);
        req.setTitle(title);
        req.setMenuCode(menuCode);
        return BizConnecter.getBizData("806111", JsonUtils.object2Json(req),
            Object.class);
    }
    public Object doGetAContent(String code){
    	return BizConnecter.getBizData("806112", JsonUtils.string2Json("code",code),
                Object.class);
    }
}
