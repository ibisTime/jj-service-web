define([
    'app/controller/base',
    'app/util/dict',
    'Handlebars',
    'lib/Pagination'
], function (base, Dict, Handlebars, Pagination) {
    var template = __inline("../ui/error-fragment.handlebars"),
        tmplList = __inline("../ui/suser-fwlist-rList.handlebars"),
        start = 1,
        serverType = Dict.get("serverType"),
        companyCode = base.getUrlParam("code"),
        type = base.getUrlParam("t") || "";

    init();

    function init(){
        $("#fwA").addClass("current");
        Handlebars.registerHelper('formatPrice', function(num, options){
            return num && (+num / 1000);
        });
        Handlebars.registerHelper('formatDate', function(num, options){
            var dd = new Date(num);
            return dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        });
        Handlebars.registerHelper('formtSType', function(num, options){
            return serverType[num];
        });
        if(type){
            $("#leftNav").find("li[code='"+type+"']").addClass("current");
        }
        if(base.isLogin()){
            getCompanyInfo();
        }else{
            $("#noLogin").removeClass("hidden");
        }
        getPageServers();
        addListeners();
    }

    function getCompanyInfo(){
        base.getCompanyInfo({code: companyCode})
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    addCompInfo(data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息！");
                }
            });
    }
    
    function addCompInfo(data){
        var topForm = $("#topForm").detach();
        //公司
        if(data.type == "1"){
            $("#isComp", topForm).removeClass("hidden");

            $("#compName", topForm).val(data.name);
            $("#gsyyzzh", topForm).attr("src", data.gsyyzzh);
            $("#logo", topForm).attr("src", data.logo);
        //个体户
        }else{
            $("#isGt", topForm).removeClass("hidden");

            $("#realName", topForm).val(data.name);
            $("#sfz", topForm).attr("src", data.gsyyzzh);
            $("#gthtb", topForm).attr("src", data.logo);
        }

        $("#contacts", topForm).val(data.contacts);
        $("#mobile", topForm).val(data.mobile);
        $("#email", topForm).val(data.email);
        $("#qq", topForm).val(data.qq);
        $("#scale", topForm).val(data.scale);
        $("#address", topForm).html( (data.province || "") + "" + (data.city || "") + (data.area || "") + (data.address || ""));
        $("#slogan", topForm).val(data.slogan);
        $("#compDescription", topForm).val(data.description);

        $("#compDiv").removeClass("hidden").append(topForm);
    }

    function addListeners(){
        $("#bTable").on("click", "tbody tr", function(e){
            var me = $(this), checkInput = me.find(".checkinput");
            if(e.target.type == "checkbox"){
                e.target.checked = !e.target.checked
            }
            if(!checkInput[0].checked){
                var checkList = $("#bTable").find(".checkinput.actived");
                for(var i = 0; i < checkList.length; i++){
                    checkList[i].checked = false;
                }
                checkInput[0].checked = true;
                checkInput.addClass("actived");
            }else{
                checkInput[0].checked = false;
                checkInput.removeClass("actived");
            }
        });

        $("#watchBtn").on("click", function(){
            var code = getCheckItem();
            if(code){
                location.href = "./detail.html?code=" + code + "&return=" + base.makeReturnUrl();
            }else{
                base.showMsg("您未选择所要查看的服务！");
            }
        });

        $("#gtLogin").on("click", function(){
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        });
    }
    function getCheckItem(){
        var ele1 = $("#bTable").find(".checkinput.actived");
        if(ele1.length){
            return ele1.closest("tr").attr("code");
        }else{
            return "";
        }
    }
    //获取服务列表
    function getPageServers(){
        base.getPageServers({
            start: start,
            limit: "10",
            type: type,
            companyCode: companyCode
        }).then(function(res){
            if(res.success && res.data.list.length){
                var data = res.data;
                $("#bTable").find("tbody").html(tmplList({items: data.list}));
                $("#pagination_div").pagination({
                    items: data.totalCount,
                    itemsOnPage: 10,
                    pages: data.totalPage,
                    prevText: '<',
                    nextText: '>',
                    displayedPages: '2',
                    currentPage: start,
                    onPageClick: function(pageNumber){
                        start = pageNumber;
                        addLoading();
                        getPageServers();
                    }
                });
            }else{
                doError();
            }
        });
    }
    function addLoading(){
        $("#r-table").find("tbody").html("<tr><td colspan='6'><i class='loading-icon'></i></td></tr>");
    }
    function doError() {
        $("#bTable").find("tbody").html("<tr><td colspan='6'>暂无服务信息</td></tr>");
    }
});