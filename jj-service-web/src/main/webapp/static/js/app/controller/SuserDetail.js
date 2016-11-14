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
        $.when(
            base.getCompanyInfo({code: code}),
            base.getDictList({parentKey: "comp_scale"})
        ).then(function(res, res1){
            res = res[0];   res1 = res1[0];
            if(res.success && res1.success){
                addCompInfo(res.data, res1.data);
            }else{
                base.showMsg("非常抱歉，暂时无法获取公司信息！");
            }
        });
    }
    
    function addCompInfo(data, data1){
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
        $("#scale").val( getScale(data1, data.scale) );
        $("#address").val(data.province + data.city + (data.area || "") );
        $("#slogan").val(data.slogan);
        $("#remark").val(data.remark);        
        $("#description").val(data.description);
    }

    function getScale(data, d){
        for(var i = 0; i < data.length; i++){
            if(data[i].dkey == d){
                return data[i].dvalue;
            }
        }
        return "";
    }

    function addListeners(){
        //下一步
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
    }
});