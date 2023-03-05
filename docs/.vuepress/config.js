import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right';
import getChildren from "../utils/get-children"
import getChildFloders from "../utils/get-child-floder"
import { path, getDirname } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
const __dirname = getDirname(import.meta.url)


export default defineUserConfig({
  lang: 'zh-CN',
  title: '嘟嘟在蓝色海底',
  description: '一枚喜欢音乐的女程序员，记录成长痕迹！',
  theme: defaultTheme({
    home: '/',
    logo: '/logo.png',
    logoDark: '/logoDark.png',
    repo: 'vuejs/vuepress',
    repo: 'https://github.com/lanmx/vue-press-yy',
    search: true,
    navbar: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/fore-end/' },
      { text: '后台', link: '/back-end/' },
      { text: '关于', link: '/about/' },
    ],
    displayAllHeaders: false,
    sidebar: {
      '/fore-end/': [
        {
          text: 'JavaScript基础',
          collapsible: true,
          children: getChildren('docs/fore-end/javascript-basics/')
        },
        {
          text: '高级JavaScript教程',   // 必要的
          collapsible: true,
          sidebarDepth: 3,    // 可选的, 默认值是 2
          children: getChildren('docs/fore-end/javascript/')
        },
        {
          text: 'Vue',
          collapsible: true,
          children: getChildren('docs/fore-end/vue/')
        },
        {
          text: 'Angular',
          collapsible: true,
          children: getChildren('docs/fore-end/angular/')
        },
        {
          text: '经典例子',
          collapsible: true,
          children: getChildren('docs/fore-end/classic-example/')
        },
        {
          text: 'HTML CSS',
          collapsible: true,
          children: getChildren('docs/fore-end/html-css/')
        },
        {
          text: '移动端',
          collapsible: true,
          children: getChildren('docs/fore-end/mobile-terminal/')
        },
        {
          text: '打包工具',
          collapsible: true,
          children: getChildren('docs/fore-end/packer-tool/')
        },
        {
          text: 'vuePress',
          collapsible: true,
          children: getChildren('docs/fore-end/vuepress/')
        }
      ],
      '/back-end/': [
        {
          text: '数据结构与算法',
          collapsible: true,
          children: getChildren('docs/back-end/data-struct/')
          // children: [
          //   { text: '队列', link: '/data-struct/队列.md'  },
          // ]
        },
        {
          text: '计算机基础',
          collapsible: true,
          children: getChildren('docs/back-end/computer-basics/')
        },
        {
          text: 'Node.js',
          collapsible: true,
          children: getChildren('docs/back-end/nodejs/')
        },
        {
          text: 'Git',
          collapsible: true,
          children: getChildren('docs/back-end/git/')
        }
      ]
    },
    subSidebar: 'auto',
    smoothScroll: true,
  }),
  alias: {
    '@alias': path.resolve(__dirname, './../../docs/.vuepress/images'),
  },
  colorMode: 'dark',
  plugins: [
    [vuepressPluginAnchorRight()],
    // components全部vue注册
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    // registerComponentsPlugin({
    // 注册vue组件才能生效
    // components: {
    //   ArtcleList: path.resolve(__dirname, './components/ArtcleList.vue'),
    // },
    // }),
    searchPlugin({
      // 配置项
      locales: {
        '/': {
          placeholder: '输入搜索',
        },
        '/fore-end/': {
          placeholder: '搜索',
        },
        '/back-end/': {
          placeholder: 'search',
        }
      },
      // 排除首页
      isSearchable: (page) => page.path !== '/',
    }),
    backToTopPlugin(),
    ['@vuepress/last-updated'],
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功"
      }
    }],
    ['copyright',{
        authorName: 'lanminxiao', // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
    }],
    ['vuepress-plugin-code-copy', true]
  ]
})