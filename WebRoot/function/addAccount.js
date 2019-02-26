$(function() {
	//加载账号
	var page = 1;
	var allAccount;
	var maxPage;
	var howMany = parseInt($("select.howMany").val());

	function getMaxPage() {
		$.getJSON('../businessAccount/getNumberOfAccount', function(data) {
			console.log(data);
			if (data.status) {
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
	var strName = localStorage.getItem("keyName");
	$("#account").html(strName);
	var addInformation = document.getElementById('addInformation');
	//加载子账号
	function loadData(url) {
		$("#data").html(""); //清空
		$.getJSON(url, function(data) { //ajax iframe
			console.log(data);
			var arr = [];
			arr = data.data;
			console.log(arr);
			if (arr.length > 0) {
				$("tr.odd").hide();
			}
			for (var i = 0; i < arr.length; i++) {
				var str = "";
				str += "<tr'>";
				str += "<td>" + arr[i].account + "</td>";
				//判断类型
				if (arr[i].account_type == "1") {
					str += "<td>" + "管理员" + "</td>";
				} else if (arr[i].account_type == "2") {
					str += "<td>" + "前台" + "</td>";
				} else if (arr[i].account_type == "3") {
					str += "<td>" + "经理" + "</td>";
				}
				//是否启用
				if (arr[i].state == 1) {
					str += "<td>" + "<div class='toggle col-md-8'><label><input class='checked' type='checkbox' checked id='checked_" + arr[i].account + "'><span class='button-indecator'/></span></label></div>" + "</td>";
				} else {
					str += "<td>" + "<div class='toggle col-md-8'><label><input class='checked' type='checkbox' id='checked_" + arr[i].account + "'><span class='button-indecator'  /></span></label></div>" + "</td>";
				}
				str += "<td>" + "<div class='toggle col-md-8'><button class='initPassword btn-primary'  id='" + arr[i].account + "'>初始化</button></div>" + "</td>";
				str += "</tr>";
				//清空
				$("#data").append(str);
			}
			//是否初始化密码
			$(".initPassword").unbind().bind("click", function() {
				var acc_id = $(this).attr("id");
				//console.log(acc_id);
				var isSure = document.getElementById('isSure');
				isSure.showModal();
				$("#cancelInit").click(function() {
					isSure.close();
				});
				$("#sureInit").click(function() {
					isSure.close();
					$("#" + acc_id).html("已初始化");
					$("#" + acc_id).attr("disabled", true);
					$.post('../businessAccount/initPassword', {
						account: acc_id
					}, function(data, status) {
						console.log(data);
					});
				});
			});
			//是否启用
			$(".checked").change(function() {
				var acc_id = $(this).attr("id");
				var id = acc_id.split("_")[1];
				//console.log(id);
				var isChecked = $(this).attr("checked");
				var isStart;
				if (isChecked) {
					isStart = 0;
					$("#" + acc_id).removeAttr("checked");
				} else {
					isStart = 1;
					$("#" + acc_id).attr("checked", "checked");
				}
				$.post('../businessAccount/updateState', {
						account: id,
						state: isStart
					},
					function(data, status) {
						console.log(data);
					});
			});
		});
	}
	loadData('../businessAccount/getAllAccount');
	//添加信息
	$("#addAccountBtn").click(function() {
		addInformation.showModal();
	});
	$("#cancel").click(function() {
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
		$.getJSON('../logout', function(data) {});
	});
	//关闭登录信息
	$("#sure2").click(function() {
		var loginInformation = document.getElementById('loginInformation');
		loginInformation.close();
		window.location.reload();
	});
	//添加子账号
	$("#sure").click(function() {
		var account_type = parseInt($("#account_type").val());
		var isStart;
		if ($("#isStart").is(":checked")) {
			isStart = 1;
		} else {
			isStart = 0;
		}
		$.post('../businessAccount/addAccount', {
			account_type: account_type,
			state: isStart
		}, function(data, status) {
			$("#isStart").attr("checked", false);
			console.log(data);
			if (data.status == "0") {
				addInformation.close();
				var data2 = JSON.parse(data.data);
				console.log(data2);
				$("#loginAccount2").val(data2.account);
				$("#loginPassword2").val(data2.password);
				var loginInformation = document.getElementById('loginInformation');
				loginInformation.showModal();
				clearPage();
				getMaxPage();
				loadData('../businessAccount/getAllAccount');
			}
		});
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
		//console.log(maxPage);
		judge();
		loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
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
		loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
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
		loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
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
		loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
	});
	$("#previous").click(function() {
		clearPage();
		if (page == 1) {
			$("#one").css({
				"background": "#ddd"
			});
			loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
		} else if (page == 2) {
			page -= 1;
			$("#one").html(page);
			$("#two").html(page + 1);
			$("#three").html(page + 2);
			$("#one").css({
				"background": "#ddd"
			});
			loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
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
			loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
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
			loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + maxPage);
		} else {
			page += 1;
			$("#one").html(page - 1);
			$("#two").html(page);
			$("#three").html(page + 1);
			$("#two").css({
				"background": "#ddd"
			});
			$('#ellipsis').show();
			loadData('../businessAccount/getAllAccount?count=' + howMany + '&page=' + page);
		}
	});
});