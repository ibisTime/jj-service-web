define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars',
    'lib/Pagination'
], function (base, Ajax, Dict, Handlebars, Pagination) {
    var leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/position-xqList-rList.handlebars"),
        experience = Dict.get("experience"), start = 1,
        navCode = base.getUrlParam("code"),
        title = base.getUrlParam("n");

    init();

    function init(){
        if(title){
            document.title = title;
        }
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        Handlebars.registerHelper('formtExp', function(num, options){
            return experience[num];
        });
        //需求方或未登录时
        if(base.isPerson()){
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
            var me = $(this), cc = me.attr("code"), text = me.text();
            location.href = "./xqlist.html?code=" + cc + "&n=" + text.substr(0, text.length - 1);
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
        //申请职位
        $("#applyBtn").on("click", function(){
            var code = getCheckItem();
            if(code){
                location.href = "./list-detail.html?code=" + code;
            }else{
                base.showMsg("您未选择所要申请的职位！");
            }
        });
    }

    function getCheckItem(){
        var tr = $("#r-table").find(".checkinput.actived");
        if(tr.length){
            return tr.closest("tr").attr("code");
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
                doError();
            }
        });
    }
    function addLoading(){
        $("#r-table").find("tbody").html("<tr><td colspan='7'><i class='loading-icon'></i></td></tr>");
    }
    function doError() {
        $("#r-table").find("tbody").html("<tr><td colspan='7'>暂时无法获取服务信息</td></tr>");
    }
});