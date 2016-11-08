package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IBannerAO;

@Controller
@RequestMapping(value = "/navigate")
public class NavigateController extends BaseController {
	@Autowired
	IBannerAO bannerAO;
	
	//获取banner列表
    @RequestMapping(value = "/banner/list", method = RequestMethod.GET)
    @ResponseBody
    public Object getBannerList(
    		@RequestParam("location") String location,
			@RequestParam(value = "companyCode", required = false) String companyCode,
			@RequestParam(value = "belong", required = false) String belong){
    	return bannerAO.getBannerList("0", location, belong);
    }
}
