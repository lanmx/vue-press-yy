## es6类的使用、ES6知识点

### 一、class定义类

按照前面构造函数形式创建类，和普通函数相似，代码不易理解，所以es6用class关键字定义类；但是class person{}创建类只是构造函数、原型链的语法糖，最终还是要转换为原型链，框架的源码基本都是用funtion Person原型链写的。

定义类的方式：

1. 类声明

   ```js
   class Person {}
   typeof(Person)  // function
   ```

2. 类表达式

   ```js
   var Person = class {}
   ```

### 二、类的构造函数

方法名固定是constructor

通过new操作符操作一个类会调用该类的构造函数

new操作符调用constructor，内部过程如下：

- 存中创建一个对象
- 将类的原型prototype赋值给创建出来的对象`obj.__proto__ = Person.prototype`
- 将对象赋值给函数的this: new绑定this=obj
- 执行函数体代码
- 自动返回创建出来的对象

```js
class Person {
    // 类的构造方法,一个类只能有一个构造函数
    constructor(name,age) {
        this.name = name
        this.age = age
    }
}
var p = new Person('lmx', 18)
```

### 三、类的实例方法

```js
class Person {
    // 类的构造方法,一个类只能有一个构造函数
    constructor(name,age,address) {
        this.name = name
        this.age = age
        this._address = address
    }
    // 普通的实例方法，该方法已经写在了该类的原型上
    eating() {
        console.log(this.name, + 'eating~')
    }
    // 类的访问器方法
    get address() {
        console.log('拦截访问操作')
        return this._address
    }
    set address() {
        console.log('拦截设置操作')
        this._address = newAdderss
    }
    // 类的静态方法，不需要通过new操作符调用，可以直接类点访问
    // Person.createPerson()
    static createPerson() {
        var names = ['小兰','小红','小明']
        index = Math.floor(Math.random() * names.length)
        var name = names[index]
        var age = Math.floor(Math.random * 100)
        return new Person(name, age)
    }
}
var p = new Person('lmx', 18)
```

### 四、class实现继承

class类默认继承Object类型

js中类只能继承一个父类：单继承

#### （1）. super关键字

- JS引擎在解析子类时，要求如果有继承，在子类的构造方法之前，在使用this之前，或者return this之前,必须调用父类方法super()

- super()使用位置：子类的构造函数，实例方法，静态方法

  ```js
  - 调用父对象、父类的构造函数
  super([arguments])
  - 调用父对象、父类上的方法（复用父类的方法）
  super.functionOnParent([arguments])
  ```

  

```js
class Person {
    // 类的构造方法,一个类只能有一个构造函数
    constructor(name,age) {
        this.name = name
        this.age = age
    }
}

class Student extends Person {
    // JS引擎在解析子类时，要求如果有继承，在子类的构造方法之前，在使用this之前，或者return this之前,必须调用父类方法super()
    constructor(name,age,ano) {
        super(name,age)
        this.ano = ano
    }
}

```

- 如果继承父类的方法或者静态方法不满意，可以自己写一个名字一样的方法，就不会使用父类的方法了；即重写父类的方法，或者重写静态方法，并且可以通过super.fn复用父类方法



### 五、ES6转ES5代码

官方网站babeljs.io

[babeljs.io]: babeljs.io

因为新的语法有些浏览器不能解析，所以要转

项目依赖webpack环境，webpack使用babel转换为较低浏览器可以识别的代码

 ES6代码：

```js
class Person {
    // 类的构造方法,一个类只能有一个构造函数
    constructor(name,age) {
        this.name = name
        this.age = age
    }
    eating() {
        console.log(this.name, "running~")
    }
}

class Student extends Person {
    // JS引擎在解析子类时，要求如果有继承，在子类的构造方法之前，在使用this之前，或者return this之前,必须调用父类方法super()
    constructor(name,age,ano) {
        super(name,age)
        this.ano = ano
    }
    studying() {
        console.log(this.name,"studying~")
    }
}
```

 上面ES6代码babel转换为ES5：

