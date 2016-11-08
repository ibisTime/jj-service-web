define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var citylist, config = {},
        serverType = Dict.get("serverType1"),
        urgentLevel = Dict.get("urgentLevel"),
        code = base.getUrlParam("code");
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin() && base.isPerson()){
            if(code){
                getDemandInfo();
                addListeners();
            }else{
                base.showMsg("未传入需求编号");
            }
        }else{
            base.showMsg("您没有权限查看当前页面");
            setTimeout(function(){
                location.href = "./login.html?return=" + base.makeReturnUrl();
            }, 1000);
        }
    }

    function getDemandInfo(){
        $.when(
            base.getDemandInfo({code: code}),
            base.getListComp({
                province: localStorage.getItem("province"),
                city: localStorage.getItem("city")
            }) )
            .then(function(res1, res2){
                res1 = res1[0]; res2 = res2[0];
                if(res1.success && res2.success){
                    addListComp(res2.data);
                    addDemandInfo(res1.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取到需求信息")
                }
            })
    }
    function addDemandInfo(data){
        addSType();
        var name = $("#name").val(data.name);
        $("#qualityCode").find("option[value='"+data.qualityCode+"']")[0].selected = true;
        $("#expCompany").find("option[value='"+data.expCompany+"']")[0].selected = true;
        $("#urgentLevel").find("option[value='"+data.urgentLevel+"']")[0].selected = true;
        $("#description").val(data.description);
        config = data;
    }
    function addSType(){
        var html = "";
        for(var n in serverType){
            html += "<option value='"+n+"'>"+serverType[n]+"</option>";
        }
        $("#qualityCode").html(html);
    }
    function addListComp(data){
        for(var i = 0, html = ""; i < data.length; i++){
            html += '<option value="'+data[i].code+'">'+data[i].name+'</option>';
        }
        $("#expCompany").html(html);
    }

    function addListeners(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
        $("#sbtn").on("click", function(){
            if(validate()){
                editDemand();
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

    function editDemand(){
        base.editDemand(config)
            .then(function(res){
                if(res.success){
                    base.showMsg("修改成功");
                    setTimeout(function(){
                        base.goBackUrl("./center.html");
                    }, 1000);
                }else{
                    base.showMsg(res.msg);
                }
            });
    }
});