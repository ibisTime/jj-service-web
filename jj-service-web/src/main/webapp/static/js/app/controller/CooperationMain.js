define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
	var COMPANYCODE, wxMenuCode = "", wxMenuName = "";
	init();

	function init(){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			base.addIcon();
			if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                wxMenuName = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(wxMenuName);
            }else{
                getWXCode();
            }
            getCompany();
		}else{
			base.getCompanyByUrl(getMyCont);
		}
		addListeners();
	}

	function getMyCont(res){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			base.addIcon();
			addCompanyInfo(res.data);
			getWXCode();
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!");
		}
	}

	function getCompany(){
		base.getCompany(COMPANYCODE)
			.then(function(res){
				addCompanyInfo(res);
			});
	}

	function addCompanyInfo(res){
		if(res.success){
			getBanner();
			var data = res.data;
			$("#qrCode").html('<img class="wp40" src="'+data.qrCode+'">')
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!");
		}
	}

	function getWXCode(){
		return base.getMenuList(COMPANYCODE)
			.then(function(res){
				if(res.success){
					var list = res.data;
					for(var i = 0; i < list.length; i++){
						if(/^wei/.test(list[i].code)){
							wxMenuCode = list[i].code;
							wxMenuName = list[i].name;
							sessionStorage.setItem("wxMenuCode", wxMenuCode)
							sessionStorage.setItem("wxMenuName", wxMenuName);
							$("#wxdjcd").text(wxMenuName);
						}
					}
				}
			});
	}

	function addListeners(){
		$("#footDiv").on("click", "a", function(e){
    		e.preventDefault();
    		var idx = $(this).index();
    		$("#ssD>.coopmain-img:eq("+idx+")").show(300);
    	});
    	$("#ssD").on("click", ".coopmain-img>img", function(e){
    		e.stopPropagation();
    		$(this).parent().hide(300);
    	});
    
    	$("#ksjq").on("click", function(){
    		location.href = "./cooperation.html";
    	});
	}

	function getBanner(){
        base.getBanner(COMPANYCODE, 5)
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
    	
});