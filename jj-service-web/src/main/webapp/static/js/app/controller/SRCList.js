define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Ajax, Dict, Pagination, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        positionKind = Dict.get("positionKind"),
        start = 1,
        urgentLevel = Dict.get("urgentLevel");

    init();

    function init(){
        if(base.isCompUser()){
            getPagePosition();
            addPositionKind();
            addListener();
            addAddress();
        }else{
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        }
    }

    function getPagePosition(){
        base.getPagePosition({
            companyCode: base.getCompanyCode(),
            start: start,
            limit: 10
        }).then(function(res){
                if(res.success && res.data.list.length){
                    var data = res.data.list, html = "";
                    var companyName = base.getSessionUser().name;
                    $.each(data, function(i, dd){
                        html += '<tr code="'+dd.code+'">'+
                                    '<td><input type="checkbox"></td>'+
                                    '<td>'+companyName+'</td>'+
                                    '<td>'+dd.name+'</td>'+
                                    '<td>'+dd.province + dd.city+'</td>'+
                                    '<td>￥'+dd.msalary+'</td>'+
                                    '<td>'+dd.publishDatetime+'</td>'+
                                '</tr>';
                    });
                    $("#yfbzw-table").find("tbody").html(html);
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
                            addLoading($("#yfbzw-table").find("tbody"), 6);
                            getPagePosition();
                        }
                    });
                }else{
                    $("#yfbfw-table").find("tbody").empty();
                    base.showMsg("暂无数据!");
                }
            });
    }
    //分页查询被感兴趣服务
    function getPageLikeMyPosition(){

    }

    function getPageResume(rcType, province, city){
        base.getPageResume({
            expPosition: rcType,
            expProvince: province,
            expCity: city,
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data, list = data.list, html = "";
                $.each(list, function(i, ll){
                    html += '<tr code = "'+ll.code+'">'+
                                '<td><input type="checkbox"></td>'+
                                '<td>'+ll.name+'</td>'+
                                '<td>'+positionKind[ll.expPosition]+'</td>'+
                                '<td>'+ll.preWorkTime+'</td>'+
                                '<td>'+ll.expMsalary +'</td>'+
                                '<td>'+ll.expProvince + ll.expCity +'</td>'+
                                '<td>'+ll.publishDatetime+'</td>'+
                            '</tr>';
                });
                $("#sjl-table").find("tbody").html(html);
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
                        addLoading($("#sjl-table").find("tbody"), 7);
                        getPageServers();
                    }
                });
            }else{
                $("#sxq").find("table>tbody").empty();
                base.showMsg("暂无数据");
            }
        });
    }

    function addListener(){
        //列表切换
        $("#rcUl").on("click", "li", function(){
            var me = $(this), idx = me.index();
            $("#rcUl").find("li.current").removeClass("current");
            me.addClass("current");
            var contDiv = $("#contDiv");
            contDiv.find(".rcContent").addClass("hidden");
            contDiv.find("div.rcContent"+idx).removeClass("hidden");
            start = 1;
            $("#pagination_div").empty();
            var col = 6, ele;
            if(idx == 0){
                ele = $("#yfbzw-table").find("tbody");
                getPagePosition();
            }else if(idx == 1){
                ele = $("#ypjl-table").find("tbody");
                getPageLikeMyPosition();
            }else{
                col = 7;
                ele = $("#sjl-table").find("tbody");
                getPageDemand();
            }
            addLoading(ele, col);
        });
        /***已发布职位start***/
        //checkbox
        $("#yfbzw-table").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#yfbzw-table").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });
        $("#zwAdd").on("click", function(){
            location.href = "../position/publish.html?a=add&return=" + base.makeReturnUrl();
        });
        $("#zwDelete").on("click", function(){
            var tr = getCheckItem("yfbzw-table"),
                code = tr.attr("code"),
                me = $(this);
            if(!me.has("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中...");
                    base.deletePosition({code: code})
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
                    base.showMsg("您未选择所要删除的职位！");
                }
            }
        });
        $("#zwEdit").on("click", function(){
            location.href = "../position/publish.html?a=edit&return=" + base.makeReturnUrl();
        });
        $("#zwSelect").on("click", function(){
            var tr = getCheckItem("yfbfw-table"), 
                code = tr.attr("code");
            if(code){
                location.href = "../position/detail.html?code="+code;
            }else{
                base.showMsg("您未选择所要查看的职位！");
            }
        });
        /***已发布职位end***/

        /***应聘简历start***/
        //checkbox
        $("#ypjl-table").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#ypjl-table").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });
        $("#ypjlSelect").on("click", function(){
            var tr = getCheckItem("ypjl-table"), 
                code = tr.attr("code");
            if(code){
                location.href = "../xuser/resume-detail.html?code="+code;
            }else{
                base.showMsg("您未选择所要查看的简历！");
            }
        });
        $("#dealBtn").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("ypjl-table"), 
                code = tr.attr("code");
            if(!me.has("isDoing")){
                if(code){
                    me.addClass("isDoing").text("处理中...");
                    // base.deleteServer({code: code})
                    //     .then(function(res){
                    //         me.removeClass("isDoing").text("立即处理");
                    //         if(res.success){
                    //             base.showMsg("处理成功！");
                    //             tr.find(".yxStatus").text("已完成");
                    //         }else{
                    //             base.showMsg("非常抱歉，处理失败！")
                    //         }
                    //     });
                }else{
                    base.showMsg("您未选择所要处理的意向！");
                }
            }
        });
        /***应聘简历end***/

        /***搜简历start***/
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
            var rcType = $("#rcType").val();
            if(rcType == "-1"){
                rcType = "";
            }
            var province = $("#province").val();
            if(province == "-1"){
                province = "";
            }
            var city = $("#city").val();
            if(city == "-1"){
                city = "";
            }
            start = 1;
            addLoading($("#sjl-table").find("tbody"), 7);
            getPageResume(rcType, province, city);
        });
        $("#province").on("change", function(){
            var me = $(this);
            if(me.val() != "-1"){
                var prov_id = +me[0].selectedIndex - 1,
                    temp_html = "";
                $.each(city_json.citylist[prov_id].c,function(i,city){  
                    temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";  
                });
                temp_html = '<option value="-1">请选择城市</option>' + temp_html;
                $("#city").removeAttr("disabled").html(temp_html);
            }
        });
        $("#sjlWatch").on("click", function(){
            var tr = getCheckItem("sxq-table"), 
                code = tr.attr("code");
            if(code){
                location.href = "../xuser/resume-detail.html?code="+code;
            }else{
                base.showMsg("您未选择所要查看的简历！");
            }
        });
        $("#sjlLike").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("sjl-table"), 
                code = tr.attr("code");
            if(!me.has("isDoing")){
                if(code){
                    me.addClass("isDoing").text("处理中...");
                    base.interested({
                        toCode : code,
                        type: 4
                    })
                        .then(function(res){
                            me.removeClass("isDoing").text("感兴趣");
                            if(res.success){
                                base.showMsg("操作成功！");
                            }else{
                                base.showMsg("非常抱歉，操作失败！")
                            }
                        });
                }else{
                    base.showMsg("您未选择所要操作的简历！");
                }
            }
        });
        /***搜简历end***/
    }

    function getCheckItem(id){
        var ele1 = $("#" + id).find(".checkinput.actived");
        if(tr.length){
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

    function addAddress(){
        Ajax.get("/static/js/lib/city.min.json")
            .then(function(res){
                var temp_html = "";
                $.each(res.citylist,function(i,prov){  
                    temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";  
                }); 
                $("#province").append(temp_html);
            })
    }

    function addLoading(ele, col){
        ele.html("<tr><td colspan='"+col+"'><i class='loading-icon'></i></td></tr>");
    }
});