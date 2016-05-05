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
      var $this = $(this);
      var swiper = $this.data("swiper");
      if(!swiper) $this.data("swiper", new Swiper(this, $.extend({}, defaults, params))); 
      return swiper;
    });
  }

  defaults = $.fn.swiper.prototype.defaults = {
    pagination: ".swiper-pagination"
  };

}($);
