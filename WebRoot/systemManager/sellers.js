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
		$.getJSON('../system/getNumberOfToExamine', function(data) {
			console.log(data);
			if (data.status == '0') {
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
		if (maxPage >= 1) {
			$("#one").css({
				"background": "#ddd"
			});
		}
		if (maxPage == 0) {
			$('#one,#two,#three,#ellipsis').hide();
		} else if (maxPage == 1) {
			$('#two,#three,#ellipsis').hide();
			$('#one').show();
			$('#one').html('1');
		} else if (maxPage == 2) {
			$('#three,#ellipsis').hide();
			$('#one,#two').show();
			$('#one').html('1');
			$('#two').html('2');
		} else if (maxPage == 3) {
			$('#ellipsis').hide();
			$('#ond,#two,#three').show();
			$('#one').html('1');
			$('#two').html('2');
			$('#three').html('3');
		} else if (maxPage > 3) {
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
			var html = template(data.data);
			//输入模板
			$("#data").html(html);
			//修改商品
			$('.edit').click(function() {
				var agree_id = $(this).attr("id");
				var id = parseInt(agree_id.split('_')[1]);
				console.log(id);
				$.post('../system/operateExamine', {
					id: id,
					status: 1
				}, function(data) {
					console.log(data);
					getMaxPage();
					loadProduct('../system/getToExamine');
				});
			});
			$('.refuse').click(function() {
				var refuse_id = $(this).attr("id");
				var id = parseInt(refuse_id.split('_')[1]);
				console.log(id);
				$.post('../system/operateExamine', {
					id: id,
					status: 0
				}, function(data) {
					console.log(data);
					getMaxPage();
					loadProduct('../system/getToExamine');
				});
			});
		});
	}
	loadProduct('../system/getToExamine');

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
		loadProduct('../system/getToExamine?count=' + howMany + '&page=' + page);
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
		loadProduct('../system/getToExamine?count=' + howMany + '&page=' + page);
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
		loadProduct('../system/getToExamine?count=' + howMany + '&page=' + page);
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
		loadProduct('../system/getToExamine?count=' + howMany + '&page=' + page);
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
		loadProduct('../system/getToExamine?count=' + howMany + '&page=' + page);
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
		loadProduct('../system/getToExamine?count=' + howMany + '&page=' + page);
	});
});