define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        pwdStrength = Dict.get("pwdStrength");

    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin() && base.isPerson()){
            getUserInfo();
        }else if(base.isLogin()){
            location.href = "../suser/center.html";
        }else{
            if(base.isLogin()){
                base.showMsg("您不是个人用户，请先进行注册");
                setTimeout(function(){
                    location.href = "./register.html?return=" + base.makeReturnUrl();
                }, 1000);   
            }else{
                base.showMsg("您还未登录，无法查看当前页面");
                setTimeout(function(){
                    location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
                }, 1000);
            }
        }
    }

    function getUserInfo(){
        base.getUserInfo()
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    var pwdLevel = pwdStrength[data.loginPwdStrength];
                    $("#levelSpan").text(pwdLevel); 
                    switch(data.loginPwdStrength){
                        case "2":
                            $("#levelDiv").addClass("redback1");
                            break;
                        case "3":
                            $("#levelDiv").addClass("redback2");
                            break;
                        default:
                            $("#levelDiv").addClass("redback");
                    }
                    $("#mobile").text(base.maskMobile(data.mobile));
                }else{
                    base.showMsg("暂时无法获取公司信息")
                }
            });
    }

    function doError(ele) {
        ele.html(template);
    }
});