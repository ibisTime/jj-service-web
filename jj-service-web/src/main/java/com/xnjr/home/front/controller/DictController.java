package com.xnjr.home.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.home.front.ao.IDictAO;


@Controller
@RequestMapping(value = "/dict")
public class DictController {
    @Autowired
    IDictAO dictAO;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDictList(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "dkey", required = false) String dkey,
            @RequestParam(value = "parentKey", required = false) String parentKey) {
        return dictAO.queryDictList(type, parentKey, dkey);
    }
}
