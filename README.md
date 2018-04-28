# Wiz.Editor.jsMind

Wiz.Editor.jsMind 是一个基于 [jsMind][jsmind] 构建的为知笔记 思维导图 插件。

## 主要特性
- 使用快捷键编辑思维导图

## 使用
- 新建标题后缀为 .jm 的笔记，选择 Editor.jsMind 编辑器编辑
- 节点可以插入 html 文本（比如要换行就输入&lt;br&gt;，等等）

## 配置
工具栏选项按钮打开设置面板：
- 快捷键设置

## 下载与安装
- 通过 [Github][releases] 下载插件包
- 双击插件包即可安装

## FAQ
Q：在 PC 上能查看 jm 导图，在手机端却只能看到文字。
A：jm 导图目前依赖插件渲染，无法单独查看。

## 开发

Clone 项目并安装开发依赖：

    git clone https://github.com/plylrnsdy/wiz-editor-jsmind
    cd wiz-editor-jsmind
    npm install

构建项目：

    gulp wiz-build

插件生成到 out/src 中，将其中的文件复制到 `%My Knowledge%/Plugins/Wiz.Editor.jsMind` 下，运行 Wiz 就可以使用了。

## 更新日志
[Change Logs](./CHANGELOG.md)

## 问题
如果你发现任何 Bug，或者有其他相关问题，可以提交 [问题][issues]。

## 贡献
从 [仓库][repository] 派生并提交拉取请求（pull requests）。

## 关于
作者：plylrnsdy
Github：[wiz-editor-jsmind][repository]

## License
The MIT License.

[jsmind]:https://github.com/hizzgdev/jsmind
[issues]:https://github.com/plylrnsdy/wiz-editor-jsmind/issues
[releases]:https://github.com/plylrnsdy/wiz-editor-jsmind/releases
[repository]:https://github.com/plylrnsdy/wiz-editor-jsmind
