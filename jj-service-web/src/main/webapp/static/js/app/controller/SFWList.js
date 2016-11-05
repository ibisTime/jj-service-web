define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Ajax, Dict, Pagination, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        tmplList = __inline("../ui/suser-fwlist-rList.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        serverType = Dict.get("serverType"),
        start = 1,
        urgentLevel = Dict.get("urgentLevel");

    init();

    function init(){
        if(base.isCompUser()){
            Handlebars.registerHelper('formatDate', function(num, options){
                var dd = new Date(num);
                return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
            });
            Handlebars.registerHelper('formtSType', function(num, options){
                return serverType[num];
            });
            getPageServers();
            addServerType();
            addListener();
        }else{
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        }
    }

    function getPageServers(){
        base.getPageServers({
            companyCode: base.getCompanyCode(),
            start: start,
            limit: 10
        }).then(function(res){
                if(res.success && res.data.list.length){
                    $("#yfbfw-table").find("tbody").html( tmplList({items: res.data.list}) );
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
                            addLoading($("#yfbfw-table").find("tbody"), 6);
                            getPageServers();
                        }
                    });
                }else{
                    $("#yfbfw-table").find("tbody").empty();
                    base.showMsg("暂无数据");
                }
            });
    }
    //分页查询被感兴趣服务
    function getPageLikeMyServer(){

    }

    function getPageDemand(value){
        base.getPageDemand({
            type: value,
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data, list = data.list, html = "";
                $.each(list, function(i, ll){
                    html += '<tr code = "'+ll.code+'">'+
                                '<td><input type="checkbox" class="checkinput"></td>'+
                                '<td>'+ll.name+'</td>'+
                                '<td>'+serverType[ll.type]+'</td>'+
                                '<td>'+("需求联系人")+'</td>'+
                                '<td>'+ll.mobile+'</td>'+
                                '<td>'+urgentLevel[ll.urgentLevel]+'</td>'+
                                '<td>'+ll.publishDatetime+'</td>'+
                            '</tr>';
                });
                $("#sxq-table").find("tbody").html(html);
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
                        addLoading($("#sxq-table").find("tbody"), 7);
                        getPageServers();
                    }
                });
            }else{
                $("#sxq-table").find("tbody").empty();
                base.showMsg("暂无数据");
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
            var col = 6, ele;
            if(idx == 0){
                ele = $("#yfbfw-table").find("tbody");
                getPageServers();
            }else if(idx == 1){
                ele = $("#bgxqfw-table").find("tbody");
                getPageLikeMyServer();
            }else{
                col = 7;
                ele = $("#sxq-table").find("tbody");
                getPageDemand();
            }
            addLoading(ele, col);
        });
        /***已发布服务start***/
        //checkbox
        $("#yfbfw-table").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#yfbfw-table").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });
        $("#fwAdd").on("click", function(){
            location.href = "../server/addServer.html?return=" + base.makeReturnUrl();
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
                                base.showMsg("删除成功！");
                                tr.remove();
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
                location.href = "../server/editServer.html?code="+code+"&return=" + base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要修改的服务！");
            }
        });
        $("#fwSelect").on("click", function(){
            var tr = getCheckItem("yfbfw-table"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../server/detail.html?code="+code+"&return="+base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要查看的服务！");
            }
        });
        /***已发布服务end***/

        /***被感兴趣服务start***/
        //checkbox
        $("#bgxqfw-table").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#bgxqfw-table").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });
        // $("#bgxqSelect").on("click", function(){
        //     var tr = getCheckItem("bgxqfw-table"), 
        //         code = tr.attr("code"),
        //         sType = tr.attr("fType");
        //     if(code){
        //         location.href = "../server/detail.html?code="+code+"&t=" + sType;
        //     }else{
        //         base.showMsg("您未选择所要查看的服务！");
        //     }
        // });
        $("#bgxqDeal").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("bgxqfw-table"), 
                code = tr && tr.attr("code") || "";
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("处理中...");
                    base.deleteServer({code: code})
                        .then(function(res){
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
        $("#sxq-table").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#sxq-table").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });
        $("#searchBtn").on("click", function(){
            var value = $("#fwType").val();
            start = 1;
            if(value != "-1"){
                getPageDemand(value);
            }else{
                getPageDemand("");
            }
        });
        $("#sxqSelect").on("click", function(){
            var tr = getCheckItem("sxq-table"), 
                code = tr.attr("code");
            if(code){
                location.href = "../xuser/detail.html?code="+code;
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
});