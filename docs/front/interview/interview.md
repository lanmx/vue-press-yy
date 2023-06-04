---
sidebar: 'auto'
---

## 1. js精度丢失

```js
parseFloat(num.toPrecision(12))
```

## 2. 防抖和节流

- 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
- 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

### （1）防抖

事件响应函数在一段时间后才执行，如果在这段时间内再次调用，则重新计算时间；当预定的时间内没有调用该函数，则执行；

```js
// true为立即执行
function debounce(fn,dalay,immediate) {
    let timer;
    return function() {
        clearTimeout(timer)
        if(immediate) {
            fn.apply(this, arguments)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, delay)
        }
        
    }
}
```

### （2）节流

```js
  const throttled = function (fn, delay) {
    let timer = null
    return function() {
      if(!timer) {
        timer = setTimeout(() => {
          fn.call(this, arguments)
          timer = null
        }, delay)
      }
    }
  }
```

### （3）应用

防抖在连续的事件，只需触发一次回调的场景有：

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小`resize`。只需窗口调整完成后，计算窗口大小。防止重复渲染。

节流在间隔一段时间执行一次回调的场景有：

- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能

### （4）实操代码

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .class-style {
      width: 100%; 
      height: 60px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div>
    <div onmouseover="over()" class="class-style" style="background-color: tomato; ">onmouseover</div>
    <div onmouseout="out()" class="class-style" style="background-color: yellow; ">onmouseout</div>
    <div onmouseleave="leave()" class="class-style" style="background-color: burlywood; ">onmouseleave</div>
    <div onmouseenter="enter()" class="class-style" style="background-color: paleturquoise; ">onmouseenter</div>
    <div id="dom" onmousemove="move()" class="class-style" style="background-color: pink; "></div>
    <div id="dom2" onmousemove="move2()" class="class-style" style="background-color: yellowgreen; "></div>
    <div id="dom3" onmousemove="move3()" class="class-style" style="background-color: plum; "></div>
    <div id="dom4" onmousemove="move4()" class="class-style" style="background-color: paleturquoise; "></div>
  </div>
</body>
<script>
  // 节流: 时间截的方法: 事件停止触发不再执行
  const throttled1 = function (fn, delay) {
    let oldTime = Date.now()
    return function() {
      let newTime = Date.now()
      if(newTime - oldTime > delay) {
        fn.call(this, arguments)
        oldTime = Date.now()
      }
    }
  }
   // 节流: 定时器的方法：第二次事件停止触发，依然会再执行一次
  const throttled2 = function (fn, delay) {
    let timer = null
    return function() {
      if(!timer) {
        timer = setTimeout(() => {
          fn.call(this, arguments)
          timer = null
        }, delay)
      }
    }
  }
  // 节流：时间戳 + 定时器，实现一个更加精确的节流
  const throttled3 = function (fn, delay) {
    let timer = null
    let oldTime = Date.now()
    return function () {
      let newTime = Date.now()
      clearTimeout(timer)
      if(newTime - oldTime > delay) {
        fn.call(this, arguments)
        oldTime = Date.now()
      } else {
        timer = setTimeout(fn, newTime - oldTime)
        // timer = setTimeout(() => {
        //   fn.call(this, arguments)
        // }, newTime - oldTime)
      }
    }
  }
  // 防抖
  const debounce = function (fn, delay, immediate) {
    let timer = null
    return function() {
      if(timer) clearTimeout(timer)
      if(immediate) {
        // 立即执行
        // 第一次会立刻执行，以后只有在事件执行后才会再次触发
        let callnow = !timer
        timer = setTimeout(() => {
          timer = null
        }, delay)
        if(callnow) {
          fn.apply(this, arguments)
        }
      } else {
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, delay)
      }
    }
  }
  let count = 0
  const over = function() {
    console.log(this)
    console.log("over")
  }
  const out = function() {
    console.log(this)
    console.log("out")
  }
  const leave = function() {
    console.log(this)
    console.log("leave")
  }
  const enter = function() {
    console.log(this)
    console.log("enter")
  }
  const move = debounce(function() {
    count++
    let dom = document.getElementById('dom')
    dom.innerHTML = '鼠标移动防抖：' + count
    console.log(count)
    // console.log(this)
  }, 500)
  const move2 = throttled1(function() {
    count++
    let dom = document.getElementById('dom2')
    dom.innerHTML = '鼠标移动时间戳节流：' + count
  }, 500)
  const move3 = throttled2(function() {
    count++
    let dom = document.getElementById('dom3')
    dom.innerHTML = '鼠标移动定时器节流：' + count
  }, 500)
  const move4 = throttled3(function() {
    count++
    let dom = document.getElementById('dom4')
    dom.innerHTML = '鼠标移动时间戳 + 定时器节流：' + count
  }, 500)
</script>
</html>
```



## 4. vue中v-for的key用法和原理

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

## 5. 说说axios请求

## 6. eventBlus事件总线

## 7. 只用watch，不用computed监听对象

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



## 8. watch和computed的生命周期阶段

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

## 9. cookie

浏览器发起HTTP请求，服务器进行cookie设置，也就是Set-Cookie，Set-Cookie HTTP头作为请求的一部分，通过name=value形式存储在浏览器；每次发送HTTP请求的时候都会发送cookie到服务器；

说白了，cookie是保存在浏览器的，很不安全，然后就有了session会话。

session 是另一种记录服务器和客户端会话状态的机制，session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的cookie 中。

浏览器访问服务器就是会话的开始，服务器设定会话的结束时间和session ID，发送给浏览器，用户每次请求的时候都自动发送请求保存session的cookie，直到结束时间到了，需要重新登录。

SessionID 是连接 Cookie 和 Session 的一道桥梁。

![session.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/29/16f523a04d0b3cf5~tplv-t2oaga2asx-watermark.awebp)

缺点：大量用户登录的时候，服务器需要保存大量的session ID，如果有多台服务器，也需要服务器之间进行共享。

### （1）token

Token:  令牌， 是访问资源的凭证

Token的认证流程：

1. 用户输入用户名和密码，发送给服务器。

2. 服务器验证用户名和密码，正确的话就返回一个签名过的token（token 可以认为就是个长长的字符串），浏览器客户端拿到这个token。

3. 后续每次请求中，浏览器会把token作为http header发送给服务器，服务器验证签名是否有效，如果有效那么认证就成功，可以返回客户端需要的数据。

### （2）JSON Web Token （JWT）: 可解决跨域

用户登录可以用token来认证该用户是否登录。jwt也是经常作为一种安全的token使用。

JWT是`json web token`缩写。它将用户信息加密到token里，服务器不保存任何用户信息。服务器通过使用保存的密钥验证token的正确性，只要正确即通过验证。

- 服务器第一次登录网页，服务器会生成一个JWT，服务器不需要保存JWT，只需要保存JWT的签名
- 服务器将JWT发送给浏览器，可以让浏览器一cookie或者storage的形式保存下来
- 每次请求的时候浏览器会自动把JWT发送给浏览器，用户不用再次登录

JWT三部分组成：

[JWT 的数据结构](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

- header

  每个JWT都会带有头部信息，这里主要声明使用的算法。声明算法的字段名为alg，同时还有一个typ的字段，默认JWT即可。以下示例中算法为HS256

  ```js
  {  
      "alg": "HS256",   // 算法声明
      "typ": "JWT"   // 加密类型
  } 
  ```

- payload

  载荷即消息体，这里会存放实际的内容，也就是Token的数据声明，例如用户的id和name，默认情况下也会携带令牌的签发时间iat，通过还可以设置过期时间

  ```js
  {
    "sub": "1234567890",
    "name": "John Doe", // 用户名
    "iat": 1516239022,  // 签发时间
    "exp": 1816239022,  // 过期时间
  }
  ```

  > iss (issuer)： 签发人
  > sub (subject)： 主题
  > aud (audience)： 受众
  > exp (expiration time)： 过期时间
  > nbf (Not Before)： 生效时间，在此之前是无效的
  > iat (Issued At)： 签发时间
  > jti (JWT ID)： 编号

- signature

  签名是对头部和载荷内容进行签名，一般情况，设置一个secretKey，对前两个的结果进行HMACSHA25算法，公式如下：

  ```js
  Signature = HMACSHA256(base64Url(header)+.+base64Url(payload),secretKey)
  
  ```

  一旦前面两部分数据被篡改，只要服务器加密用的密钥没有泄露，得到的签名肯定和之前的签名不一致

![image-20220217165334264](@alias/image-20220217165334264.png)

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息Authorization字段里面。另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。

**JWT优缺点**

优点：

- json具有通用性，所以可以跨语言
- 组成简单，字节占用小，便于传输
- 服务端无需保存会话信息，很容易进行水平扩展
- 一处生成，多处使用，可以在分布式系统中，解决单点登录问题
- 可防护CSRF攻击

缺点：

- payload部分仅仅是进行简单编码，所以只能用于存储逻辑必需的非敏感信息
- 需要保护好加密密钥，一旦泄露后果不堪设想
- 为避免token被劫持，最好使用https协议



### （3）JWT和token的区别

token需要查库验证token 是否有效，而JWT不用查库或者少查库，直接在服务端进行校验，并且不用查库。因为用户的信息及加密信息在JWT的第二部分payload和第三部分签证中已经生成，只要在服务端进行校验判断签名是否正确就行，并且校验也是JWT自己实现的。

### （4）session、cookie、token区别

session时服务器生成的，服务器主导一切

cookie是保存session的载体，跟随HTTP请求发送出去

token是诞生在服务器，保存在浏览器，可以保存在cookie或者storage里面

[分清 Cookie、Session、Token、JWT](https://juejin.cn/post/6844904034181070861)

## 9. vue中如何收集依赖

每一个属性都有一个dep，存放所依赖的watcher，当属性变化后会通知对应的watcher去更新

在渲染的时候，get获取这个响应式数据，此时就会触发收集依赖的dep.depend()

当数据发生改变时，会触发watcher，通过dep.notify()去更新数据

## 10. 闭包的理解，应用场景？

防抖和节流用的闭包实现

```js
var fnArr = []
for(var i = 0; i < 10; i++) {
    fnArr[i] = function() {
        return i
    }
}
```

## 11. try...catch

## 12. vue2如何检测数组的变化

vue2没有用defineProperty对数组拦截，而是对数组重写，数组中如果是对象的数据类型，用defineProperty，再继续递归处理；数组的索引和长度是无法监控的；

## 13. Vue为什么要用虚拟DOM

减少DOM操作，提高性能

## 14. nextTick原理

nextTick的回调函数在下一次DOM更新循环结束执行回调，用于获取更新后的DOM；

vue中的数据更新是异步的，使用nextTick可以保证拿到更新后的数据做逻辑处理；

例如修改了三个变量，是每修改一次，DOM就更新一次吗？不是的，Vue采用的是异步更新的策略，通俗点说就是，同一事件循环内多次修改，会统一进行一次视图更新。

## 15. 树级结构转换为一维结构

手写代码，用两种解法实现

```js
  // 解法一：递归, 使用reduce + concat
  {
    let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
    const newArr = function(arr){
      return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
    }
    console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]
  }
  // 解法二：递归, 使用forEach + push
  {
    let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
    let newArr = []
    const flatArr = function(arr) {
      arr.forEach(item => {
        Array.isArray(item) ? flatArr(item) : newArr.push(item)
      })
    }
    flatArr(arr);
    console.log(newArr)
  }
  // 解法三：使用flat,es10语法
  {
    let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
    let flatArr = arr.flat(3)
    console.log(flatArr)
  }
