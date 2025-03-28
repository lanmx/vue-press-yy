---
title: vue2 vue3双向绑定原理 | 手写双向绑定原理
meta:
  - name: description
    content: vue2 vue3 双向绑定原理 简单实现双向绑定原理
  - name: keywords
    content: vue2 vue3 双向绑定原理 简单实现双向绑定原理
---

## 一、双向绑定原理-简单实现
![](@alias/1679722479718.jpg)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  修改名字：<input type="text" id="id-input"><br>
  <div id="id-div"></div>
</body>
<script>
  let user = {}
  let input = document.querySelector('#id-input');
  let text = document.querySelector('#id-div')

  // 数据到视图的更新 Model => view
  Object.defineProperty(user, 'name', {
    get: function() {
      console.log('获取user的name：', this, this._name);
      return this._name
    },
    set: function(value) {
      console.log('设置user的name为: '+ value);
      this._name = value
      text.textContent = this._name
    }
  })

  // 视图到数据的更新 View => Model
  input.addEventListener('input', function(e) {
    user.name = e.target.value
    console.log('监听器中的user的name设置为：' + user.name);
  })
  console.log(user,"****");

</script>
</html>
```

## 二、双向绑定原理-vue2
![](@alias/1679722611454.jpg)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <title>vue2的v-model和v-text的实现</title>
    <h1>昵称</h1>
    <div v-text="nickname"></div>
    <input type="text" v-model="nickname">
    <h1>年龄</h1>
    <div v-text="age"></div>
    <input type="text" v-model="age">
  </div>
</body>
<script>
// 1. 定义一个Vue类
class Vue {
  constructor({ el, data }) {
    this.$el = document.querySelector(el);
    this.$data = data || {};
    // 订阅每个key(订阅管理器)
    this.$directives = {};
    this.Observe(this.$data);
    this.Compile(this.$el);
  }
  // 设置指令,设置每个订阅者
  setDirective(node, key, attr) {
    const watcher = new Watcher({node, key, attr, data: this.$data });
    if(this.$directives[key]) {
      this.$directives[key].push(watcher);
    } else {
      this.$directives[key] = [watcher]
    }
  }
  // 观察者
  Observe(data) {
    const _this = this
    for(const key in data) {
      // 在vue内部使用的是发布订阅模式，其中observe方法设置需要观察（监听）的数据
      // complice方法遍历dom节点（解析指令），拿到指令绑定的key,再根据key设置需要观察的数据何订阅管理器
      // 在执行new Vue操作的时候传入el(需要挂载到的DOM id)和data(绑定的数据)
      let value = data[key];
      if(typeof value === 'object') this.Observe(value);
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          return value
        },
        set: function(newVal) {
          if(newVal === value) return
          value = newVal
          console.log("设置最新的值：", value);
          // 监听到值改变后更新对应指令的数据
          _this.$directives[key].forEach(fn => {
            fn.update();
          })
          console.log(data);
        }
      })
    }
  }

  // 编译函数
  Compile(dom) {
    // 解析器：遍历拿到dom上的指令（这里其实是把指令当做自定义属性来处理）
    const _this = this;
    // 正则匹配{{xx}}的xx
    const reg = /\{\{(.*)\}\}/;
    // 节点集
    const nodes = dom.childNodes;
    // node是类数组对象不能用es6迭代器，需要转换数据
    Array.from(nodes).forEach(node => {
      // 如果还有子项，继续递归
      if(node.childNodes.length) _this.Compile(node)
      // 本例中使用nodeType来判断是什么类型：
      // 如nodeType为3表示node的子节点有且仅有一个文本类型，也就是{{ xxx }}
      if(node.nodeType === 3) {
        // /\{\{(.*)\}\}/.test('{{xxx}}') true：如果匹配到{{}}，正则返回true
        if(reg.test(node.nodeValue)) {
          // $1获取reg匹配到的第一个值
          const key = RegExp.$1.trim()
          _this.setDirective(node, key, 'nodeValue')
        }
      }
      if(node.nodeType === 1) {
        // 判断是否存在属性v-text
        if(node.hasAttribute('v-text')) {
          // 获取属性值的key, 例如class属性的key为content（class="content"）
          const key = node.getAttribute('v-text');
          // 移出node上自定义属性
          node.removeAttribute('v-text');
          _this.setDirective(node, key, 'textContent');
        }
        // 判断是否存在属性v-model 且node必须是input标签
        if(node.hasAttribute('v-model') && node.tagName === 'INPUT') {
          const key = node.getAttribute('v-model');
          node.removeAttribute('v-model');
          _this.setDirective(node,key,'value');
          // 设置input事件监听
          node.addEventListener('input', e => {
            _this.$data[key] = e.target.value
          })
        }
      }
    })
  }
}

// Watcher构造函数
class Watcher {
  // node: 对应指令的node节点
  // key：监听的数据data对应的key
  // attr：绑定的html原生属性，本例v-text对应textContent
  // data：监听的数据
  constructor({ node, key, attr, data}) {
    this.node = node;
    this.key = key;
    this.attr = attr;
    this.data = data;
    // 更新初始化数据
    this.update()
  }
  update() {
    this.node[this.attr] = this.data[this.key]
  }
}

// Vue2实例
new Vue({
  el: '#app',
  data: {
    nickname: 'lanmx',
    age: 18
  }
})
</script>
</html>
```

