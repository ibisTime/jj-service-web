define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        experience = Dict.get("experience"),
        education = Dict.get("education"),
        positionKind = Dict.get("positionKind"),
        pCode = base.getUrlParam("code");

    init();

    function init(){
        $("#rcA").addClass("current");
        if(pCode){
            var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
            if(rcTypes){
                addLeftNav($.parseJSON(rcTypes));
            }else{
                getDictList();
            }
            getPositionInfo();
            addListener();
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
        $("#zwName", topForm).val(data.name);
        addPositionDict(topForm);
        $("#zwKind", topForm).val(positionKind[data.kind]);
        $("#address", topForm).val(data.province + data.city);
        $("#experience", topForm).val(experience[data.experience]);
        $("#education", topForm).val(education[data.education]);
        $("#zwType"+data.type, topForm)[0].checked = true;
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

    function getDictList(){
        base.getPositionDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                }
            });
    }
    //添加左侧导航栏
    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }

    function addListener(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("../position/index.html");
        });
    }
});