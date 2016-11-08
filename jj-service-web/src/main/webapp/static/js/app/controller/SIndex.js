define([
    'app/controller/base',
    'app/util/dict',
    'lib/swiper-3.3.1.jquery.min',
    'Handlebars'
], function (base, Dict, Swiper, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        rightListmpl = __inline("../ui/server-index-rList.handlebars"),
        experience = Dict.get("experience"),
        refreshTime = Dict.get("refreshTime"),
        lFirst = true, rFirst = true;

    init();

    function init(){
        $("#fwA").addClass("current");
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        Handlebars.registerHelper('formatPrice', function(num, options){
            return num && (+num / 1000);
        });
        getPageServers();
        getBannerList();
        addListeners();
    }
    function getBannerList(){
        base.getBannerList({location: "3"})
            .then(function(res){
                if(res.success){
                    if(res.data.list){
                        var data = res.data, html = "";
                        for(var i = 0; i < data.length; i++){
                            html += '<div class="swiper-slide"><img src="'+data[i].pic+'"></div>';
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
            var me = $(this), code = me.attr("code"), text = me.text();
            location.href = "./list.html?code=" + code + "&n=" + text.substr(0, text.length - 1);
        });
        $("#getMore").on("click", function(){
            var li = $("#leftNav").children("li:eq(0)"),
                code = li.attr("code");
            location.href = "./list.html?code=" + code + "&n=" + li.text();
        });
        $("#r-list").on("click", ".information-l", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./detail.html?code="+code+"&return="+base.makeReturnUrl();
        });
        $("#swiper-container").on("click", "img", function(){
            location.href = "./list.html";
        });
    }

    function getPageServers(){
        base.getPageServers({
            start: "1",
            limit: "10",
            isHot: "1",
            province: localStorage.getItem("province"),
            city: localStorage.getItem("city")
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