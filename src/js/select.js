/* global $:true */
+ function($) {
  "use strict";

  var defaults;

  var Select = function(input, config) {

    var self = this;
    this.config = config;

    this.$input = $(input);
    var tpl = $.t7.compile("<div class='weui-picker-modal weui-select-modal'>" + config.toolbarTemplate + (config.multi ? config.checkboxTemplate : config.radioTemplate) + "</div>");
    this.$input.prop("readOnly", true);
    

    this.$input.click(function() {
      self.parseInitValue();
      var dialog = self.dialog = $.openPicker(tpl({
        items: config.items,
        title: config.title,
        closeText: config.closeText
      }));

      dialog.on("change", function(e) {
        var checked = dialog.find("input:checked");
        var values = checked.map(function() {
          return $(this).val();
        });
        var titles = checked.map(function() {
          return $(this).data("title");
        });
        self.updateInputValue(values, titles);

        if(config.autoClose && !config.multi) $.closePicker();
      });

    });

    $(document).on("click", function() {});

  }

  Select.prototype.updateInputValue = function(values, titles) {
    var v, t;
    if(this.config.multi) {
      v = values.join(this.config.split);
      t = titles.join(this.config.split);
    } else {
      v = values[0];
      t = titles[0];
    }

    this.$input.val(t).data("values", v);
    this.$input.attr("value", t).attr("data-values", v);

    var data = {
      values: v,
      titles: t
    };
    this.$input.trigger("change", data);
    this.config.onChange && this.config.onChange.call(this, data);
  }

  Select.prototype.parseInitValue = function() {
    var value = this.$input.val();
    var items = this.config.items;
    if(value === undefined || value == null || value === "") return;

    var titles = this.config.multi ? value.split(this.config.split) : [value];
    for(var i=0;i<items.length;i++) {
      items[i].checked = false;
      for(var j=0;j<titles.length;j++) {
        if(items[i].title === titles[j]) {
          items[i].checked = true;
        }
      }
    }
  }

  $.fn.select = function(params) {
    var config = $.extend({}, defaults, params);
    if(!config.items || !config.items.length) return;

    config.items = config.items.map(function(d, i) {
      if(typeof d == typeof "a") {
        return {
          title: d,
          value: d
        };
      }

      return d;
    });


    return this.each(function() {
      var $this = $(this);
      if(!$this.data("weui-select")) $this.data("weui-select", new Select(this, config));

      var select = $this.data("weui-select");

      return select;
    });
  }

  defaults = $.fn.select.prototype.defaults = {
    items: [],
    title: "请选择",
    multi: false,
    closeText: "关闭",
    autoClose: true, //是否选择完成后自动关闭，只有单选模式下才有效
    onChange: undefined, //function
    split: ",",  //多选模式下的分隔符
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
            <input type="radio" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}">\
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
            <input type="checkbox" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}" >\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
  }

}($);
