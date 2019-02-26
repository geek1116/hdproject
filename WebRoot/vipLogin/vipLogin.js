$(function() {
	//记住密码
	var strName = localStorage.getItem("vip_keyName");
	var strPassword = localStorage.getItem("vip_keyPassword");
	if (strName) {
		$("#user").val(strName);
	}
	if (strPassword) {
		$("#password").val(strPassword);
	}
	$("#user").focus(function() {
		$("#userWarning").html("");
	});
	$("#user").blur(function() {
		if ($("#user").val() == "") {
			$("#userWarning").html("账号不能为空！");
		}
	});
	$("#password").focus(function() {
		$("#passwordWarning").html("");
	});
	$("#password").blur(function() {
		if ($("#password").val() == "") {
			$("#passwordWarning").html("密码不能为空！");
		}
	});
	$("#verificationCode").focus(function() {
		$("#verificationWarning").html("");
	});
	$("#verificationCode").blur(function() {
		if ($("#verificationCode").val() == "") {
			$("#verificationWarning").html("验证码不能为空！");
		}
	});
	$("#login").click(function() {
		var user = $("#user").val();
		var password = $("#password").val();
		var verificationCode = $("#verificationCode").val();
		//记住密码
		localStorage.setItem("vip_keyName", user);
		if ($("input[type='checkbox'").is(':checked')) {
			localStorage.setItem("vip_keyPassword", password);
		} else {
			localStorage.removeItem("vip_keyPassword");
		}
		$("#userWarning").html("");
		$("#passwordWarning").html("");
		if (user == "") {
			$("#userWarning").html("账号不能为空！");
		} else if (password == "") {
			$("#passwordWarning").html("密码不能为空！");
		} else if (verificationCode == "") {
			$("#verificationWarning").html("验证码不能为空！");
		} else {
			console.log(user + " " + password + " " + verificationCode);
			$.post('../vip/login', {
				account: user,
				login_password: password,
				verificationCode: verificationCode
			}, function(data, status) {
				if (data.data == "0") {
					//判断用户类型
					$.getJSON('../general/getAccount', function(data) {
						//管理员
						window.location.href = "../vip_function/vip_head.html";
					});
				} else if (data.data == "1") {
					//账号不存在
					$("#userWarning").html("账号不存在或密码错误！");
				} else if (data.data == "2") {
					$("#verificationWarning").html("验证码错误!");
				}
			});
		}
	});
});