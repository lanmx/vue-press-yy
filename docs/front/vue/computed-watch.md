---
title: computed和watch的区别
meta:
  - name: description
    content: computed和watch的区别
  - name: keywords
    content: computed watch 生命周期 vue
---

## computed和watch的区别

### 1. 计算属性computed

计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 num和num2还没有发生改变，多次访问 total 计算属性会立即返回之前的计算结果，而不需要重新计算，这里举的例子只是简单的计算，通常也会用computed来做一些比较复杂的计算。
计算属性默认只有getter，上面其实就是一个getter。

### 2. 侦听器watch

watch的值可以是来自computed，也可以来自data()

watch叫做侦听器，当侦听的值发生改变时，其他变化会跟着改变或者有些操作会被触发，使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。



当新旧数据是引用类型，监听的新旧值一样时，可以通过computed，结合watch函数去深度监听数据变化，做一些业务逻辑处理；

> 例子：
>
> 明文眼睛睁开，这时候切换到另一条订单，通过不同订单的订单编号去判断不一样，如果不一样则把眼睛闭合，显示密文；
>
> 但这时候通过watch拿到的新旧两条订单是一样的，没有执行把眼睛闭合的代码；因为订单编号一样；为什么，因为引用类型，其实两条订单编号是不一样的，但是因为引用类型关系，导致watch监听到新旧的订单编号是一样的，后面修改的订单同时改变了原来的订单。
>
> 这时候可以结合computed计算属性监听新旧数据。


<ClientOnly>
  <Valine></Valine>
</ClientOnly>