define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars',
    'lib/Pagination'
], function (base, Ajax, Dict, Handlebars, Pagination) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/server-list-rList.handlebars"),
        start = 1, navCode = base.getUrlParam("code"),
        title = base.getUrlParam("n");

    init();

    function init(){
        document.title = title;
        var fwTypes = sessionStorage.getItem("fwTypes");
        if(fwTypes){
            addLeftNav(fwTypes);
        }else{
            getDictList();
        }
        getPageServers();
        addListeners();
    }

    function addListeners(){
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./list.html?code=" + code + "&n=" + me.text();
        });
        $("#fwBtn").on("click", function(){
            //服务方
            if(base.isCompUser()){
                var me = $(this);
                me.val("").addClass("bg-loading").attr("disabled", "disabled");
                getListCredentials();
            }else{
                base.showMsg("对不起，您不是企业用户，请先进行企业注册！");
            }
        });
        $("#rList").on("click", ".img-box", function(){
            location.href = "./comp-detail.html?code=" + $(this).attr("code") + "&t=" + navCode + "&n=" + title;
        });
    }

    function getListCredentials(){
        base.getListCredentials({status: "1"})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    for(var i = 0; i < data.length; i++){
                        if(data[i].certificateCode == code){
                            location.href = "./mfwlist.html?code=" + code;
                            return;
                        }
                    }
                    base.showMsg("非常抱歉，您没有当前服务的资质！");
                    setTimeout(function(){
                        location.href = "";
                    }, 1500);
                }else{
                    base.showMsg("非常抱歉，暂时无法查询您是否具备当前服务的资质！");
                    $("#fwBtn")
                        .val("我是服务商")
                        .removeClass("bg-loading")
                        .removeAttr("disabled");
                }
            });
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
            type: navCode
        }).then(function(res){
            if(res.success){
                var data = res.data;
                $("#rList").html( rightListmpl({items: data.list}) );
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
                doError($("#rList"));
            }
        });
    }
    function addLoading(){
        $("#rList").find("tbody").html("<div><i class='loading-icon'></i></div>");
    }
    function doError(ele) {
        ele.html(template);
    }
});