/*======================================================
************   Picker   ************
======================================================*/
/* global $:true */

+ function($) {
  "use strict";


  //Popup 和 picker 之类的不要共用一个弹出方法，因为这样会导致 在 popup 中再弹出 picker 的时候会有问题。

  $.openPopup = function(popup, className) {

    $.closePopup();

    popup = $(popup);

    popup.addClass("weui-popup-container-visible");

    var modal = popup.find(".weui-popup-modal");

    modal.width();

    modal.addClass("weui-popup-modal-visible");

  }


  $.closePopup = function(container, remove) {
    $(".weui-popup-modal-visible").removeClass("weui-popup-modal-visible").transitionEnd(function() {
      $(this).parent().removeClass("weui-popup-container-visible");
      remove && $(this).parent().remove();
    }).trigger("close");
  };


  $(document).on("click", ".close-popup", function() {
    $.closePopup();
  });

  $(document).on("click", ".open-popup", function() {
    $($(this).data("target")).popup();
  });

  $.fn.popup = function() {
    return this.each(function() {
      $.openPopup(this);
    });
  };

}($);
