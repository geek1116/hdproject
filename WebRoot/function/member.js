$(document).ready(function() {
	var addInformation = document.getElementById('addInformation');
	var loginInformation = document.getElementById("loginInformation");
	//禁用或隐藏
	$("#successSave").hide();
	//添加商品信息
	$("#addMember").click(function() {
		addInformation.showModal();
	});

	$("#cancelAdd").click(function() {
		clearMember();
		addInformation.close();
	});
	//添加会员
	$("#name").focus(function() {
		$("#addWarning").html("");
	});
	$(":radio").focus(function() {
		$("#addWarning").html("");
	});
	$(":radio").blur(function() {
		if ($("input[name='gender']:checked").val() == undefined) {
			$("#addWarning").html("请选择称谓！");
		}
	});
	$("#phone").focus(function() {
		$("#addWarning").html("");
	});
	$("#email").focus(function() {
		$("#addWarning").html("");
	});
	$("#name").blur(function() {
		if ($("#name").val() == "") {
			$("#addWarning").html("姓名不能为空！");
		}
	});
	//验证手机号
	var reg_phone = /^[1][3,4,5,6,7,8][0-9]{9}$/; //手机号正则表达式
	var reg_mobile = /^0[0-9]{2,3}-?[0-9]{7,8}$/; //家庭电话正则表达式
	$("#phone").blur(function() {
		var phone = $("#phone").val();
		//alert(phone);
		if (phone == "") {
			$("#addWarning").html("电话不能为空！");
		} else if (!reg_phone.test(phone) && !reg_mobile.test(phone)) {
			$("#addWarning").html("电话格式不正确！");
		}
	});
	//emial验证
	var reg_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	$("#email").focus(function() {
		$("#addWarning").html("");
	});
	$("#email").blur(function() {
		var email = $("#email").val();
		//alert(email);
		if (email == "") {
			$("#addWarning").html("邮箱不能为空！");
		} else if (!reg_email.test(email)) {
			$("#addWarning").html("邮箱格式不正确！");
		}
	});
	$("#sureAdd").click(function() {
		var sex = $("input[name='gender']:checked").val();
		if (sex == "女士") {
			sex = "女";
		} else {
			sex = "男";
		}
		var name = $("#name").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		if (name == "") {
			$("#addWarning").html("姓名不能为空！");
		} else if (!sex) {
			$("#addWarning").html("请选择称谓！");
		} else if (phone == "") {
			$("#addWarning").html("电话不能为空！");
		} else if (!reg_phone.test(phone) && !reg_mobile.test(phone)) {
			$("#addWarning").html("电话格式不正确！");
		} else if (email == "") {
			$("#addWarning").html("邮箱不能为空！");
		} else if (!reg_email.test(email)) {
			$("#addWarning").html("邮箱格式不正确！");
		} else {
			$.post('../businessVip/addVip', {
				name: name,
				sex: sex,
				phone: phone,
				email: email
			}, function(data, status) {
				console.log(data);
				addInformation.close();
				clearMember();
				loginInformation.showModal();
				$("#loginAccount").val(data.data.account);
				$("#loginPassword").val(data.data.card_id);
			});
		}
	});
	//清空添加会员信息
	function clearMember() {
		$("#name").val("");
		$("#phone").val("");
		$("#email").val("");
		$("input[type='radio']:checked").removeAttr("checked");
	}
	$("#sure2").click(function() {
		loginInformation.close();
	});

	//会员消费
	$('#card_id').focus(function() {
		$("#card_idWarning").html("");
	});
	$("#card_id").blur(function() {
		if ($("#card_id").val() == "") {
			$("#card_idWarning").html("会员卡号不能为空！");
		}
	});
	$("#money").focus(function() {
		$("#moneyWarning").html("");
	});
	$("#money").blur(function() {
		var money = $("#money").val();
		if (money == "") {
			$("#moneyWarning").html("消费金额不能为空!");
		} else if (isNaN(parseFloat(money))) {
			$("#moneyWarning").html("消费金额格式不正确！");
		}
	});
	//清空会员消费
	function clearConsumption() {
		$("#card_id").val("");
		$("input[name='consumption']").removeAttr("checked");
		money = $("#money").val("");
	}
	//提交会员消费
	$("#consumptionSure").click(function() {
		var id = $("#card_id").val();
		var type = $("input[name='consumption']:checked").val();
		var money = $("#money").val();
		if (id == "") {
			$("#card_idWarning").html("会员卡号不能为空！");
		} else if (type == "") {
			$("#card_idWarning").html("消费方式不能为空！");
		} else if (money == "") {
			$("#moneyWarning").html("消费金额不能为空!");
		} else if (isNaN(parseFloat(money))) {
			$("#moneyWarning").html("消费金额格式不正确！");
		} else {
			money = parseFloat(money).toFixed(2);
			$.ajax({
				url: '../businessVip/consume',
				dataType: "json",
				data: {
					id: id,
					type: type,
					money: money
				},
				type: 'POST',
				success: function(data, status) {
					if (data.status == "0") {
						console.log(data);
						clearConsumption();
						$(".saveWarning").html("提交成功");
						$("#successSave").show().delay(1500).hide(400);
					}
				},
				error: function(data, status) {

					console.log('test');
					$("#card_idWarning").html("会员卡号不存在！");

				}
			});
		}
	});
	//取消会员消费
	$("#consumptionCancel").click(function() {
		clearConsumption();
	});

	//会员充值
	$('#recharge_id').focus(function() {
		$("#recharge_idWarning").html("");
	});
	$("#recharge_id").blur(function() {
		if ($("#recharge_id").val() == "") {
			$("#recharge_idWarning").html(" 会员卡号不能为空！");
		}
	});
	$("#r_money").focus(function() {
		$("#r_moneyWarning").html("");
	});
	$("#r_money").blur(function() {
		var money = $("#r_money").val();
		if (money == "") {
			$("#r_moneyWarning").html("充值金额不能为空!");
		} else if (isNaN(parseFloat(money))) {
			$("#r_moneyWarning").html("充值金额格式不正确！");
		}
	});
	//提交会员充值
	$("#rechargeSure").click(function() {
		var id = $("#recharge_id").val();
		var money = $("#r_money").val();
		if (id == "") {
			$("#recharge_idWarning").html("会员卡号不能为空！");
		} else if (money == "") {
			$("#r_moneyWarning").html("充值金额不能为空!");
		} else if (isNaN(parseFloat(money))) {
			$("#r_moneyWarning").html("充值金额格式不正确！");
		} else {
			money = parseFloat(money).toFixed(2);
			$.ajax({
				url: '../businessVip/recharge',
				dataType: "json",
				data: {
					id: id,
					money: money
				},
				type: 'POST',
				success: function(data, status) {
					if (data.status == "0") {
						console.log(data);
						clearRecharge();
						$(".saveWarning").html("提交成功");
						$("#successSave").show().delay(1500).hide(400);
					}
				},
				error: function(data, status) {
					$("#recharge_idWarning").html("会员卡号不存在！");

				}
			});
		}
	});
	//取消会员充值
	$("#rechargeCancel").click(function() {
		clearRecharge();
	});
	//清空会员充值
	function clearRecharge() {
		$("#recharge_id").val("");
		$("#r_money").val("");
	}
});