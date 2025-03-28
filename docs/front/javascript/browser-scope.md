---
title: 浏览器工作原理 | V8引擎 | 执行上下文 | 作用域链
meta:
  - name: description
    content: js的浏览器工作原理、V8引擎、执行上下文和作用域链
  - name: keywords
    content: 浏览器 V8 执行上下文 作用域链
---
《高级JavaScript教程》一共十一篇文章，详细地从浏览器的底层原理，js的底层源码深入了解JavaScript，最好是能从第一篇文章（当前文章）往下阅读，逐渐了解它，你会有更层次的理解。
# 浏览器工作原理、V8引擎、执行上下文和作用域链

## 一、认识JavaScript

1. 从编程语言的发展历史，分为三个阶段

   1. 机器语言：100001000101000，机器指令

   2. 汇编语言：mov ax,bx，编程指令
   3. 高级语言：C、C++、Java、JavaScript 、Python、 Go

2. 从发展历程来看，越来越接近人类语言；

3. 高级语言又分为：编译型语言和解释型语言

4. 编译型语言。C、C++先转换为可执行文件，电脑再运行；java先转换为字节码，再转换为机器码
5. 解释型语言。Javascript、python先转换为源码。



### JavaScript代码在浏览器中的执行：

（1）访问网址，网址会转换为服务器ip地址。

（2）服务器返回index.html文件，浏览器解释HTML文件，遇到link标签，下载css文件。

![image-20211112112754813](@alias/image-20211112112754813.png)

代码的解释过程是由浏览器内核完成的



## 二、浏览器内核

![image-20211116093259200](@alias/image-20211116093259200.png)

blink：Google Chrome, Edge, Opera、

所有文件解释的过程都是由浏览器内核完成的。

常说的浏览器内核指的是浏览器的排版引擎（layout  engine），也称浏览器引擎（browser engine），页面渲染引擎（rendering engine）或样版引擎

## 三、浏览器渲染过程

![浏览器渲染过程图解](@alias/image-20211116100009311.png)

HTML ---> HTML paster  --->  DOM Tree  ---> 

​																						Attachment  --->  (通过layout布局，因为不同的浏览器宽度不一样)Render Tree --> Paiting --->display

Style Sheets -->  Css paster  --->  Style Rules --->



## 四、javascript引擎

js代码由javascript引擎执行

![image-20211116100106685](@alias/image-20211116100106685.png)



## 五、浏览器内核与JS引擎的关系

![浏览器内核与JS引擎的关系图解](@alias/image-20211116103713639.png)



## 六、V8引擎(重要)

![V8引擎图解](@alias/image-20211116104717360.png)

计算机不认识JavaScript代码，所以需要通过引擎转换为就计算机认识的代码；

v8内核：Blink

cpu不同，执行机器指令也是不一样的；

字节码转换为对应机器运行的语言，字节码--》汇编代码--》机器指令；

函数指令多次，会被标志位HOT函数，则对应的字节码变为对应机器的代码并且被收集，需要用时直接用，就不需要每次都要通过字节码转换为机器代码；

存在情况，例如传参的类型改变了，跑不了优化的机器码，就会跑Deoptimization，重新转换为字节码；

后面会提到，js中作用域提升是和Parse转换为AST有关



## 七、V8引擎的架构

Parse:  https://v8.dev/blog/scanner

Ignition：https://v8.dev/blog/ignition-interpreter

TurboFan：https://v8.dev/blog/turbofan-jit

![V8引擎的架构图解](@alias/image-20211116110701805.png)



## 八、预解析

官方V8引擎解释图

![官方V8引擎解释图](@alias/image-20211116111854416.png)

preParser：预解释



 ### 8.1 初始化GlobalObject全局对象

js引擎在执行代码之前会进行预解析，代码被解释，V8引擎内部会在堆内存中给我们创建一个对象GlobalObject（全局对象）

（1）该对象所有的作用域（scope）都可以访问

（2）里面会包含有Date, Array, String, Number, setTimeout , setInterval等等

（3）其中还有一个window指向自己

```js
let name = 'mx'
// 1、代码被解析，V8引擎内部会帮助我们创建一个对象
let gloabalObject = {
    String: '类'
    Date: '类'
    setTimeout: '函数'
    window: globalObject  //全局对象
    name: undefined  // 代码还没运行，在解析阶段也会把name放在全局对象，但是还没有运行，所以name的值是undefined
    // 这也就是var作用域提升的原理所在。
}
```



### 8.2 执行上下文栈

执行代码（为了执行代码，v8引擎内部会有一个执行上下文栈（函数调用栈Function Excution Context Stack，简写ECStack）；）

```js
// 2.1 代码在运行之前会被加载到内存里，函数也会被放进内存里，j函数调用栈Excution Context Stack，简写ECStack
// 2.2 全局代码需要被执行，那么就会创建全局执行上下文，globel Excution Context
```

需要被执行的代码/函数等等都需要放在栈里面 。执行完之后就会出栈。栈结构这个涉及到数据结构的栈和堆。

有些代码没有运行，所以不进行解释，只会被做预解释，目的为了提高性能。



### 8.3 全局执行上下文

内部有一个VO（varlable Object：变量对象），指向GlobalObject全局对象。

![image-20211202134542699](@alias/image-20211202134542699.png)

```js
console.log(sum)
sum = 20 + 30
// 所以，如果我在执行函数之前打印sum，会在GO全局对象里面找有没有这个sum，是可以找到sum这一个变量的，但是因为未执行，所以会是undefined，
```



## 九、全局执行上下文如何执行函数

函数和变量不一样，在函数定义之前打印函数，函数也是可以正常运行的。

### 9.1 创建函数对象VO

