define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        loginFlag = false,
        experience = Dict.get("experience"),
        education = Dict.get("education"),
        positionKind = Dict.get("positionKind"),
        pCode = base.getUrlParam("code"), citylist;

    init();

    function init(){
        $("#rcA").addClass("current");
        if(pCode){
            if(base.isCompUser()){
                getPositionInfo();
                var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
                if(rcTypes){
                    rcTypes = $.parseJSON(rcTypes);
                    addLeftNav(rcTypes);
                }else{
                    getDictList();
                }
                addListener();
                
            }else{
                base.showMsg("对不起，您不是企业用户，请先进行企业注册！");
            }
        }else{
            base.showMsg("未传入职位编号！");
        }
    }
    function getPositionInfo(){
        base.getPositionInfo({code: pCode})
            .then(function(res){
                if(res.success){
                    addPositionInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取职位信息!");
                }
            });
    }
    
    function addPositionInfo(data){
        var topForm = $("#topForm").detach();
        addAddress(topForm, data.province, data.city);
        $("#zwName", topForm).val(data.name);
        addPositionDict(topForm);
        $("#zwKind", topForm).find("option[value='"+data.kind+"']")[0].selected = true;
        $("#experience", topForm).find("input[type='radio'][value='"+data.experience+"']")[0].checked = true;
        $("#education", topForm).find("input[type='radio'][value='"+data.education+"']")[0].checked = true;
        $("#zwType", topForm).find("input[type='radio'][value='"+data.type+"']")[0].checked = true;
        $("#jobNum", topForm).val(data.jobNum);
        $("#msalary", topForm).val(data.msalary);
        $("#description", topForm).val(data.description);
        $("#topDiv").removeClass("hidden").append(topForm);
    }

    function addPositionDict(topForm){
        var html = "";
        $.each(positionKind, function(i, dd){
            html += '<option value="'+i+'">'+dd+'</option>'
        });
        $("#zwKind", topForm).html(html);
    }

    function addAddress(topForm, province, city){
        base.getAddress()
            .then(function(res){
                var temp_html = "", temp_html1 = "";
                citylist = res.citylist;
                var prov_id = 0;
                $.each(citylist,function(i,prov){
                    if(prov.p == province){
                        prov_id = i;
                        temp_html+="<option value='"+prov.p+"' selected>"+prov.p+"</option>";  
                    }else{
                        temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";                          
                    }
                });
                $.each(citylist[prov_id].c,function(i,city1){
                    if(city == city1.n){
                        temp_html1+="<option value='"+city1.n+"' selected>"+city1.n+"</option>";
                    }else{
                        temp_html1+="<option value='"+city1.n+"'>"+city1.n+"</option>";
                    }
                });
                $("#province", topForm).append(temp_html);
                $("#city", topForm).append(temp_html1);
            })
    }

    function getDictList(){
        base.getPositionDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                    addPositionDict(res.data);
                }
            });
    }
    //添加左侧导航栏
    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }

    function addListener(){
        $("#province").on("change", function(){
            var me = $(this);
            var prov_id = +me[0].selectedIndex,
                temp_html = "";
            $.each(citylist[prov_id].c,function(i,city){  
                temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";  
            });
            $("#city").removeAttr("disabled").html(temp_html);
        });
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./fwlist.html?code=" + code + "&n=" + me.text();
        });
        //申请
        $("#sbtn").on("click", function(){
            var me = $(this);
            me.attr("disabled", "disabled").addClass("bg-loading");
            if(validated()){
                editPosition(me);
            }else{
                me.removeClass("bg-loading").removeAttr("disabled");
            }
        });
        //返回原来的页面
        $("#goBack").on("click", function(){
            goBack();
        });
    }



    function editPosition(me){
        base.editPosition({
            code: pCode,
            name: $("#zwName").val(),
            kind: $("#zwKind").val(),
            province: $("#province").val(),
            city: $("#city").val(),
            area: $("#area").val(),
            experience: $("input[name='expType']:checked", $("#experience")).val(),
            education: $("input[name='eduType']:checked", $("#education")).val(),
            type: $("input[name='zwType']:checked", $("#zwType")).val(),
            jobNum: $("#jobNum").val(),
            msalary: $("#msalary").val(),
            description: $("#description").val()
        }).then(function(res){
            if(res.success){
                base.showMsg("修改成功！");
                setTimeout(goBack, 1000);
            }else{
                me.removeClass("bg-loading").removeAttr("disabled");
                base.showMsg(res.msg);
            }
        });
    }
    function validated(){
        var zwName = $("#zwName").val();
        if(!zwName || zwName.trim() === ""){
            base.showMsg("职位名称不能为空");
            return false;
        }
        var jobNum = $("#jobNum").val();
        if(!jobNum || jobNum.trim() === ""){
            base.showMsg("招聘人数不能为空");
            return false;
        }else if(!/^\d+$/.test(jobNum)){
            base.showMsg("招聘人数必须为整数");
            return false;
        }
        var msalary = $("#msalary").val();
        if(!msalary || msalary.trim() === ""){
            base.showMsg("职位月薪不能为空");
            return false;
        }
        var description = $("#description").val();
        if(!description || description.trim() === ""){
            base.showMsg("职位描述不能为空");
            return false;
        }
        return true;
    }
    function goBack(){
        base.goBackUrl("../position/index.html");
    }
});