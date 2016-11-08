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
        base.getServerInfo({code: sCode})
            .then(function(res){
                if(res.success){
                    addServerInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取职位信息!");
                }
            });
    }

    function addServerInfo(data){
        var topForm = $("#topForm").detach();

        $("#fwName", topForm).val(data.name);
        $("#compName", topForm).val(data.company.name);
        $("#price", topForm).val((+data.quoteMin / 1000) + "元 ~ " + (+data.quoteMax / 1000) + "元");
        $("#fwType", topForm).val(serverType[data.type]);
        /**
         * 1 软件开发 2摄影/拍摄 3 培训  4 店铺代运营 5 美工外包 6 客服外包 7 仓配服务 8 产业园
         */
        switch(data.type){
            case "1":
                addRjwbInfo(data, topForm);
                break;
            case "2":
                addSypsInfo(data.servePhoto, topForm);
                break;
            case "3":
                addPxInfo(data.serveTrain, topForm);
                break;
            case "4":
                addDpdyyInfo(data.serveShop, topForm);
                break;
            case "5":
                addMgwbInfo(data.serveArt, topForm);
                break;
            case "6":
                addKfwbInfo(data.serveKfwb, topForm);
                break;
            case "7":
                addCpfwInfo(data.serveCp, topForm);
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
        $("#works", topForm).attr("src", data.works);
    }

    function addPxInfo(data, topForm){
        $("#px", topForm).removeClass("hidden");
        $("#lectorNum", topForm).val(data.lectorNum);
        $("#mtrainTimes", topForm).val(data.mtrainTimes);
        $("#mtrainNum", topForm).val(data.mtrainNum);
        $("#resume1", topForm).attr("href", data.resume1);
        $("#resume2", topForm).attr("href", data.resume2);
        $("#resume3", topForm).attr("href", data.resume3);
        $("#course", topForm).attr("href", data.course);
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
        $("#sucCase", topForm).attr("href", data.sucCase);
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
        $("#sj-works", topForm).attr("src", data.works);
    }

    function addKfwbInfo(data, topForm){
        $("#kfwb", topForm).removeClass("hidden");
        $("#kfNum", topForm).val(data.kfNum);
        $("#mtradeAmount", topForm).val(+data.mtradeAmount / 1000);
        $("#business", topForm).val(business[data.business]);
        $("#feeMode1", topForm).val(feeMode[data.feeMode]);
        $("#kf-sucCase", topForm).attr("href", data.sucCase);
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
        for(var i = 0; i < list.length; i++){
            $("#zzfw"+list[i], topForm)[0].checked = true;
        }
        $("#introduce", topForm).html(data.introduce);
        $("#yhPolicy", topForm).html(data.yhPolicy);
        $("#pic1", topForm).attr("src", data.pic1);
        $("#pic2", topForm).attr("src", data.pic2);
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
                location.href = "../xuser/fwlist.html?l=1";
            }else{
                base.showMsg("非常抱歉，提交失败！");
                $("#sbtn").val("感兴趣").removeAttr("disabled");
            }
        });
    }
});