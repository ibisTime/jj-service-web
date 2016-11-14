define([
    'app/controller/base',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Dict, Pagination, Handlebars) {
    var tmplList = __inline("../ui/suser-fwlist-rList.handlebars"),
        tmplList1 = __inline("../ui/suser-fwlist-rList1.handlebars"),
        tmplList2 = __inline("../ui/suser-fwlist-rList2.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        serverType = Dict.get("serverType1"),
        interestStatus = Dict.get("interestStatus"),
        urgentLevel = Dict.get("urgentLevel"),
        serverStatus = Dict.get("serverStatus"),
        idx = base.getUrlParam("l") || 0,
        start = 1;

    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isCompUser()){
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
            Handlebars.registerHelper('formtIStatus', function(num, options){
                return interestStatus[num];
            });
            Handlebars.registerHelper('formatPrice', function(num, options){
                return num && (+num / 1000);
            });
            Handlebars.registerHelper('formatSStatus', function(num, options){
                return serverStatus[num];
            });
            addListener();
            $("#fwUl").find("li:eq("+idx+")").click();
            //getPageServers();
            addServerType();
        }else{
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        }
    }

    function getPageServers(flag){
        base.getPageServers({
            companyCode: base.getCompanyCode(),
            start: start,
            limit: 10
        }, flag).then(function(res){
                if(res.success && res.data.list.length){
                    $("#yfbfw-table").find("tbody").html( tmplList({items: res.data.list}) );
                    var data = res.data;
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
                            addLoading($("#yfbfw-table").find("tbody"), 7);
                            getPageServers();
                        }
                    });
                }else{
                    doError($("#yfbfw-table").find("tbody"), 7);
                }
            });
    }
    //分页查询被感兴趣服务
    function getPageLikeMyServer(){
        base.getPageInterestServer({
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#bgxqfw-table").find("tbody").html( tmplList1({items: res.data.list}) );
                var data = res.data;
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
                        addLoading($("#bgxqfw-table").find("tbody"), 5);
                        getPageLikeMyServer();
                    }
                });
            }else{
                doError($("#bgxqfw-table").find("tbody"), 5);
            }
        })
    }

    function getPageDemand(value){
        base.getPageDemand({
            type: value || "",
            start: start,
            limit: 10,
            status: "1",
            companyCode: base.getCompanyCode()
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#sxq-table").find("tbody").html(tmplList2({items: res.data.list}));
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
                        addLoading($("#sxq-table").find("tbody"), 6);
                        getPageDemand(value);
                    }
                });
            }else{
                doError($("#sxq-table").find("tbody"), 6);
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
            var col = 7, ele;
            if(idx == 0){
                ele = $("#yfbfw-table").find("tbody");
                addLoading(ele, col);
                getPageServers();
            }else if(idx == 1){
                col = 5;
                ele = $("#bgxqfw-table").find("tbody");
                addLoading(ele, col);
                getPageLikeMyServer();
            }else{
                $("#fwType")[0].selectedIndex = 0;
                col = 6;
                ele = $("#sxq-table").find("tbody");
                addLoading(ele, col);
                getPageDemand();
            }
        });
        /***已发布服务start***/
        //checkbox
        $("#yfbfw-table").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#yfbfw-table").find(".checkinput.actived");
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
        $("#fwAdd").on("click", function(){
            location.href = "../server/addServer.html?return=" + encodeURIComponent(location.pathname + "?l=0");
        });
        $("#fwDelete").on("click", function(){
            var tr = getCheckItem("yfbfw-table"),
                code = tr && tr.attr("code") || "",
                me = $(this);
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中...");
                    base.deleteServer({code: code})
                        .then(function(res){
                            me.removeClass("isDoing").text("删除");
                            if(res.success){
                                addLoading($("#yfbfw-table").find("tbody"), 7);
                                getPageServers(true);
                                base.showMsg("删除成功！");
                            }else{
                                base.showMsg("非常抱歉，删除失败！");
                            }
                        });
                }else{
                    base.showMsg("您未选择所要删除的服务！");
                }
            }
        });
        $("#fwEdit").on("click", function(){
            var tr = getCheckItem("yfbfw-table"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../server/editServer.html?code="+code+"&return=" + encodeURIComponent(location.pathname + "?l=0");
            }else{
                base.showMsg("您未选择所要修改的服务！");
            }
        });
        $("#fwSelect").on("click", function(){
            var tr = getCheckItem("yfbfw-table"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../server/detail.html?code="+code+"&return="+ encodeURIComponent(location.pathname + "?l=0");
            }else{
                base.showMsg("您未选择所要查看的服务！");
            }
        });
        /***已发布服务end***/

        /***被感兴趣服务start***/
        //checkbox
        $("#bgxqfw-table").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#bgxqfw-table").find(".checkinput.actived");
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
            var tr = getCheckItem("bgxqfw-table"), 
                code = tr && tr.attr("sCode") || "";
            if(code){
                location.href = "../server/detail.html?code="+code+"&return=" + encodeURIComponent(location.pathname + "?l=1");
            }else{
                base.showMsg("您未选择所要查看的服务！");
            }
        });
        $("#bgxqDeal").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("bgxqfw-table"), 
                code = tr && tr.attr("code") || "";
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("处理中...");
                    base.handleInterest({
                        code: code,
                        dealNote: "已查看"
                    }).then(function(res){
                            me.removeClass("isDoing").text("立即处理");
                            if(res.success){
                                base.showMsg("处理成功！");
                                tr.find(".yxStatus").text("已完成");
                            }else{
                                base.showMsg("非常抱歉，处理失败！")
                            }
                        });
                }else{
                    base.showMsg("您未选择所要处理的意向！");
                }
            }
        });
        /***被感兴趣服务end***/

        /***搜需求start***/
        //checkbox
        $("#sxq-table").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#sxq-table").find(".checkinput.actived");
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
        $("#searchBtn").on("click", function(){
            var value = $("#fwType").val();
            start = 1;
            addLoading($("#sxq-table").find("tbody"), 7);
            if(value != "-1"){
                getPageDemand(value);
            }else{
                getPageDemand("");
            }
        });
        $("#sxqSelect").on("click", function(){
            var tr = getCheckItem("sxq-table"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../xuser/demand-detail.html?code="+code+"&return="+encodeURIComponent(location.pathname + "?l=2");
            }else{
                base.showMsg("您未选择所要查看的需求！");
            }
        });
        /***搜需求end***/
    }

    function getCheckItem(id){
        var ele1 = $("#" + id).find(".checkinput.actived");
        if(ele1.length){
            return ele1.closest("tr");
        }else{
            return "";
        }
    }

    function addServerType(){
        html = "";
        $.each(serverType, function(n, type){
            html += '<option value="'+n+'">'+type+'</option>'
        });
        $("#fwType").append(html);
    }

    function addLoading(ele, col){
        ele.html("<tr><td colspan='"+col+"'><i class='loading-icon'></i></td></tr>");
    }

    function doError(ele, col){
        ele.html("<tr><td colspan='"+col+"'>暂无数据</td></tr>");
    }
});