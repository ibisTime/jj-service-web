package com.xnjr.home.front.json;

import java.io.IOException;

import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/**
 * 自定义json数据返回格式，增加 属性字段 success,data
 * <p> 系统版本: v1.0.0</p><br>
 * 作者:  xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间:14-3-27 下午3:48<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * <p/>
 * ========    =======  ============================================
 */

public class JsonConverter extends
        MappingJackson2HttpMessageConverter {

    @Override
    protected void writeInternal(Object object, HttpOutputMessage outputMessage)
            throws IOException, HttpMessageNotWritableException {
        JsonObject jsonObject = new JsonObject(object);
        super.writeInternal(jsonObject, outputMessage);
        // super.writeInternal(object, outputMessage);
    }
}
