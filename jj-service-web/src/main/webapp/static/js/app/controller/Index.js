define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        lTableTmpl = __inline("../ui/index-ltable.handlebars"),
        rTableTmpl = __inline("../ui/index-rtable.handlebars"),
        lFirst = true, rFirst = true,
        refreshTime = Dict.get("refreshTime");

    init();

    function init(){
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        getPageComp();
        getPageNews();
        addListeners();
    }
    function addListeners(){
        $("#r-table").on("click", "tr", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./news.html?c=" + code;
        });
        $("#l-table").on("click", "tr", function(){
            var me = $(this);
        });
    }
    function getPageComp(){
        base.getPageComp({
            start: "1",
            limit: "10",
            isHot: "1"
        }).then(function(res){
            if(res.success && res.data.list.length){
                $("#l-table").find("tbody").html( lTableTmpl({items: res.data.list}) );
            }else{
                if(lFirst){
                    doError($("#l-table").find("tbody"));
                }
            }
            lFirst = false;
            setTimeout(getPageComp, refreshTime);
        });
    }

    function getPageNews(){
        base.getPageNews({
            start: "1",
            limit: "10",
            type: "2"
        }).then(function(res){
            if(res.success && res.data.list.length){
                $("#r-table").find("tbody").html( rTableTmpl({items: res.data.list}) );
            }else{
                if(rFirst){
                    doError($("#r-table").find("tbody"));
                }
            }
            rFirst = false;
            setTimeout(getPageNews, refreshTime);
        });
    }

    function doError(ele) {
        ele.html(template);
    }
});