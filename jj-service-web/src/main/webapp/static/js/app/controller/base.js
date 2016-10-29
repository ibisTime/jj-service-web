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
        showMsg: function (msg, time){
            var d = dialog({
                content: msg,
                quickClose: true
            });
            d.show();
            setTimeout(function () {
                d.close().remove();
            }, time || 2000);
        },
        maskMobile: function(mobile){
            return mobile.replace(/^(\d{3})\d{4}(\d{4})$/ig, "$1****$2");
        },
        makeReturnUrl: function(){
            return encodeURIComponent(location.pathname + location.search);
        },
        goBackUrl: function(url){
            var rUrl = base.getUrlParam("return");
            if(rUrl){
                location.href = rUrl;
            }else{
                location.href = url || "../home/index.html";
            }
        },
        isLogin: function(){
            return sessionStorage.getItem("login") || false;
        },
        //是否服务方
        isCompUser: function(){
            if(Base.isLogin()){
                    var user = $.parseJSON(sessionStorage.getItem("user"));
                    if(user.kind == "1"){
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
                    var user = $.parseJSON(sessionStorage.getItem("user"));
                    if(user.kind == "1"){
                        return true;
                    }else{
                        return false;
                    }
            }else{
                return true;    //未登录用户默认显示需求方页面
            }
        },
        getPersonUserId: function(){
            if(Base.isLogin()){
                var user = $.parseJSON(ssionStorage.getItem("user"));
                return user.userId;
            }else{
                return "";
            }
        },
        getCompanyCode: function(){
            if(Base.isLogin()){
                var user = $.parseJSON(ssionStorage.getItem("user"));
                return user.code;
            }else{
                return "";
            }
        },
        logout: function(){
            return Ajax.post(APIURL + "/user/logout");
        },
        personLogin: function(config){
            return Ajax.post(APIURL + "/user/login/person", config)
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("login", true);
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res;
                });
        },
        companyLogin:function(config){
            return Ajax.post(APIURL + "/user/login/comp", config)
                .then(function(res){
                    if(res.success){
                        sessionStorage.setItem("login", true);
                        sessionStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res;
                });
        },
        //服务方注册
        companyRegister: function(config){
            return Ajax.post(APIURL + "/regist/comp", config);
        },
        //需求方注册
        personRegister: function(config){
            return Ajax.post(APIURL + "/regist/person", config);
        },
        //分页查询服务
        getPageServers: function(config){
            return Ajax.get(APIURL + "/server/page", config);
        },
        //详情查询服务
        getServerInfo: function(config){
            return Ajax.get(APIURL + "/server/info", config);
        },
        //分页查询公告
        getPageNews: function(config){
            return Ajax.get(APIURL + "/news/page", config);
        },
        //列表查询数据字典
        getDictList: function(config){
            return Ajax.get(APIURL + "/dict/list", config);
        },
        //获取职位数据字典
        getPositionDictList: function(){
            return Base.getDictList({parentKey: "position_kind"});
        },
        //获取服务数据字典
        getServerDictList: function(){
            return Base.getDictList({parentKey: "serve_type"});
        },
        //分页查询职位
        getPagePosition: function(config){
            return Ajax.get(APIURL + "/position/page", config);
        },
        //详情查询职位
        getPositionInfo: function(config){
            return Ajax.get(APIURL + "/position/info", config);
        },
        //发布职位
        publishPosition: function(config){
            return Ajax.post(APIURL + "/position/publish", config);
        },
        //获取需求方用户详情
        getUserInfo: function(){
            return Ajax.get(APIURL + "/user/info/person");
        },
        //获取服务方用户详情
        getCompanyInfo: function(config){
            return Ajax.get(APIURL + "/user/info/comp", config || {});
        },
        //分页查询简历
        getPageResume: function(config){
            return Ajax.get(APIURL + "/resume/page", config);
        },
        //列表查询简历
        getListResume: function(config){
            return Ajax.get(APIURL + "/resume/list", config);
        },
        //职位申请
        applyPosition: function(config){
            return Ajax.post(APIURL + "/interest/apply/position", config);
        },
        //列表查询公司资质
        getListCredentials: function(config){
            return Ajax.get(APIURL + "/credentials/list", config);
        },
        //需求方对服务感兴趣，公司对需求感兴趣，公司对简历感兴趣
        interested: function(config){
            return Ajax.post(APIURL + "/interest/interested", config);
        }
    };
    function init(){

        if(sessionStorage.getItem("login")){
            var kind = sessionStorage.getItem("kind"),
                username = sessionStorage.getItem("username");
            $("#header").append('<div class="headerthree">欢迎你，<a class="info pr10 head-spa">'+username+'</a><a class="logout pl10">退出</a></div>');
        }else{
            $("#header").append('<div class="headerthree">'+
                '<a href="../xuser/login.html" class="info pr10 head-spa">登录</a>'+
                '<div href="javascript:void(0);" class="head-reg pl10 inblock"><span>注册</span>'+
                '<ul class="hidden"><li><a href="../xuser/register.html">需求方注册</a></li><li><a href="../suser/register.html">服务方注册</li></ul></div></div>');
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
        var position = city + " " + area;
        $("#placeName").text(position);
        $("#city").citySelect({
            prov: province,  
            city: city,  
            dist: area, 
            url: "/static/js/lib/city.min.json"
        });
        $("#header").on("click", "a", function(e){
            var me = $(this);
            if(me.hasClass("logout")){
                Base.logout()
                    .then(function(res){
                        location.reload(true);
                    });
            }else if(me.hasClass("info")){
                var kind = sessionStorage.getItem("kind");
                location.href = "../xuser/center.html";
            }
            e.stopPropagation();
        }).on("mouseover", ".head-reg",function(){
            $(this).find("ul").removeClass("hidden");
        }).on("mouseout", ".head-reg", function(){
            $(this).find("ul").addClass("hidden");
        });
        $("#choosePlace").on("click", function(){
            $("#city").find(".city").prop("disabled", "disabled");
            $("#mask, #city").removeClass("hidden");
        });
        $("#choseCancel").on("click", function(){
            $("#mask, #city").addClass("hidden");
        });
        $("#choseOk").on("click", function(){
            var cont = $("#city");
            var province = cont.find(".prov").val(),
                city = cont.find(".city").val(),
                area = cont.find(".dist").val();
            if( !province && !city && !area ){
                Base.showMsg("必须选择一个地点");
                return;
            }
            localStorage.setItem("province", province);
            localStorage.setItem("city", city);
            localStorage.setItem("area", area);
            location.href="../home/index.html";
        });
    }
    init();

    return Base;
});