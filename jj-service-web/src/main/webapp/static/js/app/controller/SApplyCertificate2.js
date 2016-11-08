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
                if(applyCertificates){
                    document.title = "修改资质";
                    $("#sbtn").val("保存");
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
                if(applyType == "1"){
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
            base.goBackUrl("./apply-certificate2.html");
        });
    }
    function editCertificates(code){
        base.editCertificates({
            code: cCode,
            certificateCode: code
        }).then(function(res){
            if(res.success){
                base.showMsg("修改成功！");
                setTimeout(function(){
                    base.goBackUrl("./center.html");
                }, 1000);
            }else{
                base.showMsg("非常抱歉，公司资质修改失败!");
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
                base.showMsg("非常抱歉，申请资质失败!");
            }
        });
    }
});