var module = {},data = {};
$('.tabList').find('li').each(function(){
	$(this).click(function(){
		$('.tabList').find('li').removeClass()
		$(this).addClass('cur');
		data['status'] = $('.tabList').find('.cur').data('type');
		if(data['status']=='1'){
			ajaxRe();
			return false;
		}
		ajaxReso(data)
	})
})
function ajaxReso(data){
	$.ajax({
		url:'${resourceUrl}/bug/list',
		type:'GET',
		data:data,
		success:function(data){
			module.showList(data);
		}
	});
}
function ajaxRe(data){
	$.ajax({
		url:'${resourceUrl}/bug/list',
		type:'GET',
		data:{'status':'3'},
		success:function(data){
			module.showList_1(data);
		}
	});
	$.ajax({
		url:'${resourceUrl}/bug/list',
		type:'GET',
		data:{'status':'1'},
		success:function(data){
			module.showList_1(data);
		}
	});
}
data['status']=0
ajaxReso(data);
module.showList = function(data){
	var list = '',
		page = '';
		var dataz = data.data;
	if(data && dataz.length){
		list += $.map(dataz,function(n,i){
			if(n.status==0){
				return '<li><h2 class="tabC_tit">'+ n.topic+'</h2><p class="tabC_main">'+n.content+'</p><p class="tabC_money"><span class="alipay">'+n.alipay+'</span></p></li>';
			}else if(n.status==2){
				return '<li><h2 class="tabC_tit">'+ n.topic+'</h2><p class="tabC_main">' + n.content +'</p><p class="tabC_money"><span class="alipay">'+n.alipay+'</span></p><p class="no">状态:审核失败</p></li>'
			}
		
		}).join('');
	}else{
		list = '<li>当前还没有数据</li>';
	}
	$('.tabCon_item_2').empty();
	$('.tabCon_item_1').empty().append(list);
};
module.showList_1 = function(data){
	var list = '',
		page = '';
		var dataz = data.data;
	if(data && dataz.length){
		list += $.map(dataz,function(n,i){
			if(n.status==1){
					return '<li><h2 class="tabC_tit">'+ n.topic+'</h2><p class="tabC_main">' + n.content +'</p><p class="tabC_money"><span class="alipay">'+n.alipay+'</span></p><p class="yes">状态:审核成功</p></li>'
			}else{
					return '<li><h2 class="tabC_tit">'+ n.topic+'</h2><p class="tabC_main">' + n.content +'</p><p class="tabC_money"><span class="alipay">'+n.alipay+'</span><span class="money">'+n.money+'</span></p></li>'
				}
			}).join('');
	}else{
		list = '<li>当前还没有数据</li>';
	}
	
	$('.tabCon_item_2').append(list);
	$('.tabCon_item_1').empty();
};