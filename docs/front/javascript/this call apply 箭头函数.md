---
title: this | call | apply | 箭头函数
meta:
  - name: description
    content: this、call、apply和箭头函数
  - name: keywords
    content: this call apply 箭头函数
---

# this、call、apply

## 一、this介绍

在 JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象下运行，而 this 就是函数运行时的环境。

JavaScript 支持运行环境动态切换，也就是说 this 的指向是动态的，在函数定义的时候是确定不了的，只有函数执行的时候才能确定，实际上 this 的最终指向的是那个调用它的对象。

由于函数是独立于原始对象单独保存的，因此可以在不同的环境中执行，而 this 的设计就是为了方便在函数体内部直接获得当前的运行环境。

## 二、函数中的this指向

1. 常见得到编程语言，几乎都有this关键字（Objective-C中和python用的是self），JavaScript中的this不太一样
2. 常见的面向对象编程语言中，Java，C++，Swift，Dart，this通常只出现在类中，类中的方法（特别是实例方法）中，this代表当前调用对象
3. JavaScript的this更加灵活，无论是位置还是含义；this使得访问变量非常方便

## 1. this在全局作用域的指向

浏览器：window（globalObject），但是this一般是在函数里使用，很少在全局作用域下使用this；

Node环境：{}

## 2. this指向

函数在创建时，会创建函数执行上下文

![image-20211206143427060](@alias/image-20211206143427060.png)

```js
function foo() {
    console.log(this)
}
// 1. 调用方式一：直接调用
foo()
// 2. 调用方式二：将foo放在一个对象中，再调用
let obj = {
    name: 'mx',
    foo: foo
}
obj.foo()
// 调用方式三：通过call/apply调用
foo.call("abc")
foo.apply("cdf")
```

![image-20211206144314036](@alias/image-20211206144314036.png)

函数在调用时，JavaScript会默认给this绑定一个值，且是在运行时被绑定。

 this指向和函数所处的位置是没有关系的，和调用的方式和位置有直接关系。

## 3. 默认绑定

```js
//默认绑定，独立函数调用
function foo() {
    console.log(this)
} 
function foo2() {
    console.log(this)
    boo() // 函数独立调用
}
function foo3() {
    console.log(this)
    foo2() // 函数独立调用
}
function foo4() {
    console.log(this)
    foo3()  // 函数独立调用
}
function foo5() {
    function bar() {
        console.log(this)
    }
    return bar
}
let fn = foo5()

foo() // window
foo4() // 全是window,因为函数是独立调用的
fn() // window
```



## 4. 隐式绑定

函数被调用时，是通过某个对象调用。this便会绑定该对象。

`Object.fn()`

`Object`对象会被js引擎绑定到fn函数中的this里面

```js
// 隐式绑定
let obj = {
    name: 'mx',
    eating: fn
}
obj.eating() // obj对象 
```

```js
// 隐式绑定案例2
let obj1 = {
    name: 'obj1'
    foo: function() {
        console.log(this)
    }
}
let obj2 = {
    name: 'obj2'
    bar:obj1.foo
}
obj2.bar() // this指向的是obj2
```





## 5. 显示绑定

**call/apply/bind绑定this**

foo函数直接调用和call/apply调用不同在于this绑定不同

foo函数直接调用，this指向全局对象window

call/apply可以明确指定绑定this的对象

```js
function foo() {
    console.log(this)
}
let obj = {
    name: 'obj'
}
foo() // 隐式绑定
foo.call(obj)  // 显示绑定obj
foo.apply(obj) // 显示绑定obj
foo.apply('aaa') // 显示绑定aaa
```

**bind显示绑定**

```js
function foo() {
    console.log(this)
}
let obj = {
    name: 'obj',
    foo: foo.bind("abc")
}
obj.foo()  // this指向bind绑定的abc，说明bind隐式绑定 > 隐式绑定
```

**默认绑定和显示绑定bind同时：显示绑定优先级更高**

```js
// 默认绑定和显示绑定bind同时：显示绑定优先级更高
function foo() {
    console.log(this)
}
var newFoo = foo.bind("abc")  // 显示绑定
newFoo()  // 隐式绑定
```



## 6. new绑定

```js
function Person() {
    return this  //也即是P
}
// 调用上面的函数，可以用new，会生成一个新对象，并且把该对象赋值给内部的this，并且返回
let p = new Person() // p会指向this
```

