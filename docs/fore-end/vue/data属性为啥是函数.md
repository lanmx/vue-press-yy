---
title: vue2的data属性为啥是函数
meta:
  - name: description
    content: vue2的data属性为啥是函数
  - name: keywords
    content: vue2 data() 作用域
---
## data属性为啥是函数

[原理分析](https://vue3js.cn/interview/vue/data.html#%E4%B8%89%E3%80%81%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)

- 函数有作用域；
- data之所以是一个函数，是因为一个组件可能会多处调用，而每一次调用就会执行data函数并返回新的数据对象，这样，可以避免多处调用之间的数据污染
- 根实例对象`data`可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
- 组件实例对象`data`必须为函数，目的是为了防止多个组件实例对象之间共用一个`data`，产生数据污染。采用函数的形式，`initData`时会将其作为工厂函数都会返回全新`data`对象


<ClientOnly>
  <Valine></Valine>
</ClientOnly>