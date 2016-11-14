package com.xnjr.home.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.home.front.ao.IServerAO;
import com.xnjr.home.front.http.BizConnecter;
import com.xnjr.home.front.http.JsonUtils;
import com.xnjr.home.front.req.XN612000Req;
import com.xnjr.home.front.req.XN612001Req;
import com.xnjr.home.front.req.XN612002Req;
import com.xnjr.home.front.req.XN612003Req;
import com.xnjr.home.front.req.XN612004Req;
import com.xnjr.home.front.req.XN612005Req;
import com.xnjr.home.front.req.XN612006Req;
import com.xnjr.home.front.req.XN612007Req;
import com.xnjr.home.front.req.XN612008Req;
import com.xnjr.home.front.req.XN612009Req;
import com.xnjr.home.front.req.XN612010Req;
import com.xnjr.home.front.req.XN612011Req;
import com.xnjr.home.front.req.XN612012Req;
import com.xnjr.home.front.req.XN612013Req;
import com.xnjr.home.front.req.XN612014Req;
import com.xnjr.home.front.req.XN612015Req;
import com.xnjr.home.front.req.XN612030Req;

@Service
public class ServerAOImpl implements IServerAO {

	@Override
	public Object addShootServer(String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode, String pyNum,
			String sysNum, String isDz, String scpslm, String works,
			String description, String publisher) {
		XN612000Req req = new XN612000Req();
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setIsDz(isDz);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setPyNum(pyNum);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setScpslm(scpslm);
		req.setSysNum(sysNum);
		req.setWorks(works);
		return BizConnecter.getBizData("612000", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editShootServer(String code, String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode, String pyNum,
			String sysNum, String isDz, String scpslm, String works,
			String description, String publisher) {
		XN612001Req req = new XN612001Req();
		req.setCode(code);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setIsDz(isDz);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setPyNum(pyNum);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setScpslm(scpslm);
		req.setSysNum(sysNum);
		req.setWorks(works);
		return BizConnecter.getBizData("612001", JsonUtils.object2Json(req),
				Object.class);
	}
	
	@Override
	public Object addTrainingServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String lectorNum, String mtrainTimes,
			String mtrainNum, String resume1, String resume2, String resume3,
			String course, String description, String publisher){
		XN612002Req req = new XN612002Req();
		req.setCompanyCode(companyCode);
		req.setCourse(course);
		req.setDescription(description);
		req.setLectorNum(lectorNum);
		req.setMtrainNum(mtrainNum);
		req.setMtrainTimes(mtrainTimes);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setResume1(resume1);
		req.setResume2(resume2);
		req.setResume3(resume3);
		return BizConnecter.getBizData("612002", JsonUtils.object2Json(req),
				Object.class);
	}
	
	@Override
	public Object editTrainingServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String lectorNum, String mtrainTimes,
			String mtrainNum, String resume1, String resume2, String resume3,
			String course, String description, String publisher){
		XN612003Req req = new XN612003Req();
		req.setCode(code);
		req.setCompanyCode(companyCode);
		req.setCourse(course);
		req.setDescription(description);
		req.setLectorNum(lectorNum);
		req.setMtrainNum(mtrainNum);
		req.setMtrainTimes(mtrainTimes);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setResume1(resume1);
		req.setResume2(resume2);
		req.setResume3(resume3);
		return BizConnecter.getBizData("612003", JsonUtils.object2Json(req),
				Object.class);
	}
	

