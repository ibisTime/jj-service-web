define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars',
    'lib/Pagination'
], function (base, Dict, Handlebars, Pagination) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/server-list-rList.handlebars"),
        start = 1, navCode = base.getUrlParam("code") || "1";

    init();

    function init(){
        var fwTypes = sessionStorage.getItem("fwTypes");
        if(fwTypes){
            addLeftNav($.parseJSON(fwTypes));
        }else{
            getDictList();
        }
        getPageCredentials();
        addListeners();
    }

    function addListeners(){
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code"), text = me.text();
            location.href = "./list.html?code=" + code + "&n=" + text.substr(0, text.length - 1);
        });
        $("#fwBtn").on("click", function(){
            //服务方
            if(base.isCompUser()){
                var me = $(this);
                me.addClass("bg-loading").attr("disabled", "disabled");
                getListCredentials();
            }else{
                base.showMsg("对不起，您不是企业用户，请先进行企业注册！");
            }
        });
        $("#rList").on("click", ".img-box", function(){
            location.href = "./comp-detail.html?code=" + $(this).attr("code") + "&t=" + navCode;
        });
    }

    function getListCredentials(){
        base.getListCredentials({status: "1"})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    for(var i = 0; i < data.length; i++){
                        if(data[i].certificateType == navCode){
                            location.href = "./mfwlist.html?type=" + navCode;
                            return;
                        }
                    }
                    base.showMsg("非常抱歉，您没有当前服务的资质！");
                    setTimeout(function(){
                        location.href = "../suser/apply-certificate1.html";
                    }, 1500);
                }else{
                    base.showMsg("非常抱歉，暂时无法查询您是否具备当前服务的资质！");
                    $("#fwBtn").removeClass("bg-loading").removeAttr("disabled");
                }
            });
    }

    function getDictList(){
        base.getServerDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                }
            });
    }
    //添加左侧导航栏
    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }
    //获取服务商列表
    function getPageCredentials(){
        //navCode
        base.getPageCredentials({
            certificateType: navCode,
            limit: "10",
            start: start
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#rList").html( rightListmpl({items: res.data.list}) );
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
                        getPageCredentials();
                    }
                });
            }else{
                doError($("#rList"));
            }
        });
    }
    function addLoading(){
        $("#rList").html("<div><i class='loading-icon'></i></div>");
    }
    function doError(ele) {
        ele.html(template);
    }
});