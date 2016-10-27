package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IResumeAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN612060Req;
import com.xnjr.home.front.req.XN612061Req;
import com.xnjr.home.front.req.XN612070Req;

@Service
public class ResumeAOImpl implements IResumeAO {

    public Object publishResume(String name, String isWork, String preCompName,
    		String prePosName, String preWorkTime, String preMsalary, String preDescription,
    		String education, String isTz, String studyTime, String school,
    		String profession, String type, String expPosition, String expMsalary,
    		String expProvince, String expCity, String workStatus, String isOpen, String publisher) {
    	XN612060Req req = new XN612060Req();
    	req.setEducation(education);
    	req.setExpCity(expCity);
    	req.setExpMsalary(expMsalary);
    	req.setExpPosition(expPosition);
    	req.setExpProvince(expProvince);
    	req.setIsOpen(isOpen);
    	req.setIsTz(isTz);
    	req.setIsWork(isWork);
    	req.setName(name);
    	req.setPreCompName(preCompName);
    	req.setPreDescription(preDescription);
    	req.setPreMsalary(preMsalary);
    	req.setPrePosName(prePosName);
    	req.setPreWorkTime(preWorkTime);
    	req.setProfession(profession);
    	req.setPublisher(publisher);
    	req.setSchool(school);
    	req.setStudyTime(studyTime);
    	req.setType(type);
    	req.setWorkStatus(workStatus);
        return BizConnecter.getBizData("612060", JsonUtils.object2Json(req),
            Object.class);
    }

	@Override
	public Object editResume(String code, String name, String isWork,
			String preCompName, String prePosName, String preWorkTime,
			String preMsalary, String preDescription, String education,
			String isTz, String studyTime, String school, String profession,
			String type, String expPosition, String expMsalary,
			String expProvince, String expCity, String workStatus,
			String isOpen, String publisher) {
		XN612061Req req = new XN612061Req();
		req.setCode(code);
    	req.setEducation(education);
    	req.setExpCity(expCity);
    	req.setExpMsalary(expMsalary);
    	req.setExpPosition(expPosition);
    	req.setExpProvince(expProvince);
    	req.setIsOpen(isOpen);
    	req.setIsTz(isTz);
    	req.setIsWork(isWork);
    	req.setName(name);
    	req.setPreCompName(preCompName);
    	req.setPreDescription(preDescription);
    	req.setPreMsalary(preMsalary);
    	req.setPrePosName(prePosName);
    	req.setPreWorkTime(preWorkTime);
    	req.setProfession(profession);
    	req.setPublisher(publisher);
    	req.setSchool(school);
    	req.setStudyTime(studyTime);
    	req.setType(type);
    	req.setWorkStatus(workStatus);
        return BizConnecter.getBizData("612061", JsonUtils.object2Json(req),
            Object.class);
	}

	@Override
	public Object deleteResume(String code) {
		return BizConnecter.getBizData("612062", JsonUtils.string2Json("code", code));
	}

	@Override
	public Object queryPageResume(String mobile, String expPosition,
			String expProvince, String expCity, String publisher, String start,
			String limit) {
		XN612070Req req = new XN612070Req();
		req.setExpCity(expCity);
		req.setExpPosition(expPosition);
		req.setExpProvince(expProvince);
		req.setLimit(limit);
		req.setMobile(mobile);
		req.setPublisher(publisher);
		req.setStart(start);
		return BizConnecter.getBizData("612070", JsonUtils.object2Json(req),
	            Object.class);
	}

	@Override
	public Object queryResumeInfo(String code) {
		return BizConnecter.getBizData("612071", JsonUtils.string2Json("code", code));
	}

}
