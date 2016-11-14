define([
    'app/controller/base',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Dict, Pagination, Handlebars) {
    var tmplList = __inline("../ui/xuser-rclist-rList.handlebars"),
        tmplList1 = __inline("../ui/xuser-rclist-rList1.handlebars"),
        tmplList2 = __inline("../ui/xuser-rclist-rList2.handlebars"),
        positionKind = Dict.get("positionKind"),
        serverStatus = Dict.get("serverStatus"),
        idx = base.getUrlParam("l") || 0,
        start = 1;

    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin() && base.isPerson()){
            Handlebars.registerHelper('formatDate', function(num, options){
                var dd = new Date(num);
                return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
            });
            Handlebars.registerHelper('formtPKind', function(num, options){
                var str = "";
                for(var i = 0; i < num.length; i++){
                    str = str + positionKind[ num[i] ];
                    if(i < num.length - 1)
                        str = str + "、";
                }
                return str;
            });
            Handlebars.registerHelper('formatSStatus', function(num, options){
                return serverStatus[num];
            });
            //getPageResume();
            addListener();
            $("#rcUl").find("li:eq("+idx+")").click();
        }else if(base.isLogin()){
            location.href = "../suser/rclist.html";
        }else{
            location.href = "./login.html?return=" + base.makeReturnUrl();
        }
    }
    //分页查询我的简历
    function getPageResume(){
        base.getPageResume({
            publisher: base.getPersonUserId(),
            start: start,
            limit: 10
        }).then(function(res){
                if(res.success && res.data.list.length){
                    var data = res.data;
                    $("#wdjlTable").find("tbody").html( tmplList({items: res.data.list}) );
                    $("#pagination_div").pagination({
                        items: data.totalCount,
                        itemsOnPage: 10,
                        pages: data.totalPage,
                        prevText: '<',
                        nextText: '>',
                        displayedPages: '2',
                        currentPage: start,
                        onPageClick: function(pageNumber){
                            start = pageNumber;
                            addLoading($("#wdjlTable").find("tbody"), 6);
                            getPageResume();
                        }
                    });
                }else{
                    doError($("#wdjlTable").find("tbody"), 6);
                }
            });
    }
    //分页查询已应聘职位
    function getPageInterestPosition(){
        base.getPageInterestPosition({
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#yypzwTable").find("tbody").html( tmplList1({items: res.data.list}) );
                $("#pagination_div").pagination({
                    items: data.totalCount,
                    itemsOnPage: 10,
                    pages: data.totalPage,
                    prevText: '<',
                    nextText: '>',
                    displayedPages: '2',
                    currentPage: start,
                    onPageClick: function(pageNumber){
                        start = pageNumber;
                        addLoading($("#yypzwTable").find("tbody"), 7);
                        getPageInterestPosition();
                    }
                });
            }else{
                doError($("#yypzwTable").find("tbody"), 7);
            }
        });
    }

    function getPageInterestResume(){
        base.getPageInterestResume({
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#bgxqTable").find("tbody").html( tmplList2({items: res.data.list}) );
                $("#pagination_div").pagination({
                    items: data.totalCount,
                    itemsOnPage: 10,
                    pages: data.totalPage,
                    prevText: '<',
                    nextText: '>',
                    displayedPages: '2',
                    currentPage: start,
                    onPageClick: function(pageNumber){
                        start = pageNumber;
                        addLoading($("#bgxqTable").find("tbody"), 6);
                        getPageInterestResume();
                    }
                });
            }else{
                doError($("#bgxqTable").find("tbody"), 6);
            }
        });
    }

    function addListener(){
        //列表切换
        $("#rcUl").on("click", "li", function(){
            var me = $(this), idx = me.index();
            $("#rcUl").find("li>a.current").removeClass("current");
            me.find("a").addClass("current");
            var contDiv = $("#contDiv");
            contDiv.find(".rcContent").addClass("hidden");
            contDiv.find("div.rcContent"+idx).removeClass("hidden");
            start = 1;
            $("#pagination_div").empty();
            var col, ele;
            if(idx == 0){
                ele = $("#wdjlTable").find("tbody");
                col = 6;
                addLoading(ele, col);
                getPageResume();
            }else if(idx == 1){
                col = 7;
                ele = $("#yypzwTable").find("tbody");
                addLoading(ele, col);
                getPageInterestPosition();
            }else{
                col = 6;
                ele = $("#bgxqTable").find("tbody");
                addLoading(ele, col);
                getPageInterestResume();
            }
        });
        /***我的简历start***/
        //checkbox
        $("#wdjlTable").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#wdjlTable").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                checkInput[0].checked = true;
                checkInput.addClass("actived");
            }else{
                checkInput[0].checked = false;
                checkInput.removeClass("actived");
            }
        });
        $("#addJl").on("click", function(){
            location.href = "../xuser/add-resume.html?return=" + encodeURIComponent(location.pathname + "?l=0");
        });
        $("#deleteJl").on("click", function(){
            var tr = getCheckItem("wdjlTable"),
                code = tr && tr.attr("code") || "",
                me = $(this);
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中...");
                    base.deleteResume({code: code})
                        .then(function(res){
                            me.removeClass("isDoing").text("删除");
                            if(res.success){
                                base.showMsg("删除成功！");
                                tr.remove();
                            }else{
                                base.showMsg("非常抱歉，删除失败！");
                            }
                        });
                }else{
                    base.showMsg("您未选择所要删除的简历！");
                }
            }
        });
        $("#editJl").on("click", function(){
            var tr = getCheckItem("wdjlTable"),
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../xuser/edit-resume.html?code="+code+"&return=" + encodeURIComponent(location.pathname + "?l=0");
            }else{
                base.showMsg("您未选择所要修改的简历！");
            }
        });
        $("#selectJl").on("click", function(){
            var tr = getCheckItem("wdjlTable"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../xuser/resume-detail.html?code="+code+"&return="+encodeURIComponent(location.pathname + "?l=0");
            }else{
                base.showMsg("您未选择所要查看的简历！");
            }
        });
        /***我的简历end***/

        /***已应聘职位start***/
        //checkbox
        $("#yypzwTable").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#yypzwTable").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                checkInput[0].checked = true;
                checkInput.addClass("actived");
            }else{
                checkInput[0].checked = false;
                checkInput.removeClass("actived");
            }
        });
        $("#selectZw").on("click", function(){
            var tr = getCheckItem("yypzwTable"), 
                code = tr && tr.attr("pCode") || "";
            if(code){
                location.href = "../position/list-detail.html?code="+code+"&return="+encodeURIComponent(location.pathname + "?l=1");
            }else{
                base.showMsg("您未选择所要查看的信息！");
            }
        });
        $("#deleteZw").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("yypzwTable"), 
                code = tr && tr.attr("code") || "";
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中...");
                    base.deleteInterest({
                        code: code
                    }).then(function(res){
                            me.removeClass("isDoing").text("删除");
                            if(res.success){
                                base.showMsg("删除成功！");
                                tr.remove();
                            }else{
                                base.showMsg("非常抱歉，删除失败！")
                            }
                        });
                }else{
                    base.showMsg("您未选择所要删除的信息！");
                }
            }
        });
        /***已应聘职位end***/

        /***被感兴趣start***/
        //checkbox
        $("#bgxqTable").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#bgxqTable").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                checkInput[0].checked = true;
                checkInput.addClass("actived");
            }else{
                checkInput[0].checked = false;
                checkInput.removeClass("actived");
            }
        });
        $("#selectXq").on("click", function(){
            var tr = getCheckItem("bgxqTable"), 
                code = tr && tr.attr("cCode") || "";
            if(code){
                location.href = "../server/comp-detail.html?code="+code + "&return="+encodeURIComponent(location.pathname + "?l=2");
            }else{
                base.showMsg("您未选择所要查看的信息！");
            }
        });
        /***被感兴趣end***/
    }

    function getCheckItem(id){
        var ele1 = $("#" + id).find(".checkinput.actived");
        if(ele1.length){
            return ele1.closest("tr");
        }else{
            return "";
        }
    }

    function addPositionKind(){
        html = "";
        $.each(positionKind, function(n, type){
            html += '<option value="'+n+'">'+type+'</option>'
        });
        $("#rcType").append(html);
    }

    function addLoading(ele, col){
        ele.html("<tr><td colspan='"+col+"'><i class='loading-icon'></i></td></tr>");
    }

    function doError(ele, col){
        ele.html("<tr><td colspan='"+col+"'>暂无数据</td></tr>")
    }
});