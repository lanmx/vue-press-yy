## 1. vue中v-for的key用法和原理

### （1）为什么在v-for中用key

- 使用key的原因和vue虚拟DOM的diff算法有关，虚拟DOM渲染成真实DOM，会进行新旧节点比较，这里比较就用到diff算法；diff算法使用key作为vNode节点的唯一标识，通过key，Diff算法可以更准确， 更快的找到对应的vnode节点，进行patch比较修补丁；
- Vue会尽可能高效的渲染元素，通常会复用已有的元素，而不是从头开始渲染
- Vue提供一种方式来表达这两个元素时完全独立的，如果不要复用它们。只需要添加一个具有唯一值的key属性即可。

### （2）为什么key不建议用index

key绑定的值建议是唯一的标识，因为index可能会变，例如，如果我删掉数组长度为5的第4个元素，第5个元素的索引index会变为4；也就是key变了，根据vue虚拟Dom的算法，会通过key去判断，判断到这个key不一样，就不会走sameNodes的代码，会删除节点或者新建节点；

### （3）diff算法

vue中，虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较用到diff算法

diff 算法是一种通过同层的树节点进行比较的高效算法。

diff整体策略为：深度优先，同层比较。

其有两个特点：

- 比较只会在同层级进行, 不会跨层级比较
- 在diff比较的过程中，循环从两边向中间比较

在循环比较过程中，如果节点相同，那直接patchVnode;

如果节点是一个新节点，旧DOM树不存在，则调用createElm创建一个新的dom节点；


> while循环的逻辑操作主要是：
>
> - 当新老 VNode 节点的 start 相同时，直接 patchVnode ，同时新老 VNode 节点的开始索引都加 1
> - 当新老 VNode 节点的 end 相同时，同样直接 patchVnode ，同时新老 VNode 节点的结束索引都减 1
> - 当老 VNode 节点的 start 和新 VNode 节点的 end 相同时，这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldEndVnode 的后面，同时老 VNode 节点开始索引加 1，新 VNode 节点的结束索引减 1
> - 当老 VNode 节点的 end 和新 VNode 节点的 start 相同时，这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldStartVnode 的前面，同时老 VNode 节点结束索引减 1，新 VNode 节点的开始索引加 1
> - 如果都不满足以上四种情形，那说明没有相同的节点可以复用，则会分为以下两种情况：
> - 从旧的 VNode 为 key 值，对应 index 序列为 value 值的哈希表中找到与 newStartVnode 一致 key 的旧的 VNode 节点，再进行patchVnode，同时 将这个真实 dom移动到 oldStartVnode 对应的真实 dom 的前面
> - 调用 createElm 创建一个新的 dom 节点放到当前 newStartIdx 的位置

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

## 7. vue2和vue3框架的区别，vue3相对比vue2做了哪些优化
### 1、源码管理
vue2.x的源码托管在src目录中，然后依据功能拆分出了complier(模板编译的相关代码)，core(与平台无关的通用运行时代码)，platforms(平台专有代码)，server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码） 等目录。

vue3整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到packages 目录下面不同的子目录中，每一个package有各自的api，类型定义和测试，
这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性

另外一些 package（比如 reactivity 响应式库）是可以独立于 Vue 使用的，这样用户如果只想使用 Vue3 的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 Vue
### 2、TypeScript
在vue1.x中当时没有采用类型语言。但是对于开发大型框架的时候，使用类型语言非常有利于IDE对于类型推导。

尤雨溪在vue2.x使用的是Flow来进行开发，Flow是facebook出品的javascript的静态类型检查工具，但是flow对于一些复杂的场景flow支持的不是很好。

Vue3是基于typeScript编写的，提供了更好的类型检查，能支持复杂的类型推导
### 3、性能上的优化
### （1）体积优化
相比Vue2，Vue3整体体积变小了，除了移出一些不常用的API，移除了冷门API，任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小. 最重要的是Tree shanking

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

### 4、cacheHandler事件监听缓存
在Vue3.0中，提供了事件缓存对象cacheHandlers，当cacheHandlers开启的时候，编译会自动生成一个内联函数，将其变成一个静态节点，当事件再次触发时，就无需重新创建函数直接调用缓存的事件回调方法即可。

