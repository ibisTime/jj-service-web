define([
    'app/controller/base'
], function (base) {
    var certCode = base.getUrlParam("code") || "",
        applyType = base.getUrlParam("t") || "",
        cCode = base.getUrlParam("cc") || "",
        dictData = {};
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin()){
            if(base.isCompUser()){
                if(applyType == "1"){
                    document.title = "修改资质";
                    $("#sbtn").val("修改");
                }else if(applyType == "2"){
                    document.title = "重新申请资质";
                    $("#sbtn").val("重新提交");
                }
                getListCredentials1();
                addListeners();
            }else{
                base.showMsg("您不是企业用户，无法查看当前页面!");
                setTimeout(function(){
                    location.href = "../xuser/login.html?return="+base.makeReturnUrl();
                }, 1000);
            }
        }else{
            location.href = "../xuser/login.html?return="+base.makeReturnUrl();
        }
        
    }
    function getListCredentials1(){
        base.getListCredentials1()
            .then(function(res){
                if(res.success){
                    if(res.data.length){
                        var data = res.data, html = "";
                        for(var i = 0; i < data.length; i++){
                            if(certCode){
                                if(certCode == data[i].code){
                                    html += '<option value="'+data[i].code+'" selected="selected">'+data[i].name+'</option>';
                                }else{
                                    html += '<option value="'+data[i].code+'">'+data[i].name+'</option>';
                                }
                            }else{
                                if(!i){
                                    html += '<option value="'+data[i].code+'" selected="selected">'+data[i].name+'</option>';
                                }else{
                                    html += '<option value="'+data[i].code+'">'+data[i].name+'</option>';
                                }
                            }
                            dictData[ data[i].code ] = data[i].description;
                        }
                        $("#certSelect").html(html).trigger("change");
                    }else{
                        base.showMsg("暂时没有资质可以申请！");
                    }
                }else{

                }
            });
    }
    function addListeners(){
        //下一步
        $("#sbtn").on("click", function(){
            var code = $("#certSelect").val();
            if(code){
                $(this).addClass("bg-loading").attr("disabled", "disabled");
                if(applyType == "1" || applyType == "2"){
                    editCertificates(code);
                }else{
                    applyCertificates(code);
                }
            }else{
                base.showMsg("未选择资质");
            }
        });
        $("#certSelect").on("change", function(){
            var opt = $(this).find("option:selected");
            $("#name").val(opt.text());
            $("#description").html( dictData[opt.val()] );
        });
        $("#goPrev").on("click", function(){
            location.href = "./apply-certificate1.html?return=" + base.getReturnParam();
        });
    }
    function editCertificates(code){
        base.editCertificates({
            code: cCode,
            certificateCode: code
        }).then(function(res){
            if(res.success){
                location.href = "./apply-certificate3.html?return=" + base.getReturnParam();
            }else{
                $("#sbtn").removeClass("bg-loading").removeAttr("disabled");                
                base.showMsg(res.msg);
            }
        });
    }
    function applyCertificates(code){
        base.applyCredentials({
            certificateCode: code
        }).then(function(res){
            if(res.success){
                location.href = "./apply-certificate3.html?return=" + base.getReturnParam();
            }else{
                $("#sbtn").removeClass("bg-loading").removeAttr("disabled");
                base.showMsg(res.msg);
            }
        });
    }
});