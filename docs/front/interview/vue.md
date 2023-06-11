## 1. vue中v-for的key用法和原理

### （1）为什么在v-for中用key

- 使用key的原因和vue虚拟DOM的diff算法有关，虚拟DOM渲染成真实DOM，会进行新旧节点比较，这里比较就用到diff算法；diff算法使用key作为vNode节点的唯一标识，通过key，Diff算法可以更准确， 更快的找到对应的vnode节点，进行patch比较修补丁；
- Vue会尽可能高效的渲染元素，通常会复用已有的元素，而不是从头开始渲染
- Vue提供一种方式来表达这两个元素时完全独立的，如果不要复用它们。只需要添加一个具有唯一值的key属性即可。

### （2）为什么key不建议用index

key绑定的值建议是唯一的标识，因为index可能会变，例如，如果我删掉数组长度为5的第4个元素，第5个元素的索引index会变为4；也就是key变了，根据vue虚拟Dom的算法，会通过key去判断，判断到这个key不一样，就不会走sameNodes的代码，会删除节点或者新建节点；

### （3）diff算法

vue中，虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较用到diff算法

diff 算法是一种通过同层的树节点进行比较的高效算法

其有两个特点：

- 比较只会在同层级进行, 不会跨层级比较
- 在diff比较的过程中，循环从两边向中间比较

**patchVnode方法：**

- 当数据发生改变时，订阅者watcher就会调用patch给真实的DOM打补丁

- 通过isSameVnode进行判断，相同则调用patchVnode方法

- patchVnode做了以下操作：
  - 找到对应的真实dom，称为el
  - 如果都有都有文本节点且不相等，将el文本节点设置为Vnode的文本节点
  - 如果oldVnode有子节点而VNode没有，则删除el子节点
  - 如果oldVnode没有子节点而VNode有，则将VNode的子节点真实化后添加到el
  - 如果两者都有子节点，则执行updateChildren函数比较子节点
- updateChildren主要做了以下操作：
  - 设置新旧VNode的头尾指针
  - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用patchVnode进行patch重复流程、调用createElem创建一个新节点，从哈希表寻找 key一致的VNode 节点再分情况操作，直到旧节点的头指针大于尾指针的时候就退出循环。

## 2. vue中如何收集依赖

每一个属性都有一个dep，存放所依赖的watcher，当属性变化后会通知对应的watcher去更新

在渲染的时候，get获取这个响应式数据，此时就会触发收集依赖的dep.depend()

当数据发生改变时，会触发watcher，通过dep.notify()去更新数据

## 3. vue2如何检测数组的变化

vue2没有用defineProperty对数组拦截，而是对数组重写，数组中如果是对象的数据类型，用defineProperty，再继续递归处理；数组的索引和长度是无法监控的；

## 4. Vue为什么要用虚拟DOM

减少DOM操作，提高性能


## 5. vue的SSR是什么？作用

`SSR`就是服务端渲染

基于`nodejs serve`服务环境开发，所有`html`代码在服务端渲染

数据返回给前端，然后前端进行“激活”，即可成为浏览器识别的html代码

`SSR`首次加载更快，有更好的用户体验，有更好的seo优化，因为爬虫能看到整个页面的内容，如果是vue项目，由于数据还要经过解析，这就造成爬虫并不会等待你的数据加载完成，所以其实Vue项目的seo体验并不是很好


## 6. Vue的watch实现原理

## 7. Vue2、vue3的响应式原理和区别

## 8. vue的生命周期

## 9. vue模板的渲染过程

## 10. vue2和vue3的最大区别，性能上有什么变化
## 11. 说说vue-router的使用，讲一下路由钩子函数，beforeEach的实现原理


## 12. 说一下vue mixin的用法 好处和优点

## 13. vue2和vue3框架的区别，vue3相对比vue2做了哪些优化
### 1、源码管理
vue3整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到packages 目录下面不同的子目录中
这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性

