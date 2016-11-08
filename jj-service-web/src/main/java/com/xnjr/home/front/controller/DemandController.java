package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IDemandAO;
import com.xnjr.home.front.controller.BaseController;

@Controller
@RequestMapping(value = "/demand")
public class DemandController extends BaseController {

    @Autowired
    IDemandAO demandAO;
    
    //新增需求
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addDemand(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "expCompany", required = true) String expCompany,
    		@RequestParam(value = "urgentLevel", required = true) String urgentLevel,
    		@RequestParam(value = "description", required = false) String description){
    	return demandAO.addDemand(name, qualityCode, expCompany,
    			urgentLevel, description, this.getSessionUser().getUserId());
    }
    
    //修改需求
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editDemand(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "expCompany", required = true) String expCompany,
    		@RequestParam(value = "urgentLevel", required = true) String urgentLevel,
    		@RequestParam(value = "description", required = true) String description){
    	return demandAO.editDemand(code, name, qualityCode, expCompany,
    			urgentLevel, description, this.getSessionUser().getUserId());
    }
    
    //删除需求
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteDemand(
    		@RequestParam(value = "code", required = true) String code){
    	return demandAO.deleteDemand(code);
    }
    
    //分页查询需求
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageDemand(
    		@RequestParam(value = "publisher", required = false) String publisher,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "urgentLevel", required = false) String urgentLevel,
    		@RequestParam(value = "dateStart", required = false) String dateStart,
    		@RequestParam(value = "dateEnd", required = false) String dateEnd,
    		@RequestParam(value = "dealer", required = false) String dealer,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	return demandAO.queryPageDemand(publisher, type, urgentLevel,
    			dateStart, dateEnd, dealer, start, limit);
    }
    
    //详情查询需求
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDemandInfo(
    		@RequestParam(value = "code", required = true) String code){
    	return demandAO.queryDemandInfo(code);
    }
}
