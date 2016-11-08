define([
    'app/controller/base'
], function (base) {
    var code = base.getUrlParam("code");
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin()){
            if(code){
                getCompanyInfo();
                addListeners();
            }else{
                base.showMsg("未传入公司编号")
            }
        }else{
            location.href = "../xuser/login.html?return="+base.makeReturnUrl();
        }
        
    }

    function getCompanyInfo(){
        base.getCompanyInfo({code: code})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    addCompInfo(data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息！");
                }
            });
    }
    
    function addCompInfo(data){
        //公司
        if(data.type == "1"){
            $("#qyDiv").removeClass("hidden");

            $("#compName").val(data.name);
            if(data.gsyyzzh){
                $("#qyyyzzImg").attr("src", data.gsyyzzh);
            }
            if(data.logo){
                $("#qytbImg").attr("src", data.logo);
            }
        //个体户
        }else{
            $("#gthDiv").removeClass("hidden");

            $("#realName").val(data.name);
            if(data.gsyyzzh){
                $("#sfz").attr("src", data.gsyyzzh);
            }
            if(data.logo){
                $("#gthtb").attr("src", data.logo);
            }
        }

        $("#contacts").val(data.contacts);
        $("#mobile").val(data.mobile);
        $("#email").val(data.email);
        $("#qq").val(data.qq);
        $("#scale").val(data.scale);
        $("#address").val(data.province + data.city + (data.area || "") );
        $("#slogan").val(data.slogan);
        $("#remark").val(data.remark);        
        $("#description").val(data.description);
    }

    function addListeners(){
        //下一步
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
    }
});