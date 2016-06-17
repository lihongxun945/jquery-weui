/* global $:true */
+ function($) {

  var defaults;

  var Photos = function(config) {
    this.initConfig(config);
    this.index = 0;
  }


  Photos.prototype = {
    initConfig: function (config) {
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
    },

    open: function () {
      if(this._open) return false;
      if(!this.modal) {
        this.modal = $(this.tpl(this.config)).appendTo(document.body);
        this.container = this.modal.find(".swiper-container");
        this.wrapper = this.modal.find(".swiper-wrapper");

        var hammer = new Hammer(this.container[0]);
        hammer.get('pinch').set({ enable: true });

        hammer.on("pinchstart", $.proxy(this.onGestureStart, this));
        hammer.on("pinchmove", $.proxy(this.onGestureChange, this));
        hammer.on("pinchend", $.proxy(this.onGestureEnd, this));
        this.modal.on($.touchEvents.start, $.proxy(this.onTouchStart, this));
        this.modal.on($.touchEvents.move, $.proxy(this.onTouchMove, this));
        this.modal.on($.touchEvents.end, $.proxy(this.onTouchEnd, this));

        this.modal.click($.proxy(this.close, this));

        //init index
        this.wrapper.transition(0);
        this.wrapper.transform('translate3d(-' + $(window).width()*this.config.initIndex + 'px,0,0)');
        this.container.find('.caption-item').eq(this.config.initIndex).addClass('active');
        this.container.find('.swiper-pagination-bullet').eq(this.config.initIndex).addClass('swiper-pagination-bullet-active');
      }

      var self = this;
      this.modal.show().height();
      this.modal.addClass("weui-photo-browser-modal-visible");
      this.container.addClass("swiper-container-visible").transitionEnd(function() {
        self.initParams();
      });

      this._open = true;

    },

    close: function() {
      this.container.transitionEnd($.proxy(function() {
        this.modal.hide();
        this._open = false;
        if(this.config.onClose) this.config.onClose.call(this);
      }, this));
      this.container.removeClass("swiper-container-visible");
      this.modal.removeClass("weui-photo-browser-modal-visible");
    },

    initParams: function () {
      if(this.containerHeight) return false;

      this.windowWidth = $(window).width();
      this.containerHeight = this.container.height();
      this.containerWidth = this.container.width();

      this.touchStart = {};

      this.wrapperTransform = 0;
      this.wrapperLastTransform = - $(window).width()*this.config.initIndex;
      this.wrapperDiff = 0;
      this.activeIndex = this.config.initIndex;
    },

    onTouchStart: function (e) {
      this.touching = true;
      this.touchStart = $.getTouchPosition(e);
      this.touchStartTime = + new Date;
      this.wrapperDiff = 0;
    },

    onTouchMove: function (e) {
      var p = $.getTouchPosition(e);
      this.wrapperDiff = p.x - this.touchStart.x;
      if(this.activeIndex === 0 && this.wrapperDiff > 0) this.wrapperDiff = Math.pow(this.wrapperDiff, .8);
      if(this.activeIndex === this.config.items.length - 1 && this.wrapperDiff < 0) this.wrapperDiff = - Math.pow(-this.wrapperDiff, .8);
      this.wrapperTransform = this.wrapperLastTransform + this.wrapperDiff;
      this.doWrapperTransform();
    },

    onTouchEnd: function (e) {
      this.touching = false;
      var duration = (+ new Date) - this.touchStartTime;
      if(this.wrapperDiff > 0) {
        if(this.wrapperDiff > this.containerWidth/2 || (this.wrapperDiff > 20 && duration < 300)) {
          this.slidePrev();
        } else {
          this.slideTo(this.activeIndex);
        }
      } else {
        if(- this.wrapperDiff > this.containerWidth/2 || (-this.wrapperDiff > 20 && duration < 300)) {
          this.slideNext();
        } else {
          this.slideTo(this.activeIndex);
        }
      }
    },

    onGestureStart: function (e) {
    },

    onGestureChange: function (e) {
    },

    onGestureEnd: function (e) {
    },

    doWrapperTransform: function(duration, callback) {
      this.wrapper.transition(duration || 0);
      this.wrapper.transitionEnd(function() {
        callback && callback();
      })
      .transform('translate3d(' + this.wrapperTransform + 'px, 0, 0)');
    },

    slideTo: function(index, duration) {
      if(index < 0) index = 0;
      if(index > this.config.items.length-1) index = this.config.items.length - 1;
      this.activeIndex = index;
      this.wrapperTransform = - (index * this.containerWidth);
      this.wrapperLastTransform = this.wrapperTransform;
      this.doWrapperTransform(duration || 200, $.proxy(function() {
        this.container.find('.caption-item.active').removeClass('active');
        this.container.find('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
        this.container.find('.caption-item').eq(this.activeIndex).addClass('active');
        this.container.find('.swiper-pagination-bullet').eq(this.activeIndex).addClass('swiper-pagination-bullet-active');
      }, this));
    },
    slideNext: function() {
      return this.slideTo(this.activeIndex+1);
    },
    slidePrev: function() {
      return this.slideTo(this.activeIndex-1);
    }
  }

  defaults = Photos.prototype.defaults = {
    items: [],
    autoOpen: false, //初始化完成之后立刻打开
    onOpen: undefined,
    onClose: undefined,
    initIndex: 0, //打开时默认显示第几张
    scale: true,
    maxScale: 3,
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
              <div class="swiper-pagination swiper-pagination-bullets">\
                {{#items}}\
                <span class="swiper-pagination-bullet"></span>\
                {{/items}}\
              </div>\
            </div>\
          </div>'
  }

  $.photoBrowser = function(params) {
    return new Photos(params);
  }
}($);
