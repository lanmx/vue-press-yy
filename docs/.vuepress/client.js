import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Layout from '@layouts/Layout.vue'
import mitt from 'mitt'
// import NotFound from '@layouts/NotFound.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.config.globalProperties.$Bus = mitt();
    // 路由导航钩子
    router.beforeEach((to) => {
      console.log('before navigation')
    })
    router.afterEach((to) => {
      console.log('after navigation')
    })
  },
  setup() {},
  rootComponents: [],
  layouts: {
    Layout,
    // NotFound
  },
})
