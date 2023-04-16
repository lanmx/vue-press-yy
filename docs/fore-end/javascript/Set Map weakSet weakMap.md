---
title: Set Map weakSet weakMap
meta:
  - name: description
    content: Set Map weakSet weakMap vue3响应式原理
  - name: keywords
    content: Set Map weakSet weakMap vue3响应式原理
---

# Set  / Map / weakSet / weakMap 、vue3响应式原理

## 一、Set的基本使用

- ES6之前储存数据的结构主要有数组、对象；

- ES6新增了两种数据结构：Set、Map。以及他们的另外形式WeakSet、WeakMap；
- set对对象是强引用；

Set是一个新增的数据结构，可以用来保存数据，类似数组，但是和数组的区别是元素不能重复。

创建Set需要通过Set构造函数：

```js
// 1. 创建Set结构
const set = new Set()
// 2. 给set添加数据
set.add({})
set.add({})
// set: set(2) { {}, {} }
// 创建两个空对象，数组里保存的依然是两个空对象，因为地址不同，不算重复元素
const obj = {}
set.add(obj)
set.add(obj)
// set: set(1) { {} }
// 因为地址相同，所以只有一个obj{}

// 3. 数组去重
let arr = [1,2,3,4,1,2]
let newArr1 = [...new Set(arr)]
let newArr2 = Array.from(arr)
```

### 1、set常见方法

- size：返回set元素个数
- add(item)：添加的item
- delete(item):：传元素item, 不支持index
- has(item)：是否包含item，返回false、true
- clear()：全部删除
- forEach：遍历元素
- for(const item of arr)：遍历元素

### 2、WeakSet使用

WeakSet和Set类似，也是内部元素不能重复的数据结构

WeakSet和Set的区别：

1. WeakSet只能存放对象类型，不能放基本数据类型

2. WeakSet对元素弱引用，如果没有其他引用对对象引用，GC可以回收该对象

3. 强引用（strong reference）：GC认为该引用有效

4. 弱引用（weak reference）：GC不把该引用当回事，如果没有有效引用，只有弱引用，GC依然会回收；弱引用可以继续打印。

   ![image-20220126175916317](@alias/image-20220126175916317.png)

- 注意：WeakSet不能遍历。

  1. 因为WeakSet只是对对象的弱引用，如果遍历获取，可能导致对象不能正常销毁
  2. 因此存储到WeakSet的对象没办法获取

  

### 三、WeakSet常见方法

- add(value)：添加某个元素，返回WeakSet对象本身
- delete(value)：删除与value相等的元素，返回Boolean
- has(value)：判断WeakSet是否存在，返回Boolean

### 四、WeakSet的应用场景

 当不希望方法被调用call改变this指向，或者希望方法置空时被销毁，可以用WeakSet保存该方法，因为WeakSet是弱引用。

![image-20220126183427364](@alias/image-20220126183427364.png)



## 二、Map

### 1、Map使用

ES6新增数据结构Map，用于存储映射关系

我们通常用对象存储映射关系，那么，Map和对象的区别？

- 对象存储映射关系只能用字符串作为属性名key

- Map允许通过对象类型作为key值：`map.set(obj, 'lan')`

  const map = new Map([[obj, 'lan'],[obj2, 'mx']])

### 2、Map常见方法和属性

- size：Map大小（map.size）
- get(key)：获取key属性值
- has(key)
- delete(key)
- clear()
- forEach()：遍历
- for(const [key, value] of arr)：遍历元素

### 3、WeakMap

WeakMap和Map数据结构相似，以键值对形式存在

WeakMap和Map区别：

- WeakMap的Key只能使用对象，不接受其他类型作Key

- WeakMap的Key对对象的引用是弱引用，如果没有其它引用引用对象，则GC可以回收该对象

- 如下图：Map是强引用，如果obj = null，引用name不会销毁，因为Map有强引用指向name；如果把Map改为WeakMap，name会被销毁

  ![image-20220126185428097](@alias/image-20220126185428097.png)

### 4、WeakMap常见方法

- get(obj)
- has(obj)
- delete(obj)
- WeakMap不能遍历，没有forEach方法

### 5、WeakMap应用场景（vue3响应式原理）

监听对象属性 => 改变时执行属性对应的render函数（每个div都是一个render函数）

如何将属性和对应的监听函数联系起来？

1. 创建weakMap: new WeakMap
2. 创建Map: new Map
3. Map.set收集所有依赖的数据结构
4. 把所有的依赖结构放在WeakMap里面
5. 监听数据是否发生改变：Proxy / Object.defineProperty
6. WeakMap.get拿到改变的数据
7. 通过foreach执行每个数据对应的函数

![image-20220126191051534](@alias/image-20220126191051534.png)

```js
const obj1 = {
    name: 'lan'
    age: 18
}
function obj1NameFn1() {
    console.log('obj1NameFn1执行')
}
function obj1NameFn2() {
    console.log('obj1NameFn2执行')
}
function obj1AgeFn1() {
    console.log('obj1AgeFn1执行')
}
function obj1AgeFn2() {
    console.log('obj1AgeFn2执行')
}
const obj2 = {
    name: 'min'
    age: 24
    height: 180
}
// 1.创建weakMap
const weakMap = new WeakMap()
// 2.创建Map
const obj1Map = new Map()
// 3.Map.set收集obj1所有依赖的数据结构
obj1Map.set('name',[obj1NameFn1,obj1NameFn2])
obj1Map.set('age',[obj1AgeFn1,obj1AgeFn2])
// 4.把所有的依赖结构放在WeakMap里面
weakMap.set(obj1,obj1Map)

const obj2Map = new Map()
obj2Map.set('name',[obj2NameFn1,obj2NameFn2])
weakMap.set(obj2,obj2Map)

// 5.监听数据是否发生改变Proxy / Object.defineProperty
obj1.name = 'jame'
// 6.WeakMap.get拿到改变的数据
const targetMap = weakMap.get(obj1)
//  7.通过foreach执行每个数据对应的函数
const fns = target.get('name')
fns.forEach(item => item())
```


<ClientOnly>
  <Reward />
</ClientOnly>

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