	@Override
	public Object addOperatorsServer(String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode, String tgfw,
			String feeMode, String payCycle, String scyylm, String sucCase,
			String description, String publisher) {
		XN612004Req req = new XN612004Req();
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setFeeMode(feeMode);
		req.setName(name);
		req.setPayCycle(payCycle);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setScyylm(scyylm);
		req.setSucCase(sucCase);
		req.setTgfw(tgfw);
		return BizConnecter.getBizData("612004", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editOperatorsServer(String code, String name,
			String companyCode, String quoteMin, String quoteMax,
			String qualityCode, String tgfw, String feeMode, String payCycle,
			String scyylm, String sucCase, String description, String publisher) {
		XN612005Req req = new XN612005Req();
		req.setCode(code);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setFeeMode(feeMode);
		req.setName(name);
		req.setPayCycle(payCycle);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setScyylm(scyylm);
		req.setSucCase(sucCase);
		req.setTgfw(tgfw);
		return BizConnecter.getBizData("612005", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object addDesignerServer(String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode,
			String designNum, String sclm, String homeDays, String homePrice,
			String detailDays, String detailPrice, String bannerDays,
			String bannerPrice, String allDays, String allPrice, String works,
			String description, String publisher) {
		XN612006Req req = new XN612006Req();
		req.setAllDays(allDays);
		req.setAllPrice(allPrice);
		req.setBannerDays(bannerDays);
		req.setBannerPrice(bannerPrice);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setDesignNum(designNum);
		req.setDetailDays(detailDays);
		req.setDetailPrice(detailPrice);
		req.setHomeDays(homeDays);
		req.setHomePrice(homePrice);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setSclm(sclm);
		req.setWorks(works);
		return BizConnecter.getBizData("612006", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editDesignerServer(String code, String name,
			String companyCode, String quoteMin, String quoteMax,
			String qualityCode, String designNum, String sclm, String homeDays,
			String homePrice, String detailDays, String detailPrice,
			String bannerDays, String bannerPrice, String allDays,
			String allPrice, String works, String description, String publisher) {
		XN612007Req req = new XN612007Req();
		req.setCode(code);
		req.setAllDays(allDays);
		req.setAllPrice(allPrice);
		req.setBannerDays(bannerDays);
		req.setBannerPrice(bannerPrice);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setDesignNum(designNum);
		req.setDetailDays(detailDays);
		req.setDetailPrice(detailPrice);
		req.setHomeDays(homeDays);
		req.setHomePrice(homePrice);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setSclm(sclm);
		req.setWorks(works);
		return BizConnecter.getBizData("612007", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object addCustomerServer(String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode, String kfNum,
			String mtradeAmount, String business, String feeMode,
			String description, String publisher) {
		XN612008Req req = new XN612008Req();
		req.setBusiness(business);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setFeeMode(feeMode);
		req.setKfNum(kfNum);
		req.setMtradeAmount(mtradeAmount);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		return BizConnecter.getBizData("612008", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editCustomerServer(String code, String name,
			String companyCode, String quoteMin, String quoteMax,
			String qualityCode, String kfNum, String mtradeAmount,
			String business, String feeMode, String description,
			String publisher) {
		XN612009Req req = new XN612009Req();
		req.setCode(code);
		req.setBusiness(business);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setFeeMode(feeMode);
		req.setKfNum(kfNum);
		req.setMtradeAmount(mtradeAmount);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		return BizConnecter.getBizData("612009", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object addDepotServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String ckNum, String ckArea,
			String goodsKind, String dsendNum, String description, String publisher) {
		XN612010Req req = new XN612010Req();
		req.setCkArea(ckArea);
		req.setCkNum(ckNum);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setDsendNum(dsendNum);
		req.setGoodsKind(goodsKind);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		return BizConnecter.getBizData("612010", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editDepotServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String ckNum, String ckArea,
			String goodsKind, String dsendNum, String description, String publisher) {
		XN612011Req req = new XN612011Req();
		req.setCode(code);
		req.setCkArea(ckArea);
		req.setCkNum(ckNum);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setDsendNum(dsendNum);
		req.setGoodsKind(goodsKind);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		return BizConnecter.getBizData("612011", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object addSoftwareServer(String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode,
			String description, String publisher) {
		XN612012Req req = new XN612012Req();
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		return BizConnecter.getBizData("612012", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editSoftwareServer(String code, String name,
			String companyCode, String quoteMin, String quoteMax,
			String qualityCode, String description, String publisher) {
		XN612013Req req = new XN612013Req();
		req.setCode(code);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setName(name);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		return BizConnecter.getBizData("612013", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object addIndustrialServer(String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode,
			String bgArea, String availBgArea, String ccArea,
			String availCcArea, String zzfw, String introduce, String yhPolicy,
			String pic1, String pic2, String description, String publisher) {
		XN612014Req req = new XN612014Req();
		req.setAvailBgArea(availBgArea);
		req.setAvailCcArea(availCcArea);
		req.setBgArea(bgArea);
		req.setCcArea(ccArea);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setIntroduce(introduce);
		req.setName(name);
		req.setPic1(pic1);
		req.setPic2(pic2);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setYhPolicy(yhPolicy);
		req.setZzfw(zzfw);
		return BizConnecter.getBizData("612014", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object editIndustrialServer(String code, String name,
			String companyCode, String quoteMin, String quoteMax,
			String qualityCode, String bgArea, String availBgArea,
			String ccArea, String availCcArea, String zzfw, String introduce,
			String yhPolicy, String pic1, String pic2, String description,
			String publisher) {
		XN612015Req req = new XN612015Req();
		req.setCode(code);
		req.setAvailBgArea(availBgArea);
		req.setAvailCcArea(availCcArea);
		req.setBgArea(bgArea);
		req.setCcArea(ccArea);
		req.setCompanyCode(companyCode);
		req.setDescription(description);
		req.setIntroduce(introduce);
		req.setName(name);
		req.setPic1(pic1);
		req.setPic2(pic2);
		req.setPublisher(companyCode);
		req.setQualityCode(qualityCode);
		req.setQuoteMax(quoteMax);
		req.setQuoteMin(quoteMin);
		req.setYhPolicy(yhPolicy);
		req.setZzfw(zzfw);
		return BizConnecter.getBizData("612015", JsonUtils.object2Json(req),
				Object.class);
	}
	
	@Override
	public Object deleteServer(String code) {
		return BizConnecter.getBizData("612016", JsonUtils.string2Json("code", code),
				Object.class);
	}

	@Override
	public Object queryPageServers(String type, String name, String companyCode,
    		String companyName, String qualityCode, String isHot,
    		String pubisher, String province, String city, String area,
    		String status, String dateStart, String dateEnd, String dealer,
    		String start, String limit, String orderColumn, String orderDir) {
		XN612030Req req = new XN612030Req();
		req.setOrderColumn(orderColumn);
		req.setOrderDir(orderDir);
		req.setCompanyCode(companyCode);
		req.setCompanyName(companyName);
		req.setDateEnd(dateEnd);
		req.setDateStart(dateStart);
		req.setDealer(dealer);
		req.setIsHot(isHot);
		req.setLimit(limit);
		req.setName(name);
		req.setPubisher(pubisher);
		req.setQualityCode(qualityCode);
		req.setStart(start);
		req.setStatus(status);
		req.setType(type);
		req.setProvince(province);
		req.setCity(city);
		req.setArea(area);
		return BizConnecter.getBizData("612030", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object queryServer(String code) {
		return BizConnecter.getBizData("612031", JsonUtils.string2Json("code", code),
				Object.class);
	}

}
