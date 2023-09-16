<!-- ---
sidebar: 'auto'
--- -->
:pouting_man: 这里整理了一些前端面试常问的问题，面试回答问题的时候注意回答的全面，深度和广度都要够:muscle:，才更能体现个人的能力噢 :clap: :muscle: ~，才能得到面试官的认可，顺利拿下心仪offer ~ :clap::thumbsup:
## 1、浏览器输入url，到界面显示，这个过程发生了什么
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

- 根DNS服务器：返回顶级DNS服务器ip地址
- 顶级DNS服务器：返回权威DNS服务器ip地址
- 权威DNS服务器：返回相应主机ip地址

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

完整的url：协议+域名+端口+路径[+参数] [+描点]；

解析url是因为某些参数包含的特殊字符会产生歧义，url对非安全字符转义，用的是百分号编码；

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

> Expires 字段的作用是，设定一个强缓存时间。在此时间范围内，则从内存（或磁盘）中读取缓存返回。

> 比如说将某一资源设置响应头为:Expires:new Date("2022-7-30 23:59:59")；

> 因为Expires判断强缓存是否过期的机制是:获取本地时间戳，如果我本地时间不准咋办？Expires 过度依赖本地时间，如果本地与服务器时间不同步，就会出现资源无法被缓存或者资源永远被缓存的情况。所以， Expires 字段几乎不被使用了。现在的项目中，我们并不推荐使用 Expires ，强缓存功能通常使用 cache-control 字段来代替 Expires 字段。

> Cache-Control代替Expires的强缓存， Cache-control 完美解决了 Expires 本地时间和服务器时间不同步的问题。是当下的项目中实现强缓存的最常规方法。

### 2、建立TCP连接
首先判断是否是https，若协议是https则作加密处理。

HTTPS由两部分组成HTTP+SSL/TLS，在http上加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS加密，传输的数据自然也是加密后的数据。

HTTPS=HTTP+加密+认证+完整性保护

（1）SSL握手过程
- 第一阶段
建立安全能力 包括协议版本 会话Id 密码构件 压缩方法和初始随机数

- 第二阶段 
服务器发送证书 密钥交换数据和证书请求，最后发送请求-相应阶段的结束信号

- 第三阶段
如果有证书请求客户端发送此证书 之后客户端发送密钥交换数据 也可以发送证书验证消息

- 第四阶段
变更密码构件和结束握手协议

（2）三次握手建立TCP连接

**一些概念理解**

ACK：此标志表示应答域有效，有两个取值：0和1。为1的时候表示应答域有效，反之为0。TCP协议规定，只有ACK=1时有效，也规定连接建立后所有发送的报文的ACK必须为1。

SYN：在连接建立时用来同步序号。SYN置1就表示这是一个连接请求或连接接受报文。当SYN=1而ACK=0时，表明这是一个连接请求报文。同意建立连接，在响应报文中SYN=1和ACK=1。

FIN：用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。

**三次握手**

建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。

三次握手（Three-way Handshake）是指在建立一个TCP连接时，客户端和服务器会一共发送三个报文段。

初始时客户端和服务器都处于CLOSED状态，当服务器应用程序创建一个监听套接字时，服务器处于LISTEN状态。

（1）第一次握手

客户端向服务器发送一个SYN报文段，表示请求连接，报文段的首部中的标志位SYN置为1，另外还会指明自己的初始化序号seq=x，此时客户端处于SYN_SENT状态。

（2）第二次握手

服务器收到SYN的报文段后，会以自己的SYN-ACK报文进行应答。该应答报文的首部有三个重要信息：首先SYN被置为1；其次，确认号字段ack=x+1；最后服务器选择自己的初始序号seq=y。该报文段表明：“我收到了你发起建立连接的请求，该请求报文的初始序号是x（确认号ack=x+1就表明了我收到了初始序号seq=x的报文），我同意建立该连接，我的初始序号是y。”此时服务器处于SYN_RCVD状态。

（3）第三次握手

客户端收到SYN-ACK报文后，会发送一个ACK报文段，该报文段中序号seq=x+1，确认号ack=y+1，表明我已经收到了你的确认。此时客户端处于ESTABLISHED状态。

服务器收到 ACK 报文之后，也处于 ESTABLISHED 状态，此时，双方以建立起了链接。

