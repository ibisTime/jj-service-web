define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {
    var start = 1, limit = 10, isEnd = false,
        canScrolling = false, first = true,
        code = base.getUrlParam("code"),
        COMPANYCODE, wxMenuCode = "", wxMenuName = "";
    init();
    function init(){
        getContentPage();
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            base.addIcon();
            if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                wxMenuName = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(wxMenuName);
            }else{
                getWXCode();
            }
        }else{
             base.getCompanyByUrl()
                .then(function(){
                    if(COMPANYCODE = sessionStorage.getItem("compCode")){
                        base.addIcon();
                        getWXCode();
                    }else{
                        base.showMsg("非常抱歉，暂时无法获取公司信息!");
                    }
                });
        }
        addListeners();
    }

    function addListeners(){
        $(window).on("scroll", function(){
            if( canScrolling && !isEnd && ($(document).height() - $(window).height() - 10 <= $(document).scrollTop()) ){
                canScrolling = false;
                getContentPage();
            }
        });
    }

    function getContentPage(){
        base.getContentPage(code, start, limit)
            .then(function(res){
                if(res.success){
                    var list = res.data.list, html = "",
                        totalCount = +res.data.totalCount;
                    if(totalCount <= limit || list.length < limit){
                        isEnd = true;
                    }
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        html += '<li class="wp100 b_e6_b">';
                        if(ll.type == "0" || ll.url){
                            if(ll.url){
                                html += '<a class="show" href="'+ll.url+'">'
                                            '<div class="plr12 ptb10 clearfix">'+
                                                '<div class="fl wp30 tl"><img class="max-hp100p" src="'+ll.pic1+'"/></div>'+
                                                '<div class="fl wp55 plr6">'+ll.title+'</div>'+
                                                '<div class="fl wp15 s_10 tr">'+ll.endNote+'</div>'+
                                            '</div>'+
                                        '</a></li>';
                            }else{
                                html += '<a class="show" href="'+ll.endNote+'">'+
                                            '<div class="plr12 ptb10 clearfix">'+
                                                '<div class="fl wp30 tl"><img class="max-hp100p" src="'+ll.pic1+'"/></div>'+
                                                '<div class="fl wp55 plr6">'+ll.title+'</div>'+
                                            '</div>'+
                                        '</a></li>';
                            }
                        }else{
                            html += '<a class="show" href="../custom/content.html?code='+ll.code+'">'+
                                        '<div class="plr12 ptb10 clearfix">'+
                                            '<div class="fl wp30 tl"><img class="max-hp100p" src="'+ll.pic1+'"/></div>'+
                                            '<div class="fl wp55 plr6">'+ll.title+'</div>'+
                                            '<div class="fl wp15 s_10 tr">'+ll.endNote+'</div>'+
                                        '</div>'+
                                    '</a></li>';
                        }
                    }
                    first && $(".icon-loading").remove();
                    $("#customUl").append(html);
                    start++;
                    first = false;
                    canScrolling = true;
                }else{
                    if(first){
                        base.showMsg("非常抱歉，暂时无法获取数据!");
                        $(".icon-loading").remove();
                    }
                }
            })
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
});