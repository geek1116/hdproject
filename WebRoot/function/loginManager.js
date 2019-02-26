$(function() {
	//加载账号
	var strName = localStorage.getItem("keyName");
	$("#account").html(strName);
	$("#currentAccount").val(strName);
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
	var modifyPassword = document.getElementById('modifyPassword');
	$("#modify2").click(function() {
		modifyPassword.showModal();
	});
	$("#cancel").click(function() {
		//清空
		$("#oldpsd").val("");
		$("#newpsd").val("");
		$("#confirm").val("");
		modifyPassword.close();
	});
	//修改密码
	$("#oldpsd").focus(function() {
		$("#warning").html("");
	});
	$("#newpsd").focus(function() {
		$("#warning").html("");
	});
	$("#confirm").focus(function() {
		$("#warning").html("");
	});
	$("#sure").click(function() {
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
			$.post("../updatePassword", {
					oldpsd: oldpsd,
					newpsd: newpsd,
					confirm: confirm
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