需要注意的是：第一次握手和第二次握手都只是消耗掉一个序号，但不能携带数据；第三次握手可以携带数据。

![](@alias/295468c1a77a4916b27ad87510d5c893.png)

**三次握手想要达到什么样的目的**

- 客户端发送网络包，服务端收到了。
这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。

- 服务端发包，客户端收到了。 
这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常

- 客户端发包，服务端收到了。 
这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。

**为什么要三次握手，不能是两次呢？**

> 因为三次握手才能保证双方具有接收和发送的能力。
> 
> 如果只是两次握手， 至多只有连接发起方的起始序列号能被确认， 另一方选择的序列号则得不到确认。
> 
> 假如客户端发送报文A到服务器请求连接，但是因为网络问题，比如说网络延迟阻塞导致请求暂时无法到达服务器，
> 服务器接收不到请求报文就没有向客户端返回确认报文，这时候客户端因为长时间没收到服务端的应答，于是重新发送请求报文B，这次顺利到达服务器，服务器返回了确认应答报文，成功连接上了，且完成了数据传输，进入了close关闭状态。但这时上一个A报文请求连接才姗姗来迟到达服务器，给客户端传输了应答报文，但由于客户端关闭连接了，做不了应答，这就会导致服务端长时间单方面的等待，浪费资源。
> 
> 如果一个连接请求在网络中跑的慢，超时了，这时客户端会从发请求，但是这个跑的慢的请求最后还是跑到了，然后服务端就接收了两个连接请求，然后全部回应就会创建两个连接，浪费资源！


### 3、发送HTTP请求

它会对TCP连接进行处理，对HTTP协议进行解析，并按照报文格式进一步封装成HTTP Request对象。

HTTP请求报文分为三份：请求行 + 请求头 + 请求体

![](@alias/20201022175734346.png)

**请求行：**
①是请求方法，如GET和POST。
②为请求对应的URL地址，它和报文头的Host属性组成完整的请求URL。
③是协议名称及版本号。

**请求头：**
④是HTTP的报文头，包含若干个属性，格式为“属性名:属性值”，服务端据此获取客户端的信息。与缓存相关的规则信息，均包含在header中

**请求体：**
⑤是报文体，它将一个页面表单中的组件值通过param1=value1¶m2=value2的键值对形式编码成一个格式化串，它承载多个请求参数的数据。报文体可以传递请求参数，同样请求URL也可以通过类似于“/chapter15/user.html?param1=value1¶m2=value2”的方式传递参数。


### 4、服务器处理请求并返回http报文
HTTP的响应报文也由三部分组成：响应行 + 响应头 + 响应体

![](@alias/20201022180234694.png)

**响应行：**
①报文协议及版本；
②状态码及状态描述；

**响应头：**
③响应报文头，也是由多个属性组成；

**响应体：**
④响应报文体，真正需要的数据

**常见状态码**

状态码是由3位数组成，第一个数字定义了响应的类别，且有五种可能取值

常见状态码：200, 204, 301, 302, 304, 400, 401, 403, 404, 422, 500

- 1xx：指示信息–表示请求已接收，继续处理。
- 2xx：成功–表示请求已被成功接收、理解、接受。
- 3xx：重定向–要完成请求必须进行更进一步的操作。
- 4xx：客户端错误–请求有语法错误或请求无法实现。
- 5xx：服务器端错误–服务器未能实现合法的请求

（2）服务器响应html

服务器可能是server或者cdn

cdn：内容分发网络，加快传输速度。主要是存储静态文件，前端html、css、js、图片文件等

nginx：常用的反向代理服务器。服务器上可能会通过nginx等设置静态资源代理，将url对应的html静态资源返回。

请求SEO页面就需要服务端渲染，服务器根据模板和数据渲染html文件并且返回给前端

服务端渲染：模板语法ejs、art-template；基于vue、react等框架的nuxt.js、next.js

（3）发送请求获取html页面

通常请求行： 请求的方式（get或post） + 请求的资源的位置（url） + HTTP/[版本号](HTTP/1.1)

客户端与服务器之前建立链接，收到服务器的返回比如index.html资源

发送http请求过程：组装http报文并将报文发向指定地址的过程服务器处理并返回HTTP报文


### 5、浏览器解析渲染页面

**浏览器解析html**

