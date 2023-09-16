---
title: 浏览器前端https网站接口请求http报错 Mixed Content The page at xxx was loaded over HTTPS
description: 浏览器前端https网站接口请求http报错 Mixed Content The page at xxx was loaded over HTTPS
meta:
  - name: keywords
    content: https http 安全访问 浏览器限制
---
## 浏览器前端https网站接口请求http报错
前端项目配置了SSL hhtps安全访问，接口调用node项目用的http报错app-e3a33bd9.js:83 Mixed Content: The page at 'https://blog.pengxiao.xyz/back/nodejs/page' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://ip:3001/music/list'. This request has been blocked; the content must be served over HTTPS.
![](@alias/1684151713722.jpg)
![](@alias/1684151781000.jpg)

当接口出现Mixed Content错误时，是因为我们网站是https协议，而请求接口却是http，浏览器会阻止加载混合内容，以保护用户数据安全和隐私。

**解决办法**：可以设置nginx服务代理，设置loaction的proxy_pass为目标服务器即可，例如：
```js
server {
  location ^~ /api/ {
    proxy_pass http://xx.xx.xx.xx:3000/;     #项目地址和端口号
  }
}
```
