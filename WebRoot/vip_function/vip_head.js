$(function() {
	var strName = localStorage.getItem("vip_keyName");
	$("#account").html(strName);
	$('#content').load('configuration.html');
	$('#configuration').addClass('selectFunction');
	$('#configuration').click(function() {
		$('#content').load('configuration.html');
		remove();
		$('#configuration').addClass('selectFunction');
	});
	$('#review').click(function() {
		$('#content').load('review.html');
		remove();
		$('#review').addClass('selectFunction');
	});
	$('#query').click(function() {
		$('#content').load('query.html');
		remove();
		$('#query').addClass('selectFunction');
	});
	//去掉选中样式
	function remove() {
		$('#configuration').removeClass('selectFunction');
		$('#review').removeClass('selectFunction');
		$('#query').removeClass('selectFunction');
	}
	$("#quitSystem").click(function() {
		$.post('../vip/logout');
	});
});