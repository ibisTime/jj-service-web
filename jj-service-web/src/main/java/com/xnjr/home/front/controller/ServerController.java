package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IServerAO;

@Controller
@RequestMapping(value = "/server")
public class ServerController extends BaseController {

    @Autowired
    IServerAO serverAO;
    
    //新增摄影/拍摄服务
    @RequestMapping(value = "/shoot/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addShootServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "pyNum", required = true) String pyNum,
    		@RequestParam(value = "sysNum", required = true) String sysNum,
    		@RequestParam(value = "isDz", required = true) String isDz,
    		@RequestParam(value = "scpslm", required = true) String scpslm,
    		@RequestParam(value = "works", required = true) String works,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addShootServer(name, this.getSessionUser().getCompanyCode(), quoteMin,
    			quoteMax, qualityCode, pyNum, sysNum, isDz, scpslm,
    			works, description, publisher);
    }
    
    //修改摄影/拍摄服务
    @RequestMapping(value = "/shoot/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editShootServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "pyNum", required = true) String pyNum,
    		@RequestParam(value = "sysNum", required = true) String sysNum,
    		@RequestParam(value = "isDz", required = true) String isDz,
    		@RequestParam(value = "scpslm", required = true) String scpslm,
    		@RequestParam(value = "works", required = true) String works,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editShootServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin,
    			quoteMax, qualityCode, pyNum, sysNum, isDz, scpslm, works,
    			description, publisher);
    }
    
    //新增培训
    @RequestMapping(value = "/training/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addTrainingServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "lectorNum", required = true) String lectorNum,
    		@RequestParam(value = "mtrainTimes", required = true) String mtrainTimes,
    		@RequestParam(value = "mtrainNum", required = true) String mtrainNum,
    		@RequestParam(value = "resume1", required = true) String resume1,
    		@RequestParam(value = "resume2", required = true) String resume2,
    		@RequestParam(value = "resume3", required = true) String resume3,
    		@RequestParam(value = "course", required = true) String course,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addTrainingServer(name, this.getSessionUser().getCompanyCode(),
    			quoteMin, quoteMax, qualityCode, lectorNum, mtrainTimes, mtrainNum,
    			resume1, resume2, resume3, course, description, publisher);
    }
    
    //修改培训
    @RequestMapping(value = "/training/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editTrainingServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "lectorNum", required = true) String lectorNum,
    		@RequestParam(value = "mtrainTimes", required = true) String mtrainTimes,
    		@RequestParam(value = "mtrainNum", required = true) String mtrainNum,
    		@RequestParam(value = "resume1", required = true) String resume1,
    		@RequestParam(value = "resume2", required = true) String resume2,
    		@RequestParam(value = "resume3", required = true) String resume3,
    		@RequestParam(value = "course", required = true) String course,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editTrainingServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, lectorNum, mtrainTimes, mtrainNum, resume1, resume2,
    			resume3, course, description, publisher);
    }
    
    
    //新增店铺代运营
    @RequestMapping(value = "/operators/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addOperatorsServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "tgfw", required = true) String tgfw,
    		@RequestParam(value = "feeMode", required = true) String feeMode,
    		@RequestParam(value = "payCycle", required = true) String payCycle,
    		@RequestParam(value = "scyylm", required = true) String scyylm,
    		@RequestParam(value = "sucCase", required = true) String sucCase,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addOperatorsServer(name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, tgfw, feeMode, payCycle, scyylm,
    			sucCase, description, publisher);
    }
    
    //修改店铺代运营
    @RequestMapping(value = "/operators/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editOperatorsServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "tgfw", required = true) String tgfw,
    		@RequestParam(value = "feeMode", required = true) String feeMode,
    		@RequestParam(value = "payCycle", required = true) String payCycle,
    		@RequestParam(value = "scyylm", required = true) String scyylm,
    		@RequestParam(value = "sucCase", required = true) String sucCase,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editOperatorsServer(code, name, this.getSessionUser().getCompanyCode(),
    			quoteMin, quoteMax, qualityCode, tgfw, feeMode, payCycle,
    			scyylm, sucCase, description, publisher);
    }
    
    //新增美工外包
    @RequestMapping(value = "/designer/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addDesignerServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "designNum", required = true) String designNum,
    		@RequestParam(value = "sclm", required = true) String sclm,
    		@RequestParam(value = "homeDays", required = true) String homeDays,
    		@RequestParam(value = "homePrice", required = true) String homePrice,
    		@RequestParam(value = "detailDays", required = true) String detailDays,
    		@RequestParam(value = "detailPrice", required = true) String detailPrice,
    		@RequestParam(value = "bannerDays", required = true) String bannerDays,
    		@RequestParam(value = "bannerPrice", required = true) String bannerPrice,
    		@RequestParam(value = "allDays", required = true) String allDays,
    		@RequestParam(value = "allPrice", required = true) String allPrice,
    		@RequestParam(value = "works", required = true) String works,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addDesignerServer(name, this.getSessionUser().getCompanyCode(),
    			quoteMin, quoteMax, qualityCode, designNum, sclm, homeDays, homePrice, detailDays,
    			detailPrice, bannerDays, bannerPrice, allDays, allPrice, works,
    			description, publisher);
    }
    
    //修改美工外包
    @RequestMapping(value = "/designer/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editDesignerServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "designNum", required = true) String designNum,
    		@RequestParam(value = "sclm", required = true) String sclm,
    		@RequestParam(value = "homeDays", required = true) String homeDays,
    		@RequestParam(value = "homePrice", required = true) String homePrice,
    		@RequestParam(value = "detailDays", required = true) String detailDays,
    		@RequestParam(value = "detailPrice", required = true) String detailPrice,
    		@RequestParam(value = "bannerDays", required = true) String bannerDays,
    		@RequestParam(value = "bannerPrice", required = true) String bannerPrice,
    		@RequestParam(value = "allDays", required = true) String allDays,
    		@RequestParam(value = "allPrice", required = true) String allPrice,
    		@RequestParam(value = "works", required = true) String works,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editDesignerServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, designNum, sclm, homeDays, homePrice, detailDays,
    			detailPrice, bannerDays, bannerPrice, allDays, allPrice, works,
    			description, publisher);
    }
    
    //新增客服外包
    @RequestMapping(value = "/customer/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addCustomerServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "kfNum", required = true) String kfNum,
    		@RequestParam(value = "mtradeAmount", required = true) String mtradeAmount,
    		@RequestParam(value = "business", required = true) String business,
    		@RequestParam(value = "feeMode", required = true) String feeMode,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addCustomerServer(name, this.getSessionUser().getCompanyCode(), quoteMin,
    			quoteMax, qualityCode, kfNum, mtradeAmount, business,
    			feeMode, description, publisher);
    }
    
    //修改客服外包
    @RequestMapping(value = "/customer/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editCustomerServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "kfNum", required = true) String kfNum,
    		@RequestParam(value = "mtradeAmount", required = true) String mtradeAmount,
    		@RequestParam(value = "business", required = true) String business,
    		@RequestParam(value = "feeMode", required = true) String feeMode,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editCustomerServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin,
    			quoteMax, qualityCode, kfNum, mtradeAmount, business,
    			feeMode, description, publisher);
    }
    
    //新增仓配服务
    @RequestMapping(value = "/depot/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addDepotServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "ckNum", required = true) String ckNum,
    		@RequestParam(value = "ckArea", required = true) String ckArea,
    		@RequestParam(value = "goodsKind", required = true) String goodsKind,
    		@RequestParam(value = "dsendNum", required = true) String dsendNum,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addDepotServer(name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, ckNum, ckArea, goodsKind, dsendNum,
    			description, publisher);
    }
    
    //修改仓配服务
    @RequestMapping(value = "/depot/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editDepotServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "ckNum", required = true) String ckNum,
    		@RequestParam(value = "ckArea", required = true) String ckArea,
    		@RequestParam(value = "goodsKind", required = true) String goodsKind,
    		@RequestParam(value = "dsendNum", required = true) String dsendNum,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editDepotServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, ckNum, ckArea, goodsKind, dsendNum,
    			description, publisher);
    }
    
    //新增软件外包
    @RequestMapping(value = "/software/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addSoftwareServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addSoftwareServer(name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, description, publisher);
    }
    
    //修改软件外包
    @RequestMapping(value = "/software/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object addSoftwareServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editSoftwareServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin, quoteMax,
    			qualityCode, description, publisher);
    }
    
    //新增产业园
    @RequestMapping(value = "/industrial/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addIndustrialServer(
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = true) String qualityCode,
    		@RequestParam(value = "bgArea", required = true) String bgArea,
    		@RequestParam(value = "availBgArea", required = true) String availBgArea,
    		@RequestParam(value = "ccArea", required = true) String ccArea,
    		@RequestParam(value = "availCcArea", required = true) String availCcArea,
    		@RequestParam(value = "zzfw", required = false) String zzfw,
    		@RequestParam(value = "introduce", required = true) String introduce,
    		@RequestParam(value = "yhPolicy", required = true) String yhPolicy,
    		@RequestParam(value = "pic1", required = true) String pic1,
    		@RequestParam(value = "pic2", required = true) String pic2,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.addIndustrialServer(name, this.getSessionUser().getCompanyCode(), quoteMin,
    			quoteMax, qualityCode, bgArea, availBgArea, ccArea,
    			availCcArea, zzfw, introduce, yhPolicy, pic1, pic2,
    			description, publisher);
    }
    
    //修改产业园
    @RequestMapping(value = "/industrial/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editIndustrialServer(
    		@RequestParam(value = "code", required = true) String code,
    		@RequestParam(value = "name", required = true) String name,
    		@RequestParam(value = "quoteMin", required = true) String quoteMin,
    		@RequestParam(value = "quoteMax", required = true) String quoteMax,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "bgArea", required = true) String bgArea,
    		@RequestParam(value = "availBgArea", required = true) String availBgArea,
    		@RequestParam(value = "ccArea", required = true) String ccArea,
    		@RequestParam(value = "availCcArea", required = true) String availCcArea,
    		@RequestParam(value = "zzfw", required = false) String zzfw,
    		@RequestParam(value = "introduce", required = true) String introduce,
    		@RequestParam(value = "yhPolicy", required = true) String yhPolicy,
    		@RequestParam(value = "pic1", required = true) String pic1,
    		@RequestParam(value = "pic2", required = true) String pic2,
    		@RequestParam(value = "description", required = true) String description,
    		@RequestParam(value = "publisher", required = false) String publisher){
    	return serverAO.editIndustrialServer(code, name, this.getSessionUser().getCompanyCode(), quoteMin,
    			quoteMax, qualityCode, bgArea, availBgArea, ccArea,
    			availCcArea, zzfw, introduce, yhPolicy, pic1, pic2,
    			description, publisher);
    }
    
    //删除服务
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteServer(@RequestParam("code") String code){
    	return serverAO.deleteServer(code);
    }
    
    //分页查询服务
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageServers(
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "companyCode", required = false) String companyCode,
    		@RequestParam(value = "companyName", required = false) String companyName,
    		@RequestParam(value = "qualityCode", required = false) String qualityCode,
    		@RequestParam(value = "isHot", required = false) String isHot,
    		@RequestParam(value = "pubisher", required = false) String pubisher,
    		@RequestParam(value = "province", required = false) String province,
    		@RequestParam(value = "city", required = false) String city,
    		@RequestParam(value = "area", required = false) String area,
    		@RequestParam(value = "dateStart", required = false) String dateStart,
    		@RequestParam(value = "dateEnd", required = false) String dateEnd,
    		@RequestParam(value = "dealer", required = false) String dealer,
    		@RequestParam(value = "orderColumn", required = false) String orderColumn,
    		@RequestParam(value = "orderDir", required = false) String orderDir,
    		@RequestParam(value = "status", required = false) String status,
			@RequestParam("start") String start,
			@RequestParam("limit") String limit){
    	return serverAO.queryPageServers(type, name, companyCode, companyName,
    			qualityCode, isHot, pubisher, province, city, area, status,
    			dateStart, dateEnd, dealer, start, limit, orderColumn, orderDir);
    }
    
    //详情查询服务
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryServer(@RequestParam("code") String code){
    	return serverAO.queryServer(code);
    }
}
