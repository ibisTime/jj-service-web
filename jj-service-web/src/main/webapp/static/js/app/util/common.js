define([], function() {
    var common = {
        toJson:function(data){
            if ( typeof(data) == "string")  return eval('('+data+')');
        },
        amount:function (th){
            var regStrs = [
                ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
            ];
            for(i=0; i<regStrs.length; i++){
                var reg = new RegExp(regStrs[i][0]);
                th.value = th.value.replace(reg, regStrs[i][1]);
            }
        },
        getUrlParam : function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return '';
        },
        addCookie : function(name, value) {
            document.cookie = name + "=" + encodeURIComponent(value)+"; path=/";
        },
        getCookie : function(name,defaultValue) {
            var arrCookie = document.cookie.split(";");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (arr[0].replace(/(^\s*)|(\s*$)/g, "") == name) return decodeURIComponent(arr[1]);
            }
            return defaultValue||"";
        },
        deleteCookie : function(name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=v; path=/; expires=" + date.toGMTString();
        },
        getWindowSize:function(){
            return [document.documentElement.clientWidth,document.documentElement.clientHeight];
        },
        knowImgSize : function(img_w,img_h) {
            var size = hs.getWindowSize();
            var idWidth = size[0],  // 容器的宽度和高度
                idHeight = size[1],
                width = idWidth,height = idHeight;
            img_w = !img_w || img_w==0?idWidth:img_w;
            img_h = !img_h || img_h==0?idHeight:img_h;
            if(img_w > idWidth && img_h<idHeight) height = img_h * idWidth / img_w;
            else if(img_h > idHeight && img_w<idWidth) width = img_w * idHeight / img_h;
            else if(img_h > idHeight && img_w >idWidth){
                var a = (img_w - idWidth) / idWidth;
                var b = (img_h - idHeight) / idHeight;
                if(a>b) height = img_h * idWidth / img_w;
                else width = img_w * idHeight / img_h;
            }else height = img_h * idWidth / img_w;
            return {width:width,height:height,top:(idHeight-height)/2,left:(idWidth-width)/2}
        },
        /*
         返回顶部
         */
        scrollToY: function(scrollTargetY, speed, easing) {
            // scrollTargetY: the target scrollY property of the window
            // speed: time in pixels per second
            // easing: easing equation to use

            var scrollY = window.scrollY,
                scrollTargetY = scrollTargetY || 0,
                speed = speed || 2000,
                easing = easing || 'easeOutSine',
                currentTime = 0;

            // min time .1, max time .8 seconds
            var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

            // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
            var PI_D2 = Math.PI / 2,
                easingEquations = {
                    easeOutSine: function (pos) {
                        return Math.sin(pos * (Math.PI / 2));
                    },
                    easeInOutSine: function (pos) {
                        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                    },
                    easeInOutQuint: function (pos) {
                        if ((pos /= 0.5) < 1) {
                            return 0.5 * Math.pow(pos, 5);
                        }
                        return 0.5 * (Math.pow((pos - 2), 5) + 2);
                    }
                };

            // add animation loop
            function tick() {
                currentTime += 1 / 60;

                var p = currentTime / time;
                var t = easingEquations[easing](p);

                if (p < 1) {
                    requestAnimationFrame(tick);

                    window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
                } else {
                    window.scrollTo(0, scrollTargetY);
                }
            }

            // call it once to get started
            tick();
        },

        // loading
        loading: function(el, load) {
            if (load) {
                var mask = document.createElement('img');
                var width = Math.min(el.offsetWidth, el.offsetHeight);
                mask.classList.add('loading');
                el.classList.add('p-loading');
                el.disabled = true;
                mask.style.width = width + 'px';
                mask.src = '../../images/tail-spin.svg';
                el.appendChild(mask);
            } else {
                el.classList.remove('btn-press');
                el.removeChild(el.lastChild);
                el.classList.remove('p-loading');
            }
        }
    };
    return common;
});