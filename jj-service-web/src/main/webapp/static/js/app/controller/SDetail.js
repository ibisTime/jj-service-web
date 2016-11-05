define([
    'app/controller/base',
    'app/util/dict',
    "Handlebars"
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        feeMode = Dict.get("feeMode"),
        isDZ = Dict.get("isDZ"),
        payCycle = Dict.get("payCycle"),
        business = Dict.get("business"),
        serverType = Dict.get("serverType"),
        goodsKind = Dict.get("goodsKind"),
        sCode = base.getUrlParam("code");

    init();

    function init(){
        if(sCode){
            var fwTypes = sessionStorage.getItem("fwTypes");
            if(fwTypes){
                addLeftNav($.parseJSON(fwTypes));
            }else{
                getDictList();
            }
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
        $("#price", topForm).val(data.quoteMin + "元 ~ " + data.quoteMax + "元");
        $("#fwType", topForm).val(serverType[data.type]);
        /**
         * 1 软件外包 2摄影/拍摄 3 培训 4 店铺代运营 5 美工外包 6客服外包 7仓配服务 8 产业园
         */
        switch(data.type){
            case "1":
                addRjwbInfo(data, topForm);
                break;
            case "2":
                addSypsInfo(data, topForm);
                break;
            case "3":
                addPxInfo(data, topForm);
                break;
            case "4":
                addDpdyyInfo(data, topForm);
                break;
            case "5":
                addMgwbInfo(data, topForm);
                break;
            case "6":
                addKfwbInfo(data, topForm);
                break;
            case "7":
                addCpfwInfo(data, topForm);
                break;
            case "8":
                addCyyInfo(data, topForm);
                break;
        }
        $("#description", topForm).html(data.description);
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
        $("#homePrice", topForm).val(data.homePrice);
        $("#detailDays", topForm).val(data.detailDays);
        $("#detailPrice", topForm).val(data.detailPrice);
        $("#bannerDays", topForm).val(data.bannerDays);
        $("#bannerPrice", topForm).val(data.bannerPrice);
        $("#allDays", topForm).val(data.allDays);
        $("#allPrice", topForm).val(data.allPrice);
        $("#sj-works", topForm).attr("src", data.works);
    }

    function addKfwbInfo(data, topForm){
        $("#kfwb", topForm).removeClass("hidden");
        $("#kfNum", topForm).val(data.kfNum);
        $("#mtradeAmount", topForm).val(data.mtradeAmount);
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
        data.pic1 && $("#pic1", topForm).attr("src", data.pic1);
        data.pic2 && $("#pic2", topForm).attr("src", data.pic2);
    }

    function getDictList(){
        base.getServerDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                }
            });
    }
    //添加左侧导航栏
    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
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
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code"), text = me.text();
            location.href = "./list.html?code=" + code + "&n=" + text.substr(0, text.length - 1);
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