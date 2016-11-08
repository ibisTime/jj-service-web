define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
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
        $("#fwA").addClass("current");
        if(base.isCompUser()){
            getListCredentials();
            $("#compName").val(base.getSessionUser().name);
        }else{
            base.showMsg("您不是企业用户，无法新增服务！");
            setTimeout(function(){
                location.href = "../xuser/login.html?return="+base.makeReturnUrl();
            }, 1000);
        }
    }

    function getListCredentials(){
        base.getListCredentials({status: "1"})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    if(data.length){
                        addListener();
                        var html = "";
                        for(var i = 0; i < data.length; i++){
                            if(data[i].certificateType != "9"){
                                html += '<option value="'+data[i].certificateCode+'" cType="'+data[i].certificateType+'">'+serverType[data[i].certificateType]+'</option>';
                            }
                        }
                        $("#fwType").html(html);
                        $("#fwType").trigger("change");
                    }else{
                        base.showMsg("公司没有相关资质");
                    }
                }else{
                    base.showMsg("暂时无法获取公司资质");
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
            addServerInfo();
        });
        //拍摄/摄影 代表作品
        $("#worksBtn").on("click", function(){
            if(judgeImgType("worksFile")){
                ajaxImgUpload("worksFile", "works", "worksUrl", "worksBtn");
            }
        });
        //培训简历1
        $("#resume1Btn").on("click", function(){
            if(judgeFile("resume1File")){
                ajaxFileUpload("resume1File", "resume1Url", "resume1Btn");
            }
        });
        //培训简历2
        $("#resume2Btn").on("click", function(){
            if(judgeFile("resume2File")){
                ajaxFileUpload("resume2File", "resume2Url", "resume2Btn");
            }
        });
        //培训简历3
        $("#resume3Btn").on("click", function(){
            if(judgeFile("resume3File")){
                ajaxFileUpload("resume3File", "resume3Url", "resume3Btn");
            }
        });
        //培训课程
        $("#courseBtn").on("click", function(){
            if(judgeFile("courseFile")){
                ajaxFileUpload("courseFile", "courseUrl", "courseBtn");
            }
        });
        //店铺代运营-成功案例展示
        $("#sucCaseBtn").on("click", function(){
            if(judgeFile("sucCaseFile")){
                ajaxFileUpload("sucCaseFile", "sucCaseUrl", "sucCaseBtn");
            }
        });
        //美工外包 设计作品案例 
        $("#sj-worksBtn").on("click", function(){
            if(judgeImgType("sj-worksFile")){
                ajaxImgUpload("sj-worksFile", "sj-works", "sj-worksUrl", "sj-worksBtn");
            }
        });
        //客服外包 成功案例展示
        $("#kf-sucCaseBtn").on("click", function(){
            if(judgeFile("kf-sucCaseFile")){
                ajaxFileUpload("kf-sucCaseFile", "kf-sucCaseUrl", "kf-sucCaseBtn");
            }
        });
        //产业园 产业园照片1  
        $("#pic1Btn").on("click", function(){
            if(judgeImgType("pic1File")){
                ajaxImgUpload("pic1File", "pic1", "pic1Url", "pic1Btn");
            }
        });
        //产业园 产业园照片2  
        $("#pic2Btn").on("click", function(){
            if(judgeImgType("pic2File")){
                ajaxImgUpload("pic2File", "pic2", "pic2Url", "pic2Btn");
            }
        });
        //服务类型改变
        $("#fwType").on("change", function(){
            var topDiv = $("#topDiv"),
                type = $(this).find("option:selected").attr("cType");
            topDiv.find(".choseCont").addClass("hidden");
            topDiv.find(".choseCont" + type).removeClass("hidden");
            config = {};
        })
    }

    function ajaxImgUpload(fileId, imgId, urlId, btnId) {
        $("#" + btnId).addClass("bg-loading").attr("disabled", "disabled");
        $.ajaxFileUpload({
            url: APIURL + '/upload/file/img', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
                $("#" + imgId).attr("src", data.url);
                $("#" + urlId).val(data.url);
                $("#" + btnId).removeClass("bg-loading").removeAttr("disabled");
                base.showMsg("上传成功", 1000);
            },
            error: function (data, status, e){//服务器响应失败处理函数
                base.showMsg("非常抱歉，图片上传失败!");
                $("#" + btnId).removeClass("bg-loading").removeAttr("disabled");
                $("#" + fileId)[0].value = "";
            }
        });
    }
    function ajaxFileUpload(fileId, urlId, btnId) {
        $("#" + btnId).addClass("bg-loading").attr("disabled", "disabled");      
        $.ajaxFileUpload({
            url: APIURL + '/upload/file', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
                $("#" + urlId).val(data.url)
                $("#" + btnId).removeClass("bg-loading").removeAttr("disabled");
                base.showMsg("上传成功", 1000);
            },
            error: function (data, status, e){//服务器响应失败处理函数
                base.showMsg("非常抱歉，文件上传失败!");
                $("#" + btnId).removeClass("bg-loading").removeAttr("disabled");                
                $("#" + fileId)[0].value = "";
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

    function addServerInfo(){
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
        config.quoteMax = +quoteMax * 1000;
        config.quoteMin = +quoteMin * 1000;
        var opt = $("#fwType").find("option:selected");
        if(!opt.length){
            base.showMsg("未选择所属服务");
            return;
        }
        config.qualityCode = $("#fwType").val();
        var type = opt.attr("ctype");
        var description = $("#description").val();
        if(!description || description.trim() === ""){
            base.showMsg("详细描述不能为空");
            return;
        }
        config.description = description;
        /**
         * 1 软件开发 2摄影/拍摄 3 培训  4 店铺代运营 5 美工外包 6 客服外包 7 仓配服务 8 产业园 9 人才招聘
         */
        switch(type){
            case "1":
                addRjwbInfo();
                break;
            case "2":
                addSypsInfo();
                break;
            case "3":
                addPxInfo();
                break;
            case "4":
                addDpdyyInfo();
                break;
            case "5":
                addMgwbInfo();
                break;
            case "6":
                addKfwbInfo();
                break;
            case "7":
                addCpfwInfo();
                break;
            case "8":
                addCyyInfo();
                break;
            default:
                base.showMsg("未选中所属服务");
        }
    }
    function addRjwbInfo(){
        base.addRjwbInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addSypsInfo(){
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
        if(null == isDz || isDz.trim() === ""){
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
        base.addSypsInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addPxInfo(){
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
        base.addPxInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addDpdyyInfo(){
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
        base.addDpdyyInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addMgwbInfo(){
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
        config.homePrice = +homePrice * 1000;
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
        config.detailPrice = +detailPrice * 1000;
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
        config.bannerPrice = +bannerPrice * 1000;
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
        config.allPrice = +allPrice * 1000;
        var works = $("#sj-worksUrl").val();
        if(!works || works.trim() === ""){
            base.showMsg("设计作品案例不能为空");
            return;
        }
        config.works = works;
        base.addMgwbInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addKfwbInfo(data, topForm){
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
        config.mtradeAmount = +mtradeAmount * 1000;
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
        base.addKfwbInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addCpfwInfo(){
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
        base.addCpfwInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
                }
            });
    }

    function addCyyInfo(){
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
            base.showMsg("产业园照片1不能为空");
            return;
        }
        config.pic1 = pic1Url;
        var pic2Url = $("#pic2Url").val();
        if(!pic2Url || pic2Url.trim() === ""){
            base.showMsg("产业园照片2不能为空");
            return;
        }
        config.pic2 = pic2Url;
        base.addCyyInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增服务成功！");
                    setTimeout(function(){
                        base.goBackUrl("./index.html");
                    }, 1000);
                }else{
                    base.showMsg("非常抱歉，新增服务失败！");
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
});