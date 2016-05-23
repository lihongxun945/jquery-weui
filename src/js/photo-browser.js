/* global $:true */
+ function($) {

  var defaults;

  var PhotoBrowser = function(config) {
    this.initConfig(config);
    this.index = 0;
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
      this.swiperContainer = this.modal.find(".swiper-container");
      this.modal.click($.proxy(function() {
        this.close();
      }, this));
    }
    var swiperContainer = this.swiperContainer;
    this.modal.show();
    this.modal.height();
    this.modal.addClass("weui-photo-browser-modal-visible");
    swiperContainer.swiper({
      onSlideChangeEnd: $.proxy(this.onSlideChangeEnd, this),
      initialSlide: this.config.initIndex
    });
    this.onSlideChangeEnd(swiperContainer.data("swiper"));

    swiperContainer.addClass("swiper-container-visible");

    this._open = true;

    if(this.config.onOpen) this.config.onOpen.call(this);
  }

  PhotoBrowser.prototype.close = function() {
    this.swiperContainer.transitionEnd($.proxy(function() {
      this.modal.hide();
      this._open = false;
      if(this.config.onClose) this.config.onClose.call(this);
    }, this));
    this.swiperContainer.removeClass("swiper-container-visible");
    this.modal.removeClass("weui-photo-browser-modal-visible");
  }

  PhotoBrowser.prototype.onSlideChangeEnd = function(swiper) {
    var index = this.index = swiper.snapIndex;
    var next = swiper.container.find(".caption-item-"+index);

    if(next.hasClass("active")) return;

    var current = swiper.container.find(".caption-item.active").transitionEnd(function() {
      current.hide();
      next.show().addClass('active');
    });

    current.removeClass('active')

    if(!current[0]) {
      next.show().addClass('active');
    }

    if(this.config.onSlideChange) this.config.onSlideChange.call(this, index);

  }

  defaults = PhotoBrowser.prototype.defaults = {
    items: [],
    autoOpen: false, //初始化完成之后立刻打开
    onOpen: undefined,
    onClose: undefined,
    initIndex: 0, //打开时默认显示第几张
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
