+ function($) {
  "use strict";

  var defaults;
  
  $.modal = function(params, onOpen) {
    params = $.extend({}, defaults, params);


    var buttons = params.buttons;

    var buttonsHtml = buttons.map(function(d, i) {
      return '<a href="javascript:;" class="weui_btn_dialog ' + (d.className || "") + '">' + d.text + '</a>';
    }).join("");

    var tpl = '<div class="weui_dialog">' +
                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + params.title + '</strong></div>' +
                ( params.text ? '<div class="weui_dialog_bd">'+params.text+'</div>' : '')+
                '<div class="weui_dialog_ft">' + buttonsHtml + '</div>' +
              '</div>';
    
    var dialog = $.openModal(tpl, onOpen);

    dialog.find(".weui_btn_dialog").each(function(i, e) {
      var el = $(e);
      el.click(function() {
        //先关闭对话框，再调用回调函数
        if(params.autoClose) $.closeModal();

        if(buttons[i].onClick) {
          buttons[i].onClick();
        }
      });
    });

    return dialog;
  };

  $.openModal = function(tpl, onOpen) {
    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);
    mask.show();

    var dialog = $(tpl).appendTo(document.body);
 
    if (onOpen) {
      dialog.transitionEnd(function () {
        onOpen.call(dialog);
      });
    }   

    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_dialog_visible");


    return dialog;
  }

  $.closeModal = function() {
    $(".weui_mask_visible").removeClass("weui_mask_visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui_dialog_visible").removeClass("weui_dialog_visible").transitionEnd(function() {
      $(this).remove();
    });
  };

  $.alert = function(text, title, onOK) {
    var config;
    if (typeof text === 'object') {
      config = text;
    } else {
      if (typeof title === 'function') {
        onOK = arguments[1];
        title = undefined;
      }

      config = {
        text: text,
        title: title,
        onOK: onOK
      }
    }
    return $.modal({
      text: config.text,
      title: config.title,
      buttons: [{
        text: defaults.buttonOK,
        className: "primary",
        onClick: config.onOK
      }]
    });
  }

  $.confirm = function(text, title, onOK, onCancel) {
    var config;
    if (typeof text === 'object') {
      config = text
    } else {
      if (typeof title === 'function') {
        onCancel = arguments[2];
        onOK = arguments[1];
        title = undefined;
      }

      config = {
        text: text,
        title: title,
        onOK: onOK,
        onCancel: onCancel
      }
    }
    return $.modal({
      text: config.text,
      title: config.title,
      buttons: [
      {
        text: defaults.buttonCancel,
        className: "default",
        onClick: config.onCancel
      },
      {
        text: defaults.buttonOK,
        className: "primary",
        onClick: config.onOK
      }]
    });
  };

  //如果参数过多，建议通过 config 对象进行配置，而不是传入多个参数。
  $.prompt = function(text, title, onOK, onCancel, input) {
    var config;
    if (typeof text === 'object') {
      config = text;
    } else {
      if (typeof title === 'function') {
        onCancel = arguments[2];
        onOK = arguments[1];
        title = undefined;
      }
      config = {
        text: text,
        title: title,
        input: input,
        onOK: onOK,
        onCancel: onCancel
      }
    }

    var modal = $.modal({
      text: '<p class="weui-prompt-text">'+(config.text || '')+'</p><input type="text" class="weui_input weui-prompt-input" id="weui-prompt-input" value="' + (config.input || '') + '" />',
      title: config.title,
      buttons: [
      {
        text: defaults.buttonCancel,
        className: "default",
        onClick: config.onCancel
      },
      {
        text: defaults.buttonOK,
        className: "primary",
        onClick: function() {
          config.onOK && config.onOK($("#weui-prompt-input").val());
        }
      }]
    }, function () {
      this.find('.weui-prompt-input').focus()[0].select();
    });

    return modal;
  };

  defaults = $.modal.prototype.defaults = {
    title: "提示",
    text: undefined,
    buttonOK: "确定",
    buttonCancel: "取消",
    buttons: [{
      text: "确定",
      className: "primary"
    }],
    autoClose: true //点击按钮自动关闭对话框，如果你不希望点击按钮就关闭对话框，可以把这个设置为false
  };

}($);
