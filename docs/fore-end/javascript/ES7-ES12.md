## ES7-ES12

### ES7

#### 1. includes判断数组是否包含元素

以前是使用`indexOf === -1`

#### 2. 指数的运算方法 `**`

```js
// ES7
3 ** 3 // 27
// 以前用法
Math.pow(3,3) // 27
```

### ES8

#### 1. `Object.values`获取对象所有属性的值

```js
Object.values(['aaa','bbb','ccc'])  // ['aaa','bbb','ccc']
Object.values('abc')  // ['a','b','c']

// 之前提供获取所有属性
`Object.keys`获取对象所有属性key
```

#### 2.  `Object.entries` 获取对象的键值对`[[],[]]`

```js
Object.entries(item => {
    console.log(item[0],item[1])
})
```

#### 3. `padStart` / `padEnd`

```js
str.padStart(lenth,"*")
```

#### 4. 允许结尾逗号`foo(n,m,)`

#### 5. 属性描述符：`Object.getOwnPropertyDescriptors`

#### 6. `async function foo()`

### ES9

#### 1. `Async iterators` 迭代器

#### 2. `Object spread operators {...}`

#### 3. `Promise finally`

### ES10

#### 1. `flat(n)`：n是可指定的深度

flat()方法按照可指定的深度递归遍历数组，并将所有元素遍历到的子数组中的元素合并为一个新数组，例如`flat(2)`将二维数组遍历为一位数组；`flat(2)`将三维数组遍历为二位数组

#### 2. `flatMap()`先使用映射映射每个元素，然后将结果压缩成一个新数组

- 注意：`flatMap`先进行`map`操作，再进行`flat`操作
- 注意：`flatMap`的flat相当于深度为`1`

```js
const messages = ['hello world', 'good night', 'good noon']
// flatMap将每个item都新生成一个数组
// [['hello world'], ['good night'], ['good noon']]
const words = messages.flatMap(item => {
    return item.split(' ')
})
// ['hello','world', 'good','night', 'good','noon']
```

#### 3. `Object.fromEntries`

将多维数组对象转换为对象属性`key-value`

```js
const obj = {
    name: 'lan'
    age: 19
}
const entries = Object.entries(obj)
const newObj = {}
for(const entry of ntries) {  // in 拿到的是索引值
    newObj[entry[0]] = entry[1]
}

// 使用`Object.fromEntries`
const newO = Object.fromEntries(entries)
```

`Object.fromEntries`应用

1. 将参数字符串转换为对象结构`key-value`

```js
const queryParams = new URLSearchParams('name=lan&age=18')
```

#### 4. `trimStart`: 去掉头部的空格

#### 5. `trimEnd`: 去掉尾部的空格

#### 6. `Symbol description`

#### 7. `Option catch binding`

### ES11

#### 1. `BigInt`

早期的JavaScript不能表示过大的数字，大于MAX_SAFE_INTEGER数值可能不正确

```js
const bigInt = Number.MAX_SAFE_INTEGER
const num = 100
console.log(bigInt + bigInt(num))
// 如果转换为小的数字Number(bigInt)有可能出错
```

#### 2. `Nullish Coalescing Operator`空值合并操作

逻辑或 `||` 会把`0`,`''`转换为`false，`空值合并操作用来替代空值操作

```js
const foo = undefined
const bar = foo ?? 'default value' // default value
const foo = ''
const bar = foo ?? 'default value' // ''
const foo = 0
const bar = foo ?? 'default value' // 0
```

#### 3. `Optional Chaining` : 可选链

属性点没有值的时候会`undefined`，直接报错，可选链可以避免

```js
info.friend?.girlfriend // ,没有的话返回undefined,不会报错
```

#### 4. `GlobalThis`: 全局指向

#### 5. `for(const item in obj)`: item 是key

#### 6. `Dynamic import`

#### 7. `Promise.allSettled`

#### 8. `import meta`

### ES12

#### 1. `FinalizationRegistry`

`FinalizationRegistry`对象让对象被垃圾回收时请求一个回调：当一个在注册表中注册的对象被回收时，请求在某个时间点上调用一个清理回调（`finalizer`）

你可以通过调用`register`方法，注册任何你想要清理回调的对象，传入该对象和所含的值，如果`obj`和`info`存在强引用，其中一个置`null`,不会被`GC`回收，如果时弱引用，会被`GC`定时回收

![image-20220205141349040](@alias/image-20220205141349040.png)

#### 2. `WeakRef.prototype.deref`

- `obj.deref().name`
- 如果原对象没有销毁，可以获取原对象
- 如果已销毁，`undefined`

#### 3.` A||=B  &&=  ??=`

#### 4. Numeric Separator

#### 5. `String/replaceAll`: 字符串替换

<Valine></Valine>

