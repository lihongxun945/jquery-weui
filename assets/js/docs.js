+ function($) {

  "use strict";

  var initSideMenu = function() {
    var win = $(window),
      body = $(document.body),
      menu = $("#side-nav"),
      windowHeight = $(window).height() / 3,
      windowWidth = $(window).width(),
      contentSection = $('.component'),
      topCache = contentSection.map(function () { return $(this).offset().top; }),
      device = $(".device");
    var coder = new QRCode(document.getElementById("qrcode"), {
      width: 200,
      height: 200,
    });
    coder.makeCode(location.origin+device.find("iframe").attr("src"));

    $(document).on("click", "#qrcode-btn", function() {
      $("#qrcode").toggleClass("show");
    });

    device.initialLeft   = device.offset().left;
    device.initialTop    = device.initialTop || device.offset().top;
    device.dockingOffset = ($(window).height() - device.height()) / 2;
    device.dockingOffset = (device.dockingOffset < -100 ? -100 : device.dockingOffset);

    menu.initialLeft   = menu.offset().left;
    menu.initialTop    = menu.initialTop || menu.offset().top;

    var currentActive;

    device.dockingOffset = (win.height() - device.height()) / 2;
    device.dockingOffset = (device.dockingOffset < -100 ? -100 : device.dockingOffset);

    var baseurl = $("[name='baseurl']").attr("value");

    var calculateScroll = function () {
      // if small screen don't worry about this
      if (windowWidth <= 768) {
        return;
      }

      // Save scrollTop value
      var contentSectionItem;
      var currentTop = win.scrollTop();

      // exit if no device
      if (!device.length) {
        return;
      }

      var top;
      if ((device.initialTop - currentTop) <= device.dockingOffset) {
        top = device.dockingOffset;
        device[0].className = 'device device-fixed';
        device.css({ top: top });
      } else {
        device[0].className = 'device';
        device[0].setAttribute('style', '');
      }

      if ((menu.initialTop - currentTop) <= 30) {
        top = 30;
        menu[0].className = 'nav side-nav menu-fixed';
        menu.css({ top: top });
      } else {
        menu[0].className = 'nav side-nav';
        menu[0].setAttribute('style', '');
      }

      function updateContent(content) {
        var $page = $('#window').html(content);
      }

      // Injection of components into device
      for (var l = contentSection.length; l--;) {
        if ((topCache[l] - currentTop) < windowHeight) {
          if (currentActive === l) {
            return;
          }
          currentActive = l;
          body.find('.component.active').removeClass('active');
          contentSectionItem = $(contentSection[l]);
          contentSectionItem.addClass('active');
          var id = contentSectionItem.attr('id');
          menu.find(".active").removeClass("active");
          if (id) {
            device.attr('id', id + 'InDevice');
            menu.find("a[href='#"+id+"']").parents("li").addClass("active");
          } else {
            device.attr('id', '');

            //找到之前最近一个有id的
            var prev = contentSectionItem.prev();
            while(prev[0] && !prev.attr("id")) prev = prev.prev();
            if(prev[0]) {
              menu.find("a[href='#"+prev.attr("id")+"']").parents("li").addClass("active");
            }
          }
          if (!contentSectionItem.hasClass('informational')) {
            if(contentSectionItem.data("url")) {
              var url = baseurl + "/docs-demos/"+contentSectionItem.data("url");
              var $window = $("#window");
              var iframe = $window.find("iframe")[0];
              if(iframe && iframe.src.indexOf(url) !== -1) {
                //已经是了
              } else {
                iframe.src = url;
                coder.makeCode(location.origin+url);
              }
            }
          }
          break;
        }
      } 
    }

    win.on("scroll", calculateScroll);

    calculateScroll();
  };


  // active navbar
  if(/components/.test(location.href)) {
    $(".navbar .link-components").addClass("active");
    initSideMenu();
  }
  else if(/about/.test(location.href)) $(".navbar .link-about").addClass("active");
  else $(".navbar .link-index").addClass("active");
}($);