默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化, 开启了缓存后，没有了静态标记。也就是下次diff算法的时候直接使用。
```js
<div>
  <button @click = 'onClick'>点我</button>
</div>
```
上述的例子中，默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化，但是因为是同一个函数，所以没必要去追踪它的变化，想办法将它直接缓存起来复用就会提升性能。因此要打开事件监听缓存，这样静态标记就不存在了，这部分内容也就不会进行比较了。

没开启事件监听缓存之前：
```js
export const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", { onClick: _ctx.onClick }, "点我", 8 /* PROPS */, ["onClick"])
                                             // PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
  ]))
})
```
开启事件监听缓存之后：
```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
    }, "点我")
  ]))
}
```
### 5、优化逻辑复用
在vue2中，我们是通过mixin实现功能混合，如果多个mixin混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰

而通过composition这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可
### 6、数据劫持(响应式系统)优化
数据劫持(响应式系统)即当数据发生变化时，能够自动更新相关的视图。在vue3中，用Proxy替换Object.defineProperty；

在vue2中，数据劫持是通过Object.defineProperty ，这个 API 有一些缺陷:
检测不到对象属性的添加和删除（vue为了解决这个问题，出现了$set和$delete实例方法。另外还存在一个问题，就是如果存在多个对象进行嵌套问题，需要深层监听，造成性能问题。）
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
Vue 3 中使用 Proxy 来劫持数据对象，当访问或修改数据时，会触发 Proxy 上的相应拦截器方法。Proxy直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的
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

### 8. SSR优化
当静态内容达到一定量级的时候，会用createStaticVNode方法在客户端去生成一个static node，这些静态node，会直接innerHtml，就不需要创建对象，然后根据对象渲染。

当你在开发中使用 SSR 开发时，Vue 3.0 会将静态标签直接转化为文本，相比 React 先将 jsx 转化为虚拟 DOM，再将虚拟 DOM 转化为 HTML，Vue 3.0 已经赢了。
### 9. StaticNode(静态节点)
上述 SSR 服务端渲染，会将静态标签直接转化为文本。

在客户端渲染的时候，只要标签嵌套得足够多，编译时也会将其转化为 HTML 字符串，如下图所示：
![静态节点StaticNode](@alias/11112222.png)
```js
import { mergeProps as _mergeProps } from "vue"
import { ssrRenderAttrs as _ssrRenderAttrs, ssrInterpolate as _ssrInterpolate } from "@vue/server-renderer"

export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _cssVars = { style: { color: _ctx.color }}
  _push(`<div${
    _ssrRenderAttrs(_mergeProps(_attrs, _cssVars))
  }><div><span>你好</span>...<div><span>你好</span><div><span>${
    _ssrInterpolate(_ctx.message)
  }</span></div></div>`)
}
```
### 10. 编译优化：Fragment
模板内不用再创建一个唯一根节点，可以直接放同级标签和内容。就相当于少了一个节点嵌套渲染。
### 11. 引入RFC：使得每一个版本改动可控
作为一个流行开源框架的作者，尤雨溪可能每天都受到很多的 feature request。但是并不是社区一存在新的功能的需求，框架就会马上实现，因为随着 Vue.js 的用户越来越多，小右会更加重视稳定性，会仔细考虑所做的每一个可能对最终用户影响的更改，以及有意识去防止新 API 对框架本身实现带来的复杂性的提升。

因此 vuejs2.x 版本开发到后期的阶段，尤雨溪就启动了RFC，他的全称为Request for comments。当社区有一些新需求的想法时，它可以提交一个 RFC，然后由社区和 Vue.js 的核心团队一起讨论，如果这个 RFC 最终被通过了，那么它才会被实现。