1. 解析的过程发现定义的是一个函数，（js引擎会给函数开辟一个空间，用于存储函数），给函数创建一个对象，而不是赋值undefined

2. 函数的存储空间保存两个东西：

   （1）父级作用域

   （2）函数执行体

### 9.2 创建函数执行上下文

3. 执行函数，在ECStack自动创建函数执行上下文，Function Excution Context Stack，把函数放进函数调用栈

4. 函数执行上下文里保存两个东西：

   （1）VO（variable object）对象变量：AO

   ​		  AO类似GO，但是储存的是该函数的变量或内置函数地址。

   （2）函数体代码

```js
foo() // 可以正常运行函数
function foo() {
	console.log('foo')
}

// 解析之前创建全局对象
let gloabalObject = {
    String: '类'
    window: globalObject  //全局对象
    name: undefined
    foo:  0xa00 // 1、保存的是该函数的内存地址，引用函数对象
    //解析的过程发现定义的是一个函数，会给函数创建一个对象，而不是赋值undefined
}
```

5. 图解释

![image-20211202163722093](@alias/image-20211202163722093.png)

6. 如果函数执行完毕，函数执行上下文就会移出调用栈，并被销毁

![image-20211202163215286](@alias/image-20211202163215286.png)

7. 如果执行过程中发现还有函数，就会再新创建一个函数执行上下文；即一旦有函数，就会在ECStack调用栈新建该函数的执行上下文



## 十、作用域链

### 10.1 查找变量

查找一个变量，其实是沿着作用域链查找的。

```js
// 例如name现在bar函数的作用域找，没找到，就往父级作用域foo找，仍然没找到，再往foo函数的父级作用域找，找到了name = 'mx'; 如果在全局作用域也找不到，会去window全局对象找。特例，浏览器会保留name的值，window对象里面有name属性，并且能打印name = 'mx'

let name = 'mx'

foo(123)
function foo(num) {
    console.log(m)
    let m = 10
    let n = 20 
    
    function bar() {
        console.log(name)
    }
    
    bar()
}
```

```js
let name = 'mx'

foo(123)
function foo(num) {
    console.log(m)
    let m = 10
    let n = 20 
    
    function bar() {
        console.log(name)
    }
    
    bar()
}
// 查找一个变量，其实是沿着作用域链查找的。
// 例如name现在bar函数的作用域找，没找到，就往父级作用域foo找，仍然没找到，再往foo函数的父级作用域找，找到了name = 'mx'; 如果在全局作用域也找不到，会去window全局对象找。特例，浏览器会保留name的值，window对象里面有name属性，并且能打印name = 'mx'
```

函数在编译的时候，父级作用域就已经确定了

scope chain:  AO+ParentScope（父级作用域）  (也就是AO + GO)

 一旦有函数，就会在ECStack调用栈新建该函数的执行上下文

```js
let message = 'hello Global'

function foo() {
    console.log(message)
}

function bar() {
    let message = 'hello Bar'
    foo()
}

bar()

// foo函数和bar函数的父级作用域都是GO
```



### 10.2 父级作用域

函数在编译的时候，父级作用域就已经确定了

scope chain:  AO+ParentScope（父级作用域）  (也就是AO + GO)

```js
// foo函数和bar函数的父级作用域都是GO(全局作用域)
let message = 'hello Global'

function foo() {
    console.log(message)
}

function bar() {
    let message = 'hello Bar'
    foo()
}

bar()

```



## 十一、早期ECMA版本规范（ES5之前）

GEC（global excution context）: 全局执行上下文

FEC（functional excution context）: 函数执行上下文

早期ECMA的版本规范：

> 每一个执行上下文会被关联到一个变量环境（variable），在源代码中的变量和函数声明会被作为属性添加到VO中，对于函数来说，参数也会被添加到VO中

以上的执行上下文是基于早期的ECMA版本规范（面试官一般会问早期的，问最新的比较少）



## 十二、最新ECMA版本规范

VO（variable Object）改为VE（variable Environment）

变量对象VO的称呼改为变量环境VE

最新ECMA版本规范：

> 每一个执行上下文会关联到一个变量环境（variable Environment）中，在执行代码中，变量和函数的声明会作为环境记录（Enviroment Record）添加到变量环境中
>
> 对于函数来说，参数也会被作为环境记录添加到变量环境中

VE不一定是对象，也可以是环境记录



## 十三、作用域提升面试题

一、 面试题1

```js
var n = 100
function foo() {
	n = 200
}
foo()

console.log(n)  // 200
```

二、面试题2

```js
function foo() {
    console.log(n)  // undefined
    var n = 200
    console.log(n)  // 200
}
var n = 100
console.log(n) // 100
```

三、面试题3

```js
var n = 100
function foo1() {
    console.log(n)   //2、100
    // foo1的父级作用域是GO，而不是foo2的AO，foo1虽然是被foo2调用，但是foo1的parentScope为GO
}

function foo2() {
    var n = 200
    console.log(n)  //1、 200
    foo1()
}

foo2()
console.log(n) // 3、100
```

四、面试题4

```js
var a = 100
function foo() {
    console.log(a) // 100
}
foo()
```

五、面试题5

``` js
function foo() {
   	var a = b = 100   
    // 转换=>
    // var a = 100 和 b=100
    // b会变为全局变量
}
foo()
console.log(a)  // 报错，a没有定义，a在foo函数里面定义了，但是外面访问不了；
console.log(b)  // 100
```

六、面试题6

```js
function foo() {
    m = 100 // m变量没有定义，会被全局定义m
}
foo()
console.log(m) // 100
// 在很多编程语言里，如果变量没有定义直接赋值会直接报错，连编译都没通过。
// 但是在V8引擎里，会把未定义的m放在全局里定义
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>