define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars'
], function (base, Dict, Handlebars) {
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
            addLeftNav($.parseJSON(fwTypes));
        }else{
            getDictList();
        }
        getPageServers();
        addListeners();
    }

    function addListeners(){
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code"), text = me.text();
            location.href = "./list.html?code=" + code + "&n=" + text.substr(0, text.length - 1);
        });
        $("#getMore").on("click", function(){
            var li = $("#leftNav").children("li:eq(0)"),
                code = li.attr("code");
            location.href = "./list.html?code=" + code + "&n=" + li.text();
        });
        $("#rList").on("click", ".img-box", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./detail.html?code="+code+"&return="+base.makeReturnUrl();
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

    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }

    function getPageServers(){
        base.getPageServers({
            start: "1",
            limit: "10",
            isHot: "1"
        }).then(function(res){
            if(res.success && res.data.list.length){
                $("#r-list").html( rightListmpl({items: res.data.list}) );
            }else{
                if(rFirst){
                    doError($("#r-list"));
                }
            }
            rFirst = false;
            setTimeout(getPageServers, refreshTime);
        });
    }

    function doError(ele) {
        ele.html(template);
    }
});