define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars'
], function (base, Ajax, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/position-index-rList.handlebars"),
        experience = Dict.get("experience"),
        refreshTime = Dict.get("refreshTime"),
        lFirst = true, rFirst = true;

    init();

    function init(){
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        Handlebars.registerHelper('formtExp', function(num, options){
            return experience[num];
        });
        var rcTypes = sessionStorage.getItem("rcTypes");    //人才数据字典
        if(rcTypes){
            rcTypes = $.parseJSON(rcTypes);
            addLeftNav(rcTypes);
        }else{
            getDictList();
        }
        getHotPagePosition();
        addListeners();
    }

    function addListeners(){
        $("#leftNav").on("click", "li", function(){
            var me = $(this), code = me.attr("code");
            //到服务方页面
            if(base.isCompUser()){
                location.href = "./fwlist.html?code=" + code + "&n=" + me.text();
            //到需求方页面
            }else{
                location.href = "./xqlist.html?code=" + code + "&n=" + me.text();
            }
        });
        $("#getMore").on("click", function(){
            var li = $("#leftNav").children("li:eq(0)"),
                code = li.attr("code");
            //到服务方页面
            if(base.isCompUser()){
                location.href = "./fwlist.html?code=" + code + "&n=" + li.text();
            //到需求方页面
            }else{
                location.href = "./xqlist.html?code=" + code + "&n=" + li.text();
            }
        });
    }

    function getDictList(){
        base.getPositionDictList()
            .then(function(res){
                if(res.success){
                    addLeftNav(res.data);
                    sessionStorage.setItem("rcTypes", JSON.stringify(res.data));
                }
            });
    }
    //添加左侧导航栏
    function addLeftNav(data){
        $("#leftNav").html( leftNavTmpl({items: data}) );
    }
    //获取热门职位信息
    function getHotPagePosition(){
        base.getPagePosition({
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
            setTimeout(getHotPagePosition, refreshTime);
        });
    }

    function doError(ele) {
        ele.html(template);
    }
});