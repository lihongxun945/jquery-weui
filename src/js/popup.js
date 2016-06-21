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
    modal.transitionEnd(function() {
      modal.trigger("open");
    });
    modal.addClass("weui-popup-modal-visible");
  }


  $.closePopup = function(container, remove) {
    $(".weui-popup-modal-visible").removeClass("weui-popup-modal-visible").transitionEnd(function() {
      var $this = $(this);
      $this.parent().removeClass("weui-popup-container-visible");
      $this.trigger("close");
      remove && $this.parent().remove();
    })
  };


  $(document).on("click", ".close-popup", function() {
    $.closePopup();
  })
  .on("click", ".open-popup", function() {
    $($(this).data("target")).popup();
  })
  .on("click", ".weui-popup-container", function(e) {
    if($(e.target).hasClass("weui-popup-container")) $.closePopup();
  })

  $.fn.popup = function() {
    return this.each(function() {
      $.openPopup(this);
    });
  };

}($);
