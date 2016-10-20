define([], function() {
    var hevent = {};
    hevent.tap = function(dom,fn,important, fn2){
        if (!fn) {
            var fn = $(dom).data('fn');
            fn.call(dom, dom);
            return;
        }
        if (important || !hevent.preventTap) {
            var startEvent;
            for(var i=0;i<dom.length;i++){
                dom[i].removeEventListener('touchstart');
                dom[i].removeEventListener('touchend');
                $(dom).data('fn',fn);
                dom[i].addEventListener('touchstart', function(e){
                    //e.stopPropagation();
                    fn2 && fn2(e);
                    var self = this;
                    startEvent = e;
                    var touches = e.touches[0];
                    $(this).data("x",touches.clientX);
                    $(this).data("y",touches.clientY);
                    this.pressDefer = setTimeout(function() {
                        if (!$(e.target).hasClass('no-btn-press')) {
                            $(e.target).closest('.btn').addClass('btn-press');
                        }
                    }, 100);


                },false);
                dom[i].addEventListener('touchmove', function(e) {
                    var touches = e.changedTouches[0],
                        ex = touches.clientX,
                        ey = touches.clientY;
                    if(Math.abs(parseInt($(this).data("x")) - ex) > 20 || Math.abs(parseInt($(this).data("y")) - ey) > 20 ){
                        clearTimeout(this.pressDefer);
                        $(e.target).closest('.btn').removeClass('btn-press');
                    }
                }, false);
                dom[i].addEventListener('touchend', function(e){
                    var self = this;
                    var touches = e.changedTouches[0],
                        ex = touches.clientX,
                        ey = touches.clientY;
                    if(Math.abs(parseInt($(this).data("x")) - ex) < 20 && Math.abs(parseInt($(this).data("y")) - ey) < 20 ){
                        e.stopPropagation();
                        setTimeout(function() {
                            clearTimeout(self.pressDefer);
                            $(e.target).closest('.btn').removeClass('btn-press');
                        }, 100);
                        if (!$(e.target).closest('.p-loading')[0]) {
                            fn(this, startEvent);
                        }
                    }
                },false);
            }
        }

    };

    hevent.longTap = function(dom,fn){//长按时间
        for(var i=0;i<dom.length;i++){
            var x, y, timer;
            dom[i].addEventListener('touchstart', function(e){
                if(timer){
                    clearTimeout(timer);
                    timer = null;
                }
                var touches = e.touches[0];
                x = touches.clientX;
                y = touches.clientY;
                timer = setTimeout(function(){
                    e.preventDefault();
                    if(fn) fn();
                }, 1000 );
                e.preventDefault();
            },false);
            dom[i].addEventListener('touchmove', function(e){
                var touches = e.touches[0],
                    ex = touches.clientX,
                    ey = touches.clientY;
                if(timer && (Math.abs(ex - x) > 5 || Math.abs(ey - y) > 5)){
                    clearTimeout(timer);
                    timer = null;
                }
            },false);
            dom[i].addEventListener( 'touchend', function( e ){
                if(timer){
                    clearTimeout(timer);
                    timer = null;
                }
            },false);
        }
    };
    hevent.swipe = function(dom,allfn,leftfn,rightfn,topfn,bottomfn){//滑动事件
        for(var i=0;i<dom.length;i++){
            var isTouchMove, x, y;
            dom[i].addEventListener('touchstart', function(e){
                var touches = e.touches[0];
                x = touches.clientX;
                y = touches.clientY;
                isTouchMove = false;
            },false);
            dom[i].addEventListener('touchmove', function(e){
                e.preventDefault();
                isTouchMove = true;
            },false);
            dom[i].addEventListener('touchend', function(e){
                if(!isTouchMove) return;
                var touches = e.changedTouches[0],
                    ex = touches.clientX,
                    ey = touches.clientY,
                    distanceX = x - ex;
                var distanceY = y - ey,
                    isSwipe = false;
                if(Math.abs(distanceX) >= Math.abs(distanceY) ){
                    if(distanceX > 20){	//左边滑动
                        e.stopPropagation();
                        if(leftfn) leftfn();
                        isSwipe = true;
                    }else if( distanceX < -20){
                        e.stopPropagation();
                        if(rightfn) rightfn();
                        isSwipe = true;
                    }
                }else{
                    if(distanceY > 20){
                        e.stopPropagation();
                        if(topfn) topfn();
                        isSwipe = true;
                    }else if( distanceY < -20){
                        e.stopPropagation();
                        if(bottomfn) bottomfn();
                        isSwipe = true;
                    }
                }
                if(isSwipe){
                    e.stopPropagation();
                    if(allfn) allfn()
                }
            }, false );
        }
    };
    return hevent;
});