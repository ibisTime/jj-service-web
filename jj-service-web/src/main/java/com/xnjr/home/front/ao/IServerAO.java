package com.xnjr.home.front.ao;

public interface IServerAO {

    Object queryPageServers(String name, String companyCode,
    		String companyName, String qualityCode, String isHot,
    		String pubisher, String dateStart, String dateEnd,
    		String dealer, String start, String limit);
    
    Object queryServer(String code);
}
