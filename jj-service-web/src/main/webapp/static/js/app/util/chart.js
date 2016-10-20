define(['raphael'], function(Raphael) {
    var chart=function(){
        var paper,margin=20,lineHeight=0,times=60,rows=4;

        var map = function(conf){
            this.setting=conf;
            this.init.call(this,arguments)
        };
        map.prototype={
            init:function(){
                paper=new Raphael(this.setting.renderto,this.setting.width,this.setting.height);	//画图对象
                drawGrid(this.setting.width,this.setting.height)
            },
            load:function(data){
                if(!data || data.length == 0) return;

                var base_x = (this.setting.width-2*margin)/times;
                var innerHeight = this.setting.height-lineHeight-2*margin;
                var avgHeight = innerHeight/rows;

                var max =0,min=0;
                for(var i=0;i<data.length;i++){
                    max = Math.max(data[i].price,data[i].value,max);
                    min = Math.min(data[i].price,data[i].value,min);
                    if(i == 0){
                        paper.path("M"+(margin+i*base_x)+" "+(this.setting.height-margin-lineHeight)+"L"+(margin+i*base_x)+" "+(this.setting.height-margin-lineHeight-5)).attr({stroke:'#eee'});
                        paper.text(i*base_x+margin/2,this.setting.height-margin+15-lineHeight/2,getDateTime(new Date(data[i].time))).attr({stroke:'#606060','text-anchor':'start','stroke-width':0.2,opacity:'0.5'});
                    }else if(i !=0 && i%10 == 0){
                        paper.path("M"+(margin+i*base_x)+" "+(this.setting.height-margin-lineHeight)+"L"+(margin+i*base_x)+" "+(this.setting.height-margin-lineHeight-5)).attr({stroke:'#eee'});
                        paper.text(margin+i*base_x,this.setting.height-margin+15-lineHeight/2,getDateTime(new Date(data[i].time))).attr({stroke:'#606060','text-anchor':'center','stroke-width':0.2,opacity:'0.5'});
                    }
                }
                var tmp = Math.max(Math.abs(max),Math.abs(min));
                tmp = parseInt(parseFloat(tmp)*10+1)/10
                paper.text(margin - 10,avgHeight*0+margin - 8 ,parseFloat((tmp*100/2*2).toFixed(2))+'%').attr({'text-anchor':'start',stroke:'#606060','stroke-width':0.2,opacity:'0.5'});
                paper.text(margin - 10,avgHeight*4+margin - 8,parseFloat((-tmp*100/2*2).toFixed(2))+'%').attr({'text-anchor':'start',stroke:'#606060','stroke-width':0.2,opacity:'0.5'});
                paper.text(margin - 10,avgHeight*1+margin -8,parseFloat((tmp*100/2).toFixed(2))+'%').attr({'text-anchor':'start',stroke:'#606060','stroke-width':0.2,opacity:'0.5'});
                paper.text(margin - 10,avgHeight*3+margin -8,parseFloat((-tmp*100/2).toFixed(2))+'%').attr({'text-anchor':'start',stroke:'#606060','stroke-width':0.2,opacity:'0.5'});
                paper.text(margin - 4,avgHeight*2+margin -8,'0').attr({'text-anchor':'end',stroke:'#606060','stroke-width':0.2,opacity:'0.5'});
                var zero = innerHeight / 2 +margin;
                var arr_d =[],arr_l=[];
                for(var i=0;i<data.length;i++){
                    drawGuiJi(data[i].value,tmp,innerHeight,zero,i,base_x,arr_d);
                    drawGuiJi(data[i].price,tmp,innerHeight,zero,i,base_x,arr_l);
                }
                drawGuiJi2(arr_d,this.setting.width,base_x,zero, '#3d8dff','#3d8dff')
                drawGuiJi2(arr_l,this.setting.width,base_x,zero,'#801aff','#801aff')
            }
        };

        var drawGuiJi2 = function(arr,width,base_x,zero,lineColor,fillColor){
            var p = [],bgp=[];
            for(var i=0;i<arr.length;i++){
                if(i == 0){
                    p = ["M", arr[i].x, arr[i].y, "C", arr[i].x, arr[i].y];
                    bgp=["M", arr[i].x, arr[i].y, "C", arr[i].x, arr[i].y];
                }else if(i != arr.length-1){
                    var a = getAnchors(arr[i].x - (arr[i].x-arr[i-1].x)/2, arr[i-1].y, arr[i].x, arr[i].y, arr[i+1].x - (arr[i+1].x-arr[i].x)/2, arr[i+1].y);
                    p = p.concat([a.x1, a.y1, arr[i].x, arr[i].y, a.x2, a.y2]);
                    bgp = bgp.concat([a.x1, a.y1, arr[i].x, arr[i].y, a.x2, a.y2]);
                }else {
                    p = p.concat([ arr[i].x,  arr[i].y, arr[i].x, arr[i].y,arr[i].x, arr[i].y]);
                    bgp = bgp.concat([ arr[i].x, arr[i].y, arr[i].x, arr[i].y, arr[i].x, arr[i].y]);
                }
            }
            bgp = bgp.concat(['L',arr[arr.length-1].x,zero]);
            bgp = bgp.concat([margin, zero, margin,zero, "L",margin, zero, "z"]);
            paper.path().attr({path:bgp}).attr({fill:fillColor,opacity:'0.14'});
            paper.path().attr({path:p}).attr({stroke:lineColor});
        };

        var getAnchors = function(p1x, p1y, p2x, p2y, p3x, p3y) {
            var l1 = (p2x - p1x) / 2,
                l2 = (p3x - p2x) / 2,
                a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
                b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
            a = p1y < p2y ? Math.PI - a : a;
            b = p3y < p2y ? Math.PI - b : b;
            var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
                dx1 = l1 * Math.sin(alpha + a),
                dy1 = l1 * Math.cos(alpha + a),
                dx2 = l2 * Math.sin(alpha + b),
                dy2 = l2 * Math.cos(alpha + b);
            return {
                x1: p2x - dx1,
                y1: p2y + dy1,
                x2: p2x + dx2,
                y2: p2y + dy2
            };
        };

        var drawGuiJi=function(p,tmp,innerHeight,zero,i,base_x,arr){
            var isadd = true;
            if(p <0){
                isadd = false;
            }
            var h = innerHeight*Math.abs(p)/(tmp*2);
            if(isadd){
                h = zero - h;
            }else{
                h = zero + h;
            }
            arr.push({x:margin+i*base_x,y:h});
        };

        var getDateTime=function(d){
            var tmp = fillZero(d.getMonth()+1)+fillZero(d.getDate());
            return (d.getFullYear()+'').slice(2, 4)+tmp;
        };

        var fillZero = function(v) {
            if(v < 10) {
                v='0'+v;
            }
            return v+'';
        };

        var drawGrid = function(width,height){
            var innerHeight = height-lineHeight-2*margin;
            var avgHeight = innerHeight/rows;
            paper.rect(20,0,width - 20,height).attr({fill:'#fff','stroke-width':0, 'stroke-opacity': 0});
            for(var i=0;i <= rows;i++){
                paper.path("M"+ margin +" "+(avgHeight*i+margin)+"L"+(width-margin)+" "+(avgHeight*i+margin)).attr({stroke:'#D8D8D8'});
            }
        };
        return map;
    }();
    return chart;
});