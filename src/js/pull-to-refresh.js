/* ===============================================================================
************   Pull to refreh ************
=============================================================================== */
/* global $:true */

+function ($) {
  "use strict";

  var PTR = function(el, opt) {
    if (typeof opt === typeof function () {}) {
      opt = {
        onRefresh: opt
      }
    }
    if (typeof opt === typeof 'a') {
      opt = undefined
    }
    this.opt = $.extend(PTR.defaults, opt || {});
    this.container = $(el);
    this.attachEvents();
  }

  PTR.defaults = {
    distance: 50,
    onRefresh: undefined,
    onPull: undefined
  }

  PTR.prototype.touchStart = function(e) {
    if(this.container.hasClass("refreshing")) return;
    var p = $.getTouchPosition(e);
    this.start = p;
    this.diffX = this.diffY = 0;
  };

  PTR.prototype.touchMove= function(e) {
    if(this.container.hasClass("refreshing")) return;
    if(!this.start) return false;
    if(this.container.scrollTop() > 0) return;
    var p = $.getTouchPosition(e);
    this.diffX = p.x - this.start.x;
    this.diffY = p.y - this.start.y;
    if (Math.abs(this.diffX) > Math.abs(this.diffY)) return true; // 说明是左右方向的拖动
    if(this.diffY < 0) return;
    this.container.addClass("touching");
    e.preventDefault();
    e.stopPropagation();
    this.diffY = Math.pow(this.diffY, 0.75);
    this.container.css("transform", "translate3d(0, "+this.diffY+"px, 0)");
    this.triggerPull(this.diffY)
  };
  PTR.prototype.touchEnd = function() {
    this.start = false;
    if(this.diffY <= 0 || this.container.hasClass("refreshing")) return;
    this.container.removeClass("touching");
    this.container.removeClass("pull-down pull-up");
    this.container.css("transform", "");
    if(Math.abs(this.diffY) <= this.opt.distance) {
    } else {
      this.triggerPullToRefresh();
    }
  };

  PTR.prototype.triggerPullToRefresh = function() {
    this.triggerPull(this.opt.distance)
    this.container.removeClass('pull-up').addClass("refreshing");
    if (this.opt.onRefresh) {
      this.opt.onRefresh.call(this)
    }
    this.container.trigger("pull-to-refresh");
  }

  PTR.prototype.triggerPull = function(diffY) {

    if(diffY < this.opt.distance) {
      this.container.removeClass("pull-up").addClass("pull-down");
    } else {
      this.container.removeClass("pull-down").addClass("pull-up");
    }

    if (this.opt.onPull) {
      this.opt.onPull.call(this, Math.floor(diffY / this.opt.distance * 100))
    }
    this.container.trigger("pull");
  }

  PTR.prototype.pullToRefreshDone = function() {
    this.container.removeClass("refreshing");
  }

  PTR.prototype.attachEvents = function() {
    var el = this.container;
    el.addClass("weui-pull-to-refresh");
    el.on($.touchEvents.start, $.proxy(this.touchStart, this));
    el.on($.touchEvents.move, $.proxy(this.touchMove, this));
    el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
  };

  var pullToRefreshDone = function(el) {
    $(el).removeClass("refreshing");
  }

  $.fn.pullToRefresh = function(opt) {
    return this.each(function() {
      var $this = $(this)
      var ptr = $this.data('ptr')
      if (!ptr) $this.data('ptr', ptr = new PTR(this, opt))
      if (typeof opt === typeof 'a') {
        ptr[opt].call(ptr)
      }
    });
  }

  $.fn.pullToRefreshDone = function() {
    return this.each(function() {
      pullToRefreshDone(this);
    });
  }

}($);
