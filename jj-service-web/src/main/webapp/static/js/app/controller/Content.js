define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    $(function () {

        var code = base.getUrlParam("code");
        init();
        function init(){
            base.addIcon();
            getContent();
        }

        function getContent(){
            base.getContent(code)
                .then(function(res){
                    if(res.success){
                        var data = res.data;
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

        function isPicture(url){
            var ext = url.substring(url.lastIndexOf("."), url.length).toUpperCase();
            if(ext!=".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG"){
                return false;
            }else{
                return true;
            }
        }
    });
});
