define([
    'app/controller/base',
], function (base) {

    init();

    function init(){
        $("#userA").addClass("current");
        addListeners();
    }

    function addListeners(){
        $("#registerBtn").on("click", function(){
            if(validate()){
                doReigster();
            }
        });
        $("#getSmsCode").on("click", function(){
            sendSmsCode();
        });
        $("#mobile, #smsCaptcha, #loginPwd, #rePwd").on("keyup", function(e){
            var code = e.charCode || e.keyCode;
            if(code == "13"){
                $("#registerBtn").click();
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
        base.sendRegisterSms(mobile)
            .then(function(res){
                if(res.success){
                    for (var i = 0; i <= 60; i++) {
                        (function (i) {
                            setTimeout(function () {
                                if (i < 60) {
                                    $("#getSmsCode").val((60 - i) + "s");
                                } else {
                                    $("#getSmsCode").val("获取验证码").removeAttr("disabled");
                                }
                            }, 1000 * i);
                        })(i);
                    }
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
        if(!smsCaptcha || smsCaptcha.trim() === ""){
            base.showMsg("验证码不能为空");
            return false;
        }else if(!/^\d{4}$/.test(smsCaptcha)){
            base.showMsg("验证码格式错误");
            return false;
        }
        var password = $("#loginPwd").val();
        if(!password || password.trim() === ""){
            base.showMsg("密码不能为空");
            return false;
        }else if(!base.specialCode.test(password)){
            base.showMsg("密码不能包含特殊字符");
            return false;
        }else if(password.length > 16 || password.length < 6){
            base.showMsg("密码长度必须是6到16个字符");
            return false;
        }
        var rePwd = $("#rePwd").val();
        if(!rePwd || rePwd.trim() === ""){
            base.showMsg("请再次输入密码");
            return false;
        }else if(rePwd !== password){
            base.showMsg("两次密码不同");
            return false;            
        }
        if(!$("#readCheck")[0].checked){
            base.showMsg("未勾选同意协议选项框");
            return false;
        }
        return true;
    }
    function doReigster(){
        $("#registerBtn").val("注册中...").attr("disabled", "disabled");
        var config = {
            mobile: $("#mobile").val(),
            loginPwd: $("#loginPwd").val(),
            smsCaptcha: $("#smsCaptcha").val()
        };
        base.personRegister(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("注册成功！");
                    setTimeout(function(){
                        location.href = "../home/index.html";
                    }, 1000);
                }else{
                    $("#registerBtn").val("注册").removeAttr("disabled");
                    base.showMsg(res.msg);
                }
            });
    }
});