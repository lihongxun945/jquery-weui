+ function($) {
  "use strict";

  var defaults;
  
  var show = function(html, className) {
    className = className || "";
    var mask = $("<div class='weui-mask_transparent'></div>").appendTo(document.body);

    var tpl = '<div class="weui-toast ' + className + '">' + html + '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.addClass("weui-toast--visible");
    dialog.show();
  };

  var hide = function(callback) {
    $(".weui-mask_transparent").remove();
    var done = false;
    var $el = $(".weui-toast--visible").removeClass("weui-toast--visible").transitionEnd(function() {
      var $this = $(this);
      $this.remove();
      callback && callback();
      done = true
    });

    setTimeout(function () {
      if (!done) {
        $el.remove()
        callback && callback();
      }
    }, 1000)
  }

  $.toast = function(text, style, callback, ms) {
    if (typeof style === "function") {
      ms = callback;
      callback = style;
    } else if (typeof style === typeof 1) {
      ms = style;
    } else if (typeof callback === typeof 1) {
      ms = callback;
      callback = null
    }
    var className, iconClassName = 'weui-icon-success-no-circle';
    var duration = ms ? ms : toastDefaults.duration;
    if(style == "cancel") {
      className = "weui-toast_cancel";
      iconClassName = 'weui-icon-cancel'
    } else if(style == "forbidden") {
      className = "weui-toast--forbidden";
      iconClassName = 'weui-icon-warn'
    } else if(style == "text") {
      className = "weui-toast--text";
    } else if(typeof style === typeof 1) {
      duration = style
    }
    show('<i class="' + iconClassName + ' weui-icon_toast"></i><p class="weui-toast_content">' + (text || "已经完成") + '</p>', className);

    setTimeout(function() {
      hide(callback);
    }, duration);
  }

  $.showLoading = function(text) {
    var html = '<div class="weui_loading">';
    html += '<i class="weui-loading weui-icon_toast"></i>';
    html += '</div>';
    html += '<p class="weui-toast_content">' + (text || "数据加载中") + '</p>';
    show(html, 'weui_loading_toast');
  }

  $.hideLoading = function() {
    hide();
  }

  var toastDefaults = $.toast.prototype.defaults = {
    duration: 2500
  }

}($);
