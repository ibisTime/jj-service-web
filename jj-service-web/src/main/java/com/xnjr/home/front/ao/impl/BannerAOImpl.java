package com.xnjr.home.front.ao.impl;


import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IBannerAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806051Req;

@Service
public class BannerAOImpl implements IBannerAO {

	@Override
	public Object getBannerList(String name, String location, String status,
			String updater, String companyCode) {
		XN806051Req req = new XN806051Req();
		req.setCompanyCode(companyCode);
		req.setLocation(location);
		req.setName(name);
		req.setStatus("1");
		req.setUpdater(updater);
		return BizConnecter.getBizData("806051", JsonUtils.object2Json(req),
	            Object.class);
	}

}
