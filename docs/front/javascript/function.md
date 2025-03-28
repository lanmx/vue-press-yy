---
title: 函数式编程 | js | javascript
meta:
  - name: description
    content: js的函数式编程：纯函数、柯里化、组合函
  - name: keywords
    content: 数式编程 纯函数 柯里化 组合函数
---

# 函数式编程：纯函数、柯里化、组合函数

## 纯函数

### 1. 理解javaScript纯函数（Pure function 纯函数）

函数式编程中有一个非常重要的概念叫纯函数，JavaScript符合函数式编程的范式，因此有纯函数的概念

- 在react开发中纯函数是多次被提及；react中组件被要求像是一个纯函数（为什么是像，因为还有class组件）
- react中的redux有一个reducer的概念，也要求是纯函数（react中的redux类似vue的vuex，但比vuex更复杂）
- 掌握纯函数对理解框架的设计有帮助

纯函数的维基百科定义

4在程序设计中，若一个函数符合以下条件，那么这个函数被称为纯函数：

- 此函数在相同的输入值中，需产生相同的输出
- 函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关
- 该函数不能有语义上可观察的函数副作用，例如，触发事件，使输出设备输出，或更改输出值以外物件的内容

总结

- 确定的输入，一定会产生确定的输出
- 函数在执行过程中，不能产生副作用



### 2. 副作用的理解

副作用（side  effect）

- 副作用本身是医学的概念，例如吃药产生副作用
- 在计算机科学中，也引用了副作用，表示在执行一个函数时，除了返回函数值之外，还对调用函数产生了附加的影响，比如修改了全局变量，修改参数或者改变外部的存储。

纯函数在执行的过程中是不能产生副作用

- 副作用往往是产生BUG的温床。

案例

- splice()非纯函数
- slice()纯函数

```js
var arr = [1,2,3,4,5]
// slice函数不会修改原数组，是一个纯函数
// slice只要给它传入一个start/end，对于同一个数组来说，不论调用多少次，无论在哪里调用，它会给我们返回确定的值
var newArr1 = arr.slice(0,2)  
console.log(newArr)   // 1,2
console.log(arr)     //1,2,3,4,5

// splice函数会修改调用数组对象本身，修改的这个操作就是产生的副作用，splice不是一个纯函数
// 可能有些地方用到被修改的参数，产生了bug
var newArr2 = arr.splice(2)
console.log(newArr2)  // 3,4,5
console.log(arr)   // 1,2
```

- 纯函数和非纯函数例子

```js
// foo是纯函数,相同的输入一定产生相同的输出，在执行过程中不会产生任何的副作用
function foo(num1,num2) {
    return num1 * 2 + num2 * num2
}

// bar不是纯函数，因为修改了外部的变量,修改了参数值
var name = 'abc'
function bar(info) {
    name = 'jjj'
    info.age = '100'
}

// test是纯函数
function test(info) {
    return {
        ...info,
        age:100
    }
}

// 可以看作纯函数，严格意义上不是纯函数
function printfInfo(info) {
    console.log(info.name,info.age)
}
```

- react的函数组件

```js
// 组件内部不能修改props值，违反了数据单向流
// vue组件也不允许
```





### 3. 纯函数的优势

1. 只需要关心它的输入和输出即可
2. 可以安心编写和使用
3. 保证了函数的纯度，这是单纯实现自己的业务逻辑，不需要关心传入的内容是如何获得或者依赖其他外部的变量是否发生修改
4. 用的时候，输入的内容不会被任意修改，并且有自己确定的输入，一定会有确定的输出

**react中要求无论是函数还是class声明一个组件，这个组件都必须像纯函数一样，保护它们的props不被修改**



## 函数柯里化

### 1. 理解柯里化

柯里化是属于函数式编程里非常重要的概念

维基百科解释柯里化：

- 计算机科学中，柯里化（Currying），又称卡瑞化 / 加里化
- 把接收多个参数的函数，变成接收一个单一参数（最初函数的第一个参数）的函数，并且返回接收余下的参数，并且返回结果的新函数的技术
- 柯里化声称：如果你固定某些参数，你将得到余下参数的一个函数

总结：

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数，这个过程称之为柯里化

```js
function foo(m,n,x,y) {
    return m + n + x + y
}
foo(10,20,30,40);
// 把foo函数转换为柯里化函数
// 柯里化的过程
function bar(m) {
    return function(n) {
        return function(x) {
            return function(y) {
                m + n + x + y
            }
        }
    }
}
bar(10)(20)(30)(40)
```



