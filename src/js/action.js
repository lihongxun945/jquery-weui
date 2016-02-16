+ function($) {
  "use strict";

  var defaults;
  
  var show = function(params) {

    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);

    var actions = params.actions || [];

    var actionsHtml = actions.map(function(d, i) {
      return '<div class="weui_actionsheet_cell ' + (d.className || "") + '">' + d.text + '</div>';
    }).join("");

    var tpl = '<div class="weui_actionsheet " id="weui_actionsheet">'+
                '<div class="weui_actionsheet_menu">'+
                actionsHtml +
                '</div>'+
                '<div class="weui_actionsheet_action">'+
                  '<div class="weui_actionsheet_cell weui_actionsheet_cancel">取消</div>'+
                  '</div>'+
                '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.find(".weui_actionsheet_menu .weui_actionsheet_cell, .weui_actionsheet_action .weui_actionsheet_cell").each(function(i, e) {
      $(e).click(function() {
        $.closeActions();
        if(actions[i] && actions[i].onClick) {
          actions[i].onClick();
        }
      })
    });

    mask.show();
    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_actionsheet_toggle");
  };

  var hide = function() {
    $(".weui_mask").removeClass("weui_mask_visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui_actionsheet").removeClass("weui_actionsheet_toggle").transitionEnd(function() {
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

  var defaults = $.actions.prototype.defaults = {
    /*actions: [{
      text: "菜单",
      className: "danger",
      onClick: function() {
        console.log(1);
      }
    },{
      text: "菜单2",
      className: "danger",
      onClick: function() {
        console.log(2);
      }
    }]*/
  }

}($);
