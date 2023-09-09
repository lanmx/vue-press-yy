---
title: 面向对象 | 原型链以及继承
meta:
  - name: description
    content: js的面向对象、构造函数、原型链、继承
  - name: keywords
    content: 对象 面向对象 构造函数 原型链 继承
---

# 面向对象、构造函数、原型链、继承

## 一、面向对象

对象是JavaScript中一个非常重要的概念，对象可以将多个相关的数据封装在一起，更好描述一个事物。

> 例如，一辆车：Car，具有颜色（color)、速度（speed)、品牌（brand)、价格（price)、行驶（traval)等
>
> 例如，人：Person，具有姓名（name)、年龄（age)、身高（height)、吃东西（eat)、跑步（run)等

面向对象是现实的抽象方式，Java是纯面向对象的编程语言。在实现任何现实抽象时都需要创建一个类，根据类再去创建对象

> 对象描述事物：现实的事物 => 抽象成代码的某个数据结构

![image-20211221161428856](@alias/image-20211221161428856.png)



## 二、JavaScript的面向对象

JavaScript支持多种编程范式，包括函数式编程和面向对象编程

- JavaScript中的对象被设计成一组属性的无序集合，像是一个哈希表，有key和value组成
- key是标识符名称，value可以是任意类型，也可以是其它对象或者函数类型（对象的方法）

### 1. 创建对象

**1、通过new Object()**

```js
var obj = new Object()  // {}
obj.name = 'mx'
obj.running = function() {
    console.log(this.name,"在跑步")
}
```

**2、通过字面量形式**

```js
var info = {
    name: 'mx',
    age: 18,
    eating: function() {
        console.log(this.name,'在吃饭')
    }
}
```

### 2. 属性操作

- 获取属性值，点属性名，相当于get

- 给属性赋值

- 删除属性`delete obj.name`

### 3. 属性操作限制

对属性操作做限制，对属性进行精准的操作控制，可使用属性描述符

- 属性描述符：Object.defineProperty
- 属性描述符作用：可以精准添加或修改对象的属性



### 4. Object.defineProperty

Object.defineProperty方法会直接在对象上定义一个新属性，或者修改一个对象现有属性，并且返回该对象；

```js
Object.defineProperty(obj, prop, descriptor)
```

- 参数obj：定义属性的对象
- 参数prop：定义或修改的属性的名称或Symbol（如果传入一个对象没有的属性，会新定义该属性）
- 参数descriptor：要定义或修改的属性描述符
- 返回值：被传递给函数的对象



### 5. 属性描述符

1. 数据属性描述符

2. 存取属性描述符

   ![image-20211222084234996](@alias/image-20211222084234996.png)

### （1）数据属性描述符

- Configurable
  1. 是否可删除delete，是否可以修改特性，是否可以修改为存取属性描述符；
  2. false表示不可以删除、修改
  3. 如果在对象上定义某属性，这个属性的Configurable为true
  4. 如果通过属性描述符定义某属性，这个属性的Configurable默认为false
- Enumerable
  1. 是否可枚举，是否可通过for in或Object.keys()返回该属性
  2. false表示不可遍历查看属性
  3. 如果在对象上定义某属性，这个属性的Enumerable为true
  4. 如果通过属性描述符定义某属性，这个属性的Enumerable默认为false
  5. 补充：浏览器打印会打印不可枚举的属性，为了方便调试
- Writable
  1. 是否可以修改属性的值；false表示不可赋值
  2. 如果在对象上定义某属性，这个属性的Writable为true
  3. 如果通过属性描述符定义某属性，这个属性的Writable默认为false
- value
  1. 属性的value值，读取属性时会返回该值，修改时，会对其修改
  2. 不管是对象定义属性，还是通过属性描述符，value默认情况下是undefined

```js
Object.defineProperty(obj, 'name', {
    enumerable: true,
    configurable: true,
    value: 'mx',
    writable: true,
})
```



### （2）存取属性描述符

- Configurable（和数据属性描述符一样）
- Enumerable（和数据属性描述符一样）
- get
  1. 获取属性值，默认为undefined
