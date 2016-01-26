/* ===============================================================================
************   Notification ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";

  var distance = 50;
  var container, start, diffX, diffY;

  var touchStart = function(e) {
    if(container.hasClass("refreshing")) return;
    var p = $.getTouchPosition(e);
    start = p;
    diffX = diffY = 0;
  };
  var touchMove = function(e) {
    if(container.hasClass("refreshing")) return;
    if(!start) return false;
    if(container.scrollTop() > 0) return;
    var p = $.getTouchPosition(e);
    diffX = p.x - start.x;
    diffY = p.y - start.y;
    if(diffY < 0) return;
    container.addClass("touching");
    e.preventDefault();
    e.stopPropagation();
    diffY = Math.pow(diffY, 0.8);
    container.css("transform", "translate3d(0, "+diffY+"px, 0)");

    if(diffY < distance) {
      container.removeClass("pull-up").addClass("pull-down");
    } else {
      container.removeClass("pull-down").addClass("pull-up");
    }
  };
  var touchEnd = function() {
    start = false;
    if(diffY <= 0 || container.hasClass("refreshing")) return;
    container.removeClass("touching");
    container.removeClass("pull-down pull-up");
    container.css("transform", "");
    if(Math.abs(diffY) <= distance) {
    } else {
      container.addClass("refreshing");
      container.trigger("pull-to-refresh");
    }

    
  };

  var attachEvents = function(el) {
    el = $(el);
    el.addClass("weui-pull-to-refresh");
    container = el;
    el.on($.touchEvents.start, touchStart);
    el.on($.touchEvents.move, touchMove);
    el.on($.touchEvents.end, touchEnd);
  };

  var pullToRefresh = function(el) {
    attachEvents(el);
  };

  var pullToRefreshDone = function(el) {
    $(el).removeClass("refreshing");
  }

  $.fn.pullToRefresh = function() {
    return this.each(function() {
      pullToRefresh(this);
    });
  }

  $.fn.pullToRefreshDone = function() {
    return this.each(function() {
      pullToRefreshDone(this);
    });
  }

}($);
