package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IDemandAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN612040Req;
import com.xnjr.home.front.req.XN612041Req;
import com.xnjr.home.front.req.XN612050Req;

@Service
public class DemandAOImpl implements IDemandAO {

	@Override
	public Object addDemand(String name, String type, String expCompany,
			String urgentLevel, String description, String publisher) {
		XN612040Req req = new XN612040Req();
		req.setDescription(description);
		req.setExpCompany(expCompany);
		req.setName(name);
		req.setPublisher(publisher);
		req.setType(type);
		req.setUrgentLevel(urgentLevel);
		return BizConnecter.getBizData("612040", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editDemand(String code, String name, String type,
			String expCompany, String urgentLevel, String description,
			String publisher) {
		XN612041Req req = new XN612041Req();
		req.setCode(code);
		req.setDescription(description);
		req.setExpCompany(expCompany);
		req.setName(name);
		req.setPublisher(publisher);
		req.setType(type);
		req.setUrgentLevel(urgentLevel);
		return BizConnecter.getBizData("612041", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object deleteDemand(String code) {
		return BizConnecter.getBizData("612042", JsonUtils.string2Json("code", code),
				Object.class);
	}

	@Override
	public Object queryPageDemand(String publisher, String type,
			String urgentLevel, String dateStart, String dateEnd,
			String dealer, String start, String limit) {
		XN612050Req req = new XN612050Req();
		req.setDateEnd(dateEnd);
		req.setDateStart(dateStart);
		req.setDealer(dealer);
		req.setLimit(limit);
		req.setPublisher(publisher);
		req.setType(type);
		req.setStart(start);
		req.setUrgentLevel(urgentLevel);
		return BizConnecter.getBizData("612050", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryDemandInfo(String code) {
		return BizConnecter.getBizData("612051", JsonUtils.string2Json("code", code),
				Object.class);
	}

}
