package com.xnjr.home.front.ao;

public interface IServerAO {
	
	/**
	 * 新增摄影/拍摄服务
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param pyNum
	 * @param sysNum
	 * @param isDz
	 * @param scpslm
	 * @param works
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addShootServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String pyNum, String sysNum,
			String isDz, String scpslm, String works, String description,
			String publisher);
	
	/**
	 * 修改摄影/拍摄服务
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param pyNum
	 * @param sysNum
	 * @param isDz
	 * @param scpslm
	 * @param works
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editShootServer(String code, String name, String companyCode,
			String quoteMin, String quoteMax, String qualityCode, 
			String pyNum, String sysNum, String isDz, String scpslm,
			String works, String description, String publisher);
	
	/**
	 * 新增培训
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param lectorNum
	 * @param mtrainTimes
	 * @param mtrainNum
	 * @param resume1
	 * @param resume2
	 * @param resume3
	 * @param course
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addTrainingServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String lectorNum, String mtrainTimes,
			String mtrainNum, String resume1, String resume2, String resume3,
			String course, String description, String publisher);
	
	/**
	 * 修改培训
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param lectorNum
	 * @param mtrainTimes
	 * @param mtrainNum
	 * @param resume1
	 * @param resume2
	 * @param resume3
	 * @param course
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editTrainingServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String lectorNum, String mtrainTimes,
			String mtrainNum, String resume1, String resume2, String resume3,
			String course, String description, String publisher);
	
	/**
	 * 新增店铺代运营
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param tgfw
	 * @param feeMode
	 * @param payCycle
	 * @param scyylm
	 * @param sucCase
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addOperatorsServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String tgfw, String feeMode,
			String payCycle, String scyylm, String sucCase, String description,
			String publisher);
	
	/**
	 * 修改店铺代运营
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param tgfw
	 * @param feeMode
	 * @param payCycle
	 * @param scyylm
	 * @param sucCase
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editOperatorsServer(String code, String name, String companyCode, 
			String quoteMin, String quoteMax, String qualityCode, String tgfw,
			String feeMode, String payCycle, String scyylm, String sucCase,
			String description, String publisher);
	
	/**
	 * 新增美工外包
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param designNum
	 * @param sclm
	 * @param homeDays
	 * @param homePrice
	 * @param detailDays
	 * @param detailPrice
	 * @param bannerDays
	 * @param bannerPrice
	 * @param allDays
	 * @param allPrice
	 * @param works
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addDesignerServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String designNum, String sclm,
			String homeDays, String homePrice, String detailDays, String detailPrice,
			String bannerDays, String bannerPrice, String allDays, String allPrice,
			String works, String description, String publisher);
	
	/**
	 * 修改美工外包
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param designNum
	 * @param sclm
	 * @param homeDays
	 * @param homePrice
	 * @param detailDays
	 * @param detailPrice
	 * @param bannerDays
	 * @param bannerPrice
	 * @param allDays
	 * @param allPrice
	 * @param works
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editDesignerServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String designNum, String sclm,
			String homeDays, String homePrice, String detailDays, String detailPrice,
			String bannerDays, String bannerPrice, String allDays, String allPrice,
			String works, String description, String publisher);
	
	/**
	 * 新增客服外包
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param kfNum
	 * @param mtradeAmount
	 * @param business
	 * @param feeMode
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addCustomerServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String kfNum, String mtradeAmount,
			String business, String feeMode, String description, String publisher);
	
	/**
	 * 修改客服外包
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param kfNum
	 * @param mtradeAmount
	 * @param business
	 * @param feeMode
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editCustomerServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String kfNum, String mtradeAmount,
			String business, String feeMode, String description, String publisher);
	
	/**
	 * 新增仓配服务
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param ckNum
	 * @param ckArea
	 * @param goodsKind
	 * @param dsendNum
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addDepotServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String ckNum, String ckArea,
			String goodsKind, String dsendNum, String description, String publisher);
	
	/**
	 * 修改仓配服务
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param ckNum
	 * @param ckArea
	 * @param goodsKind
	 * @param dsendNum
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editDepotServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String ckNum, String ckArea,
			String goodsKind, String dsendNum, String description, String publisher);
	
	/**
	 * 新增软件外包
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addSoftwareServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String description, String publisher);
	
	/**
	 * 修改软件外包
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editSoftwareServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String description, String publisher);
	
	/**
	 * 新增产业园
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param bgArea
	 * @param availBgArea
	 * @param ccArea
	 * @param availCcArea
	 * @param zzfw
	 * @param introduce
	 * @param yhPolicy
	 * @param pic1
	 * @param pic2
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object addIndustrialServer(String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String bgArea, String availBgArea,
			String ccArea, String availCcArea, String zzfw, String introduce,
			String yhPolicy, String pic1, String pic2, String description, String publisher);
	
	/**
	 * 修改产业园服务
	 * @param code
	 * @param name
	 * @param companyCode
	 * @param quoteMin
	 * @param quoteMax
	 * @param qualityCode
	 * @param bgArea
	 * @param availBgArea
	 * @param ccArea
	 * @param availCcArea
	 * @param zzfw
	 * @param introduce
	 * @param yhPolicy
	 * @param pic1
	 * @param pic2
	 * @param description
	 * @param publisher
	 * @return
	 */
	Object editIndustrialServer(String code, String name, String companyCode, String quoteMin, 
			String quoteMax, String qualityCode, String bgArea, String availBgArea,
			String ccArea, String availCcArea, String zzfw, String introduce,
			String yhPolicy, String pic1, String pic2, String description, String publisher);
	
	/**
	 * 删除服务
	 * @param code
	 * @return
	 */
	Object deleteServer(String code);
	
	/**
	 * 分页查询服务 
	 * @param type
	 * @param name
	 * @param companyCode
	 * @param companyName
	 * @param qualityCode
	 * @param isHot
	 * @param pubisher
	 * @param province
	 * @param city
	 * @param area
	 * @param dateStart
	 * @param dateEnd
	 * @param dealer
	 * @param start
	 * @param limit
	 * @return
	 */
    Object queryPageServers(String type, String name, String companyCode,
    		String companyName, String qualityCode, String isHot,
    		String pubisher, String province, String city, String area,
    		String dateStart, String dateEnd, String dealer, String start, String limit);
    
    /**
     * 详情查询服务
     * @param code
     * @return
     */
    Object queryServer(String code);
}
