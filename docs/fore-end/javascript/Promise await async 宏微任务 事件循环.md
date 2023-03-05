# promise、await、async、迭代器生成器、线程与进程、js/node事件循环

## 一、promise类

Promise是异步编程的一种解决方案；简单的说，Promise是一个容器，里面保存着某个未来才会结束的事情（通常是一个异步操作的结果）

从语法上说，Promise是一个对象，从它可以获取异步操作的消息

### 1.Promise对象两个特点

1. 对象的状态不受外界影响。

   - Promise有三种状态：pending（进行中）、fulfilled（已成功）和reject（已失败）。
   - 只有异步的结果可以决定当前是哪一种状态。任何其它操作都无法改变这个状态。
   - resolve -> fulfilled
   - reject -> rejected

2. 一旦状态改变，就不会再变，一定会有状态结果。

   - Promise状态只有两种可能：从pending变为fulfilled，从pending变为reject

     ![image-20220122104436259](@alias/image-20220122104436259.png)

   - 只要这两种状态发生了，状态就凝固，结果已确定，不再改变，这时称为resolved（已定型）

```js
promise.reject().catch(a => {
}).finally(b => {
})
promise.resolve().then(a => {
})
```

### 2. Promise类的方法

```js
Object.getOwnPropertyDescriptors(Promise.prototype)
```



### 3. then方法

1. then方法是Promise对象的原型链上的方法
2. 传入两个回调函数：resolve, reject
3. then方法传入的回调函数，会在Promise执行resolve函数时，被回调
4. catch方法传入的回调函数，会在Promise执行reject函数时，被回调
5. 同一个Promise可以被多次调用then方法，只要同一个Promise用了then，只要resolve方法执行，Promise的then方法都会执行 
6. then方法的返回值是new Promise，所以可以链式调用.then(res)，res就是then方法的返回值，链式调用的Promise就是上一个then的返回值

```js
returnnew Promise((resolve, reject) => {
    // 成功时回调resolve()
    resolve()
    // 失败时回调reject()
    reject()
})
```

### 4. catch方法

- 当executor抛出异常时，会调用拒绝reject回调函数

```js
const promise = new Promise(() => {
    throw new Error('Error')
})
```

- catch方法传入reject回调函数
- catch方法返回的是Promise对象，所以catch方法可以继续用then方法或catch方法

```js
Promise.catch(err => {
    console.log(err)
    throw new Error('Error') // 如果没有抛出异常，则走then
    // 如果有抛出异常则走catch
}).catch(err => {
    console.log(err)
}).then(res => {
    console.log(res)
})
```

### 5. finally方法

无论promise最终状态如何都会执行finally的回调函数

### 6. resolve方法

```js
Promise.resolve('lmx')
// 等价于
new Promise((resolve) => resolve('lmx'))
```

### 7. reject方法

```js
const promise = Promise.reject(new Promise(() => {}))
promise.then(() => {}).catch((err) => {
    // reject里面是什么内容，catch就会传进什么内容
    console.log(err) // new Promise(() => {})
})
```

### 8. Promise.all方法

- 所有promise都变成fulfilled时，才会执行then()

```js
// p1,p2...异步函数数组
Promise.all([p1,p2,...,pn]).then(() => {}).catch(() => {})
```

- 只要有一个Pi的异步返回了reject,那么整个promise都会是reject，去执行catch()函数

### 9. allSettled方法

如果不希望promise.all只要有一个reject就中断，可以使用allSettled

allSettled在ES11,ES2020新增

- 在所有Promise都有结果，不管是fulfilled，还是reject，都会有结果

### 10. race方法

- 只要有一个Promise变成fulfilled状态，就结束所有请求
- 如果有一个Promise变成rejected状态，会走catch，并结束所有请求
- 但是，我不管有多少个rejected，我只想拿一个fulfilled的结果怎么办？用any

```js
Promise.race([p1,p2,p3]).then(() => {}).catch(() =>{})
```

### 11. any方法

- 至少等到一个Promise变成fulfilled，才会决定新promise状态
- 如果全部都是rejected，也会等到所有promise变成rejected方法

```js
Promise.any([p1,p2,p3]).then(() => {}).catch((errors) =>{
    console.log(errors)
})
```

## 二、promise then方法代码实现

```js
// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          // try {
          //   const value = onFulfilled(this.value)
          //   resolve(value)
          // } catch(err) {
          //   reject(err)
          // }
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // resolve(1111) // resolved/fulfilled
  reject(2222)
  // throw new Error("executor error message")
})

// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
  return "aaaa"
  // throw new Error("err message")
}, err => {
  console.log("err1:", err)
  return "bbbbb"
  // throw new Error("err message")
}).then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})

```

