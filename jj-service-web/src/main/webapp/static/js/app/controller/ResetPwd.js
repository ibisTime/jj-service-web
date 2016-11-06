define([
    'app/controller/base',
], function (base) {
    var type = base.getUrlParam("t") || "1";    //1:需求方、2:服务方

    init();

    function init(){
        addListeners();
    }

    function addListeners(){
        $("#resetBtn").on("click", function(){
            if(validate()){
                doResetPwd();
            }
        });
    }
    function validate(){
        var oldLoginPwd = $("#oldLoginPwd").val();
        if(!oldLoginPwd || oldLoginPwd.trim() === ""){
            base.showMsg("原密码不能为空");
            return false;
        }
        var password = $("#newLoginPwd").val();
        if(!password || password.trim() === ""){
            base.showMsg("新密码不能为空");
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
    function doResetPwd(){
        $("#resetBtn").val("修改中...").attr("disabled", "disabled");
        if(type == "1"){
            resetXQPwd();
        }else{
            resetFWPwd();
        }
        
    }
    function resetXQPwd(){
        var config = {
            oldLoginPwd: $("#oldLoginPwd").val(),
            newLoginPwd: $("#newLoginPwd").val()
        };
        base.personResetPwd(config)
            .then(function(res){
                if(res.success){
                    base.clearSessionUser();
                    base.showMsg("修改密码成功，请重新登录！");
                    setTimeout(function(){
                        location.href = "./login.html?return=" + base.getReturnParam();
                    }, 1500);
                }else{
                    base.showMsg("修改密码失败！");
                    $("#findBtn").val("修改").removeAttr("disabled");
                }
            });
    }
    function resetFWPwd(){
        var config = {
            oldPassword: $("#oldLoginPwd").val(),
            newPassword: $("#newLoginPwd").val()
        };
        base.compResetPwd(config)
            .then(function(res){
                if(res.success){
                    if(res.success){
                        base.clearSessionUser();
                        base.showMsg("修改密码成功，请重新登录！");
                        setTimeout(function(){
                            location.href = "./login.html?return=" + base.getReturnParam();
                        }, 1500);
                    }else{
                        base.showMsg("修改密码失败！");
                        $("#findBtn").val("修改").removeAttr("disabled");
                    }
                }
            });
    }
});