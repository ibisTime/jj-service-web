define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        loginFlag = false,
        experience = Dict.get("experience"),
        education = Dict.get("education"),
        positionKind = Dict.get("positionKind"),
        pCode = base.getUrlParam("code");

    init();

    function init(){
        $("#rcA").addClass("current");
        if(pCode){
            loginFlag = base.isLogin();
            var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
            if(rcTypes){
                addLeftNav($.parseJSON(rcTypes));
            }else{
                getDictList();
            }
            if(loginFlag){
                $("#cancel1").removeClass("hidden");
                if(base.isPerson()){
                    $("#sbtn").removeClass("hidden");
                }
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
                    if(loginFlag){
                        addCompanyInfo(res.data.company);
                    }else{
                        $("#noLogin").removeClass("hidden");
                    }
                    addPositionInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取职位信息!");
                }
            });
    }

    function getCompanyInfo(code){
        base.getCompanyInfo({code: code})
            .then(function(res){
                if(res.success){
                    addCompanyInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!");
                }
            });
    }

    function addPositionInfo(data){
        var topForm = $("#topForm").detach();
        $("#zwName", topForm).val(data.name);
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

    function addCompanyInfo(data){
        var bottomForm = $("#bottomForm").detach();
        $("#companyName", bottomForm).val(data.name);
        $("#gsyyzzh", bottomForm).attr("src", data.gsyyzzh);
        $("#logo", bottomForm).attr("src", data.logo);
        $("#contacts", bottomForm).val(data.contacts || "");
        $("#mobile", bottomForm).val(data.mobile || "");
        $("#email", bottomForm).val(data.email || "");
        $("#qq", bottomForm).val(data.qq || "");
        $("#scale", bottomForm).val(data.scale || "");
        $("#compAddress", bottomForm).html(data.province + data.city + (data.area || "") + (data.address || ""));
        $("#slogan", bottomForm).val(data.slogan);
        $("#remark", bottomForm).val(data.remark);
        $("#compDescription", bottomForm).val(data.description);
        $("#logined").removeClass("hidden").append(bottomForm);

    }

    function getDictList(){
        base.getPositionDictList({code: pCode})
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
        $("#leftNav").on("click", "li", function(){
            var me = $(this), cc = me.attr("code"), text = me.text();
            if(base.isPerson()){
                location.href = "./xqlist.html?code=" + cc + "&n=" + text.substr(0, text.length - 1);
            }else{
                location.href = "./fwlist.html?code=" + cc + "&n=" + text.substr(0, text.length - 1);
            }
        });
        //申请
        $("#sbtn").on("click", function(){
            showSelect();
            base.getListResume({})
                .then(function(res){
                    if(res.success){
                        var list = res.data;
                        if(list.length){
                            for(var i = 0, html = ""; i < list.length; i++){
                                html += '<option value="'+list[i].code+'">'+list[i].name+'</option>';
                            }
                            $("#jlSelect").html(html).removeClass("hidden");
                            $("#loadSpan").addClass('hidden');
                        }else{
                            $("#isOk").prop("disabled", "disabled");
                            $("#loadSpan").html('您还没有简历，<span class="cur_pointer addResumeSpan">点此前去添加</span>');
                        }
                    }else{
                        base.showMsg("非常抱歉，暂时无法获取简历信息！");
                    }
                });
        });
        //返回原来的页面
        $("#cancel, #cancel1").on("click", function(){
            base.goBackUrl("../position/index.html");
        });
        //取消选择简历
        $("#isCancel, #mask1").on("click", function(){
            hideSelect();
        });
        //确认选择的简历
        $("#isOk").on("click", function(){
            $("#isOk").attr("disabled", "disabled").val("提交中...");
            base.applyPosition({
                "resumeCode": $("#jlSelect").val(),
                "positionCode": pCode
            }).then(function(res){
                    if(res.success){
                        base.goBackUrl("../xuser/rclist.html");
                    }else{
                        $("#isOk").removeAttr("disabled").val("确定");
                        base.showMsg("非常抱歉，申请提交失败！");
                        hideSelect();
                    }
                });
        });
        //前往添加简历
        $("#myJianli").on("click", ".addResumeSpan", function(e){
            location.href = "../xuser/add-resume.html?return=" + base.makeReturnUrl();
            e.stopPropagation();
        });
    }
    function showSelect(){
        $("#mask1, #myJianli").removeClass("hidden");
    }
    function hideSelect(){
        $("#mask1, #myJianli").addClass("hidden");
    }
});