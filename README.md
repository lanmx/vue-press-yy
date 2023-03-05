# vue-press-yy
基于vuepress2.0.0-beta.61构建的前端文档网站，共同学习成长！

## 实现功能
- 侧边栏自动生成目录 - 手写代码逻辑，详见/utils/get-children.js
- 本地文档搜索 - 基于searchPlugin插件
- 文章评论 - 基于Valine插件
- 文章右侧目录锚点 - 基于vuepressPluginAnchorRight插件
- 已关联github仓库
- 图片统一放在.vuepress/images/文件夹，已配置@alias别名
- vue组件在components文件夹已自动全局注册，一级目录新建，不要新建文件夹。
- 自定义footer，可导航连接到文章页面
- 已引入element Plus组件库（不要用antd，有样式冲突问题）

## 功能迭代持续更新中