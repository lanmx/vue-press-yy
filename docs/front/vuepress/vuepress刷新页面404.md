## **问题描述：**

访问地址 http://blog.pengxiao.xyz/   刷新页面可以正常访问

访问地址 http://blog.pengxiao.xyz/front/  刷新页面404


后来查了好多资料，后来发现是组件打包报错了，导致打包文件缺失，刷新部分缺失页面404；

在md文件中加入组件的使用后，例如，
```html
<Music></Music>
```

**表现为以下两种情况：**

- build会出现报错，render function or template not defined in component: 某某组件名称。
- dev或build后的文件启服务后，正常点击访问可以，但是F5刷新就会出现404。

## 解决方法

在组件引用外层增加clientOnly标签就好了。
```html
<ClientOnly>
  <Music></Music>
</ClientOnly>
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>