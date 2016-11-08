package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.ICredentialsAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN806131Req;
import com.xnjr.home.front.req.XN806140Req;
import com.xnjr.home.front.req.XN806142Req;
import com.xnjr.home.front.req.XN806143Req;
import com.xnjr.home.front.req.XN806150Req;
import com.xnjr.home.front.req.XN806151Req;

@Service
public class CredentialsAOImpl implements ICredentialsAO {

	@Override
	public Object applyCredentials(String certificateCode, String companyCode) {
		XN806140Req req = new XN806140Req();
		req.setCertificateCode(certificateCode);
		req.setCompanyCode(companyCode);
		return BizConnecter.getBizData("806140", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryPageCredentials(
			String certificateCode, String certificateType,
			String companyCode, String status, String approveUser,
			String start, String limit) {
		XN806150Req req = new XN806150Req();
		req.setCertificateType(certificateType);
		req.setApproveUser(approveUser);
		req.setCertificateCode(certificateCode);
		req.setCompanyCode(companyCode);
		req.setLimit(limit);
		req.setStart(start);
		req.setStatus(status);
		return BizConnecter.getBizData("806150", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryListCredentials(String certificateCode,
			String companyCode, String status, String applyUser,
			String approveUser) {
		XN806151Req req = new XN806151Req();
		req.setApproveUser(approveUser);
		req.setCertificateCode(certificateCode);
		req.setCompanyCode(companyCode);
		req.setStatus(status);
		req.setApplyUser(applyUser);
		return BizConnecter.getBizData("806151", JsonUtils.object2Json(req),
				Object.class);
	}
	
	@Override
	public Object queryCredentials(String code) {
		return BizConnecter.getBizData("806152", JsonUtils.string2Json("code", code),
				Object.class);
	}

	@Override
	public Object queryListCredentials1(String type, String name,
			String status, String updater) {
		XN806131Req req = new XN806131Req();
		req.setName(name);
		req.setStatus("1");
		req.setType(type);
		req.setUpdater(updater);
		return BizConnecter.getBizData("806131", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object deleteCertificates(String code, String userId) {
		XN806142Req req = new XN806142Req();
		req.setCode(code);
		req.setUserId(userId);
		return BizConnecter.getBizData("806142", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editCertificates(String code, String certificateCode,
			String applyUser) {
		XN806143Req req = new XN806143Req();
		req.setApplyUser(applyUser);
		req.setCertificateCode(certificateCode);
		req.setCode(code);
		return BizConnecter.getBizData("806143", JsonUtils.object2Json(req),
				Object.class);
	}

}
