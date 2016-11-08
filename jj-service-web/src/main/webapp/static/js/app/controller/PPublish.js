define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        experience = Dict.get("experience"),
        education = Dict.get("education"), citylist;

    init();

    function init(){
        $("#rcA").addClass("current");
        if(base.isCompUser()){
            var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
            if(rcTypes){
                rcTypes = $.parseJSON(rcTypes);
                addLeftNav(rcTypes);
                addPositionDict(rcTypes);
            }else{
                getDictList();
            }
            addAddress();
            addListener();
        }else{
            base.showMsg("对不起，您不是企业用户，请先进行企业注册！");
        }
    }

    function addAddress(){
        base.getAddress()
            .then(function(res){
                var temp_html = "", temp_html1 = "";
                citylist = res.citylist;
                var province = localStorage.getItem("province"),
                    city = localStorage.getItem("city"),
                    prov_id = 0;
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
                $("#province").append(temp_html);
                $("#city").append(temp_html1);
            });
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

    function addPositionDict(data){
        var html = "";
        $.each(data, function(i, dd){
            html += '<option value="'+dd.dkey+'">'+dd.dvalue+'</option>'
        });
        $("#zwKind").html(html);
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
            if(validated()){
                publishPosition();
            }
        });
        //返回原来的页面
        $("#goBack").on("click", function(){
            goBack();
        });
    }



    function publishPosition(){
        base.publishPosition({
            name: $("#zwName").val(),
            kind: $("#zwKind").val(),
            province: $("#province").val(),
            city: $("#city").val(),
            experience: $("input[name='expType']:checked", $("#experience")).val(),
            education: $("input[name='eduType']:checked", $("#education")).val(),
            type: $("input[name='zwType']:checked", $("#zwType")).val(),
            jobNum: $("#jobNum").val(),
            msalary: $("#msalary").val(),
            description: $("#description").val()
        }).then(function(res){
            if(res.success){
                base.showMsg("发布成功！");
                setTimeout(goBack, 1000);
            }else{
                base.showMsg("非常抱歉，发布职位失败！");
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