/* global $:true */
+ function($) {

  var defaults;

  var PhotoBrowser = function(config) {
    this.initConfig(config);
  }

  PhotoBrowser.prototype.initConfig = function(config) {
    this.config = $.extend({}, defaults, config);

    this.config.items = this.config.items.map(function(d, i) {
      if(typeof d === typeof "a") {
        return {
          image: d,
          caption: ""
        }
      }
      return d;
    });

    this.tpl = $.t7.compile(this.config.tpl);
    if(this.config.autoOpen) this.open();
  }

  PhotoBrowser.prototype.getHTML = function() {
    return this.tpl(this.config);
  }

  PhotoBrowser.prototype.open = function() {
    if(this._open) return false;
    if(!this.modal) {
      this.modal = $(this.getHTML()).appendTo(document.body);
      this.swiper = this.modal.find(".swiper-container");
      this.modal.click($.proxy(function() {
        this.close();
      }, this));
    }
    var swiper = this.swiper;
    this.modal.show();
    this.modal.height();
    this.modal.addClass("weui-photo-browser-modal-visible");
    swiper.transitionEnd($.proxy(function() {
      swiper.swiper({
        onSlideChangeEnd: this.onSlideChangeEnd
      });
      swiper.find(".caption-item-0").show().addClass("active");
    }, this));

    swiper.addClass("swiper-container-visible");
  }

  PhotoBrowser.prototype.close = function() {
    this.swiper.transitionEnd($.proxy(function() {
      this.modal.hide();
      this._open = false;
    }, this));
    this.swiper.removeClass("swiper-container-visible");
    this.modal.removeClass("weui-photo-browser-modal-visible");
  }

  PhotoBrowser.prototype.onSlideChangeEnd = function(swiper) {
    var index = swiper.snapIndex;
    var next = swiper.container.find(".caption-item-"+index);

    var current = swiper.container.find(".caption-item.active").transitionEnd(function() {
      current.hide();
      next.show().addClass('active');
    });

    current.removeClass('active')

    if(!current[0]) {
      next.show().addClass('active');
    }
  }

  defaults = PhotoBrowser.prototype.defaults = {
    items: [],
    autoOpen: false, //初始化完成之后立刻打开
    onOpen: undefined,
    onClose: undefined,
    tpl: '<div class="weui-photo-browser-modal">\
            <div class="swiper-container">\
              <div class="swiper-wrapper">\
                {{#items}}\
                <div class="swiper-slide">\
                  <div class="photo-container">\
                    <img src="{{image}}" />\
                  </div>\
                </div>\
                {{/items}}\
              </div>\
              <div class="caption">\
                {{#items}}\
                <div class="caption-item caption-item-{{@index}}">{{caption}}</div>\
                {{/items}}\
              </div>\
              <div class="swiper-pagination"></div>\
            </div>\
          </div>'
  }

  $.photoBrowser = function(params) {
    return new PhotoBrowser(params);
  }

}($);
