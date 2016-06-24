# V0.7.2 - 2016/06/21

- 重写了 `Photos`，增加了手势缩放功能。
- 新组件 `toptip`.
- `Select` 增加了 `min`, `max`, `beforeClose` 三个配置参数，修复了在多选模式下取消全部选择后导致的Bug。
- `ActionSheet` 增加了 `title` 参数，可以设置一个标题。
- `Calendar` 再次修复了会导致 `NAN` 的bug，增加了 `container` 参数可以指定内联到某一个容器。
- `Piker`, `Select` 的 `z-index` 全部设置为 `100`，如果发现有不满足要求的地方可自行修改。
- `City Picker` 中直辖市名称由格式 `北京 北京 东城区` 改为更友好的 `北京 北京市 东城区`


# V0.7.1 - 2016/05/30

- `Toast` 增加了纯文本模式, 增加了关闭回调函数。
- `Popup` 增加了类似picker的非全屏模式。
- `Picker` 增加了 `onChange` 和 `onClose` 参数。
- `Calendar`
  - 修复了在 iOS 上如果没有设置日期会显示 `NAN` 的bug。
  - 修复了 input `value` 属性设置初始值无效的bug。
  - 增加了 `open`,`close`,`destroy` 等方法，可以通过 `$("xx").calendar("method")` 调用。
- `Select` 在 `onChange` 回调中增加了 `origins` 数据，表示未经修改的原始值。
- `Photo Browser` 增加了一个 `initIndex` 参数，可以指定打开时候默认展示第几张图片。
- 修复了使用 Zepto 时 `$.fn.data` 方法存储对象导致的报错。


# V0.7.0 - 2016/05/09

对应的 `weui` 版本更新为 `0.4.2`

- `weui` 版本更新到 `0.4.2`, `weui` 官方的更新日志请参考 [https://github.com/weui/weui/blob/master/CHANGELOG.md](https://github.com/weui/weui/blob/master/CHANGELOG.md).
- 大幅增强 `Select` 组件:
  - 增加了 `update, open, close` 方法，现在可以在初始化之后通过 `$(xx).select("update", config)` 动态修改任何配置。
  - 增加了 `onOpen, onClose` 回调.
- 增加了新组件 `Photo Browser`,暂时还不支持手势缩放.
- `Action Sheet` 增加了 `color-*, bg-*` 可以配置不同的颜色和背景色，增加了 `onClose` 回调函数。
- 修复了 `datetime picker` 在 ios 上设置最大最小值无效的问题。
- 修复了 `popup` 会被 `select` 和 `navbar` 挡住的问题。

# V0.6.1 - 2016/04/20

对应 `weui` 版本为 `0.4.1`

- `weui` 版本更新到 `0.4.1`
- `Select` 组件增加了一个 `change` 事件 和 `onChange` 参数。
- 修复了 `Calendar` 的几个bug:
  - 在宽屏设备上无法弹出的bug。
  - 点击年月会导致页面滚动到顶部的bug。
  - 点击灰色日期可能导致无法滑动以及页面重影的bug。
- 修复了 `Dialog` 在PC等宽屏设备上不居中的bug。
- 增加了JS和CSS的压缩文件，压缩文件以 `.min.js` 和 `.min.css` 结尾命名。

# V0.6.0 - 2016/04/08

对应 `weui` 版本为 `0.4.0`

- 新增组件 `Select`、`Popup`
- 修复了 `Picker` 和 `Canlendar` 在部分安卓手机上无法显示的bug（原因是安卓 4.4 以下不支持 `calc`）。
- 修复了 `City Picker` 中设置初始值之后可能导致的bug。
- `City Picker` 增加了一个 `showDistrict` 配置，可以配置是否选择 `区`。
- 修复了 `Picker` 在 iOS 系统中无法出现弹出动画的bug。
- 现在打开 `Picker` 时会自动关闭上一个打开的 `Picker`
- 修复了使用 `weui.min.css` 时由于 `z-index` 压缩问题导致对话框被遮住的Bug。
- 更新了 `Search Bar` 的逻辑，现在`取消`,`清除`等按钮更符合逻辑。
- 对话框增加了一个 `autoClose` 配置，可以配置点击按钮之后是否自动关闭对话框。
- `Datetime Picker` 中可以设置时间范围了。
- 更新了 demos 中的图标
- 在JS和CSS文件中加入了版本号等说明

# v0.5.1 - 2016/03/24

对应 `weui` 版本为 `0.4.0`

- `Action Sheet` 现在可以点击背景关闭了。
- 更新了 `Picker` 和 `Calendar` 样式，现在和官方样式更加统一了。
- `Calendar` 现在如果没有设置 `value`，则默认显示今天。

# v0.5.0 - 2016/03/23

对应 `weui` 版本为 `v0.4.0`。

- 增加了六个新组件：`Picker`, `Calendar`, `City Picker`, `Datetime Picker`, `Swiper`, `Notification`。
- 增加了一个包含所有组件的 `demos`.
- 对话框中增加了一个 `$.prompt` 功能，可以让用户输入信息。
- 修复了 搜索栏 `zindex` 过大导致无法被 对话框背景遮罩的bug。
- Toast 组件增加了两种新的样式：`取消` 和 `禁止`。
- 注意：新组件使用 `rem`，全局的字体设置可能会对旧的版本有影响，升级的时候请注意字体大小带来的变化。


# v0.4.0 - 2016/03/04

对应 `weui` 的版本为 `v0.4.0`。

- weui 官方增加了四个组件：`navbar`, `tabbar`, `searchbar`, `panel`.
- 更新了下拉刷新组件，现在可以结合 `navbar` 来使用。
- 更新了滚动加载组件，现在可以结合 `navbar` 来使用，可以指定触发加载的距离，并且可以在一个页面内初始化多个。
- 增加了 jquery weui 独有的 20列 `栅格`

# v0.3.1

- 修复了 loading 位置偏左的bug。

# v0.3.0

- 增加了两个新的拓展插件：`下拉刷新` 和 `滚动加载`。

# v0.2.3

- 修复了 action 取消按钮的报错问题

# v0.2.1

- 修复了 loading 不居中的bug

# v0.2.0

- 更新到 2016-01-21 日最新版的weui: 增加了九宫格和文件上传。
- 修复了 `action sheet` 默认的取消按钮点击无法关闭的问题。
- 修复了对话框的bug：在iOS下关闭一个对话框的同时打开另一个对话框，第二个对话框的位置会移动一下。

# v0.1.0

- 修复 `$.hideLoading` 无法隐藏的问题。
- 更新了关闭对话框的逻辑。现在调用 `$.closeModal` 只会关闭已经显示的对话框，不会把未显示出来的对话框也关闭了。
- 去掉了 `.close-modal`类，现在点击对话框的按钮默认就会关闭对话框。
- 增加了 `autoprefixer` 修复 Android 下没有 `webkit-` 前缀导致的兼容性问题。
