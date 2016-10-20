define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {
    var code = base.getUrlParam("code");
    var COMPANYCODE, wxMenuCode = "", wxMenuName = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            base.addIcon();
            if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                wxMenuName = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(wxMenuName);
            }else{
                getWXCode();
            }
        }else{
            base.getCompanyByUrl()
                .then(function(){
                     if(COMPANYCODE = sessionStorage.getItem("compCode")){
                        base.addIcon();
                        if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                            wxMenuName = sessionStorage.getItem("wxMenuName");
                            $("#wxdjcd").text(wxMenuName);
                        }else{
                            getWXCode();
                        }
                    }else{
                        base.showMsg("非常抱歉，暂时无法获取公司信息!")
                    }
                });
        }
        getContent();
    }

    function getContent(){
        base.getContentList(code)
            .then(function(res){
                if(res.success){
                    var data = res.data[0];
                    $("#title").text(data.title);
                    var pic = data.pic2;
                    if(isPicture(pic)){
                        $("#img").html('<img class="wp100" src="'+pic+'">');
                    }else{
                        $("#bg-video").removeClass("hidden")
                            .html('<source src="'+pic+'" type="video/mp4">'+
                                    '<source src="'+pic+'" type="video/WebM">'+
                                    '<source src="'+pic+'" type="video/Ogg">');
                    }
                    $("#description").html(data.description);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取相关内容!");
                }
            });
    }

    function getWXCode(){
        return base.getMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var list = res.data;
                    for(var i = 0; i < list.length; i++){
                        if(/^wei/.test(list[i].code)){
                            wxMenuCode = list[i].code;
                            wxMenuName = list[i].name;
                            sessionStorage.setItem("wxMenuCode", wxMenuCode)
                            sessionStorage.setItem("wxMenuName", wxMenuName);
                            $("#wxdjcd").text(wxMenuName);
                        }
                    }
                }
            });
    }

    function isPicture(url){
        var ext = url.substring(url.lastIndexOf("."), url.length).toUpperCase();
        if(ext!=".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG"){
            return false;
        }else{
            return true;
        }
    }
});
