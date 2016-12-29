/* global $:true */
+ function($) {
  "use strict";

  $(document).on("click touchstart", ".weui-search-bar__label", function(e) {
    $(e.target).parents(".weui-search-bar").addClass("weui-search-bar_focusing").find('input').focus();
  }) 
  /*
  .on("blur", ".weui-search-bar__input", function(e) {
    var $input = $(e.target);
    if(!$input.val()) $input.parents(".weui-search-bar").removeClass("weui-search-bar_focusing");
  })
  */
  .on("click", ".weui-search-bar__cancel-btn", function(e) {
    var $input = $(e.target).parents(".weui-search-bar").removeClass("weui-search-bar_focusing").find(".weui-search-bar__input").val("").blur();
  })
  .on("click", ".weui-icon-clear", function(e) {
    var $input = $(e.target).parents(".weui-search-bar").find(".weui-search-bar__input").val("").focus();
  });

}($);
