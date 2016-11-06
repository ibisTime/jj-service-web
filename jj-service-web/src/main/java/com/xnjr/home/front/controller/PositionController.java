package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IPositionAO;
import com.xnjr.home.front.controller.BaseController;

@Controller
@RequestMapping(value = "/position")
public class PositionController extends BaseController {

    @Autowired
    IPositionAO positionAO;
    
    //发布职位
    @RequestMapping(value = "/publish", method = RequestMethod.POST)
    @ResponseBody
    public Object publishPosition(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "kind", required = true) String kind,
    		@RequestParam(value = "province", required = true) String province,
    		@RequestParam(value = "city", required = true) String city,
    		@RequestParam(value = "area", required = false) String area,
    		@RequestParam(value = "experience", required = false) String experience,
    		@RequestParam(value = "education", required = false) String education,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "jobNum", required = false) String jobNum,
    		@RequestParam(value = "msalary", required = false) String msalary,
    		@RequestParam(value = "description", required = false) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return positionAO.publishPosition(name, kind, province, city, area,
    			experience, education, type, jobNum, msalary,
    			description, this.getSessionUser().getCompanyCode(), publisher);
    }
    
    //修改职位
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editPosition(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "kind", required = true) String kind,
    		@RequestParam(value = "province", required = true) String province,
    		@RequestParam(value = "city", required = true) String city,
    		@RequestParam(value = "area", required = false) String area,
    		@RequestParam(value = "experience", required = false) String experience,
    		@RequestParam(value = "education", required = false) String education,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "jobNum", required = false) String jobNum,
    		@RequestParam(value = "msalary", required = false) String msalary,
    		@RequestParam(value = "description", required = false) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return positionAO.editPosition(code, name, kind, province, city, area,
    			experience, education, type, jobNum, msalary,
    			description, this.getSessionUser().getCompanyCode(), publisher);
    }
    
    //删除职位
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object deletePosition(
    		@RequestParam(value = "code", required = true) String code){
    	return positionAO.deletePosition(code);
    }
    
    //分页查询职位
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPagePosition(
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "companyName", required = false) String companyName,
    		@RequestParam(value = "kind", required = false) String kind,
    		@RequestParam(value = "isHot", required = false) String isHot,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	return positionAO.queryPagePosition(name, companyCode, isHot,
			companyName, kind, start, limit);
    }
    
    //详情查询职位
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPositionInfo(
    		@RequestParam(value = "code", required = true) String code){
    	return positionAO.queryPositionInfo(code);
    }
}