```js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
    // 静态方法的继承
  if (superClass) _setPrototypeOf(subClass, superClass);
}

// 把子类的原型_proto_ = 父类
function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
        // super: Person
        // arguments: 属性参数
        // NewTarget: Student
        // 通过Super创建一个实例，该实例的原型constructor指向NewTarget
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  "use strict";

  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log(this.name, "running~");
      }
    }
  ]);

  return Person;
})();

// /*#__PURE__*/ 纯函数：这个函数没有副作用
// webpack 压缩打包会生成摇树tree-shaking: 对于没有使用的函数会直接删除，不会进行压缩
var Student = /*#__PURE__*/ (function (_Person) {
  "use strict";

    //  和寄生式继承的inheritPrototype函数一样
    //  学生继承人
  _inherits(Student, _Person);

    // 
  var _super = _createSuper(Student);

  function Student(name, age, ano) {
    var _this;

    _classCallCheck(this, Student);

    _this = _super.call(this, name, age);
    _this.ano = ano;
    return _this;
  }

  _createClass(Student, [
    {
      key: "studying",
      value: function studying() {
        console.log(this.name, "studying~");
      }
    }
  ]);

  return Student;
})(Person);

```



### 六、创建类继承内置类

自己定义的类也可继承内置类的方法

例如我定义了一个数组，可以让它继承Array,就可以使用Array的方法

```js
// 例如我定义了一个数组，可以让它继承Array, 可以使用Array的方法, 或者再自定义添加重写方法
class Arr extends Array {}
```



### 七、js类的混入mixin

因为在JS中类是单继承，只能继承一个父类

如果想要在类中添加更多相似的功能，可以用mixin

```js
function mixinRunner(BaseClass) {
    class NewClass extends BaseClass {
        running() {
            console.log('running~')
        }
    }
    return NewClass
}
function mixinEater(BaseClass) {
    return class extends BaseClass {
        eating() {
            console.log("eating~")
        }
    }
}
class Person {}
class NewPerson extends mixinEater(mixinRunner(person)) {}
var np = new NewPerson()
np.eating()
np.running()
```

在react中的高级组件和js的mixin写法相似，react开发更接近原生js开发，vue很多东西封装好了。

react中的高级组件方法推荐去学。

### 八、JavaScript的多态

面向对象的三大属性：封装、继承、多态（Java/C++/TypeScript）

#### （1）多态的定义

维基百科：多态（polymorphism）指的是不同数据类型的实体提供统一的接口，或使用单一的符号来表示多个不同的类型

简单的说：不同的数据类型进行同一个操作，表现不同的行为，就是多态的体现

#### （2）传统面向对象多态

传统面向对象多态有三个条件：

1.  必须有继承：多态的前提
2.  必须有重写：子类重写父类的方法
3.  必须有父类引用指向子类对象

```js
class Shape {
    getArea() {}
}
class Rectangle extends Shape {
    getArea() {
        ...
        return
    }
}
class Circle extends Shape {
    getArea() {
        ...
        return
    }
}
var r = new Rectangle()
var c = new Circle()

function calArea(shape: Shape) {
    console.log(shape.getArea())
}
```

##### （3）JS面向对象多态

```js
function sum(m,n) {
    return m + n
}
// 多态
sum(2,3)
sum('lan', 'mx')
```



### 九、es6知识点

#### （1）字面量增强写法（Enhanced object literals）

1. 属性简写 property shorthand
2. 方法简写 method shorthand
3. 计算属性名 computed property names

```js
// 字面量
var name = 'lanmx'
var obj = {
    // name: name 
    // 1. 属性简写property shorthand
    name,
    
    foo: function() {
        
    }
    // 2. 方法简写method shorthand
    foo()
    bar: () => {
        console.log(this,"箭头函数的this指向全局")
    }
    
    // 3.Computed Property Names (计算属性名)，给对象添加属性key
    [name + 2022]: '你好，lanmx, 2022顺心顺意'
}
```

#### （2）数组解构

```js
let arr = [1,3,4]
// 1. 数组解构[]
let [item1, item2, item3] = arr  // 1,3,4
// 2. 解构后面的元素
let [ , item1, item2] = arr
// 3. 解构出第一个元素，后面的元素放在一个新的数组
let [item1, ...newArr] = arr
// 4. 解构默认值(undefined)
letlet [item1, item2, item3, item4] = arr  // 1,3,4, undefined
```

