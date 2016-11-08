package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.INewsAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN805130Req;

@Service
public class NewsAOImpl implements INewsAO {

	@Override
	public Object queryPageNews(String type, String title, String toCompany,
			String toLevel, String toUser, String companyCode,
			String start, String limit) {
		XN805130Req req = new XN805130Req();
		req.setCompanyCode(companyCode);
		req.setLimit(limit);
		req.setStart(start);
		//req.setStatus("1");
		req.setTitle(title);
		req.setToCompany(toCompany);
		req.setToLevel(toLevel);
		req.setToUser(toUser);
		req.setType(type);
		return BizConnecter.getBizData("805130", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryNews(String code) {
		return BizConnecter.getBizData("805132", JsonUtils.string2Json("code", code),
				Object.class);
	}
	
}
