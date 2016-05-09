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

    var p = $.extend({}, this.getConfig());
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

        value: [today.getFullYear(), this.formatNumber(today.getMonth()+1), this.formatNumber(today.getDate()), this.formatNumber(today.getHours()), this.formatNumber(today.getMinutes())],

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
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }
          if(params.max) {
            var max = self.arrayToDate(self.stringToArray(typeof params.max === "function" ? params.max() : params.max));
            if(current > +max) {
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }

          valid && (lastValidValues = values);
        },

        formatValue: function (p, values, displayValues) {
          return self.formatValue(values, displayValues);
        },

        cols: [
          // Years
          {
            values: self.initYears
          },
          // Months
          {
            values: self.initMonthes
          },
          // Days
          {
            values: self.getDays()
          },

          // Space divider
          {
            divider: true,
            content: '  '
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
            content: ':'
          },
          // Minutes
          {
            values: (function () {
              var arr = [];
              for (var i = 0; i <= 59; i++) { arr.push(self.formatNumber(i)); }
              return arr;
            })(),
          }
        ]
      };

      var inputValue = this.input.val();
      if(inputValue) config.value = this.stringToArray(inputValue);

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
    min: undefined,
    max: undefined
  }

}($);
