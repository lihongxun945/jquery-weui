# About

这个文档是给jqweui的开发者看的。

# 分支

- `master` 是主分支
- `build` 是包含了 `dist` 目录的分支
- 所有的发布的版本号都有对应的 tag，比如 `v1.1.0`
- `gh-pages` 是官方文档的分支，同步之后会自动更新
- `gh-pages-dev` 是官方文档的开发分支，开发完成后请合并到 `gh-pages` 分支

# 提交你的代码

请fork此repo到您自己的目录下，然后创建分支并提交您的修改，最后向 这个仓库的 `master` 分支发送pull request

# 如何发布代码

发布代码分为几个步骤：

1. push最新的master代码
2. 在 `package.json` 中修改版本号
3. 创建tag `vx.x.x` 并push
4. 切换到 `build` 分支，然后合并 `master`
5. 执行 `gulp build` 编译代码
6. 执行 `npm publish` 发布代码到 npm
7. 完成

# 更新文档

默认的文档是在gitpages上，直接push `gh-pages` 分支即可。
为了方便国内用户访问，我们使用 [码市](https://coding.net) 托管了一个镜像库，并且用他的 pages 服务创建了一个国内的官方文档镜像。

所以请注意当在 `github` 更新了 `gh-pages`，一定记得去 `coding.net` 同步一下镜像。