```



## 16. webpack的热更新

`HMR`全称 `Hot Module Replacement`，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用

例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失

如果使用的是 `HMR`，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用

`webpack.config.js`配置

```js
const webpackMerge = require('webpack-merge')
const baseconfig = require('./base.config')
module.export = webpackMerge(baseconfig, module.export = {
  devServer: {
    contentBase: './dist',
    inline: true,
    hot: true // 开启热更新
  }
})
```

通过上述这种配置，如果我们修改并保存`css`文件，确实能够以不刷新的形式更新到页面中

但是，当我们修改并保存`js`文件之后，页面依旧自动刷新了，这里并没有触发热模块

所以，`HMR`并不像 `Webpack` 的其他特性一样可以开箱即用，需要有一些额外的操作

`./src/index.js`配置

```js
// ...
if (module.hot) {
  module.hot.accept(['./content.js'], () => {
    render()
  })
}
```

![core](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxOS85LzIvMTZjZjIwMzgyNDM1OTM5Nw?x-oss-process=image/format,png)

如上图所示，右侧Server端使用webpack-dev-server去启动本地服务，内部实现主要使用了webpack、express、websocket。

使用express启动本地服务，当浏览器访问资源时对此做响应。
服务端和客户端使用websocket实现长连接
webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。

每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
编译完成后通过socket向客户端推送当前编译的hash戳
客户端的websocket监听到有文件改动推送过来的hash戳，会和上一次对比

一致则走缓存
不一致则通过ajax和jsonp向服务端获取最新资源
使用内存文件系统去替换有修改的内容实现局部刷新

## 17. webpack proxy代理

（本地开发请求另一个服务器的资源会因为浏览器安全策略的问题跨域，可以利用中间服务器实现代理，把请求转交给代理服务器，代理服务器响应请求，并把请求转交给目标服务器，目标服务器响应数据后返回给代理服务器，代理服务器再转交给本地。解决浏览器跨域的问题。）

`webpack proxy`，即`webpack`提供的代理服务

基本行为就是接收客户端发送的请求后转发给其他服务器

其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）

想要实现代理首先需要一个中间服务器，`webpack`中提供服务器的工具为`webpack-dev-server`

`proxy`工作原理实质上是利用`http-proxy-middleware` 这个`http`代理中间件，实现请求转发给其他服务器。

### webpack-dev-server

`webpack-dev-server`是 `webpack` 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起

```js
const path = require('path')

module.exports = {
    // ...
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://langding.fandow.com/', // 接口域名
				changeOrigin: true, // 请求头中host会设置成target 可通过request.getHeader("Host")拿到真实的接口域名
				ws: true, // 代理websocket
				rewrite: pathStr => pathStr.replace("/api", ""), // 重写路径
            }
        }
        // ...
    }
}

