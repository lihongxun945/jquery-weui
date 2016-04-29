+(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    var defaults;

    //判断横屏竖屏
    function checkDirect() {
        if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
            return "portrait";
        } else {
            return "landscape";
        }
    }

    //显示屏幕方向提示浮层
    function orientNotice() {
        var orient = checkDirect();
        if (orient == "portrait") {
            orientLayer.style.display = "none";
        } else {
            orientLayer.style.display = "block";
        }
    }

    function init() {
        orientNotice();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
            setTimeout(orientNotice, 200);
        })
    }

    /**
     * 竖屏提示,提升用户体验
     */
    $.orient_tip = function () {
        var tpl = '<div id="orientLayer" class="weui-mod-orient-layer">' +
            '<div class="weui-mod-orient-layer__content">' +
            '<i class="icon weui-mod-orient-layer__icon-orient"></i>' +
            '<div class="weui-mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>' +
            '</div>' +
            '</div>';

        $(tpl).appendTo(document.body);
        
        var orientLayer = document.getElementById("orientLayer");

        init();
    };

}));