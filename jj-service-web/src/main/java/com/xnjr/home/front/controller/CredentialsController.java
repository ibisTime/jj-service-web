package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.ICredentialsAO;
import com.xnjr.home.front.controller.BaseController;

@Controller
@RequestMapping(value = "/credentials")
public class CredentialsController extends BaseController {

    @Autowired
    ICredentialsAO credetialsAO;
    
    //申请资质
    @RequestMapping(value = "/apply", method = RequestMethod.POST)
    @ResponseBody
    public Object applyCredentials(
    		@RequestParam(value = "certificateCode", required = true) String certificateCode,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "applyUser", required = false) String applyUser){
    	return credetialsAO.applyCredentials(certificateCode,
    			this.getSessionUser().getCompanyCode());
    }
    
    //分页查询资质
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageCredentials(
    		@RequestParam(value = "certificateCode", required = false) String certificateCode,
    		@RequestParam(value = "status", required = false) String status,
    		@RequestParam(value = "applyUser", required = false) String applyUser,
    		@RequestParam(value = "approveUser", required = false) String approveUser,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	return credetialsAO.queryPageCredentials(certificateCode,
    			this.getSessionUser().getCompanyCode(),
    			status, approveUser, start, limit);
    }
    
    //列表查询资质
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryListCredentials(
    		@RequestParam(value = "certificateCode", required = false) String certificateCode,
    		@RequestParam(value = "status", required = false) String status,
    		@RequestParam(value = "applyUser", required = false) String applyUser,
    		@RequestParam(value = "approveUser", required = false) String approveUser){
    	return credetialsAO.queryListCredentials(certificateCode,
    			this.getSessionUser().getCompanyCode(),
    			status, applyUser, approveUser);
    }
    
    //详情查询资质
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCredentials(
    		@RequestParam(value = "code", required = true) String code){
    	return credetialsAO.queryCredentials(code);
    }
}
