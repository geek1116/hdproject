$(function() {
	//隐藏loadFinish
	$('#loadFinish').hide();
	var page = 1;
	var loadFinish = 0; //
	var business_type = sessionStorage.getItem("business");
	$('#business_type').html(business_type);
	$('#business_type2').html(business_type);
	//加载商品
	function loadProduct(url, page) {
		$.getJSON(url + '&page=' + page, function(data) {
			console.log(data);
			var data2 = data.data;
			if (data2.length == 0) {
				loadFinish = 1;
				$('#loadFinish').show();
			} else {
				var arrnum = new Array();
				for (var i = 0; i < data2.length; i++) {
					arrnum.push(data2[i].id);
				}
				console.log(arrnum);
				//获取模板
				var tpl = $('#handlebarFun').html();
				//预编译模板
				var template = Handlebars.compile(tpl);
				//匹配json内容
				var html = template(data2);
				//输入模板
				$('#content').append(html);
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
		});
	}
	loadProduct('../display/getBusinessByType?type=' + business_type, 1);
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
		var scrollHeight = $(document).height(); //当前页面的总高度
		var clientHeight = $(this).height(); //当前可视的页面高度
		//console.log("top:" + scrollTop + ",doc:" + scrollHeight + ",client:" + clientHeight);
		if ((scrollTop + clientHeight >= scrollHeight - 1) && loadFinish != 1) { //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 
			//滚动条到达底部
			//alert(4);
			page += 1;
			loadProduct('../display/getBusinessByType?type=' + business_type, page);
		}
		/*else if (scrollTop <= 0) {
			//滚动条到达顶部
			alert(4);
			//滚动条距离顶部的高度小于等于0 TODO
		 	//
		 }*/
	});
});