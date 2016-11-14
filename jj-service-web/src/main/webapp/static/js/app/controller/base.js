define([
    'app/util/common',
    'app/util/ajax',
    'app/util/dialog'
], function (common, Ajax, dialog) {

    //FastClick.attach(document.body);

    // element disabled
    $.fn.disable = function () {
        this.addClass('disabled');
        this[0].disabled = true;
    };

    $.fn.enable = function () {
        this.removeClass('disabled');
        this[0].disabled = false;
    };

    $.fn.tap = function (callback) {
        this.addClass('btn_press');
        this.on('click', function () {
            callback(this);
        });
    };

    // setData
    $.fn.setData = function(data) {
        var data = data || {};
        for (var k in data) {
            $('[data-name='+k+']', this).html(data[k]);
        }
    };

    if (Number.prototype.toFixed) {
        var ori_toFixed = Number.prototype.toFixed;
        Number.prototype.toFixed = function () {
            var num = ori_toFixed.apply(this, arguments);
            if (num == 0 && num.indexOf('-') == 0) { // -0 and 0
                num = num.slice(1);
            }
            return num;
        }
    }

    String.prototype.temp = function (obj) {
        return this.replace(/\$\w+\$/gi, function (matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return (returns + "") == "undefined" ? "" : returns;
        });
    };

    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    $.prototype.serializeObject = function () {
        var a, o, h, i, e;
        a = this.serializeArray();
        o = {};
        h = o.hasOwnProperty;
        for (i = 0; i < a.length; i++) {
            e = a[i];
            if (!h.call(o, e.name)) {
                o[e.name] = e.value;
            }
        }
        return o;
    };
    var Base = {
        staticUrl: requirejs.staticUrl,
        back: window.history.back,
        loadAllTpl: '<div class="all-bar tc bg_fff ptb4"><span class="sr-only">已加载全部</span></div>',
        loadingTpl: '<div class="loading-bar tc"><i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i><span class="sr-only">努力加载中...</span></div>',
        loadEmptyTpl: '<div class="flex flex-c flex-dv t_bd hp100"><i class="s_50 fa fa-calendar-o" aria-hidden="true"></i><span class="mt10">暂无相关数据</span></div>',
        loading100Tpl: '<div class="flex flex-c flex-dv hp100 loading-bar"><img src="'+requirejs.staticUrl+'/images/pull.gif"/><span class="sr-only">努力加载中...</span></div>',
        // simple encrypt information with ***
        encodeInfo: function (info, headCount, tailCount, space) {
            headCount = headCount || 0;
            tailCount = tailCount || 0;
            info = info.trim();
            var header = info.slice(0, headCount),
                len = info.length,
                tailer = info.slice(len - tailCount),
                mask = '**************************************************', // allow this length
                maskLen = len - headCount - tailCount;
            if (space) {
                mask = '**** **** **** **** **** **** **** **** **** **** **** ****';
            }
            return maskLen > 0 ? (header + mask.substring(0, maskLen + (space? maskLen / 4 : 0)) + (space? ' ' : '') + tailer) : info;
        },
        getUrlParam : function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return '';
        },
        findObj: function(array, key, value, key2, value2) {
            var i = 0, len = array.length,
                res;
            for (i; i < len; i++) {
                if (array[i][key] == value && !key2) {
                    return array[i];
                } else if (key2 && array[i][key] == value && array[i][key2] == value2) {
                    return array[i];
                }
            }
        },
        fmoney: function (s, n) {
            if (typeof s == 'undefined') {
                return '0.00';
            }
            n = n > 0 && n <= 20 ? n : 0;
            s = +((s / 1000).toFixed(n));
            var unit = '';
            if (('' + s).split('.')[0].length >= 5) {
                s = +((s / 10000).toFixed(n));
                unit = '万';
            }

            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1] || '';
            t = "";
            for(i = 0; i < l.length; i ++ )
            {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + (n == 0 ? "" : ("." + r)) + unit;
        },
        specialCode: /^[\s0-9a-zA-Z\u4e00-\u9fa5\u00d7\u300a\u2014\u2018\u2019\u201c\u201d\u2026\u3001\u3002\u300b\u300e\u300f\u3010\u3011\uff01\uff08\uff09\uff0c\uff1a\uff1b\uff1f\uff0d\uff03\uffe5\x21-\x7e]*$/,
        showMsg: function (msg, time){
            var d = dialog({
                content: msg,
                quickClose: true
            });
            d.show();
            setTimeout(function () {
                d.close().remove();
            }, time || 1500);
        },
        maskMobile: function(mobile){
            return mobile.replace(/^(\d{3})\d{4}(\d{4})$/ig, "$1****$2");
        },
        makeReturnUrl: function(){
            return encodeURIComponent(location.pathname + location.search);
        },
        getReturnParam: function(){
            var re = Base.getUrlParam("return");
            if(re){
                return encodeURIComponent(re);
            }
            return "";
        },
        goBackUrl: function(url){
            var rUrl = Base.getUrlParam("return");
            if(rUrl){
                location.href = rUrl;
            }else{
                location.href = url || "../home/index.html";
            }
        },
        //上传图片
        uploadImg: function(photo){
            return Ajax.post(APIURL + "/upload/img",{photo: photo});
        },
        //获取地址json
        getAddress: function(){
            var addr = localStorage.getItem("addr");
            if(addr){
                var defer = jQuery.Deferred();
                addr = $.parseJSON(addr);
                if(!addr.citylist){
                    addr = $.parseJSON(addr);
                }
                defer.resolve(addr);
                return defer.promise();
            }else{
                return Ajax.get("/static/js/lib/city.min.json")
                    .then(function(res){
                        if(res.citylist){
                            localStorage.setItem("addr", JSON.stringify(res));
                            return res;
                        }
                        localStorage.setItem("addr", JSON.stringify(res));
                        return $.parseJSON(res);
                    });
            }
        },
        //是否登录
        isLogin: function(){
            return sessionStorage.getItem("login") || false;
        },
        //是否服务方
        isCompUser: function(){
            if(Base.isLogin()){
                var type = sessionStorage.getItem("type");
                if(type == "2"){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        //是否是服务方个体户
        isCompOne: function(){
            if(Base.isCompUser()){
                var user = $.parseJSON(sessionStorage.getItem("user"));
                if(user.type == "2"){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        //是否是服务方企业
        isCompMore: function(){
            if(Base.isCompUser()){
                var user = $.parseJSON(sessionStorage.getItem("user"));
                if(user.type == "1"){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        //是否需求方
        isPerson: function(){
            if(Base.isLogin()){
                var type = sessionStorage.getItem("type");
                if(type == 1){
                    return true;
                }else{
                    return false;
                }
            }else{
                return true;    //未登录用户默认显示需求方页面
            }
        },
        //获取需求方id
        getPersonUserId: function(){
            if(Base.isLogin()){
                return Base.getSessionUser().userId;
            }else{
                return "";
            }
        },
        //获取服务方id
        getCompanyCode: function(){
            if(Base.isLogin()){
                return Base.getSessionUser().code;
            }else{
                return "";
            }
        },
        //设置sessionStorage的user
        setSessionUser: function(user){
            sessionStorage.setItem("user", JSON.stringify(user));
        },
        //获取sessionStorage中的user
        getSessionUser: function(){
            if(Base.isLogin()){
                return $.parseJSON(sessionStorage.getItem("user"));
            }else{
                return null;
            }
        },
        //清除sessionStorage中和用户相关的数据
        clearSessionUser: function(){
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("login");
            sessionStorage.removeItem("type");
        },
        //登出
        logout: function(){
            return Ajax.post(APIURL + "/user/logout")
                .then(function(res){
                    Base.clearSessionUser();
                    return res;
                }, function(res){
                    Base.clearSessionUser();
                });
        },
        //需求方登录
        personLogin: function(config){
            return Ajax.post(APIURL + "/user/login/person", config)
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("login", true);
                        sessionStorage.setItem("type", 1);
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res;
                });
        },
        //服务方登录
        companyLogin:function(config){
            return Ajax.post(APIURL + "/user/login/comp", config)
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("login", true);
                        sessionStorage.setItem("type", 2);
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res;
                });
        },
        //服务方注册
        companyRegister: function(config){
            return Ajax.post(APIURL + "/user/regist/comp", config)
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("login", true);
                        sessionStorage.setItem("type", 2);
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res;
                });
        },
        //需求方注册
        personRegister: function(config){
            return Ajax.post(APIURL + "/user/regist/person", config)
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("login", true);
                        sessionStorage.setItem("type", 1);
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res;
                });
        },
        //需求方找回密码
        personFindPwd: function(config){
            return Ajax.post(APIURL + "/user/loginpwd/find", config);
        },
        //服务方找回密码
        compFindPwd: function(config){
            return Ajax.post(APIURL + "/user/loginpwd/comp/find", config);
        },
        //需求方修改密码
        personResetPwd: function(config){
            return Ajax.post(APIURL + "/user/loginpwd/reset", config);
        },
        //服务方修改密码
        compResetPwd: function(config){
            return Ajax.post(APIURL + "/user/loginpwd/comp/reset", config)
        },
        //服务方修改信息
        editCompInfo: function(config){
            return Ajax.post(APIURL + "/user/comp/edit", config);
        },
        //需求方修改手机号
        changeMoblie: function(config){
            return Ajax.post(APIURL + "/user/mobile/change", config);
        },
        //分页查询服务
        getPageServers: function(config, flag){
            return Ajax.get(APIURL + "/server/page", config, flag || false);
        },
        //详情查询服务
        getServerInfo: function(config){
            return Ajax.get(APIURL + "/server/info", config);
        },
        //删除服务
        deleteServer: function(config){
            return Ajax.post(APIURL + "/server/delete", config);
        },
        //新增软件外包
        addRjwbInfo: function(config){
            return Ajax.post(APIURL + "/server/software/add", config);
        },
        //修改软件外包
        editRjwbInfo: function(config){
            return Ajax.post(APIURL + "/server/software/edit", config);
        },
        //新增摄影/拍摄服务
        addSypsInfo: function(config){
            return Ajax.post(APIURL + "/server/shoot/add", config);
        },
        //修改摄影/拍摄服务
        editSypsInfo: function(config){
            return Ajax.post(APIURL + "/server/shoot/edit", config);
        },
        //新增培训
        addPxInfo: function(config){
            return Ajax.post(APIURL + "/server/training/add", config);
        },
        //修改培训
        editPxInfo: function(config){
            return Ajax.post(APIURL + "/server/training/edit", config);
        },
        //新增店铺代运营
        addDpdyyInfo: function(config){
            return Ajax.post(APIURL + "/server/operators/add", config);
        },
        //修改店铺代运营
        editDpdyyInfo: function(config){
            return Ajax.post(APIURL + "/server/operators/edit", config);
        },
        //新增美工外包
        addMgwbInfo: function(config){
            return Ajax.post(APIURL + "/server/designer/add", config);
        },
        //修改美工外包
        editMgwbInfo: function(config){
            return Ajax.post(APIURL + "/server/designer/edit", config);
        },
        //新增客服外包
        addKfwbInfo: function(config){
            return Ajax.post(APIURL + "/server/customer/add", config);
        },
        //修改客服外包
        editKfwbInfo: function(config){
            return Ajax.post(APIURL + "/server/customer/edit", config);
        },
        //新增仓配服务
        addCpfwInfo: function(config){
            return Ajax.post(APIURL + "/server/depot/add", config);
        },
        //修改仓配服务
        editCpfwInfo: function(config){
            return Ajax.post(APIURL + "/server/depot/edit", config);
        },
        //新增产业园
        addCyyInfo: function(config){
            return Ajax.post(APIURL + "/server/industrial/add", config);
        },
        //修改产业园
        editCyyInfo: function(config){
            return Ajax.post(APIURL + "/server/industrial/edit", config);
        },
        //分页查询公告
        getPageNews: function(config){
            return Ajax.get(APIURL + "/news/page", config);
        },
        //详情查询公告
        getNewsInfo: function(config){
            return Ajax.get(APIURL + "/news/info", config);
        },
        //列表查询数据字典
        getDictList: function(config){
            return Ajax.get(APIURL + "/dict/list", config);
        },
        //获取职位数据字典
        getPositionDictList: function(){
            return Base.getDictList({parentKey: "position_kind"})
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("rcTypes", JSON.stringify(res.data));                        
                    }
                    return res;
                });
        },
        //获取服务数据字典
        getServerDictList: function(){
            return Base.getDictList({parentKey: "serve_type"})
                .then(function(res){
                    if(res.success){
                        for(var i = res.data.length - 1; i >=0 ; i--){
                            if(res.data[i].dkey == "9"){
                                res.data.splice(i, 1);
                                break;
                            }
                        }
                        sessionStorage.setItem("fwTypes", JSON.stringify(res.data));                        
                    }
                    return res;
                });
        },
        //分页查询职位
        getPagePosition: function(config, falg){
            return Ajax.get(APIURL + "/position/page", config, falg || false);
        },
        //详情查询职位
        getPositionInfo: function(config){
            return Ajax.get(APIURL + "/position/info", config);
        },
        //删除职位
        deletePosition: function(config){
            return Ajax.post(APIURL + "/position/delete", config);
        },
        //发布职位
        publishPosition: function(config){
            return Ajax.post(APIURL + "/position/publish", config);
        },
        //修改职位
        editPosition: function(config){
            return Ajax.post(APIURL + "/position/edit", config);
        },
        //获取需求方用户详情
        getUserInfo: function(){
            return Ajax.get(APIURL + "/user/info/person");
        },
        //获取服务方用户详情
        getCompanyInfo: function(config){
            return Ajax.get(APIURL + "/user/info/comp", config || {});
        },
        //分页查询公司
        getPageComp: function(config){
            return Ajax.get(APIURL + "/user/comp/page", config);
        },
        //列表查询公司
        getListComp: function(config){
            return Ajax.get(APIURL + "/user/comp/list", config);
        },
        //新增简历
        publishResume: function(config){
            return Ajax.post(APIURL + "/resume/publish", config);
        },
        //修改简历
        editResume: function(config){
            return Ajax.post(APIURL + "/resume/edit", config);
        },
        //分页查询简历
        getPageResume: function(config){
            return Ajax.get(APIURL + "/resume/page", config);
        },
        //列表查询简历
        getListResume: function(config){
            return Ajax.get(APIURL + "/resume/list", config);
        },
        //删除简历
        deleteResume: function(config){
            return Ajax.post(APIURL + "/resume/delete", config);
        },
        //详情查询简历
        getResumeInfo: function(config){
            return Ajax.get(APIURL + "/resume/info", config);
        },
        //列表查询公司资质
        getListCredentials: function(config){
            return Ajax.get(APIURL + "/credentials/list", config);
        },
        //分页查询公司资质        
        getPageCredentials: function(config){
            return Ajax.get(APIURL + "/credentials/page", config);
        },
        //列表查询资质
        getListCredentials1: function(config){
            return Ajax.get(APIURL + "/credentials/list1", config);
        },
        //详情查询公司资质
        getCredentialInfo: function(config){
            return Ajax.get(APIURL + "/credentials/info", config);
        },
        //公司申请资质
        applyCredentials: function(config){
            return Ajax.post(APIURL + "/credentials/apply", config);
        },
        //修改公司资质
        editCertificates: function(config){
            return Ajax.post(APIURL + "/credentials/edit", config);
        },
        //删除公司资质
        deleteCertificates: function(config){
            return Ajax.post(APIURL + "/credentials/delete", config);
        },
        //需求方对服务感兴趣，公司对需求感兴趣，公司对简历感兴趣
        interested: function(config){
            return Ajax.post(APIURL + "/interest/interested", config);
        },
        //职位申请
        applyPosition: function(config){
            return Ajax.post(APIURL + "/interest/apply/position", config);
        },
        //分页查询感兴趣服务(或被感兴趣)
        getPageInterestServer: function(config){
            return Ajax.get(APIURL + "/interest/page/server", config);
        },
        //处理意向
        handleInterest: function(config){
            return Ajax.post(APIURL + "/interest/handle", config);
        },
        //分页查询申请职位或者应聘简历信息
        getPageInterestPosition: function(config){
            return Ajax.get(APIURL + "/interest/page/position", config);
        },
        //分页查询感兴趣简历(或被感兴趣简历)
        getPageInterestResume: function(config){
            return Ajax.get(APIURL + "/interest/page/resume", config);
        },
        //分页查询感兴趣需求
        getPageInterestDemand: function(config){
            return Ajax.get(APIURL + "/interest/page/demand", config);
        },
        //删除感兴趣服务
        deleteInterest: function(config){
            return Ajax.post(APIURL + "/interest/delete", config);
        },
        //分页查询需求
        getPageDemand: function(config){
            return Ajax.get(APIURL + "/demand/page", config);
        },
        //新增需求
        addDemand: function(config){
            return Ajax.post(APIURL + "/demand/add", config);
        },
        //修改需求
        editDemand: function(config){
            return Ajax.post(APIURL + "/demand/edit", config);
        },
        //删除需求
        deleteDemand: function(config){
            return Ajax.post(APIURL + "/demand/delete", config);
        },
        //详情查询需求
        getDemandInfo: function(config){
            return Ajax.get(APIURL + "/demand/info", config);
        },
        //发送需求方注册验证码
        sendRegisterSms: function(mobile){
            return Ajax.post(APIURL + "/gene/register/send", {mobile: mobile});
        },
        //发送需求方找回密码验证码
        sendPersonFindPwdSms: function(mobile){
            return Ajax.post(APIURL + "/gene/person/findloginpwd/send", {mobile: mobile});
        },
        //发送服务方找回密码验证码
        sendCompFindPwdSms: function(mobile){
            return Ajax.post(APIURL + "/gene/comp/findloginpwd/send", {mobile: mobile});
        },
        //发送需求方更改手机号验证码
        sendPersonChangeMobileSms: function(mobile){
            return Ajax.post(APIURL + "/gene/changemobile/send", {mobile: mobile});
        },
        //获取banner
        getBannerList: function(config){
            return Ajax.get(APIURL + "/navigate/banner/list", config);
        },
        //获取系统参数
        getSysConfig: function(config){
            return Ajax.get(APIURL + "/sconfig/page", config);
        }
    };
    function getMobileAndTime(){
        var serviceTime = sessionStorage.getItem("serviceTime"),
            sysMobile = sessionStorage.getItem("sysMobile");
        if(serviceTime && sysMobile){
            $("#serviceTime").text(serviceTime);
            $("#sysMobile").text(sysMobile);
        }else{
            Base.getSysConfig({
                start: 1,
                limit: 10
            }).then(function(res){
                if(res.success){
                    var list = res.data.list;
                    for(var i = 0; i < list.length; i++){
                        if(list[i].ckey == "serviceTime"){
                            $("#serviceTime").text(list[i].cvalue);
                            sessionStorage.setItem("serviceTime", list[i].cvalue);
                        }else if(list[i].ckey == "sysMobile"){
                            $("#sysMobile").text(list[i].cvalue);
                            sessionStorage.setItem("sysMobile", list[i].cvalue);
                        }
                    }
                }   
            });
        }
    }
    function init(){
        getMobileAndTime();
        if(location.pathname.indexOf("/login.html") == -1 && location.pathname.indexOf("/home/index.html") == -1){
            $(".bigbox").css( "min-height", ($(window).height() - 295) + "px" );
        }
        if(Base.isLogin()){
            var user = Base.getSessionUser(), username = "";
            if(Base.isCompUser()){
                username = user.loginName;
            }else{
                username = user.mobile;
            }
            $("#header").append('<div class="headerthree">欢迎你，<a class="info pr10 head-spa">'+username+'</a><a class="logout pl10">退出</a></div>');
        }else{
            $("#header").append('<div class="headerthree">'+
                '<a href="javascript:void(0)" class="login-a pr10 head-spa">登录</a>'+
                '<div class="head-reg pl10 inblock"><span>注册</span>'+
                '<ul class="hidden"><li><a class="topRegX" href="javascript:void(0)">个人注册</a></li><li><a class="topRegF" href="javascript:void(0)">企业注册</a></li></ul></div></div>');
            
        }
        var province = localStorage.getItem("province"), city, area;
        if(province == null){
            localStorage.setItem("province", "浙江");
            localStorage.setItem("city", "金华");
            localStorage.setItem("area", "金东区");
        }
        province = localStorage.getItem("province");
        city = localStorage.getItem("city");
        area = localStorage.getItem("area");
        if(area && area != "null"){
            $("#placeName").text(city + area);
        }else{
            $("#placeName").text(province + city);
        }
        var cList;
        Base.getAddress()
            .then(function(res){
                var temp_html = "", temp_html1 = "", temp_html2 = "";
                var prov_id = 0, city_id = 0;
                cList = res.citylist;
                $.each(cList,function(i,prov){
                    if(prov.p == province){
                        prov_id = i;
                        temp_html+="<option value='"+prov.p+"' selected>"+prov.p+"</option>";  
                    }else{
                        temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";                          
                    }
                });
                $.each(cList[prov_id].c,function(i,city1){
                    if(city == city1.n){
                        city_id = i;
                        temp_html1+="<option value='"+city1.n+"' selected>"+city1.n+"</option>";
                    }else{
                        temp_html1+="<option value='"+city1.n+"'>"+city1.n+"</option>";
                    }
                });
                if(cList[prov_id].c[city_id].a){
                    $.each(cList[prov_id].c[city_id].a,function(i,dist){
                        if(area == dist.s){
                            temp_html2+="<option value='"+dist.s+"' selected>"+dist.s+"</option>"; 
                        }else{
                            temp_html2+="<option value='"+dist.s+"'>"+dist.s+"</option>"; 
                        }
                    });
                    temp_html2 = "<option value=''>所有地区</option>" + temp_html2;
                    $("#topArea").removeClass("hidden").html(temp_html2);
                }else{
                    $("#topArea").empty().addClass("hidden");
                }
                $("#topProv").append(temp_html);
                $("#topCity").append(temp_html1);
            });
        $("#topProv").on("change", function(){
            var me = $(this), temp_html = "",
                prov_id = +me[0].selectedIndex;
            $.each(cList[prov_id].c,function(i,city){  
                temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";  
            });
            $("#topCity").removeAttr("disabled").html(temp_html);
            $("#topCity").trigger("change");
        });
        $("#topCity").on("change", function(){
            var me = $(this), temp_html = "",
                prov_id = +$("#topProv")[0].selectedIndex,
                city_id = +me[0].selectedIndex;
            if(cList[prov_id].c[city_id].a){
                $.each(cList[prov_id].c[city_id].a,function(i,dist){  
                    temp_html+="<option value='"+dist.s+"'>"+dist.s+"</option>";  
                });
                temp_html = "<option value=''>所有地区</option>" + temp_html;
                $("#topArea").removeClass("hidden").html(temp_html);
            }else{
                $("#topArea").addClass("hidden").empty();
            }
        });
        $("#header").on("click", "a", function(e){
            var me = $(this);
            if(me.hasClass("logout")){
                Base.logout()
                    .then(function(res){
                        location.href = "../home/index.html";
                    }, function(){
                        location.href = "../home/index.html";
                    });
            }else if(me.hasClass("info")){
                if(Base.isLogin()){
                    if(Base.isCompUser()){
                        location.href = "../suser/center.html";
                    }else{
                        location.href = "../xuser/center.html";
                    }
                }else{
                    location.href = "../xuser/login.html?return=" + Base.makeReturnUrl();
                }
                
            }else if(me.hasClass("login-a")){
                location.href = "../xuser/login.html";
            }else if(me.hasClass("topRegX")){
                location.href = "../xuser/register.html";
            }else if(me.hasClass("topRegF")){
                location.href = "../suser/register.html";
            }
            e.stopPropagation();
            e.preventDefault();
        }).on("mouseover", ".head-reg",function(){
            $(this).find("ul").removeClass("hidden");
        }).on("mouseout", ".head-reg", function(){
            $(this).find("ul").addClass("hidden");
        });
        $("#userA").on("click", function(){
            if(Base.isLogin()){
                if(Base.isCompUser()){
                    location.href = "../suser/center.html";
                }else{
                    location.href = "../xuser/center.html";
                }
            }else{
                location.href = "../xuser/login.html?return=" + Base.makeReturnUrl();
            }
        });
        $("#choosePlace").on("click", function(){
            $("#mask, #city1").removeClass("hidden");
        });
        $("#choseCancel").on("click", function(){
            $("#mask, #city1").addClass("hidden");
        });
        $("#choseOk").on("click", function(){
            var cont = $("#city1");
            var province = cont.find(".prov").val(),
                city = cont.find(".city").val(),
                area = $("#topArea").val();
            if( !province && !city && !area ){
                Base.showMsg("必须选择一个地点");
                return;
            }
            localStorage.setItem("province", province);
            localStorage.setItem("city", city);
            localStorage.setItem("area", area || "");
            location.reload(true);
        });
    }
    init();

    return Base;
});