/* global $:true */
+ function($) {
  "use strict";

  var defaults;

  $.fn.select = function(params) {
    var config = $.extend({}, defaults, params);
    if(!config.items || !config.items.length) return;

    var tpl = $.t7.compile("<div class='weui-picker-modal weui-select-modal'>" + config.toolbarTemplate + (config.multi ? config.checkboxTemplate : config.radioTemplate) + "</div>");

    return this.each(function() {
      var $this = $(this);
      $this.prop("readOnly", true);
      $this.click(function() {
        if($this.data("opened")) return;
        $.openPicker(tpl({
          items: config.items,
          title: config.title,
          closeText: config.closeText
        }));
        $this.data("opened", true);
      });
    });
  }

  defaults = $.fn.select.prototype.defaults = {
    items: [],
    title: "请选择",
    multi: false,
    closeText: "关闭",
    toolbarTemplate: '<div class="toolbar">\
      <div class="toolbar-inner">\
      <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>\
      <h1 class="title">{{title}}</h1>\
      </div>\
      </div>',
    radioTemplate:
      '<div class="weui_cells weui_cells_radio">\
        {{#items}}\
        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">\
          <div class="weui_cell_bd weui_cell_primary">\
            <p>{{this.title}}</p>\
          </div>\
          <div class="weui_cell_ft">\
            <input type="radio" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} >\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
    checkboxTemplate:
      '<div class="weui_cells weui_cells_checkbox">\
        {{#items}}\
        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">\
          <div class="weui_cell_bd weui_cell_primary">\
            <p>{{this.title}}</p>\
          </div>\
          <div class="weui_cell_ft">\
            <input type="checkbox" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} >\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
  }

}($);