## 三、迭代器和生成器

[迭代器和生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_generators)

### 1. 迭代器iterator

迭代器是可在容器对象（例如链表或者数组）上遍历的对象；

迭代器本身是一个对象，帮助我们对某个数据结构进行遍历的对象；

在JavaScript中，迭代器也是一个对象，需要符合迭代器协议（iterator protocol）

- 迭代器协议定义产生一系列值（无论是优先还是无限个）的标准方式，在js里的标准方式就是next方法
- next方法：一个无参数函数，返回具有两个属性的对象：done  和  value
  1. done（boolean）：如果迭代器可以产生序列的下一个值，则为false；如果迭代器已将序列迭代完毕，则为true，value则为迭代器结束后的默认值
  2. value：迭代器返回的任何JavaScript值，done为true时可忽略

```js
function createArrayiterator(arr) {
	let index = 0
    return {
        next: function() {
            if(index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}
// 无限迭代器
function createNumberiterator() {
    let index = 0
    return {
        next:function() {
            return { done: false, value: index++ }
        }
    }
}
```

### 2. 可迭代对象

可迭代对象和迭代器不是同一个概念；

当一个对象实现了iterator protocol协议时，它就是一个可迭代对象；

此对象必须实现@@iterator方法，使用Symbol.iterator访问该属性；

```js
// 创建一个迭代对象来访问数组
const iteratorObj = {
    names = [ 'mx', 'la', 'mm'],
    [Symbol.iterator]: function() {
        let index = 0
        return {
            // next: function() {  // 这里next函数有作用域，访问不了names，所以这里要改为箭头函数
            next: () => {
                if(index < this.names.length) {
                    return { done: false, value: arr[index++] }
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}
// 每次调这个函数生成的都是新的迭代器
const iterator = iteratorObj[Symbol.iterator]
console.log(iterator.next())
```

### 3. for...of

for...of遍历的东西必须是一个可迭代对象

```js
const obj = {
    name: 'lan',
    age: 20
}
for(const item of obj) {}  // obj不是一个可迭代对象，不用使用for...of
// ES9(ES2018新增特性)：对象也可以解构，但这里的原理用的不是迭代器
const newObj = { ...obj , address: '北京'}
```

### 4. 原生迭代器对象（内置迭代器）

数组Array / Map / Set /  arguments对象 / NodeList集合 / String 内置迭代器

### 5. 可迭代对象的应用

1. 可以用for...of遍历
2. 可以解构赋值
3. 展开语法（spread syntax）
4. 创建一些对象：new Map([Iterable])
5. 一些方法调用：Promise(iterable)

### 6. 自定义类的迭代

迭代器的中断可以用break、continue、return、throw

```js
// 案例: 创建一个教室类, 创建出来的对象都是可迭代对象
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
      return: () => {
        console.log("迭代器提前终止了~")
        return { done: true, value: undefined }
      }
    }
  }
}

const classroom = new Classroom("3幢5楼205", "计算机教室", ["james", "kobe", "curry", "why"])
classroom.entry("lilei")

for (const stu of classroom) {
  console.log(stu)
  if (stu === "why") break
}
```



### 7. 生成器generator（ 特殊迭代器）

生成器函数返回一个迭代器，生成器本身就是一个迭代器，所以也可以用生成器替代迭代器

`yield*` 可以生成一个可迭代对象

#### （1）生成器函数执行顺序

```js
function* foo(m) {
    let num1 = 0
    console.log(num1)
    yield
    
    let num2 = 10
    console.log(num2)
    yield
    
    let num3 = 20
    console.log(num3)
    yield 
}
	// foo()生成器函数不会执行，需要next()方法把每个yield提升，才会执行
    const generator = foo(5)
    console.log(generator.next()) // { done: false, value: 0 }
    console.log(generator.next()) // { done: false, value: 10 }
    console.log(generator.next()) // { done: false, value: 20 }
```



#### （2）生成器的next方法可以传递参数

```js
function* foo(m) {
    let num1 = 0
    console.log(num1)
    const n = yield num1
    
    let num2 = 10 * n * m
    console.log(num2)
    yield
}
    const generator = foo(5)
    console.log(generator.next()) // { done: false, value: 0 }
    console.log(generator.next(3)) // { done: false, value: 150  }
```



#### （3）生成器终止return

