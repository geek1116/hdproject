$(function() {
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
	$("#login").click(function() {
		var user = $("#user").val();
		var password = $("#password").val();
		var verificationCode = $("#verificationCode").val();
		$("#userWarning").html("");
		$("#passwordWarning").html("");
		if (user == "") {
			$("#userWarning").html("账号不能为空！");
		} else if (password == "") {
			$("#passwordWarning").html("密码不能为空！");
		} else {
			console.log(user + " " + password);
			$.post('../system/login', {
				account: user,
				password: password,
			}, function(data, status) {
				console.log(data);
				var data2 = JSON.parse(data.data);
				console.log(data2);
				if (data2.data == "0") {
					window.location.href = 'head.html';
				} else if (data2.data == "1") {
					//账号不存在
					$("#userWarning").html("账号不存在或密码错误！");
				}
			});
		}
	});
});