```js
var result = add(10,20,30)
console.log(sum)

function sum1(x) {
    return function(y) {
        return function(z) {
            return x + y + z
        }
    }
}
// 简写柯里化函数
var sum1 = x => y => z => {
    return x + y + z
}
// 相当于
var sum2 = x => y => z => x + y + z
// 相当于
var sum3 = x => {
    return y => {
        return z => {
            return x + y + z
        }
    }
}

var result2 = sum1(10)(20)(30)
```

### 2. 柯里化的作用：让函数职责单一

- 在函数式编程中，我们其实往往希望一个函数处理的问题尽可能的单一，而不是将一大堆的处理过程交给一个函数来处理

- 将每次传入的参数在单一的函数中处理，处理完后再在下一个函数使用处理完的结果

补充：在设计模式里，有一个原则叫：单一职责原则（SRP  single responsibility principle）

面向对象 => 类 => 类里面尽可能完成单一的事情

### 3. 柯里化例子 - 单一职责原则

```js
// 需求：x + 2 ； y * 2 ; z * z ; 函数 
function add (x, y, z) {
    x = x + 2
    y = y * 2
    z = z * z
    return x + y + z
}
console.log(add(10,20,30))
// 柯里化：
function sum(x) {
    x = x + 2
    return function(y) {
        y = y * 2
        return function(z) {
            z = z * z
            return x + y + z  // 不传参时可以不写function
        }
    }
}
console.log(sum(10,20,30))
```

### 4. 柯里化例子 - 逻辑的复用

```js
function sum(num1,num2) {
    return num1 + num2
}
console.log(sum(5,100))
console.log(sum(5,200))
console.log(sum(5,1000))

// 
function makeAdder(count) {
	count = count * count //这段代码逻辑可以复用
	return function(num) {
        return count + num
    }
}
```

日志打印的逻辑复用

```js
function log(date,type,message) { 		      		console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${message}]`)
}

log(new Date(), "DEBUG", "查找轮播图的BUG")
log(new Date(), "DEBUG", "查找菜单的BUG")
log(new Date(), "DEBUG", "查找数据的BUG")

// 这里newDate是重复的，可以逻辑复用
// 柯里化优化
 var log = date => type => message => {
     console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${message}]`)
 }
 var nowlog = log(new Date())
 nowlog('DEBUG')("查找轮播图的BUG")
 nowlog('DEBUG')("查找菜单的BUG")
 nowlog('FETURE')("添加新功能")

// 再优化
var nowAndDebugLog = log(new Date())("DEBUG")
nowAndDebugLog("查找轮播图的BUG")
nowAndDebugLog("查找菜单的BUG")
nowAndDebugLog("查找数据的BUG")

var nowAndDebugLog = log(new Date())("FETURE")
nowAndDebugLog("添加新功能")

```

### 5. 柯里化函数的实现代码Currying

传入一个函数，返回一个新函数

```js
function hyCurrying(fn) {
    // p判断当前已经接收的参数的个数，参数的本身需要接收的参数是否一致了
    // 当已经传入的参数大于等于需要的参数时，就执行
    function curried(...args) {
        if(args.length >= fn.length) {
            //return fn.call(this, ...args)
            return fn.apply(this, args)
        } else {
            // 没有达到个数时，需要返回以一个新的函数，继续接收参数
            function curried2(...args2) {
                // 接收到参数后，需要递归调用curried来检查函数的个数是否达到
                return curried.apply(this, [...args, ...args2])
            }
            return curried2
        }
    }
    return curried
}
// 函数接收参数的个数可以这样拿到fn.length
```

## 组合函数

### 1. 理解组合函数

把两个一起使用的函数组合

```js
function double(n) {
    return n * 2
}
function square(m) {
    return m ** 2
}
// 简单的组合函数
function composeFn(m, n) {
    return function(count) {
        return n(m(count))
    }
}
var newFn = composeFn(double, square) // 把上面定义的两函数当参数传进来
```

### 2. 通用组合函数的代码实现

```js
// 
function MXCompose(...fns) {  // 传入多个函数
    fns.some(item => {
        if(typeof item !== 'function') {
            throw new TypeError('Expected arguments are functions')
        }
    })
    
    function compose(...args) {
        var index = 0
        var result = fns.length ? fns[index].apply(this, args): args
        while(++index < length) {
            result = fns[index].call(this, result)
        }
        return result
    }
}

```

## JS补充

### 1. with-eval-strict

作用域：全局作用域（GO），函数作用域（AO），

每一个函数都是一个作用域，往外层形成作用域链。

### 2. with语句的作用：扩展一个语句的作用域链

**不建议开发使用with，因为严格模式不允许**

