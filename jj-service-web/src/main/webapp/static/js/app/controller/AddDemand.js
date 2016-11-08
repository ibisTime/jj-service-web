define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var citylist, config = {};
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin() && base.isPerson()){
            getListCredentials1();
            getListComp();
            addListeners();
        }else{
            base.showMsg("您没有权限查看当前页面");
            setTimeout(function(){
                location.href = "./login.html?return=" + base.makeReturnUrl();
            }, 1000);
        }
    }

    function getListCredentials1(){
        base.getListCredentials1()
            .then(function(res){
                if(res.success && res.data.length){
                    for(var i = 0, html = "", data = res.data; i < data.length; i++){
                        html += '<option value="'+data[i].code+'">'+data[i].name+'</option>';
                    }
                    $("#qualityCode").html(html);
                }else{
                    base.showMsg("暂时无法获取到需求类型");
                }
            });
    }

    function getListComp(){
        base.getListComp({
            province: localStorage.getItem("province"),
            city: localStorage.getItem("city")
        })
            .then(function(res){
                if(res.success){
                    var html = "", data = res.data;
                    for(var i = 0; i < data.length; i++){
                        html += '<option value="'+data[i].code+'">'+data[i].name+'</option>';
                    }
                    $("#expCompany").html(html);
                }else{
                    base.showMsg("暂时无法获取企业信息");
                }
            });
    }

    function addListeners(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
        $("#sbtn").on("click", function(){
            if(validate()){
                addDemand();
            }
        });
    }

    function validate(){
        var name = $("#name").val();
        if(!name || name.trim() === ""){
            base.showMsg("需求名称不能为空");
            return false;
        }
        config.name = name;
        var qualityCode = $("#qualityCode").val();
        if(qualityCode == null || qualityCode.trim() === ""){
            base.showMsg("需求类型不能为空");
            return false;
        }
        config.qualityCode = qualityCode;
        var expCompany = $("#expCompany").val();
        if(expCompany == null || expCompany.trim() === ""){
            base.showMsg("意向企业不能为空");
            return false;
        }
        config.expCompany = expCompany;
        var urgentLevel = $("#urgentLevel").val();
        if(null == urgentLevel || urgentLevel.trim() === ""){
            base.showMsg("紧急程度不能为空");
            return false;
        }
        config.urgentLevel = urgentLevel;
        var description = $("#description").val();
        if(!description || description.trim() === ""){
            base.showMsg("需求描述不能为空");
            return false;
        }
        config.description = description;
        return true;
    }

    function addDemand(){
        base.addDemand(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("新增成功");
                    setTimeout(function(){
                        base.goBackUrl("./center.html");
                    }, 1000);
                }else{
                    base.showMsg(res.msg);
                }
            });
    }
});