#### （3）对象解构

对象通过key值解构

1. 对象解构
2. 修改key值
3. 函数参数解构

```js
let obj = {
    name: 'lanmx'
    age: 18
    height: 160
}
// 1. 对象解构
let { name, age, height } = obj
// 2. 修改key值
let { name: newKey } = obj
// 3. 函数参数解构
function foo(obj) {
    console.log(obj.name, obj.age)
}
function foo({name, age}) {
    console.log(name, age)
}
```

#### （4）var / let / const

ES5声明变量用var关键字，从ES6开始新增let / const

通过let / const定义的变量名是不可以重复定义，已声明使用的变量不能再声明

不推荐使用var，开发中推荐使用let / const

优先使用const，这样可以保证数据的安全性不会被随意修改，明确一个变量后面会被重新赋值时才是用let

#### （5）const

- const常量，一旦被赋值，不可修改；本质上是传递的值不可修改；
- 如果const保存的是引用地址，那么地址不能修改，可以通过引用地址找到对象修改对象的值

```js
const name = 'lanminxiao'
// obj是引用地址
const obj = {
    name: 'lan'
}
// 引用值可以被修改
obj.name = '可爱'
```

#### （6）let / const 作用域提升

- 作用域提升：在声明变量的作用域中，如果这个变量可以在声明之前被访问，那么就称之为作用域提升
- let / const 和 var 的重要区别是作用域提升

- var声明的变量会进行作用域提升

  ```js
  console.log(foo) // foo
  var foo = 'foo' 
  ```

- const / let 声明变量没有作用域提升

  ```js
  console.log(foo) // ReferenceError: Cannot access 'foo' before initiolization
  let foo = 'foo'
  ```

  > ECMA262对let和const的描述
  >
  > 这些变量会被创建在包含他们的词法环境被实例化，（也就是在创建执行上下文的时候已经创建了），但是不可以访问它们，直到词法绑定被求值

#### （7）var块级作用域

var特点：作用域提升，window全局对象，没有块级作用域

```js
{
    var foo = 'foo' 
    // 只能在{}里面访问，外面访问不了
}
```

- ES5中没有块级作用域，ES5只有两个东西会形成作用域：
  1.  全局作用域
  2.  函数作用域

![image-20220119164056182](@alias/image-20220119164056182.png)

- ES6有块级作用域
  1. let / const / function / class有块级作用域
  2. 不同浏览器有不同实现，大部分浏览器为了兼容以前的代码，让函数没有块级作用域；如果该浏览器只支持ES6，不支持ES5，那么函数有块级作用域，在外部访问不了。

- if / switch / for 语句的代码就是块级作用域

  ```js
  for(var i = 0; i < 10; i++){}
  for(let j = 0; j < 10; i++){}
  console.log(i)
  console.log(j)
  
  // var 定义的变量污染全局，不建议使用
  ```

  

#### （8）window对象添加属性

- var声明变量，事实上会在window上添加一个属性

- let、const不会给window添加任何属性

- 旧ECMA标准：let、const变量和函数的声明会被作为属性添加到VO中

- 新ECMA标准：变量被保存在VariableMap（VE）：variables_: VariableMap (HashMap哈希表)

  ![image-20220119161419594](@alias/image-20220119161419594.png)

- window早期的对象是GO，现在是浏览器添加的全局对象，保持window和var相等性，实际上window和var不是同一个对象。

#### （9）暂时性死区

es6中，使用let / const 声明的变量，在声明之前，变量不能被访问；这种现象称为temporal dead zone（暂时性死区，TDZ）

#### （10）字符串模板

> ${expression}

```js
// 不使用模板字符串
let name = 'mx
let age = 20
console.log('my name is'+ name, 'age is' + age)
// 使用模板字符串
console.log(`my name is ${name}, age is ${age}`)
// 可以写成表达式
console.log(`age is ${age * 2}`)
// 可以写成函数
console.log(`age is ${doulbleAge()}`)
```

#### （11）标签模板字符串（Tagged Template Literals）

