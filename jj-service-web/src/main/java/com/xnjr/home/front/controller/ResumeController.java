package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IResumeAO;
import com.xnjr.home.front.controller.BaseController;


@Controller
@RequestMapping(value = "/resume")
public class ResumeController extends BaseController {

    @Autowired
    IResumeAO resumeAO;
    
    //发布简历
    @RequestMapping(value = "/publish", method = RequestMethod.POST)
    @ResponseBody
    public Object publishResume(
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "isWork", required = false) String isWork,
    		@RequestParam(value = "preCompName", required = false) String preCompName,
    		@RequestParam(value = "prePosName", required = false) String prePosName,
    		@RequestParam(value = "preWorkTime", required = false) String preWorkTime,
    		@RequestParam(value = "preMsalary", required = false) String preMsalary,
    		@RequestParam(value = "preDescription", required = false) String preDescription,
    		@RequestParam(value = "education", required = false) String education,
    		@RequestParam(value = "isTz", required = false) String isTz,
    		@RequestParam(value = "studyTime", required = false) String studyTime,
    		@RequestParam(value = "school", required = false) String school,
    		@RequestParam(value = "profession", required = false) String profession,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "expPosition", required = false) String expPosition,
    		@RequestParam(value = "expMsalary", required = false) String expMsalary,
    		@RequestParam(value = "expProvince", required = false) String expProvince,
    		@RequestParam(value = "expCity", required = false) String expCity,
    		@RequestParam(value = "workStatus", required = false) String workStatus,
    		@RequestParam(value = "isOpen", required = false) String isOpen){
    	return resumeAO.publishResume(name, isWork, preCompName, prePosName,
    			preWorkTime, preMsalary, preDescription, education, isTz,
    			studyTime, school, profession, type, expPosition, expMsalary,
    			expProvince, expCity, workStatus, isOpen, this.getSessionUser().getUserId());
    }
    
    //修改简历
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editResume(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "isWork", required = false) String isWork,
    		@RequestParam(value = "preCompName", required = false) String preCompName,
    		@RequestParam(value = "prePosName", required = false) String prePosName,
    		@RequestParam(value = "preWorkTime", required = false) String preWorkTime,
    		@RequestParam(value = "preMsalary", required = false) String preMsalary,
    		@RequestParam(value = "preDescription", required = false) String preDescription,
    		@RequestParam(value = "education", required = false) String education,
    		@RequestParam(value = "isTz", required = false) String isTz,
    		@RequestParam(value = "studyTime", required = false) String studyTime,
    		@RequestParam(value = "school", required = false) String school,
    		@RequestParam(value = "profession", required = false) String profession,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "expPosition", required = false) String expPosition,
    		@RequestParam(value = "expMsalary", required = false) String expMsalary,
    		@RequestParam(value = "expProvince", required = false) String expProvince,
    		@RequestParam(value = "expCity", required = false) String expCity,
    		@RequestParam(value = "workStatus", required = false) String workStatus,
    		@RequestParam(value = "isOpen", required = false) String isOpen){
    	return resumeAO.editResume(code, name, isWork, preCompName, prePosName,
    			preWorkTime, preMsalary, preDescription, education, isTz,
    			studyTime, school, profession, type, expPosition, expMsalary,
    			expProvince, expCity, workStatus, isOpen, this.getSessionUser().getUserId());
    }
    
    //删除简历
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteResume(
    		@RequestParam(value = "code", required = true) String code){
    	return resumeAO.deleteResume(code);
    }
    
    //分页查询简历
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageResume(
    		@RequestParam(value = "mobile", required = false) String mobile,
    		@RequestParam(value = "expPosition", required = false) String expPosition,
    		@RequestParam(value = "expProvince", required = false) String expProvince,
    		@RequestParam(value = "expCity", required = false) String expCity,
    		@RequestParam(value = "publisher", required = false) String publisher,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	return resumeAO.queryPageResume(mobile, expPosition, expProvince,
    			expCity, publisher, start, limit);
    }
    
    //分页查询简历
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageResume(){
    	return resumeAO.queryListResume(this.getSessionUser().getUserId());
    }
    
    //详情查询简历
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryResumeInfo(
    		@RequestParam(value = "code", required = true) String code){
    	return resumeAO.queryResumeInfo(code);
    }
}
