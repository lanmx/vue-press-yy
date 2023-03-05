import { defineClientConfig } from '@vuepress/client'
// 全局引入
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
  },
  setup() {},
  rootComponents: [],
})