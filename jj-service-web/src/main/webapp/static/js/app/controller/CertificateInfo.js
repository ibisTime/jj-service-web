define([
    'app/controller/base',
    'app/util/dict'
], function (base, Dict) {
    var code = base.getUrlParam("code"),
        certificateStatus = Dict.get("certificateStatus"),
        serverType = Dict.get("serverType");
    init();

    function init(){
        if(base.isLogin()){
            if(base.isCompUser()){
                if(code){
                    getCredentialInfo();
                    addListeners();
                }else{
                    base.showMsg("未传入资质编号");
                }
            }else{
                base.showMsg("您不是企业用户，无法查看当前页面!");
                setTimeout(function(){
                    location.href = "../xuser/login.html?return="+base.makeReturnUrl();
                }, 1000);
            }
        }else{
            location.href = "../xuser/login.html?return="+base.makeReturnUrl();
        }
        
    }
    function getCredentialInfo(){
        base.getCredentialInfo({code: code})
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    $("#name").val(data.certificate.name);
                    $("#status").val(certificateStatus[data.status]);
                    $("#description").val(data.certificate.description);
                    $("#certSelect").val(serverType[data.certificateType] || "人才招聘");
                }else{
                    base.showMsg("非常抱歉，资质获取失败");
                }
            });
    }
    function addListeners(){
        //下一步
        $("#sbtn").on("click", function(){
            base.goBackUrl('./center.html');
        });
    }
    function applyCertificates(code){
        base.applyCredentials({
            certificateCode: code
        }).then(function(res){
            if(res.success){
                location.href = "./apply-certificate3.html?return=" + base.getReturnParam();
            }else{
                base.showMsg("非常抱歉，申请资质失败!");
            }
        });
    }
});