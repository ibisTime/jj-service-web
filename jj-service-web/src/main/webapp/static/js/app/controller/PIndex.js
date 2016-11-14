define([
    'app/controller/base',
    'app/util/dict',
    'lib/swiper-3.3.1.jquery.min',
    'Handlebars'
], function (base, Dict, Swiper, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        leftNavTmpl = __inline("../ui/position-index-lnav.handlebars"),
        rightListmpl = __inline("../ui/position-index-rList.handlebars"),
        experience = Dict.get("experience"),
        refreshTime = Dict.get("refreshTime"),
        lFirst = true, rFirst = true;

    init();

    function init(){
        $("#rcA").addClass("current");
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
        getBannerList();
        addListeners();
    }
    function getBannerList(){
        base.getBannerList({location: "2"})
            .then(function(res){
                if(res.success){
                    if(res.data.length){
                        var data = res.data, html = "";
                        for(var i = 0; i < data.length; i++){
                            html += '<div class="swiper-slide"><img class="wp100 cur_pointer" src="'+data[i].pic+'"></div>';
                        }
                        if(data.length == 1){
                            $("#swiper-pagination").remove();
                        }
                        $("#swr").html(html);
                        swiperImg();
                    }
                }else{
					base.showMsg("非常抱歉，暂时无法获取banner!");
				}
            });
    }
    function swiperImg(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination'
        });
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
        $("#r-list").on("click", ".information-l", function(){
            var code = $(this).attr("code");
            location.href = "./list-detail.html?code=" + code + "&return=" + base.makeReturnUrl();
        });
        $("#swiper-container").on("click", "img", function(){
            if(base.isCompUser()){
                location.href = "./fwlist.html";
            }else{
                location.href = "./xqlist.html";
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
            isHot: "1",
            status: "1",
            orderColumn: "order_no",
            orderDir: "ase",
            gsProvince: localStorage.getItem("province"),
            gsCity: localStorage.getItem("city"),
            gsArea: localStorage.getItem("area")
        }).then(function(res){
            if(res.success && res.data.list.length){
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