```js
function* foo(num) {
  const value1 = 100 * num
  console.log("第一段代码:", value1)
  const n = yield value1

  const value2 = 200 * n
  console.log("第二段代码:", value2)
  const count = yield value2
}
const generator = foo(10)
console.log(generator.next())
// 第二段代码的执行, 使用了return
// 那么就意味着相当于在第一段代码的后面加上return, 就会提前终端生成器函数代码继续执行
console.log(generator.return(15))
```



#### （4）生成器可以抛出异常throw

```js
function* foo() {
  const value1 = 100
  try {
    yield value1
  } catch (error) {
    console.log("捕获到异常情况:", error)
    yield "abc"
  }
  console.log("第二段代码继续执行")
  const value2 = 200
  yield value2
}
const generator = foo()
const result = generator.next()
generator.throw("error message")

```

#### （5）生成器替代迭代器

```js
function createArrayIterator(arr) {
    for(const item of arr) {
        yield item
    }
}
```

#### （6）`yield*` 可以生成一个可迭代对象

`yield*` 可以生成一个可迭代对象，下面代码同上，更加简洁

```js
function createArrayIterator(arr) {
     yield* arr
}
```

#### （7）生成器函数可迭代有范围的数字

```js
function createRangeIterator(start,end) {
    let index = 0
    while(index < end) {
        yield index++
    }
}
```

## 四、异步代码处理方案（Promise + generator 实现）

```js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      resolve(url)
    }, 2000);
  })
}
function* getData() {
    const res1 = yield requestData('lan')
    const res2 = yield requestData(res1 + 'min')
    const res3 = yield requestData(res2 + 'xiao')
    console.log(res3)
}
const generator = getData()
generator.next().value.then(res => {
    generator.next(res).value.then(res => {
        generator.next(res).value.then(res => {
            generator.next(res).value.then(res => {
        		generator.next(res)
   		   })
    	})
    })
})
```

### 1. 优化链式调用回调地狱代码

```js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      resolve(url)
    }, 2000);
  })
}
function* getData() {
    const res1 = yield requestData('lan')
    const res2 = yield requestData(res1 + 'min')
    const res3 = yield requestData(res2 + 'xiao')
    console.log(res3)
}
function execGenerator(genfn) {
    const generator = genfn()
    function exec(res) {
        const result generator.next(res)
        if(result.done) {
            return result.value
        }
        result.value.then(res => {
            exec(res)
        })
    }
}
execGenerator(getData)

```

### 2. 用async 、 await优化

```js
async function getData() {
  const res1 = await requestData("why")
  const res2 = await requestData(res1 + "aaa")
  const res3 = await requestData(res2 + "bbb")
  const res4 = await requestData(res3 + "ccc")
  console.log(res4)
}

getData()
```

## 五、async（asynchronous）

async用于声明一个异步函数

```js
async function foo() { // foo是一个Promise
    ...
    throw new Error(B)
    return A
}
foo.then((A) =>{A}).catch((B) => {B})
```

## 六、await

- async函数中，可以使用await关键字，调用另一个异步函数
- await后面跟表达式，这个表达式会返回一个Promise
- await等Promise状态变成fulfilled状态，再继续执行异步
- 如果await后面是普通的值，则直接返回该值
- 如果await后面是thenable对象，会根据对象的then方法调用决定值



## 七、进程和线程

例：vscode软件运行了，那就是有了一个进程；我同时yarn dev了两个项目，那么就有了两个线程；

例：浏览器是一个多进程，可以同时打开多个标签页；每个进程有多个线程，其中包括JavaScript线程

解释：

- 启动应用程序，即启动进程；

- 每个进程中，至少会启动一个线程用来执行程序代码，这个线程称之为主线程

- 进程是线程的容器

#### 1. 进程（process）

进程指计算机已经在运行的程序，是操作系统管理程序的一种方式

#### 2. 线程（thread）

线程是计算机中最小的计算单位，操作系统能够运行运算调度的最小单位，通常被包含在进程中

![image-20220210135505390](@alias/image-20220210135505390.png)

## 八、JavaScript线程

JavaScript是单进程，同一个时刻只能做一件事情，JavaScript的线程容器：浏览器、node...

JavaScript的axios.get请求只是js发送给浏览器的指令，处理网络请求的事情并不是js执行的，而是浏览器，浏览器执行完时后告诉js回调拿到结果

#### 1. 事件队列

setTimeOut()实现定时，本质是浏览器处理，浏览器是把回调事件放进事件队列queue（函数调用栈），到时间了再取出来执行。

## 九、浏览器的事件循环

js线程 -> 其它线程 -> js线程

![image-20220210142848962](@alias/image-20220210142848962.png)

