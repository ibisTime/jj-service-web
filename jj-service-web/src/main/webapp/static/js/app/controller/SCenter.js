define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dict',
    'Handlebars'
], function (base, Ajax, Dict, Handlebars) {
    var template = __inline("../ui/error-fragment.handlebars"),
        certificateStatus = Dict.get("certificateStatus");

    init();

    function init(){
        if(base.isLogin()){
            getUserInfo();
            getPageCredentials();
        }else{
            //未登录
        }
    }

    function getUserInfo(){
        base.getUserInfo()
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
            "start": "1",
            "limit": "5"
        }).then(function(res){
            if(res.success){
                var list = res.data.list, html = "";
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
                                        '<td><a href="">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="">删除</a></td>'+
                                    '</tr>';
                        }else if(list[i].status == "1"){
                            html += '<tr>'+
                                        '<td>软件</td>'+
                                        '<td>通过</td>'+
                                        '<td><a class="check" href="">查看详情</a></td>'+
                                    '</tr>';
                        }else if(list[i].status == "2"){
                            html += '<tr>'+
                                        '<td>软件</td>'+
                                        '<td>不通过</td>'+
                                        '<td><a href="">重新提交</a></td>'+
                                    '</tr>';
                        }
                    }
                    $("#r-table").find("tbody").html(html);
                }else{
                    doError();
                }
            }else{
                doError();
            }
        });
    }

    function doError() {
        $("#r-table").find("tbody").html('<tr><td colspan="3">暂无相关资质</td></tr>');
    }
});