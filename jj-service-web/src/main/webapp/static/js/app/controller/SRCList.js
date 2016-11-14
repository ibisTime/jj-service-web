define([
    'app/controller/base',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Dict, Pagination, Handlebars) {
    var tmplList = __inline("../ui/suser-rclist-rList.handlebars"),
        tmplList1 = __inline("../ui/suser-rclist-rList1.handlebars"),
        tmplList2 = __inline("../ui/suser-rclist-rList2.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        positionKind = Dict.get("positionKind"),
        interestStatus = Dict.get("interestStatus"),
        urgentLevel = Dict.get("urgentLevel"),
        serverStatus = Dict.get("serverStatus"),
        idx = base.getUrlParam("l") || 0,
        start = 1, citylist;

    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isCompUser()){
            Handlebars.registerHelper('formatDate', function(num, options){
                var dd = new Date(num);
                return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
            });
            Handlebars.registerHelper('formtIStatus', function(num, options){
                return interestStatus[num];
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
            Handlebars.registerHelper('formatWorkTime', function(num, options){
                if(!num){
                    return "无";
                }
                return num;
            });
            Handlebars.registerHelper('formatSStatus', function(num, options){
                return serverStatus[num];
            });
            //getPagePosition();
            addListener();
            $("#rcUl").find("li:eq("+idx+")").click();
            addPositionKind();
            addAddress();
        }else{
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        }
    }
    //分页查询已发布职位
    function getPagePosition(flag){
        base.getPagePosition({
            companyCode: base.getCompanyCode(),
            start: start,
            limit: 10
        }, flag).then(function(res){
                if(res.success && res.data.list.length){
                    var data = res.data;
                    $("#yfbzw-table").find("tbody").html( tmplList({items: res.data.list}) );
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
                            addLoading($("#yfbzw-table").find("tbody"), 7);
                            getPagePosition();
                        }
                    });
                }else{
                    doError($("#yfbzw-table").find("tbody"), 7);
                }
            });
    }
    //分页查询应聘简历
    function getPageLikeMyPosition(){
        base.getPageInterestPosition({
            start: start,
            limit: 10
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#ypjl-table").find("tbody").html( tmplList1({items: res.data.list}) );
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
                        addLoading($("#ypjl-table").find("tbody"), 7);
                        getPageLikeMyPosition();
                    }
                });
            }else{
                doError($("#ypjl-table").find("tbody"), 7);
            }
        });
    }
    //分页查询简历
    function getPageResume(rcType, province, city){
        base.getPageResume({
            expPosition: rcType || "",
            expProvince: province || "",
            expCity: city || "",
            start: start,
            limit: 10,
            status: "1",
            isOpen: "1"
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#sjl-table").find("tbody").html( tmplList2({items: res.data.list}) );
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
                        getPageResume();
                    }
                });
            }else{
                doError($("#sjl-table").find("tbody"), 7);
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
            var col = 7, ele;
            if(idx == 0){
                ele = $("#yfbzw-table").find("tbody");
                addLoading(ele, col);
                getPagePosition();
            }else if(idx == 1){
                ele = $("#ypjl-table").find("tbody");
                addLoading(ele, col);
                getPageLikeMyPosition();
            }else{
                ele = $("#sjl-table").find("tbody");
                addLoading(ele, col);
                getPageResume();
            }
        });
        /***已发布职位start***/
        //checkbox
        $("#yfbzw-table").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#yfbzw-table").find(".checkinput.actived");
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
        $("#zwAdd").on("click", function(){
            var me = $(this);
            me.addClass("bg-loading").attr("disabled", "disabled");
            getListCredentials();
        });
        $("#zwDelete").on("click", function(){
            var tr = getCheckItem("yfbzw-table"),
                code = tr && tr.attr("code") || "",
                me = $(this);
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中...");
                    base.deletePosition({code: code})
                        .then(function(res){
                            me.removeClass("isDoing").text("删除");
                            if(res.success){
                                addLoading($("#yfbzw-table").find("tbody"), 7);
                                getPagePosition(true);
                                base.showMsg("删除成功！");
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
            var tr = getCheckItem("yfbzw-table"),
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../position/edit.html?code="+code+"&return=" + encodeURIComponent(location.pathname + "?l=0");
            }else{
                base.showMsg("您未选择所要修改的职位！");
            }
        });
        $("#zwSelect").on("click", function(){
            var tr = getCheckItem("yfbzw-table"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../position/detail.html?code="+code+"&return="+encodeURIComponent(location.pathname + "?l=0");
            }else{
                base.showMsg("您未选择所要查看的职位！");
            }
        });
        /***已发布职位end***/

        /***应聘简历start***/
        //checkbox
        $("#ypjl-table").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#ypjl-table").find(".checkinput.actived");
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
        $("#ypjlSelect").on("click", function(){
            var tr = getCheckItem("ypjl-table"), 
                code = tr && tr.attr("jCode") || "";
            if(code){
                location.href = "../xuser/resume-detail.html?code="+code+"&return="+encodeURIComponent(location.pathname + "?l=1");
            }else{
                base.showMsg("您未选择所要查看的简历！");
            }
        });
        $("#dealBtn").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("ypjl-table"), 
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
                                base.showMsg(res.msg);
                            }
                        });
                }else{
                    base.showMsg("您未选择所要处理的简历！");
                }
            }
        });
        /***应聘简历end***/

        /***搜简历start***/
        //checkbox
        $("#sjl-table").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#sjl-table").find(".checkinput.actived");
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
                $.each(citylist[prov_id].c,function(i,city){  
                    temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";  
                });
                temp_html = '<option value="-1">请选择城市</option>' + temp_html;
                $("#city").removeAttr("disabled").html(temp_html);
            }else{
                $("#city").html('<option value="-1">请选择城市</option>').attr("disabled", "disabled");
            }
        });
        $("#sjlWatch").on("click", function(){
            var tr = getCheckItem("sjl-table"), 
                code = tr && tr.attr("code") || "";
            if(code){
                location.href = "../xuser/resume-detail.html?code="+code + "&return="+encodeURIComponent(location.pathname + "?l=2");
            }else{
                base.showMsg("您未选择所要查看的简历！");
            }
        });
        $("#sjlLike").on("click", function(){
            var me = $(this);
            var tr = getCheckItem("sjl-table"), 
                code = tr && tr.attr("code") || "";
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("处理中...");
                    base.interested({
                        toCode : code,
                        type: 4
                    }).then(function(res){
                            me.removeClass("isDoing").text("感兴趣");
                            if(res.success){
                                base.showMsg("操作成功！");
                            }else{
                                base.showMsg(res.msg);
                            }
                        });
                }else{
                    base.showMsg("您未选择所要操作的简历！");
                }
            }
        });
        /***搜简历end***/
        $("#clearBtn").on("click", function(){
            $("#rcType")[0].selectedIndex = 0;
            $("#province")[0].selectedIndex = 0;
            $("#city").html('<option value="-1">请选择城市</option>').attr("disabled", "disabled");
        });
    }
    function getListCredentials(){
        base.getListCredentials({status: "1"})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    for(var i = 0; i < data.length; i++){
                        if(data[i].certificateType == "9"){
                            location.href = "../position/publish.html?return=" + encodeURIComponent(location.pathname + "?l=0");
                            return;
                        }
                    }
                    base.showMsg("非常抱歉，您没有当前服务的资质！");
                    setTimeout(function(){
                        location.href = "../suser/apply-certificate1.html";
                    }, 2000);
                }else{
                    base.showMsg("非常抱歉，暂时无法查询您是否具备当前服务的资质！");
                    $("#applyBtn").removeClass("bg-loading").removeAttr("disabled");
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

    function addPositionKind(){
        html = "";
        $.each(positionKind, function(n, type){
            html += '<option value="'+n+'">'+type+'</option>'
        });
        $("#rcType").append(html);
    }

    function addAddress(){
        base.getAddress()
            .then(function(res){
                var temp_html = "";
                citylist = res.citylist;
                $.each(citylist,function(i,prov){  
                    temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";  
                }); 
                $("#province").append(temp_html);
            })
    }

    function addLoading(ele, col){
        ele.html("<tr><td colspan='"+col+"'><i class='loading-icon'></i></td></tr>");
    }

    function doError(ele, col){
        ele.html("<tr><td colspan='"+col+"'>暂无数据</td></tr>")
    }
});