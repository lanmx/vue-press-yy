# Vue父子组件生命周期

## 一、Vue父子组件生命周期执行顺序

- ###  加载渲染过程

  > **-> 父beforeCreate -> 父created -> 父beforeMount** 
  >
  > -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted
  >
  > **-> 父mounted**

- ### 子组件更新过程

  > **-> 父beforeUpdate**
  >
  > -> 子beforeUpdate -> 子updated
  >
  > **-> 父updated**

- ### 父组件更新过程

  > **父beforeUpdate -> 父updated**

- ### 销毁过程

  > **-> 父beforeDestroy**
  >
  > -> 子beforeDestroy -> 子destroyed
  >
  > **-> 父destroyed**



## 二、Vue生命周期

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/892fde0e56324868921d0e924c84858a~tplv-k3u1fbpfcp-watermark.awebp)

## 三、数据请求在created和mouted的区别

`created`是在组件实例一旦创建完成的时候立刻调用，这时候页面`dom`节点并未生成；

`mounted`是在页面`dom`节点渲染完毕之后就立刻执行；触发时机上`created`是比`mounted`要更早；

两者相同点：都能拿到实例对象的属性和方法；

讨论这个问题本质就是触发的时机，放在`mounted`请求有可能导致页面闪动（页面`dom`结构已经生成），但如果在页面加载前完成则不会出现此情况；

建议：放在`create`生命周期当中

## 四、vue3生命周期

```js
- setup():开始创建组件之前，在beoreCreate和create之前执行，创建的是data和methods
- onBeforeMount():组件挂载到节点上之前执行的函数
- onMounted():组件挂载完成后执行的函数
- onBeforeUpdate():组件更新之前执行的函数
- onUpdated():组件更新完成之后执行的函数
- onBeforeUnmount(): 组件卸载之前执行的函数
- onUnmounted(): 组件卸载完成之后执行的函数
- onActivated(): 被包含在<keep-alive> 中的组件，会多出两个生命周期钩子函数。被激活时执行。
- onDeactivated(): 比如从A组件，切换到B组件，A组件消失时执行。
- onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数
```

![image-20220216224210374](@alias/image-20220216224210374.png)

<Valine></Valine>
