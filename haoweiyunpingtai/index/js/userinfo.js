$(function () {
  $.ajax({
    url: serverUrl + "/users/current",
    type: "GET",
    cache: false,
    success: function (xhr, data) {
      if (xhr.status == 'SUCCESS') {
        $("#userinfo").html('<h2><a href="../../home/index.html" target="_blank" class="">' + xhr.data.email + '</a></h2>' +
          '<div id="login" _t_nav="login" style="display: none;">' +
          '<div>' +
          '<h2><a href="../../home/index.html">'+$.i18n.prop("header_usercenter")+'</a></h2>' +
          '</div>' +
          '<div>' +
          '<h2><a href="javascript:;" onclick="logout()">'+$.i18n.prop("header_logout")+'</a></h2>' +
          '</div>' +
          '</div>'
        );
      }
    }
  });
});

function logout() {
  $.ajax({
    url: serverUrl + "/users/logout",
    type: "POST",
    cache: false,
    success: function (xhr, data) {
      if (xhr.status == 'SUCCESS') {
        window.location.href = '../../index.html';
      }
    }
  });
}