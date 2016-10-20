define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    var COMPANYCODE = "", wxMenuCode = "", wxMenuName = "";
    var start = 1, limit = 10, isEnd = false, wxMenuList = [],
        canScrolling = false, first = true, contentType = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            base.addIcon();
            getMyContent();
        }else{
            base.getCompanyByUrl()
                .then(function(){
                    if(COMPANYCODE = sessionStorage.getItem("compCode")){
                        base.addIcon();
                        getMyContent();
                    }else{
                        base.showMsg("非常抱歉，暂时无法获取公司信息!");
                        $(".icon-loading").remove();
                    }
                });
        }
    }

    function addListeners(){
        $(window).on("scroll", function(){
            if( canScrolling && !isEnd && ($(document).height() - $(window).height() - 10 <= $(document).scrollTop()) ){
                canScrolling = false;
                getContentPage();
            }
        });
    }

    function getMyContent(){
        getWXCode()
            .then(function(){
                if(contentType == "ele"){
                    getContent();                    
                    $("#customDiv").addClass("hidden");
                    $("#eleCont").removeClass("hidden");
                }else{
                    getContentPage();
                    addListeners(); 
                }
            });
        getBanner();        
    }

    function getContent(){
        base.getContentList(wxMenuCode)
            .then(function(res){
                $(".icon-loading").remove();
                if(res.success){
                    var data = res.data[0];
                    $("#title").text(data.title);
                    var pic = data.pic2;
                    if(isPicture(pic)){
                        $("#img").html('<img class="wp100" src="'+pic+'">');
                    }else{
                        $("#bg-video").removeClass("hidden")
                            .html('<source src="'+pic+'" type="video/mp4">'+
                                    '<source src="'+pic+'" type="video/WebM">'+
                                    '<source src="'+pic+'" type="video/Ogg">');
                    }
                    $("#description").html(data.description);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取相关内容!");
                }
            });
    }

    function getWXCode(){
        return base.getMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var list = res.data, cCode, menuArr = {};
                    for(var i = 0; i < list.length; i++){
                        if(/^wei/.test(list[i].code)){
                            wxMenuCode = list[i].code;
                            wxMenuName = list[i].name;
                            sessionStorage.setItem("wxMenuCode", wxMenuCode)
                            sessionStorage.setItem("wxMenuName", wxMenuName);
                            $("#wxdjcd").text(wxMenuName);
                            contentType = list[i].contentType;
                        }
                    }
                }
            });
    }
    function getContentPage(){
        base.getContentPage(wxMenuCode, start, limit)
            .then(function(res){
                $(".icon-loading").addClass("hidden");
                if(res.success){
                    var list = res.data.list, html = "",
                        totalCount = +res.data.totalCount;
                    if(totalCount <= limit || list.length < limit){
                        isEnd = true;
                    }
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        html += '<li class="wp50 fl">'+
                                    '<div class="plr12">'+
                                        '<div class="p">';
                        if(ll.type == "0" || ll.url){
                            if(ll.url){
                                html += '<a class="re wp100" href="'+ll.url+'">';
                            }else{
                                html += '<a class="re wp100" href="'+ll.endNote+'">';
                            }
                        }else{
                            html += '<a class="re wp100" href="./content.html?code='+ll.code+'">';
                        }
                        html += '<div><img class="p-pic" src="'+ll.pic1+'"/></div>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="mt14 t-3dot">'+ll.title+'</div>'+
                                '</div>'+
                            '</li>';
                    }
                    $("#customUl").append(html);
                    start++;
                    first = false;
                    canScrolling = true;
                }else{
                    if(first){
                        base.showMsg("非常抱歉，暂时无法获取数据!");
                    }
                }
            })
    }
    function getBanner(){
        base.getBanner(COMPANYCODE, 3)
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img class="wp100" src="'+data[i].pic+'"></div>';
                    }
                    $("#swr").html(html);
                    swiperImg();
                }
                $(".icon-loading").remove();
            });
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
    function isPicture(url){
        var ext = url.substring(url.lastIndexOf("."), url.length).toUpperCase();
        if(ext!=".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG"){
            return false;
        }else{
            return true;
        }
    }
});