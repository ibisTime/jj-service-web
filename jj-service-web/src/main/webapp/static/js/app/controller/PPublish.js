define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars'
], function (base, Ajax, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        loginFlag = false, experience = Dict.get("experience"),
        education = Dict.get("education"),
        pCode = base.getUrlParam("code");

    init();

    function init(){
        loginFlag = base.isLogin();
        var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
        if(rcTypes){
            rcTypes = $.parseJSON(rcTypes);
            addLeftNav(rcTypes);
            addPositionDict(rcTypes);
        }else{
            getDictList();
        }
        addListener();
        initCitySelect();
    }
    function initCitySelect(){
        $("#address")
            .citySelect({
                prov: localStorage.getItem("province"),
                city: localStorage.getItem("city"),
                url: "/static/js/lib/city.min.json"
            });
    }
    function addPositionInfo(data){
        var topForm = $("#topForm").detach();
        $("#zwName", topForm).val(data.name);
        $("#zwKind", topForm).val(data.kind);
        $("#address", topForm).val(data.province + data.city);
        $("#experience", topForm).val(experience[data.experience]);
        $("#education", topForm).val(education[data.education]);
        $("#zwType"+data.type, topForm)[0].checked = true;
        $("#jobNum", topForm).val(data.jobNum);
        $("#msalary", topForm).val(data.msalary);
        $("#description", topForm).html(data.description);
        $("#topDiv").removeClass("hidden").append(topForm);
    }

    function getDictList(){
        base.getPositionDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                    sessionStorage.setItem("rcTypes", JSON.stringify(res.data));
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
                setTimeout(goBack, 1500);
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
        return true;
    }
    function goBack(){
        base.goBackUrl("../position/index.html");
    }
});