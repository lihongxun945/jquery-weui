/* global $:true */
+function ($) {
  "use strict";

  var ITEM_ON = "weui_bar_item_on";

  var showTab = function(a) {
    var $a = $(a);
    if($a.hasClass(ITEM_ON)) return;
    var href = $a.attr("href");

    if(!/^#/.test(href)) return ;

    var id = href.slice(1);

    $a.parent().find("."+ITEM_ON).removeClass(ITEM_ON);
    $a.addClass(ITEM_ON);

    var bd = $a.parents(".weui_tab").find(".weui_tab_bd");

    bd.find(".weui_tab_bd_item").removeClass("weui_tab_bd_active");

    $(id).addClass("weui_tab_bd_active");
  }

  $.showTab = showTab;

  $(document).on("click", ".weui_tabbar_item", function(e) {
    showTab(e.target);
  });

}($);

