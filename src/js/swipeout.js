/* ===============================================================================
************   Swipeout ************
=============================================================================== */
/* global $:true */

+function ($) {
  "use strict";

  var cache = [];
  var TOUCHING = 'swipeout-touching'

  var Swipeout = function(el) {
    this.container = $(el);
    this.mover = this.container.find('>.weui-cell__bd')
    this.attachEvents();
    cache.push(this)
  }

  Swipeout.prototype.touchStart = function(e) {
    var p = $.getTouchPosition(e);
    this.container.addClass(TOUCHING);
    this.start = p;
    this.startX = 0;
    this.startTime = + new Date;
    var transform =  this.mover.css('transform').match(/-?[\d\.]+/g)
    if (transform && transform.length) this.startX = parseInt(transform[4])
    this.diffX = this.diffY = 0;
    this._closeOthers()
    this.limit = this.container.find('>.weui-cell__ft').width() || 68; // 因为有的时候初始化的时候元素是隐藏的（比如在对话框内），所以在touchstart的时候计算宽度而不是初始化的时候
  };

  Swipeout.prototype.touchMove= function(e) {
    if(!this.start) return true;
    var p = $.getTouchPosition(e);
    this.diffX = p.x - this.start.x;
    this.diffY = p.y - this.start.y;
    if (Math.abs(this.diffX) < Math.abs(this.diffY)) { // 说明是上下方向在拖动
      this.close()
      this.start = false
      return true;
    }
    e.preventDefault();
    e.stopPropagation();
    var x = this.diffX + this.startX
    if (x > 0) x = 0;
    if (Math.abs(x) > this.limit) x = - (Math.pow(-(x+this.limit), .7) + this.limit)
    this.mover.css("transform", "translate3d("+x+"px, 0, 0)");
  };
  Swipeout.prototype.touchEnd = function() {
    if (!this.start) return true;
    this.start = false;
    var x = this.diffX + this.startX
    var t = new Date - this.startTime;
    if (this.diffX < -5 && t < 200) { // 向左快速滑动，则打开
      this.open()
    } else if (this.diffX >= 0 && t < 200) { // 向右快速滑动，或者单击,则关闭
      this.close()
    } else if (x > 0 || -x <= this.limit / 2) {
      this.close()
    } else {
      this.open()
    }
  };


  Swipeout.prototype.close = function() {
    this.container.removeClass(TOUCHING);
    this.mover.css("transform", "translate3d(0, 0, 0)");
    this.container.trigger('swipeout-close');
  }

  Swipeout.prototype.open = function() {
    this.container.removeClass(TOUCHING);
    this._closeOthers()
    this.mover.css("transform", "translate3d(" + (-this.limit) + "px, 0, 0)");
    this.container.trigger('swipeout-open');
  }

  Swipeout.prototype.attachEvents = function() {
    var el = this.mover;
    el.on($.touchEvents.start, $.proxy(this.touchStart, this));
    el.on($.touchEvents.move, $.proxy(this.touchMove, this));
    el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
  }
  Swipeout.prototype._closeOthers = function() {
    //close others
    var self = this
    cache.forEach(function (s) {
      if (s !== self) s.close()
    })
  }

  var swipeout = function(el) {
    return new Swipeout(el);
  };

  $.fn.swipeout = function (arg) {
    return this.each(function() {
      var $this = $(this)
      var s = $this.data('swipeout') || swipeout(this);
      $this.data('swipeout', s);

      if (typeof arg === typeof 'a') {
        s[arg]()
      }
    });
  }

  $('.weui-cell_swiped').swipeout() // auto init
}($);
