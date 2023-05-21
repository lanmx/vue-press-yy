---
title: Proxy和Reflect
meta:
  - name: description
    content: Proxy / Reflect ：vue2 vue3响应式原理
  - name: keywords
    content: Proxy Reflect vue3响应式原理
---

# Proxy / Reflect ：vue2 vue3响应式原理

`vue3`通过 `Proxy`监听数据的变化和收集相关依赖

`vue2`通过 `Object.defineProerty`监听数据的变化和收集相关依赖

## Proxy类

### 1. 监听对象的操作 `Object.defineProperty`

```js
Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj,key {
        get: function() {
            console.log(`obj对象的${key}被访问了`)
       		return value
        },
        set: function(newValue) {
            console.log(`obj对象的${key}被设置了`)
            return newValue
        }
    })
})
```

- `Object.defineProperty`的设计初衷不是为了去监听一个对象中的所有属性，初衷其实是定义普通的属性，后面强行将它变成了数据属性描述符
- 新增属性和删除属性的操作，`Object.defineProperty`是无法监听的，`proxy`可以。

### 2. `Proxy`监听操作（13种 捕获器`Trap`）

`ES6`中，新增`Proxy`类，用于帮助我们创建代理

- 如果希望监听一个对象的相关操作，可以先创建一个代理对象（`Proxy`对象）
- 代理对象可以监听原对象进行的相关操作，之后对对象的所有操作，都可以通过代理对象来完成

```js
const obj = {
    name: 'lmx'
}
const objProxy = new Proxy(obj,{
    // target指原对象
    get: function(target,key,receiver) {
        return target[key]
    },
    set: function(target,key,newValue,receiver) {
        target[key] = newValue
        return 
    }
})
objProxy.name = 'mx'
// 代理的所有操作都是对原对象的真实操作
```

### 3. `Proxy`的`set`和`get`捕获器

`set`函数四个参数：

1. `target`: 目标对象（侦听的对象）
2. `property`: 被设置的属性`key`
3. `value`: 新属性值
4. `receiver`: 调用的代理对象

`get`函数三个参数：

1. `target`: 目标对象（侦听的对象）
2. `property`: 被设置的属性`key`
3. `receiver`: 调用的代理对象

### 4.`Proxy`捕获器

1. 监听`in`操作

   ```js
   has: function(target,key) {
       console.log(`监听到对象的${key}属性in操作`,target)
       return key in target
   }
   ```

2. 监听`delete`操作

   ```js
   deleteProperty: function(target,key) {
       delete target[key]
   }
   ```


### 5. `Proxy`所有捕获器

1. `handler.getPrototypeOf(): Object.getPrototypeOf()`

2. `handler.setPrototypeOf(): Object.setPrototypeOf()`

3. `handler.isExtensible(): Object.isExtensible()`

4. `handler.preventExtensions(): Object.preventExtensions()`

5. `handler.getOwnPropertyDescriptor(): Object.getOwnPropertyDescriptor()`

6. `handler.defineProperty(): Object.defineProperty()`

7. `handler.ownKeys(): `

   - `Object.getOwnPropertyNames()`
   - `Object.getOwnPropertySymbols()`

8. `handler.has(): `

   - in操作符捕获器

9. `handler.get()`

10. `handler.set()`

11. `handler.deleterototype()`

    - delete操作符捕获器

12. `handler.apply()：用于函数对象`

    - 函数调用操作符捕获器

13. `handler.construct()：用于函数对象`

    - new操作符捕获器

    ![image-20220206133802726](@alias/image-20220206133802726.png)



## Reflect对象

`ES6`新增的`API`（对象）

### 1. `Reflect`作用

提供了很多操作JavaScript对象的方法，类似Object操作对象的方法，例如：

`Object.getPrototypeOf()` 类似 `Reflect.getPrototypeOf()`

- `Object`作为构造函数，`in`，`delete`等等这些操作放在`Object`身上不规范，于是`ES6`新增`Reflect`，更加规范化

[`Reflect` 和 `Object`区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods)

### 2. `Reflect`常见方法

1. `Reflect.getPrototypeOf(target): `
   - 类似`Object.getPrototypeOf()`
2. `Reflect.setPrototypeOf(target, prototype):`
   - 设置对象原型函数，返回`boolean`，更新成功返回`true`
3. `Reflect.isExtensible(target): `
   - 类似`Object.isExtensible()`
4. `Reflect.preventExtensions(target): `
   - 类似`Object.preventExtensions()`，返回`Boolean`
5. `Reflect.getOwnPropertyDescriptor(target，propertyKey): `
   - 类似`Object.getOwnPropertyDescriptor()`，若存在属性描述符，返回属性描述符，若不存在返回`undefined`
6. `Reflect.defineProperty(target，propertyKeys, attrubutes): `
   - 类似`Object.defineProperty()`，设置成功返回`true`
