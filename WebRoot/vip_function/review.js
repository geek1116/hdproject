$(function() {
	//隐藏
	$("#successSave").hide();
	var page = 1;
	var allAccount;
	var maxPage;
	var howMany = parseInt($("select.howMany").val());
	//点评dialog
	var addInformation = document.getElementById('addInformation');
	console.log(howMany);

	function getMaxPage() {
		$.getJSON('../vipComment/getNumberOfNonComment', function(data) {
			console.log(data);
			if (data.status == '0') {
				allAccount = parseInt(data.data);
				var index = allAccount / howMany;
				if (index % 1 == 0) {
					maxPage = index;
				} else {
					maxPage = parseInt(index) + 1;
				}
				//console.log(maxPage);
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

	function double(num) {
		if (num > 9) return num;
		else return "0" + num;
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
			//修改商品
			$('.edit').click(function() {
				addInformation.showModal();
				var id = $(this).attr("id");
				//console.log(id);
				$("#c_id").val(id);
			});
		});
	}
	loadProduct('../vipComment/getNonComment');
	$("#cancelReview").click(function() {
		clearStar();
		$('#c_id').val("");
		$('#content').val("");
		addInformation.close();
	});
	//退出账号
	$("#quitSystem").click(function() {
		//alert("1");
		$.getJSON('../businessLog/logout', function(data) {});
	});

	//确定点评
	$("#sureReview").click(function() {
		var c_id = $("#c_id").val();
		var star = parseInt($("#grade").html());
		var content = $('#content2').val();
		console.log(content);
		if (star == 0) {
			$("#warning").html("请点评打分！");
		} else {
			$.post('../vipComment/addComment', {
				c_id: c_id,
				star: star,
				content: content
			}, function(data, status) {
				clearStar();
				$('#c_id').val("");
				$('#content').val("");
				console.log(data);
				$("#successSave").show().delay(1500).hide(400);
				addInformation.close();
				clearPage();
				loadProduct('../vipComment/getNonComment');
				getMaxPage();
			});
		}
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
		loadProduct('../vipComment/getNonComment?count=' + howMany + '&page=' + page);
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
		loadProduct('../vipComment/getNonComment?count=' + howMany + '&page=' + page);
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
		loadProduct('../vipComment/getNonComment?count=' + howMany + '&page=' + page);
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
		loadProduct('../vipComment/getNonComment?count=' + howMany + '&page=' + page);
	});
	$("#previous").click(function() {
		clearPage();
		if (page == 1) {
			$("#one").css({
				"background": "#ddd"
			});
		} else if (page == 2) {
			page -= 1;
			$("#one").html(page);
			$("#two").html(page + 1);
			$("#three").html(page + 2);
			$("#one").css({
				"background": "#ddd"
			});
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
		}
		loadProduct('../vipComment/getNonComment?count=' + howMany + '&page=' + page);
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
		} else {
			page += 1;
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
			$('#ellipsis').show();
		}
		loadProduct('../vipComment/getNonComment?count=' + howMany + '&page=' + page);
	});
	//打分
	//取消打分
	function clearStar() {
		$('#star1').attr('src', '../image/star.png');
		$('#star2').attr('src', '../image/star.png');
		$('#star3').attr('src', '../image/star.png');
		$('#star4').attr('src', '../image/star.png');
		$('#star5').attr('src', '../image/star.png');
	}
	$('#star1').click(function() {
		clearStar();
		$('#star1').attr('src', '../image/star2.png');
		$('#grade').html('1');
	});
	$('#star2').click(function() {
		clearStar();
		$('#star1').attr('src', '../image/star2.png');
		$('#star2').attr('src', '../image/star2.png');
		$('#grade').html('2');
	});
	$('#star3').click(function() {
		clearStar();
		$('#star1').attr('src', '../image/star2.png');
		$('#star2').attr('src', '../image/star2.png');
		$('#star3').attr('src', '../image/star2.png');
		$('#grade').html('3');
	});
	$('#star4').click(function() {
		clearStar();
		$('#star1').attr('src', '../image/star2.png');
		$('#star2').attr('src', '../image/star2.png');
		$('#star3').attr('src', '../image/star2.png');
		$('#star4').attr('src', '../image/star2.png');
		$('#grade').html('4');
	});
	$('#star5').click(function() {
		clearStar();
		$('#star1').attr('src', '../image/star2.png');
		$('#star2').attr('src', '../image/star2.png');
		$('#star3').attr('src', '../image/star2.png');
		$('#star4').attr('src', '../image/star2.png');
		$('#star5').attr('src', '../image/star2.png');
		$('#grade').html('5');
	});
});