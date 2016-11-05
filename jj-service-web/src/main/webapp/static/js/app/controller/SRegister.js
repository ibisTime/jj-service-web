define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {

    init();

    function init(){
        addListeners();
    }

    function addListeners(){
        $("#compType").on("change", function(){
            var value = $(this).val();
            if(value == "1"){
                $("#name-div").text("企业名称*");
                $("#gsyyzzh-div").text("企业营业执照*");
            }else{
                $("#name-div").text("真实姓名*");
                $("#gsyyzzh-div").text("身份证照片*");
            }
        });
        $("#registerBtn").on("click", function(){
            if(validate()){
                doReigster();
            }
        });
        $("#imgSbtn").on("click", function(){
            var filepath = $("#gsyyzzh").val();
            if(!filepath){
                base.showMsg("未选择文件");
                return;
            }
            var extStart = filepath.lastIndexOf(".");
            var ext = filepath.substring(extStart, filepath.length).toUpperCase();
            if (ext != ".PNG" && ext != ".JPG" && ext != ".JPEG"){
                base.showMsg("图片格式不支持!");
                return;
            }
            ajaxFileUpload();
        });
    }
    function ajaxFileUpload() {
        $.ajaxFileUpload({
            url: APIURL + '/upload/file/img', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'gsyyzzh', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
                $("#fileImg").attr("src", data.url);
                $("#gsyyzzhUrl").val(data.url)
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
                $("#gsyyzzh")[0].value = "";
            }
        });
    }
    function validate(){
        var type = $("#compType").val();
        if(!type || type.trim() === ""){
            base.showMsg("类型不能为空");
            return false;
        }
        var nameError = type == "1" ? "企业名称": "真实姓名";
        var gsyyzzhError = type == "1" ? "企业营业执照": "身份证照片";
        var name = $("#name").val();
        if(!name || name.trim() === ""){
            base.showMsg(nameError + "不能为空");
            return false;
        }
        var gsyyzzhUrl = $("#gsyyzzhUrl").val();
        if(!gsyyzzhUrl || gsyyzzhUrl.trim() === ""){
            base.showMsg(gsyyzzhError + "不能为空");
            return false;
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
        var loginName = $("#loginName").val();
        if(!loginName || loginName.trim() === ""){
            base.showMsg("用户名不能为空");
            return false;
        }
        var password = $("#password").val();
        if(!password || password.trim() === ""){
            base.showMsg("密码不能为空");
            return false;
        }
        var rePwd = $("#rePwd").val();
        if(!rePwd || rePwd.trim() === ""){
            base.showMsg("请再次输入密码");
            return false;
        }else if(rePwd !== password){
            base.showMsg("两次密码不同");
            return false;            
        }
        if(!$("#readCheck")[0].checked){
            base.showMsg("未勾选同意协议选项框");
            return false;
        }
        return true;
    }
    function doReigster(){
        $("#registerBtn").val("注册中...").attr("disabled", "disabled");
        var config = {
            type: $("#compType").val(),
            name: $("#name").val(),
            gsyyzzh: $("#gsyyzzhUrl").val(),
            contacts: $("#contacts").val(),
            mobile: $("#mobile").val(),
            loginName: $("#loginName").val(),
            password: $("#password").val(),
            province: localStorage.getItem("province"),
            city: localStorage.getItem("city"),
            area: localStorage.getItem("area")
        };
        base.companyRegister(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("注册成功！");
                    setTimeout(function(){
                        location.href = "../xuser/login.html?return=" + base.getReturnParam();
                    }, 1000);
                }else{
                    base.showMsg("注册失败！");
                }
            });
    }
});