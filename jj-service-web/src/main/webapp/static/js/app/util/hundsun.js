define(['app/util/common',
    'app/util/native',
    'app/util/dialog'], function(hs, runApp, dialog) {
    var isClosed = false;
    var community = {
        addHsOpenId:function(href,hsopenId){
            var num = href.indexOf("?")
            var a =  href.substr(0,num);
            var href = href.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr = href.split("&"); //各个参数放到数组里
            var s = '';
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    var name=arr[i].substring(0,num);
                    if(name == 'hsOpenId') s += "&"+name+"="+hsopenId;
                    else s += "&"+arr[i];
                }
            }
            return a +"?"+s.substring(1);
        },
        backUrl : function(){
            var curr = hs.getCookie('curr');
            if(curr == 0 || !curr){
                runApp.back();
            }else{
                if(!isClosed){
                    isClosed = true;
                    runApp.YMReport(2,$('head title').html());
                }
                var str = hs.getCookie('location'+curr);
                hs.addCookie('curr',parseInt(curr)-1)
                location.href = community.addHsOpenId(str, localStorage.getItem('hsOpenId'));
            }
            return false;
        },
        goUrl:function(url,oldurl,addHoi){
            if(!oldurl){
                oldurl = location.href;
            }
            url = url?url:$(this).data('url');
            var curr = hs.getCookie('curr');
            curr = curr?curr:0;
            hs.addCookie('location'+(parseInt(curr)+1),oldurl);
            hs.addCookie('curr',parseInt(curr)+1);
            if(url.indexOf("?") == -1){
                url += "?hsOpenId="+localStorage.getItem('hsOpenId');
            }else{
                if(!addHoi){
                    url += "&hsOpenId="+localStorage.getItem('hsOpenId');
                }
            }
            //友盟统计
            if(location.pathname.indexOf('html/plan/index.html') != -1){	//说明首页  另外一种调法
                runApp.newPage(location.origin+location.pathname.substring(0,location.pathname.lastIndexOf('/'))+"/../"+url+"&isfirst=true")
            }else{
                if(!isClosed){
                    isClosed = true;
                    runApp.YMReport(2,$('head title').html());
                }
                location.href = "../"+url
            }
            return false;
        },
        changeUrl:function(url){
            if(url.indexOf("?") == -1){
                url += "?hsOpenId="+localStorage.getItem('hsOpenId');
            }else{
                url += "&hsOpenId="+localStorage.getItem('hsOpenId');
            }
            location.href = "../"+url
        },
        backAndGo:function(back,url){
            var curr = hs.getCookie('curr');
            if(back > curr){
                curr = 0;
            }else{
                curr = parseInt(curr) - back;
            }
            hs.addCookie('curr',curr)
            if(url){
                if(url.indexOf("?") == -1){
                    url += "?hsOpenId="+localStorage.getItem('hsOpenId');
                }else{
                    url += "&hsOpenId="+localStorage.getItem('hsOpenId');
                }
                location.href = "../"+url
            }else{
                location.href = hs.getCookie('location'+(parseInt(curr)+1))
            }
            return false;
        }
    };
    window.community = {};
    window.community.backUrl = community.backUrl; // native call
    window.login = function(hsOpenId){
        localStorage.setItem('hsOpenId', hsOpenId);
    };
    window.backOrder = function(){
        community.backUrl();
    };
    window.stopApp = function(){
        if(!isClosed){
            isClosed = true;
            runApp.YMReport(2,$('head title').html());
        }
    };
    window.refreshPage = function(hsOpenId){
        var h = location.href;
        if(location.href.indexOf('index.html') != -1){	//首页之外  其他页面不刷新
            if(!isClosed){
                isClosed = true;
                runApp.YMReport(2,$('head title').html());
            }
            var target = $('ul.frameWhite-indexTop li.active').attr('target');
            var type = $('#'+target+' nav.selectIndex-list li a.active').attr('type');
            if(!type){
                type = $('.nav-fixed nav.selectIndex-list li a.active').attr('type');
            }
            var tar = hs.getQueryString("target")
            if(tar){
                h = h.replace(tar,target);
            }else{
                h += "&target="+target;
            }
            var t = hs.getQueryString("type")
            if(t){
                h = h.replace("type="+t,"type="+type);
            }else{
                h += "&type="+type;
            }
            location.href = community.addHsOpenId(h,hsOpenId)
        }
    };
    setTimeout(function(){
        runApp.YMReport(1,$('head title').html());
    },200);
    isClosed = false;
    if(hs.getQueryString('isfirst')){
        hs.addCookie('curr',0);
        localStorage.setItem('hsOpenId', hs.getQueryString('hsOpenId'));
    }

    $.ajaxSetup( {
        type: "POST" , // 默认使用POST方式
        dataType : "json",
        data: { // 默认添加请求头
            "HOI": function() {
                return localStorage.getItem('hsOpenId') || '';

            }
        },
        checkLogin : function(json){
            if(json.success == false && json.error){
                if(json.exType == 'LoginException'){//重新登录
                    runApp.go("1-21-99-2");
                }else{
                    new dialog({
                        msg:json.exMsg,
                        timer:3
                    });
                }
                return false;
            }
            return true;
        }
    });

    return community;
});