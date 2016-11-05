define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'lib/Pagination',
    'Handlebars'
], function (base, Ajax, Dict, Pagination, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        certificateStatus = Dict.get("certificateStatus"),
        start = 1;

    init();

    function init(){
        if(base.isCompUser()){
            getCompanyInfo();
            getPageCredentials();
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
                                        '<td>软件</td>'+
                                        '<td>待审核</td>'+
                                        '<td><a class="check" href="./certificate-info.html?code='+list[i].code+'">查看详情</a></td>'+
                                    '</tr>';
                        }else if(list[i].status == "1"){
                            html += '<tr>'+
                                        '<td>软件</td>'+
                                        '<td>通过</td>'+
                                        '<td><a class="check" href="./certificate-info.html?code='+list[i].code+'">查看详情</a></td>'+
                                    '</tr>';
                        }else if(list[i].status == "2"){
                            html += '<tr>'+
                                        '<td>软件</td>'+
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