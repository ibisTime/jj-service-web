package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IServerAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN612030Req;

@Service
public class ServerAOImpl implements IServerAO {

	@Override
	public Object queryPageServers(String name, String companyCode,
			String companyName, String qualityCode, String isHot,
			String pubisher, String dateStart, String dateEnd, String dealer,
			String start, String limit) {
		XN612030Req req = new XN612030Req();
		req.setCompanyCode(companyCode);
		req.setCompanyName(companyName);
		req.setDateEnd(dateEnd);
		req.setDateStart(dateStart);
		req.setDealer(dealer);
		req.setIsHot(isHot);
		req.setLimit(limit);
		req.setName(name);
		req.setPubisher(pubisher);
		req.setQualityCode(qualityCode);
		req.setStart(start);
		req.setStatus("1");
		return BizConnecter.getBizData("612030", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryServer(String code) {
		return BizConnecter.getBizData("612031", JsonUtils.string2Json("code", code),
				Object.class);
	}
}
