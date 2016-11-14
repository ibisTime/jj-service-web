package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IInterestAO;
import com.xnjr.home.front.session.SessionTimeoutException;
import com.xnjr.home.front.session.SessionUser;

@Controller
@RequestMapping(value = "/interest")
public class InterestController extends BaseController {
	
	@Autowired
	IInterestAO interestAO;
	
	//需求方对服务感兴趣，公司对需求感兴趣，公司对简历感兴趣
    @RequestMapping(value = "/interested", method = RequestMethod.POST)
    @ResponseBody
    public Object interested(
    		@RequestParam(value = "fromUser", required = false) String fromUser,
    		@RequestParam(value = "type", required = true) String type,
    		@RequestParam(value = "toCode", required = true) String toCode){
    	SessionUser user = this.getSessionUser();
    	String uId = "";
    	if(user != null){
    		uId = user.getUserId();
    		if(uId == null || uId == ""){
        		uId = user.getCompanyCode();
        	}
    	}
    	return interestAO.interested(uId, toCode, type);
    }
    
    //个人对公司职位感兴趣，投递简历
    @RequestMapping(value = "/apply/position", method = RequestMethod.POST)
    @ResponseBody
    public Object applyPosition(
    		@RequestParam(value = "resumeCode", required = true) String resumeCode,
    		@RequestParam(value = "positionCode", required = true) String positionCode){
    	return interestAO.applyPosition(this.getSessionUser().getUserId(),
    			resumeCode, positionCode);
    }
    
    //删除感兴趣服务
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object delete(
    		@RequestParam(value = "code", required = true) String code){
    	return interestAO.delete(code);
    }
    
    //处理对服务/需求/简历感兴趣的意向，以及申请职位的意向，状态更改为已完成(简单查看)
    @RequestMapping(value = "/handle", method = RequestMethod.POST)
    @ResponseBody
    public Object handle(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "dealNote", required = true) String dealNote,
    		@RequestParam(value = "dealer", required = false) String dealer){
    	return interestAO.handle(code, dealNote, this.getSessionUser().getCompanyCode());
    }
    
    //分页查询感兴趣服务(或被感兴趣)
    @RequestMapping(value = "/page/server", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageInterestServer(
    		@RequestParam(value = "fromUser", required = false) String fromUser,
    		@RequestParam(value = "toCode", required = false) String toCode,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	SessionUser user = this.getSessionUser();
    	if(user != null){
	    	//需求方
	    	if(user.getKind().equals("f1")){
	    		fromUser = user.getUserId();
	    	//服务方(查询被感兴趣服务)
	    	}else if(user.getKind().equals("comp")){
	    		companyCode = user.getCompanyCode();
	    	}
    	}else{
    		throw new SessionTimeoutException("登录链接已超时，请重新登录.");
    	}
    	return interestAO.queryPageInterestServer(fromUser,
    			toCode, companyCode, start, limit);
    }
    
    //分页查询感兴趣需求
    @RequestMapping(value = "/page/demand", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageInterestDemand(
    		@RequestParam(value = "publisher", required = false) String publisher,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	SessionUser user = this.getSessionUser();
    	if(user != null){
	    	//需求方
	    	if(user.getKind().equals("f1")){
	    		publisher = user.getUserId();
	    	//服务方(查询被感兴趣服务)
	    	}else if(user.getKind().equals("comp")){
	    		companyCode = user.getCompanyCode();
	    	}
    	}else{
    		throw new SessionTimeoutException("登录链接已超时，请重新登录.");
    	}
    	return interestAO.queryPageInterestDemand(this.getSessionUser().getCompanyCode(),
    			publisher, start, limit);
    }
    
    //分页查询感兴趣简历
    @RequestMapping(value = "/page/resume", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageInterestResume(
    		@RequestParam(value = "publisher", required = false) String publisher,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	SessionUser user = this.getSessionUser();
    	if(user != null){
	    	//需求方
	    	if(user.getKind().equals("f1")){
	    		publisher = user.getUserId();
	    	//服务方
	    	}else if(user.getKind().equals("comp")){
	    		companyCode = user.getCompanyCode();
	    	}
    	}else{
    		throw new SessionTimeoutException("登录链接已超时，请重新登录.");
    	}
    	return interestAO.queryPageInterestResume(companyCode, publisher, start, limit);
    }
    
    //分页查询申请职位或者应聘简历信息
    @RequestMapping(value = "/page/position", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageInterestPosition(
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "fromUser", required = false) String fromUser,
    		@RequestParam(value = "start", required = true) String start,
    		@RequestParam(value = "limit", required = true) String limit){
    	SessionUser user = this.getSessionUser();
    	if(user != null){
    		//需求方
        	if(user.getKind().equals("f1")){
        		fromUser = user.getUserId();
        	//服务方
        	}else if(user.getKind().equals("comp")){
        		companyCode = user.getCompanyCode();
        	}
    	}else{
    		throw new SessionTimeoutException("登录链接已超时，请重新登录.");
    	}
    	return interestAO.queryPageInterestPosition(companyCode,
    			fromUser, start, limit);
    }
    
}
