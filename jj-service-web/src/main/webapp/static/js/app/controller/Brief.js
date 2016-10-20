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
            getCompany()
                .then(function(){
                    getBanner();
                });
            getCompMenuList();
            if(sessionStorage.getItem("wxMenuCode")){
                var name = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(name);
            }
        }else{
            base.getCompanyByUrl(getMyCont);
        }
    }

    function getMyCont(res){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            base.addIcon();
            addCompanyInfo(res.data);
            getCompMenuList();
            getBanner()
                .then(function(){
                    getWXCode();
                });
        }else{
            base.showMsg("非常抱歉，暂时无法获取公司信息!");
        }
    }

    function getCompany(){
        return base.getCompany(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    addCompanyInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!")
                }
            });
    }

    function addCompanyInfo(data){
        $("#logo").html('<img class="wp200p" src="'+data.logo+'"/>');
        $("#comName").text(data.name);
        $("#slogan").text(data.slogan);
    }

    function getCompMenuList(){
        return base.getMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var data = res.data, cCode, menuArr = {};
                    //menuArr按父子关系保存菜单数据
					for(var j = 0, len = data.length; j < len; j++){
						var dd = data[j], pc = dd.parentCode;
						if(!pc || pc == "0"){
                            if(!menuArr[dd.code]){
                                menuArr[dd.code] = [];
                            }
                            //是微信顶级菜单
                            if(/^wei/.test(dd.code)){
                                sessionStorage.setItem("wxMenuCode", dd.code)
                                sessionStorage.setItem("wxMenuName", dd.name);
                                $("#wxdjcd").text(dd.name);
                            }else if(/^com/.test(dd.code)){
                                cCode = dd.code;
                            }
						}else{
                            if(!menuArr[pc]){
                                menuArr[pc] = [];
                                if(/^com/.test(pc)){
                                    cCode = pc;
                                }
                            }
                            menuArr[pc].push(dd);
						}
					}
                    var list = menuArr[cCode], html = '<a href="./address.html" class="plr10 p_r b_e6_b show">公司简介<i class="r-tip"></i></a>';
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        if(ll.contentType == "ele"){
                            html += '<a href="./s_content.html?code='+ll.code+'" class="plr10 p_r b_e6_b show">'+ll.name+'<i class="r-tip"></i></a>';
                        }else{
                            html += '<a href="./list.html?code='+ll.code+'" class="plr10 p_r b_e6_b show">'+ll.name+'<i class="r-tip"></i></a>';
                        }
                    }
                    $("#menuList").html(html);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!")
                }
            });
    }

    function getBanner(){
        return base.getBanner(COMPANYCODE, 4)
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
