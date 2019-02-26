$(function() {
	//加载商家信息
	$.getJSON('../businessInfo/getInfo', function(data) {
		var data2 = data.data;
		if (data.status == "0") {
			console.log(data2);
			var bus_type = document.getElementById('bus_type');
			for (var i = 0; i < bus_type.options.length; i++) {
				if (bus_type.options[i].value == data2.type) {
					bus_type.options[i].selected = true;
				}
			}
			$('#bus_name').val(data2.b_name);
			var detailAddress = data2.address.split(" ");
			console.log(detailAddress);
			//加载地址
			$.getJSON('https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=1&key=e3da30f48254d815699bc01b68d42309', function(data) {
				var address2 = data.districts[0].districts;
				for (var i = 0; i < address2.length; i++) {
					$("#province").append("<option value='" + address2[i].name + "'>" + address2[i].name + "</option>");
					//console.log(address[i].name);
				}
				var province = document.getElementById('province');
				for (i = 0; i < province.options.length; i++) {
					if (province.options[i].value == detailAddress[0]) {
						province.options[i].selected = true;
					}
				}
				$.getJSON("https://restapi.amap.com/v3/config/district?keywords=" + $("#province").val() + "&subdistrict=1&key=e3da30f48254d815699bc01b68d42309", function(data) {
					var address3 = data.districts[0].districts;
					for (var i = 0; i < address3.length; i++) {
						$("#city").append("<option value='" + address3[i].name + "'>" + address3[i].name + "</option>");
						//console.log(address[i].name);
					}
					var city = document.getElementById('city');
					for (i = 0; i < city.options.length; i++) {
						if (city.options[i].value == detailAddress[1]) {
							city.options[i].selected = true;
						}
					}
					$.getJSON("https://restapi.amap.com/v3/config/district?keywords=" + $("#city").val() + "&subdistrict=1&key=e3da30f48254d815699bc01b68d42309", function(data) {
						var address4 = data.districts[0].districts;
						for (var i = 0; i < address4.length; i++) {
							$("#district").append("<option value='" + address4[i].name + "'>" + address4[i].name + "</option>");
							//console.log(address[i].name);
						}
						var district = document.getElementById('district');
						for (i = 0; i < district.options.length; i++) {
							if (district.options[i].value == detailAddress[2]) {
								district.options[i].selected = true;
							}
						}
					});
				});
			});
			$('#detail').val(detailAddress[3]);
			$('#bus_phone').val(data2.b_telephone);
			if (data2.postcode == null) {
				$('#bus_postcode').val("");
			} else {
				$('#bus_postcode').val(data2.postcode);
			}
			if (data2.c_gender == "女士") {
				$('#woman').attr("checked", true);
			} else {
				$('#man').attr("checked", true);
			}
			$("#con_name").val(data2.c_name);
			$("#con_position").val(data2.c_position);
			if (data2.c_cellphone == null) {
				$("#con_tel").val("");
			} else {
				$("#con_tel").val(data2.c_cellphone);
			}
			if (data2.c_telephone == null) {
				$("#con_mobile").val("");
			} else {
				$("#con_mobile").val(data2.c_telephone);
			}
			if (data2.c_fax == null) {
				$("#con_fax").val("");
			} else {
				$("#con_fax").val(data2.c_fax);
			}
			$("#con_email").val(data2.c_mail);
		}
	});
	//加载地址
	$("#province").change(function() {
		console.log($("#province").val());
		$.getJSON("https://restapi.amap.com/v3/config/district?keywords=" + $("#province").val() + "&subdistrict=1&key=e3da30f48254d815699bc01b68d42309", function(data) {
			var address5 = data.districts[0].districts;
			//删除子节点
			$("#city").empty();
			for (var i = 0; i < address5.length; i++) {
				$("#city").append("<option>" + address5[i].name + "</option>");
				//console.log(address5[i].name);
			}
			$.getJSON("https://restapi.amap.com/v3/config/district?keywords=" + $("#city").val() + "&subdistrict=1&key=e3da30f48254d815699bc01b68d42309", function(data) {
				var address6 = data.districts[0].districts;
				//删除子节点
				$("#district").empty();
				for (var i = 0; i < address6.length; i++) {
					$("#district").append("<option>" + address6[i].name + "</option>");
					//console.log(address6[i].name);
				}
			});
		});
	});
	$("#city").change(function() {
		$.getJSON("https://restapi.amap.com/v3/config/district?keywords=" + $("#city").val() + "&subdistrict=1&key=e3da30f48254d815699bc01b68d42309", function(data) {
			var address7 = data.districts[0].districts;
			//删除子节点
			$("#district").empty();
			for (var i = 0; i < address7.length; i++) {
				$("#district").append("<option>" + address7[i].name + "</option>");
				//console.log(address6[i].name);
			}
		});
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
	//清空警示
	$("#bus_phone").focus(function() {
		$("#bus_phoneWarning").html("");
	});
	$("#con_tel").focus(function() {
		$("#con_telWarning").html("");
	});
	$("#con_mobile").focus(function() {
		$("#con_mobileWarning").html("");
	});
	//企业电话验证
	$("#bus_phone").blur(function() {
		var bus_phone = $("#bus_phone").val();
		//alert(bus_phone);
		if (bus_phone == "") {
			$("#bus_phoneWarning").html("企业电话不能为空！");
		} else if (!reg_phone.test(bus_phone) && !reg_mobile.test(bus_phone)) {
			$("#bus_phoneWarning").html("企业电话格式不正确！");
		}
	});
	//联系人电话或手机号验证
	$("#con_tel").blur(function() {
		var con_tel = $("#con_tel").val();
		//alert(con_tel);
		if (con_tel != "") {
			if (!reg_mobile.test(con_tel)) {
				$("#con_telWarning").html("电话格式不正确！格式如0232-2323233");
			}
		}
	});
	$("#con_mobile").blur(function() {
		var con_mobile = $("#con_mobile").val();
		//alert(con_mobile);
		if (con_mobile != "") {
			if (!reg_phone.test(con_mobile)) {
				$("#con_mobileWarning").html("手机号格式不正确！");
			}
		}
	});
	//邮政编码验证
	var reg_postcode = /^[1-9][0-9]{5}$/;
	$("#bus_postcode").focus(function() {
		$("#bus_postcodeWarning").html("");
	});
	$("#bus_postcode").blur(function() {
		var bus_postcode = $("#bus_postcode").val();
		//alert(con_mobile);
		if (bus_postcode != "") {
			if (!reg_postcode.test(bus_postcode)) {
				$("#bus_postcodeWarning").html("邮政编码格式不正确！");
			}
		}
	});
	//emial验证
	var reg_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	$("#con_email").focus(function() {
		$("#con_emailWarning").html("");
	});
	$("#con_email").blur(function() {
		var con_email = $("#con_email").val();
		//alert(con_email);
		if (con_email == "") {
			$("#con_emailWarning").html("Email不能为空！");
		} else if (!reg_email.test(con_email)) {
			$("#con_emailWarning").html("Email格式不正确！");
		}
	});
	//确定加盟
	$("#bus_name").focus(function() {
		$("#bus_nameWarning").html("");
	});
	$("#bus_name").blur(function() {
		if ($("#bus_name").val() == "") {
			$("#bus_nameWarning").html("企业名称不能为空！");
		}
	});
	$("#detail").focus(function() {
		$("#bus_addWarning").html("");
	});
	$("#detail").blur(function() {
		if ($("#detail").val() == "") {
			$("#bus_addWarning").html("详细地址不能为空！");
		}
	});
	$("#con_name").focus(function() {
		$("#con_nameWarning").html("");
	});
	$("#con_name").blur(function() {
		if ($("#con_name").val() == "") {
			$("#con_nameWarning").html("姓名不能为空！");
		}
	});
	$("#verificationCode").focus(function() {
		$("#verificationCodeWarning").html("");
	});
	$("#verificationCode").blur(function() {
		if ($("#verificationCode").val() == "") {
			$("#verificationCodeWarning").html("验证码不能为空！");
		}
	});
	$(":radio").focus(function() {
		$("#con_titleWarning").html("");
	});
	$(":radio").blur(function() {
		if ($("input[type='radio']:checked").val() == undefined) {
			$("#con_titleWarning").html("请选择称谓！");
		}
	});
	$("#con_position").focus(function() {
		$("#con_positionWarning").html("");
	});
	$("#con_position").blur(function() {
		if ($("#con_position").val() == "") {
			$("#con_positionWarning").html("职务不能为空！");
		}
	});
	$("#sure").click(function() {
		var flag = 0; //判别是否可以保存
		//企业类型
		var bus_type = $("#bus_type").val();
		//企业名称
		var bus_name = $("#bus_name").val();
		if (bus_name == "") {
			$("#bus_nameWarning").html("企业名称不能为空！");
			flag = 1;
		}
		//企业地址
		var bus_add = $("#province").val() + " " + $("#city").val() + " " + $("#district").val() + " " + $("#detail").val();
		if ($("#detail").val() == "") {
			$("#bus_addWarning").html("详细地址不能为空！");
			flag = 1;
		}
		//企业电话
		var bus_phone = $("#bus_phone").val();
		if (bus_phone == "") {
			$("#bus_phoneWarning").html("企业电话不能为空！");
			flag = 1;
		} else if (!reg_phone.test(bus_phone) && !reg_mobile.test(bus_phone)) {
			$("#bus_phoneWarning").html("企业电话格式不正确！");
			flag = 1;
		}
		//企业邮编
		var bus_postcode = $("#bus_postcode").val();
		if (bus_postcode != "") {
			if (!reg_postcode.test(bus_postcode)) {
				$("#bus_postcodeWarning").html("邮政编码格式不正确！");
				flag = 1;
			}
		}
		//商家资料
		var con_title = $("input[type='radio']:checked").val();
		if (con_title == undefined) {
			$("#con_titleWarning").html("请选择称谓！");
			flag = 1;
		}
		var con_name = $("#con_name").val();
		if (con_name == "") {
			$("#con_nameWarning").html("姓名不能为空！");
			flag = 1;
		}
		var con_position = $("#con_position").val();
		if (con_position == "") {
			$("#con_positionWarning").html("职务不能为空！");
			flag = 1;
		}
		var con_tel = $("#con_tel").val();
		if (con_tel != "") {
			if (!reg_mobile.test(con_tel)) {
				$("#con_telWarning").html("电话格式不正确！");
				flag = 1;
			}
		}
		var con_mobile = $("#con_mobile").val();
		if (con_mobile != "") {
			if (!reg_phone.test(con_mobile)) {
				$("#con_mobileWarning").html("手机号格式不正确！");
				flag = 1;
			}
		}
		var con_fax = $("#con_fax").val();
		var con_email = $("#con_email").val();
		if (con_email == "") {
			flag = 1;
			$("#con_emailWarning").html("Email不能为空！");
		} else if (!reg_email.test(con_email)) {
			$("#con_emailWarning").html("Email格式不正确！");
			flag = 1;
		}
		if (flag == 0) {
			$.post("../businessInfo/updateInfo", {
					type: bus_type,
					b_name: bus_name,
					address: bus_add,
					b_telephone: bus_phone,
					postcode: bus_postcode,
					c_gender: con_title,
					c_name: con_name,
					c_position: con_position,
					c_cellphone: con_tel,
					c_telephone: con_mobile,
					c_fax: con_fax,
					c_mail: con_email,
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
			$.post("../businessLog/updatePassword", {
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