```

- target：表示的是代理到的目标地址
- pathRewrite：默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite
- secure：默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
- changeOrigin：它表示是否更新代理后请求的 headers 中host地



在开发阶段， `webpack-dev-server` 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 `localhost`的一个端口上，而后端服务又是运行在另外一个地址上

所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题

通过设置`webpack proxy`实现代理请求后，相当于浏览器与服务端中添加一个代理者

当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地

![img](https://static.vue-js.com/65b5e5c0-ace5-11eb-85f6-6fac77c0c9b3.png)

在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据

注意：**服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制**





```js
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/ba
```



## 18. css垂直居中

- 父元素没有高度，可以用margin

- 父元素有高度，可以用line-height等于父元素高度；如果用p标签则需要把margin: 0；因为p标签默认有margin值；line-height适用控制单行文字

- 父元素有固定高度，有多行文字，可以给父元素设置弹性布局；

  ```js
  display: flex;
  justify-content: center;
  align-items: center;
  ```

  

- ul li标签的标题可以用table，建议用flex

  ```js
  ul {
      display: table
  }
  li {
      display: table-cell;
      vertical-align: middle
  }
  ```

- grid建议用来做多行多列布局

  ```js
  ul {
      display: grid;
     justify-content: center;
     align-items: center;
  }
  ```
  


## 19. flex

- 父元素开启flex

```css
display:flex
display:inline-flex  行内元素
```

### 父元素属性

### （1）flex-direction

- 主轴叉轴方向 main cross

```css
flex-direction: row/row-reverse,主轴方向改变
flex-direction: coloum/coloum-reverse,从下到上
```

### （2）justify-content（main方向）

-   justify-content: space-evenly

![image-20220219105746261](@alias/image-20220219105746261.png)

- justify-content: space-between;

![image-20220219105759918](@alias/image-20220219105759918.png)

- justify-content: space-around;

![image-20220219105818974](@alias/image-20220219105818974.png)

- justify-content: center;

![image-20220219110001845](@alias/image-20220219110001845.png)

![image-20220219105933768](@alias/image-20220219105933768.png)

### （3）align-items（单行）（cross方向）

决定了flex items在cross axios的对齐方式

- normal(类似stretch)：拉伸
- flex-start
- flex-end
- center
- baseline以基准线对齐，第一行为准，例如文字第一行文字对齐

### （4）align-content（多行）（cross方向）

- flex-start

- flex-end

- center

- space-between

- space-evenly

- space-around

### （5）flex-wrap

- wrap
- nowrap

### 项目属性

flex是flex-grow（放大），flex-shrink（缩小），flex-basis（宽度）三个属性值的缩写

默认值为 flex: 0 1 auto; 后两个属性可选 

### （1）order

从大到小排序

### （2）align-self

align-self:  flex-end覆盖flex-container的align-items

### （3）flex-grow

均设1，则扩大，总和大余1，则平均，按比例扩大

### （4）flex-shrink

按比例缩小

### （5）flex-basis

flex-basis的优先级高于width



## 20. rem和em

在css中单位长度用的最多的是px、em、rem，这三个的区别是：

- px是固定的像素，px是相对长度单位，它是相对于显示器屏幕分辨率而言的，比较稳定和精确，但在浏览器中放大或缩放浏览页面时会出现页面混乱的情况，一旦设置了就无法因为适应页面大小而改变。

- em是相对长度单位，em是相对于父元素来设计字体大小的。如果当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺；em的值并不是固定的，它会继承父级元素的字体大小。

- rem是CSS3新增的一个相对单位，rem是相对单位，是相对HTML根元素。

  这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

- em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。对于em和rem的区别一句话概括：em相对于父元素，rem相对于根元素。

rem中的r意思是root（根源），这也就不难理解了。

默认的情况下：1em=16px

## 21. 手写自定义指令，说说如何实现的

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



## 22. vue的SSR是什么？作用

`SSR`就是服务端渲染

基于`nodejs serve`服务环境开发，所有`html`代码在服务端渲染

数据返回给前端，然后前端进行“激活”，即可成为浏览器识别的html代码

`SSR`首次加载更快，有更好的用户体验，有更好的seo优化，因为爬虫能看到整个页面的内容，如果是vue项目，由于数据还要经过解析，这就造成爬虫并不会等待你的数据加载完成，所以其实Vue项目的seo体验并不是很好



## 23. 路由有哪些模式呢？又有什么不同呢？

- hash模式：通过`#号`后面的内容的更改，触发`hashchange`事件，实现路由切换
- history模式：通过`pushState`和`replaceState`切换url，实现路由切换，需要后端配合

## 24. 动态指令和参数

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



*字节一轮面试---start*

## 25. 手写双向绑定原理

emmm

## 26. 微任务宏任务代码面试题

写出输出打印顺序，并解释为什么

```js
  setTimeout(() => {
    console.log('9)
  },10)
  new Promise((resolve,reject) => {
    // resolve前面是同步任务
    console.log(7)
    setTimeout(() => {
      console.log(8)
      resolve()
    },0)
  }).then(() => {
    console.log(6)
  })

  setTimeout(() => {
    console.log(5)
  },0)

  // await后面才是异步，紧跟的函数foo2返回的不是new promise, 因此不是异步
  async function foo1 () {
    console.log(1)
    await foo2()
    console.log(3)
  }
  function foo2() {
    console.log(2)
  }
  foo1()
  console.log(4)
```

## 27. node的事件循环

## 28. Vue的watch实现原理

## 29. Vue2、vue3的响应式原理和区别

## 30. 浏览器从输入url到页面加载完成发生了什么

涉及内容很广，网址dns解析，HTTP缓存机制，服务端和客户端的TCP链接（三次握手），HTTP请求；css，js，html文件资源解析，构建DOM树，四次挥手

## 31.  算法题

请手写一个函数，第一个参数为二维数组，第二个参数为一个数字；

若在数组里找到该数字则输出true，否则输出false

二维数组的特点：每一行的数字递增，每一列的数字递减；

*（请根据二维数组特点写，不能使用暴力解法）*

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```

*字节一轮面试---end*



## 32. undefined和null的区别

定义

- undefined：是所有没有赋值变量的默认值，自动赋值


- null：主动释放一个变量引用的对象，表示一个变量不再指向任何对象地址



1. undefined和null都是原始类型，保存在栈中变量本地
2. undefined表示声明了变量，但是没有对该变量赋值
3. null表示不存在，是人为进行赋值的。比如某个函数或者数组等等复杂类型，你如果想要进行一个舍弃，可以把它赋值为null，此时GC会进行一个回收。一般用于主动释放指向对象的引用。
4.  他们两个是基本相等的，但是不全等。
5. undefined表示 “缺少值”，就是此处应该有一个值，但是还没有定义。典型用法是：
   - 变量被声明了，但没有赋值时，就等于 undefined
   - 调用函数时，应该提供的参数没有提供，该参数等于 undefined
   - 对象没有赋值的属性，该属性的值为 undefined
   - 函数没有返回值时，默认返回 undefined

5. null用来表示尚未存在的对象，常用来表示函数返回一个不存在的对象。典型用法是：
   - 作为函数的参数，表示该函数的参数不是对象
   - 作为对象原型链的终点

6. null和undefined转换成number数据类型

   - null 默认转成 0
   - undefined 默认转成 NaN

   

## 33. http的缓存机制（服务端的缓存策略）

### （1）强制缓存

客户端向服务端第一次请求资源，服务端返回资源，服务器response header响应头设置缓存Cache-Control；max-age：3153600

如果不希望缓存就设置no-cache

客户端会根据响应头是否需要缓存资源到本地，所以资源是否需要缓存都是由服务端决定的

![image-20220224090455799](@alias/image-20220224090455799.png)

![image-20220224090521304](@alias/image-20220224090521304.png)

### （2）协商缓存（对比缓存）

客户端向服务端请求资源，如果服务端认为这些资源可以缓存的话，就会返回资源和资源标识；

客户端后续发送请求带上资源标识，服务端根据资源标识判断资源是否有更新过，如果更新过，则返回200状态码、最新的资源和资源标识；如果是最新的资源了（没有更新过），服务端返回304状态码即可（响应体很小），客户端则直接从缓存里拿资源。

![image-20220224091034721](@alias/image-20220224091034721.png)

![image-20220224084319810](@alias/image-20220224084319810.png)

https://www.bilibili.com/video/BV17Q4y127We?p=4

https://www.cnblogs.com/chenqf/p/6386163.html

### （3）客户端的资源标识（请求头）

- If-Modified-Since：拿到服务端请求的数据时同时会拿到资源的修改时间（也就是服务端拿到的Last-Modified），再次请求的时候会带上
- If-None-Match：资源对应的唯一字符串，请求时带上，服务端会把它与ETag比较是否一样，一样则走304，不一样就重新请求

### （4）服务端的资源标识（响应头）

- Last-Modified：资源上一次修改的时间
- ETag：资源的唯一字符串

### （5）ETag与Last-Modified的区别

**优先使用ETag**

1. 因为Last-Modified的值只会精确到秒级，不够精确，js文件修改一般以毫秒为单位。

1. 文件如果每隔一段时间都有重复生成，但内容相同，Last-Modified也会返回资源文件，即使内容相同（因为修改时间更新了），但是ETag可以判断出文件内容相同，就会返回304，使用缓存。



## 34. TS里interface和type的区别

### （1）都可以描述对象和函数

```ts
interface User {
    name: string
    age: number
}
interface SetUser {
    (name: string, age: number): void;
}
type User {
    name: string
    age:number
}
type SetUser = (name: string, age: number) =>void;
```

### （2）都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

1. interface extends interface
2. type extends type
3. interface extends type

```tsx
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```

4. type extends interface

```tsx
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

### （3）不同点

- type 可以声明基本类型别名，联合类型，元组等类型，interface不可以
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值，interface不可以
- interface 能够声明合并而type不行

## 25. table表格数据很多的时候性能低，有什么办法解决吗？

## 26. 说说比较有成就的项目，说说你觉得的比较难的地方，最后是怎么解决的

## 27. vue的生命周期

## 28. vue模板的渲染过程

## 29. 前端页面性能优化有哪些

## 30. 如何优化SEO

