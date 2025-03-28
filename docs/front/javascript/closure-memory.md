---
title: 闭包和内存泄漏 | js | javascript
meta:
  - name: description
    content: js的闭包内存以及内存泄漏
  - name: keywords
    content: 闭包 内存 内存泄漏
---

## 闭包、内存泄漏

JS的一等公民：函数（函数可作为返回值、参数）

Java的一等公民：对象（对象可作为返回值、参数）

## 一. 高阶函数复习

如果一个函数接受另外一个函数作为参数，或者该函数会返回另外一个函数作为返回值的函数，那么这个函数就是高阶函数。

**将函数作为另外一个函数的参数**

```js
// 将函数作为另外一个函数的参数

function foo(fn) {
    fn()  // 执行传入的函数
}
function bar() {
    console.log('bar')
}
foo(bar)  // 这里把函数bar作为参数传入foo()函数
```

```js
// calc()是一个高阶函数，因为它把另外一个函数当做参数
function calc(num1,num2,calcfn){
    console.log(calcfn(num1,num2))
}
function add(num1,num2) {
    return num1+num2
}
let n = 10
let m = 20
calc(m,n,add) // 30
```

**函数作为另外一个函数的返回值**

```js
// 函数作为另外一个函数的返回值
// makeAdder()是一个高阶函数，因为它把另外一个函数当做返回值返回
function makeAdder(count) {
    function add(num) {
        return count + num
    }
    return add  // 把add函数作为makeAdder的返回值，所以每次调用makeAdder，返回的是add函数
}

var add100 = makeAdder(100)
// 所以，add100相当于
function add100(num) {
    return 100 + num
}

console.log(add100(10))  // 结果是110
```

function和method

函数function，独立的函数称之为函数

方法method，当某一个函数属于某一个对象时，称该函数为该对象的方法

### 1. filter过滤（返回）

```js
let numArr = [5,10,23,11]
numArr.filter((item, index, arr) = > {
	return false
})
```

filter()数组对象的方法，一般称filter为方法，称为函数也没问题，但称filter更精准一点。

### 2. map映射（返回一个新数组）

### 3. forEach迭代（没有返回值）

### 4. reduce累加

```js
nums = [1,2,3,4,5]
let total = nums.reduce((pre,cur) => {
    return pre+cur
},0)
console.log(total) // 1
```

### 5. find

### 6. findIndex（返回元素的数组下标值）

### 7. some

### 8. every

### 9. sort



## 二、JS闭包定义

1. 闭包：Closure，又称词法闭包（Lexical Closure）或函数闭包（function closures）
2. 在支持头等函数的编程语言中，实现词法绑定的一种技术（在编译时就确定了）
3. 闭包在实现上是一个结构体，存储了一个函数和一个关联的环境（相当于一个符号查找表）
4. 闭包和函数最大区别，当捕捉闭包时，它的自由变量会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能正常运行。
5. 闭包：函数+可以访问的自由变量

**MDN对JS闭包的解释**

1. 一个函数和其对周围状态（lexical environment，词法环境）的引用捆绑在一起，或者说被函数引用包围，这样的组合就是闭包（closure）
2. 也就是说，闭包让你在一个内层函数中访问到其外层函数的作用域
3. 在JavaScript中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

**争议：可以访问和必须访问**

> 可以访问：
>
> 一个函数可以访问外层变量，不管他访问还是没有访问，那他都可以称为闭包函数。
>
> 必须访问：
>
> 一个函数可以访问外层变量，并且访问了，才成为闭包。
>
> 一个函数可以访问外层变量，但是它没有访问，那就不称做闭包。

**总结**

1. 一个普通的function函数，如果它可以访问外层作用域的自由变量，那么这个函数就是一个闭包
2. 从广义来说，JavaScript中的函数都是闭包
3. 从狭义来说，JavaScript中的函数，如果访问了外层作用域的自由变量，那么它是一个闭包

```js
// demo是一个闭包函数,因为它访问了外层函数的name
var name = 'mx'
function demo() {
    console.log(name)
}

// bar函数是一个闭包函数，因为它访问了外层函数的name
function foo() {
    var name = 'mx'
    function bar() {
        console.log('bar',name)
    }
    return bar
}

var fn = foo()
fn()
```

![image-20211205110820391](@alias/image-20211205110820391.png)

![image-20211206105443810](@alias/image-20211206105443810.png)