## 十、事件队列：宏任务和微任务

#### 1. 事件队列

**事件队列**，维护着两个队列：宏任务队列（macrotask queue）和微任务队列（microtask queue）

#### 2. 规范

在执行任何宏任务之前，都必须先保证微任务队列是否还有任务需要执行，如果微任务有任务，优先执行微任务队列中的任务；必须执行完所有的微任务，才执行宏任务

- 宏任务队列：setTimeval、setTimeout、ajax、DOM监听、UI-Rendering

- 微任务队列：queueMicrotask()、Promise then回调、Mutation Observer API

执行顺序：

main script ->微任务队列 -> 宏任务队列

如果执行宏任里面还有微任务，就会把微任务放在微任务队列，优先执行微任务

#### 3. 面试题一

await紧跟的普通表达式不是异步函数，await如果紧跟new Promise，new Promise的then里面的代码是异步执行，await后面的代码也会当作异步执行

```js
async function bar() {
    console.log('6')
    return new Promise((resolve) => {
        console.log('2')
        resolve()
    }).then(() => {
        console.log('5')
    })
}
async function foo() {
    console.log('1')
    await bar()
    console.log('3')  // 微任务，相当于new promise的then
}
foo()
console.log('4')
```

#### 4. 面试题二

```js
async function async1 () {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2 () {
    console.log('async2')
}
console.log('script start')
setTimeout(function() {
    console.log('setTimeout')
})
async1()
new Promise(function(resolve) {
	console.log('promise1')
    resolve() // 如果这里没有resolve，那么then里面的函数不会执行
}).then(function() {
    console.log('promise2')
})
console.log('script end')
script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

#### 5. 面试题三

##### (1) return 4

return 4；返回普通值

```js
Promise.resolve().then(() => {
    console.log(0)
    return 4 // 相当于return一个new promise,下一个then获取return的值
    // return Promise.resolve(4)
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})
// 0
// 1
// 4
// 2
// 3
// 5
// 6
```

##### (2) return thenable

原生promise.then()如果return了一个thenable，微任务的执行顺序会往后退一位

```js
Promise.resolve().then(() => {
    console.log(0)
    return {
        then function(resolve) {
            resolve(4)
        }
    }
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})
// 0
// 1
// 2
// 4
// 3
// 5
// 6
```

##### (3) return Promise

return了promsie，会推迟两次微任务

```js
Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})
// 0
// 1
// 2
// 3
// 4
// 5
// 6
```

##### (4) 为什么会推迟微任务

如果返回的是一个普通的值会直接执行，但是如果返回的是`thenable`，为了让后面的队列先执行，于是往后推后一个微任务；如果是`Promise`，则推后两个微任务



## 十一、node的事件循环

什么是事件循环？在浏览器或者nodejs环境中，运行时对js脚本的调度方式叫做事件循环。

`node`进程是多进程，每个进程有很多线程，其中有`js`线程；

像`setTimeout`,文件读取，网络请求是由`node`的其它线程处理；（`node`的事件循环和浏览器的事件循环相似）

#### 1. 浏览器的事件循环 VS node的事件循环：

- 浏览器的`EventLoop`是根据HTML5定义的规范实现
- Node的`EventLoop`是由libuv实现

#### 2. Node环境图解

`libuv`主要维护了`EvenLoop`和`worker threads`（线程池）

`EvenLoop`负责调用系统的一些操作，例如文件的`IO`，网络请求..

![image-20220210162904804](@alias/image-20220210162904804.png)

#### 3. Node事件循环的阶段图解

`Node`的事件循环更复杂

![image-20220210164635452](@alias/image-20220210164635452.png)

（Node的详细学习笔记我以后会记录在nodejs文件夹，在这里就不写了。）

#### 4. Node的宏任务和微任务

- 宏任务：`setTimeout`、`setInterval`、`IO`事件、`setImmediate`、`close`事件
- 微任务：`Promise`的`then`回调、`process.nextTick`、`queueMicrotask`
- 微任务队列：
  1. **next tick queue**：process.nextTick
  2. **other queue**：Promise的then回调，queueMicrotask
- 宏任务队列：
  1. **timer queue**：setTimeout、setInterval
  2. **poll queue**：IO事件
  3. **check queue**：setImmediate
  4. **close queue**：close事件

#### 5. Node事件循环顺序

每次事件循环Tick中，会按照下面顺序执行代码

1. **`next tick microtask queue`**
2. **`other microtask queue`**
3. **`timer queue`**
4. **`poll queue`**
5. **`check queue`**
6. **`close queue`**


<Valine></Valine>



