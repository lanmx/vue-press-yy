# vuepress引入UI组件库
## 一、下载ant design依赖
下载依赖，我这里下载最新版本
<CodeGroup>
  <CodeGroupItem title="PNPM">

```bash:no-line-numbers
pnpm install ant-design-vue@next
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn add ant-design-vue@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install ant-design-vue@next
```

  </CodeGroupItem>
</CodeGroup>

## 二、引入ant design 
在client.js文件
```ts
import { defineClientConfig } from '@vuepress/client'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(Antd)
  },
  setup() {},
  rootComponents: [],
})
```
## 三、vuepress主题颜色和ant design样式冲突 
功能是实现了，但是引入antd.css后，和主题颜色切换的样式冲突了。
这个暂时没找到解决方法。

## 四、改使用element Plus UI组件库
我尝试换一个组件库，引入发现竟然没有样式冲突，呜呜element我爱你~~~
```ts 
import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
  },
  setup() {},
  rootComponents: [],
})
```
## 推荐使用element Plus组件引入vuepress项目。


<ClientOnly>
  <Valine></Valine>
</ClientOnly>