另外一些 package（比如 reactivity 响应式库）是可以独立于 Vue 使用的，这样用户如果只想使用 Vue3 的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 Vue
### 2、TypeScript
Vue3是基于typeScript编写的，提供了更好的类型检查，能支持复杂的类型推导
### 3、性能上的优化
### （1）体积优化
相比Vue2，Vue3整体体积变小了，除了移出一些不常用的API，任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小. 最重要的是Tree shanking

Tree shaking 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 Dead code elimination

Tree shaking是基于ES6模板语法（import与exports），主要是借助ES6模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量

Tree shaking做了两件事：

编译阶段利用ES6 Module判断哪些模块已经加载
判断那些模块和变量未被使用或者引用，进而删除对应代码
### （2）编译优化
1. diff算法优化
vue3在diff算法中相比vue2增加了静态标记, 其作用是为了会发生变化的地方添加一个flag标记，下次发生变化的时候直接找该地方进行比较,提高性能

2. 静态提升
Vue3中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用
没有做静态提升之前
```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _createVNode("span", null, "你好"),
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```
做了静态提升之后
```js
const _hoisted_1 = /*#__PURE__*/_createVNode("span", null, "你好", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```
静态内容_hoisted_1被放置在render 函数外，每次渲染的时候只要取 _hoisted_1 即可

同时 _hoisted_1 被打上了 PatchFlag ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用于 Diff

### 4、事件监听缓存
默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化, 开启了缓存后，没有了静态标记。也就是下次diff算法的时候直接使用
### 5、优化逻辑复用
在vue2中，我们是通过mixin实现功能混合，如果多个mixin混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰

而通过composition这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可
### 6、数据劫持(响应式系统)优化
在vue2中，数据劫持是通过Object.defineProperty ，这个 API 有一些缺陷:
检测不到对象属性的添加和删除
数组API方法无法监听到
需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
```js
Object.defineProperty(data, 'a',{
  get(){
    // track
  },
  set(){
    // trigger
  }
})
```
Proxy直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的
```js
function reactive(obj) {
    if (typeof obj !== 'object' && obj != null) {
        return obj
    }
    // Proxy相当于在对象外层加拦截
     const observed = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}:${res}`)
            return isObject(res) ? reactive(res) : res
        }
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log(`设置${key}:${value}`)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除${key}:${res}`)
            return res
        }
    })
    return observed
}
```
同时Proxy 并不能监听到内部深层次的对象变化，而 Vue3 的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归
### 7、语法 API的区别
### （1）vue 2.0 Options API
Options API，即大家常说的选项API，即以vue为后缀的文件，通过定义methods，computed，watch，data等属性与方法，共同处理页面逻辑
```js
export default {
  data() {
    return {
    }
  },
  methods: {
    fnA() {},
    fnB() {},
  },
  computed: {
    ...
  },
  watched: {
    ...
  }
}
```
可以看到Options代码编写方式，如果是组件状态，则写在data属性上，如果是方法，则写在methods属性上…, 用组件的选项 (data、computed、methods、watch) 组织逻辑在大多数情况下都有效。

然而，当组件变得复杂，导致对应属性的列表也会增长，这可能会导致组件难以阅读和理解
### （2）vue3.0 composition API
在 Vue3 Composition API 中，组件根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合） , 即使项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 API
### （3）两者区别
Options API 碎片化使得理解和维护复杂组件变得困难, 选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块

Compositon API 将某个逻辑关注点相关的代码全都放在一个函数里，这样当需要修改一个功能时，就不再需要在文件中跳来跳去


## 14. vue的nextTick原理

nextTick的回调函数在下一次DOM更新循环结束执行回调，用于获取更新后的DOM；

vue中的数据更新是异步的，使用nextTick可以保证拿到更新后的数据做逻辑处理；