浏览器下载html数据，将html文档解析成一个个标签；客户端开始检查收到的index.html文件中是否需要建立http请求的标签（可以建立http链接的标签 有link script img video audio iframe）需要注意的是：访问服务器资源，等待响应会阻塞浏览器页面渲染，可以使用defer和async新的属性，编排资源加载顺序。

**浏览器渲染页面**

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

**为什么要四次握手？**

四次挥是手为了保证等数据完成的被接收完再关闭连接。需要保证数据完整的传输完，那就需要保证双方都达到关闭连接的条件才能断开。

也可以说这是由于 TCP 的半关闭（half-close）特性造成的，TCP 提供了连接的一端在结束它的发送后还能接收来自另一端数据的能力。

任何一方都可以在数据传送结束后发出连接释放的通知，待对方确认后进入半关闭状态。当另一方也没有数据再发送的时候，则发出连接释放通知，对方确认后就完全关闭了TCP连接。

通俗的来说，两次握手就可以释放一端到另一端的 TCP 连接，完全释放连接一共需要四次握手。

举个例子：A 和 B 打电话，通话即将结束后，A 说 “我没啥要说的了”，B 回答 “我知道了”，于是 A 向 B 的连接释放了。但是 B 可能还会有要说的话，于是 B 可能又巴拉巴拉说了一通，最后 B 说“我说完了”，A 回答“知道了”，于是 B 向 A 的连接释放了，这样整个通话就结束了。

## 2、说一下原型链，函数的原型链是什么
### 1. 构造函数
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
// >> ƒ Person(name, age) {
//   this.name = name;
//   this.age = age;
//   return this
// }
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

### 2. __proto__
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

### 3. 原型链
了解完前面三者关系之后，来看看原型链。所谓的原型链其实是一个属性访问的规则。就是当js访问一个属性时，如果对象本身没有这个属性。就会往上找它的原型看有没有这个属性，如果有就输出，没有就继续往上找，直到确认找不到为止，就会输出undefined

由于JS允许我们随便修改__proto__和prototype等属性指向，开发者可以利用原型链的特性实现模仿面向对象的设计。

### 4. 函数的原型链
结论：函数的原型链是指向Function构造函数的原型

### （1）Function是一切函数的构造函数
```js
function fn (){}
// 等价于
let fn = new Function('x','y','return x+y')
fn.__proto__ === Function.prototype  //  => true
```
所以，我们创建的函数实际上是构造函数Function的一个对象，也就是Function是一切函数的构造函数。

在js中的内置函数对象也是相同的原理，String(),Number(),Array(),Math()等函数也都是有Function构造函数创建的，他们的__proto__属性也都是指向Function.prototype的。

```js
String.__proto__ === Function.prototype     // => true
Number.__proto__ === Function.prototype     // => true
Object.__proto__ === Function.prototype     // => true
```
Function是一切函数的构造函数，包括Object本身，所以有下面这个公式就可以成立了
`所有函数的.__ proto __` === Function.prototype。// true

### （2）Function 的__ proto __
```js
Function.__proto__ === Function.prototype  // => true
// 函数的原型链是指向Function构造函数的原型
```
结论：函数的原型链是指向Function构造函数的原型
1. 函数是函数，也是对象
     是函数有prototype属性
     是对象有__proto__属性
     所以函数有prototype也有__proto__属性
2. 任何函数的原型链都有 Function.prototype
3. 任何对象的原型链上都有 `Object.__proto__`
4. 函数的原型链是指向Function构造函数的原型

## 3、说说你知道的JavaScript底层原理

## 4、es6的语法用过哪些flat, 赋值解构,箭头函数，const let ，set，map,
## 5、讲一下promise和promise的几个方法，怎么实现的，有试过自己去实现吗
[promise](/front/javascript/promise-event-loop.html)

## 6、说说js的mixin
## 7、js精度丢失

```js
parseFloat(num.toPrecision(12))
```

## 8、防抖和节流

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




## 9、闭包的理解，应用场景？

防抖和节流用的闭包实现

```js
var fnArr = []
for(var i = 0; i < 10; i++) {
    fnArr[i] = function() {
        return i
    }
}
```
## 10、说说axios请求

## 11、eventBlus事件总线

## 12、cookie

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





## 13、try...catch
## 14、树级结构转换为一维结构

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

## 15、路由有哪些模式呢？又有什么不同呢？

