package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.INewsAO;

@Controller
@RequestMapping(value = "/news")
public class NewsController extends BaseController {

    @Autowired
    INewsAO newsAO;
    
    //分页查询广播
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageNews(
    		@RequestParam(value = "type", required = true) String type,
    		@RequestParam(value = "title", required = false) String title,
    		@RequestParam(value = "toCompany", required = false) String toCompany,
    		@RequestParam(value = "toLevel", required = false) String toLevel,
    		@RequestParam(value = "toUser", required = false) String toUser,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
			@RequestParam("start") String start,
			@RequestParam("limit") String limit){
    	return newsAO.queryPageNews(type, title, toCompany,
    			toLevel, toUser, companyCode, start, limit);
    }
    
    //详情查询广播
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryNews(@RequestParam("code") String code){
    	return newsAO.queryNews(code);
    }
}
