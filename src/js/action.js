+ function($) {
  "use strict";

  var defaults;
  
  var show = function(params) {

    var mask = $("<div class='weui-mask weui-actions_mask'></div>").appendTo(document.body);

    var actions = params.actions || [];

    var actionsHtml = actions.map(function(d, i) {
      return '<div class="weui-actionsheet__cell ' + (d.className || "") + '">' + d.text + '</div>';
    }).join("");

    var titleHtml = "";
    
    if (params.title) {
      titleHtml = '<div class="weui-actionsheet__title"><p class="weui-actionsheet__title-text">' + params.title + '</p></div>';
    }

    var tpl = '<div class="weui-actionsheet " id="weui-actionsheet">'+
                titleHtml +
                '<div class="weui-actionsheet__menu">'+
                actionsHtml +
                '</div>'+
                '<div class="weui-actionsheet__action">'+
                  '<div class="weui-actionsheet__cell weui-actionsheet_cancel">取消</div>'+
                  '</div>'+
                '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.find(".weui-actionsheet__menu .weui-actionsheet__cell, .weui-actionsheet__action .weui-actionsheet__cell").each(function(i, e) {
      $(e).click(function() {
        $.closeActions();
        params.onClose && params.onClose();
        if(actions[i] && actions[i].onClick) {
          actions[i].onClick();
        }
      })
    });

    mask.show();
    dialog.show();
    mask.addClass("weui-mask--visible");
    dialog.addClass("weui-actionsheet_toggle");
  };

  var hide = function() {
    $(".weui-mask").removeClass("weui-mask--visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui-actionsheet").removeClass("weui-actionsheet_toggle").transitionEnd(function() {
      $(this).remove();
    });
  }

  $.actions = function(params) {
    params = $.extend({}, defaults, params);
    show(params);
  }

  $.closeActions = function() {
    hide();
  }

  $(document).on("click", ".weui-actions_mask", function() {
    $.closeActions();
  });

  var defaults = $.actions.prototype.defaults = {
    title: undefined,
    onClose: undefined,
    /*actions: [{
      text: "菜单",
      className: "color-danger",
      onClick: function() {
        console.log(1);
      }
    },{
      text: "菜单2",
      className: "color-success",
      onClick: function() {
        console.log(2);
      }
    }]*/
  }

}($);
