/* global $:true */
+ function($) {
  "use strict";

  $(document).on("click", ".weui_search_bar label", function(e) {
    $(e.target).parents(".weui_search_bar").addClass("weui_search_focusing");
  }) 
  .on("blur", ".weui_search_input", function(e) {
    var $input = $(e.target);
    if(!$input.val()) $input.parents(".weui_search_bar").removeClass("weui_search_focusing");
  })
  .on("click", ".weui_search_cancel", function(e) {
    var $input = $(e.target).parents(".weui_search_bar").removeClass("weui_search_focusing").find(".weui_search_input").val("").blur();
  })
  .on("click", ".weui_icon_clear", function(e) {
    var $input = $(e.target).parents(".weui_search_bar").find(".weui_search_input").val("").focus();
  });

}($);
