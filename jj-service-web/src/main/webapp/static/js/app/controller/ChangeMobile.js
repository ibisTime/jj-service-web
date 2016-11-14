define([
    'app/controller/base',
], function (base) {
    var time;
    init();

    function init(){
        $("#userA").addClass("current");
        addListeners();
    }

    function addListeners(){
        $("#getSmsCode").on("click", function(){
            sendSmsCode();
        });
        $("#changeBtn").on("click", function(){
            if(validate()){
                doChangeMobile();
            }
        });
        $("#mobile, #smsCaptcha").on("keyup", function(e){
            var code = e.charCode || e.keyCode;
            if(code == "13"){
                $("#changeBtn").click();
            }
        });
    }
    function sendSmsCode(){
        var mobile = $("#mobile").val();
        if(!mobile || mobile.trim() === ""){
            base.showMsg("手机号不能为空");
            return;
        }else if(!/^1[3,4,5,7,8]\d{9}$/.test(mobile)){
            base.showMsg("手机号格式错误");
            return;
        }
        $("#getSmsCode").attr("disabled", "disabled");
        sendSms(mobile);
    }
    function sendSms(mobile){
        base.sendPersonChangeMobileSms(mobile)
            .then(function(res){
                if(res.success){
                    var i = 0;
                    time = setInterval(function(){
                        if (i < 60) {
                            $("#getSmsCode").val((60 - i) + "s");
                        } else {
                            $("#getSmsCode").val("获取验证码").removeAttr("disabled");
                            clearInterval(time);
                        }
                        i++;
                    }, 1000);
                }else{
                    base.showMsg("验证码发送失败!");
                    $("#getSmsCode").removeAttr("disabled");
                }
            },function(){
                $("#getSmsCode").removeAttr("disabled");
            });
    }
    function validate(){
        var mobile = $("#mobile").val();
        if(!mobile || mobile.trim() === ""){
            base.showMsg("手机号不能为空");
            return false;
        }else if(!/^1[3,4,5,7,8]\d{9}$/.test(mobile)){
            base.showMsg("手机号格式错误");
            return false;
        }
        var smsCaptcha = $("#smsCaptcha").val();
        if(!smsCaptcha){
            base.showMsg("验证码不能为空");
            return false;
        }else if(!/^[\d\w]{4}$/.test(smsCaptcha)){
            base.showMsg("验证码格式错误");
            return false;
        }
        return true;
    }
    function doChangeMobile(){
        $("#changeBtn").val("修改中...").attr("disabled", "disabled");
        var config = {
            newMobile: $("#mobile").val(),
            smsCaptcha: $("#smsCaptcha").val()
        };
        base.changeMoblie(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改手机成功！");
                    var user = base.getSessionUser();
                    user.mobile = config.newMobile;
                    base.setSessionUser(user);
                    setTimeout(function(){
                        base.goBackUrl("./center.html");
                    }, 1500);
                }else{
                    base.showMsg(res.msg);
                    $("#changeBtn").val("修改").removeAttr("disabled");
                }
            });
    }
});