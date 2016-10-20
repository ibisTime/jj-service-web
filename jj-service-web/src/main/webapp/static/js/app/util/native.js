define(['app/util/common'], function(hs) {
    var isPhone = function(){
        if(navigator.userAgent.indexOf('iPhone') != -1) return true;
        return false;
    };
    var run = function(param){
        if(!isPhone()){
            if(window.action && window.action.forward) {window.action.forward(JSON.stringify(param));}
        }else{
            if(window.forward) { window.forward(param);}
        }
    };

    //兼容网页调试
    if (hs.getQueryString('dev') == 1) {
        window.action = {};
        window.forward = window.action.forward = function(param) {
            if (typeof param == 'string') {
                param = JSON.parse(param);
            }
            var type = param.type;
            switch (type) {
                case 14:
                    history.back();
                    break;
                case 15:
                    location.href = param.url;
                    break;
            }
        };
    }

    //回调函数
    window.appCallBack = function(json){
        if (typeof(json) == "string") json = eval('('+json+')');
        switch(parseInt(json.type)){
            case 1:{//登录成功 刷新页面
                if(window.login) window.login(json.hsOpenId);
                return false;
            }
            case 2:{//拍照返回
                if(window.cameraImage){
                    window.cameraImage(json.pic);
                }
                return false;
            }
            case 3:{//分享回调
                if(window.share)	window.share();
                return false;
            }
            case 4:{//物理返回键
                if(window.backOrder)
                    window.backOrder();
                return false;
            }
            case 5:{//暂未定
                return false;
            }
            case 6:{//后台终止程序时
                if(window.stopApp)
                    window.stopApp();
                return false;
            }
            case 7:{//刷新登录状态
                //if(window.refreshPage) window.refreshPage(json.hsOpenId!='null'?json.hsOpenId:"");
                if (window.reloadUser) window.reloadUser(json.hsOpenId!='null'?json.hsOpenId:"");
                return false;
            }
            case 8:{//获取对应存储数据
                if(window.readValueCallBack) window.readValueCallBack(json.value);
                return false;
            }
            case 9: { // 打开页面
                if (json.page == 1) { // 发计划页面
                    if(hs.getQueryString('hsOpenId')){
                        runApp.newPage(location.origin+location.pathname.substring(0,location.pathname.lastIndexOf('/'))+"/../" + 'positions/step-1.html?hsOpenId=' + hs.getQueryString('hsOpenId') + '&isfirst=true');
                    }else{
                        $.ajax({
                            url : "../../v2/index/islogin.htm",
                            success : function(json) {
                                if(this.checkLogin(json)) {
                                }

                            }
                        });
                    }
                }
            }
        }
    };

    return {
        go:function(page,cfg){
            if(page == '1-21-99-2'){
                run({type:1,page:page,callback:"appCallBack(type=1,hsOpenId)"});
            } if (page == '1-6') {
                var param = {type:1,page:page};
                if (!isPhone()) {
                    param.intents = 'stock_code=' + cfg.stockCode;
                } else {
                    param.stock_code = cfg.stockCode;
                }
                run(param);
            }else{
                run({type:1,page:page});
            }
            return false;
        },
        openHotNotice: function(url) {
            run({type:2,url:url});
            return false;
        },
        camera:function(subtype,callback){//subtype(1:单张截图,2:单张不截图,3:多张不截图)
            window.cameraCallBack = callback;
            run({type:13,subtype:subtype});
            return false;
        },
        back:function(){
            run({type:14});
            return false;
        },
        newPage:function(url){
            run({type:15,url:url});
            return false;
        },
        YMReport:function(subtype,title){//subtype(1:开始,2:结束)
            run({type:16,subtype:subtype,title:title});
            return false;
        },
        request:function(url,method,params,intents,callback){
            run({type:17,url:url,method:method,params:params,intents:intents,callback:callback});
            return false;
        },
        saveValue:function(field,value){
            run({type:18,subtype:1,field:field,value:value});
            return false;
        },
        readValue:function(field,value,callback){
            window.readValueCallBack = callback;
            run({type:18,subtype:2,field:field});
            return false;
        },
        share: function(shortcut, digest, title, url) {
            var obj = {
                shortcut: shortcut,
                digest: digest,
                title: title,
                url: url,
                type: 19
            };
            run(obj);
        },
        addZiXuan: function(stockCode, marketType) {
            run({type: 20, stockCode: stockCode, marketType: marketType});
        }
    };
});