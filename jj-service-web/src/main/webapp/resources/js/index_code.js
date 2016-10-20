$(".fullSlide").hover(function () {
     $(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.5)
 },
function () {
    $(this).find(".prev,.next").fadeOut()
});
 $(".fullSlide").slide({
     titCell: ".hd ul",
     mainCell: ".bd ul",
     effect: "fold",
     autoPlay: true,
     autoPage: true,
     trigger: "click",
     startFun: function (i) {
         var curLi = jQuery(".fullSlide .bd li").eq(i);
         if (!!curLi.attr("_src")) {
             curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
         }
     }
 });
 $.ajax({
 	type:"GET",
 	url:"company/partner/list",
 	dataType:"html",
 	success:function(msg){
 		var myobj = eval('('+msg+')')
 		$('#partner_main').append(template('partner', myobj))
 	},error:function(){
 	}
 })
 $.ajax({
 	type:"GET",
 	url:"company/case/list",
 	dataType:"html",
 	success:function(msg){
 		var myobj = eval('('+msg+')')
 		$('#serve_customers_logo').append(template('serveLogo', myobj))
 	},error:function(){
 	}
})

$.ajax({
	type: "GET",
	url: "company/info",
	dataType: "html",
	success: function(data) {
		var myobj = eval('(' + data + ')');
		$('#pure_logo').append(template('logo', myobj))
	},
	error: function() {}
})