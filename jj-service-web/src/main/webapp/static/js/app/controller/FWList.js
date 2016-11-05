define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars',
    'lib/Pagination'
], function (base, Ajax, Dict, Handlebars, Pagination) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/position-xqList-rList.handlebars"),
        experience = Dict.get("experience"), start = 1,
        navCode = base.getUrlParam("code"),
        title = base.getUrlParam("n");

    init();

    function init(){
        document.title = title;
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        Handlebars.registerHelper('formtExp', function(num, options){
            return experience[num];
        });
        if(base.isCompUser()){
            var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
            if(rcTypes){
                addLeftNav($.parseJSON(rcTypes));
            }else{
                getDictList();
            }
            getPagePosition();
            addListeners();
        }else{
            base.showMsg("非常抱歉，您暂时没有权限查看当前页面!");
        }
    }

    function addListeners(){
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./fwlist.html?code=" + code + "&n=" + me.text();
        });
        
        $("#r-table").on("click", "tbody tr .checkinput", function(e){
            var me = $(this);
            if(me[0].checked){
                var checkList = $("#r-table").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                me.addClass("actived");
            }else{
                me.removeClass("actived");
            }
        });
        //查看详情
        $("#watchBtn").on("click", function(){
            var code = getCheckItem();
            if(code){
                location.href = "./list-detail.html?code=" + code;
            }else{
                base.showMsg("您未选择所要查看的职位！");
            }
        });
        //发布职位
        $("#applyBtn").on("click", function(){
            var me = $(this);
            me.val("").addClass("bg-loading").attr("disabled", "disabled");
            location.href = "./publish.html?return=" + base.makeReturnUrl();
        });
    }

    function getListCredentials(){
        base.getListCredentials({status: "1"})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    for(var i = 0; i < data.length; i++){
                        if(data[i].type == "9"){
                            location.href = "./publish.html?return=" + base.makeReturnUrl();
                            return;
                        }
                    }
                    base.showMsg("非常抱歉，您没有当前服务的资质！");
                    setTimeout(function(){
                        location.href = "";
                    }, 1500);
                }else{
                    base.showMsg("非常抱歉，暂时无法查询您是否具备当前服务的资质！");
                    $("#applyBtn")
                        .val("发布职位")
                        .removeClass("bg-loading")
                        .removeAttr("disabled");
                }
            });
    }

    function getCheckItem(){
        var ele1 = $("#r-table").find(".checkinput.actived");
        if(ele1.length){
            return ele1.closest("tr").attr("code");
        }else{
            return "";
        }
    }

    function getDictList(){
        base.getPositionDictList()
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
    //获取热门职位信息
    function getPagePosition(){
        base.getPagePosition({
            start: start,
            limit: "10"
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#r-table").find("tbody").html( rightListmpl({items: data.list}) );
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
                        getPagePosition();
                    }
                });
            }else{
                doError($("#r-table"));
            }
        });
    }
    function addLoading(){
        $("#r-table").find("tbody").html("<tr><td colspan='6'><i class='loading-icon'></i></td></tr>");
    }
    function doError(ele) {
        ele.html(template);
    }
});