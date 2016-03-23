/* ===============================================================================
************ Swiper ************
=============================================================================== */
/* global $:true */

+function ($) {
  "use strict";

  var defaults;

  $.fn.swiper = function(params) {
    return this.each(function() {
      if(!this) return;
      return new Swiper(this, $.extend({}, defaults, params)); 
    });
  }

  defaults = $.fn.swiper.prototype.defaults = {
    pagination: ".swiper-pagination"
  };

}($);