例如修改了三个变量，是每修改一次，DOM就更新一次吗？不是的，Vue采用的是异步更新的策略，通俗点说就是，同一事件循环内多次修改，会统一进行一次视图更新。

## 15. 只用watch，不用computed监听对象

### （1）computed

惰性求值；computed的值在getter执行后是会被缓存的。如果所依赖的数据发生改变时候，就会重新调用getter来计算最新的结果。

而且计算属性的值是会被缓存的，只有当依赖的响应式数据更新后才会被重新计算求值。

### （2）watch

watch用于侦听data的数据。watch属性可以是字符串、函数、对象、数组

当data数据发生变化，执行函数。在函数中会传入newVal和oldVal两个参数。

这因为watch不会监听第一次变化，可以通过immediate：true开启

拥有deep，immediate两属性：

- 当deep：true 会监听到obj对象的所有内部属性，默认值为false

- 当 immediate：true 时，回调函数会在监听开始后立刻执行，可以监听到到第一次变化。

### （3）watch和computed的区别

- watch可以异步，computed不支持异步
- watch没有依赖缓存特性，computed有缓存机制，惰性计算，当依赖的数据更新时才会执行getter函数
- watch一对多；computed多对一或一对一
- watch有两个参数和两个属性，computed通过get和set



## 16. watch和computed的生命周期阶段

所以watch和computed的初始化是在created之前，beforeCreate之后。

```javascript
initLifecycle(vm)       // 初始化生命周期
initEvents(vm)        // 初始化事件
initRender(vm)         // 初始化渲染
callHook(vm, 'beforeCreate')  // 调用生命周期钩子函数
initInjections(vm)   //初始化injections
initState(vm)    // 初始化props,methods,data,computed,watch
initProvide(vm) // 初始化 provide
callHook(vm, 'created')  // 调用生命周期钩子函数
```

如果是父组件的值改变了props给子组件的值，同时触发了父组件和子组件watch和computed，那么执行顺序可以是：

methods => 父watch => 父computed => 子watch => 子computed

![image-20220217154607121](@alias/image-20220217154607121.png)

## 17. vue手写自定义指令，说说如何实现的

### （1）自定义指令钩子函数

1. bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
2. inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
3. update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
4. componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
5. unbind：只调用一次，指令与元素解绑时调用。

钩子函数第一个参数是被绑定的原生DOM元素，第二个元素是一个binding对象，该对象有三个重要的属性name、value和expression

### （2）全局自定义指令

```js
Vue.directive('指令名称',callback)

Vue.directive('focus',{
    // 在内存中就触发了bind，一般用于修改样式
    bind(el, binding, vnode) {
        if(binding.value = 'color') {
    		el.style.focus = 'red'
        }
    },
    // 页面DOM已经渲染完毕，一般用于js控制
    inserted(el,binding) {
        el.focus()
    },
    update(el,binding) {
        console.log('update')
    },
    componentUpdated(el,binding) {
        console.log('componentUpdated')
    },
    unbind(el,binding) {
        console.log('unbind')
    }
})
```

### （3）局部自定义指令

局部注册通过在组件`options`选项中设置`directive`属性

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus() // 页面加载完成之后自动让输入框获取到焦点的小功能
    }
  }
}
```

### （4）所有的钩子函数的参数都有以下

- el：指令所绑定的元素，可以用来直接操作 DOM
- binding：一个对象，包含以下 property：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }
- vnode：Vue 编译生成的虚拟节点
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用

> 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行




## 18. vue的动态指令和参数

```js
<template>
    ...
    <aButton @[someEvent]="handleSomeEvent()" :[someProps]="1000" />...
</template>
<script>
  ...
  data(){
    return{
      ...
      someEvent: someCondition ? "click" : "dbclick",
      someProps: someCondition ? "num" : "price"
    }
  },
  methods: {
    handleSomeEvent(){
      // handle some event
    }
  }  
</script>
```

## 19. vue的双向绑定原理