- set
  1. 设置属性值，默认为undefined

> set和get，Writable和value只能存在其一，不能共存

```js
var info = {
  name: 'mx',
  age: 18,
  _address: '广州市'  
  // 定义的_address和使用的address的名字不一样，是为了隐藏某一个私有属性不希望直接被外界使用和赋值
  
}
// 存取属性描述符
Object.defineProperty(info, 'address', {
  enumerable: true,
  configurable: true,
  get: function() {
      //如果希望截获某一个属性它访问和设置值的过程，也会使用存储属性描述符,在get里调用foo()函数，截取获取值的过程，vue2的响应式原理也是利用这里，
      foo()
      return this._address
      
  },
  set: function(value) {
      // 在set函数截获和上面的原理一样
      this._address = value
  }
})
function foo() {
  console.log("获取了属性值")
}

console.log(info.name)
console.log(info.address)
// mx
// 获取了属性值
// 广州市
```



### 6. 定义多个属性描述符

在js没有严格意义的私有属性，使用_age，下划线加属性名统一默认为私有属性的定义，大家形成的一种规范，共识，并不是像java那样的真的私有。

```js
var obj = {
    name: 'mx',
    _age: 18
}

Object.defineProperties(obj, {
    name: {
        enumerable: true,
        configurable: true,
        value: 'mx',
        writable: true,
    },
    age: {
        enumerable: true,
        configurable: true,
        get: function() {
            return this._age
        },
        set: function(value) {
            this._age = value
        }
    }, 
})
```

```js
var obj = {
    name: 'mx',
    _age: 18
    set age(value) {    // age的enumerable,configurable 默认为true
        this._age = value
    },
    get age() {    // age的enumerable,configurable 默认为true
        return this._age
    }
}

Object.defineProperties(obj, {
    name: {
        enumerable: true,
        configurable: true,
        value: 'mx',
        writable: true,
    },
})
```

### 7. 对象方法补充

### （1）获取属性描述符

```js
// 获取对象的一个属性
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
// { enumerable: true,configurable: true,value: 'mx',writable: true, } 
            
// 获取对象的所有属性描述符
 Object.getOwnPropertyDescriptors(obj)           
```

### (2)Object方法对对象的限制

- 禁止对对象继续添加属性：`Object.preventExtensions(obj)`   （Extensions扩展）

- 禁止对对象配置或删除里面的属性：`Object.seal(obj)`  （seal封密）

- 禁止修改属性：`Object.freeze(obj)`（freeze冻结对象的所有属性）

## 三、创建多个对象的方案 - 工厂模式

### 1. 工厂模式

创建一系列类似的对象，例如人Person，每个人都有共同的属性，但是又不一样；使用一种创建对象的方式：工厂模式。

- 工厂模式是一种常见的设计模式
- 通过工厂模式产生多个对象

```js
// 工厂函数：
// 把不同的信息传进工厂函数即可。
function createPerson(name, age, height, address) {
    var p = {}
    p.name = name 
    p.age = age
    p.height = height
    p.address = address
    
    p.eating = function() {
        console.log(this.name, + '在吃东西')
    }
    p.running = function() {
        console.log(this.name, + '在跑步')
    }
    return p
}

var p1 = createPerson('mx', 18, 160, '广州')
var p1 = createPerson('kk', 20, 180, '佛山')
```

### 2. 工厂模式的缺点：对象的类型都是Object类型

对象的类型都是Object类型，获取不了对象具体属性的类型，因为var p = {} 这个类型是函数内部定义的，容易产生歧义。工厂的对象应该具有一个共同的类型。



### 3. 构造函数（constructor）

- 构造函数也称构造器，通常是在创建对象时会调用的函数；

- 在其他编程语言里，构造函数是存在类中的一个方法，称之为构造方法；

但是JavaScript的构造函数不太一样。



### 4. JavaScript的构造函数

- 构造函数也是一个普通的函数，和千千万万的普通函数没有任何区别；
- 如果一个普通函数被使用的new操作符调用了，那么这个函数就是一个构造函数；

