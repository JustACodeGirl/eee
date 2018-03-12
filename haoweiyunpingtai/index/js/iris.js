/**
 * Created by nina.zheng on 2015/9/7.
 */
function trial (){
	$.ajax({
		url: serverUrl + "/users/current",
		type: "GET",
		cache: false,
		success: function (xhr, data) {
			if (xhr.status == 'SUCCESS') {
				window.location.href='../../home/index.html#/app/service_trial/1/%E8%99%B9%E8%86%9C%E8%AF%86%E5%88%AB';
			} else {
				window.location.href='signin.html';
			}
		}
	});
}