with可以形成自己的作用域，with() 可以写在函数外面也可以写在函数里面，主要作用是为了传入一个对象，那么该作用域会优先在该对象查找变量，若找不到再到外层沿着作用域链找。

```js
var mess = "hello"
var obj = { name: 'mx', mess: 'hi' }
function foo() {
    function bar() {
        with(obj) {
            console.log(mess) // hi ,打印的是obj的hi
        }
    }
}

var obj2 = { name: 'lan', mess: '漂亮！' }
with(obj2) {
    console.log(mess) // 漂亮！
}
```

vue3里面的ctx就是通过with(ctx)去访问变量的，但是不建议使用，因为它可能是混淆错误和兼容性问题的根源

### 3. eval全局函数

eval是一个特殊的函数，它可以将传入的字符串当作JavaScript代码来运行。

```js
var jsString = 'var mess = "hi~"; console.log(mess);' // 字符串语句用分号分割
// 把字符串语句用eval()函数也可以执行
eval(jsString)  // hi~
```

es6代码和.ts代码 => es5 => webpack: devtoool: "eval" ，eval函数弊端多多，不建议使用；

- eval代码可读性非常差（代码的可读性是高质量代码的主要原则）
- eval是一个字符串，有可能在执行过程中被截取，可能会造成被攻击的风险
- eval的执行必须经过JS解释器，不能被引擎优化

### 4. 严格模式

- ECMAScript5标准，JavaScript提出了严格模式（Strict Mode）;

- JS代码本身很灵活，没有严格模式下，`name = "mx", 123.name = '1234'`, 这些代码不会报错;

- 限制性的JavaScript模式使得隐式的代码脱离了"懒散（sloppy）的模式"

- 支持严格模式的浏览器在检测到代码有严格模式，会以更加严格的方式对代码进行检测和执行

**严格模式的限制：**

严格模式通过抛出错误来消除原有的静默（silent）错误

`"mx", 123.name = '1234'`   静默错误

```JS
// 静默错误
Object.defineProperty(obj,'name',{wrtiable: false}) // 禁用属性name
// 实际上用了
obj.name = 'mx'

// 静默错误
true.foo = 'abc'
```

严格模式让在JS引擎执行代码可以进行更多的优化，不需要对一些特殊语法处理

严格模式禁用了在ECMAScript未来版本中可能会定义的语法

保留字是未来可能会升为关键字，所以称为保留字；

### 5. 开启严格模式："use strict"

- 给文件开启严格模式：在文件头加"use strict"
- 函数开启严格模式：在函数体加"use strict"
- 打包工具会自动开启严格模式：webpack，vite，rollup（bunblie.js）

### 6. 严格模式常见限制

1. 禁止意外创建全局变量

   ```js
   // 非严格模式下
   mess = 'mx'  // mess是全局变量
   function foo() {
       age = 20   // age是全局变量
   }
   ```

2. 不允许函数有相同的参数名称

   ```js
   function foo(x,y,x) {
       console.log(x,y,x) 
   }
   foo(10,20,30) // 30,20,30; 后面的x把前面的x覆盖了
   ```

3. 静默错误

   ```js
   // 1. 静默错误
   NaN = 123
   ```

   ```js
   // 2. 静默错误
   Object.defineProperty(obj,'name',{
       writable: false;  // 不可赋值
       configurable: false  // 不可配置，不可删
   }) // 禁用属性name
   // 实际上用了
   obj.name = 'mx'
   delete obj.name
   // 3. 静默错误
   true.foo = 'abc'
   ```

4. 不允许使用原先的八进制格式

   ```js
   var num = 0o123  // 八进制
   var num2 = 0x123  // 十六进制
   var num3 = 0b100  // 二进制
   ```

5. with语句不允许使用

6. eval函数不会向上引用变量

   ```js
   // eval字符串代码的变量不会把变量升到全局
   var jsString = 'var mess = "hi~"; console.log(mess);' // 字符串语句用分号分割
   // 把字符串语句用eval()函数也可以执行
   eval(jsString)  // hi~
   console.log(mess)  // undefined
   ```

7. 严格模式的this不一样

**自执行函数的this指向undefined**

**setTimeout的this**

```js
// 1. 严格模式的this指向不一样
function foo() {
    console.log(this)  // this指向window
    // 2. setTimeout的this
    // setTimeout是一个黑盒子，是浏览器内部实现的，看不到代码内部的运行
    setTimeout(function() {
        console.log(this)  // 指向仍然是window，有可能是fn.apply(window)绑定了window对象
    },2000)
}
foo()
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
