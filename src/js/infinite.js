/* ===============================================================================
************   Notification ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";

  var distance = 50;
  var container;

  var scroll = function() {
    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
    if(offset <= distance) {
      container.trigger("infinite");
    }
  }

  var attachEvents = function(el, off) {
    el = $(el);
    container = el;
    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
    scrollContainer[off ? "off" : "on"]("scroll", scroll);
  };

  var infinite = function(el) {
    attachEvents(el);
  }

  $.fn.infinite = function() {
    return this.each(function() {
      infinite(this);
    });
  }
  $.fn.destroyInfinite = function() {
    return this.each(function() {
      attachEvents(this, true);
    });
  }

}($);