![image-20211206105957496](@alias/image-20211206105957496.png)

foo()函数执行上下文出栈了，如果没有引用会被销毁掉，但是因为fn有引用指向bar，而bar又指向foo，即bar函数内部引用foo的变量name，所以foo执行完了出栈，但不会被销毁掉；

![image-20211206105658718](@alias/image-20211206105658718.png)

## 三、闭包的内存泄漏

foo()执行完，foo()的AO对象应该被销毁的，应该被GC垃圾回收，但是因为有引用关系，所以销毁不掉，因此存在内存泄漏的问题。引用链的所有对象都是无法释放的。

如果要解决内存泄漏的问题，把fn = null即可。也就是把fn: 0xb00 变为fn: null

![image-20211206111058334](@alias/image-20211206111058334.png)

把foo = null

![image-20211206111154075](@alias/image-20211206111154075.png)

### 内存泄漏案例

```js
function createFnArray() {
    var arr = new Array(1024*1024).fill(1) //创建一个1024*1024大的数组，并且填充1
    // 因为1是一个整数，整数：4个字节
    // 内存多大：4byte*1024*1024*100个1 = 4kb*1024*100 = 400M
    return function() {
        console.log(arr.length)
    }
}

var arrayFns = []  // 只要这个对象不是空对象，创建的100个对象是不会被销毁，因为引用关系
for (var 1 = 0; i < 100; i++) {
    // createFnArray() 需要有变量接收，如果没有会销毁
    arrayFns.push(createFnArray())
}

for (var 1 = 0; i < 100; i++) {
    // createFnArray() 需要有变量接收，如果没有会销毁
    setTimeout(() => {
    	arrayFns.push(createFnArray())
    },100*i)
}
// var arrayFn = createFnArray()
setTimeout(() => {
    for(let i = 0; i < 50; i++) {
        setTimeout(() => {
            arrayFns.pop()
        },100*1)
    }
},10000)
// arrayFn = null
```

![image-20211206131930009](@alias/image-20211206131930009.png)

```js
function createFnArray() {
    var arr = new Array(1024*1024).fill(1) //创建一个1024*1024大的数组，并且填充1
    // 因为1是一个整数，整数：4个字节
    // 内存多大：4byte*1024*1024*100个1 = 4kb*1024*100 = 400M
    // 浮点数为8byte,在JS里面number为8byte，如果number特别小，js会为它分配4byte，如果number特别大，js会为它分配8byte，8byte为2的64次方
    // 小的数字类型，在V8中成为Smi，小数字2的32次方
    return function() {
        console.log(arr.length)
    }
}

var arrayFns = []  // 只要这个对象不是空对象，创建的100个对象是不会被销毁，因为引用关系

for (var 1 = 0; i < 100; i++) {
    // createFnArray() 需要有变量接收，如果没有会销毁
    setTimeout(() => {
    	arrayFns.push(createFnArray())
    },100*i)
}
// var arrayFn = createFnArray()
setTimeout(() => {
    for(let i = 0; i < 50; i++) {
        setTimeout(() => {
            arrayFns.pop()
        },100*1)
    }
},10000)
// arrayFn = null
```

![](@alias/image-20211206135946374.png)

## 四、函数执行过程的内存

```js
function foo() {
    var name = 'mx'
    var age = 18  // 如果age没有被引用，会被销毁
    function bar() {
        console.log('bar')
    }
}
function test() {
    console.log('test')
}
foo()
test()
```

**GO对象:**

Date，String，window，foo: 0xa00，name：undefined，test：0xb00

**函数foo的AO对象:**

（parentScope父级作用域：GO（0xa00）；函数执行体）

**函数test的AO对象:**

（parentScope父级作用域：GO（0xa00）；函数执行体）

**函数bar的AO对象:**

（parentScope父级作用域：AO（0xb00），也就是foo；函数执行体）

**ECStack调用栈**

GO进栈 -> foo()的AO进栈 -> bar()的AO进栈 -> bar()出栈 -> foo()出栈 -> test()进栈 -> test()出栈 -> GO出栈

## 五、闭包引用的自由变量销毁

```js
function foo() {
    var name = 'mx'
    var age = 18  // 如果age自由变量没有被引用，会被v8引擎销毁
    function bar() {
        console.log(name)
        console.log('bar')
    }
}
function test() {
    console.log('test')
}
foo()
test()
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>


