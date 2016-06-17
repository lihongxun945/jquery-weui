
+ function($) {
	  "use strict";


	  var defaults;

	  var DatePicker = function(input, params) {
	    this.input = $(input);
	    this.params = params;

	    this.initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

	    this.initYears = (function () {
	      var arr = [];
	      for (var i = 1970; i <= 2050; i++) { arr.push(i); }
	      return arr;
	    })();

	    var p = $.extend({}, this.getConfig());
	    $(this.input).picker(p);
	  }

	  DatePicker.prototype = {
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
	      if(params.isCardExpiryDay)
	      {
	    	  return values[0] + params.dateSplit + values[1] ;
	      }
	      else{
	    	  return values[0] + params.dateSplit + values[1] + params.dateSplit + values[2] ;
	      }
	      
	    },
	    getTodayMin:function(){
	    	var today = new Date();
	    	return today.getFullYear()+"-"+this.formatNumber(today.getMonth()+1)+"-"+this.formatNumber(today.getDate());
	    },
	    stringToArray: function(value) {
	      var params = this.params;
	      var date =value;
	      return [].concat(date.split(params.dateSplit));
	    },
	    arrayToDate: function(arr) {
	      var params = this.params;
	      if(arr.length === 3) return new Date(arr.join(params.dateSplit));
	      var date = new Date(arr.slice(0, 3).join(params.dateSplit));
	      //注意这种格式 "2012-12-12 12:12" 在ios上是错误的，如果用 "2012-12-12T12:12" 是对的，但是这个是标准时区而不是东八区，所以这里分别设置
	      return date;
	    },
	    getConfig : function() {

	      var today = new Date(),
	          params = this.params,
	          self = this,
	          lastValidValues;

	      var value=new Array();
	      var cols=new Array();
	      if(params.isCardExpiryDay){
	    	  value=[this.formatNumber(today.getMonth()+1),today.getFullYear() ];
	    	  cols=[
	    	      // Months
			      {
			          values: self.initMonthes
			      },
			      {
					 divider: true,
					 content: '  '
				  },
	  	          // Years
		          {
		            values: self.initYears
		          }
		        ];
	      }else{
	    	  value=[today.getFullYear(), this.formatNumber(today.getMonth()+1), this.formatNumber(today.getDate())];
	    	  cols=[
	  	          // Years
		          {
		            values: self.initYears
		          },
		          {
			         divider: true,
			         content: '  '
			      },
		          // Months
		          {
		            values: self.initMonthes
		          },
		          {
			         divider: true,
			         content: '  '
			      },
		          // Days
		          {
		            values: self.getDays()
		          }
		        ];
	      }
	      var config = {
	        rotateEffect: false,  //为了性能

	        value: value,

	        onChange: function (picker, values, displayValues) {
	          if(params.isCardExpiryDay)return;
	          var cols = picker.cols;
	          var days = self.getDaysByMonthAndYear(cols[1].value, cols[0].value);
	          var currentValue = picker.cols[2].value;
	          if(currentValue > days.length) currentValue = days.length;
	          picker.cols[2].setValue(currentValue);

	          //check min and max
	          if(params.todayMin){
	        	  params.min=self.getTodayMin();
	          }
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

	        cols: cols
	      };

	      var inputValue = this.input.val();
	      if(inputValue) config.value = this.stringToArray(inputValue);

	      return config;
	    }
	  }

	  $.fn.datePicker = function(params) {
	    params = $.extend({}, defaults, params);
	    return this.each(function() {
	      if(!this) return;
	      var $this = $(this);
	      var datepicker = $this.data("datepicker");
	      if(!datepicker) $this.data("datepicker", new DatePicker(this, params));
	      return datepicker;
	    });
	  };

	  defaults = $.fn.datePicker.prototype.defaults = {
	    dateSplit: "/",
	    isCardExpiryDay:false,
	    todayMin:false,
	    min: undefined,
	    max: undefined
	  }

	}($);
