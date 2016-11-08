define([
    'app/controller/base',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Dict, Pagination, Handlebars) {
    var tmplList = __inline("../ui/xuser-fwlist-rList.handlebars"),
        tmplList1 = __inline("../ui/xuser-fwlist-rList1.handlebars"),
        tmplList2 = __inline("../ui/xuser-fwlist-rList2.handlebars"),
        serverType = Dict.get("serverType1"),
        urgentLevel = Dict.get("urgentLevel"),
        start = 1;

    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isLogin() && base.isPerson()){
            Handlebars.registerHelper('formatDate', function(num, options){
                var dd = new Date(num);
                return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
            });
            Handlebars.registerHelper('formtSType', function(num, options){
                return serverType[num];
            });
            Handlebars.registerHelper('formtULevel', function(num, options){
                return urgentLevel[num];
            });
            Handlebars.registerHelper('formatPrice', function(num, options){
                return num && (+num / 1000);
            });
            getPageDemand();
            addListener();
        }else{
            location.href = "./login.html?return=" + base.makeReturnUrl();
        }
    }
    //分页查询我的需求
    function getPageDemand(){
        base.getPageDemand({
            publisher: base.getPersonUserId(),
            start: start,
            limit: 10
        }).then(function(res){
                if(res.success && res.data.list.length){
                    var data = res.data;
                    $("#wdxqTable").find("tbody").html( tmplList({items: res.data.list}) );
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
                            addLoading($("#wdxqTable").find("tbody"), 6);
                            getPageResume();
                        }
                    });
                }else{
                    doError($("#wdxqTable").find("tbody"), 6);
                }
            });
    }
    //分页查询感兴趣服务
    function getPageInterestServer(){
        base.getPageInterestServer({
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#gxqfwTable").find("tbody").html( tmplList1({items: res.data.list}) );
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
                        addLoading($("#gxqfwTable").find("tbody"), 6);
                        getPageInterestServer();
                    }
                });
            }else{
                doError($("#gxqfwTable").find("tbody"), 6);
            }
        });
    }

    function getPageInterestDemand(){
        base.getPageInterestDemand({
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
                        getPageInterestDemand();
                    }
                });
            }else{
                doError($("#bgxqTable").find("tbody"), 6);
            }
        });
    }

    function addListener(){
        //列表切换
        $("#fwUl").on("click", "li", function(){
            var me = $(this), idx = me.index();
            $("#fwUl").find("li>a.current").removeClass("current");
            me.find("a").addClass("current");
            var contDiv = $("#contDiv");
            contDiv.find(".fwContent").addClass("hidden");
            contDiv.find("div.fwContent"+idx).removeClass("hidden");
            start = 1;
            $("#pagination_div").empty();
            var col, ele;
            if(idx == 0){
                ele = $("#wdxqTable").find("tbody");
                col = 6;
                addLoading(ele, col);
                getPageDemand();
            }else if(idx == 1){
                col = 6;
                ele = $("#yypzwTable").find("tbody");
                addLoading(ele, col);
                getPageInterestServer();
            }else{
                col = 6;
                ele = $("#bgxqTable").find("tbody");
                addLoading(ele, col);
                getPageInterestDemand();
            }
        });
        /***我的需求start***/
        //checkbox
        $("#wdxqTable").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#wdxqTable").find(".checkinput.actived");
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
        $("#wdxqAdd").on("click", function(){
            location.href = "../xuser/add-demand.html?return=" + base.makeReturnUrl();
        });
        $("#wdxqDelete").on("click", function(){
            var tr = getCheckItem("wdxqTable"),
                code = tr && tr.attr("code") || "",
                me = $(this);
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中...");
                    base.deleteDemand({code: code})
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
                    base.showMsg("您未选择所要删除的需求！");
                }
            }
        });
        $("#wdxqEdit").on("click", function(){
            var tr = getCheckItem("wdxqTable"),
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../xuser/edit-demand.html?code="+code+"&return=" + base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要修改的需求！");
            }
        });
        $("#wdxqSelect").on("click", function(){
            var tr = getCheckItem("wdxqTable"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../xuser/demand-detail.html?code="+code+"&return="+base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要查看的需求！");
            }
        });
        /***我的需求end***/

        /***感兴趣服务start***/
        //checkbox
        $("#gxqfwTable").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#gxqfwTable").find(".checkinput.actived");
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
        $("#gxqfwSearch").on("click", function(){
            location.href = "../server/list.html";
        });
        $("#gxqfwSelect").on("click", function(){
            var tr = getCheckItem("gxqfwTable"), 
                code = tr && tr.attr("sCode") || "";
            if(code){
                location.href = "../server/detail.html?code="+code+"&return="+base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要查看的服务！");
            }
        });
        $("#gxqfwDelete").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("gxqfwTable"), 
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
                    base.showMsg("您未选择所要删除的服务！");
                }
            }
        });
        /***感兴趣服务end***/

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
        $("#bgxqSelect").on("click", function(){
            var tr = getCheckItem("bgxqTable"), 
            code = tr && tr.attr("cCode") || "";
            if(code){
                location.href = "../suser/detail.html?code="+code+"&return="+base.makeReturnUrl();
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

    function addLoading(ele, col){
        ele.html("<tr><td colspan='"+col+"'><i class='loading-icon'></i></td></tr>");
    }

    function doError(ele, col){
        ele.html("<tr><td colspan='"+col+"'>暂无数据</td></tr>")
    }
});