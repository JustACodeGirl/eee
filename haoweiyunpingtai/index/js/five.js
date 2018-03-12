// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  if ($(document.body).width() <= 1280) {
    $('.page').addClass('page-noshadow').removeClass('page');
  }
});