## 一、v-if和v-show

### 区别

- 控制手段不同
- 编译过程不同
- 编译条件不同

控制手段：`v-show`隐藏则是为该元素添加`css--display:none`，`dom`元素依旧还在。`v-if`显示隐藏是将`dom`元素整个添加或删除

编译过程：`v-if`切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；`v-show`只是简单的基于css切换

编译条件：`v-if`是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染

- `v-show` 由`false`变为`true`的时候不会触发组件的生命周期
- `v-if`由`false`变为`true`的时候，触发组件的`beforeCreate`、`create`、`beforeMount`、`mounted`钩子，由`true`变为`false`的时候触发组件的`beforeDestory`、`destoryed`方法



### 使用场景

性能消耗：`v-if`有更高的切换消耗；`v-show`有更高的初始渲染消耗；

v-if 与 v-show 都能控制dom元素在页面的显示

v-if 相比 v-show 开销更大的（直接操作dom节点增加与删除）

如果需要非常频繁地切换，则使用 v-show 较好

如果在运行时条件很少改变，则使用 v-if 较好

#### [v-show与v-if原理](https://vue3js.cn/interview/vue/show_if.html#%E4%B8%89%E3%80%81v-show%E4%B8%8Ev-if%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)



## 二、v-for和v-show

1. `v-for`优先级比`v-if`高；不要把 `v-if` 和 `v-for` 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
2. 如果避免出现这种情况，则在外层嵌套`template`（页面渲染不生成`dom`节点），在这一层进行v-if判断，然后在内部进行v-for循环

```js
<template v-if="isShow">
    <p v-for="item in items">
</template>
```

3. 如果条件出现在循环内部，可通过计算属性`computed`提前过滤掉那些不需要显示的项

```js
computed: {
    items: function() {
      return this.list.filter(function (item) {
        return item.isShow
      })
    }
}
```


<ClientOnly>
  <Valine></Valine>
</ClientOnly>
