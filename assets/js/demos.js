$(function() {
  "use strict";

  $(document).on("click", "#show-actions", function() {
    $.actions({
      actions: [{
        text: "编辑",
        onClick: function() {
          $.alert("你选择了“编辑”");
        }
      },{
        text: "删除",
        onClick: function() {
          $.alert("你选择了“删除”");
        }
      }]
    });
  });

  $(document).on("click", "#show-toast", function() {
    $.toast("操作成功");
  });

  $(document).on("click", "#show-alert", function() {
    $.alert("这里是提示文案", function() {
      $.alert("你点击了确定按钮");
    });
  });

  $(document).on("click", "#show-confirm", function() {
    $.confirm("我是一个Confirm，我有两个按钮", function() {
      $.alert("你点击了确定按钮");
    }, function() {
      $.alert("你点击了取消按钮");
    });
  });

  $(document).on("click", "#show-custom-modal", function() {
    $.modal({
      title: "Hello",
      text: "我是自定义的modal",
      buttons: [
        { text: "支付宝", onClick: function(){ $.alert("你选择了支付宝"); } },
        { text: "微信支付", onClick: function(){ $.alert("你选择了微信支付"); } },
        { text: "取消", className: "default"},
      ]
    });
  });

  $(document).on("click", "#show-loading", function() {
    $.showLoading();
  });

  //pull to refresh
  if($("#page-ptr")[0]) {
    $("#time").text(new Date);
    $(document.body).pullToRefresh().on("pull-to-refresh", function() {
      setTimeout(function() {
        $("#time").text(new Date);
        $(document.body).pullToRefreshDone(); // 重置下拉刷新
      }, 1500);   //模拟延迟
    });
  }


  //infinite scroll
  if($("#infinite-demo-1")[0]) {
    var loading = false;
    $(document.body).infinite().on("infinite", function() {
      if(loading) return;
      loading = true;
      setTimeout(function() {
        $("#list").append("<p>我是新加载的内容</p><p>我是新加载的内容</p><p>我是新加载的内容</p><p>我是新加载的内容</p><p>我是新加载的内容</p>");
        loading = false;
      }, 1500);   //模拟延迟
    });
  }


  //pull to refresh with navbar
  if($("#page-ptr-navbar")[0]) {
    $("#tab1, #tab2, #tab3").pullToRefresh().on("pull-to-refresh", function() {
      var self = this;
      console.log(self);
      setTimeout(function() {
        $(self).pullToRefreshDone(); // 重置下拉刷新
      }, 2000);   //模拟延迟
    });
  }

  //infinite with navbar
  if($("#page-infinite-navbar")[0]) {
    $("#tab1, #tab2").infinite().on("infinite", function() {
      var self = this;
      if(self.loading) return;
      self.loading = true;
      console.log(self);
      setTimeout(function() {
        $(self).find(".content-padded").append("<p>我是加载的新内容。我是加载的新内容。。。我是加载的新内容。。。我是加载的新内容。。。我是加载的新内容。。。我是加载的新内容。。。我是加载的新内容。。。我是加载的新内容。。。我是加载的新内容。。。。。</p>");
        self.loading = false;
      }, 2000);   //模拟延迟
    });
  }
});
