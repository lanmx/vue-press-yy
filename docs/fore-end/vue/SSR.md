## 一、SPA缺点

- 不利于搜索引擎的抓取：用SSR优化
- 首次渲染速度相对较慢：用SSR首屏渲染技术优化

## 二、基于`Vue`的`SPA`如何实现`SEO`的三种方式

1. **SSR服务端渲染**

将组件或页面通过服务器生成html，再返回给浏览器，如`nuxt.js`

1. **静态化**

目前主流的静态化主要有两种：（1）一种是通过程序将动态页面抓取并保存为静态页面，这样的页面的实际存在于服务器的硬盘中（2）另外一种是通过WEB服务器的 `URL Rewrite`的方式，它的原理是通过web服务器内部模块按一定规则将外部的URL请求转化为内部的文件地址，一句话来说就是把外部请求的静态地址转化为实际的动态页面地址，而静态页面实际是不存在的。这两种方法都达到了实现URL静态化的效果

1. **使用`Phantomjs`针对爬虫处理**

原理是通过`Nginx`配置，判断访问来源是否为爬虫，如果是则搜索引擎的爬虫请求会转发到一个`node server`，再通过`PhantomJS`来解析完整的`HTML`，返回给爬虫。


<Valine></Valine>