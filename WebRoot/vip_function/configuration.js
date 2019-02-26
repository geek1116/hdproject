$(function() {
	//加载商家信息
	$.getJSON('../general/getAccount', function(data) {
		var data2 = data.data;
		console.log(data2);
		if (data.status == '0') {
			//alert('1');
			$('#name').val(data2.name);
			if (data2.sex == '女') {
				$('#woman').attr('checked', true);
			} else {
				$('#man').attr('checked', true);
			}
			$('#phone').val(data2.phone);
			$('#email').val(data2.email);
		} else {
			console.log(data.status);
		}
	});
	//禁用或隐藏
	$("#successSave").hide();
	$("#sure").attr("disabled", true);
	$('.content-wrapper input').attr('disabled', true);
	$('.content-wrapper select').attr('disabled', true);
	//修改
	$('#modify').click(function() {
		$("#sure").removeAttr('disabled');
		$("#modify").attr("disabled", true);
		$('input').removeAttr('disabled');
		$('select').removeAttr('disabled');
	});
	//验证手机号
	var reg_phone = /^[1][3,4,5,6,7,8][0-9]{9}$/; //手机号正则表达式
	var reg_mobile = /^0[0-9]{2,3}-?[0-9]{7,8}$/; //家庭电话正则表达式
	//企业电话验证
	$("#phone").blur(function() {
		var hone = $("#phone").val();
		//alert(bus_phone);
		if (phone == "") {
			$("#phoneWarning").html("企业电话不能为空！");
		} else if (!reg_phone.test(phone) && !reg_mobile.test(phone)) {
			$("#phoneWarning").html("企业电话格式不正确！");
		}
	});

	//emial验证
	var reg_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	$("#email").focus(function() {
		$("#emailWarning").html("");
	});
	$("#email").blur(function() {
		var email = $("#email").val();
		//alert(con_email);
		if (email == "") {
			$("#emailWarning").html("Email不能为空！");
		} else if (!reg_email.test(email)) {
			$("#emailWarning").html("Email格式不正确！");
		}
	});
	//保存
	$("#name").focus(function() {
		$("#nameWarning").html("");
	});
	$("#name").blur(function() {
		if ($("#name").val() == "") {
			$("#nameWarning").html("姓名不能为空！");
		}
	});

	$(":radio").focus(function() {
		$("#sexWarning").html("");
	});
	$(":radio").blur(function() {
		if ($("input[type='radio']:checked").val() == undefined) {
			$("#nameWarning").html("请选择性别！");
		}
	});
	$("#sure").click(function() {
		var flag = 0; //判别是否可以保存
		//姓名
		var name = $("#name").val();
		if (name == "") {
			$("#nameWarning").html("姓名不能为空！");
			flag = 1;
		}
		//电话
		var phone = $("#phone").val();
		if (phone == "") {
			$("#phoneWarning").html("电话不能为空！");
			flag = 1;
		} else if (!reg_phone.test(phone) && !reg_mobile.test(phone)) {
			$("#phoneWarning").html("企业电话格式不正确！");
			flag = 1;
		}

		var sex = $("input[type='radio']:checked").val();
		if (sex == undefined) {
			$("#sexWarning").html("请选择性别！");
			flag = 1;
		} else {
			if (sex == '女士') sex = '女';
			else sex = '男';
		}
		//email
		var email = $("#email").val();
		if (email == "") {
			flag = 1;
			$("#emailWarning").html("Email不能为空！");
		} else if (!reg_email.test(email)) {
			$("#emailWarning").html("Email格式不正确！");
			flag = 1;
		}
		if (flag == 0) {
			$.post("../vipAccount/updateAccount", {
					name: name,
					sex: sex,
					email: email,
					phone: phone
				},
				function(data, status) {
					$("#successSave").show().delay(1500).hide(400);
					$("#sure").attr('disabled', true);
					$("#modify").removeAttr("disabled");
					$('.content-wrapper input').attr('disabled', true);
					$('.content-wrapper select').attr('disabled', true);
					console.log(data);
					if (data.status == "0") {
						console.log(data);

					} else {
						alert(data.message);
					}
				}
			);
		}
	});
	//修改密码

	//鼠标移进的样式
	$(".loginManager").mouseover(function() {
		$(".loginManager").css({
			"border-left": "none"
		});
	});
	//鼠标移走的样式
	$(".loginManager").mouseout(function() {
		$(".loginManager").css({
			"border-left": "3px solid #009688"
		});
	});
	//修改密码
	var modifyPassword = document.getElementById('modifyPassword');
	$("#modify2").click(function() {
		$('#pwd').html("修改登录密码");
		modifyPassword.showModal();
	});
	$("#modifyComsume").click(function() {
		$('#pwd').html("修改消费密码");
		modifyPassword.showModal();
	});
	$("#cancel").click(function() {
		//清空
		$("#oldpsd").val("");
		$("#newpsd").val("");
		$("#confirm").val("");
		modifyPassword.close();
	});
	$("#oldpsd").focus(function() {
		$("#warning").html("");
	});
	$("#newpsd").focus(function() {
		$("#warning").html("");
	});
	$("#confirm").focus(function() {
		$("#warning").html("");
	});
	$("#sureModify").click(function() {
		var oldpsd = $("#oldpsd").val();
		var newpsd = $("#newpsd").val();
		var confirm = $("#confirm").val();
		if (oldpsd == "") {
			$("#warning").html("原密码不能为空！");
		} else if (newpsd == "") {
			$("#warning").html("新密码不能为空！");
		} else if (confirm == "") {
			$("#warning").html("确认密码不能为空！");
		} else if (newpsd != confirm) {
			$("#warning").html("新密码和确认密码不一致！");
		} else {
			var pwd = $("#pwd").html();
			var url;
			//alert(pwd);
			if (pwd == '修改登录密码') {
				url = "../vipAccount/updateLoginPassword";
			} else {
				url = '../vipAccount/updateConsumePassword';
			}
			$.post(url, {
					oldPassword: oldpsd,
					newPassword: newpsd,
					confirmPassword: confirm
				},
				function(data, status) {
					if (data.status == "0") {
						//登录信息
						$("#oldpsd").val("");
						$("#newpsd").val("");
						$("#confirm").val("");
						modifyPassword.close();
						alert("成功修改密码！");

					} else {
						alert(data.message);
					}
				}
			);
		}
	});
});