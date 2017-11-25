# v1.2.0 - 2017/11/25

- 增加了一个计数器组件。
- 增加了官方模板，目前包括一个购物车和一个聊天首页。 

# v1.1.2 - 2017/11/20

这个版本主要是bug修复和功能增强：

- #427 popup overlay 类名拼写错误
- #429 日期时间选择器现在可以自定义可选的 years 和 monthes
- #459 select 组件在多选模式有默认值情况下的bug
- #384 对话框有时候会从右下角闪一下的bug
- 下拉刷新现在有更丰富的配置项，包括在下拉过程中的回调
- #463 现在可以通过JS触发下拉刷新
- #442 infinite 在chrome上无法触发的问题
- #398 修复了iOS上由于不支持 `-` 作为日期分隔符导致的bug

# v1.1.1 - 2017/11/11

修复bug：

- swipeout 通过API打开不会关闭其他的bug
- swipeout 和下拉刷新冲突的bug

# v1.1.0 - 2017/11/10

对应 微信官方 weui 版本为 `v1.1.2`

新增功能：
- 在列表中增加了滑动删除功能

修复bug:
- 无

[weui.css v1.1.2 的更新请点这里](https://github.com/weui/weui/blob/master/CHANGELOG.md)

# v1.0.1 - 2017/02/18

对应 weui 版本为 `v1.1.1`

修复bug：

- #362 日历多选模式下无法取消今天
- #361 weui.css 内容错误
- #356 直接点其他input而不是点关闭按钮，下一次会无法打开
- #351 slider 会导致页面无法上下滚动
- #328 修复了 picker 销毁后无法重新初始化的bug

更新功能：

- toast 现在第二个参数可以是一个时间

[weui.css v1.1.1 的更新请点这里](https://github.com/weui/weui/blob/master/CHANGELOG.md)

# v1.0.0 - 2017/01/08

对应 weui 版本为 v1.1.0

- 修复了 dialog 在宽屏上不居中的bug
- 修复了 select onClose 会调用两次的bug

祝大家新年快乐 :smile:

# V1.0.0-rc.1 - 2016/12/29

对应weui版本为 v1.1.0

- slider 拖动更加顺畅
- 修复了 toast 纯文本模式的bug
- 更新了 navbar tabbar 自动切换的bug

# V1.0.0-rc.0 - 2016/12/28
对应 weui 版本为 v1.1.0

*注意，因为 weui 更新了命名规则，所以 v1.0.0 开始，不兼容 v0.8.3 以及更低的版本*
建议老项目如果没有特别需要，不要盲目升级到 v1.0.0, V0.8.3 代码和文档都不会删除，请放心使用。 新项目请尽量使用 v1.0.0 版本

- 更新到 weui v1.1.0, 增加了大量新组建，命名方式全部采用 [BEM](http://getbem.com/), weui 的更新日志请参阅 `https://github.com/weui/weui/blob/master/CHANGELOG.md`
- jqweui 拓展组件部分采用 BEM 命名规范

对于仍然使用旧版的用户，旧版文档地址: http://old.jqweui.com/

# V0.8.3 - 2016/12/26

- 修复了 [时间日期](http://jqweui.com/extends#datetime-picker) 选择器中缺少 59 秒的bug
- 修复了 [地址选择器](http://jqweui.com/extends#city-picker) 在选择 `东莞` 和 `中山市` 的时候出现的JS错误。
- 修复了标签页和Select的遮挡问题。

# V0.8.2 - 2016/08/26

*修复了地址选择器 `onChange` 事件的一个重要bug，这个bug会导致 `onChange` 的参数出现错误，请 `v0.8.1` 的用户尽快升级到 `v0.8.2`*

# V0.8.1 - 2016/08/16

- 修复了引用 [fastclick](https://github.com/ftlabs/fastclick) 会导致个别组件的bug，并在官方demo中加入了fastclick作为参考。但是请注意 `fastclick` 需要自己引入并初始化，默认是没有的。
- `Calendar` 更新：
  - 修复了 `calendar` 内联模式下调用 JS 方法会导致的报错。
  - 现在 `calendar` 可以多选了
  - `onChange` 函数的参数变得更加规范
  - 现在点击已选中的日期也会关闭弹窗
- 修复了 `datetime` 中对月份大小判断失效的问题
- 优化了 `图片浏览器` 在 `open(index)` 时的效果

### 不兼容的更新 - 重要!

`V0.8.1` 中有一些组件更新之后API发生了变化，因此这些组件不兼容以前的版本，如果你使用下面列出的组件，请仔细阅读新的文档。

不兼容以前版本的组件更新如下：

- `日期时间` 组件现在可以更灵活的配置自定义的时间，具体请参阅文档（配置选项发生变化而不兼容以前版本）
- `地址选择器` 现在可以同时获取选中地址的编码（省市区的名字有变化导致和以前的数据无法匹配），编码数据来源于 [国家统计局](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201401/t20140116_501070.html)
- `地址选择器` 现在支持绝大部分的 `picker` 配置

*为什么会有不兼容的更新?*
因为个别组件在设计之初，API的设计没有考虑到以后的拓展性，或者组件本身由于增加了更重要的功能会与之前的API产生冲突，所以就有了不兼容的更新。
比如时间选择器设计之初并没有考虑到有可能会配置成 `上午下午` 这样非常定制的需求，所以更新的时候就需要变动API。
我会尽力做到每次更新都兼容以前版本，然而并不会为了兼容就牺牲掉组件的功能更新，希望大家理解。

# V0.8.0 - 2016/07/22

- `weui` 版本更新为 `v0.4.3`
- 增加了npm提供的CDN, 另外 cdnjs 正在申请(更新：请参阅官网上的下载文档，不要使用下面的npm cdn，因为npm在国内很慢）:
  - https://unpkg.com/jquery-weui@0.7.2/dist/js/jquery-weui.min.js
  - https://unpkg.com/jquery-weui@0.7.2/dist/css/jquery-weui.min.css
- 去掉了对 `$.fn.data` 方法的重写，因为这样会导致部分依赖 `data` 方法的jquery插件出错。
- 修复了 `update` 方法在 Select 组件处在打开状态下调用时会导致绑定事件失效而无法操作的问题。
- `Photos` 更新 `open` 方法，支持传入一个 `index` 参数设置打开时默认显示的图片。
- 更新 `photos` 文档，支持更多的方法。
- 更新对话框:
  - 增加了一个 `$.login` 可以直接弹出一个登录窗。
  - 现在在使用 `$.alert`, `$.confirm`, `$.prompt`, `$.login` 都可以传入一个 `Object` 作为参数。
  - `$.prompt` 现在可以传入一个 `input` 参数设置默认值。
  - `$.prompt` 和 `$.login` 打开之后都会自动 focus 输入框
  - 统一了对话框的回调函数的`this`。
- `popup` 增加了一个可选的 `.weui-popup-overlay` 可以在页面覆盖上一个半透明的遮罩层。
- `picker` 更新:
  - 如果只有一列，那么现在可以滑动整个弹层。
  - 增加了内联模式。
- 时间日期选择器更新：
  - 在弹窗中加入了日期和时间的分隔符，并且是可配置的
  - 现在可以自由定制小时和分钟的可选值。
  - 现在可以支持更多的picker中的配置，包括 `title`, `onChange` 等。
  - 增加了内联模式（继承自 picker）。
- 图片浏览器增加了双击缩放。
- 修复了 `Select` 没有任何选择时点击关闭会导致的报错。

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
