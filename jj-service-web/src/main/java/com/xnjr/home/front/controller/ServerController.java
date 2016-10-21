package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IServerAO;

/** 
 * @author: miyb 
 * @since: 2015-5-13 上午10:28:47 
 * @history:
 */
@Controller
@RequestMapping(value = "/server")
public class ServerController {

    @Autowired
    IServerAO serverAO;
    
    //分页查询服务
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageServers(
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "companyName", required = false) String companyName,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "isHot", required = false) String isHot,
    		@RequestParam(value = "pubisher", required = false) String pubisher,
    		@RequestParam(value = "dateStart", required = false) String dateStart,
    		@RequestParam(value = "dateEnd", required = false) String dateEnd,
    		@RequestParam(value = "dealer", required = false) String dealer,
			@RequestParam("start") String start,
			@RequestParam("limit") String limit){
    	return serverAO.queryPageServers(name, companyCode, companyName,
    			qualityCode, isHot, pubisher, dateStart, dateEnd,
    			dealer, start, limit);
    }
    
    //详情查询服务
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryServer(@RequestParam("code") String code){
    	return serverAO.queryServer(code);
    }
}