## 31. vue2和vue3的最大区别，性能上有什么变化

## 32. 如何提高webpack打包速度，讲一下打包过程

## 33. webpack如何加快热更新

## 34. 说说vue-router的使用，讲一下路由钩子函数，beforeEach的实现原理

## 35. 说说SSR服务端渲染是怎么实现的

## 36. 路由懒加载如何实现的？

## 37. 说说你知道的JavaScript底层原理

## 38. 从零搭建项目，需要做什么准备

## 39. 华为OD编程题

### （1）任务总执行时长

### （2）最小调整顺序次数

### （3）计算机网络信号

## 41. 懒加载

## 42. angular模块

## 43. 权限控制

## 44. token jwt

## 45. 用过webpack哪些优化打包插件
### （1）hard-source-webpack-plugin
HardSourceWebpackPlugin是webpack的插件，为模块提供中间缓存步骤。为了查看结果，您需要使用此插件运行webpack两次：第一次构建将花费正常的时间。第二次构建将显着加快（大概提升90%的构建速度）
```js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new HardSourceWebpackPlugin(),
        ]
      }
    }
  },
```
可选配置项
```js
new HardSourceWebpackPlugin({
	//忽略缓存mini-css-extract-plugin模块
  	test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
    // 果清除了node_modules，则缓存也是如此
    cacheDirectory:'node_modules/.cache/hard-source/[confighash]',
    // Either an absolute path or relative to webpack's options.context.
    // Sets webpack's recordsPath if not already set.
    recordsPath:'node_modules/.cache/hard-source/[confighash]/records.json',
    // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
    // 置构建不同的缓存
    configHash: function(webpackConfig) {
       // node-object-hash on npm can be used to build this.
       return require('node-object-hash')({sort:false}).hash(webpackConfig);
    },
    // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
    // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
    environmentHash: {
       root: process.cwd(),
       directories: [],
       files: ['package-lock.json','yarn.lock'],
    },
})

```
### （2）compression-webpack-plugin
compression-webpack-plugin是webpack压缩插件，在webpack搭建的vue项目中，引入该插件后，npm run build除了会生成压缩后的静态资源（JS、css），还会生成gz形式的JS、CSS。
```js
const CompressionPlugin = require('compression-webpack-plugin')
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/,
            // 超过10k才压缩
            threshold: 10240,
            // 是否删除源文件
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
```
### （3）terser-webpack-plugin
主要用于webpack打包时自动去除console.log

如果你使用的是 webpack v5 或以上版本，你不需要安装这个插件。webpack v5 自带最新的 terser-webpack-plugin。如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本。
```js
const TerserPlugin = require('terser-webpack-plugin') // 引入删除console插件
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                ecma: undefined,
                warnings: false, // 传递true以在中返回压缩机警告result.warnings。使用该值可"verbose"获取更详细的警告。
                parse: {},
                compress: {
                  drop_console: true, // 移除console
                  drop_debugger: true, // 移除debugger
                  pure_funcs: ['console.log'] // 移除console
                }
              }
            })
          ]
        }
      }
    }
  },

```
### （4）拆包splitChunks
简单的来说就是Webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件。
```js
  chainWebpack(config) {



    config.when(process.env.NODE_ENV !== 'development', config => {

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }

```
我这里是吧element UI、常用的components进行拆包处理，你也可以根据你的需求进行拆包
### （5）优化loader的配置
我们可以从如下几个方面对loader进行优化：
- 优化正则匹配——减少文件查询时间
- 通过cacheDirectory选项开启缓存——减少再次打包时间
- 通过 include、exclude 来减少被处理的文件。
### （6）happyPack 多进程打包
在整个 Webpack 构建流程中，最耗时的流程可能就是 Loader 对文件的转换操作了，因为要转换的文件数据巨多，而且这些转换操作都只能一个个挨着处理。HappyPack 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少了总的构建时间。
```js
rules: [
  {
  test: /\.js$/,
  //把对.js文件的处理转交给id为babel的HappyPack实例
  use: ['happypack/loader?id=babel'],
  include: srcPath
  }
],
plugins: [
  new HappyPack({
  //用唯一的标识符id来代表当前的HappyPack是用来处理一类特定的文件
  id: 'babel',
  //如何处理.js文件，用法和loader配置中一样
  loaders: ['babel-loader?cacheDirectory']
})
]
```
### (7)热更新
### （8）ParallelUglifyPlugin
开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成，每个子进程其实还是通过UglifyJS去压缩代码，但是变成了并行执行。
```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

plugins: [
  new ParallelUglifyPlugin({
    //cacheDir 用于配置缓存存放的目录路径。
    cacheDir: '.cache/',
    sourceMap: true,
    uglifyJS: {
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    },
  }),
]
```

## 46. 说一下vue mixin的用法 好处和优点

## 47. es6的语法用过哪些flat, 赋值解构,箭头函数，const let ，set，map,

## 48. js的mixin