```js
// foo是一个构造函数
function foo() {
    console.log('foo!')
}
new foo
new foo()
```



## 四、new操作符调用

如果一个函数被使用new操作符调用了，那么它会执行如下操作：

- 在内存中创建一个新的对象（空对象）
- 这个对象内部的[[prototype]]属性会被赋值为构造函数的prototype属性
- 构造函数内部的this，会指向创建出来的新对象
- 执行函数的内部代码（函数体代码）
- 自动返回this指向的对象
- 如果构造函数没有返回非空对象，则返回创建出来的新对象

```js
// 为了区分普通函数和构造函数约定规范：
// 1. 构造函数的名字首字母大写
function Person(name, age, height, address) {
    this.name = name
    this.age = age
    this.height = height
    this.address = address
    // return 自动返回this对象
}
Person.prototype.eating = function() {
    console.log(this.name + '在吃东西~')
    // this是动态绑定的，和调用的对象有关，所以写在原型上是没有问题的
}
var p1 = new Person('mx', 18, 160, '广州')
console.log(p1.__proto__.constructor.name)
console.log(p1)
```

## 五、构造函数的缺点

```js
// foo是一个构造函数
function foo() {
    function bar() {
        
    }
    return bar
}
var fn1 = foo()
var fn2 = foo()
console.log(fn1 === fn2)  //false
// fn1和fn2不是同一个对象，因为每次调用函数，都会新创建一个新的函数对象，很浪费内存空间和性能
```

## 六、构造函数的缺点的解决方案

> 解决方法：把构造函数放在原型上；即把方法写在原型prototype上。

## 七、对象的原型

### 1. 对象原型的理解：隐式原型

```js
var obj = { name: 'mx', __proto__: {} }
var info = {}  // [[prototype]]
console.log(obj.__proto__)
console.log(info.__proto__)

// ES5之后提供访问原型的方法：
Object.getPrototypeOf(obj)
```

每个对象都会有一个[[prototype]]，这个属性称之为对象的原型（隐式原型）

早期的ECMA是没有规范如何去查看 [[prototype]]；

后来为了查看，浏览器提供了一个属性`__proto__`，可以查看原型，默认指向空对象{}



### 2. 原型的作用

当从一个对象获取某一个属性时，会触发 [[get]] 操作，在当前对象查找该属性，如果找到就直接使用；如果找不到就会沿着它的原型去查找 [[prototype]]

```js
var info = {}
info.__proto__.age = 18
console.log(info.age)
```

既然都可以访问，为什么要把一些方法和属性放在原型里，不直接放在自己的对象里呢？

> 为了方便继承。



### 3. 函数的原型：显示原型

每个函数都有显示原型属性：prototype

又因为每个对象都有隐式原型，函数也是一个对象，所以也是有[[prototype]]

```js
function Person() {
  // ...
}
console.log(Person.__proto__)  // 隐式原型{}
console.log(Person.prototype)  // 显示原型{}
var f1 = new Person()
var f2 = new Person()
// new Person() 后，这个对象内部的[[prototype]]属性会被赋值为构造函数的prototype属性(new操作过程涉及到)
// new内部： this.__proto__ = Person.prototype
// 所以：
console.log(f1.__proto__ === Person.prototype)   // true
console.log(f2.__proto__ === Person.prototype)   // true
// 所以，f1函数和f2函数指向的是同一个原型
```

![image-20211225155531987](@alias/image-20211225155531987.png)



### 4. 函数原型上的属性：constructor

`prototype.constructor`：构造器函数本身

```js
function foo() {}
console.log(foo.prototype)  // {}

// 相互引用
console.log(foo.prototype.constructor.prototype.constructor) // [Function: foo]

```

打印函数的原型是空对象，实际上不是空的，因为该原型的属性设置为不可枚举，因此不能打印



### 5. 原型的操作

### （1）在原型上添加/修改属性

```js
foo.prototype.name = 'mx'
```

### （2）直接赋值新对象

