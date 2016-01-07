+ function($) {
  "use strict";

  var defaults;
  
  $.modal = function(params) {
    params = $.extend({}, defaults, params);

    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);

    var buttons = params.buttons;

    var buttonsHtml = buttons.map(function(d, i) {
      return '<a href="javascript:;" class="weui_btn_dialog ' + (d.className || "") + '">' + d.text + '</a>';
    }).join("");

    var tpl = '<div class="weui_dialog">' +
                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + params.title + '</strong></div>' +
                ( params.text ? '<div class="weui_dialog_bd">'+params.text+'</div>' : '')+
                '<div class="weui_dialog_ft">' + buttonsHtml + '</div>' +
              '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.find(".weui_btn_dialog").each(function(i, e) {
      if(buttons[i].callback) {
        $(e).click(function() {
          buttons[i].callback();
        });
      }
    });

    mask.show();
    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_dialog_visible");
  };

  $.closeModal = function() {
    $(".weui_mask").removeClass("weui_mask_visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui_dialog").removeClass("weui_dialog_visible").transitionEnd(function() {
      $(this).remove();
    });
  };

  $.alert = function(text, title, callback) {
    if (typeof title === 'function') {
      callback = arguments[1];
      title = undefined;
    }
    return $.modal({
      text: text,
      title: title,
      buttons: [{
        text: defaults.buttonOK,
        className: "primary close-modal",
        callback: callback
      }]
    });
  }

  $.confirm = function(text, title, callbackOK, callbackCancel) {
    if (typeof title === 'function') {
      callbackCancel = arguments[2];
      callbackOK = arguments[1];
      title = undefined;
    }
    return $.modal({
      text: text,
      title: title,
      buttons: [
      {
        text: defaults.buttonCancel,
        className: "default close-modal",
        callback: callbackCancel
      },
      {
        text: defaults.buttonOK,
        className: "primary close-modal",
        callback: callbackOK
      }]
    });
  };

  defaults = $.modal.prototype.defaults = {
    title: "提示",
    text: undefined,
    buttonOK: "确定",
    buttonCancel: "取消",
    buttons: [{
      text: "确定",
      className: "primary"
    }]
  };

  $(function() {
    $(document).on("click", ".close-modal", function() {
      $.closeModal();
    });
  });

}($);