## 49. 讲一下promise和promise的几个方法，怎么实现的，有试过自己去实现吗
[promise](http://localhost:8080/front/javascript/promise-event-loop.html)

## 50. angular的路由导航，可以说说吗
[angular路由](http://localhost:8080/front/angular/angular-router.html)

## 51. 如何判断一个数据的类型

javascript中数据类型有: 

- 基本数据类型: String, Number, Boolean, null, undefined, Symbol

- 引用数据类型: Object, 包含Array, Function, Array, Date, Error, RegExp等都是属于Object类型

内置**函数对象**的构造函数都是 Function，例如 Array、Map等；内置**普通对象**的构造函数是Object，**例如：**JSON、Atomic、Intl、Reflect、WebAssembly 等

### 一、typeof

- typeof通常用来检测基本数据类型，它返回表示数据类型的字符串，返回的结果只能包含(number, string, boolean, undefined, function, object)

- typeof检测引用数据类型只能返回Object或function，所以不能用typeof检测引用类型是属于Array还是Date
- 可以使用typeof判断变量是否存在，`if(typeof a!== "undefined") {...}`

```ts
typeof 1   // "number"
typeof '1'  // "string"
typeof true  // "boolean"
typeof undefined  // undefined
typeof null  // "object"
typeof {}  // "object"
typeof [1,2,3] // "object"
function Fn(){}
typeof Fn   // "function"
typeof new Fn()  // "object"
typeof new Array() // "object"
```

可以发现，typeof检测通过对象实例出来的变量，均是Object

### 简单实现数据类型判断

基于Object.prototype.toString.call()实现数据类型判断

```ts
function myType(value) {
  let type = typeof value;
  if (type !== 'object') {
      return type
  }
  return Object.prototype.toString.call(value);
}

myType({})  // "[object Object]"
myType(123)  // "number"
```



### 二、instanceof

```ts
let date = new Date()
date instanceof Date  // true
Date.prototype === date.__proto__  // true
```

对象实例 instanceof 对象，如 date instanceof Date

instanceof前面是该对象的实例，后面是对象类型，注意对象类型的大小写不能写错

根据instanceof的定义：判断参照对象的prototype属性所指向的对象是否在对象实例的原型链上，instanceof只能用来判断两个对象是否属于实例关系，而不能判断一个对象实例具体属哪种类型

 `instanceof`运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链`__proto__`上, 如`Date.prototype === date.__proto__`

```ts
let a = new Object() // 创建一个空对象
let b = {} // 或者通过字面量创建
a instanceof Object // true
b instanceof Object // true

function Person(name, age) {
    this.name = name;
    this.age = age;
}
// 创建一个Person实例
const c = new Person('mx', 22);
c instanceof Person  // true

// 创建一个数组
const arr = new Array();
arr instanceof Array  // true

const date = new Date();
date instanceof Date // true
```

但是instanceof这种方法判断数据类型有弊端，对于基本数据类型number, string, boolean这三种基本数据类型，

只有通过构造函数定义才能检测出，例如: 

```ts
let num = new Number(1)
num instanceof Number // true

// 对于这种定义，instanceof无法检测出来，
let number = 1
number instanceof Number // false
```

### 简单实现instanceof 

```ts
function myInstanceof(L, R) {
    const O = R.prototype;
    if (L === null) {
        return false;
    }
    L = L.__proto__;
    while(true) {
        if (L === null) {
            return false;
        }
        if (L === O) {
            return true;
        }
        L = L.__proto__;
    }
    
}
myInstanceof(true, Boolean) // true
myInstanceof('1', Boolean) // false
myInstanceof('1', String) // true
```

### 三、constructor

根据constructor判断

- 针对instanceof的弊端，我们可以使用constructor，constructor是原型对象的属性指向构造函数
- 这种方法解决了instanceof的弊端，可以检测出除了undefined和null的9种类型（因为undefined和null没有原生构造函数）
- 在创建实例前修改实例的原型，会导致constructor不可靠，所以 constructor 判断数据类型也存在弊端。

```ts
let num = 2;
num.constructor // ƒ Number() { [native code] }

let date = new Date();
date.constructor // ƒ Date() { [native code] }

let bool = true
bool.constructor  // ƒ Boolean() { [native code] }

let str = '2'
str.constructor  // ƒ String() { [native code] }

let array = new Array(1,2,3)  // [1, 2, 3]
array.constructor  // ƒ Array() { [native code] }

let unde = undefined
unde.constructor  // Uncaught TypeError: Cannot read property 'constructor' of undefined at <anonymous>:1:6

let nul = null
nul.constructor  // Uncaught TypeError: Cannot read property 'constructor' of null at <anonymous>:1:5

let fn = function(){}
fn.constructor  // ƒ Function() { [native code] }
```

### 四、Object.prototype.toString.call()

在《你不知道的javaScript》(中卷)中讲到：所有typeof返回值为"object"的对象，都包含一个内部属性[[class]]，我们可以把他看做一个内部的分类而非传统意义上面向对象的类，这个属性无法直接访问，一般通过`Object.prototype.toString.call()`来查看。并且对于基本数据类型null,undefined这样没有原生构造函数，内部的[[class]]属性值仍然是Null和undefined

```ts
Object.prototype.toString.call()  // "[object Undefined]"
Object.prototype.toString.call('ccc')  // "[object String]"
toString.call('abc')  // "[object String]"
toString.call(12)  // "[object Number]"
toString.call(true)  // "[object Boolean]"
toString.call(null)  // "[object Null]"
toString.call(undefined)  // "[object Undefined]"
toString.call([1,2.3])  // "[object Array]"
toString.call({})  // "[object Object]"
toString.call(function(){})  // "[object Function]"
toString.call(document)  // "[object HTMLDocument]"
toString.call(window)  // "[object Window]"
toString.call(Window)  // "[object Function]"
```

### 五、js中提供的判断类型的方法

- Array.isArray()  判断是否为数组

```ts
Array.isArray([]) // true
```

-  isNaN() 判断是否为非数字类型（非数值，**N**ot-**a**-**N**umber）

```ts
isNaN('-') // true
isNaN(12) // fasle
```

## 52、webpack的构建流程

webpack启动后，从entry入口开始，递归解析entry依赖的所有module，找到每个modules.rules里配置的loader进行相应的转换处理，对module转换后，解析当前模块依赖的其它模块，解析的结果是一个一个chunk，最后webpack会将所有的chunk转换成文件输出的output。在整个构建过程中，webpack会在恰当的时机执行plugin当中的插件，完成plugin的任务。

webpack主要配置项：

entry：模块入口，使得源文件加入到构建流程中

output：配置打包文件生成出口

module：配置各种类型的模块的处理规则

plugin：配置拓展插件

devServer：实现本地服务，包括http  模块热替换  sourse map等服务

常用的plugin和loader有哪些

plugin和loader的区别



打包后，dist文件目录过大怎么解决：

- dist中生成的.map，可以把这个map文件去掉，在vue.config.js配置文件中：productionSourceMap:false

- 按需加载UI组件可以减少文件的大小

- 文件和图片的压缩 compression-webpack-plugin

最小化代码minisize(true)

分割代码：splitChunks，超过限定值的文件进行压缩，threshold: 文件大小（字节为单位）

图片的压缩，如果要求图片像素，建议把连接访问图片，可以把图片放在图床或者服务器上。

开启多进程打包：

- thread-loader（webpack4 官方推荐）
- HappyPack

合理利用缓存（缩短连续构建时间，增加初始构建时间）

优化压缩时间

`ParallelUglifyPlugin` 插件实现了多进程压缩，`ParallelUglifyPlugin` 会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，每个子进程其实还是通过 `UglifyJS` 去压缩代码，但是变成了并行执行。 所以 `ParallelUglifyPlugin` 能更快的完成对多个文件的压缩工作。

webpack4 中 `webpack.optimize.UglifyJsPlugin` 已被废弃。

也不推荐使用 ParallelUglifyPlugin，项目基本处于没人维护的阶段，issue 没人处理，pr没人合并。

webpack4 默认内置使用 `terser-webpack-plugin` 插件压缩优化代码，而该插件使用 `terser` 来缩小  `JavaScript` 。



本地开发效率：热更新


## 53、http请求头的类型有哪些
HTTP请求头提供了关于请求，响应或者其他的发送实体的信息。
HTTP的头信息包括通用头、请求头、响应头和实体头四个部分。
每个头域由一个域名，冒号（:）和域值三部分组成。
- 通用头标：即可用于请求，也可用于响应，是作为一个整体而不是特定资源与事务相关联。
- 请求头标：允许客户端传递关于自身的信息和希望的响应形式。
- 响应头标：服务器和于传递自身信息的响应。
- 实体头标：定义被传送资源的信息。即可用于请求，也可用于响应。
根据上面的分类我们可以把他们分为:Request和Response两部分。
### （1）HTTP Request Header 请求头
```js
Accept：指定客户端能够接收的内容类型。
Accept-Charset：浏览器可以接受的字符编码集。
Accept-Encoding：指定浏览器可以支持的web服务器返回内容压缩编码类型。
Accept-Language：浏览器可接受的语言。
Accept-Ranges：可以请求网页实体的一个或者多个子范围字段。
AuthorizationHTTP：授权的授权证书。
Cache-Control：指定请求和响应遵循的缓存机制。
Connection：表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
CookieHTTP：请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。
Content-Length：请求的内容长度。
Content-Type：请求的与实体对应的MIME信息。
Date：请求发送的日期和时间。
Expect：请求的特定的服务器行为。
From：发出请求的用户的Email。
Host：指定请求的服务器的域名和端口号。
If-Match：只有请求内容与实体相匹配才有效。
If-Modified-Since：如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码。
If-None-Match：如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变。
If-Range：如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。
If-Unmodified-Since：只在实体在指定时间之后未被修改才请求成功。
Max-Forwards：限制信息通过代理和网关传送的时间。
Pragma：用来包含实现特定的指令。
Proxy-Authorization：连接到代理的授权证书。
Range：只请求实体的一部分，指定范围。
Referer：先前网页的地址，当前请求网页紧随其后,即来路。
TE：客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息。
Upgrade：向服务器指定某种传输协议以便服务器进行转换（如果支持。
User-AgentUser-Agent：的内容包含发出请求的用户信息。
Via：通知中间网关或代理服务器地址，通信协议。
Warning：关于消息实体的警告信息
```
### （2）HTTP Responses Header 响应头
```js
Accept-Ranges：表明服务器是否支持指定范围请求及哪种类型的分段请求。
Age：从原始服务器到代理缓存形成的估算时间（以秒计，非负）。
Allow：对某网络资源的有效的请求行为，不允许则返回405。
Cache-Control：告诉所有的缓存机制是否可以缓存及哪种类型。
Content-Encodingweb：服务器支持的返回内容压缩编码类型。。
Content-Language：响应体的语言。
Content-Length：响应体的长度。
Content-Location：请求资源可替代的备用的另一地址。
Content-MD5：返回资源的MD5校验值。
Content-Range：在整个返回体中本部分的字节位置。
Content-Type：返回内容的MIME类型。
Date：原始服务器消息发出的时间。
ETag：请求变量的实体标签的当前值。
Expires：响应过期的日期和时间。
Last-Modified：请求资源的最后修改时间。
Location：用来重定向接收方到非请求URL的位置来完成请求或标识新的资源。
Pragma：包括实现特定的指令，它可应用到响应链上的任何接收方。
Proxy-Authenticate：它指出认证方案和可应用到代理的该URL上的参数。
refresh：应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）
Retry-After：如果实体暂时不可取，通知客户端在指定时间之后再次尝试。
Serverweb：服务器软件名称。
Set-Cookie：设置Http Cookie。
Trailer：指出头域在分块传输编码的尾部存在。
Transfer-Encoding：文件传输编码。
Vary：告诉下游代理是使用缓存响应还是从原始服务器请求。
Via：告知代理客户端响应是通过哪里发送的。
Warning：警告实体可能存在的问题。
WWW-Authenticate：表明客户端请求实体应该使用的授权方案
```
## 54、flutter框架有什么优点，性能上有什么优化吗
### （1）Flutter优点
Flutter的优点非常明显，如果你选择一个跨平台框架，与众多基于html的跨平台框架相比，Flutter绝对是体验最好，性能与构建思路几乎最接近原生开发的框架。

- 性能强大，流畅

Flutter对比weex和react native相比，性能的强大是有目共睹的。基于dom树渲染原生组件，很难与直接在原生视图上绘图比肩性能，Google作为一个轮子大厂，直接在两个平台上重写了各自的UIKit，对接到平台底层，减少UI层的多层转换，UI性能可以比肩原生，这个优势在滑动和播放动画时尤为明显。

- 路由设计优秀

Flutter的路由传值非常方便，push一个路由，会返回一个Future对象（也就是Promise对象），使用await或者.then就可以在目标路由pop，回到当前页面时收到返回值。这个反向传值的设计基本是甩了微信小程序一条街了。弹出dialog等一些操作也是使用的路由方法，几乎不用担心出现传值困难

- 单例模式

Flutter支持单例模式，单例模式的实现也非常简单。单例模式很好的解决了一些问题。相比之下，js的单例则并不是一个真正的单例，或者说不是一个简单的单例，这也是受限于js所运行的环境。单例模式并不总是合理的，容易被滥用。但是在App的初期开发中，往往一个容易实现的单例可以帮助我们快速完成一些逻辑的搭建。

- 优秀的动画设计

Flutter的动画简单到不可思议，动画对象会根据屏幕刷新率每秒产生很多个（一般是60个）浮点数，只需要将一个组件属性通过补间（Tween）关联到动画对象上，Flutter会确保在每一帧渲染正确的组件，从而形成连贯的动画。这种十分暴力的操作在Flutter上却看不到明显的卡顿，这也是Flutter的一个魔力所在。相比之下其他跨平台框架几乎不能设计动画……往往会遭遇非常严重的性能问题。

- UI跨平台稳定

Google直接在两个平台上在底层重写了UIKit，不依赖于Css等外部解释器，几乎不存在UI表达不理想，渲染不正常的情况，可以获得非常稳定的UI表达效果。Css换个浏览器就有不同的表现，基于Css的跨平台框架很难获得稳定的UI表现。

- 可选静态的语言，语言特性优秀

Dart是一个静态语言，这也是相对于js的一个优势。Dart可以被编译成js，但是看起来更像java。静态语言可以避免错误，获得更多的编辑器提示词，极大的增加可维护性。很多js库也已经用ts重写了，Vue3.0的底层也将全部使用ts编写，静态语言的优势不言而喻。

### （2）Flutter缺点
假装跨平台，躲不开原生代码
这是最大的问题，跨平台框架说白了就是UI跨平台，最后还是在原生平台运行，本来两个平台就有天壤之别，一套代码就想吃掉iOS和Android在实际应用之中其实根本就不现实。Flutter具有与原生代码互相调用的能力固然非常科学，但是问题反而显得更加明显——我一个前端工程师上哪里去知道什么是UIViewController，什么是Activity呢？我要是双端都熟悉，学习Flutter就显得很没有必要。这是一个很矛盾的点，特别是在团队里，只有几个前端突然想学Flutter，是绝对做不来大项目的，如果有原生开发者，那就没必要搞Flutter了。

- 组合而不是继承的思路

Flutter提倡“组合”，而不是“继承”。在iOS开发中，我们经常会继承UIView，重写UIView的某个生命周期函数，再添加一些方法和属性，来完成一个自定义的View。但是在Flutter中这些都是不可能的——属性都是final的，例如你继承了了一个Container，你是不能在它的生命周期中修改他的属性的。你始终需要嵌套组合几种Widget，例如Row，Container，ListView等Widget。这种方法非常不符合直觉，初学时很难想明白如何构建一个完整的组件。

- Widget的类型难以选择

Flutter的Widget分为StatefulWidget和StatelessWidget两种，一种是带状态的一种是不带状态的，刚开发的时候很难想明白用哪个，因为StatelessWidget也能存值，其实区别就在于框架重构UI的时候会使用State来重构，如果是StatelessWidget，暂时存进去的值就没了。但是问题远不止这么简单，好在只是有点麻烦，并不影响产品性能。

- 糟糕的UI控件API

虽然google尽可能的让我们通过构造函数定制化Widget，但是也难免有遗漏的。例如，又一次我想修改一个Appbar的高度，居然没有找到关于高度的属性，通过阅读源码发现，高度是写死（const）的。上文已经说过，无法通过生命周期来改变组件属性，自己写Appbar显得非常没必要，毕竟我还是想使用Appbar的各种方便的功能。最后我只能把他的源码全部复制出来，直接修改高度来使用。初学框架，和一些初级开发者是不可能有迅速阅读源码的能力的（作为框架也不应该产生如此问题）。一些定制化的UI的Api设计经常有缺失，好在我已经基本习惯了。除了Appbar这种复杂的组件，自己写一个小组件也并不费事。

- 糟糕的资源管理设计

这里是最蠢的，Flutter支持动态加载不同分辨率的图片，但是目录设计太鬼畜了。简单的说，Sketch导出的多分辨率资源，几乎不可能直接拖到Flutter里用，极其，极其，麻烦。

- 墙

毕竟国情在此，要用Flutter，先买梯子。虽然有“在中国使用Flutter”指南，但是太麻烦，没梯子开发Flutter，难度系数太高了，总不能碰到每个问题都花一整天寻找替代方案吧，先买好梯子图个安心……

### （3）总结
Flutter主要的坑就在于需要非常了解原生的环境，其实跨平台的框架都是如此，想要通过跨平台的API就拿下双端的开发任务，对认真学习的原生开发者来说也是不公平的。
主要的优势则在于动画流畅，很多开发者反应比原生安卓还流畅（存疑），至少在iOS上是看不到卡顿的，安卓上动画也很稳定，性能上展示了Google的硬实力

## 55、vue2和vue3框架的区别，vue3相对比vue2做了哪些优化
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

## 56、webpack和vite的区别和优缺点
### （1）底层的语言

webpack是基于nodejs构建，js是以毫秒计数。
vite是基于esbulid预构建依赖，esbulid是采用go语言编写的，go语言是纳秒级别的。

总结：因为js是毫秒级别，go语言是纳秒级别。所以vite比webpack打包器快10-100倍。

### （2）打包过程

webpack：分析各个模块之间的依赖=>然后进行编译打=>打包后的代码在本地服务器渲染。随着模块增多，打包的体积变大，造成热更新速度变慢。
![](@alias/20210417225533423.png)

vite：启动服务器=>请求模块时按需动态编译显示。是先启动开发服务器，请求某个模块时再对该模块进行实时编译，因为现代游览器本身支持ES-Module，所以会自动向依赖的Module发出请求。所以vite就将开发环境下的模块文件作为浏览器的执行文件，而不是像webpack进行打包后交给本地服务器。（vite遵循的是ES Modlues模块规范来执行代码，不需要打包编译成es5模块即可在浏览器运行。）
![](@alias/20210417225611243.png)

总结：vite启动的时候不需要分析各个模块之间的依赖关系、不需要打包编译。vite可按需动态编译缩减时间。当项目越复杂、模块越多的情况下，vite明显优于webpack
分析了webpack和vite的打包方式后，也就明白了为什么vite比webpack打包快，因为它在启动的时候不需要打包，所以不用分析模块与模块之间的依赖关系，不用进行编译。这种方式就类似于我们在使用某个UI框架的时候，可以对其进行按需加载。同样的，vite也是这种机制，当浏览器请求某个模块时，再根据需要对模块内容进行编译。按需动态编译可以缩减编译时间，当项目越复杂，模块越多的情况下，vite明显优于webpack.

### （3）热更新

webpack：模块以及模块依赖的模块需重新编译
vite：浏览器重新请求该模块即可

热更新方面，vite效率更高。当改动了某个模块的时候，也只用让浏览器重新请求该模块，不需要像webpack那样将模块以及模块依赖的模块全部编译一次。
4使用方面

vite开箱即用，更加简单，基于浏览器esm，使得hmr更加优秀，达到极速的效果；webpack更加灵活，api以及插件生态更加丰富。

### （4）原理不同

webpack是bundle，自己实现了一套模块导入导出机制。vite是利用浏览器的esm能力，是bundless。
### （5）优缺点
vite开发阶段，打包快。
vite相关生态没有webpack完善，vite可以作为开发的辅助。

## 57、说一下最近做的项目，遇到什么难点吗，怎么解决的
## 58、用过nodejs的什么框架，为什么用express框架，有什么优点
express、koa、egg、nest、midway都是常见的nodejs开源框架。
其关系，基本如下：
```js
Midway.js ---|> Egg.js ---|> Koa.js,
               Nest.js ---|> Express.js
```
而koa实际上是express团队用新理念重写的，从架构上讲，更加先进一些。

midway.js和egg.js背后都是阿里的团队，其架构基于koa。

nest.js背后是国外的Trilon团队，其架构基于express
### (1) Koa
koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

koa是一个拥有洋葱模型中间件的http处理库，一个请求，经过一系列的中间件，最后生成响应。Koa的大致实现原理：context上下文的保存和传递，中间件的管理和next方法的实现。

所以koa的开发过程中，往往要引用他人开发的中间件，或是自己开发中间件，然后再开发业务逻辑。

Koa和Express之间的主要区别在于它们处理中间件的方式。Express在应用程序框架中包括路由和模板。另一方面，Koa需要具有这些功能的模块，因此使其更具模块化或可定制性。
```js
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000, () => console.log('Koa is listening to http://localhost:3000'));
```
Node的req和res对象已被Koa的Context对象替换。该对象包括ctx.request和ctx.response属性。

**Koa的路由：**

Koa不提供任何内置的路由中间件，因此您必须安装类似koa-router的模块。

**Koa的优点：**

使用Koa，由于该框架具有灵活性，因此更容易编写中间件。它被设计为既使写作又使阅读愉快。它还使用ES6异步/等待功能来消除对回调的使用。另一个重要的考虑因素是Koa的下载量很小。它非常轻巧，大约有500行代码。

**Koa的缺点：**

虽然Koa可能是新的，但它也比其较旧的兄弟版Express不稳定。相比之下，开源社区也要小得多，这意味着可用的支持较少。尽管async / await消除了对回调的需求，但一次多个异步调用仍可能导致async / await hell。Koa特定的中间件也与其他框架不兼容。

```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // …
  .put('/users', (ctx, next) => {
    // …
  .del('/users', (ctx, next) => {
    // …
  });
app
  .use(router.routes())
  .use(router.allowedMethods());
```
有了Koa，这是一个简单的路由器。如果请求/响应周期中存在错误，则内置错误处理功能，这意味着它将所有错误输出到stderr。
### (2) Express
Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能。

使用Express，路由也相对简单。使用app.route，您可以将路径的路由处理程序链接在一起，同时保持代码DRY。

尽管Express有其广泛的优点，但并非没有缺点。从根本上讲，这是非常劳动密集型的。它要求开发人员手动创建所有端点，这意味着代码库越大，重构就越困难。随后，您需要有条理地维护代码，因为很容易在所有中间件中迷失方向。它还没有像Koa和Hapi这样的内置错误处理。
### (3) midway
MidwayJS 是阿里巴巴开源的 Node.js 服务端框架，它基于 Egg 和 TypeScript 封装而成，提供了更加完善的依赖注入、ORM、GraphQL 等功能，适合大型企业级项目的开发。MidwayJS 的优点是功能强大、易于扩展、性能稳定，缺点是相对于其他框架来说，学习成本稍高
### (4) egg
Egg 是阿里巴巴开源的企业级 Node.js 框架，它基于 Koa 封装而成，提供了更加完善的插件机制、多进程管理、插件热更新等功能，适合大型项目的开发。Egg 的优点是功能强大、易于扩展、性能稳定，缺点是相对于 Express 和 Koa 来说，学习成本稍高
### (5) nest
NestJS 是一个基于 TypeScript 和 Express 的 Web 框架，它提供了类似于 Angular 的依赖注入、模块化、面向切面编程等功能，适合大型企业级项目的开发。NestJS 的优点是代码结构清晰、易于维护、可测试性强，缺点是相对于其他框架来说，学习成本稍高。

## 59、table表格的虚拟滚动怎么实现
## 60、浏览器输入url，到界面显示，这个过程发生了什么
### 一、简单的过程总体概览
①DNS域名解析

②建立TCP连接

③发送HTTP请求

④服务器处理并返回HTTP报文

⑤浏览器解析渲染页面

⑥关闭TCP连接

### 二、详细过程解析
### 1、DNS域名解析
​ 在浏览器输入熟悉的网址 比如www.baidu.com，这个叫做网址，并不是百度真实的地址，互联网中每一台机器都有唯一标识的ip地址。网址和ip地址的转换，就是DNS解析。

​ 网址简单容易记住，但是ip地址很复杂，所以需要一个地址簿记录哪个ip对应哪一个网址，这个地址簿就是DNS服务器。

（1） DNS服务树状结构如下

![](@alias/366ae4c9036042768570e2c3e89427e0.png)

根DNS服务器：返回顶级DNS服务器ip地址
顶级DNS服务器：返回权威DNS服务器ip地址
权威DNS服务器：返回相应主机ip地址

（2）DNS服务器查找过程
DNS域名查找，在客户端和浏览器，本地DNS之间是递归查询，在本地DNS服务器与根域及其子域之间是迭代查询
需要获取到域名的对应IP，需要访问域名服务器，域名服务器访问流程大致如下：

查找浏览器缓存 ——> 查找操作系统缓存 ——> 查找路由器缓存 ——> 查找本地DNS缓存 ——> 递归查询

递归过程：

![](@alias/bd28c962bba9484cae632edb4d354641.png)

查找就可能找到或者找不到两种情况

①本地DNS服务器找到：在客户端浏览器输入url网址后，在递归查找找到ip地址，任何一个步骤找到都会结束查找过程。

②本地DNS服务器找不到：根据本地DNS服务器设置的转发器进行查询，迭代查找。

![](@alias/38f7096a68da4fb4a0e3a247ac25c299.png)

（3）解析URL
完整的url：协议+域名+端口+路径[+参数] [+描点]
解析url是因为某些参数包含的特殊字符会产生歧义，url对非安全字符转义，用的是百分号编码
encodeURL 不会编译= ？ & ；/等符号，所以用来编码整个URL；而encodeURLComponent编码会编译以上特殊字符，所以用来编码参数部分
（4）检查浏览器是否有缓存
注意检查缓存发生在发起请求之前进行

**一些概念理解**

- 强缓存：

有效期内的缓存资源直接使用，返回200（没有进行真正的请求）

memory cache：内存中读取，读取速度快，一般页面刷新时用到

disk cache：磁盘中读取，读取速度慢，一般关闭后重新打开用到

- 协商缓存：

超过有效期，写带缓存的资源标识向服务器发起请求，检验是否能用

304：可以继续使用，不携带数据

200：需要用新的资源，并缓存

- 检查顺序：

①通过Cache-Control和Expires来检查是否存在强缓存，存在则直接取本地磁盘的html，状态码为200 ，从内存or磁盘

②没有强缓存则会向服务器发起请求（先进行下一步的TCP连接），服务器通过Etag和Last-Modify来与服务器确认返回的响应是否被更改（协商缓存），若无更改则返回状态码（304 Not Modified）,浏览器取本地缓存

③若强缓存和协商缓存都没有命中则返回请求结果

### 2、建立TCP连接
首先判断是否是https，若协议是https则作加密处理。

HTTPS由两部分组成HTTP+SSL/TLS，在http上加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS加密，传输的数据自然也是加密后的数据。

HTTPS=HTTP+加密+认证+完整性保护

（1）三次握手建立TCP连接

**一些概念理解**

ACK：此标志表示应答域有效，有两个取值：0和1。为1的时候表示应答域有效，反之为0。TCP协议规定，只有ACK=1时有效，也规定连接建立后所有发送的报文的ACK必须为1。

SYN：在连接建立时用来同步序号。SYN置1就表示这是一个连接请求或连接接受报文。当SYN=1而ACK=0时，表明这是一个连接请求报文。同意建立连接，在响应报文中SYN=1和ACK=1。

FIN：用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。

**三次握手**

建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。

刚开始客户端处于Closed的状态、服务器端处于Listen的状态

- 第一次握手

客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN©。此时客户端处于 SYN_SEND 状态。

首部的同步位SYN=1，初始序号seq=x，SYN=1的报文段不能携带数据，但要消耗掉一个序号。

- 第二次握手

服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，并且也是指定了自己的初始化序列号 ISN(s)。同时会把客户端的 ISN + 1 作为ACK 的值，表示自己已经收到了客户端的 SYN，此时服务器处于 SYN_RCVD 的状态。

在确认报文段中SYN=1，ACK=1，确认号ack=x+1，初始序号seq=y

- 第三次握手

客户端收到 SYN 报文之后，会发送一个 ACK 报文，当然，也是一样把服务器的 ISN + 1 作为 ACK 的值，表示已经收到了服务端的 SYN 报文，此时客户端处于 ESTABLISHED 状态。服务器收到 ACK 报文之后，也处于 ESTABLISHED 状态，此时，双方已建立起了连接。

确认报文段ACK=1，确认号ack=y+1，序号seq=x+1（初始为seq=x，第二个报文段所以要+1），ACK报文段可以携带数据，不携带数据则不消耗序号。

发送第一个SYN的一端将执行主动打开（active open），接收这个SYN并发回下一个SYN的另一端执行被动打开（passive open）

**三次握手想要达到什么样的目的**

- 客户端发送网络包，服务端收到了。
这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。

- 服务端发包，客户端收到了。 
这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常

- 客户端发包，服务端收到了。 
这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。

（2）SSL握手过程
- 第一阶段
建立安全能力 包括协议版本 会话Id 密码构件 压缩方法和初始随机数

- 第二阶段 
服务器发送证书 密钥交换数据和证书请求，最后发送请求-相应阶段的结束信号

- 第三阶段
如果有证书请求客户端发送此证书 之后客户端发送密钥交换数据 也可以发送证书验证消息

- 第四阶段
变更密码构件和结束握手协议

### 3、发送HTTP请求

它会对TCP连接进行处理，对HTTP协议进行解析，并按照报文格式进一步封装成HTTP Request对象。

Web服务器有Tomcat, Nginx和Apach

HTTP报文分为三份：状态码、响应报头、响应报文

（1）状态码

状态码是由3位数组成，第一个数字定义了响应的类别，且有五种可能取值

常见状态码：200, 204, 301, 302, 304, 400, 401, 403, 404, 422, 500

1xx：指示信息–表示请求已接收，继续处理。
2xx：成功–表示请求已被成功接收、理解、接受。
3xx：重定向–要完成请求必须进行更进一步的操作。
4xx：客户端错误–请求有语法错误或请求无法实现。
5xx：服务器端错误–服务器未能实现合法的请求
```js
1xx：指示信息–表示请求已接收，继续处理。
2xx：成功–表示请求已被成功接收、理解、接受。
3xx：重定向–要完成请求必须进行更进一步的操作。
4xx：客户端错误–请求有语法错误或请求无法实现。
5xx：服务器端错误–服务器未能实现合法的请求
```
（2）HTTP缓存

HTTP属于客户端缓存，浏览器有一个缓存数据库，用来保存静态文件。

（3）发送请求获取html页面

通常请求行： 请求的方式（get或post） + 请求的资源的位置（url） + HTTP/[版本号](HTTP/1.1)

客户端与服务器之前建立链接，收到服务器的返回比如index.html资源

发送http请求过程：组装http报文并将报文发向指定地址的过程服务器处理并返回HTTP报文

### 4、服务器处理请求并返回http报文

（1）服务器响应html
服务器可能是server或者cdn

cdn：内容分发网络，加快传输速度。主要是存储静态文件，前端html、css、js、图片文件等

nginx：常用的反向代理服务器。服务器上可能会通过nginx等设置静态资源代理，将url对应的html静态资源返回。

请求SEO页面就需要服务端渲染，服务器根据模板和数据渲染html文件并且返回给前端

服务端渲染：模板语法ejs、art-template；基于vue、react等框架的nuxt.js、next.js

（2）浏览器解析html
浏览器下载html数据，将html文档解析成一个个标签；解析到

客户端开始检查收到的index.html文件中可以建立http请求的标签，可以建立http链接的标签 有link script img video audio iframe，需要注意的是访问服务器资源，等待响应会阻塞浏览器页面渲染，可以使用defer和async新的属性，编排资源加载顺序。

### 5、浏览器解析渲染页面
浏览器渲染页面
1. 浏览器解析HTML，构建DOM树

2. 浏览器解析css，构建CSS Rule Tree规则树

3. 解析完成后，浏览器引擎根据DOM树和CSS规则构造Render Tree（不包括Header、display：none）

4. 根据Render Tree布局lay out，计算节点

5. 遍历Render Tree绘制paint

### 6、关闭TCP连接
**四次挥手**

1. Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态

2. Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。

3. Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态

4. Client收到FIN后，Client进入TIME_WAIT_2状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

建立链接和分开链接次数不同的原因是：ack确认 fin完成 不会同时发送


## 61、说一下原型链，函数的原型链是什么
### (1)构造函数
要说原型链，必须先说构造函数

构造函数只是一个特殊说法，大部分的函数都成为构造函数。但一般说一个函数是构造函数时，指的是通过它生成实例。

也就是通过new执行这个函数，通常这种函数命名会用大写开头。
```js
// 声明一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  return this
}
// 生成一个Person实例
const lanmx = new Person('lanmx', 18);
// 注意：一般不会直接调这个函数，因为会存在this指向的问题
const no = Person('xx', 3)  // 不建议这样使用
```
当有了构造函数后，就有了原型，通过构造函数的prototype属性可访问原型。
而原型中的constructor属性反过来指向构造函数。

实例.constructor可获取构造函数
```js
// 声明一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  return this
}
// 生成一个Person实例
const lanmx = new Person('lanmx', 18);
console.log(lanmx.constructor)
>> ƒ Person(name, age) {
  this.name = name;
  this.age = age;
  return this
}
```
构造函数的原型
```js
const personPrototype = Person.prototype
console.log(personPrototype.constructor === Person)  // true
console.log(Person.prototype.constructor === Person)  // true
```
![](@alias/1685866580593.jpg)

原型和构造函数的关系是
![](@alias/1685866797753(1).jpg)

### (2)__proto__
当我们用new执行构造函数生成出的实例后，通过实例的__proto__属性，可以访问到Person原型。
```js
// 声明一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  return this
}
// 生成一个Person实例
const lanmx = new Person('lanmx', 18);
console.log(lanmx.__proto__ === Person.prototype) // true
```
三者关系如下：
![](@alias/1685867045373.jpg)

### (3)原型链
了解完前面三者关系之后，来看看原型链。所谓的原型链其实是一个属性访问的规则。就是当js访问一个属性时，如果对象本身没有这个属性。就会往上找它的原型看有没有这个属性，如果有就输出，没有就继续往上找，直到确认找不到为止，就会输出undefined

由于JS允许我们随便修改__proto__和prototype等属性指向，开发者可以利用原型链的特性实现模仿面向对象的设计。

### （4）函数的原型链

1. 函数是函数，也是对象
     是函数有prototype属性
     是对象有__proto__属性
     所以函数有prototype也有__proto__属性
2. 任何函数的原型链都有 Function.prototype
3. 任何对象的原型链上都有 Object.prototype
4. 函数是一等公民（特权）
      typeof 函数 ==> function
      Function 生自己
      Function.prototype 原型对象的类型是唯一的函数类型