**通过一个new关键字调用一个函数时（构造器），这个时候this是在调用这个构造器时创建出来的对象**

```js
// this = new出来的对象
// 绑定的过程就是new绑定
function Person(name,age) {
    this.name = name
    this.age = age
    return this
}
let p1 = new Person('mx',18)
let p2 = new Person('cf',100)
console.log(p1.name,p1.age,p1)
console.log(p2.name,p2.age,p2)
```

![image-20211206172823210](@alias/image-20211206172823210.png)



## 7. 绑定优先级

**new关键字不能和apply/call一起使用**

new绑定 > call/apply/bind显示绑定 > 隐式绑定（obj.foo()） > 默认绑定（独立函数调用）

```js
function foo() {
    console.log(this)   // this指向的是{}，说明new绑定 > bind显示绑定
}
let bar = foo.bind('abc')
let obj = new bar()
```



## 8. 规则之外：忽略显示绑定

总有些语法，超出了绑定规则之外

**apply/call/bind : 当传入null/undefined时，自动将this绑定全局对象**

```js
// apply/call/bind : 当传入null/undefined时，自动将this绑定全局对象
function foo() {
    console.log(this)
}
foo.call('abc')   // this指向abc
foo.apply({})	  // this指向{}
foo.call(null)    // this指向window
foo.call(undefined)	// this指向window

var bar = foo.bind(null)
bar()   // this指向window
```



## 9. 规则之外：间接函数引用

```js
var obj1 = {
    name: "obj1",
    foo: function() {
        console.log(this)
    }
}
var obj2 = {
    name: "obj2"
};  // 这儿需要用"；"隔开，否则会和(obj2.bar = obj.foo())() 连在一起，所以会找不到obj2.bar
(obj2.bar = obj.foo())()  // 独立函数调用，this指向的是全局window
```



## 三、apply、call的区别

**传参不同：**

```js
function sum(num1,num2,num3) {
    console.log(num1,num2,num3,this)
}
sum.call("call",20,30,40)
sum.apply("apply",[20,30,40])
```

## 四、this补充

```js
// 1、函数作为参数的this指向
function hySetTimeout(fn, duration) {
    fn()
}
hySetTimeout(function() {
    console.log(this)  // window
})
// 2、函数作为参数的this指向
function hySetTimeout(fn, duration) {
    fn.call('abc')
}
hySetTimeout(function() {
    console.log(this)  // abc
})

// 3、监听事件的this
<div class="box" style="width: 200px; height: 200px; background-color: red;"></div>
const boxDiv = document.querySelector('.box')
boxDiv.onclick = function() {
    console.log(this)   // div.box盒子的DOM
}
boxDiv.addEventLister('click',function() {
    console.log(this)   // div.box盒子的DOM
})
```

![image-20211207102623760](@alias/image-20211207102623760.png)

## 内置函数的绑定：高级函数和箭头函数的this

- 箭头函数没有自己的 this，箭头函数的 this 就是上下文中定义的 this。

- 箭头函数不能用做构造函数，因为没有它自己的this

```js
let arr = [
    { name: 'mx', id: 1 },
    { name: 'xl', id: 2 },
    { name: 'll', id: 3 },
]
let obj = { name: 'mx', id: 1 }
// 箭头函数没有自己的 this，箭头函数的 this 就是上下文中定义的 this。
arr.forEach((item) => {
    console.log(item,this) // this指向window
},obj)  

arr.forEach(function(currentValue, index, arr) {
  console.log(currentValue,index,arr);
  console.log(this,"this"); // this指向arr[0]
}, arr[0])
```

## 五、箭头函数

## 1. this规则之外：箭头函数

es6新增加的编程函数的写法，比函数表达式更简洁

- 箭头函数不会绑定this、arguments属性，即不使用this的四种规则，而是根据外层作用域来决定this
- 箭头函数不能作为构造函数，不能和new一起来使用
- () 参数； => 箭头； {} 函数体

## 2. 箭头函数的简写

1.  如果只有一个参数，() 可以省略

   ```js
   arr.forEach(item => {})
   ```

2.  如果函数执行体只有一行代码，{} 可以省略，代码执行结果作为返回值

   ```js
   arr.filter(item => item % 2 === 0)
   ```

3.  如果函数执行体返回一个对象，需要用 () 括起来

   ```js
   var bar = () => ({ name: 'mx', age: 18 })
   ```

