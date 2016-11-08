define([
    'app/controller/base',
	'lib/swiper-3.3.1.jquery.min'
], function (base, Swiper) {

    init();

    function init(){
        $("#userA").addClass("current");
        getBannerList();
        addListeners();
        $("#tabs").children("li:eq(0)").click();
    }

    function getBannerList(){
        base.getBannerList({location: "4"})
            .then(function(res){
                if(res.success){
                    if(res.data.length){
                        var data = res.data, html = "";
                        for(var i = 0; i < data.length; i++){
                            html += '<div class="swiper-slide"><img class="wp100 hp100" src="'+data[i].pic+'"></div>';
                        }
                        if(data.length == 1){
                            $("#swiper-pagination").remove();
                        }
                        $("#swr").html(html);
                        swiperImg();
                    }
                }else{
					base.showMsg("非常抱歉，暂时无法获取banner!");
				}
            });
    }
    function swiperImg(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination'
        });
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
                        $("#xqCaptchaImg").click();
                        base.showMsg(res.msg);
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
                        $("#fwCaptchaImg").click();
                        base.showMsg(res.msg);
                    }
                });
            }
        });
        $("#mobile, #password, #xqCaptcha").on("keyup", function(e){
            var code = e.charCode || e.keyCode;
            if(code == "13"){
                $("#xqLogin").click();
            }
        });
        $("#loginName, #loginPwd, #fwCaptcha").on("keyup", function(e){
            var code = e.charCode || e.keyCode;
            if(code == "13"){
                $("#fwLogin").click();
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