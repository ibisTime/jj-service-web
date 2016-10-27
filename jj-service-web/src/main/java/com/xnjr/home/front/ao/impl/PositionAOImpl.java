package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IPositionAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN612080Req;
import com.xnjr.home.front.req.XN612081Req;
import com.xnjr.home.front.req.XN612090Req;

@Service
public class PositionAOImpl implements IPositionAO {
	@Override
	public Object publishPosition(String name, String kind, String province,
			String city, String experience, String education, String type,
			String jobNum, String msalary, String description,
			String companyCode, String publisher) {
		XN612080Req req = new XN612080Req();
		req.setCity(city);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setEducation(education);
		req.setExperience(experience);
		req.setJobNum(jobNum);
		req.setKind(kind);
		req.setMsalary(msalary);
		req.setName(name);
		req.setProvince(province);
		req.setPublisher(publisher);
		req.setType(type);
		return BizConnecter.getBizData("612080", JsonUtils.object2Json(req),
	        Object.class);
	}
	@Override
	public Object editPosition(String code, String name, String kind,
			String province, String city, String experience,
			String education, String type, String jobNum,
			String msalary, String description, String companyCode,
			String publisher){
		XN612081Req req = new XN612081Req();
		req.setCity(city);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setEducation(education);
		req.setExperience(experience);
		req.setJobNum(jobNum);
		req.setKind(kind);
		req.setMsalary(msalary);
		req.setName(name);
		req.setProvince(province);
		req.setPublisher(publisher);
		req.setType(type);
		req.setCode(code);
		return BizConnecter.getBizData("612081", JsonUtils.object2Json(req),
	        Object.class);
	}
	@Override
	public Object deletePosition(String code){
		return BizConnecter.getBizData("612082", JsonUtils.string2Json("code", code),
	            Object.class);
	}
	@Override
    public Object queryPagePosition(String name, String companyCode,
    		String isHot, String companyName,
    		String start, String limit) {
    	XN612090Req req = new XN612090Req();
    	req.setIsHot(isHot);
        req.setCompanyCode(companyCode);
        req.setCompanyName(companyName);
        req.setLimit(limit);
        req.setName(name);
        req.setStart(start);
        return BizConnecter.getBizData("612090", JsonUtils.object2Json(req),
            Object.class);
    }
	@Override
    public Object queryPositionInfo(String code){
    	return BizConnecter.getBizData("612091", JsonUtils.string2Json("code", code),
            Object.class);
    }
}