## 3. 没有箭头函数和有箭头函数

```js
var obj = {
    data: [],
    getData: function() {
        // 箭头函数之前
        // var _this = this  // 拿到外层作用域赋给_this
        // setTimeout(function() {
        //     var result = ['mx','la']
        //     _this.data = result   // 给外层作用域赋值
        // },2000)
        // 箭头函数之后
        setTimeout(() => {
            var result = ['mx','la']
            this.data = result  // this直接指向外层作用域
        },2000)
    }
}
obj.getData()
```

## 六、call、apply、bind代码实现

apply/call/bind代码的实现，用c++，这里只是大概模拟一下，暂时不考虑太多边界情况adge case

```js
function foo(num) {
	if()  // 输入是字符串的情况
}
```

## 1. call代码实现

```js
// 在函数上添加一个ycall()方法
Function.prototype.hycall = function(thisArg, ...args) {
    // 区别哪个函数调用了还有hycall
    // 1.获取需要被执行的函数
    var fn = this
    // 2.对thisArg转成对象类型，防止它传入的是非对象类型，做数据转换处理(如果我传入的参数是123，123.fn()会报错)
    thisArg = thisArg ? Object(thisArg): window 
    // 
    // 3.调用需要被执行的函数
    thisArg.fn = fn
    var result = thisArg.fn(...arg)  // 如果想要函数有返回值，那么需用参数接收结果并且返回
    delete thisArg.fn
    
    // 4.将最终的结果返回，如果函数没有返回值，赋值会是undefined
    return result  
}
```

## 2. apply代码实现

```js
Function.prototype.hyapply = function(thisArg, argArray) {
    // 获取执行的函数
    var fn = this
    
    // 对参数转为对象类型
    // 边界情况：参数为undefined和null的情况
    thisArg = thisArg ? Object(thisArg): window
    // 边界情况：关于参数为0的情况(未考虑)
    // 边界情况：关于参数为fn的情况(未考虑)
    
    // 调用需要被执行的函数
    thisArg.fn = fn
    
    // argArray = argArray || []  // 或者写逻辑或
    var result = thisArg.fn(argAray ? ...argArray : [])
    delete thisArg.fn
    
    // 将结果返回
    return result
    
}
// sum.apply('abc',[10,20,30]),第二个参数传入一个数组
// sum.apply('abc')  // 没有参数的情况，会把argArray当成undefined，所以在解构...undefined会把报错，所以需要判断没有参数的情况
```

## 3. bind代码实现

```js
Function.prototype.hybind = function(thisArg, ...argArray) {
    // 获取函数
    var fn = this  // this指向的是调用的函数
    // 绑定this
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window
    
    function proxyFn(...args) {
        thisArg.fn = fn    // 定一个函数是为了隐式绑定传入的对象
        var finalArgs = [...argArray, ...args]   // 把第二次传参并接在一个数组
        var result = thisArg.fn(...finalArgs)
        delete thisArg.fn
        return result
    }
}
var bar = foo.hybind('abc')
var result = bar()

var newSum = sum.hybind('abc',10,20)
var result = newSum(30,40)
```

## 七、arguments参数

## 1. es6的剩余参数restParameters

```js
// rest parameters
function sum(...nums) {
    // 相当于var nums = []
    
}
sum(10,20,30)
// 展开运算spread
var sums = [10,20,30]
sum(...sums);

```

arguments参数是函数默认生成的

```js
function foo(num1, num2) {
    console.log(arguments)
}
foo(10,20,30,40,50)
```

**arguments类数组对象(array-like)，（长的像一个数组，但本质是对象）**

1. 可以获取该对象的长度argument.length
2. 根据索引值获取某一个参数argument[1]
3. 获取arguments所在的函数arguments.callee()

类似数组，但实际不是数组，arguments没有数组的一些方法，如forEach/map

## 2. arguments转成array参数

```js
//利用Array.prototype.slice把arguments转成array参数
var newArr1= Array.prototype.slice.call(arguments) {
    console.log(newArr)
}
// call遍历arguments每个this

//arguments转成array参数
var newArr2 = [].slice.call(arguments)
console.log(newArr2)

var newArr3= Array.prototype.slice.call(arguments,1,2) {
    console.log(newArr)
}

// 利用ES6语法
let newArr4 = Array.from(argument)
console.log(newArr4)

let newArr5 = [...arguments]
// 数组slice方法：追加在原型上
```

