$(function () {
  var currentLang = getLang();
  jQuery.i18n.properties({
    language:currentLang,
    name:'strings',
    path:'/resource/i18n/',
    mode:'map',
    callback: function() {
      $('[translate-name]').each(function(){
        $(this).text($.i18n.prop($(this).attr('translate-name')));
      });

      $("form input[type=email]").each(function(){
        var group = $(this).attr('translate-group');
        $(this).attr("placeholder", $.i18n.prop(group+"_emailhint"))
          .attr("data-validation-required-message", $.i18n.prop(group+"_emailrequired"))
          .attr("data-validation-validemail-message", $.i18n.prop(group+"_emailinvalid"));
      });

      $("form input[type=password]").each(function(){
        var group = $(this).attr('translate-group');
        if($(this).attr("data-validation-match-match") != undefined){
          $(this).attr("placeholder", $.i18n.prop(group+"_cpasswordhint"))
            .attr("data-validation-match-message", $.i18n.prop(group+"_cpasswordmatch"));
        } else {
          $(this).attr("placeholder", $.i18n.prop(group+"_passwordhint"))
            .attr("data-validation-required-message", $.i18n.prop(group+"_passwordrequired"))
            .attr("data-validation-minlength-message", $.i18n.prop(group+"_passwordminlength"));
        }
      });
    }
  });

  if(currentLang == "en"){
    $("#currentLang").html("English");
    $("#language").html('<div><h2><a class="link" href="javascript:;" onclick="changeLang(this)">中文</a></h2></div>');
  } else {
    setLang("cn-CN");
    $("#currentLang").html("中文");
    $("#language").html('<div><h2><a class="link" href="javascript:;" onclick="changeLang(this)">English</a></h2></div>');
  }
});
function changeLang(element){
  if(element.text == 'English'){
    setLang("en");
  } else if(element.text == '中文') {
    setLang("cn-CN");
  }
  window.location.reload();
}

function setLang(value){
  if(window.localStorage){
    setLocalStorage("NG_TRANSLATE_LANG_KEY", value);
  } else {
    setCookie("NG_TRANSLATE_LANG_KEY", value);
  }
}

function getLang(){
  if(window.localStorage){
    return getLocalStorage("NG_TRANSLATE_LANG_KEY");
  } else {
    return getCookie("NG_TRANSLATE_LANG_KEY");
  }
}

function setCookie(name ,value){
  document.cookie = name + "=" + value;
}

function getCookie(name){
  var attr;
  var reg = new RegExp("(^|)"+name+"=(.*|$)");
  if(attr=document.cookie.match(reg)){
    return attr[2];
  } else {
    return null;
  }
}

function setLocalStorage(name, value){
  window.localStorage.setItem(name, value);
}

function getLocalStorage(name){
  return window.localStorage.getItem(name);
}