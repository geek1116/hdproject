$(function() {
	var page = 1;
	var loadFinish = 0;
	var type = 'goods';
	//隐藏loadFinish
	$('#loadFinish').hide();
	var id = sessionStorage.getItem('detail_id');
	var name_id = sessionStorage.getItem('name_id');
	$('#name_id').html(name_id);
	var phone_id = sessionStorage.getItem('phone_id');
	$('#phone_id').html(phone_id);
	var grade_id = sessionStorage.getItem('grade_id');
	$('#grade_id').html(grade_id);
	var address_id = sessionStorage.getItem('address_id');
	$('#address_id').html(address_id);
	$('#allGoods').click(function() {
		page = 1;
		loadFinish = 0;
		type = 'goods';
		$('#loadFinish').hide();
		$('#allGoods').addClass('selected');
		$('#allGoods').removeClass('noSelect');
		$('#allReview').addClass('noSelect');
		getItem('../display/getProductByBusId?id=' + id, '#handlebarGoods');
	});
	$('#allReview').click(function() {
		page = 1;
		loadFinish = 0;
		type = 'review';
		$('#loadFinish').hide();
		$('#allReview').addClass('selected');
		$('#allReview').removeClass('noSelect');
		$('#allGoods').addClass('noSelect');
		getItem('../display/getCommentByBusId?id=' + id, '#handlebarReview');
	});

	function double(num) {
		if (num > 9) return num;
		else return "0" + num;
	}

	function getItem(url, id) {
		$.getJSON(url + '&page=' + page, function(data) {
			console.log(data);
			if (type == 'goods') {
				for (var i = 0; i < data.data.length; i++) {
					data.data[i].price = parseFloat(data.data[i].price).toFixed(2);
					data.data[i].vip_price = parseFloat(data.data[i].vip_price).toFixed(2);
				}
			}
			if (type == 'review') {
				for (i = 0; i < data.data.length; i++) {
					var time = new Date(data.data[i].date);
					var str = time.getFullYear() + "-" + double(time.getMonth() + 1) + "-" + double(time.getDate()) + " " + double(time.getHours()) + ":" + double(time.getMinutes()) + ":" + double(time.getSeconds());
					data.data[i].date = str;
				}
				for (var i = 0; i < data.data.length; i++) {
					var star = parseInt(data.data[i].star);
					console.log(star);
					for (var j = 0; j < star; j++) {
						data.data[i]['src' + j] = '../image/star2.png';
						console.log(j + " " + data.data[i]['src' + j]);
					}
					for (; j < 5; j++) {
						data.data[i]['src' + j] = '../image/star.png';
						console.log(data.data[i]['src' + j]);
					}
				}
			}
			//获取模板
			var tpl = $(id).html();
			//预编译模板
			var template = Handlebars.compile(tpl);
			//匹配json内容
			var html = template(data.data);
			//输入模板
			$('#content').html(html);
		});
	}

	function appendItem(url, id) {
		$.getJSON(url + '&page=' + page, function(data) {
			console.log(data);
			if (data.data.length == 0) {
				loadFinish = 1;
				$('#loadFinish').show();
			} else {
				//获取模板
				if (type == 'goods') {
					for (var i = 0; i < data.data.length; i++) {
						data.data[i].price = parseFloat(data.data[i].price).toFixed(2);
						data.data[i].vip_price = parseFloat(data.data[i].vip_price).toFixed(2);
					}
				}
				if (type == 'review') {
					for (i = 0; i < data.data.length; i++) {
						var time = new Date(data.data[i].date);
						var str = time.getFullYear() + "-" + double(time.getMonth() + 1) + "-" + double(time.getDate()) + " " + double(time.getHours()) + ":" + double(time.getMinutes()) + ":" + double(time.getSeconds());
						data.data[i].date = str;
					}
					for (var i = 0; i < data.data.length; i++) {
						var star = parseInt(data.data[i].star);
						console.log(star);
						for (var j = 0; j < star; j++) {
							data.data[i]['src' + j] = '../image/star2.png';
							console.log(j + " " + data.data[i]['src' + j]);
						}
						for (; j < 5; j++) {
							data.data[i]['src' + j] = '../image/star.png';
							console.log(data.data[i]['src' + j]);
						}
					}
				}
				var tpl = $(id).html();
				//预编译模板
				var template = Handlebars.compile(tpl);
				//匹配json内容
				var html = template(data.data);
				//输入模板
				$('#content').append(html);
			}
		});
	}
	getItem('../display/getProductByBusId?id=' + id, '#handlebarGoods');
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
		var scrollHeight = $(document).height(); //当前页面的总高度
		var clientHeight = $(this).height(); //当前可视的页面高度
		//console.log("top:" + scrollTop + ",doc:" + scrollHeight + ",client:" + clientHeight);
		if ((scrollTop + clientHeight >= scrollHeight - 1) && loadFinish != 1) { //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 
			//滚动条到达底部
			//alert(4);
			page += 1;
			if (type == 'goods') {
				appendItem('../display/getProductByBusId?id=' + id + '&page=' + page, '#handlebarGoods');
			} else {
				appendItem('../display/getCommentByBusId?id=' + id + '&page=' + page, '#handlebarReview');
			}
		}
		/*else if (scrollTop <= 0) {
			//滚动条到达顶部
			alert(4);
			//滚动条距离顶部的高度小于等于0 TODO
		 	//
		 }*/
	});
});