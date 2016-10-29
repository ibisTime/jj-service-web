define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars'
], function (base, Ajax, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/server-index-rList.handlebars"),
        experience = Dict.get("experience"),
        refreshTime = Dict.get("refreshTime"),
        lFirst = true, rFirst = true;

    init();

    function init(){
        var fwTypes = sessionStorage.getItem("fwTypes");
        if(fwTypes){
            addLeftNav(fwTypes);
        }else{
            getDictList();
        }
        getPageServers();
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

    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }

    function getPageServers(){
        base.getPageServers({
            start: "1",
            limit: "10",
            isHot: "1"
        }).then(function(res){
            if(res.success){
                $("#r-list").html( rightListmpl({items: res.data.list}) );
            }else{
                if(rFirst){
                    doError($("#r-list"));
                }
            }
            rFirst = false;
            setTimeout(getPagePosition, refreshTime);
        });
    }

    function doError(ele) {
        ele.html(template);
    }
});