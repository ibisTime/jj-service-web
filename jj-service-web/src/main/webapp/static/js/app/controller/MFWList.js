define([
    'app/controller/base',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Dict, Pagination, Handlebars) {
    var tmplList = __inline("../ui/suser-fwlist-rList.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        serverType = Dict.get("serverType"),
        start = 1, sType = base.getUrlParam("type"),
        urgentLevel = Dict.get("urgentLevel");

    init();

    function init(){
        $("#fwA").addClass("current");
        if(base.isCompUser()){
            Handlebars.registerHelper('formatDate', function(num, options){
                var dd = new Date(num);
                return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
            });
            Handlebars.registerHelper('formtSType', function(num, options){
                return serverType[num];
            });
            Handlebars.registerHelper('formatPrice', function(num, options){
                return num && (+num / 1000);
            });
            if(sType){
                $("#leftNav").find("li[code='"+sType+"']").addClass("current");
            }
            getPageServers();
            addListener();
        }else{
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        }
    }

    function getPageServers(flag){
        base.getPageServers({
            companyCode: base.getCompanyCode(),
            start: start,
            type: sType,
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
                            addLoading($("#yfbfw-table").find("tbody"), 6);
                            getPageServers();
                        }
                    });
                }else{
                    doError();
                }
            });
    }

    function addListener(){
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
                                addLoading($("#yfbfw-table").find("tbody"), 6);
                                getPageServers(true);
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
    function doError(){
        $("#yfbfw-table").find("tbody").html('<tr><td colspan="6">暂时数据</td></tr>');
    }
});