到了vuejs3.0实现代码前就大规模启用 RFC，来确保他的改动和设计都是经过讨论并确认的，这样可以避免走弯路。Vue.js 3.0 版本有很多重大的改动，每一条改动都会有对应的 RFC，通过阅读这些 RFC，你可以了解每一个 feature 采用或被废弃掉的前因后果。
### 总结：Vue3对于Vue2有什么更新
Vue2在使用过程中，随着项目越来越复杂，项目代码维护起来也越来越困难，主要原因是Vue2使用的是Options API，这种方式把同一个功能的数据、方法、请求都分开写在data、methods等Options中。并且组件之间相同功能的复用比较也比较困难，同时响应式也没有那么灵活，因此，Vue3做出了如下的更新：
- 用Composition API代理Options API，正如刚刚所说，Options API 将相同的功能的不同部分都分开写，不仅不利于阅读和维护，也和原生JS的思想相悖，缺乏灵活性，Vue3采用的Composition API按照功能将代码分割开，这样方便维护，也方便复用。
- 采用Proxy代理Object.defineProperty，Vue2通过defineProperty的get、set和发布订阅来完成响应式，但是defineProperty的get、set并不能监控深层的对象与数组的变化，需要手动调用set来增加、删除响应式属性，还是造成了一些麻烦。Vue3采用Proxy监控整个对象，无论多深的属性都可以被监控到。
- Vue3增加了tree shaking，能在打包的时候只打包用到的组件，可以让运行速度更快和打包文件更小。
- Vue3还改变了虚拟DOM的diff策略，在Vue2中，diff策略不会区别节点是静态节点还是动态节点，而对比过多的静态节点会造成资源的浪费。因此Vue3给每一个节点都打上了标签，如果标签不为-1，则证明是动态节点，在比较的时候也只需要比较动态节点，使diff算法的效率更高。
- Vue3还增加了静态提升和事件监听缓存，将不需要重复创建的节点和方法单独提出、进行缓存，避免重复创建和加载。
- Vue3还做了SSR优化。如果增加的静态内容过多，就会直接使用innerHTML的方法插入，而不会一个一个的创建的节点。

## 8. vue2和vue3的生命周期和区别
### （1）vue2生命周期：（8个阶段）
- **beforeCreate(创建前)**：第一个生命周期钩子，在实例初始化之后,进行<font color="#f73131">数据侦听和事件/侦听器的配置之前</font>同步调用。此时实例的`data`和`methods`等配置还未初始化，无法调用，只能使用一些默认事件。
- **created（创建后）**：在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着<font color="#f73131">以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。</font>然而，挂载阶段还没开始，且 $el 目前尚不可用。模板还没有编译，也就是我们<font color="#f73131">还不能获取到DOM。</font>
- **beforeMount（载入前）**：该在挂载开始之前被调用：<font color="#f73131">相关的 render 函数首次被调用。</font>该钩子函数在模板渲染之前调用，也就是DOM节点挂载到真实DOM树之前调用。此模板进行编译，<font color="#f73131">会调用render函数生成vDom，也就是虚拟DOM，此时我们同样无法获取DOM节点。</font>此时我们同样是无法获取DOM节点的，因为此时只存在VDOM，还在JS级别。
- **mounted（载入后）**：实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也在文档内。注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 vm.$nextTick，执行该钩子函数时，我们的模板编译好了，而且挂载到<font color="#f73131">真实DOM树</font>上面去了，也就是我们的页面可以显示了。（该钩子在服务器端渲染期间不被调用。）
- **beforeUpdate（更新前）**：<font color="#f73131">在数据发生改变后，DOM 被更新之前被调用。</font>这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。该钩子函数在data数据发生变化之后调用，<font color="#f73131">此时data里面的数据已经是最新的了，但是页面上DOM还没有更新最新的数据。</font>
- **updated（更新后）**：在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。当这个钩子被调用时，<font color="#f73131">组件 DOM 已经更新</font>，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 vm.$nextTick，该钩子函数会在data数据更新之后执行，而且此时页面也渲染更新完成了，显示的就是最新的数据。<font color="#f73131">注意：不要在updated中修改data数据，很容易造成死循环。</font>
- **beforeDestroy（销毁前）**：实例销毁之前调用。在这一步，<font color="#f73131">实例仍然完全可用。</font>我们通常会在这个钩子函数里面<font color="#f73131">移除一些全局或者自定义事件。</font>
- **destroyed（销毁后）**：实例销毁后调用。该钩子被调用后，<font color="#f73131">对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。</font>

