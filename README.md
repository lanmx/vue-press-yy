# vue-press-yy
基于vuepress2.0.0-beta.61构建的前端文档网站，共同学习成长！

## yarn dev

## 目录结构
- docs
  - .vuepress
    - api axios接口
    - components  vue组件
    - environment  环境变量配置
    - hook hook函数
    - images  所有文档图片
    - pubilc  logo
    - static  歌词
    - styles
    - client.js
    - config.js
  - about 关于
  - back 后端
  - front 前端
  - music 音乐
  - utils 全局封装的函数方法
- package.json
- README.md
- yarn.lock

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
- 自定义全局音乐播放功能 (由于个人喜欢音乐，因此定制了音乐播放器)
- 自定义实时时钟显示
- 自定义vue组件实现文章类型导航和右侧菜单栏


## 功能迭代持续更新中