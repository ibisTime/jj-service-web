define([
    'app/controller/base',
], function (base) {
    var type = base.getUrlParam("t") || "1",    //1:需求方、2:服务方
        time;
    init();

    function init(){
        $("#userA").addClass("current");
        if(type == "2"){
            $("#compName").removeClass("hidden");
        }
        addListeners();
    }

    function addListeners(){
        $("#getSmsCode").on("click", function(){
            sendSmsCode();
        });
        $("#findBtn").on("click", function(){
            if(validate()){
                doFindPwd();
            }
        });
        $("#loginName, #mobile, #smsCaptcha, #password, #rePwd").on("keyup", function(e){
            var code = e.charCode || e.keyCode;
            if(code == "13"){
                $("#findBtn").click();
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
        if(type == "1"){
            sendPersonSms(mobile);
        }else{
            sendCompSms(mobile);
        }
    }
    function sendPersonSms(mobile){
        base.sendPersonFindPwdSms(mobile)
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
    function sendCompSms(mobile){
        base.sendCompFindPwdSms(mobile)
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
                base.showMsg("验证码发送失败!");
                $("#getSmsCode").removeAttr("disabled");
            });
    }
    function validate(){
        if(type == "2"){
            var loginName = $("#loginName").val();
            if(!loginName || loginName.trim() === ""){
                base.showMsg("用户名不能为空");
                return false;
            }
        }
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
        var password = $("#password").val();
        if(!password || password.trim() === ""){
            base.showMsg("密码不能为空");
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
        return true;
    }
    function doFindPwd(){
        $("#findBtn").val("找回中...").attr("disabled", "disabled");
        if(type == "1"){
            findXQPwd();
        }else{
            findFWPwd();
        }
        
    }
    function findXQPwd(){
        var config = {
            mobile: $("#mobile").val(),
            newLoginPwd: $("#password").val(),
            smsCaptcha: $("#smsCaptcha").val()
        };
        base.personFindPwd(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("找回密码成功！");
                    setTimeout(function(){
                        location.href = "./login.html?return=" + base.getReturnParam();
                    }, 1500);
                }else{
                    base.showMsg(res.msg);
                    $("#findBtn").val("找回").removeAttr("disabled");
                }
            });
    }
    function findFWPwd(){
        var config = {
            loginName: $("#loginName").val(),
            mobile: $("#mobile").val(),
            smsCaptcha: $("#smsCaptcha").val(),
            newPassword: $("#password").val()
        };
        base.compFindPwd(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("找回密码成功！");
                    setTimeout(function(){
                        location.href = "./login.html?return=" + base.getReturnParam();
                    }, 1500);
                }else{
                    base.showMsg(res.msg);
                    $("#findBtn").val("找回").removeAttr("disabled");
                }
            })
    }
});