/* ===============================================================================
************   Infinite ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";


  var Infinite = function(el, distance) {
    this.container = $(el);
    this.container.data("infinite", this);
    this.distance = distance || 50;
    this.attachEvents();
  }

  Infinite.prototype.scroll = function() {
    var container = this.container;
    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
    if(offset <= this.distance) {
      container.trigger("infinite");
    }
  }

  Infinite.prototype.attachEvents = function(off) {
    var el = this.container;
    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
    scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
  };
  Infinite.prototype.detachEvents = function(off) {
    this.attachEvents(true);
  }

  var infinite = function(el) {
    attachEvents(el);
  }

  $.fn.infinite = function(distance) {
    return this.each(function() {
      new Infinite(this, distance);
    });
  }
  $.fn.destroyInfinite = function() {
    return this.each(function() {
      var infinite = $(this).data("infinite");
      if(infinite && infinite.detachEvents) infinite.detachEvents();
    });
  }

}($);