其他：
- **errorCaptured**：在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。 
- **activated**：被 keep-alive 缓存的组件激活时调用。
- **deactivated**：被 keep-alive 缓存的组件失活时调用。 
### （2）vue3生命周期：
- setup() : 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
- onBeforeMount() : 组件挂载到节点上之前执行的函数；
- onMounted() : 组件挂载完成后执行的函数；
- onBeforeUpdate(): 组件更新之前执行的函数；
- onUpdated(): 组件更新完成之后执行的函数；
- onBeforeUnmount(): 组件卸载之前执行的函数；
- onUnmounted(): 组件卸载完成后执行的函数；
- onActivated(): 被包含在 `<keep-alive>` 中的组件，会多出两个生命周期钩子函数，它在组件被激活的时候调用（当组件被插入到 DOM 中时调用）。具体来说，当一个组件被路由切换到并且该组件之前已经被创建过了，那么就会触发activated钩子函数。在activated钩子函数中，我们可以执行一些操作，比如：发起网络请求获取数据、更新组件的状态、执行一些动画效果等。
- onDeactivated(): 若组件实例是`<keepAlive>`缓存树的一部分，当组件从 DOM 中被移除时调用。比如从 A 组件，切换到 B 组件，A 组件消失时执行；
- onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数。

![vue2生命周期图](@alias/vue2生命周期图.jpg)

### （3）Vue3路由缓存模式下的onActivated与onDeactivated
有时候我们在切换路由时不希望组件更新，希望组件可以缓存下来，维持当前的状态。这时候就需要用到keep-alive组件。

在使用keep-alive时，只有初次加载组件才会执行onMounted，但是有些情况下，比如页面切换时，当切换到指定页面或离开指定页面时，需要更新部分内容。考虑这种情景，Vue3为我们提供了两个特殊的生命周期，这两个生命周期只有在keep-alive模式下才可以使用。

- onActivated：进入页面时会触发。当组件初次加载时会执行onMounted与onActivated，当从别的页面跳转到指定页面时，只有onActivated会被触发。

- onDeactivated：离开页面时会触发。当组件销毁时会执行onUnmounted与onDeactivated，当从别的页面切回指定页面时，只有onDeactivated会被触发。

## 9. vue模板的渲染过程
### （1）模板编译
vue中的模板template无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的HTML语法，所有需要将template转化成一个JavaScript函数，这样浏览器就可以执行这一个函数并渲染出对应的HTML元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。

模板编译又分三个阶段，<font color="#f73131">解析parse，优化optimize，生成generate，最终生成可执行函数render。</font>

- `parse阶段`：使用大量的正则表达式对`template`字符串进行解析，将标签、指令、属性等转化为`抽象语法树AST`。
- `optimize阶段`：遍历`AST`，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行`diff`比较时，直接跳过这一些静态节点，优化`runtime`的性能。
- `generate阶段`：将最终的`AST`转化为`render函数字符串`。

### （2）创建虚拟DOM
渲染函数被调用时，会执行生成的渲染函数，并返回一个虚拟DOM（Virtual DOM）树。
也就是执行`render函数`返回为`vnode`，`vnode`表明了各个节点的层级关系、特性、样式、绑定的事件。
### （3）虚拟DOM的比对与补丁
得到新的虚拟DOM后，Vue会对它进行与旧的虚拟DOM的比对，找出两者之间的差异。过程也被称为虚拟DOM的补丁算法（Patch Algorithm）。补丁算法会找出需要添加、删除或更新的节点，生成针对真实DOM的最小化操作。
也就是通过`updateComponent`函数调用`vm._update()`传入`vnode`，利用基于`snabbdom`的`patch()`方法改造的生成真实DOM节点并渲染页面。
### （4）更新真实DOM
根据比对的结果，Vue会将差异应用到真实DOM上，只有发生变化的部分会被更新，而不是重新渲染整个DOM树。

