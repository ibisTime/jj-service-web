/**
 * @Title DemoController.java 
 * @Package com.ibis.pz.controller 
 * @Description 
 * @author miyb  
 * @date 2015-5-13 上午10:28:47 
 * @version V1.0   
 */
package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IBannerAO;
import com.xnjr.home.front.ao.ICompanyAO;
import com.xnjr.home.front.ao.IContentAO;
import com.xnjr.home.front.ao.IMenuAO;
import com.xnjr.home.front.ao.IPartnerAO;

/** 
 * @author: miyb 
 * @since: 2015-5-13 上午10:28:47 
 * @history:
 */
@Controller
@RequestMapping(value = "/company")
public class CompanyController {

    @Autowired
    ICompanyAO companyAO;

    @Autowired
    IPartnerAO partnerAO;

    @Autowired
    IMenuAO menuAO;

    @Autowired
    IContentAO contentAO;
    
    @Autowired
    IBannerAO bannerAO;
    
    //获取公司信息
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetCompany(
            @RequestParam("companyCode") String companyCode) {
        return companyAO.doGetCompany(companyCode);
    }
    //添加合作意向
    @RequestMapping(value = "/addPartner", method = RequestMethod.POST)
    @ResponseBody
    public Object addPartner(
            @RequestParam("fromCompany") String fromCompany,
            @RequestParam("fromPerson") String fromPerson,
            @RequestParam("fromContact") String fromContact,
            @RequestParam("content") String content,
            @RequestParam("companyCode") String companyCode) {
        return partnerAO.addPartner(fromCompany, fromPerson, fromContact, 
        	content, companyCode);
    }
    //列表获取菜单
    @RequestMapping(value = "/menu/list", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetMenuList(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "contentType", required = false) String contentType,
            @RequestParam("companyCode") String companyCode) {
        return menuAO.doGetMenuList(name, location, contentType,
        	companyCode);
    }
    //分页获取素材
    @RequestMapping(value = "/acontent/page", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetAContentPage(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam("menuCode") String menuCode) {
        return contentAO.doGetAContentPage(kind, title,
                menuCode, start, limit);
    }
    //列表获取素材
    @RequestMapping(value = "/acontent/list", method = RequestMethod.GET)
    @ResponseBody
    public Object doGetAContentList(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam("menuCode") String menuCode) {
        return contentAO.doGetAContentList(kind, title, menuCode);
    }
    //详情获取素材
    @RequestMapping(value = "/acontent", method = RequestMethod.GET)
    @ResponseBody
    Object doGetAContent(@RequestParam("code") String code){
    	return contentAO.doGetAContent(code);
    }
    //通过url找到company
    @RequestMapping(value = "/byUrl", method = RequestMethod.GET)
    @ResponseBody
    public Object getCompanyByUrl(
            @RequestParam("url") String url) {
        return companyAO.getCompanyByUrl(url);
    }
    //获取banner列表
    @RequestMapping(value = "/banner/list", method = RequestMethod.GET)
    @ResponseBody
    public Object getBannerList(
    		@RequestParam(value = "name", required = false) String name,
    		@RequestParam(value = "location", required = false) String location,
    		@RequestParam(value = "status", required = false) String status,
    		@RequestParam(value = "updater", required = false) String updater,
			@RequestParam("companyCode") String companyCode){
    	return bannerAO.getBannerList(name, location, status, updater, companyCode);
    }
}
