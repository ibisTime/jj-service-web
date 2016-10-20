/*work*/
$.ajax({
	type: "GET",
	url: "case/list",
	dataType: "html",
	success: function(msg) {
		//console.log(msg)
		var myobj = eval('(' + msg + ')')
		$('#work_main').append(template('work', myobj))
	},
	error: function() {}
}) 
/*product*/
$.ajax({
	type: "GET",
	url: "product/list",
	dataType: "html",
	success: function(msg) {
		var myobj = eval('(' + msg + ')')
		$('#product_main').append(template('product', myobj))
	},
	error: function() {}
})
/*join*/
$.ajax({
	type: "GET",
	url: "position/list",
	dataType: "html",
	success: function(msg) {
		var myobj = eval('(' + msg + ')')
		$('#join_main').append(template('position', myobj))
	},
	error: function() {}
})
//$.ajax({
//	type: "GET",
//	url: "info",
//	dataType: "html",
//	success: function(data) {
//		var myobj = eval('(' + data + ')');
//		console.log(myobj)
//		$('#contact_email').append(template('infoEmail', myobj))
//	},
//	error: function() {}
//})

/*about*/
$.ajax({
	type: "GET",
	url: "partner/list",
	dataType: "html",
	success: function(msg) {
		var myobj = eval('(' + msg + ')');
		$('#partner_main').append(template('partner', myobj))
	},
	error: function() {}
})
$.ajax({
	type: "GET",
	url: "info",
	dataType: "html",
	success: function(data) {
		var myobj = eval('(' + data + ')');
		//console.log(data)
		$('#company_info').append(template('xnInfo', myobj))
		
		$('#Gsinfo').append(template('info', myobj))
		$('#contact_email').append(template('infoEmail', myobj))
		$('#pure_logo').append(template('logo', myobj))
	},
	error: function() {}
})
$.ajax({
	type: "GET",
	url: "worker/list",
	dataType: "html",
	success: function(data) {
		//console.log(data)
		var myobj = eval('(' + data + ')');
		$('#aboutCeo').append(template('infoCeo', myobj))
	},
	error: function() {}
})



