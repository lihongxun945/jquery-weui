/* global $:true */
/* jshint unused:false*/

+ function($) {
  "use strict";


  var defaults;

  var Datetime = function(input, params) {
    this.input = $(input);
    this.params = params;

    this.initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

    this.initYears = (function () {
      var arr = [];
      for (var i = 1950; i <= 2030; i++) { arr.push(i); }
      return arr;
    })();

    var p = $.extend({}, params, this.getConfig());
    $(this.input).picker(p);
  }

  Datetime.prototype = {
    getDays : function(max) {
      var days = [];
      for(var i=1; i<= (max||31);i++) {
        days.push(i < 10 ? "0"+i : i);
      }
      return days;
    },

    getDaysByMonthAndYear : function(month, year) {
      var int_d = new Date(year, parseInt(month)+1-1, 1);
      var d = new Date(int_d - 1);
      return this.getDays(d.getDate());
    },

    formatNumber : function (n) {
      return n < 10 ? "0" + n : n;
    },

    formatValue : function(values, displayValues) {
      var params = this.params;
      return values[0] + params.dateSplit + values[1] + params.dateSplit + values[2] + params.dateTimeSplit + values[3] + params.timeSplit + values[4];
    },
    stringToArray: function(value) {
      var params = this.params;
      var tokens = value.split(params.dateTimeSplit);
      var date = tokens[0],
          time = tokens[1];
      return [].concat(date.split(params.dateSplit), time ? time.split(params.timeSplit) : []);
    },
    arrayToDate: function(arr) {
      var params = this.params;
      if(arr.length === 3) return new Date(arr.join(params.dateSplit));
      var date = new Date(arr.slice(0, 3).join(params.dateSplit));
      //注意这种格式 "2012-12-12 12:12" 在ios上是错误的，如果用 "2012-12-12T12:12" 是对的，但是这个是标准时区而不是东八区，所以这里分别设置
      date.setHours(arr[3]);
      date.setMinutes(arr[4]);
      return date;
    },
    getConfig : function() {

      var today = new Date(),
          params = this.params,
          self = this,
          lastValidValues;

      var config = {
        rotateEffect: false,  //为了性能

        value: [today.getFullYear(), this.formatNumber(today.getMonth()+1), this.formatNumber(today.getDate()), this.formatNumber(today.getHours()), (this.params.minutes ? this.formatNumber(today.getMinutes()) : '00')],

        onChange: function (picker, values, displayValues) {
          var cols = picker.cols;
          var days = self.getDaysByMonthAndYear(cols[1].value, cols[0].value);
          var currentValue = picker.cols[2].value;
          if(currentValue > days.length) currentValue = days.length;
          picker.cols[2].setValue(currentValue);

          //check min and max
          
          var current = self.arrayToDate(values);
          var valid = true;
          if(params.min) {
            var min = self.arrayToDate(self.stringToArray(typeof params.min === "function" ? params.min() : params.min));

            if(current < +min) {
			  if (!lastValidValues) {
                var minDate = [min.getFullYear(), self.formatNumber(min.getMonth() + 1), self.formatNumber(min.getDate()), 
				self.formatNumber(min.getHours()), self.formatNumber(min.getMinutes())];
                lastValidValues = minDate;
              }
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }
          if(params.max) {
            var max = self.arrayToDate(self.stringToArray(typeof params.max === "function" ? params.max() : params.max));
            if(current > +max) {
			  if (!lastValidValues) {
                var maxDate = [max.getFullYear(), self.formatNumber(max.getMonth() + 1), self.formatNumber(max.getDate()), 
				self.formatNumber(max.getHours()), self.formatNumber(max.getMinutes())];
                lastValidValues = maxDate;
              }
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }

          valid && (lastValidValues = values);

          if (self.params.onChange) {
            self.params.onChange.apply(this, arguments);
          }
        },

        formatValue: function (p, values, displayValues) {
          return self.formatValue(values, displayValues);
        },

        cols: [
          // Years
          {
            values: self.initYears
          },
          // Divider
          {
            divider: true,
            content: this.params.dateSplit
          },
          // Months
          {
            values: self.initMonthes
          },
          {
            divider: true,
            content: this.params.dateSplit
          },
          // Days
          {
            values: self.getDays()
          },

          // Space divider
          {
            divider: true,
            content: this.params.dateTimeSplit
          },
          // Hours
          {
            values: (function () {
              var arr = [];
              for (var i = 0; i <= 23; i++) { arr.push(self.formatNumber(i)); }
              return arr;
            })(),
          },
          // Divider
          {
            divider: true,
            content: this.params.timeSplit
          },
          // Minutes
          {
            values: (function () {
              if (!self.params.minutes) {
                return ["00"];
              }
              var arr = [];
              for (var i = 0; i <= 59; i++) { arr.push(self.formatNumber(i)); }
              return arr;
            })(),
          }
        ]
      };

      var inputValue = this.input.val();
      if (inputValue) {
          config.value = this.stringToArray(inputValue);
      }
      else {
          if (params.min) {
              var min = this.arrayToDate(self.stringToArray(typeof params.min === "function" ? params.min() : params.min));
              if (min >= this.arrayToDate(config.value)) {
                  config.value = [min.getFullYear(), this.formatNumber(min.getMonth() + 1), this.formatNumber(min.getDate()), this.formatNumber(min.getHours()), this.formatNumber(min.getMinutes())];
              }
          }
          if (params.max) {
              var max = this.arrayToDate(self.stringToArray(typeof params.max === "function" ? params.max() : params.max));
              if (max <= this.arrayToDate(config.value)) {
                  config.value = [max.getFullYear(), this.formatNumber(max.getMonth() + 1), this.formatNumber(max.getDate()), this.formatNumber(max.getHours()), this.formatNumber(max.getMinutes())];
              }
          }
      }

      return config;
    }
  }

  $.fn.datetimePicker = function(params) {
    params = $.extend({}, defaults, params);
    return this.each(function() {
      if(!this) return;
      var $this = $(this);
      var datetime = $this.data("datetime");
      if(!datetime) $this.data("datetime", new Datetime(this, params));
      return datetime;
    });
  };

  defaults = $.fn.datetimePicker.prototype.defaults = {
    dateSplit: "-",
    timeSplit: ":",
    dateTimeSplit: " ",
    minutes: true,  // 分钟是否可选
    min: undefined,
    max: undefined
  }

}($);
