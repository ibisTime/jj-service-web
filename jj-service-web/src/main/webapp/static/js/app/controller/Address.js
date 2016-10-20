define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base, Ajax, Handlebars) {
    $(function(){
        var template = __inline("../ui/error-fragment.handlebars");
        var COMPANYCODE, wxMenuCode = "", wxMenuName = "";

        init();

        function init(){
            if(COMPANYCODE = sessionStorage.getItem("compCode")){
                base.addIcon();
                getCompanyInfo();
                if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                    wxMenuName = sessionStorage.getItem("wxMenuName");
                    $("#wxdjcd").text(wxMenuName);
                }else{
                    getWXCode();
                }
            }else{
                base.getCompanyByUrl(getMyCont);
            }
        }
        function getMyCont(res){
            if(COMPANYCODE = sessionStorage.getItem("compCode")){
                base.addIcon();
                addCompanyInfo(res);
                getWXCode();
            }else{
                base.showMsg("非常抱歉，暂时无法获取公司信息!");
            }
        }
        function getCompanyInfo(){
            base.getCompany(COMPANYCODE)
                .then(function (res) {
                    addCompanyInfo(res);
                });
        }

        function addCompanyInfo(res){
            $(".icon-loading").remove();
            if(res.success){
                var data = res.data;
                $("#description").html(data.description);
                addMap(data.longitude, data.latitude);
                $("#brief").html('地址：'+data.province+" "+data.city+" "+data.area+" "+data.address+'</br>电话：'+data.mobile+'</br>网址：'+data.domain);
            }else{
                doError();
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

        function doError() {
            $("#allmap, #description").remove();
            $("body").removeClass("bg_fff");
            $("#brief").replaceWith(template);
        }
        function addMap(longitude, latitude) {
            // 百度地图API功能
            var map = new BMap.Map("allmap");    // 创建Map实例
            var point = new BMap.Point(longitude, latitude);
            map.centerAndZoom(point, 14);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            //map.setCurrentCity("");          // 设置地图显示的城市 此项是必须设置的
            map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
            map.addControl(new BMap.ScaleControl());             // 添加比例尺控件
            var marker = new BMap.Marker(point);// 创建标注
            map.addOverlay(marker);             // 将标注添加到地图中
            marker.disableDragging();           // 不可拖拽
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        }
    });
});