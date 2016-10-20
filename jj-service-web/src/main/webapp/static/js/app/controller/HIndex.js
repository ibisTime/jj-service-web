define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    var COMPANYCODE = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            base.addIcon();
            if(sessionStorage.getItem("wxMenuCode")){
                var name = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(name);
                getBanner();
            }else{
                getWXCodeAndBanner();
            }
        }else{
            base.getCompanyByUrl()
                .then(function(){
                    if(COMPANYCODE = sessionStorage.getItem("compCode")){
                        base.addIcon();
                        getWXCodeAndBanner();
                    }else{
                        $(".icon-loading").remove();
                        base.showMsg("非常抱歉，暂时无法获取公司信息!");
                    }
                });
        }
    }
    function getBanner(){
        base.getBanner(COMPANYCODE, 2)
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img class="wp100 hp100" src="'+data[i].pic+'"></div>';
                    }
                    $("#swr").html(html);
                    swiperImg();
                }
                $(".icon-loading").remove();
            });
    }
    function getWXCode(){
        base.getMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var list = res.data;
                    for(var i = 0; i < list.length; i++){
                        if(/^wei/.test(list[i].code)){
                            sessionStorage.setItem("wxMenuCode", list[i].code)
                            sessionStorage.setItem("wxMenuName", list[i].name);
                            $("#wxdjcd").text(list[i].name);
                        }
                    }
                }
            });
    }
    function getWXCodeAndBanner(){
        getWXCode();
        getBanner();
    }
    
    function swiperImg(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
    }
});
