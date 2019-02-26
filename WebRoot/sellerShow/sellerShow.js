$(function() {
	function getGoods(data, id) {
		var data2 = new Array();
		if (id == '#showGoods') {
			data2 = data.data;
		} else {
			if (data.data.length <= 2) {
				data2 = data.data;
			} else {
				data2 = data.data.slice(0, 2);
			}
		}
		var arrnum = new Array();
		for (var i = 0; i < data2.length; i++) {
			arrnum.push(data2[i].id);
		}
		//console.log(arrnum);
		//获取模板
		var tpl = $('#handlebarFun').html();
		//预编译模板
		var template = Handlebars.compile(tpl);
		//匹配json内容
		var html = template(data2);
		//输入模板
		$(id).html(html);
		for (i = 0; i < arrnum.length; i++) {
			$.getJSON('../display/getBusinessPoint?id=' + arrnum[i], function(data) {
				var num = data.data.b_id;
				$('#grade_' + num).html(data.data.point);
			});
		}
		//查看详情
		$('.detail').click(function() {
			var detail_id = $(this).attr('id');
			var name_id = $('#name_' + detail_id).html();
			var phone_id = $('#phone_' + detail_id).html();
			var grade_id = $('#grade_' + detail_id).html();
			var address_id = $('#address_' + detail_id).html();
			sessionStorage.setItem('detail_id', detail_id);
			sessionStorage.setItem('name_id', name_id);
			sessionStorage.setItem('phone_id', phone_id);
			sessionStorage.setItem('grade_id', grade_id);
			sessionStorage.setItem('address_id', address_id);
			window.open('detail.html', '_blank');
		});
	}
	//加载商品
	function loadProduct(url, id) {
		$.getJSON(url, function(data) {
			getGoods(data, id);
		});
	}
	loadProduct('../display/getBusinessByType?type=娱乐', '#fun');
	loadProduct('../display/getBusinessByType?type=旅游', '#travel');
	loadProduct('../display/getBusinessByType?type=购物', '#shopping');
	loadProduct('../display/getBusinessByType?type=交通', '#traffic');
	loadProduct('../display/getBusinessByType?type=住宿', '#accommodation');
	loadProduct('../display/getBusinessByType?type=餐饮', '#food');
	$('#funMore').click(function() {
		console.log('娱乐');
		sessionStorage.setItem("business", '娱乐');
	});
	$('#travelMore').click(function() {
		console.log('旅游');
		sessionStorage.setItem("business", '旅游');
	});
	$('#shoppingMore').click(function() {
		console.log('购物');
		sessionStorage.setItem("business", '购物');
	});
	$('#trafficMore').click(function() {
		console.log('交通');
		sessionStorage.setItem("business", '交通');
	});
	$('#accommodationMore').click(function() {
		console.log('住宿');
		sessionStorage.setItem("business", '住宿');
	});
	$('#foodMore').click(function() {
		console.log('餐饮');
		sessionStorage.setItem("business", '餐饮');
	});
	//搜索
	$('#search').click(function() {
		var searchName = $('#searchName').val();
		if (searchName != "") {
			$.getJSON('../display/search?key=' + searchName, function(data) {
				console.log(data);
				getGoods(data, '#showGoods');
			});
		} else {
			$.getJSON('../display/search', function(data) {
				console.log(data);
				getGoods(data, '#showGoods');
			});
		}
	});
});