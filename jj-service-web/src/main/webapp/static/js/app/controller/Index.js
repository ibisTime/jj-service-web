define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars'
], function (base, Ajax, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        lTableTmpl = __inline("../ui/index-ltable.handlebars"),
        rTableTmpl = __inline("../ui/index-rtable.handlebars"),
        lFirst = true, rFirst = true,
        refreshTime = Dict.get("refreshTime");

    init();

    function init(){
        // Handlebars.registerHelper('formatDate', function(num, options){
        //     num = num + '';
        //     return num.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
        // });
        getPageServers();
        getPageNews();
    }

    function getPageServers(){
        base.getPageServers({
            start: "1",
            limit: "10",
            isHot: "1"
        }).then(function(res){
            if(res.success){
                $("#l-table").find("tbody").html( lTableTmpl({items: res.data.list}) );
            }else{
                if(lFirst){
                    doError($("#l-table").find("tbody"));
                }
            }
            lFirst = false;
            setTimeout(getPageServers, refreshTime);
        });
    }

    function getPageNews(){
        base.getPageNews({
            start: "1",
            limit: "10",
            type: "2"
        }).then(function(res){
            if(res.success){
                $("#r-table").find("tbody").html( rTableTmpl({items: res.data.list}) );
            }else{
                if(rFirst){
                    doError($("#r-table").find("body"));
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