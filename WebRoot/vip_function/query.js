$(function() {
	var page = 1;
	var allAccount;
	var maxPage;
	var howMany = parseInt($("select.howMany").val());
	//console.log(howMany);
	function double(num) {
		if (num > 9) return num;
		else return "0" + num;
	}

	function getMaxPage() {
		$.getJSON('../vip/getNumberOfConsumption', function(data) {
			console.log(data);
			if (data.status) {
				allAccount = parseInt(data.data);
				var index = allAccount / howMany;
				if (index % 1 == 0) {
					maxPage = index;
				} else {
					maxPage = parseInt(index) + 1;
				}
				console.log(maxPage);
			}
			judge();
		});
	}
	getMaxPage();
	//判断maxPage
	function judge() {
		$("#one").css({
			"background": "#ddd"
		});
		if (maxPage == 0) {
			$('#ond,#two,#three,#ellipsis').hide();
		}
		if (maxPage == 1) {
			$('#two,#three,#ellipsis').hide();
			$('#one').show();
			$('#one').html('1');
		}
		if (maxPage == 2) {
			$('#three,#ellipsis').hide();
			$('#one,#two').show();
			$('#one').html('1');
			$('#two').html('2');
		}
		if (maxPage == 3) {
			$('#ellipsis').hide();
			$('#ond,#two,#three').show();
			$('#one').html('1');
			$('#two').html('2');
			$('#three').html('3');
		}
		if (maxPage > 3) {
			$('#ond,#two,#three,#ellipsis').show();
			$('#one').html('1');
			$('#two').html('2');
			$('#three').html('3');
		}
	}
	//加载商品
	function loadProduct(url) {
		$.getJSON(url, function(data) {
			//获取模板
			var tpl = $('#handlebar').html();
			//预编译模板
			var template = Handlebars.compile(tpl);
			//匹配json内容
			for (var i = 0; i < data.data.length; i++) {
				var time = new Date(data.data[i].date);
				var str = time.getFullYear() + "-" + double(time.getMonth() + 1) + "-" + double(time.getDate()) + " " + double(time.getHours()) + ":" + double(time.getMinutes()) + ":" + double(time.getSeconds());
				data.data[i].date = str;
			}
			var html = template(data.data);
			//输入模板
			$("#data").html(html);
		});
	}
	loadProduct('../vip/consumeHistory');
	//鼠标移进的样式
	$(".account").mouseover(function() {
		$(".account").css({
			"border-left": "none"
		});
	});
	//鼠标移走的样式
	$(".account").mouseout(function() {
		$(".account").css({
			"border-left": "3px solid #009688"
		});
	});
	//退出账号
	$("#quitSystem").click(function() {
		//alert("1");
		$.getJSON('../businessLog/logout', function(data) {});
	});

	//分页
	//清空分页背景颜色
	function clearPage() {
		$("#one").css({
			"background": "#fff"
		});
		$("#two").css({
			"background": "#fff"
		});
		$("#three").css({
			"background": "#fff"
		});
	}
	//显示几行
	$("select.howMany").change(function() {
		//alert($("select.howMany").val());
		clearPage();
		page = 1;
		howMany = parseInt($("select.howMany").val());
		var index = allAccount / howMany;
		if (index % 1 == 0) {
			maxPage = index;
		} else {
			maxPage = parseInt(index) + 1;
		}
		console.log(maxPage);
		judge();
		loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
	});
	$("#one").click(function() {
		clearPage();
		page = parseInt($("#one").html());
		if (page == 1 || maxPage <= 3) {
			$("#one").css({
				"background": "#ddd"
			});
		} else {
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
		}
		if (page <= maxPage - 2) {
			$('#ellipsis').show();
		}
		loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
	});
	$("#two").click(function() {
		clearPage();
		page = parseInt($("#two").html());
		console.log(page);
		if (page <= maxPage - 2) {
			$('#ellipsis').show();
		}
		$("#two").css({
			"background": "#ddd"
		});
		loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
	});
	$("#three").click(function() {
		clearPage();
		page = parseInt($("#three").html());
		if (page == maxPage - 1) {
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$('#ellipsis').hide();
			$("#two").css({
				"background": "#ddd"
			});
		} else if (page == maxPage) {
			$('#ellipsis').hide();
			$("#three").css({
				"background": "#ddd"
			});
		} else {
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
		}
		loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
	});
	$("#previous").click(function() {
		clearPage();
		if (page == 1) {
			$("#one").css({
				"background": "#ddd"
			});
			loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
		} else if (page == 2) {
			page -= 1;
			$("#one").html(page);
			$("#two").html(page + 1);
			$("#three").html(page + 2);
			$("#one").css({
				"background": "#ddd"
			});
			loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
		} else {
			page -= 1;
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
			if (page <= maxPage - 2) {
				$('#ellipsis').show();
			}
			loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
		}
	});
	$("#next").click(function() {
		clearPage();
		if ((page + 1) >= maxPage - 1) {
			$('#ellipsis').hide();
			if (maxPage == 1) {
				page = 1;
				$("#one").html(maxPage);
				$("#one").css({
					"background": "#ddd"
				});
			} else if (maxPage == 2) {
				page = 2;
				$("#one").html(maxPage - 1);
				$("#two").html(maxPage);
				$("#two").css({
					"background": "#ddd"
				});
			} else {
				$("#one").html(maxPage - 2);
				$("#two").html(maxPage - 1);
				$("#three").html(maxPage);
				if ((page + 1) == maxPage - 1) {
					page += 1;
					$("#two").css({
						"background": "#ddd"
					});
				} else {
					page = maxPage;
					$("#three").css({
						"background": "#ddd"
					});
				}
			}
			loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + maxPage);
		} else {
			page += 1;
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
			$('#ellipsis').show();
			loadProduct('../vip/consumeHistory?count=' + howMany + '&page=' + page);
		}
	});
});