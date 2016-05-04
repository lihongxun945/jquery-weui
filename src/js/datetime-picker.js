/* global $:true */
/* jshint unused:false*/

+ function($) {
  "use strict";


  var defaults;

  $.fn.datetimePicker = function(params) {
    params = $.extend({}, defaults, params);
    return this.each(function() {


      if(!this) return;

      var today = new Date();

      var getDays = function(max) {
        var days = [];
        for(var i=1; i<= (max||31);i++) {
          days.push(i < 10 ? "0"+i : i);
        }
        return days;
      };

      var getDaysByMonthAndYear = function(month, year) {
        var int_d = new Date(year, parseInt(month)+1-1, 1);
        var d = new Date(int_d - 1);
        return getDays(d.getDate());
      };

      var formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
      };

      var formatValue = function(values, displayValues) {
        return values[0] + params.dateSplit + values[1] + params.dateSplit + values[2] + ' ' + values[3] + params.timeSplit + values[4];
      }

      var initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

      var initYears = (function () {
        var arr = [];
        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
        return arr;
      })();


      var lastValidValues;

      var config = {

        rotateEffect: false,  //为了性能

        value: [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate()), formatNumber(today.getHours()), formatNumber(today.getMinutes())],

        onChange: function (picker, values, displayValues) {
          var cols = picker.cols;
          var days = getDaysByMonthAndYear(cols[1].value, cols[0].value);
          var currentValue = picker.cols[2].value;
          if(currentValue > days.length) currentValue = days.length;
          picker.cols[2].setValue(currentValue);

          //check min and max
          
          var current = + new Date(formatValue(values, displayValues));
          var valid = true;
          if(params.min) {
            var min = + new Date(typeof params.min === "function" ? params.min() : params.min);

            if(current < min) {
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }
          if(params.max) {
            var max = + new Date(typeof params.max === "function" ? params.max(): params.max);

            if(current > max) {
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }

          valid && (lastValidValues = values);
        },

        formatValue: function (p, values, displayValues) {
          return formatValue(values, displayValues);
        },

        cols: [
          // Years
          {
            values: initYears
          },
          // Months
          {
            values: initMonthes
          },
          // Days
          {
            values: getDays()
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
              for (var i = 0; i <= 23; i++) { arr.push(formatNumber(i)); }
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
              for (var i = 0; i <= 59; i++) { arr.push(formatNumber(i)); }
              return arr;
            })(),
          }
        ]
      };


      var inputValue = $(this).val();
      if(params.value === undefined && inputValue !== "") {
        params.value = [].concat(inputValue.split(" ")[0].split(params.dateSplit), inputValue.split(" ")[1].split(params.timeSplit));
      }

      var p = $.extend(config, params);
      $(this).picker(p);
    });
  };

  defaults = $.fn.datetimePicker.prototype.defaults = {
    dateSplit: "-",
    timeSplit: ":",
    min: undefined,
    max: undefined
  }

}($);