- hash模式：通过`#号`后面的内容的更改，触发`hashchange`事件，实现路由切换
- history模式：通过`pushState`和`replaceState`切换url，实现路由切换，需要后端配合
## 16、table表格数据很多的时候性能低，有什么办法解决吗？

## 17、说说比较有成就的项目，说说你觉得的比较难的地方，最后是怎么解决的

## 18、前端页面性能优化有哪些

## 19、如何优化SEO

## 20、说说SSR服务端渲染是怎么实现的

## 21、路由懒加载如何实现的？

## 22、说一下最近做的项目，遇到什么难点吗，怎么解决的

## 23、如何判断一个数据的类型

javascript中数据类型有: 

- 基本数据类型: String, Number, Boolean, null, undefined, Symbol

- 引用数据类型: Object, 包含Array, Function, Array, Date, Error, RegExp等都是属于Object类型

内置**函数对象**的构造函数都是 Function，例如 Array、Map等；内置**普通对象**的构造函数是Object，例如：JSON、Atomic、Intl、Reflect、WebAssembly 等

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
  if (type !== 'object' || type !=='function') {
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
```js
function LanInstanceOf(data, instance) {
  let instanceLink = instance.prototype;
  if (data === null) {
    return false
  }
  data = data.__proto__;
  while(true) {
    if (data === null) {
      return false;
    }
    if (data === instanceLink) {
      return true;
    }
    data = data.__proto__
  }
}

console.log(LanInstanceOf({}, Object))  // true
console.log(LanInstanceOf(null, Object))  // false
console.log(LanInstanceOf(1, Array))   // false
console.log(LanInstanceOf(1, Number))  // true
console.log(LanInstanceOf('1', Number))   // false
console.log(LanInstanceOf('1', String))   // true
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

### 六、类型转换
[引用类型转化规则](https://www.jianshu.com/p/3dcd26229e1f)
引用类型进行类型转化时会调用本身的Symbol.toPrimitive、valueOf、toString三个方法进行转化，其中Symbol.toPrimitive的优先级最高，如果要进行转化的引用类型上有这个方法，那么直接调用这个方法，如果没有，再根据转化的情况决定优先调用valueOf还是toString。
### （一）Number()转换
> 原始值为字符串
```js
Number('')  // 0
Number()  // 0
Number('0')  // 0
Number('00')  // 0 无论多少个0都会转成一个
Number('a') // NaN // 非空字符串且非数字字符串都会变成NaN
```
> 原始值为布尔值
```js
Number(true) // 1
Number(false) // 0
```
> 原始值为undefined或null
```js
Number(undefined) // NaN
Number(null)  // 0
```
> 原始值为数组（默认情况）
```js
Number([])  // 0
Number([1])  // 1
Number(['1'])  // 1
Number(['1'])  // 1
Number([1,2])  // NaN, / 除了只有一个元素且元素为数字或数字字符串外，都是NaN
Number(['1','2'])  // NaN
Number(['1',2])  // NaN
```
> 原始值为函数或对象（默认情况）
```js
Number({}) // NaN
Number(function(){}) // NaN
```
### （二）String()转换
> 原始值为基础类型
```js
String(1) // "1"
String(NaN) // "NaN"
String(true) // "true"
String(false) // "false"
String(undefined) // "undefined"
String(null) // "null"
```
> 原始值为引用类型（默认情况）
```js
String([]) // ""
String([1]) // "1"
String([1,2]) // "1,2"
String(['1','a']) // "1,a" 相当于join()
String({}) // "[object Object]"
String({a: 1}) // "[object Object]"
```
### （三）Boolean()转换
> 原始值为基础类型
```js
Boolean(1) // true
Boolean() // false
Boolean('') // false
Boolean(NaN) // false
Boolean('0') // true 非空字符串都是true
Boolean(undefined) // false
Boolean(null) // false
```
> 原始值为基础类型: 全部为true

**上面在写引用类型进行类型转化的时候，都加上了一个默认情况，那什么情况是特殊的呢，先来看看引用类型转化规则。**
### （四）引用类型转化规则
来看个栗子: 
```js
const obj = {
  [Symbol.toPrimitive]: function() {
    return '超人鸭'
  },
  valueOf: function() {
    return '1'
  },
  toString: function() {
    return '2'
  }
}
console.log(Number(obj)) // NaN
console.log(String(obj)) // '超人鸭'
console.log(obj == '超人鸭') // true
```
这个打印结果对应上面三个方法的哪一个的返回结果呢，很明显是Symbol.toPrimitive

现在对象去掉了 Symbol.toPrimitive 方法，打印结果
```js
const obj = {
  valueOf: function() {
    return '1'
  },
  toString: function() {
    return '2'
  }
}
console.log(Number(obj)) // 1
console.log(String(obj)) // '2'
console.log(obj == '1') // true
```
从结果上看Number(obj)和obj == '1'对应的是valueOf方法，String(obj)对应的是toString方法。

valueOf返回值返回一个空对象，那么此时的结果是什么呢？
```js
const obj = {
  valueOf: function() {
    return {}
  },
  toString: function() {
    return '2'
  }
}
console.log(Number(obj)) // 2
console.log(String(obj)) // '2'
console.log(obj == '2') // true
```
很明显对应的是toString方法，好乱了，原始值不一样，valueOf方法和toString方法的优先级也不一样。
### （五）引用类型转化规则总结
通过看（三）引用类型转化规则的例子，总结很清晰：

引用类型进行类型转化时会调用本身的Symbol.toPrimitive、valueOf、toString三个方法进行转化，其中Symbol.toPrimitive的优先级最高，如果要进行转化的引用类型上有这个方法，那么直接调用这个方法，如果没有，再根据转化的情况决定优先调用valueOf还是toString。

转化的情况是指？
1. 期待转化为字符串的（优先调用toString方法）
2. 转化为其他的（优先调用valueOf方法）

1. 期待转化为字符串的（优先调用toString方法）例如显示转换String(),alert方法,模板字符串,对象的键名,字符串加号运算符
再看看个例子
```js
const obj = {
  toString: function() {
    return '我是超人鸭'
  },
  valueOf: function() {
    return '我爱你'
  }
}

alert(obj)  // 界面显示：我是超人鸭
console.log(`${obj}`)  // 我是超人鸭
```
2. 转化为其他的（除此之外其他会导致类型转化的操作，都是优先调用valueOf方法），看个例子
```js
const obj = {
  toString: function() {
    return '我是超人鸭'
  },
  valueOf: function() {
    return '1'
  }
}

console.log(obj == '1') // true
console.log(+obj) // 1
console.log(obj + 1) // '11'
console.log(obj < 2) // true
```
还有一种情况，再来看个例子
```js
const obj = {
  toString: function() {
    return {}
  },
  valueOf: function() {
    return '我爱你'
  }
}

alert(obj)  // 界面显示：我爱你
console.log(`${obj}`)  // 我爱你
```
调用的就是valueOf方法，虽然优先调用toString，但是toString没有返回基础类型，所以会调用valueOf。

二次总结：

- 如果有Symbol.toPrimitive方法，则直接调用这个方法，且这个方法不能返回引用类型，否则报错。
- 根据转化的情况决定优先调用toString还是valueOf，如果期待的是返回字符串，那么优先调用toString方法，其他情况优先调用valueOf方法。
- 如果toString或valueOf返回的不是基础类型的数据，那么就调用下一个，如果两个方法都没有返回基础类型数据，则报错。


**引用类型默认情况的valueOf和toString**
```js
const obj = {
  a: '1'
}
const arr = [1,2]
console.log(obj.toString()) // '[object Object]'
console.log(obj.valueOf()) // {a: '1'}
console.log(arr.toString()) // '1,2' // 相当于join()
console.log(arr.valueOf()) // [1, 2]
```
默认情况下，valueOf都是返回引用类型，基于上面引用类型进行类型转化的规则，在默认情况下，引用类型进行转化都是调用了toString方法。

### （六）更多转换例子
> 加号运算符
两个变量相加的情况，引用类型基于上面的规则，调用的是toString方法，而基础类型有相加有一个规律，如果是有一个变量是字符串，那么就会转为字符串，其余情况全部转为数字。
有字符串的情况：
```js
console.log('1' + 1) // '11'
console.log('1' + undefined) // '1undefined'
console.log('1' + null) // '1null'
console.log('1' + false) // '1false'
```
> 其余情况都是转为数字：
```js
console.log(1 + false) // 1
console.log(1 + undefined) // NaN
console.log(1 + null) // 1
console.log(undefined + false) // NaN
console.log(undefined + null) // NaN
console.log(null + false) // 0
```
> 非加号运算符类型转化
一元运算符和其他数学运算符都可以把类型转为number类型
```js
console.log(+'1') // 1
console.log(+true) // 1
console.log(+undefined) // NaN
console.log(+null) // 0
console.log(true - null) // 1
console.log('1' * true) // 1
```
> 双取反号将变量转为布尔值，引用类型固定转为true，不会调用toString和valueOf方法：
```js
console.log(!!'1') // true
console.log(!!0) // false
console.log(!!null) // false
console.log(!!undefined) // false
console.log(!![]) // true
console.log(!!{}) // true
```
> 不严格相等类型转化
- null == undefined返回true
- null和undefined除了和自身、对方比较，与其他类型比较全部返回false
- 比较两边如果有NaN，那么返回false，包括NaN == NaN
- 两个引用类型比较除非引用地址相同，不然返回false
- 其余情况下，引用类型基于上面的规律，默认情况下调用toString方法；基础类型转为number再进行比较。
```js
console.log(null == undefined) // true
console.log(null == 0) // false
console.log(undefined == 'undefined') // false
console.log(NaN == NaN) // false
console.log([] == []) // false，地址不同
console.log([] == 0) // true，[]调用toString变为''，''转为number变为0
console.log(['1'] == 1) // true，[]调用toString变为'1'，'1'转为number变为1
console.log({} == '[object Object]') // true
console.log(1 == '1') // true
console.log(1 == true) // true
```
> [] == ! [] 的结果为什么会是true
```js
console.log([] == ![]) // true 

```
首先要明白==和===的区别

==是判断值是否相等,===判断值及类型是否完全相等。

前者会自动转换类型，后者不会。所以在判断[]==![]会转换两者的类型。

根据运算符优先级 ，!的优先级是大于 == 的，所以先会执行 ![]

```js
typeof []  //Object 
typeof ![] //Boolean
```
两者类型不同，比较的时候会尝试将Boolean转换为Number，而Object转换成Number或String，取决于另外一个对比量的类型。这里因为比较的对象是Boolean，所以也会转化为Number。

```js
console.log(![]) //false 因为任何对象Boolean值都为true，所以![]就为false
```
Boolean与Number的转换，true为1，false为0，所以![]在比较的时候转换为Number值为0。

而[]是很明显的空对象了。
对于对象，当将其转换成Number时，会先调用对象的valueOf()方法及toString()，返回对象的原始值，再进行转换。最终[]会返回""空字符串，""会转化Number值为0。
最后0==0所以两者以比较就为true了

## 24、前端面试题(a === 1 && a === 2 && a === 3 && a == 4 && a == 5 && a == 6)输出为ture 
```js
let b = 1;
Object.defineProperty(window, 'a', {
  get() {
    console.log('获取a值')
    return b++
  },
})
console.log(a === 1 && a === 2 && a === 3 && a == 4 && a == 5 && a == 6)
// 获取a值
// 获取a值
// 获取a值
// 获取a值
// 获取a值
// 获取a值
// true
```
另外 假设if(b==1&&b==2&&b==3)是等于 true的，也可以这样实现
```js
const arr = [1, 2, 3]
let index = 0

const b = {
    valueOf() {
        return arr[index ++]
    }
}

console.log(b == 1 && b == 2 && b == 3)
```

## 25、undefined和null的区别

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

   


## 26、TS里interface和type的区别

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


## 27、table表格的虚拟滚动怎么实现
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
    margin: 0;
    padding: 0;
    }
    .virtual-scroll-viewport {
        position: relative;
        width: 240px;
        height: 300px;
        margin: 150px auto 0;
        overflow: auto;
        will-change: scroll-position;
        border: 1px solid #aaaaaa;
    }
    /* 撑开高度 */
    .virtual-scroll-spacer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .virtual-scroll-list {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .virtual-scroll-item {
        height: 50px;
        padding-left: 15px;
        line-height: 50px;
    }
    .virtual-scroll-item:nth-child(2n) {
        background: #f6f8fa;
    }
  </style>
</head>
<body>
  <div class="virtual-scroll-viewport">
    <div class="virtual-scroll-spacer"></div>
    <div class="virtual-scroll-list"></div>
  </div>
</body>
<script>
// 获取dom
const virtualViewportDom = document.querySelector('.virtual-scroll-viewport');
const virtualSpacerDom = document.querySelector('.virtual-scroll-spacer');
const virtualListDom = document.querySelector('.virtual-scroll-list');
const VIEWPORT_HEIGHT = 300; // 视口高度
const ITEM_HEIGHT = 50; // 列表项高度
const COUNT = 10; // 渲染数量
const TOTAL_COUNT = 100000; // 总条数
const TOTAL_HEIGHT = ITEM_HEIGHT * TOTAL_COUNT; // 总高度
let scrollTop = 0, translateY = 0;
virtualSpacerDom.style.height = TOTAL_HEIGHT + 'px';

// 监听scroll事件
virtualViewportDom.addEventListener('scroll', function (e) {
    scrollTop = this.scrollTop;
    const start = Math.max(Math.floor(scrollTop / ITEM_HEIGHT) - 2, 0);
    const end = Math.min(start + COUNT, TOTAL_COUNT);
    const y = start * ITEM_HEIGHT;
    if (scrollTop === 0 || scrollTop === TOTAL_HEIGHT - VIEWPORT_HEIGHT || Math.abs(translateY - y) >= 100) {
        render(start, end);
        translateY = y;
        virtualListDom.style.transform = 'translate3d(0px, ' + translateY + 'px, 0px)';
    }
});

// 初次渲染
render(0, COUNT);

function render(start, end) {
    let html = '';
    // 移除多余的dom
    let list = document.querySelectorAll('.virtual-scroll-item');
    for (const item of list) {
        const index = Number(item.dataset.index);
        if (index < start || index >= end) {
            item.remove();
        }
    }
    list = document.querySelectorAll('.virtual-scroll-item');
    if (list.length > 0) {
        const lastStart = Number(list[0].dataset.index);
        const lastEnd = Number(list[list.length - 1].dataset.index);
        if (end - 1 - lastEnd > 0) { // 下滑
            for (let i = lastEnd + 1; i < end; i++) {
                html += '<div class="virtual-scroll-item" data-index="' + i + '">item' + i + '</div>';
            }
            virtualListDom.insertAdjacentHTML('beforeend', html);
        } else if (start - lastStart < 0) { // 上滑
            for (let i = start; i < lastStart; i++) {
                html += '<div class="virtual-scroll-item" data-index="' + i + '">item' + i + '</div>';
            }
            virtualListDom.insertAdjacentHTML('afterbegin', html);
        }
    } else {
        // 快速滑动或拖动滚动条或初次渲染
        for (let i = start; i < end; i++) {
            html += '<div class="virtual-scroll-item" data-index="' + i + '">item' + i + '</div>';
        }
        virtualListDom.innerHTML = html;
    }
}
</script>
</html>
```
## 28、从零搭建项目，需要做什么准备

## 29、懒加载

## 30、如何做权限控制

## 31、token jwt

## 32. Typescript和JavaScript的区别？typescript有什么作用？
TypeScript引入了静态类型检查，能够帮助开发者在编码阶段捕获错误，开发者可以在代码中显式地定义变量的类型，并在编译时进行类型检查。这有助于在编码阶段发现潜在的类型相关错误，并提前解决问题，避免了很多潜在的BUG。

TypeScript支持类、接口、泛型等面向对象的概念。它使得代码结构更清晰，可读性更好，更易于组织和维护。通过接口和类的定义，可以明确指定数据的结构。

## 字节一轮面试题
*字节一轮面试---start*
### （一）手写双向绑定原理
[手写双向绑定原理](https://blog.pengxiao.xyz/front/vue/v-model.html)

### （二）微任务宏任务代码面试题

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




### （三）浏览器从输入url到页面加载完成发生了什么

涉及内容很广，网址dns解析，HTTP缓存机制，服务端和客户端的TCP链接（三次握手），HTTP请求；css，js，html文件资源解析，构建DOM树，四次挥手

### （四）算法题

请手写一个函数，第一个参数为二维数组，第二个参数为一个数字；

若在数组里找到该数字则输出true，否则输出false

二维数组的特点：每一行的数字递增，每一列的数字递减；

*（请根据二维数组特点写，不能使用暴力解法）*

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```

*字节一轮面试---end*



## 华为OD编程题

### （1）任务总执行时长

### （2）最小调整顺序次数

### （3）计算机网络信号

