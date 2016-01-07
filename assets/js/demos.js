$(function() {
  "use strict";

  $(document).on("click", "#show-actions", function() {
    $.actions({
      actions: [{
        text: "编辑",
        onClick: function() {
          $.alert("你选择了编辑");
        }
      },{
        text: "删除",
        onClick: function() {
          $.alert("你选择了删除");
        }
      }]
    });
  });

  $(document).on("click", "#show-toast", function() {
    $.toast("操作成功");
  });

  $(document).on("click", "#show-alert", function() {
    $.alert("这里是提示文案");
  });

  $(document).on("click", "#show-confirm", function() {
    $.confirm("我是一个Confirm，我有两个按钮");
  });

  $(document).on("click", "#show-custom-modal", function() {
    $.modal({
      title: "Hello",
      text: "我是自定义的modal",
      buttons: [
        { text: "支付宝", onClick: function(){ console.log(1)} },
        { text: "微信支付", onClick: function(){ console.log(2)} },
        { text: "取消", className: "default", onClick: function(){ console.log(3)} },
      ]
    });
  });

  $(document).on("click", "#show-loading", function() {
    $.showLoading();
  });

});
