# v0.1.0

- 修复 `$.hideLoading` 无法隐藏的问题。
- 更新了关闭对话框的逻辑。现在调用 `$.closeModal` 只会关闭已经显示的对话框，不会把未显示出来的对话框也关闭了。
- 去掉了 `.close-modal`类，现在点击对话框的按钮默认就会关闭对话框。
- 增加了 `autoprefixer` 修复 Android 下没有 `webkit-` 前缀导致的兼容性问题。
