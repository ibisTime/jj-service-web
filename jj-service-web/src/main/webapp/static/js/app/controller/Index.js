define([
    'app/controller/base',
    'app/util/dict',
    'lib/swiper-3.3.1.jquery.min',
    'Handlebars'
], function (base, Dict, Swiper, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        lTableTmpl = __inline("../ui/index-ltable.handlebars"),
        rTableTmpl = __inline("../ui/index-rtable.handlebars"),
        lFirst = true, rFirst = true,
        refreshTime = Dict.get("refreshTime");

    init();

    function init(){
        $("#homeA").addClass("current");
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        getPageComp();
        getPageNews();
        getBannerList();
        addListeners();
    }
    function getBannerList(){
        base.getBannerList({location: "1"})
            .then(function(res){
                if(res.success){
                    if(res.data.length){
                        var data = res.data, html = "";
                        for(var i = 0; i < data.length; i++){
                            html += '<div class="swiper-slide"><img class="wp100" src="'+data[i].pic+'"></div>';
                        }
                        if(data.length == 1){
                            $("#swiper-pagination").remove();
                        }
                        $("#swr").html(html);
                        swiperImg();
                    }else{
                        $(".end").css({
                            "position": "absolute",
                            "bottom": "0px",
                            "width": "100%",
                            "margin-top": "0px"
                        });
                    }
                }else{
                    $(".end").css({
                        "position": "absolute",
                        "bottom": "0px",
                        "width": "100%",
                        "margin-top": "0px"
                    });
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
        var swr = $("#swr").find("img");
        var time = setInterval(function(){
            if(swr.length && $(swr[0]).height()){
                clearInterval(time);
                var height = $(window).height() - 295 - $("#swiper-container").height();
                if(height>0){
                    $(".bigbox").css( {
                        "min-height": height + "px"
                    } );
                }
            }
        }, 10);
    }
    function addListeners(){
        $("#r-table").on("click", "tr", function(){
            var me = $(this), code = me.attr("code");
            location.href = "./news.html?c=" + code;
        });
        $("#l-table").on("click", "tr", function(){
            var me = $(this), code = me.attr("code");
            location.href = "../server/comp-detail.html?code=" + code;
        });
    }
    function getPageComp(){
        base.getPageComp({
            start: "1",
            limit: "10",
            orderColumn: "order_no",
            orderDir: "ase",
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
            //setTimeout(getPageComp, refreshTime);
        });
    }

    function getPageNews(){
        base.getPageNews({
            start: "1",
            limit: "10"
        }).then(function(res){
            if(res.success && res.data.list.length){
                $("#r-table").find("tbody").html( rTableTmpl({items: res.data.list}) );
            }else{
                if(rFirst){
                    doError($("#r-table").find("tbody"));
                }
            }
            rFirst = false;
            //setTimeout(getPageNews, refreshTime);
        });
    }

    function doError(ele) {
        ele.html(template);
    }
});