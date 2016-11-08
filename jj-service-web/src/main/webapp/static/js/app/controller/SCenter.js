define([
    'app/controller/base',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Dict, Pagination, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        serverType = Dict.get("serverType1"),
        start = 1;

    init();

    function init(){
        $("#userA").addClass("current");
        if(base.isCompUser()){
            getCompanyInfo();
            getPageCredentials();
            addListeners();
        }else{
            location.href = "../xuser/login.html?return=" + base.makeReturnUrl();
        }
    }

    function getCompanyInfo(){
        base.getCompanyInfo()
            .then(function(res){
                if(res.success){
                    var data = res.data;
                    $("#mobile").text(base.maskMobile(data.name));
                }else{
                    base.showMsg("非常抱歉，获取用户信息失败!");
                }
            });
    }
    function addListeners(){
        $("#r-table").on("click", ".zzdel", function(){
            var me = $(this),
                code = me.attr("code");
            if(!me.hasClass("isDoing")){
                if(code){
                    me.addClass("isDoing").text("删除中");
                    base.deleteCertificates({code: code})
                        .then(function(res){
                            me.removeClass("isDoing").text("删除");
                            if(res.success){
                                base.showMsg("删除成功！");
                                me.closest("tr").remove();
                                //tr.remove();
                            }else{
                                base.showMsg("非常抱歉，删除失败！")
                            }
                        });
                }else{
                    base.showMsg("您未选择所要删除的服务！");
                }
            }
            base.deleteCertificates({code: code})
                .then(function(){
                    
                })
        });
    }
    function getPageCredentials(){
        base.getPageCredentials({
            "start": start,
            "limit": "10"
        }).then(function(res){
            if(res.success){
                var data = res.data, list = data.list, html = "";
                if(list.length){
                    for(var i = 0; i < list.length; i++){
                        /**
                         *  "0": "待审核",
                            "1": "审核通过",
                            "2": "审核不通过"
                         */
                        if(list[i].status == "0"){
                            html += '<tr>'+
                                        '<td>'+serverType[list[i].certificateType]+'</td>'+
                                        '<td>待审核</td>'+
                                        '<td><a href="./apply-certificate2.html?code='+list[i].certificateCode+'&t=1&cc='+list[i].code+'&return='+base.makeReturnUrl()+'">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="zzdel" code="'+list[i].code+'">删除</a></td>'+
                                    '</tr>';
                        }else if(list[i].status == "1"){
                            html += '<tr>'+
                                        '<td>'+serverType[list[i].certificateType]+'</td>'+
                                        '<td>通过</td>'+
                                        '<td><a class="check" href="./certificate-info.html?code='+list[i].code+'">查看详情</a></td>'+
                                    '</tr>';
                        }else if(list[i].status == "2"){
                            html += '<tr>'+
                                        '<td>'+serverType[list[i].certificateType]+'</td>'+
                                        '<td>不通过</td>'+
                                        '<td><a title="'+list[i].approveNote+'" href="./apply-certificate2.html?code='+list[i].certificateCode+'&return='+base.makeReturnUrl()+'">重新提交</a></td>'+
                                    '</tr>';
                        }
                    }
                    $("#r-table").find("tbody").html(html);
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
                            getPageCredentials();
                        }
                    });
                }else{
                    doError();
                }
            }else{
                doError();
            }
        });
    }
    function addLoading(){
        $("#r-table").find("tbody").html("<tr><td colspan='3'><i class='loading-icon'></i></td></tr>");
    }
    function doError() {
        $("#r-table").find("tbody").html('<tr><td colspan="3">暂无相关资质</td></tr>');
    }
});