define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var citylist, config = {},
        serverType = Dict.get("serverType1"),
        urgentLevel = Dict.get("urgentLevel"),
        serverStatus = Dict.get("serverStatus"),
        code = base.getUrlParam("code");
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin()){
            if(code){
                getDemandInfo();
                addListeners();
            }else{
                base.showMsg("未传入需求编号");
            }
        }else{
            base.showMsg("您没有权限查看当前页面");
            setTimeout(function(){
                location.href = "./login.html?return=" + base.makeReturnUrl();
            }, 1000);
        }
    }

    function getDemandInfo(){
        $.when(
            base.getDemandInfo({code: code}),
            base.getListComp({
                province: localStorage.getItem("province"),
                city: localStorage.getItem("city")
            }) )
            .then(function(res1, res2){
                res1 = res1[0]; res2 = res2[0];
                if(res1.success && res2.success){
                    addDemandInfo(res1.data, res2.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取到需求信息")
                }
            })
    }
    function addDemandInfo(data, compData){
        compData.push({
            code: "0",
            name: "所有企业"
        });
        var name = $("#name").val(data.name);
        $("#qualityCode").val(serverType[data.qualityCode]);
        $("#status").val(serverStatus[data.status]);
        if(data.status == "0"){
            $("#wgDiv").removeClass("hidden");
            $("#dealNote").val(data.dealNote);
        }
        for(var i = 0; i < compData.length; i++){
            if( data.expCompany == compData[i].code ){
                $("#expCompany").val(compData[i].name);
                break;
            }
        }
        $("#urgentLevel").val(urgentLevel[data.urgentLevel]);
        $("#description").val(data.description);
    }
    function addListeners(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
        if(base.isCompUser()){
            $("#sbtn").removeClass("hidden")
                .on("click", function(){
                    base.interested({
                        type: 3,
                        toCode: code
                    })
                        .then(function(res){
                            if(res.success){
                                base.showMsg("操作成功!");
                                setTimeout(function(){
                                    base.goBackUrl("./center.html");
                                }, 1000);
                            }else{
                                base.showMsg("操作失败，请稍后重试!");
                            }
                        });
                });
        }
        $("#navLeft").on("click", "li", function(){
            var idx = $(this).index();
            if(idx == 0){
                if(base.isCompUser()){
                    location.href = "../suser/center.html";
                }else{
                    location.href = "./center.html";
                }
            }else if(idx == 1){
                if(base.isCompUser()){
                    location.href = "../suser/rclist.html";
                }else{
                    location.href = "./rclist.html";
                }
            }else if(idx == 2){
                if(base.isCompUser()){
                    location.href = "../suser/fwlist.html";
                }else{
                    location.href = "./fwlist.html";
                }
            }
        });
    }
});