**注意的是**，初次渲染时，调用`vm.__patch__(containe, vnode)`，生成真实的DOM结构渲染到容器中。re-render时（二次渲染时），调用`vm.__patch__(vnode, newVnode)`利用`diff`算法对比`新旧vnode`之间的差异，生成需要更新的`真实DOM`，渲染到容器的对应位置。
## 10. vuex是什么？
### （1）vuex官方解释
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用<strong>集中式存储管理</strong>应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
### （2）为什么要使用Vuex?
举例，比如一个公共组件，A要用它，B要用它，但是每个页面的轮播时间都不一样，又不能去改这个公共组件。
当我们使用 Vue.js 来开发一个单页应用时，经常会遇到一些组件间共享的数据或状态，或是需要通过 props 深层传递的一些数据。在应用规模较小的时候，我们会使用 props、事件等常用的父子组件的组件间通信方法，或者是通过事件总线来进行任意两个组件的通信。但是当应用逐渐复杂后，问题就开始出现了，这样的通信方式会导致数据流异常地混乱。
### （3）什么情况下使用vuex?
Vuex 可以帮助我们管理共享状态，并附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 store 模式就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。

### （4）vuex有哪些属性？(重点)
![vuex图解](@alias/vuex.png)
Store:是一个大容器，包含以下所有的内容；
- state：用来读取状态，存放公共数据的地方；(附带mapState辅助函数)，使用时通过 $store.state.counter 即可拿到状态信息
- getter：用来读取派生状态，获取根据业务场景处理返回的数据；(附带mapGetters辅助函数)，类似于计算属性，在数据展示前进行一些变化处理，具有缓存功能，能够提高运行效率
- mutations：用于同步提交状态变更，唯一修改state的方法；(附带mapMutations辅助函数)，先拿到store对象，然后通过commit提交mutations中的方法。使用时，`this.$store.commit('mutations中的方法','参数')`
- action：用于处理异步变更状态，通过分发操作触发action的方法；mutations在处理异步操作时，能够引起页面的响应式变化，但是 devtools 无法进行监听。建议在action操作，这样 devtools 就能够进行跟踪。组件使用时，调用：`this.$store.dispatch('方法名称','参数')`
- module：给store划分模块，减少代码臃肿，方便维护代码；
- [推荐详细复习链接](https://blog.csdn.net/A____t/article/details/124541435)

对于小型项目，Vuex 过于复杂或不必要，可以考虑：


**Vue.js 的本地状态（Local State）**：Vue.js 本身提供了一种简单的方式来管理组件的本地状态。你可以在组件中使用 data、computed、methods 等选项来管理组件内部的状态。这种方式更加轻量级，适用于小型项目或组件级别的状态管理。

**Event Bus 模式**：Event Bus 是一种简单的跨组件通信方式。你可以创建一个事件总线，并在需要通信的组件间触发和监听事件。这样可以在不引入全局状态管理的情况下实现组件之间的通信。

**Vue Composition API（组合式 API）**：Vue 3 中引入的 Composition API 可以帮助你更方便地组织和管理组件中的状态和逻辑。你可以使用 reactive、ref、computed 等 API 在组件内部管理状态，避免了全局状态管理的复杂性。

**简化版本的状态管理库**：如tinyx、vuesion 等。这些库提供了更轻量级的状态管理解决方案，适用于小型项目。
### （5）vuex和pinia的区别
 - **性能差异**：在性能方面，Pinia相对于Vuex来说更加高效。Pinia采用了Proxy实现，可以实现更细粒度的状态变更追踪，避免了不必要的重新渲染。而Vuex采用了Vue的响应式系统，进行状态的跟踪和更新。
 - **TypeScript 支持**：Vuex在对TypeScript的支持上相对较弱，需要额外添加类型声明文件来实现类型检查和推导。Pinia在设计之初就天然支持TypeScript，并提供了更好的类型推导和开发体验。
 - **属性不一样**：pinia它没有mutation, 他只有state，getters，action【同步、异步】使用他来修改state数据
 - **pinia更加轻量级，更加灵活**：Pinia 提供了更加灵活的状态管理方式，因为它支持多个 store 实例，而 Vuex 只支持一个 store 实例。
 - **插件体系和生态**：Vuex拥有丰富的插件体系，可以用于扩展和增强Vuex的功能。相对于Vuex，Pinia的插件和生态系统相对较小。
 - **pinia支持多个 store 实例**：pinia没有modules配置，每一个独立的仓库都是definStore生成出来的

## 11. 说说vue-router的使用，讲一下路由钩子函数，beforeEach的实现原理
 - **beforeEach**: 全局前置守卫。在每个路由导航之前被调用，可以用来进行全局的导航守卫逻辑，例如身份验证、权限控制等。如果在 beforeEach 中调用 next()，则路由导航会继续进行；如果传递参数或调用 next(false)，则导航会中断。场景：在每次路由跳转之前，需要进行用户是否登录的验证或者判断用户权限等操作。如果用户未登录或权限不足，可以在此处将其重定向到登录页或者其他指定路由。
 - **beforeResolve**: 全局解析守卫。在每个路由导航被确认之前被调用，和 beforeEach 类似，但在组件内的守卫和异步路由组件被解析之后才会被调用。
 - **afterEach**: 全局后置钩子。在每个路由导航成功完成之后被调用，无论是跳转成功还是中断。场景：在每次路由跳转之后，需要进行一些额外的操作，例如记录用户的访问日志，发送统计数据等。
 - **beforeEnter**: 路由独享守卫。可以在单个路由配置中定义，只在该路由被激活时调用。可以用来实现特定路由的导航守卫逻辑。对于某个特定的路由，需要进行个别的前置拦截和验证，可以使用beforeEnter来定义钩子函数。
 - **beforeRouteEnter**: 组件内守卫。在路由进入组件之前被调用，此时组件实例还未被创建，因此无法访问组件实例的数据和方法。可以使用 next(vm => {}) 来访问组件实例。
 - **beforeRouteUpdate**: 组件内守卫。在当前路由改变，但是该组件被复用时被调用，可以用于对路由参数的变化进行响应，例如从 /user/1 导航到 /user/2。。
 - **beforeRouteLeave**: 组件内守卫。在离开当前路由时被调用，可以用来弹出确认提示框或者保存数据等操作。。
## 12. 说一下vue mixin的用法 好处和优点

## 13. vue的nextTick原理

nextTick的回调函数在下一次DOM更新循环结束执行回调，用于获取更新后的DOM；

vue中的数据更新是异步的，使用nextTick可以保证拿到更新后的数据做逻辑处理；

例如修改了三个变量，是每修改一次，DOM就更新一次吗？不是的，Vue采用的是异步更新的策略，通俗点说就是，同一事件循环内多次修改，会统一进行一次视图更新。

事件循环说明：简单来说，vue在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。

只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
所以为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

## 14. vue2中computed和watch的区别

### （1）computed

惰性求值；computed的值在getter执行后是会被缓存的。如果所依赖的数据发生改变时候，就会重新调用getter来计算最新的结果。

而且计算属性的值是会被缓存的，只有当依赖的响应式数据更新后才会被重新计算求值。

- 它支持缓存，只有依赖的数据发生了变化，才会重新计算
- 不支持异步监听，当Computed中有异步操作时，无法监听数据的变化
- computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed
- 如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。

### （2）watch

watch用于侦听data的数据。watch属性可以是字符串、函数、对象、数组

当data数据发生变化，执行函数。在函数中会传入newVal和oldVal两个参数。

这因为watch不会监听第一次变化，可以通过immediate：true开启

监听数据必须是data中声明的或者父组件传递过来的props中的数据，当发生变化时，会触发回调函数，该函数拥有deep，immediate两属性：

- 当deep：true 会监听到obj对象的所有内部属性，默认值为false；深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep无法监听到数组和对象内部的变化。
- 当 immediate：true 时，回调函数会在监听开始后立刻执行，可以监听到到第一次变化。

它不支持缓存，数据变化时，它就会触发相应的操作

支持异步监听

### （3）watch和computed的区别

- watch可以异步，computed不支持异步
- watch没有依赖缓存特性，computed有缓存机制，惰性计算，当依赖的数据更新时才会执行getter函数
- watch一对多；computed多对一或一对一
- watch有两个参数和两个属性，computed通过get和set



## 15. vue2中watch和computed的生命周期阶段

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

![父子声明周期图解](@alias/image-20220217154607121.png)

## 16. vue手写自定义指令，说说如何实现的

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




## 17. vue的动态指令和参数

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

## 18. vue的双向绑定原理
- [vue2双向绑定原理](/front/vue/vue-response-principle.html)
- [手写双向绑定原理](/front/vue/v-model.html)
