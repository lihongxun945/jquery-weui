/* global $:true */
+function ($) {
    "use strict";

    var defaults;

    var SelectPicker = function (input, config) {

        var self = this;
        this.config = config;

        this.$input = $(input);
        this.$input.prop("readOnly", true);

        this.initConfig();

        config = this.config;

        this.$input.click($.proxy(this.open, this));

    }

    SelectPicker.prototype.initConfig = function () {
        this.config = $.extend({}, defaults, this.config);

        var config = this.config;

        if (!config.items || !config.items.length) return;

        config.items = config.items.map(function (d, i) {
            if (typeof d == typeof "a") {
                return {
                    title: d,
                    value: d
                };
            }else{
                if(d.type =="normal"){
                    d.input=config.multi ? 'checkbox':'radio';
                }else{
                    d.input='hidden';
                }
            }

            return d;
        });


        this.tpl = $.t7.compile("<div class='weui-picker-modal weui-select-modal weui-select-picker-modal'>" + config.toolbarTemplate + (config.multi ? config.checkboxTemplate : config.radioTemplate) + "</div>");

        if (config.input !== undefined) this.$input.val(config.input);

        this.parseInitValue();
    }

    SelectPicker.prototype.updateInputValue = function (values, titles,types) {
        var v, t,type;
        if (this.config.multi) {
            v = values.join(this.config.split);
            t = titles.join(this.config.split);
            type=types.join(this.config.split);
        } else {
            v = values[0];
            t = titles[0];
            type=types[0];
        }

        this.$input.val(t).data("values", v);
        this.$input.attr("value", t).attr("data-values", v);

        var data = {
            values: v,
            titles: t,
            types:type
        };
        this.$input.trigger("change", data);
        this.config.onChange && this.config.onChange.call(this, data);
    }

    SelectPicker.prototype.parseInitValue = function () {
        var value = this.$input.val();
        var items = this.config.items;
        if (value === undefined || value == null || value === "") return;

        var titles = this.config.multi ? value.split(this.config.split) : [value];
        for (var i = 0; i < items.length; i++) {
            items[i].checked = false;
            for (var j = 0; j < titles.length; j++) {
                if (items[i].title === titles[j]) {
                    items[i].checked = true;
                }
            }
        }
    }


//更新数据
    SelectPicker.prototype.update = function (config) {
        this.config = $.extend({}, this.config, config);
        this.initConfig();
        if (this._open) {
            $.updatePicker(this.getHTML());
        }
    }

    SelectPicker.prototype.open = function (values, titles) {

        if (this._open) return;

        this.parseInitValue();

        var config = this.config;

        var dialog = this.dialog = $.openPicker(this.getHTML(), $.proxy(this.onClose, this));

        var self = this;

        dialog.on("change", function (e) {
            var checked = dialog.find("input:checked");
            var values = checked.map(function () {
                return $(this).val();
            });
            var titles = checked.map(function () {
                return $(this).data("title");
            });

            var types=checked.map(function () {
                return $(this).data("type");
            });

            self.updateInputValue(values, titles,types);

            if (config.autoClose && !config.multi) $.closePicker();
        });

        dialog.on("click", '.weui_cell:not(.select_type_normal)',function (e) {
            var checked = $(this).find("input");
            var values = checked.map(function () {
                return $(this).val();
            });
            var titles = checked.map(function () {
                return $(this).data("title");
            });

            var types=checked.map(function () {
                return $(this).data("type");
            });

            self.updateInputValue(values, titles,types);
            if (config.autoClose && !config.multi) $.closePicker();
        });
        this._open = true;
        if (config.onOpen) config.onOpen(this);
    }
    SelectPicker.prototype.close = function (callback) {
        var self = this;
        $.closePicker(function () {
            self.onClose();
            callback && callback();
        });
    }

    SelectPicker.prototype.onClose = function () {
        this._open = false;
        if (this.config.onClose) this.config.onClose(this);
    }

    SelectPicker.prototype.getHTML = function (callback) {
        var config = this.config;
        return this.tpl({
            items: config.items,
            title: config.title,
            closeText: config.closeText
        })
    }


    $.fn.selectPicker = function (params, args) {

        return this.each(function () {
            var $this = $(this);
            if (!$this.data("weui-select")) $this.data("weui-select", new SelectPicker(this, params));

            var select = $this.data("weui-select");

            if (typeof params === typeof "a") select[params].call(select, args);

            return select;
        });
    }

    defaults = $.fn.selectPicker.prototype.defaults = {
        items: [],
        input: undefined, //输入框的初始值
        title: "请选择",
        multi: false,
        closeText: "关闭",
        autoClose: true, //是否选择完成后自动关闭，只有单选模式下才有效
        onChange: undefined, //function
        onClose: undefined, //function
        onOpen: undefined, //function
        split: ",",  //多选模式下的分隔符
        toolbarTemplate: '<div class="toolbar">\
      <div class="toolbar-inner">\
      <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>\
      <h1 class="title">{{title}}</h1>\
      </div>\
      </div>',
        radioTemplate: '<div class="weui_cells weui_cells_radio">\
        {{#items}}\
        <label class="weui_cell weui_check_label select_type_{{this.type}}" for="weui-select-id-{{this.title}}">\
          <div class="weui_cell_bd weui_cell_primary">\
            <p>{{this.title}}</p>\
          </div>\
          <div class="weui_cell_ft">\
            <input type="{{this.input}}" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-type="{{this.type}}" data-title="{{this.title}}">\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
        checkboxTemplate: '<div class="weui_cells weui_cells_checkbox select_type_{{this.type}}">\
        {{#items}}\
        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">\
          <div class="weui_cell_bd weui_cell_primary">\
            <p>{{this.title}}</p>\
          </div>\
          <div class="weui_cell_ft">\
            <input type="{{this.input}}" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-type="{{this.type}}" data-title="{{this.title}}" >\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
    }

}($);
