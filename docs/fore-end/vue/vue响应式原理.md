# vue2响应式原理

对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持，数组则是通过重写数组方法来实现。

每个属性都拥有自己的dep属性，存放他所依赖的 watcher（依赖收集），当属性变化后调用notify()，通知自己依赖的 watcher 去更新视图(派发更新)。

## 一、了解vue2响应式原理

```js
<div id="app">
	{{message}}
    {{message}}
	{{message}}
	{{name}}
</div>

data() {
    return {
        message: "你好你好！"
        name: "小明"
    }
}
```

1. app的message修改了，vue内部是如何监听message数据的改变？

   > vue通过Object.defineProperty 监听对象属性的改变。（数据劫持）

2. 当数据发生改变，vue是如何知道要通知哪些地方，界面需要更新？

   > 通过发布订阅者模式。（谁用谁需要更新）

3. 图解释

![image-20211128215518827](@alias/image-20211128215518827.png)

4. 画图笔记

   ![vue响应式原理画图笔记](@alias/vue响应式原理画图笔记.png)



## 二、源码

```html
<div id = "app">
	<input type="text" v-model="message">{{message}}
</div>
```

```js
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '各位在座的都是大神！！'
      name: '晚上好！'
    }
  })
</script>
```



### 1. 创建Vue类

```js
//  new Vue() ,创建一个类Vue
class Vue {
    constructor(options) {
        // 1. 保存数据
        this.$options = options
        this.$data = options.data
        this.$el = options.el
        
        // 2. 将data添加到响应式系统中
        new Observer(this.$data)
        
        // 3. 代理this.$data的数据
        Object.keys(this.$data).forEach(key => {
            this._proxy(key)
        })
        
        // 4.处理el
        new Compiler(this.$el, this)
    }
    
    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get() {
                return this.$data[key]
            },
            set(newValue) {
                this.$data[key] = newValue
            },
        })
    }
}
```



### 2. 创建Observer类

```js
class Observer {
    constructor(data) {
        this.data = data
        
        Object.keys(data).forEach(key => {
            this.defineReactive(this.data, key, data[key])
        })
    }
    // vue2通过defineProperty实现响应式;vue3通过Proxy
    defineReactive(data, key, val) {
        // 一个属性key，对应Dep对象
        const dep = new Dep()  // dep里面有很多Watcher,一旦调用notify(),会遍历所有watcher,并且执行update方法
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if(Dep.target) {
                    //  dep.addSub(Dep.target = Watcher)
                    //  把每次监听到的值赋给dep
                    dep.addSub(Dep.target)
                }
                return val
            }
            // 
            set(newValue) {
            	// 如果修改的值和之前的一样，不做响应式
            	if(newValue === val) {
                    return
                }
            	val = newValue
            	// 通知所有watch更改值
            	dep.notify()
      		}
        })
    }
}
```



### 3. 创建Dep类（订阅发布者模式）

```js
class Dep {
    constructor() {
        this.subs = []
    }
    
    addSub(sub) {
        // 添加订阅者
        this.subs.push(sub)
    }
    
    // 通知所有订阅者更新数据
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
```



### 4. 创建Compiler类

```js
class Compiler {
    // constructor(#app, this), this为vue实例
    constructor(el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm
        
        // 创建片段, 为了和所有的DOM元素建立一一对应关系
        
        this.flag = this._createFragment()
        // 把frag追加到el
        this.el.appendChild(this.flag)
    }
    
    _createFragment() {
        // 创建片段,也就是节点操作，里面有很多child(节点),如果需要修改child()节点的值，直接用child.noteValue = '修改的值'
        const frag = document.createDocumentFragment()
        
        let child
        // this.el.firstChild为node节点
        while (child = this.el.firstChild) {
            // 真正对节点解释的是_complie函数，例如解释<h2>{{message}}</h2><p></p>等等
            this._compile(child)
            // 遍历所有的节点，并且把节点追加到frag里面
            frag.appendChild(child)
        }
        return frag
    }
    // 如果是文本节点 <h2>{{message}}</h2>, 用到正则表达式regular expression ( regex )
    // .*匹配任意内容
    // .只匹配一个任意内容
    // .+匹配1个或者多个
    // {} 在正则中有特殊意义，需要转义，\表示转义
    // /\{\{(.+)\}\}/
    const reg = /\{\{(.+)\}\}/
    // $1拿到(.+)的东西，也即是变量的名字

    _compile(node) {
        // 如果是标签节点
        if (node.nodeType === 1) {
            // 实现双向绑定
            const attrs = node.attributes
            if (attrs.hasOwnProperty('v-model')) {
                // 如果有v-model标签，把节点的名字赋给name
                const name = attrs['v-model'].nodeValue
                // 给该节点增加一个监听器，并且把值赋给data里的vm
                node.addEventListener('input', e => {
                    this.vm[name] = e.target.value
                    // vm改变了，会调用notify通知所有的watcher
                }
            }
        }
        // 如果是文本节点
        if (node.nodeType === 3) {
            if (reg.test(node.nodeValue)) {
                const name = RegExp.$1.trim()
                // 把node(child节点)，name, 和this.vm（vue实例） 
                new Watcher(node, name, this.vm)
            }
        }
    }
}
```

### 5. 创建Watcher类

```js
class Watcher {
    constructor(node, name, vm) {
        this.node = node
        this.name = name
        this.vm = vm
        // 将watcher对象this指向target,所以target对象就是Watcher对象
        Dep.target = this
        this.update()
        // 后面会有其他的watcher，所以这里把watcher变为空，前面的watcher已经追加到dep里面了。
        Dep.target = null
    }
    
    update() {
        // this.拿到最新的
        // this.vm[this.name]取属性会调用get方法，回到defineReactive里调用get方法，把创建的Watcher追加到dep里
        this.node.nodeValue = this.vm.$data[this.name]
    }
}
```

## 三、vue3响应式原理

`vue3`通过`Proxy`监听数据的变化，使用Map收集属性相关依赖，保存在weakMap，Proxy监听变化，通过weakMap.get拿到变化的数据，用forEach执行依赖的所有函数

`vue2`通过`Object.defineProerty`监听数据的变化和收集相关依赖


<ClientOnly>
  <Valine></Valine>
</ClientOnly>