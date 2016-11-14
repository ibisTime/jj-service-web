define([
    'app/controller/base'
], function (base) {
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin()){
            if(base.isCompUser()){
                addListeners();
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
    function addListeners(){
        //下一步
        $("#sbtn").on("click", function(){
            location.href = "./center.html";
        });
    }
});