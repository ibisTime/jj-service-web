package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IInterestAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN612100Req;
import com.xnjr.home.front.req.XN612101Req;
import com.xnjr.home.front.req.XN612103Req;
import com.xnjr.home.front.req.XN612110Req;
import com.xnjr.home.front.req.XN612111Req;
import com.xnjr.home.front.req.XN612112Req;
import com.xnjr.home.front.req.XN612113Req;

@Service
public class InterestAOImpl implements IInterestAO {

	@Override
	public Object interested(String fromUser, String toCode, String type) {
		XN612100Req req = new XN612100Req();
		req.setFromUser(fromUser);
		req.setToCode(toCode);
		req.setType(type);
		return BizConnecter.getBizData("612100", JsonUtils.object2Json(req),
				Object.class);
	}
	
	@Override
	public Object applyPosition(String userId, String resumeCode, String positionCode){
		XN612101Req req = new XN612101Req();
		req.setPositionCode(positionCode);
		req.setResumeCode(resumeCode);
		req.setUserId(userId);
		return BizConnecter.getBizData("612101", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object delete(String code) {
		return BizConnecter.getBizData("612102", JsonUtils.string2Json("code", code),
				Object.class);
	}

	@Override
	public Object handle(String code, String dealNote, String dealer) {
		XN612103Req req = new XN612103Req();
		req.setCode(code);
		req.setDealer(dealer);
		req.setDealNote(dealNote);
		return BizConnecter.getBizData("612103", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryPageInterestServer(String fromUser, String toCode,
			String companyCode, String start, String limit) {
		XN612110Req req = new XN612110Req();
		req.setCompanyCode(companyCode);
		req.setFromUser(fromUser);
		req.setLimit(limit);
		req.setStart(start);
		req.setToCode(toCode);
		return BizConnecter.getBizData("612110", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryPageInterestDemand(String companyCode, String publisher,
			String start, String limit) {
		XN612111Req req = new XN612111Req();
		req.setCompanyCode(companyCode);
		req.setLimit(limit);
		req.setPublisher(publisher);
		req.setStart(start);
		return BizConnecter.getBizData("612111", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryPageInterestResume(String companyCode, String publisher,
			String start, String limit) {
		XN612112Req req = new XN612112Req();
		req.setCompanyCode(companyCode);
		req.setLimit(limit);
		req.setPublisher(publisher);
		req.setStart(start);
		return BizConnecter.getBizData("612112", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryPageInterestPosition(String companyCode,
			String fromUser, String start, String limit) {
		XN612113Req req = new XN612113Req();
		req.setCompanyCode(companyCode);
		req.setFromUser(fromUser);
		req.setLimit(limit);
		req.setStart(start);
		return BizConnecter.getBizData("612113", JsonUtils.object2Json(req),
				Object.class);
	}

}
