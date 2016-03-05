/* global $:true */
+ function($) {
  "use strict";

  $(document).on("click", ".weui_search_bar label", function(e) {
    $(e.target).parents(".weui_search_bar").addClass("weui_search_focusing");
  }) 
  .on("blur", ".weui_search_input", function(e) {
    $(e.target).parents(".weui_search_bar").removeClass("weui_search_focusing");
  })

}($);
