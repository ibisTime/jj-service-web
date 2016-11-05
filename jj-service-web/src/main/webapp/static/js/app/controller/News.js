define([
    'app/controller/base'
], function (base) {

    var code = base.getUrlParam("c");

    init();

    function init(){
        if(code){
            getNewsInfo();
        }else{
            base.showMsg("未传入新闻公告编号");
        }
    }

    function getNewsInfo(){
        base.getNewsInfo({
            code: code
        }).then(function(res){
            if(res.success){
                $("#title").text(res.data.title);
                $("#cont").html(res.data.content);
            }else{
                doError($("#cont"));
            }
        });
    }

    function doError(ele) {
        ele.html(template);
    }
});