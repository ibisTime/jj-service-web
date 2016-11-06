define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var code = base.getUrlParam("code"),
        isDZ = Dict.get("isDZ"),
        workStatus = Dict.get("workStatus");
    init();

    function init(){
        if(base.isLogin() && base.isPerson()){
            if(code){
                getResumeInfo();
                addListeners();
            }else{
                base.showMsg("未传入简历编号");
            }
        }else{
            base.showMsg("您没有权限查看当前页面");
            setTimeout(function(){
                location.href = "./login.html?return=" + base.makeReturnUrl();
            }, 1000);
        }
    }

    function addListeners(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
    }

    function getResumeInfo(){
        base.getResumeInfo({code: code})
            .then(function(res){
                if(res.success){
                    addResumeInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取简历详情");
                }
            });
    }

    function addResumeInfo(data){
        var topForm = $("#topForm")..detach();
        $("#name", topForm).val(data.name);
        $("#isWork", topForm).val(isDZ[data.isWork]);
        if(data.isWork == "1"){
            $("#preCompName", topForm).val(data.preCompName);
            $("#prePosName", topForm).val(data.prePosName);
            $("#preWorkTime", topForm).val(data.preWorkTime);
            $("#preMsalary", topForm).val(data.preMsalary);
            $("#preDescription", topForm).val(data.preDescription);
        }
        $("#education", topForm).find("input[name='edu'][value='"+data.education+"']")[0].checked = true;
        $("#isTz", topForm).find("input[name='tzRadio'][value='"+data.isTz+"']")[0].checked = true;
        $("#studyTime", topForm).val(data.studyTime);
        $("#school", topForm).val(data.school);
        $("#profession", topForm).val(data.profession);
        $("#type", topForm).find("input[name='wType'][value='"+data.type+"']")[0].checked = true;


        var checkbox = $("#expPosition", topForm).find("input[type='checkbox']");


        $("#expMsalary", topForm).val(data.expMsalary);
        $("#address", topForm).val(data.expProvince + data.expCity);
        $("#workStatus", topForm).val(workStatus[data.workStatus]);
        $("#isOpen", topForm).val(isDZ[data.isOpen]);
        topForm.removeClass("hidden").appendTo($("#topDiv"))
    }
});