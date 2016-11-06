define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars',
    'lib/Pagination'
], function (base, Dict, Handlebars, Pagination) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        start = 1,
        serverType = Dict.get("serverType"),
        companyCode = base.getUrlParam("code"),
        type = base.getUrlParam("t") || "";

    init();

    function init(){
        var fwTypes = sessionStorage.getItem("fwTypes");
        if(fwTypes){
            addLeftNav($.parseJSON(fwTypes));
        }else{
            getDictList();
        }
        if(base.isLogin()){
            getCompanyInfo();
        }else{
            $("#noLogin").removeClass("hidden");
        }
        getPageServers();
        addListeners();
    }

    function getCompanyInfo(){
        base.getCompanyInfo({code: companyCode})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    addCompInfo(data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息！");
                }
            });
    }
    
    function addCompInfo(data){
        var topForm = $("#topForm").detach();
        //公司
        if(data.type == "1"){
            $("#isComp", topForm).removeClass("hidden");

            $("#compName", topForm).val(data.name);
            $("#gsyyzzh", topForm).attr("src", data.gsyyzzh);
            $("#logo", topForm).attr("src", data.logo);
        //个体户
        }else{
            $("#isGt", topForm).removeClass("hidden");

            $("#realName", topForm).val(data.name);
            $("#sfz", topForm).attr("src", data.gsyyzzh);
            $("#gthtb", topForm).attr("src", data.logo);
        }

        $("#contacts", topForm).val(data.contacts);
        $("#mobile", topForm).val(data.mobile);
        $("#email", topForm).val(data.email);
        $("#qq", topForm).val(data.qq);
        $("#scale", topForm).val(data.scale);
        $("#address", topForm).html( (data.province || "") + "" + (data.city || "") + (data.area || "") + (data.address || ""));
        $("#compDescription", topForm).val(data.description);

        $("#compDiv").removeClass("hidden").append(topForm);
    }

    function addListeners(){
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./list.html?code=" + code + "&n=" + me.text();
        });
        
        $("#bTable").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#bTable").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });

        $("#watchBtn").on("click", function(){
            var code = getCheckItem();
            if(code){
                location.href = "./detail.html?code=" + code + "&return=" + base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要查看的服务！");
            }
        });
    }
    function getCheckItem(){
        var ele1 = $("#bTable").find(".checkinput.actived");
        if(ele1.length){
            return ele1.closest("tr").attr("code");
        }else{
            return "";
        }
    }
    function getDictList(){
        base.getServerDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                    sessionStorage.setItem("fwTypes", res.data);
                }
            });
    }
    //添加左侧导航栏
    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }
    //获取服务列表
    function getPageServers(){
        base.getPageServers({
            start: start,
            limit: "10",
            type: type,
            companyCode: companyCode
        }).then(function(res){
            if(res.success){
                var data = res.data;
                addTable(data.list);
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
                        addLoading();
                        getPageServers();
                    }
                });
            }else{
                doError($("#bTable"));
            }
        });
    }
    function addTable(data){
        var html = "";
        $.each(data, function(i, dd){
            html += '<tr code="'+dd.code+'">'+
                        '<td><input type="checkbox" class="checkinput"></td>'+
                        '<td>'+dd.name+'</td>'+
                        '<td>'+serverType[dd.type]+'</td>'+
                        '<td>'+dd.company.name+'</td>'+
                        '<td>￥'+dd.quoteMin+'-￥'+dd.quoteMin+'</td>'+
                    '</tr>';
        });
        $("#bTable").find("tbody").html( html );
    }
    function addLoading(){
        $("#r-table").find("tbody").html("<tr><td colspan='5'><i class='loading-icon'></i></td></tr>");
    }
    function doError() {
        $("#bTable").find("body").html("<tr><td colspan='5'>暂时无法获取服务信息</td></tr>");
    }
});