define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {

    init();

    function init(){
        addListeners();
        $("#tabs").children("li:eq(0)").click();
    }

    function addListeners(){
        $("#tabs").on("click", "li", function(){
            var me = $(this), idx = $(this).index();
            $("#tabs").find("li.active").removeClass("active");
            me.addClass("active");
            if(idx == 0){
                $("#loginBox").find(".container1").addClass("hidden")
                    .parent().find(".container0").removeClass("hidden");
                $("#xqCaptchaImg").click();
            }else{
                $("#loginBox").find(".container0").addClass("hidden")
                    .parent().find(".container1").removeClass("hidden");
                $("#fwCaptchaImg").click();
            }
        });
        $("#fwCaptchaImg, #xqCaptchaImg").on("click", function(){
            $(this).attr('src', APIURL + '/captcha?_=' + new Date().getTime());
        });
        $("#xqLogin").on("click", function(){
            if(validate()){
                var me = $(this);
                me.val("登录中...").attr("disabled", "disabled");
                base.personLogin({
                    loginName: $("#mobile").val(),
                    loginPwd: $("#password").val(),
                    captcha: $("#xqCaptcha").val()
                }).then(function(res){
                    if(res.success){
                        base.goBackUrl("../xuser/center.html");
                    }else{
                        me.val("登录").removeAttr("disabled");
                        base.showMsg("登录失败");
                    }
                });
            }
        });
        $("#fwLogin").on("click", function(){
            if(validate1()){
                var me = $(this);
                me.val("登录中...").attr("disabled", "disabled");
                base.companyLogin({
                    loginName: $("#loginName").val(),
                    password: $("#loginPwd").val(),
                    captcha: $("#fwCaptcha").val()
                }).then(function(res){
                    if(res.success){
                        base.goBackUrl("../suser/center.html");
                    }else{
                        me.val("登录").removeAttr("disabled");
                        base.showMsg("登录失败");
                    }
                });
            }
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
        var password = $("#password").val();
        if(!password || password.trim() === ""){
            base.showMsg("密码不能为空");
            return false;
        }
        var xqCaptcha = $("#xqCaptcha").val();
        if(!xqCaptcha || xqCaptcha.trim() === ""){
            base.showMsg("验证码不能为空");
            return false;
        }else if(!/^[\d\w]{4}$/.test(xqCaptcha)){
            base.showMsg("验证码格式错误");
            return false;
        }
        return true;
    }

    function validate1(){
        var loginName = $("#loginName").val();
        if(!loginName || loginName.trim() === ""){
            base.showMsg("用户名不能为空");
            return false;
        }
        var password = $("#loginPwd").val();
        if(!password || password.trim() === ""){
            base.showMsg("密码不能为空");
            return false;
        }
        var fwCaptcha = $("#fwCaptcha").val();
        if(!fwCaptcha || fwCaptcha.trim() === ""){
            base.showMsg("验证码不能为空");
            return false;
        }else if(!/^[\d\w]{4}$/.test(fwCaptcha)){
            base.showMsg("验证码格式错误");
            return false;
        }
        return true;
    }
});