```js
foo.prototype = { 
    constructor: foo,
    name: 'mx'
}
```

真实开发中，使用`Object.defineProperty`添加`constructor`

```js
Object.defineProperty(foo.prototype, 'constructor', {
    enumerable: false,
    ...
})
```



## 八、JavaScript的类和对象

很多从面向对象语言过来的开发展，习惯把JavaScript的构造函数称之为类；在Java里，如果要new一个对象，一般用class定义一个类，而不像JavaScript用function定义一个构函数（构造函数）；

JavaScript里的构造函数，如果从面向对象的编程范式来说，Person也可以称之为类，严格意义上应该称之为构造函数；

从es6后，JavaScript也是可以用class定义类；但是Java的类不一样；

```js
// JavaScript的构造函数
function Person {
}
var p1 = new Person()

// Java
class Person {
    
}
Person p1 = new Person()
```

## 九、面向对象的三大特性

- 封装：将属性和方法封装到一个类中，可称为封装的过程
- 继承：继承可以将重复的代码和逻辑抽取到父类中，子类只需要直接继承过来使用即可；继承可减少重复代码的属性，也是多态的提前（纯面向对象中）
- 多态：不同的对象在执行时表现出不同的形态



## 十、面向对象的特性：继承

JavaScript面向对象的继承是如何实现的，先了解一下JavaScript原型链，并实现继承代码；

### 1. JavaScript原型链（prototype chain）

从一个对象获取属性，如果当前对象没有就会去它的原型上面获取；

一直找到Object原型，即`[Object: null prototype] {}`（顶层原型），就不会继续找了，找不到输出`undefined`；

> 顶层原型来自哪里？什么时候会找到顶层原型？
>
> 答 :  Object原型就是顶层原型

```js
obj = {}
obj.__proto__ = {}
obj.__proto__.__proto__ = {}
obj.__proto__.__proto__.proto__ = {
    address: '北京'
}
console.log(obj.address)  // 北京
```

### 2. Object原型（顶层原型）

字面量Object原型是：[Object: null prototype] {}

```js
var obj = {}
var obj1 = new Object()
// obj1.__proto__ === Object.prototype
console.log(obj1.__proto__ === Object.prototype)  // true
```

所以，`__proto__ === Object.prototype`

创建一个对象的时候，Object的原型`prototype`会赋值给当前对象的原型`__proto__`，此时顶层原型就已确定；

![image-20211227162738505](@alias/image-20211227162738505.png)

```js
// 如果我更改一下
var obj2 = {
    address: '北京
}
var obj1.__proto__ = obj2
```

![image-20211227143143530](@alias/image-20211227143143530.png)



```js
// 通过构造函数创建对象
function Person(name) {
    this.name = name
    // this.prototype.name = name,这样写不写！普通的属性不可以放在原型上，因为会这样的话对象本身的属性为空，去原型上找，而且每次新创建一个对象都会覆盖就的属性值
}
Person.prototype.running = function() {
    console.log(this.name, 'running~')
}

var p1 = new Person('mx')
```

![image-20211227163341642](@alias/image-20211227163341642.png)



### 3. 为什么需要继承：代码复用，多态前提

目的：复用属性和方法

如果没有继承，学生和老师有的共同属性都要各自写在自己的类里面，会有大量的重复代码；

既然学生和老师都是人，那么学生类和老师类可以继承人类，也就是具有人类的共同属性和特征，人类称之为学生和老师的父类，学生类和老师类为人类的子类；

```js
// 学生
function Student(name,age,sno) {
    this.name = name
    this.age = age
    this.sno = sno
}
Student.prototype.running = function() {
    console.log(this.name, 'running~')
}
Student.prototype.eating = function() {
     console.log(this.name, 'eating~')
}
Student.prototype.studying = function() {
    console.log(this.name, 'studying~')
}
```

```js
// 老师
function Teacher(name,age,title) {
    this.name = name
    this.age = age
    this.title = title
}
Teacher.prototype.running = function() {
    console.log(this.name, 'running~')
}
Teacher.prototype.eating = function() {
    console.log(this.name, 'eating~')
}
Teacher.prototype.teaching = function() {
    console.log(this.name, 'teaching~')
}
```