7. `Reflect.ownKeys(target): `
   - 返回一个包含所有自身属性（不包含继承属性）的数组
   - 类似`Object.keys()`,但不会受`enumerable`影响
8. `Reflect.has(target, propertyKey): `
   - 与in操作符功能相同
9. `Reflect.get(target, propertyKey, [,receiver])`
10. `Reflect.set(target, propertyKey, value, [,receiver])`
11. `Reflect.deleterototype(target, propertyKey)`
    - delete操作符
12. `Reflect.apply(target,thisArgument, propertyKey)：用于函数对象`
    - 对一个函数进行调用操作，同时传入一个数组作为调用参数
13. `Reflect.construct(target, argumentList, [,newTarget])：用于函数对象`
    - new操作符捕获器

```js
const obj = {
    name: 'lmx'
}
const objProxy = new Proxy(obj,{
    // target指原对象
    get: function(target,key,receiver) {
        return Reflect.get(target,key)
    },
    set: function(target,key,newValue,receiver) {
        Reflect.get(target,key,newValue)
        return 
    }
})
objProxy.name = 'mx'
```

### 3. Reflect中construct作用

执行A（Student函数中）的内容，创建出来的是B对象（Teacher对象）

```js
function Student(name,age) {
    this.name = name
    this.age = age
}
function Teacher() {}
const Teacher = Reflect.construct(Student, ['mx', 18], Teacher)
```



## Receiver参数：代理对象

### 1. 可以访问_name对象

```js
const obj = {
    _name: 'lmx'
    get: name() {
        return this._name
    }
	set: name(newValue) {
        this._name = newValue
    }
}
const objProxy = new Proxy(obj,{
    // target指原对象
    get: function(target,key,receiver) {
        // receiver === objProxy
        return Reflect.get(target,key,receiver)
    },
    set: function(target,key,newValue,receiver) {
        Reflect.get(target,key,newValue,receiver)
    }
})
objProxy.name = 'mx'
```



## vue3响应式

一个属性对应一个depend对象：`new Depend() -> reactiveFns()`
把所有监听到要执行的响应式函数放在一个数组里，然后forEach遍历每个函数并执行；

### 1. 响应式函数的封装

### 2. Depend类的封装

### 3. 监听对象的变化 ：`new Proxy`

### 4. 依赖收集的数据结构：使用WeakMap结构

```js
const obj = reactive({
    name: 'lmx',
    age: 20
})
obj.name = 'mx'


/** 简单源码 */
// 1. 响应式函数的封装
const reactiveFns = []
let activeReactiveFns = null
function watchFn(fn) {
    activeReactiveFns = fn
    fn()
    reactiveFns.push(fn)
    activeReactiveFns = null
}
watchFn(function() {
    // 代理的属性被访问，那么会执行objProxy的get函数
     console.log(objProxy.name,'监听name变化')
})
watchFn(function() {
     console.log(objProxy.age,'监听age变化')
}) 

// 2. 封装获取depend函数
class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }
    // addDepend(reactiveFn) {
    //   this.reactiveFns.push(reactiveFn)
    // }
    depend(activeReactiveFn) {
        this.reactiveFns.add(activeReactiveFn)
    }
    notify() {
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }
}
const depend = new Depend()
function watchFn(fn) {
    depend.push(fn)
}


// 3. 监听对象属性的变化
function reactive(obj) {
    return new Proxy(obj,{
        // target指原对象
        get: function(target,key,receiver) {
            // receiver === objProxy
            // 根据target.key获取对应的depend
            const depend = getDepend(target, key)
            // 给depend对象添加响应函数
            // depend.addDepend(activeReactiveFns)
            depend.depend()
            return Reflect.get(target,key,receiver)
        },
        set: function(target,key,newValue,receiver) {
            Reflect.get(target,key,newValue,receiver)
            depend.notify()
        }
    })
    // vue2原理---start
    Object.keys(obj).forEach(key => {
        get: function() {
            const depend = getDepend(obj, key)
            depend.depend()
            return value
        }
        set: function(newValue) {
            value = newValue
            const depend = getDepend(obj, key)
            depend.notify()
        }
    })
    return obj
    // vue2------end
}

// 4. 收集依赖的数据结构
const objMap = new Map()
const objKeys = Reflect.ownKeys(obj)
objKeys.forEach(key => {
    objMap.set(key, key + 'depend')
})
const targetMap = new WeakMap()
function getDepend(target, key) {
    // 根据target获取map过程
    let map = targetMap.get(target)
    if(!map) {
        map = new Map()
        targetMap.set(target, map)
    }
    // 根据key获取depend对象
    let depend = map.get(key)
    if(!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}
```


<ClientOnly>
  <Reward />
</ClientOnly>

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