## 三、双向绑定原理-vue3
![](@alias/1679722889416.jpg)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <title>vue3数据双向绑定：v-model和v-text的实现</title>
    <h1>昵称</h1>
    <div>{{ nickname }}</div>
    <div v-text="nickname"></div>
    <input type="text" v-model="nickname">
    <h1>年龄</h1>
    <div>{{ age }}</div>
    <div v-text="age"></div>
    <input type="text" v-model="age">
  </div>
</body>
<script>
// 1. 定义一个Vue类
class Vue {
  constructor({ el, data }) {
    this.$el = document.querySelector(el);
    this.$data = data || {};
    // 订阅每个key(订阅管理器)
    this.$directives = {};
    this.Observe(this.$data);
    this.Compile(this.$el);
  }
  // 设置指令,设置每个订阅者
  setDirective(node, key, attr) {
    const watcher = new Watcher({node, key, attr, data: this.$data });
    if(this.$directives[key]) {
      this.$directives[key].push(watcher);
    } else {
      this.$directives[key] = [watcher]
    }
  }
  // 观察者
  Observe(data) {
    const _this = this;
    this.$data = new Proxy(data, {
      get(target, key) {
        return target[key]
      },
      set(target, key, value) {
        // Reflect.set: 
        // 参数
        // target设置属性的目标对象。propertyKey设置的属性的名称。value设置的值。receiver如果遇到 setter，this 将提供给目标调用。
        // 返回值
        // 返回一个Boolean值表明是否成功设置属性
        const status = Reflect.set(target, key, value);
        if(status) {
          _this.$directives[key].forEach(fn => {
            fn.update()
          })
        }
        return status
      }
    })
  }

  // 编译函数
  Compile(dom) {
    // 解析器：遍历拿到dom上的指令（这里其实是把指令当做自定义属性来处理）
    const _this = this;
    // 正则匹配{{xx}}的xx
    const reg = /\{\{(.*)\}\}/;
    // 节点集
    const nodes = dom.childNodes;
    // node是类数组对象不能用es6迭代器，需要转换数据
    Array.from(nodes).forEach(node => {
      // 如果还有子项，继续递归
      if(node.childNodes.length) _this.Compile(node)
      // 本例中使用nodeType来判断是什么类型：
      // 如nodeType为3表示node的子节点有且仅有一个文本类型，也就是{{ xxx }}
      if(node.nodeType === 3) {
        // /\{\{(.*)\}\}/.test('{{xxx}}') true：如果匹配到{{}}，正则返回true
        if(reg.test(node.nodeValue)) {
          // $1获取reg匹配到的第一个值
          const key = RegExp.$1.trim()
          _this.setDirective(node, key, 'nodeValue')
        }
      }
      if(node.nodeType === 1) {
        // 判断是否存在属性v-text
        if(node.hasAttribute('v-text')) {
          // 获取属性值的key, 例如class属性的key为content（class="content"）
          const key = node.getAttribute('v-text');
          // 移出node上自定义属性
          node.removeAttribute('v-text');
          _this.setDirective(node, key, 'textContent');
        }
        // 判断是否存在属性v-model 且node必须是input标签
        if(node.hasAttribute('v-model') && node.tagName === 'INPUT') {
          const key = node.getAttribute('v-model');
          node.removeAttribute('v-model');
          _this.setDirective(node,key,'value');
          // 设置input事件监听
          node.addEventListener('input', e => {
            _this.$data[key] = e.target.value
          })
        }
      }
    })
  }
}

// Watcher构造函数
class Watcher {
  // node: 对应指令的node节点
  // key：监听的数据data对应的key
  // attr：绑定的html原生属性，本例v-text对应textContent
  // data：监听的数据
  constructor({ node, key, attr, data}) {
    this.node = node;
    this.key = key;
    this.attr = attr;
    this.data = data;
    // 更新初始化数据
    this.update()
  }
  update() {
    this.node[this.attr] = this.data[this.key]
  }
}

new Vue({
  el: '#app',
  data: {
    nickname: 'lanmx',
    age: 18
  }
})
</script>
</html>
```


<ClientOnly>
  <Reward />
</ClientOnly>

<ClientOnly>
  <Valine></Valine>
</ClientOnly>