## 3. 箭头函数没有arguments

es6语法不推荐用arguments

```js
var foo = () => {
    console.log(arguments)  // 往上层找，node环境里有arguments，js全局没有
}
foo()
```

## 八、箭头函数面试题

## 1. 面试题一

```js
var name = 'window'  // window会保存name,window.name:'window'
var person = {
    name: 'person'
    sayName：function () {
        console.log(this.name)
    }
}
function sayName() {
    var sayfn = person.sayName()
    sayfn()  // 独立函数调用,window
    person.sayName()   // 隐式调用,person
    (person.sayName)()  // 隐式调用,person
    (b = person.sayName)()  // 赋值表达式，独立函数调用，window
}
sayName()
```

## 2. 面试题二

```js
var name = 'window'
var person1 = {
    name: 'person1',
    foo1: function () {
        console.log(this.name)
    },
    foo2:() => console.log(this.name),
    foo3: function () {
        return function () {
            console.log(this.name)
        }
    },
    foo4: function () {
        return () => {
            console.log(this.name)
        }
    }
}

var person2 = { name: 'person2' }

person1.foo1() // person1(隐式绑定)
person1.fool.call(person2) // person2(显示绑定优先级高于隐式绑定)
person1.foo2()  // window(箭头函数没有自己的this,this指向为外层作用域),外层作用域是window,外层是定义了person1对象，但是定义对象是没有生成作用域的，所以这里的作用域是全局作用域window
person1.foo2.call(person2) // window，因为foo2是箭头函数，所以call/apply/bind都不会生效

person1.foo3()()  // window,foo3绑定的对象person1,但person1.foo3()返回的是一个独立的函数，所以这里最后是独立函数的调用，因此this指向为window
person1.foo3.call(person2)()  // window,独立函数调用，person1.foo3.call(person2)绑定的是person2对象，因为显示绑定优先级高于隐式绑定，拿到的是独立函数，再调用，因此是window
person1.foo3().call(person2)  // person2

person1.foo4()() // person1,  person1.foo4()是一个箭头函数，上层作用域是person1,外层的函数是有作用域的，作用域是person1
person1.foo4.call(person2)()  // person2(上层作用域显示绑定，显示绑定优先级高于隐式绑定)
person1.foo4().call(person2)  //person1.foo4()返回的是一个箭头函数，箭头函数.call失效，所以直接绑定上层作用域person1

```

## 3. 面试题三

```js
var name = 'window'
function Person (name) {
    this.name = name
    this.foo1 = function () {
        console.log(this.name)
    },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function () {
        return function () {
            console.log(this.name)
        }
    },
    this.foo4 = function () {
        return () => {
            console.log(this.name)
        }
    }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1()  // person1,箭头函数外层作用域，是Person函数，所以是person1
person1.foo1.call(person2)  // person2(显示绑定)

person1.foo2() // foo2是箭头函数，绑定外层，因此this是person1
person1.foo2.call(person2) // person1 ,外层是person1

person1.foo3()()  // window独立函数调用
person1.foo3.call(person2)()  // window独立函数调用
person1.foo3().call(person2)  // person2

person1.foo4()()  // person1
person1.foo4.call(person2)()  // person2
person1.foo4().call(person2)  // person1
```

## 4. 面试题四

```js
var name = 'window'
function Person (name) {
    this.name = name
    this.obj = {
        name: 'obj',
        foo1: function () {
            return function () {
                console.log(this.name)
            }
        },
        foo2: function () {
            return () => {
                console.log(this.name)
            }
        }
    }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()  // window
person1.obj.foo1.call(person2)()	// window
person1.obj.foo1().call(person2)  // person2

person1.obj.foo2()()  // obj ，obj的上级作用域是foo2函数绑定的对象obj
person1.obj.foo2.call(person2)()  // person2,call绑定的是person2，并且作为foo2箭头函数的上级作用域
person1.obj.foo2().call(person2)  // obj
```

```js
// 区别提示 
// 代码块，有作用域
{
    var name = 'abc'
    console.log(name)
}
// 赋值给对象obj，没有作用域
var obj = {
	name: 'mx'
}
```


<ClientOnly>
  <Reward />
</ClientOnly>

<ClientOnly>
  <Valine></Valine>
</ClientOnly>