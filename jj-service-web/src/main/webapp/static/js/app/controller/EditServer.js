define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        feeMode = Dict.get("feeMode"),
        isDZ = Dict.get("isDZ"),
        payCycle = Dict.get("payCycle"),
        business = Dict.get("business"),
        goodsKind = Dict.get("goodsKind"),
        serverType = Dict.get("serverType"),
        sCode = base.getUrlParam("code"),
        config = {};

    init();

    function init(){
        if(base.isCompUser()){
            getServerInfo();
            addListener();
            $("#compName").val(base.getSessionUser().name);
            var fwTypes = sessionStorage.getItem("fwTypes");
            if(fwTypes){
                addLeftNav($.parseJSON(fwTypes));
            }else{
                getDictList();
            }
        }else{
            base.showMsg("您不是企业用户，无法新增服务！");
            setTimeout(function(){
                location.href = "../xuser/login.html?return="+base.makeReturnUrl();
            }, 1000);
        }
    }
    function getServerInfo(){
        base.getServerInfo({code: sCode})
            .then(function(res){
                if(res.success){
                    addServerInfo(res.data);
                }else{
                    base.showMsg("暂时无法获取服务信息");
                }
            });
    }
    function addListener(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./index.html");
        });
        //新增服务
        $("#sbtn").on("click", function(){
            editServerInfo();
        });
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code"), text = me.text();
            location.href = "./list.html?code=" + code + "&n=" + text.substr(0, text.length - 1);
        });
        //拍摄/摄影 代表作品
        $("#worksBtn").on("click", function(){
            if(judgeImgType("worksFile")){
                ajaxImgUpload("worksFile", "works", "worksUrl");
            }
        });
        //培训简历1
        $("#resume1Btn").on("click", function(){
            if(judgeFile("resume1File")){
                ajaxFileUpload("resume1File", "resume1Url");
            }
        });
        //培训简历2
        $("#resume2Btn").on("click", function(){
            if(judgeFile("resume2File")){
                ajaxFileUpload("resume2File", "resume2Url");
            }
        });
        //培训简历3
        $("#resume3Btn").on("click", function(){
            if(judgeFile("resume3File")){
                ajaxFileUpload("resume3File", "resume3Url");
            }
        });
        //培训课程
        $("#courseBtn").on("click", function(){
            if(judgeFile("courseFile")){
                ajaxFileUpload("courseFile", "courseUrl");
            }
        });
        //店铺代运营-成功案例展示
        $("#sucCaseBtn").on("click", function(){
            if(judgeFile("sucCaseFile")){
                ajaxFileUpload("sucCaseFile", "sucCaseUrl");
            }
        });
        //美工外包 设计作品案例 
        $("#sj-worksBtn").on("click", function(){
            if(judgeImgType("sj-worksFile")){
                ajaxImgUpload("sj-worksFile", "sj-works", "sj-worksUrl");
            }
        });
        //客服外包 成功案例展示
        $("#kf-sucCaseBtn").on("click", function(){
            if(judgeFile("kf-sucCaseFile")){
                ajaxFileUpload("kf-sucCaseFile", "kf-sucCaseUrl");
            }
        });
        //产业园 产业园照片  
        $("#pic1Btn").on("click", function(){
            if(judgeImgType("pic1File")){
                ajaxImgUpload("pic1File", "pic1", "pic1Url");
            }
        });
    }

    function addServerInfo(data){
        var topForm = $("#topForm").detach();

        $("#fwName", topForm).val(data.name);
        $("#compName", topForm).val(data.company.name);
        $("#quoteMin", topForm).val(data.quoteMin);
        $("#quoteMax", topForm).val(data.quoteMax);
        $("#realType", topForm).val(data.type);
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
        $("#description", topForm).val(data.description);
        $("#topDiv").removeClass("hidden").append(topForm);
    }

    function addRjwbInfo(data, topForm){}

    function addSypsInfo(data, topForm){
        $("#pspx", topForm).removeClass("hidden");
        $("#pyNum", topForm).val(data.pyNum);
        $("#sysNum", topForm).val(data.sysNum);
        $("#isDz", topForm).find("option[value='"+data.isDz+"']")[0].selected = true;
        $("#scpslm", topForm).val(data.scpslm);
        $("#works", topForm).attr("src", data.works);
        $("#worksUrl", topForm).val(data.works);
    }

    function addPxInfo(data, topForm){
        $("#px", topForm).removeClass("hidden");
        $("#lectorNum", topForm).val(data.lectorNum);
        $("#mtrainTimes", topForm).val(data.mtrainTimes);
        $("#mtrainNum", topForm).val(data.mtrainNum);
        $("#resume1Url", topForm).val(data.resume1);
        $("#resume1Url1", topForm).text(data.resume1);
        $("#resume2Url", topForm).val(data.resume2);
        $("#resume2Url1", topForm).text(data.resume2);
        $("#resume3Url", topForm).val(data.resume3);
        $("#resume3Url1", topForm).text(data.resume3);
        $("#courseUrl", topForm).val(data.course);
        $("#courseUrl1", topForm).text(data.course);
    }

    function addDpdyyInfo(data, topForm){
        $("#dpdyy", topForm).removeClass("hidden");
        var list = data.tgfw;
        for(var i = 0; i < list.length; i++){
            $("#tgfw"+list[i], topForm)[0].checked = true;
        }
        $("#feeMode", topForm).find("option[value='"+data.feeMode+"']")[0].selected = true;
        $("#payCycle", topForm).find("option[value='"+data.payCycle+"']")[0].selected = true;
        $("#scyylm", topForm).val(data.scyylm);
        $("#sucCaseUrl", topForm).val(data.sucCase);
        $("#sucCaseUrl1", topForm).text(data.sucCase);
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
        $("#sj-worksUrl", topForm).val(data.works);
    }

    function addKfwbInfo(data, topForm){
        $("#kfwb", topForm).removeClass("hidden");
        $("#kfNum", topForm).val(data.kfNum);
        $("#mtradeAmount", topForm).val(data.mtradeAmount);
        $("#business", topForm).find("option[value='"+data.business+"']")[0].selected = true;
        $("#feeMode1", topForm).find("option[value='"+data.feeMode+"']")[0].selected = true;
        $("#kf-sucCaseUrl", topForm).val(data.sucCase);
        $("#kf-sucCaseUrl1", topForm).text(data.sucCase);
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
        $("#introduce", topForm).val(data.introduce);
        $("#yhPolicy", topForm).html(data.yhPolicy);
        $("#pic1", topForm).attr("src", data.pic1);
        $("#pic1Url", topForm).val(data.pic1);
    }

    function ajaxImgUpload(fileId, imgId, urlId) {
        $.ajaxFileUpload({
            url: APIURL + '/upload/file/img', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
                $("#" + imgId).attr("src", data.url);
                $("#" + urlId).val(data.url);
                if (typeof (data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e){//服务器响应失败处理函数
                base.showMsg("非常抱歉，图片上传失败!");
                $("#fileId")[0].value = "";
            }
        });
    }
    function ajaxFileUpload(fileId, urlId) {
        $.ajaxFileUpload({
            url: APIURL + '/upload/file', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
                $("#" + urlId).val(data.url);
                $("#" + urlId + "1").text(data.url);
                if (typeof (data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e){//服务器响应失败处理函数
                base.showMsg("非常抱歉，图片上传失败!");
                $("#fileId")[0].value = "";
            }
        });
    }
    function judgeFile(id){
        var filepath = $("#" + id).val();
        if(!filepath){
            base.showMsg("未选择文件");
            return false;
        }
        return true;
    }
    function judgeImgType(id){
        var filepath = $("#" + id).val();
        if(!filepath){
            base.showMsg("未选择文件");
            return false;
        }
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        if (ext != ".PNG" && ext != ".JPG" && ext != ".JPEG"){
            base.showMsg("图片格式不支持!");
            return false;
        }
        return true;
    }

    function editServerInfo(){
        var fwName = $("#fwName").val();
        if(!fwName || fwName.trim() === ""){
            base.showMsg("服务名称不能为空");
            return;
        }
        config.name = fwName;
        var quoteMin = $("#quoteMin").val();
        if(!quoteMin || quoteMin.trim() === ""){
            base.showMsg("最小价格不能为空");
            return;
        }else if( !/^\d+(\.\d{1,2})?$/.test(quoteMin) ){
            base.showMsg("最小价格不能超过两位小数");
            return;
        }
        var quoteMax = $("#quoteMax").val();
        if(!quoteMax || quoteMax.trim() === ""){
            base.showMsg("最大价格不能为空");
            return;
        }else if( !/^\d+(\.\d{1,2})?$/.test(quoteMax) ){
            base.showMsg("最大价格不能超过两位小数");
            return;
        }else if(+quoteMin > +quoteMax){
            base.showMsg("最小价格不能大于最大价格");
            return;
        }
        config.quoteMax = quoteMax;
        config.quoteMin = quoteMin;
        var type = $("#realType").val();
        if(!type){
            base.showMsg("未选择所属服务");
            return;
        }
        //config.qualityCode = type;
        var description = $("#description").val();
        if(!description || description.trim() === ""){
            base.showMsg("详细描述不能为空");
            return;
        }
        config.description = description;
        config.code = sCode;
        /**
         * 1 软件外包 2摄影/拍摄 3 培训 4 店铺代运营 5 美工外包 6客服外包 7仓配服务 8 产业园
         */
        switch(type){
            case "1":
                editRjwbInfo();
                break;
            case "2":
                editSypsInfo();
                break;
            case "3":
                editPxInfo();
                break;
            case "4":
                editDpdyyInfo();
                break;
            case "5":
                editMgwbInfo();
                break;
            case "6":
                editKfwbInfo();
                break;
            case "7":
                editCpfwInfo();
                break;
            case "8":
                editCyyInfo();
                break;
            default:
                base.showMsg("未选中所属服务");
        }
    }
    function editRjwbInfo(){
        base.editRjwbInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editSypsInfo(){
        var pyNum = $("#pyNum").val();
        if(!pyNum || pyNum.trim() === ""){
            base.showMsg("棚影数量不能为空");
            return;
        }
        config.pyNum = pyNum;
        var sysNum = $("#sysNum").val();
        if(!sysNum || sysNum.trim() === ""){
            base.showMsg("摄影师数量不能为空");
            return;
        }
        config.sysNum = sysNum;
        var isDz = $("#isDz").val();
        if(!isDz || isDz.trim() === ""){
            base.showMsg("是否接受定制需求不能为空");
            return;
        }
        config.isDz = isDz;
        var scpslm = $("#scpslm").val();
        if(!scpslm || scpslm.trim() === ""){
            base.showMsg("擅长拍摄类目不能为空");
            return;
        }
        config.scpslm = scpslm;
        var worksUrl = $("#worksUrl").val();
        if(!worksUrl || worksUrl.trim() === ""){
            base.showMsg("擅长拍摄类目不能为空");
            return;
        }
        config.works = worksUrl;
        base.editSypsInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editPxInfo(){
        var lectorNum = $("#lectorNum").val();
        if(!lectorNum || lectorNum.trim() === ""){
            base.showMsg("讲师人数不能为空");
            return;
        }else if(!/^\d+$/.test(lectorNum)){
            base.showMsg("讲师人数必须为整数");
            return;
        }
        config.lectorNum = lectorNum;
        var mtrainTimes = $("#mtrainTimes").val();
        if(!mtrainTimes || mtrainTimes.trim() === ""){
            base.showMsg("月均培训场次不能为空");
            return;
        }else if(!/^\d+$/.test(mtrainTimes)){
            base.showMsg("月均培训场次必须为整数");
            return;
        }
        config.mtrainTimes = mtrainTimes;
        var mtrainNum = $("#mtrainNum").val();
        if(!mtrainNum || mtrainNum.trim() === ""){
            base.showMsg("月均培训人数不能为空");
            return;
        }else if(!/^\d+$/.test(mtrainNum)){
            base.showMsg("月均培训人数必须为整数");
            return;
        }
        config.mtrainNum = mtrainNum;
        var resume1 = $("#resume1Url").val();
        if(!resume1 || resume1.trim() === ""){
            base.showMsg("核心讲师简历1不能为空");
            return;
        }
        config.resume1 = resume1;
        var resume2 = $("#resume2Url").val();
        if(!resume2 || resume2.trim() === ""){
            base.showMsg("核心讲师简历2不能为空");
            return;
        }
        config.resume2 = resume2;
        var resume3 = $("#resume3Url").val();
        if(!resume3 || resume3.trim() === ""){
            base.showMsg("核心讲师简历3不能为空");
            return;
        }
        config.resume3 = resume3;
        var course = $("#courseUrl").val();
        if(!course || course.trim() === ""){
            base.showMsg("核心讲师简历3不能为空");
            return;
        }
        config.course = course;
        base.editPxInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editDpdyyInfo(){
        var checkbox = $("#tgfw").find("input[type='checkbox']:checked");
        if(!checkbox.length){
            base.showMsg("提供服务不能为空");
            return;
        }
        var tgfw = "";
        for(var i = 0; i < checkbox.length; i++){
            tgfw = tgfw + checkbox[i].value;
        }
        config.tgfw = tgfw;
        var feeMode = $("#feeMode").val();
        if(!feeMode || feeMode.trim() === ""){
            base.showMsg("收费模式不能为空");
            return;
        }
        config.feeMode = feeMode;
        var payCycle = $("#payCycle").val();
        if(!payCycle || payCycle.trim() === ""){
            base.showMsg("付款周期不能为空");
            return;
        }
        config.payCycle = payCycle;
        var scyylm = $("#scyylm").val();
        if(!scyylm || scyylm.trim() === ""){
            base.showMsg("付款周期不能为空");
            return;
        }
        config.scyylm = scyylm;
        var sucCaseUrl = $("#sucCaseUrl").val();
        if(!sucCaseUrl || sucCaseUrl.trim() === ""){
            base.showMsg("付款周期不能为空");
            return;
        }
        config.sucCase = sucCaseUrl;
        base.editDpdyyInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editMgwbInfo(){
        var designNum = $("#designNum").val();
        if(!designNum || designNum.trim() === ""){
            base.showMsg("设计师人数不能为空");
            return;
        }else if(!/^\d+$/.test(designNum)){
            base.showMsg("设计师人数必须为整数");
            return;
        }
        config.designNum = designNum;
        var sclm = $("#sclm").val();
        if(!sclm || sclm.trim() === ""){
            base.showMsg("擅长类目不能为空");
            return;
        }
        config.sclm = sclm;
        var homeDays = $("#homeDays").val();
        if(!homeDays || homeDays.trim() === ""){
            base.showMsg("首页天数不能为空");
            return;
        }else if(!/^\d+$/.test(homeDays)){
            base.showMsg("首页天数必须为整数");
            return;
        }
        config.homeDays = homeDays;
        var homePrice = $("#homePrice").val();
        if(!homePrice || homePrice.trim() === ""){
            base.showMsg("首页价格不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(homePrice)){
            base.showMsg("首页价格必须为2位以内小数");
            return;
        }
        config.homePrice = homePrice;
        var detailDays = $("#detailDays").val();
        if(!detailDays || detailDays.trim() === ""){
            base.showMsg("详情页天数不能为空");
            return;
        }else if(!/^\d+$/.test(detailDays)){
            base.showMsg("详情页天数必须为整数");
            return;
        }
        config.detailDays = detailDays;
        var detailPrice = $("#detailPrice").val();
        if(!detailPrice || detailPrice.trim() === ""){
            base.showMsg("详情页价格不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(detailPrice)){
            base.showMsg("详情页价格必须为2位以内小数");
            return;
        }
        config.detailPrice = detailPrice;
        var bannerDays = $("#bannerDays").val();
        if(!bannerDays || bannerDays.trim() === ""){
            base.showMsg("海报图天数不能为空");
            return;
        }else if(!/^\d+$/.test(bannerDays)){
            base.showMsg("海报图天数必须为整数");
            return;
        }
        config.bannerDays = bannerDays;
        var bannerPrice = $("#bannerPrice").val();
        if(!bannerPrice || bannerPrice.trim() === ""){
            base.showMsg("海报图价格不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(bannerPrice)){
            base.showMsg("海报图价格必须为2位以内小数");
            return;
        }
        config.bannerPrice = bannerPrice;
        var allDays = $("#allDays").val();
        if(!allDays || allDays.trim() === ""){
            base.showMsg("全店设计天数不能为空");
            return;
        }else if(!/^\d+$/.test(allDays)){
            base.showMsg("全店设计天数必须为整数");
            return;
        }
        config.allDays = allDays;
        var allPrice = $("#allPrice").val();
        if(!allPrice || allPrice.trim() === ""){
            base.showMsg("全店设计价格不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(allPrice)){
            base.showMsg("全店设计价格必须为2位以内小数");
            return;
        }
        config.allPrice = allPrice;
        var works = $("#sj-worksUrl").val();
        if(!works || works.trim() === ""){
            base.showMsg("设计作品案例不能为空");
            return;
        }
        config.works = works;
        base.editMgwbInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editKfwbInfo(data, topForm){
        var kfNum = $("#kfNum").val();
        if(!kfNum || kfNum.trim() === ""){
            base.showMsg("客服人数不能为空");
            return;
        }else if(!/^\d+$/.test(kfNum)){
            base.showMsg("客服人数必须为整数");
            return;
        }
        config.kfNum = kfNum;
        var mtradeAmount = $("#mtradeAmount").val();
        if(!mtradeAmount || mtradeAmount.trim() === ""){
            base.showMsg("月均交易额不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(mtradeAmount)){
            base.showMsg("月均交易额必须为2位以内小数");
            return;
        }
        config.mtradeAmount = mtradeAmount;
        var checkbox = $("#business").find("input[type='checkbox']:checked");
        if(!checkbox.length){
            base.showMsg("客服业务不能为空");
            return;
        }
        var business = "";
        for(var i = 0; i < checkbox.length; i++){
            business = business + checkbox[i].value;
        }
        config.business = business;
        var feeMode1 = $("#feeMode1").val();
        if(!feeMode1 || feeMode1.trim() === ""){
            base.showMsg("收费模式不能为空");
            return;
        }
        config.feeMode = feeMode1;
        var sucCase = $("#kf-sucCaseUrl").val();
        if(!sucCase || sucCase.trim() === ""){
            base.showMsg("成功案例展示不能为空");
            return;
        }
        config.sucCase = sucCase;
        base.editKfwbInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editCpfwInfo(){
        var ckNum = $("#ckNum").val();
        if(!ckNum || ckNum.trim() === ""){
            base.showMsg("仓库数量不能为空");
            return;
        }else if(!/^\d+$/.test(ckNum)){
            base.showMsg("仓库数量必须为整数");
            return;
        }
        config.ckNum = ckNum;
        var ckArea = $("#ckArea").val();
        if(!ckArea || ckArea.trim() === ""){
            base.showMsg("仓库面积不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(ckArea)){
            base.showMsg("仓库面积必须为2位以内小数");
            return;
        }
        config.ckArea = ckArea;
        var checkbox = $("#goodsKind").find("input[type='checkbox']:checked");
        if(!checkbox.length){
            base.showMsg("货品种类不能为空");
            return;
        }
        var goodsKind = "";
        for(var i = 0; i < checkbox.length; i++){
            goodsKind = goodsKind + checkbox[i].value;
        }
        config.goodsKind = goodsKind;
        var dsendNum = $("#dsendNum").val();
        if(!dsendNum || dsendNum.trim() === ""){
            base.showMsg("日均发货数量不能为空");
            return;
        }else if(!/^\d+$/.test(dsendNum)){
            base.showMsg("日均发货数量必须为整数");
            return;
        }
        config.dsendNum = dsendNum;
        base.editCpfwInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
    }

    function editCyyInfo(){
        var bgArea = $("#bgArea").val();
        if(!bgArea || bgArea.trim() === ""){
            base.showMsg("办公总面积不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(bgArea)){
            base.showMsg("办公总面积必须为2位以内小数");
            return;
        }
        config.bgArea = bgArea;
        var availBgArea = $("#availBgArea").val();
        if(!availBgArea || availBgArea.trim() === ""){
            base.showMsg("剩余可用面积不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(availBgArea)){
            base.showMsg("剩余可用面积必须为2位以内小数");
            return;
        }
        config.availBgArea = availBgArea;
        var ccArea = $("#ccArea").val();
        if(!ccArea || ccArea.trim() === ""){
            base.showMsg("仓储总面积不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(ccArea)){
            base.showMsg("仓储总面积必须为2位以内小数");
            return;
        }
        config.ccArea = ccArea;
        var availCcArea = $("#availCcArea").val();
        if(!availCcArea || availCcArea.trim() === ""){
            base.showMsg("剩余可用面积不能为空");
            return;
        }else if(!/^\d+(\.\d{1,2})?$/.test(availCcArea)){
            base.showMsg("剩余可用面积必须为2位以内小数");
            return;
        }
        config.availCcArea = availCcArea;
        var checkbox = $("#zzfw").find("input[type='checkbox']:checked");
        if(!checkbox.length){
            base.showMsg("增值服务不能为空");
            return;
        }
        var zzfw = "";
        for(var i = 0; i < checkbox.length; i++){
            zzfw = zzfw + checkbox[i].value;
        }
        config.zzfw = zzfw;
        var introduce = $("#introduce").val();
        if(!introduce || introduce.trim() === ""){
            base.showMsg("产业园详细介绍不能为空");
            return;
        }
        config.introduce = introduce;
        var yhPolicy = $("#yhPolicy").val();
        if(!yhPolicy || yhPolicy.trim() === ""){
            base.showMsg("优惠政策不能为空");
            return;
        }
        config.yhPolicy = yhPolicy;
        var pic1Url = $("#pic1Url").val();
        if(!pic1Url || pic1Url.trim() === ""){
            base.showMsg("产业园照片不能为空");
            return;
        }
        config.pic1 = pic1Url;
        base.editCyyInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，修改服务失败！");
                }
            });
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
});