- 第一个参数是模板字符串整个字符串，只是被切成了多块，放到了一个数组
- 第二个参数是模板字符串第一个${ }

```js
function foo(m,n,x) {
    console.log(m,n,x)
}
let time = 'night'
let name = 'mx'
// 调用函数
foo``
foo`hello${name}Good${time}girl`
```

- react 的styled-components库

  ```js
  // div()本身是一个函数
  style.div()
  style.div``
  ```

![image-20220121170745581](@alias/image-20220121170745581.png)

#### （12）函数默认参数

```js
// ES5:
function foo(m,n) {
    m = m || '0'
    n = n || '100'
    console.log(m,n)
}
```

```js
// ES6:
function foo(m = '0',n = '100') {
    console.log(m,n)
}
```

#### （13）对象参数和默认值以及解构

```js
// ES6:
function foo({name, age} = { name: 'mx', age: 20}}) {
    console.log(name, age)
}
```

#### （14）有默认值的参数建议放在最后

```js
function foo(x, y, z = 30) {
    console.log(x, y, z)
}
foo(10,20)
foo(,10,20)
foo(undefined,10,20)
```

- 有默认值的函数的length属性，会把有默认值的参数后面的参数全部忽略掉，不会计算到长度length里了

  ```js
  function foo(x, y, z = 30) {
      console.log(x, y, z)
  }
  console.log(foo.length) // 2
  ```

#### （15）函数的剩余参数

- ES6引用了rest parameter，可以将不定数量的参数放在一个数组中
- 剩余参数必须放在最后

```js
function foo(m,n,...args){
    // args为一个数组
}
foo(1,2,3,4,5)
```

- 剩余参数rest和arguments的区别
  1. 剩余参数rest只包含没有对应形参的实参，而arguments对象包含了传给函数的所有实参
  2. 剩余参数rest是一个数组，arguments为对象
  3. arguments是早期ECMAScript中为了方便去获取所有参数提供的数据结构，而rest是ES6中提供并且希望以此来替代arguments的

#### （16）箭头函数

- 箭头函数没有显式原型prototype，也没有this，没有arguments，this和arguments都是往上层作用域找。

#### （17）展开语法 / 展开运输算符 （spread syntax）

- 展开运算符是浅拷贝

```js
const names = ['lan','mx','xiao']
const name = 'lan'
// 字面量
const info = {
    name: 'mx', age: '20'
}
function foo(x,y,z){
    console.log(x,y,z)
}
foo(...names) // 'lan','mx','xiao'
foo(...name) // l a n
const obj = {...info, ...names}
// 把names的索引值当成key,值为value
```

#### （18）数值表示

```js
// 十进制
const num1 = 100

// 二进制 b : binary
const num2 = 0b100

// 八进制 o : octonary
const num3 = 0o100

// 十六进制 x : hexadecimal
const num4 = 0x100

// 大数值连接符_
const = num5 = 10_000_000_000
```

#### （18）Symbol

symbol是ES6新增的基本数据类型，符号。

- ES6之前，对象的属性名都是字符串，如果新增一个属性和已有的重复了，必然会覆盖掉之前的。

- 混入中出现同名的属性和函数，必然会覆盖掉一个

Symbol可以解决以上问题，Symbol可以生成独一无二的值，对象的属性名可以用字符串，也可以用Symbol 。

```js
const s1 = Symbol()
const s2 = Symbol('属性的描述')
console.log(s2.description) // 属性的描述
// 1. Symbol作为key
const obj = {
    [s1]: 'lll'
}
// 2. 给对象新增属性
obj[s3] = 'jjj'

// 3. 通过Object.defineProperty定义属性类型
Object.defineProperty(obj, s2, {})

// 4. Symbol属性不能通过.获取
// 5. Object.keys不能获取Symbol作为key的属性名；需要用Object.getOwnpropertySymbols来获取
Object.getOwnpropertySymbols(obj)

// 6. 通过Symbol.for(key)生成一样的key值
const s1 = Symbol.for('lan')
const s2 = Symbol.for('lan')
s1 === s2   // true
// 7. 通过Symbol.KeyFor(symbol)生成指定的key值
const key = Symbol.KeyFor(s1)
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>