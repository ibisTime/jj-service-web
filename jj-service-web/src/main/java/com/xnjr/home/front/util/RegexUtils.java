/**
 * @Title RegularExpUtils.java 
 * @Package com.ibis.pz.util 
 * @Description 
 * @author miyb  
 * @date 2015-5-13 上午10:47:43 
 * @version V1.0   
 */
package com.xnjr.home.front.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** 
 * @author: miyb 
 * @since: 2015-5-13 上午10:47:43 
 * @history:
 */
public class RegexUtils {
    public static String find(String baseStr, String rex, int group) {
        String targetStr = null;
        Pattern pattern = Pattern.compile(rex);
        Matcher matcher = pattern.matcher(baseStr);
        if (matcher.find()) {
            targetStr = matcher.group(group);
        }
        return targetStr;
    }

    public static void main(String[] args) {
        String baseStr = "{\"errorCode\":\"0\",\"errorInfo\":\"成功\",\"data\":{\"isExist\":false}}";
        System.out.println(baseStr);
        System.out.println(RegexUtils.find(baseStr, "data\":(.*)\\}", 1));
    }
}
