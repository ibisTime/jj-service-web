define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars'
], function (base, Ajax, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        pwdStrength = Dict.get("pwdStrength");

    init();

    function init(){
        if(base.isLogin()){
            getUserInfo();
        }else{
            //未登录
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

                }
            });
    }

    function doError(ele) {
        ele.html(template);
    }
});