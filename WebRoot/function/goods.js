$(function() {
	var page = 1;
	var allAccount;
	var maxPage;
	var howMany = parseInt($("select.howMany").val());
	console.log(howMany);

	function getMaxPage() {
		$.getJSON('../businessInfo/getNumberOfProduct', function(data) {
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
			$('#one,#two,#three,#ellipsis').hide();
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
			var html = template(data.data);
			//输入模板
			$("#data").html(html);
			//修改商品
			$('.edit').click(function() {
				$('#titleChange').html("修改商品信息");
				addInformation.showModal();
				var edit = $(this).attr("id");
				var arrEdit = edit.split("_");
				var id = arrEdit[1];
				//console.log(id);
				localStorage.setItem("product_id", id);
				var product_id = "product_" + id;
				var name = $("#" + product_id + " .product_name").html();
				$("#name").val(name);
				var price = $("#" + product_id + " .product_price").html();
				$("#price").val(price);
				var vip_price = $("#" + product_id + " .product_vip_price").html();
				$("#vip_price").val(vip_price);
				var introduction = $("#" + product_id + " .product_introduction").html();
				$("#introduction").val(introduction);
			});
			//是否删除
			$(".delete").click(function() {
				var delete2 = $(this).attr("id");
				var arrDelete = delete2.split("_");
				var id = arrDelete[1];
				//console.log(id);
				var isSure = document.getElementById('isSure');
				isSure.showModal();
				$("#cancelInit").click(function() {
					isSure.close();
				});
				$("#sureInit").click(function() {
					isSure.close();
					$.post('../businessInfo/deleteProduct', {
						id: id
					}, function(data, status) {
						console.log(data);
						loadProduct('../businessInfo/getAllProduct');
					});
				});
			});
		});
	}
	loadProduct('../businessInfo/getAllProduct');
	//加载账号
	var strName = localStorage.getItem("keyName");
	$("#account").html(strName);
	var addInformation = document.getElementById('addInformation');
	//添加商品信息
	$("#addGoods").click(function() {
		addInformation.showModal();
		$("#titleChange").html("添加商品信息");
	});
	$("#cancelAdd").click(function() {
		clear();
		addInformation.close();
	});
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

	//添加商品效果
	$("#name").focus(function() {
		$("#warning").html("");
	});
	$("#price").focus(function() {
		$("#warning").html("");
	});
	$("#vip_price").focus(function() {
		$("#warning").html("");
	});

	//失去焦点
	$("#name").blur(function() {
		if ($("#name").val() == "") {
			$("#warning").html("商品名称不能为空！");
		}
	});
	$("#price").blur(function() {
		if ($("#price").val() == "") {
			$("#warning").html("商品价格不能为空！");
		}
	});
	$("#vip_price").blur(function() {
		if ($("#vip_price").val() == "") {
			$("#warning").html("会员价格不能为空！");
		}
	});
	//添加或修改商品
	$("#sureAdd").click(function() {
		var name = $("#name").val();
		var price = $("#price").val();
		var vip_price = $("#vip_price").val();
		var introduction = $("#introduction").val();
		if (name == "") {
			$("#warning").html("商品名称不能为空！");
		} else if (price == "") {
			$("#warning").html("商品价格不能为空！");
		} else if (vip_price == "") {
			$("#warning").html("会员价格不能为空！");
		} else if (isNaN(parseFloat(price))) {
			console.log(parseFloat(price));
			$("#warning").html("商品价格格式不正确！");
		} else if (isNaN(parseFloat(vip_price))) {
			console.log(parseFloat(price));
			$("#warning").html("会员价格格式不正确！");
		} else {
			price = parseFloat(price).toFixed(2);
			vip_price = parseFloat(vip_price).toFixed(2);
			//console.log(price + " " + vip_price);
			var titleChange = $('#titleChange').html();
			console.log(titleChange);
			if (titleChange == '添加商品信息') {
				$.post('../businessInfo/addProduct', {
					name: name,
					price: price,
					vip_price: vip_price,
					introduction: introduction
				}, function(data, status) {
					clear();
					console.log(data);
					addInformation.close();
					clearPage();
					loadProduct('../businessInfo/getAllProduct');
					getMaxPage();
				});
			} else {
				var id = localStorage.getItem("product_id");
				console.log(id);
				$.post('../businessInfo/updateProduct', {
					id: id,
					name: name,
					price: price,
					vip_price: vip_price,
					introduction: introduction
				}, function(data, status) {
					clear();
					console.log(data);
					addInformation.close();
					clearPage();
					loadProduct('../businessInfo/getAllProduct');
					getMaxPage();
				});
			}
		}
	});
	//清空
	function clear() {
		$("#name").val("");
		$("#price").val("");
		$("#vip_price").val("");
		$("#introduction").val("");
	}
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
		loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
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
		loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
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
		loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
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
		loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
	});
	$("#previous").click(function() {
		clearPage();
		if (page == 1) {
			$("#one").css({
				"background": "#ddd"
			});
			loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
		} else if (page == 2) {
			page -= 1;
			$("#one").html(page);
			$("#two").html(page + 1);
			$("#three").html(page + 2);
			$("#one").css({
				"background": "#ddd"
			});
			loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
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
			loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
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
			loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + maxPage);
		} else {
			page += 1;
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
			$('#ellipsis').show();
			loadProduct('../businessInfo/getAllProduct?count=' + howMany + '&page=' + page);
		}
	});
});