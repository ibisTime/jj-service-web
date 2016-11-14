define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var code = base.getUrlParam("code"),
        isDZ = Dict.get("isDZ"),
        workStatus = Dict.get("workStatus"),
        serverStatus = Dict.get("serverStatus"),
        positionKind = Dict.get("positionKind");
    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin()){
            if(code){
                getResumeInfo();
                printPrepare();
                addListeners();
            }else{
                base.showMsg("未传入简历编号");
            }
        }else{
            base.showMsg("您还没有登录");
            setTimeout(function(){
                location.href = "./login.html?return=" + base.makeReturnUrl();
            }, 1000);
        }
    }
    function printPrepare(){
        // JavaScript Document
        (function($) {
            var printAreaCount = 0;
            $.fn.printArea = function()
            {
            var ele = $(this);
            var idPrefix = "printArea_";
            removePrintArea( idPrefix + printAreaCount );
            printAreaCount++;
            var iframeId = idPrefix + printAreaCount;
            var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
            iframe = document.createElement('IFRAME');
            $(iframe).attr({ style : iframeStyle,
            id    : iframeId
            });
            document.body.appendChild(iframe);
            var doc = iframe.contentWindow.document;
            $(document).find("link")
            .filter(function(){
            return $(this).attr("rel").toLowerCase() == "stylesheet";
            })
            .each(function(){
            doc.write('<link type="text/css" rel="stylesheet" href="' +
            $(this).attr("href") + '" >');
            });
            doc.write('<div class="' + $(ele).attr("class") + '">' + $(ele).html() + '</div>');
            doc.close();
            var frameWindow = iframe.contentWindow;
            frameWindow.close();
            frameWindow.focus();
            frameWindow.print();
            }
            var removePrintArea = function(id)
            {
            $( "iframe#" + id ).remove();
            };
        })(jQuery);
    }
    function addListeners(){
        //返回原来的页面
        $("#goBack").on("click", function(){
            base.goBackUrl("./center.html");
        });
        $("#print").on("click", function(){
            preview(1);
        });
        $("#navLeft").on("click", "li", function(){
            var idx = $(this).index();
            if(idx == 0){
                if(base.isCompUser()){
                    location.href = "../suser/center.html";
                }else{
                    location.href = "./center.html";
                }
            }else if(idx == 1){
                if(base.isCompUser()){
                    location.href = "../suser/rclist.html";
                }else{
                    location.href = "./rclist.html";
                }
            }else if(idx == 2){
                if(base.isCompUser()){
                    location.href = "../suser/fwlist.html";
                }else{
                    location.href = "./fwlist.html";
                }
            }
        });
    }
    function preview(oper){
        if (oper < 10){
            bdhtml=window.document.body.innerHTML;//获取当前页的html代码
            sprnstr="<!--startprint"+oper+"-->";//设置打印开始区域
            eprnstr="<!--endprint"+oper+"-->";//设置打印结束区域
            prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html

            prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
            window.document.body.innerHTML=prnhtml;
            window.print();
            //window.document.body.innerHTML=bdhtml;
            location.reload(true);
        } else {
            window.print();
        }
    }
    function getResumeInfo(){
        base.getResumeInfo({code: code})
            .then(function(res){
                if(res.success){
                    if(!$.isPlainObject(res.data)){
                        res.data = $.parseJSON(res.data);
                    }
                    addResumeInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取简历详情");
                }
            });
    }

    function addPositionKind(topForm){
        var html = "";
        for(var n in positionKind){
            html += '<div class="inblock mr10"><input type="checkbox" value="'+n+'" disabled/>' + positionKind[n] + '</div>';
        }
        $("#expPosition", topForm).html(html);
    }

    function addResumeInfo(data){
        var topForm = $("#topForm").detach();
        $("#mobile", topForm).val(data.mobile);
        $("#name", topForm).val(data.name);
        $("#status", topForm).val(serverStatus[data.status]);
        if(data.status == "0"){
            $("#wgDiv", topForm).removeClass("hidden");
            $("#dealNote", topForm).val(data.dealNote);
        }
        $("#isWork", topForm).val(isDZ[data.isWork]);
        if(data.isWork == "1"){
            $("#hasWork", topForm).removeClass("hidden");
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

        addPositionKind(topForm);
        var expDiv = $("#expPosition", topForm);
        for(var i = 0; i < data.expPosition.length; i++){
            expDiv.find("input[type='checkbox'][value='"+data.expPosition[i]+"']")[0].checked = true;
        }

        $("#expMsalary", topForm).val(data.expMsalary);
        $("#address", topForm).val(data.expProvince + data.expCity);
        $("#workStatus", topForm).val(workStatus[data.workStatus]);
        $("#isOpen", topForm).val(isDZ[data.isOpen]);
        topForm.removeClass("hidden").appendTo($("#topDiv"))
    }
});