define([
    'app/controller/base'
], function (base) {
    var config = {};
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin()){
            if(base.isCompUser()){
                getCompanyInfo();
                addListeners();
            }else{
                base.showMsg("您不是企业用户，请先进行企业注册！");
                setTimeout(function(){
                    location.href = "../xuser/login.html?return="+base.makeReturnUrl();
                }, 1000);
            }
        }else{
            location.href = "../xuser/login.html?return="+base.makeReturnUrl();
        }
        
    }

    function getCompanyInfo(){
        base.getCompanyInfo({code: base.getCompanyCode()})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    config = data;
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
                $("#qyyyzzUrl").val(data.gsyyzzh);
            }
            if(data.logo){
                $("#qytbImg").attr("src", data.logo);
                $("#qytbUrl").val(data.logo);
            }
        //个体户
        }else{
            $("#gthDiv").removeClass("hidden");

            $("#realName").val(data.name);
            if(data.gsyyzzh){
                $("#sfz").attr("src", data.gsyyzzh);
                $("#sfzUrl").val(data.gsyyzzh);
            }
            if(data.logo){
                $("#gthtb").attr("src", data.logo);
                $("#gthtbUrl").val(data.logo);
            }
        }

        $("#contacts").val(data.contacts);
        $("#mobile").val(data.mobile);
        $("#email").val(data.email);
        $("#qq").val(data.qq);
        $("#scale").val(data.scale);
        $("#address")
            .citySelect({
                prov: data.province,
                city: data.city,
                dist: data.area,
                url: "/static/js/lib/city.min.json"
            });
        $("#slogan").val(data.slogan);
        $("#remark").val(data.remark);        
        $("#description").val(data.description);
    }

    function addListeners(){
        //下一步
        $("#sbtn").on("click", function(){
            if(validate()){
                editCompUserInfo();
            }
        });
        $("#sfzBtn").on("click", function(){
            if(!judgeImgType("sfzFile")){
                base.showMsg("图片格式不支持!");
                return;
            }
            ajaxFileUpload("sfzFile", "sfz", "sfzUrl", "sfzBtn");
        });
        $("#gthtbBtn").on("click", function(){
            if(judgeImgType("gthtbFile")){
                ajaxFileUpload("gthtbFile", "gthtb", "gthtbUrl", "gthtbBtn");
            }
        });
        $("#qyyyzzBtn").on("click", function(){
            if(judgeImgType("qyyyzzFile")){
                ajaxFileUpload("qyyyzzFile", "qyyyzzImg", "qyyyzzUrl", "qyyyzzBtn");
            }
        });
        $("#qytbBtn").on("click", function(){
            if(judgeImgType("qytbFile")){
                ajaxFileUpload("qytbFile", "qytbImg", "qytbUrl", "qytbBtn");
            }
        });
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

    function editCompUserInfo(){
        if(config.type == "1"){
             config.name = $("#compName").val();
             config.gsyyzzh = $("#qyyyzzUrl").val();
             config.logo = $("#qytbUrl").val();
        }else{
            config.name = $("#realName").val();
            config.gsyyzzh = $("#sfzUrl").val();
            config.logo = $("#gthtbUrl").val();
        }
        config.contacts = $("#contacts").val();
        config.mobile = $("#mobile").val();
        config.email = $("#email").val();
        config.qq = $("#qq").val();
        config.scale = $("#scale").val();
        config.description = $("#description").val();
        config.province = $("#province").val();
        config.city = $("#city").val();
        config.area = $("#area").val();
        config.slogan = $("#slogan").val();
        config.remark = $("#remark").val();

        base.editCompInfo(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改成功！");
                    setTimeout(function(){
                        base.goBackUrl("./center.html");
                    }, 1000);
                }else{
                    base.showMsg(res.msg);
                }
            });
    }

    function ajaxFileUpload(fileId, imgId, urlId, btnId) {
        $("#" + btnId).addClass("bg-loading").attr("disabled", "disabled");
        $.ajaxFileUpload({
            url: APIURL + '/upload/file/img', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
                $("#" + imgId).attr("src", data.url);
                $("#" + urlId).val(data.url)
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

    function validate(){
        //个体户
        if(base.isCompOne()){
            var realName = $("#realName").val();
            if(!realName || realName.trim() === ""){
                base.showMsg("真实姓名不能为空");
                return false;
            }
            var sfzUrl = $("#sfzUrl").val();
            if(!sfzUrl || sfzUrl.trim() === ""){
                base.showMsg("身份证照片不能为空");
                return false;
            }
            var gthtbUrl = $("#gthtbUrl").val();
            if(!gthtbUrl || gthtbUrl.trim() === ""){
                base.showMsg("个体户图标不能为空");
                return false;
            }
        //企业
        }else{
            var compName = $("#compName").val();
            if(!compName || compName.trim() === ""){
                base.showMsg("企业名称不能为空");
                return false;
            }
            var qyyyzzUrl = $("#qyyyzzUrl").val();
            if(!qyyyzzUrl || qyyyzzUrl.trim() === ""){
                base.showMsg("企业营业执照不能为空");
                return false;
            }
            var qytbUrl = $("#qytbUrl").val();
            if(!qytbUrl || qytbUrl.trim() === ""){
                base.showMsg("企业图标不能为空");
                return false;
            }
        }
        var contacts = $("#contacts").val();
        if(!contacts || contacts.trim() === ""){
            base.showMsg("联系人不能为空");
            return false;
        }
        var mobile = $("#mobile").val();
        if(!mobile || mobile.trim() === ""){
            base.showMsg("联系人手机不能为空");
            return false;
        }else if(!/^1[3,4,5,7,8]\d{9}$/.test(mobile)){
            base.showMsg("联系人手机格式错误");
            return false;
        }
        var email = $("#email").val();
        if(email && email.trim() !== ""){
            if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
                base.showMsg("邮箱格式错误");
                return;
            }
        }
        var slogan = $("#slogan").val();
        if(!slogan || slogan.trim() === ""){
            base.showMsg("广告语不能为空");
            return false;
        }
        var remark = $("#remark").val();
        if(!remark || remark.trim() === ""){
            base.showMsg("报价区间不能为空");
            return false;
        }
        return true;
    }
});