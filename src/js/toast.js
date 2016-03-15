+ function($) {
  "use strict";

  var defaults;
  
  var show = function(html, className) {

    className = className || "";
    var mask = $("<div class='weui_mask_transparent'></div>").appendTo(document.body);

    var tpl = '<div class="weui_toast ' + className + '">' + html + '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.show();
    dialog.addClass("weui_toast_visible");
  };

  var hide = function() {
    $(".weui_mask_transparent").hide();
    $(".weui_toast_visible").removeClass("weui_toast_visible").transitionEnd(function() {
      $(this).remove();
    });
  }

  $.toast = function(text) {
    show('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (text || "已经完成") + '</p>');

    setTimeout(function() {
      hide();
    }, toastDefaults.duration);
  }

  $.showLoading = function(text) {
    var html = '<div class="weui_loading">';
    for(var i=0;i<12;i++) {
      html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
    }
    html += '</div>';
    html += '<p class="weui_toast_content">' + (text || "数据加载中") + '</p>';
    show(html, 'weui_loading_toast');
  }

  $.hideLoading = function() {
    hide();
  }

  var toastDefaults = $.toast.prototype.defaults = {
    duration: 2000
  }

}($);
