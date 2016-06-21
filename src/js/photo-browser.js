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

      var hammer = new Hammer(this.swiperContainer[0]);
      hammer.get('pinch').set({ enable: true });

      hammer.on("pinchstart", $.proxy(this.onGestureStart, this));
      hammer.on("pinchmove", $.proxy(this.onGestureChange, this));
      hammer.on("pinchend", $.proxy(this.onGestureEnd, this));
      this.modal.on($.touchEvents.start, $.proxy(this.onTouchStart, this));
      this.modal.on($.touchEvents.move, $.proxy(this.onTouchMove, this));
      this.modal.on($.touchEvents.end, $.proxy(this.onTouchEnd, this));
    }
    var swiperContainer = this.swiperContainer;
    this.modal.show();
    this.modal.height();
    this.modal.addClass("weui-photo-browser-modal-visible");
    swiperContainer.swiper({
      onSlideChangeEnd: $.proxy(this.onSlideChangeEnd, this),
      initialSlide: this.config.initIndex
    });
    this.swiper = swiperContainer.data("swiper");
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

    swiper.container.find("img").transition(0).transform("translate3d(0,0,0) scale(1)");
    currentScale = 1, translate = "", scale = 1, currentDiff = [0, 0];

    if(this.config.onSlideChange) this.config.onSlideChange.call(this, index);

  }

  var gestureImg, currentScale = 1, translate = "", scale;
  var win;

  PhotoBrowser.prototype.onGestureStart = function(e) {
    win = [$(this.swiperContainer).width(), $(this.swiperContainer).height()];
    this.swiper.detachEvents();
    this.scaling = true;
    gestureImg = this.swiperContainer.find(".swiper-slide-active img");
    gestureImg.transition(0);
  }

  PhotoBrowser.prototype.onGestureChange = function(e) {
    if (!gestureImg || gestureImg.length === 0) return;
    scale = e.scale * currentScale;
    if (scale > this.config.maxScale) {
      scale = this.config.maxScale - 1 + Math.pow((scale - this.config.maxScale + 1), 0.5);
    }
    if (scale < 1) {
      scale = 2 - Math.pow((1 - scale + 1), 0.5);
    }
    gestureImg.transform(translate + ' scale(' + scale + ')');
    console.log(scale);
  }

  PhotoBrowser.prototype.onGestureEnd = function() {
    if(scale > this.config.maxScale) scale = this.config.maxScale;
    if(scale < 1) scale = 1;

    if(scale === 1) {
      this.swiper.attachEvents();
    }

    gestureImg.transition(200);
    gestureImg.transform(translate + ' scale(' + scale + ')');

    currentScale = scale;
    this.scaling = false;

    this.scaled = (scale !== 1);
    this.adjust();
  }

  var start, diffX=0, diffY=0, currentDiff = [0, 0];
  PhotoBrowser.prototype.onTouchStart = function(e) {
    win = [$(this.swiperContainer).width(), $(this.swiperContainer).height()];
    gestureImg = this.swiperContainer.find(".swiper-slide-active img");
    if(this.scaling || !this.scaled) return;
    var p = $.getTouchPosition(e);
    start = p;
    diffX = diffY = 0;
    gestureImg.transition(0);
  }

  PhotoBrowser.prototype.onTouchMove = function(e) {
    if(!start || this.scaling || !this.scaled) return;
    var p = $.getTouchPosition(e);
    _currentTouch = p;
    var p = $.getTouchPosition(e);
    diffX = p.x - start.x;
    diffY = p.y - start.y;

    var x = currentDiff[0] + diffX;
    var y = currentDiff[1] + diffY;

    translate = "translate3d("+ x + "px, " + y + "px, 0)";

    gestureImg.transform(translate + " scale(" + currentScale + ")");

    var rect = gestureImg[0].getBoundingClientRect();

    if(rect.left > 0) {
    } else if(rect.right <= win[0]) {
    }
  }

  PhotoBrowser.prototype.onTouchEnd = function(e) {
    start = false;
    currentDiff = [currentDiff[0] + diffX, currentDiff[1] + diffY];
    this.adjust();
  }

  PhotoBrowser.prototype.adjust = function(e) {
    gestureImg.transition(200);
    if(currentScale === 1) {
      currentDiff = [0, 0, 0];
      translate = "translate3d("+ currentDiff[0] + "px, " + currentDiff[1] + "px, 0)";
      gestureImg.transform(translate + " scale(" + currentScale + ")");
      return;
    }
    var rect = gestureImg[0].getBoundingClientRect();

    //调整左右
    if(rect.left > 0) currentDiff[0] = currentDiff[0] - rect.left;
    else if(rect.right < win[0]) currentDiff[0] = currentDiff[0] + win[0] - rect.right;

    //调整上下
    if(rect.height < win[1]) {  // 如果高度没容器高，则自动居中
      currentDiff[1] = 0;
    } else {  //如果比容器高，那么要保证上下不能有空隙
      if(rect.top > 0) currentDiff[1] = currentDiff[1] - rect.top;
      else if(rect.bottom < win[1]) currentDiff[1] = currentDiff[1] + win[1] - rect.bottom;
    }
    
    translate = "translate3d("+ currentDiff[0] + "px, " + currentDiff[1] + "px, 0)";
    gestureImg.transform(translate + " scale(" + currentScale + ")");
  }

  defaults = PhotoBrowser.prototype.defaults = {
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
              <div class="swiper-pagination"></div>\
            </div>\
          </div>'
  }

  $.photoBrowser = function(params) {
    return new PhotoBrowser(params);
  }

}($);