父类：公共属性和方法

子类：特有属性和方法

```js
// 1. Person构造函数
// 父类：公共属性和方法
function Person(name,age) {
    this.name = name
    this.age = age
}
Person.prototype.running = function() {
    console.log(this.name, 'running~')
    // this指向和调用的对象有关，谁调用指向谁
}
Person.prototype.eating = function() {
    console.log(this.name, 'eating~')
}

// 2. Student构造函数
// 学生继承父类（Person）
Student.prototype = new Person()
```

### 4. 利用构造函数继承父类的缺点

- 学生子类Student继承构造函数Person的原型，会把父类Person的属性也带过来，即使没有赋值，会默认为undefined
- new Person() 创建对象，会多次调用构造函数

> 如果直接将父类的原型赋值给子类，作为子类的原型是否可以解决？
>
> ```js
> // 将父类的原型赋值给子类
> Student.prototype = Person.prototype
> ```
>
> 解答：不正确。可以解决不会有多余属性的问题，但是原型指向根本上改了，按照面向对象的角度来说是不正确的！
>
> 因为如果要在子类的原型添加方法，会直接加到父类上；如果有多个子类继承该父类，只要在子类的原型添加方法和属性，都会同步修改其它所有子类的原型

### 5.原型式继承函数 - 只针对对象

给对象创建一个新的原型对象：

```js
var obj = {
    name: 'mx',
    age: 18
}
var info = createObject(obj)
// 原型式继承函数
function createObject(o) {
    function Fn() {}
    Fn.prototype = o
    var newObj = new Fn()
    return newObj
}
// 或者
function createObject(o) {
    var newObj = {}
    // 设置newObj的原型对象为o
    Object.setPrototypeOf(newObj, o)
    return newObj
}

```

ECMA最新版本提供了Object.create方法，不需要使用上面的函数代码

```js
var info = Object.create(obj)
```

### 6. 寄生式继承 - 对象

利用寄生式继承可以解决构造函数的两个缺点，当我们在子类型的构造函数中调用父类型.call(this,参数)，这个时候，会将父类型中的属性和方法复制一份到子类型中。

寄生式继承是原型式继承和工厂函数的结合，一般不采用这种方法，用构造函数的方法

### 7.  继承的新方案：寄生组合式继承

```js
function createObject(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}

function inheritPrototype(SubType, SuperType) {
    SubType.prototype = createObject(SuperType.prototype)
    Object.defineProperty(SubType.prototype, 'constructor',{
        enumerable: false,
        configurable: true,
        writable: true,
        value: SubType
    })
}

function Person(name, age) {
    this.name = name,
    this.age = age
}
Person.prototype.running = function() {
    console.log('running~')
}
function Student(name, age, acore) {
    Person.call(this,name,age)
    this.score = score
}
Student.prototype.studying = function() {
    console.log('studying~')
}
inheritPrototype(Student, Person)
```

### 原型判断方法补充

- obj.hasOwnProperty('name')

  false/true

- 'name' in obj

  false/true

- for(var key in obj) 

  key为该对象的属性值

- instanceof （构造函数）

  `p instanceof Person`

  用于检测构造函数的prototype，是否出现在某个实例对象的原型链上

- isPrototypeOf（对象）

  `Person.prototype.isPrototypeOf(p)`

  用于检测某个对象，是否出现在某个实例对象的原型链上

### 函数原型

```js
function foo() {}
// 相当于
var foo = new Function()
function Object() {}
function Function() {}
```

foo作为函数，有显示原型：`foo.prototype = { constryctor: foo }`

foo作为对象，有隐式原型：`foo.__proto__ = Function.prototype = { contructor: Function }` 

![image-20220103200224191](@alias/image-20220103200224191.png)



![image-20220103200303807](@alias/image-20220103200303807.png)



![image-20220103200323508](@alias/image-20220103200323508.png)


<ClientOnly>
  <Valine></Valine>
</ClientOnly>