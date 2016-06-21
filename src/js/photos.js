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
      this.activeIndex = this.lastActiveIndex = this.config.initIndex;

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
        if(self.config.onOpen) {
          self.config.onOpen.call(self);
        }
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

      this.lastScale = 1;
      this.currentScale = 1;

      this.imageLastTransform = { x: 0, y: 0 };
      this.imageTransform = { x: 0, y: 0 };
      this.imageDiff = { x: 0, y: 0 };
      this.imageLastDiff = { x: 0, y: 0 };
    },

    onTouchStart: function (e) {
      if(this.scaling) return false;
      this.touching = true;
      this.touchStart = $.getTouchPosition(e);
      this.touchStartTime = + new Date;
      this.wrapperDiff = 0;
      this.breakpointPosition = null;
    },

    onTouchMove: function (e) {
      if(!this.touching || this.scaling) return false;

      e.preventDefault();

      if(this.gestureImage) {
        var rect = this.gestureImage[0].getBoundingClientRect();
        if (rect.left >= 0 || rect.right <= this.windowWidth) {
          this.overflow = true;
        } else {
          this.overflow = false;
        }
      } else {
        this.oveflow = false;
      }
      var p = $.getTouchPosition(e);
      if(this.currentScale === 1 || this.overflow) {
        if(this.breakpointPosition) {
          this.wrapperDiff = p.x - this.breakpointPosition.x;
        } else {
          this.wrapperDiff = p.x - this.touchStart.x;
        }
        if(this.activeIndex === 0 && this.wrapperDiff > 0) this.wrapperDiff = Math.pow(this.wrapperDiff, .8);
        if(this.activeIndex === this.config.items.length - 1 && this.wrapperDiff < 0) this.wrapperDiff = - Math.pow(-this.wrapperDiff, .8);
        this.wrapperTransform = this.wrapperLastTransform + this.wrapperDiff;
        this.doWrapperTransform();
      } else {
        var img = this.gestureImage;
        this.imageDiff = {
          x: p.x - this.touchStart.x,
          y: p.y - this.touchStart.y
        }

        this.imageTransform = {
          x: this.imageDiff.x + this.imageLastTransform.x,
          y: this.imageDiff.y + this.imageLastTransform.y
        };
        this.doImageTransform();

        this.breakpointPosition = p;

        this.imageLastDiff = this.imageDiff;
      }
    },

    onTouchEnd: function (e) {
      if(!this.touching) return false;
      this.touching = false;
      if(this.scaling) return false;
      var duration = (+ new Date) - this.touchStartTime;

      if(duration < 300 && Math.abs(this.wrapperDiff) <= 2) {
        this.close();
        return;
      }
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

      this.imageLastTransform = this.imageTransform;

      this.adjust();
    },

    onGestureStart: function (e) {
      this.scaling = true;
      this.gestureImage = this.container.find('.swiper-slide').eq(this.activeIndex).find('img');
    },

    onGestureChange: function (e) {
      var s = this.lastScale * e.scale;
      if (s > this.config.maxScale) {
        s = this.config.maxScale + Math.pow((s - this.config.maxScale), 0.5);
      } else if (s < 1) {
        s = Math.pow(s, .5);
      }
      this.currentScale = s;
      this.doImageTransform();
    },

    onGestureEnd: function (e) {
      if (this.currentScale > this.config.maxScale) {
        this.currentScale = this.config.maxScale;
        this.doImageTransform(200);
      } else if (this.currentScale < 1) {
        this.currentScale = 1;
        this.doImageTransform(200);
      }
      this.lastScale = this.currentScale;
      this.scaling = false;
      this.adjust();
    },

    doWrapperTransform: function(duration, callback) {
      this.wrapper.transitionEnd(function() {
        callback && callback();
      });
      this.wrapper.transition(duration || 0).transform('translate3d(' + this.wrapperTransform + 'px, 0, 0)');
    },

    doImageTransform: function(duration, callback) {
      if(!this.gestureImage) return;
      this.gestureImage.transition(duration || 0).transform('translate3d(' + this.imageTransform.x + 'px,' + this.imageTransform.y + 'px, 0) scale(' + this.currentScale + ')');
      this._needAdjust = true;
    },

    adjust: function() {
      if(!this._needAdjust) return false;
      var img = this.gestureImage;
      if(!img) return false;
      if(this.currentScale === 1) {
        this.imageTransform = this.imageLastDiff =  {x:0,y:0};
        this.doImageTransform(200);
        return;
      }

      var rect = img[0].getBoundingClientRect();

      //调整上下
      if(rect.height < this.containerHeight) {  // 如果高度没容器高，则自动居中
        this.imageTransform.y = this.imageLastTransform.y = 0;
      } else {  //如果比容器高，那么要保证上下不能有空隙
        if(rect.top > 0) this.imageTransform.y = this.imageTransform.y - rect.top;
        else if(rect.bottom < this.containerHeight) this.imageTransform.y = this.imageTransform.y + this.containerHeight - rect.bottom;
      }

      this.doImageTransform(200);
      this._needAdjust = false; // must at last line, because doImageTransform will set this._needAdjust true
    },

    slideTo: function(index, duration) {
      if(index < 0) index = 0;
      if(index > this.config.items.length-1) index = this.config.items.length - 1;
      this.lastActiveIndex = this.activeIndex;
      this.activeIndex = index;
      this.wrapperTransform = - (index * this.containerWidth);
      this.wrapperLastTransform = this.wrapperTransform;
      this.doWrapperTransform(duration || 200, $.proxy(function() {
        if(this.lastActiveIndex === this.activeIndex) return false; // active index not change
        this.container.find('.caption-item.active').removeClass('active');
        this.container.find('.swiper-slide-active').removeClass('swiper-slide-active');
        this.container.find('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
        this.container.find('.caption-item').eq(this.activeIndex).addClass('active');
        this.container.find('.swiper-slide').eq(this.activeIndex).addClass('swiper-slide-active');
        this.container.find('.swiper-pagination-bullet').eq(this.activeIndex).addClass('swiper-pagination-bullet-active');

        //reset image transform
        this.container.find('.swiper-slide img[style]').transition(0).transform('translate3d(0,0,0) scale(1)');

        this.lastScale = 1;
        this.currentScale = 1;

        this.imageLastTransform = { x: 0, y: 0 };
        this.imageTransform = { x: 0, y: 0 };
        this.imageDiff = { x: 0, y: 0 };
        this.imageLastDiff = { x: 0, y: 0 };

        if(this.config.onSlideChange) {
          this.config.onSlideChange.call(this, this.activeIndex);
        }

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
    maxScale: 3,
    onSlideChange: undefined,
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
