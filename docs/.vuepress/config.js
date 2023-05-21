import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right';
import getChildren from "../utils/get-children"
import { path, getDirname } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import getChildFloders from "../utils/get-child-floder"
const __dirname = getDirname(import.meta.url)

const autometa_options = {
  site: {
    name: 'lanmx Blog',
    twitter: 'lanmx',
  },
  canonical_base: 'https://blog.pengxiao.xyz',
};

export default defineUserConfig({
  lang: 'zh-CN',
  title: '蓝敏晓的博客',
  description: '女程序员，爱弹琴，爱发呆，爱coding，一个专注分享学习经验，记录前端知识的个人博客',
  head: [
      ['meta', { name: 'baidu-site-verification', content: 'codeva-CG1MKx50Sm'}],
      ['meta', { name: 'baidu-site-verification', content: 'codeva-jIfosA0IJ1'}],
      ['meta', { name: '360-site-verification', content: '1a0bfe04399601203667d7dcfa1c8e6c'}],
      ['meta', { name: 'keywords', content: '蓝敏晓'}],
      ['meta', { name: 'keywords', content: '蓝敏晓的博客'}],
      ['meta', { name: 'keywords', content: 'vuepress'}],
      ['meta', { name: 'keywords', content: '音乐'}],
      ['meta', { name: 'keywords', content: 'vue'}],
      ['meta', { name: 'keywords', content: 'angular'}],
      ['meta', { name: 'keywords', content: 'javascript'}],
      ['meta', { name: 'keywords', content: '宽窄巷子和锦里'}],
      ['meta', { name: 'keywords', content: '聪明的憨憨猪'}],
      ['meta', { name: 'keywords', content: '小憨憨'}],
      ['link', { rel: 'icon', href: '/logolink.png' }],
      ['meta', { name: 'msvalidate.01', content: '4FCEF54952698D58CA1C2AA1D082C8E7' }],
      ['meta', { 'http-quiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }],
      ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1'}],
      // ['script', { src: "/utils/autopush-baidu.js" }],
      // ['script', { src: "/utils/autopush-360.js" }]
  ],
  theme: defaultTheme({
    home: '/',
    logo: '/sculpture.jpg',
    logoDark: '/logoDark.png',
    repo: 'https://github.com/lanmx/',
    search: true,
    navbar: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/front/' },
      { text: '后台', link: '/back/' },
      // { text: '音乐', link: '/music/' },
      { text: '关于', link: '/about/' },
    ],
    displayAllHeaders: false,
    sidebar: {
      '/front/': [
        {
          text: 'JavaScript基础',
          collapsible: true,
          children: getChildren('docs/front/javascript-basics/')
        },
        {
          text: '高级JavaScript教程',   // 必要的
          collapsible: true,
          sidebarDepth: 3,    // 可选的, 默认值是 2
          children: getChildren('docs/front/javascript/')
        },
        {
          text: 'Vue',
          collapsible: true,
          children: getChildren('docs/front/vue/')
        },
        {
          text: 'Angular',
          collapsible: true,
          children: getChildren('docs/front/angular/')
        },
        {
          text: '经典例子',
          collapsible: true,
          children: getChildren('docs/front/classic-example/')
        },
        {
          text: 'HTML CSS',
          collapsible: true,
          children: getChildren('docs/front/html-css/')
        },
        {
          text: '移动端',
          collapsible: true,
          children: getChildren('docs/front/mobile-terminal/')
        },
        {
          text: '打包工具',
          collapsible: true,
          children: getChildren('docs/front/packer-tool/')
        },
        {
          text: 'vuePress',
          collapsible: true,
          children: getChildren('docs/front/vuepress/')
        },
        {
          text: '前端面试集合',
          collapsible: true,
          children: getChildren('docs/front/interview/')
        },
      ],
      '/back/': [
        {
          text: '数据结构与算法',
          collapsible: true,
          children: getChildren('docs/back/data-struct/')
        },
        {
          text: '计算机基础',
          collapsible: true,
          children: getChildren('docs/back/computer-basics/')
        },
        {
          text: 'Nodejs',
          collapsible: true,
          children: getChildren('docs/back/nodejs/')
        },
        {
          text: 'Git',
          collapsible: true,
          children: getChildren('docs/back/git/')
        },
        {
          text: '工作笔记',
          collapsible: true,
          children: getChildren('docs/back/work/')
        },
      ],
    },

    // subSidebar: 'auto',
    smoothScroll: true,
    lastUpdatedText: '最近更新',
    contributorsText: '贡献者',
    editLinkText: '在gitHub上编辑此页',
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    next: true,
    prev: true,
    backToHome: '返回首页'
  }),
  alias: {
    '@alias': path.resolve(__dirname, './../../docs/.vuepress/images'),
    '@components': path.resolve(__dirname, './../../docs/.vuepress/components'),
    '@layouts': path.resolve(__dirname, './../../docs/.vuepress/layouts'),
    '@utils': path.resolve(__dirname, './../../docs/utils'),
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
        '/front/': {
          placeholder: '搜索',
        },
        '/back/': {
          placeholder: 'search',
        }
      },
      // 排除首页
      isSearchable: (page) => page.path !== '/',
    }),
    // backToTopPlugin(),
    ['@vuepress/last-updated'],
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功"
      }
    }],
    ['vuepress-plugin-copyright',{
        authorName: 'lanminxiao', // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
    }],
    ['vuepress-plugin-code-copy', true],
    ['@vuepress-reco/vuepress-plugin-bgm-player', 
      { audios: [ 
          { name: '瞬间的永恒', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/53702.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
          { name: '夜空的寂静', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/54888.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
          { name: '秋的思念', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/47097.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
          { name: '红豆', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/78229.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
          { name: '安静的午后', artist: '高至豪', url: 'https://www.ytmp3.cn/down/76204.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
          { name: 'River Flows in You', artist: '米歇尔很甜', url: 'https://www.ytmp3.cn/down/76694.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
          { name: '夜的钢琴曲五', artist: 'Caxey', url: 'https://www.ytmp3.cn/down/76887.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        ], 
        // 是否默认缩小 
        autoShrink: true , 
        // 缩小时缩为哪种模式 
        shrinkMode: 'float', 
        // 悬浮窗样式 
        floatStyle:{ bottom: '10px', 'z-index': '999999' } 
      }
    ],
    ['sitemap', {
      hostname: "https://blog.pengxiao.xyz",
      // 排除无实际内容的页面
      exclude: ["/404.html"]
    }],
    ['vuepress-plugin-baidu-autopush'],
    ['autometa', autometa_options],
  ],
  // define HOOK
  define: {
    __FOO__: 'st33333r',
    __MENU__: {
      'all': getChildFloders('docs/front/').concat(getChildFloders('docs/back/')),
      'fore-end': getChildFloders('docs/front/'),
      'back-end': getChildFloders('docs/back/'),
    },
    __ARTICLE__: {
      'fore-end': {
        list: getChildren('docs/front/'),
        cate: 'fore-end',
        name: '前端'
      },
      'back-end': {
        list: getChildren('docs/back/'),
        cate: 'back-end',
        name: '后台'
      },
      'number': getChildren('docs/front/').concat(getChildren('docs/back/')).length,
    }
  },
})