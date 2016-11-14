define([
    'app/controller/base',
    'app/util/dict',
    "Handlebars"
], function (base, Dict, Handlebars) {
    var feeMode = Dict.get("feeMode"),
        isDZ = Dict.get("isDZ"),
        payCycle = Dict.get("payCycle"),
        business = Dict.get("business"),
        serverType = Dict.get("serverType"),
        goodsKind = Dict.get("goodsKind"),
        serverStatus = Dict.get("serverStatus"),
        sCode = base.getUrlParam("code");

    init();

    function init(){
        $("#fwA").addClass("current");
        if(sCode){
            getServerInfo();
            addListener();
            if(!base.isCompUser()){
                $("#sbtn").removeClass('hidden');
            }
        }else{
            base.showMsg("未传入服务编号！");
        }
        
    }

    function getServerInfo(){
        $.when(
            base.getServerInfo({code: sCode}),
            base.getDictList({parentKey: "comp_scale"})
        ).then(function(res, res1){
            res = res[0];   res1 = res1[0];
            if(res.success && res1.success){
                var data = res.data;
                var data1 = res1.data;
                addServerInfo(data);
                if(base.isLogin()){
                    addCompInfo(data.company, data1);
                }
            }else{
                base.showMsg("非常抱歉，暂时无法获取公司信息！");
            }
        });
    }

    function addCompInfo(data, data1){
        var topForm = $("#compForm").detach();
        //公司
        if(data.type == "1"){
            $("#isComp", topForm).removeClass("hidden");

            $("#compName", topForm).val(data.name);
            $("#gsyyzzh", topForm).attr("src", data.gsyyzzh);
            $("#logo", topForm).attr("src", data.logo);
        //个体户
        }else{
            $("#isGt", topForm).removeClass("hidden");

            $("#realName", topForm).val(data.name);
            $("#sfz", topForm).attr("src", data.gsyyzzh);
            $("#gthtb", topForm).attr("src", data.logo);
        }

        $("#contacts", topForm).val(data.contacts);
        $("#mobile", topForm).val(data.mobile);
        $("#email", topForm).val(data.email);
        $("#qq", topForm).val(data.qq);
        $("#scale", topForm).val( getScale(data1, data.scale) );
        $("#address", topForm).html( (data.province || "") + "" + (data.city || "") + (data.area || "") + (data.address || ""));
        $("#slogan", topForm).val(data.slogan);
        $("#compDescription", topForm).val(data.description);

        $("#compDiv").removeClass("hidden").append(topForm);
    }
    function getScale(data, d){
        for(var i = 0; i < data.length; i++){
            if(data[i].dkey == d){
                return data[i].dvalue;
            }
        }
        return "";
    }

    function addServerInfo(data){
        var topForm = $("#topForm").detach();

        $("#fwName", topForm).val(data.name);
        $("#compName", topForm).val(data.company.name);
        $("#price", topForm).val((+data.quoteMin / 1000) + "元 ~ " + (+data.quoteMax / 1000) + "元");
        $("#fwType", topForm).val(serverType[data.type]);
        $("#status", topForm).val(serverStatus[data.status]);
        if(data.status == "0"){
            $("#wgDiv", topForm).removeClass();
            $("#dealNote", topForm).val(data.dealNote);
        }
        /**
         * 1 培训 2摄影/拍摄 3 美工外包  4 店铺代运营 5 客服外包 6 仓配服务 7 软件开发  8 产业园 9 人才招聘
         */
        switch(data.type){
            case "1":
                addPxInfo(data.serveTrain, topForm);
                break;
            case "2":
                addSypsInfo(data.servePhoto, topForm);
                break;
            case "3":
                addMgwbInfo(data.serveArt, topForm);
                break;
            case "4":
                addDpdyyInfo(data.serveShop, topForm);
                break;
            case "5":
                addKfwbInfo(data.serveKfwb, topForm);
                break;
            case "6":
                addCpfwInfo(data.serveCp, topForm);
                break;
            case "7":
                addRjwbInfo(data, topForm);
                break;
            case "8":
                addCyyInfo(data.serveCyy, topForm);
                break;
        }
        //$("#description", topForm).html(data.description);
        $("#description", topForm).val(data.description);
        $("#topDiv").removeClass("hidden").append(topForm);
    }

    function addRjwbInfo(data, topForm){}

    function addSypsInfo(data, topForm){
        $("#pspx", topForm).removeClass("hidden");
        $("#pyNum", topForm).val(data.pyNum);
        $("#sysNum", topForm).val(data.sysNum);
        $("#isDz", topForm).val(isDZ[data.isDz]);
        $("#scpslm", topForm).val(data.scpslm);
        $("#works", topForm).attr("href", data.works).text(data.works.substring(data.works.lastIndexOf("/")+1));
    }

    function addPxInfo(data, topForm){
        $("#px", topForm).removeClass("hidden");
        $("#lectorNum", topForm).val(data.lectorNum);
        $("#mtrainTimes", topForm).val(data.mtrainTimes);
        $("#mtrainNum", topForm).val(data.mtrainNum);
        $("#resume1", topForm).attr("href", data.resume1).text(data.resume1.substring(data.resume1.lastIndexOf("/")+1));
        $("#resume2", topForm).attr("href", data.resume2).text(data.resume2.substring(data.resume2.lastIndexOf("/")+1));
        $("#resume3", topForm).attr("href", data.resume3).text(data.resume3.substring(data.resume3.lastIndexOf("/")+1));
        $("#course", topForm).attr("href", data.course).text(data.course.substring(data.course.lastIndexOf("/")+1));
    }

    function addDpdyyInfo(data, topForm){
        $("#dpdyy", topForm).removeClass("hidden");
        var list = data.tgfw;
        for(var i = 0; i < list.length; i++){
            $("#tgfw"+list[i], topForm)[0].checked = true;
        }
        $("#feeMode", topForm).val( feeMode[data.feeMode] );
        $("#payCycle", topForm).val(payCycle[data.payCycle]);
        $("#scyylm", topForm).val(data.scyylm);
        $("#sucCase", topForm).attr("href", data.sucCase).text(data.sucCase.substring(data.sucCase.lastIndexOf("/")+1));
    }

    function addMgwbInfo(data, topForm){
        $("#mgwb", topForm).removeClass("hidden");
        $("#designNum", topForm).val(data.designNum);
        $("#sclm", topForm).val(data.sclm);
        $("#homeDays", topForm).val(data.homeDays);
        $("#homePrice", topForm).val(+data.homePrice / 1000);
        $("#detailDays", topForm).val(data.detailDays);
        $("#detailPrice", topForm).val(+data.detailPrice / 1000);
        $("#bannerDays", topForm).val(data.bannerDays);
        $("#bannerPrice", topForm).val(+data.bannerPrice / 1000);
        $("#allDays", topForm).val(data.allDays);
        $("#allPrice", topForm).val(+data.allPrice / 1000);
        $("#sj-works", topForm).attr("href", data.works).text(data.works.substring(data.works.lastIndexOf("/")+1));
    }

    function addKfwbInfo(data, topForm){
        $("#kfwb", topForm).removeClass("hidden");
        $("#kfNum", topForm).val(data.kfNum);
        $("#mtradeAmount", topForm).val(+data.mtradeAmount / 1000);
        var cDiv = $("#business", topForm);
        for(var i = 0; i < data.business.length; i++){
            cDiv.find("input[value='"+data.business[i]+"']")[0].checked = true;
        }
        $("#feeMode1", topForm).val(feeMode[data.feeMode]);
    }

    function addCpfwInfo(data, topForm){
        $("#cpfw", topForm).removeClass("hidden");
        $("#ckNum", topForm).val(data.ckNum);
        $("#ckArea", topForm).val(data.ckArea);
        var list = data.goodsKind;
        for(var i = 0; i < list.length; i++){
            $("#goodsKind"+list[i], topForm)[0].checked = true;
        }
        $("#dsendNum", topForm).val(data.dsendNum);
    }

    function addCyyInfo(data, topForm){
        $("#cyy", topForm).removeClass("hidden");
        $("#bgArea", topForm).val(data.bgArea);
        $("#availBgArea", topForm).val(data.availBgArea);
        $("#ccArea", topForm).val(data.ccArea);
        $("#availCcArea", topForm).val(data.availCcArea);
        var list = data.zzfw;
        if(list){
            for(var i = 0; i < list.length; i++){
                $("#zzfw"+list[i], topForm)[0].checked = true;
            }
        }else{
            $("#zzfw", topForm).html("无");
        }
        $("#introduce", topForm).html(data.introduce);
        $("#yhPolicy", topForm).html(data.yhPolicy);
        $("#pic1", topForm).attr("href", data.pic1).text(data.pic1.substring(data.pic1.lastIndexOf("/")+1));
        $("#pic2", topForm).attr("href", data.pic2).text(data.pic2.substring(data.pic2.lastIndexOf("/")+1));
    }

    function addListener(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("../server/index.html");
        });
        $("#sbtn").on("click", function(){
            if(base.isLogin()){
                interested();
            }else{
                location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
            }
        });
    }
    //感兴趣
    function interested(){
        $("#sbtn").val("提交中...").attr("disabled", "disabled");
        base.interested({
            type: "2",    //类型(1 职位申请 2 对服务感兴趣 3 对需求感兴趣 4 对简历感兴趣)
            toCode: sCode
        }).then(function(res){
            if(res.success){
                base.showMsg("操作成功！");
                setTimeout(function(){
                    location.href = "../xuser/fwlist.html?l=1";
                }, 1500);
            }else{
                base.showMsg(res.msg);
                $("#sbtn").val("感兴趣").removeAttr("disabled");
            }
        });
    }
});