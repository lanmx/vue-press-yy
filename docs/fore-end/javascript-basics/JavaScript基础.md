# JavaScript基础

https://juejin.cn/post/7061588533214969892

## 一、类型和条件语句

#### 1、转数字类型

Number(其它类型)

parseInt(将字符串转成整数)

parseFloat(将字符串转成浮点数)

整数 int  （long,char,short）

小数（浮点数） float /double



#### 2、转字符串

toString()



#### 3、隐式转换

== 会自动类型转换（隐式转换）

！= 会隐式转换

！== 不会隐式转换

> a = 123, b="123"
>
> a!=b 为 false
>
> a!==b 为 true

true/false && 执行语句

流程控制语句把表达式的值隐式转换为布尔类型（隐式布尔类型转换）



#### 4、五个特殊值：""  0  undefined  null  NaN ;在if(NaN)都是false，其它都是true

#### 5、case穿透的问题：每个case添加break解决穿透的问题,default可以不加，因为后面没有了！

```js
switch(value) {
	case "早上"：
		console.log("good morning")
		break;
	case "晚上"：
		console.log("good night")
		break;
	default: 
		console.log("Nice!")
}
```

#### 6、while

```js
// while循环
while（true）{
	console.log ("死循环")
} 
```

#### 7、for循环 

在屏幕上显示一个♥的三角形

```js
let length = 6
function triangle(length) {
    for(let i = 0; i < length; i++) {
        for (let j = 0; j < i+1; j++ ){
            document.write("♥");
        }
        document.write("<br>")
    }
}
```

#### 8、continue和break

#### 9、断点调式：debugger，单步执行，watch,

#### 10、js输出空格

js代码里无论输入多少个空格，最终输出只会输出一个空格

> 解决方法：1、使用html标签&nbsp； 2、通过css样式white-space: pre，空白会被浏览器保留

#### 11. dom

document.write  重绘

innerHTML 往页面添加内容 

#### 12. 立即执行函数

```js
// 不会执行
funcition test() {
    console.log("test函数执行")
}
// 小括号会当做表达式，会执行，执行完会立即销毁，但是不能被调用
(funcition() {
    console.log("test函数执行")
})()
(funcition() {
    console.log("test函数执行")
}())
// 会执行
var demo = function() {
    console.log("demo函数被调用")
}()
```



## 二、String对象

#### 1. trim()

> trim() 方法用于删除字符串头尾空白符，空白符包括：空格、制表符tab、换行符、其它空白符；
>
> trim() 不会改变原来字符串；
>
> trim() 不适用于null / undefined / Number类型



## 三、Array对象

javascript支持在数组中存放不同的数据类型，但开发建议存放相同的类型

- 数组长度，Array.length

- 通过索引值获取某个位置的数据，Array[i]，若不存在不会报错，会输出undefined

#### 1. pop()

删除数组最后一个元素并且返回删除的元素

#### 2. shift()

删除并且返回数组的第一个元素

#### 3. unshift()

向数组的开头添加一个或者多个元素，且返回新长度

#### 4. push()

向数组的末尾添加一个或多个元素，并返回新长度

#### 5. splice()

splice() 方法向/从数组添加/删除项目，并返回删除的项目。如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

splice() 方法会改变原始数组。

```js
array.splice(index, howmany, item1, ....., itemX)
```

> | *index*             | 必需。整数，指定在什么位置添加/删除项目，使用负值指定从数组末尾开始的位置。 |
> | ------------------- | ------------------------------------------------------------ |
> | *howmany*           | 可选。要删除的项目数。如果设置为 0，则不会删除任何项目。     |
> | *item1, ..., itemX* | 可选。要添加到数组中的新项目。                               |

#### 6. toString()

把数组转换为字符串，并返回结果

```js
array.toString()
```

#### 7. slice()

slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

#### 8. 数组拼接

最后一个数组的时候不需要拼接内容

```js
let arr = ["乒乓球","羽毛球","篮球"]
function concatArr(arr) {
    let message = ''
    for (let i = 0; i <arr.length; i++) {
       if (i === arr.length) break
       message += arr[i] + "-"
    }
    return message
}
```

#### 9. 数组最大值

```js
let arr = [1,2,3,4,99,66,0]
function maxArr(arr) {
    let max = arr[0]
    for (let i = 0; i < arr.length; i++) {
    	if(arr[i] > max) {
        	max = arr[i]
   		 }
	}
    return max
}
```

#### 10. 数组平均值

```js
let arr = [1,2,3,4]
function averageArr(arr) {
    let total = 0
    let average = 0
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
    }
    average = total/arr.length
    return average
}
```

####  11. 数组取反

```js
let arr = [1,2,3,4,5,6,7]
function reverseArr(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        let temp = arr[i];
        a[i] = arr[arr.length-1-i]
        arr[arr.length-1-i] = temp
    }
    return arr
}
```





#### 12. 数组排序

> 冒泡排序、选择排序、插入排序
>
> 堆排序、希尔排序、快速排序

##### （1）冒泡排序

`9，2，4，8，1`从小到大排序

思路：

一轮两两比较，把9移到最后：`2，4，8，1`，9

二轮比较四位数字即可，把1和8交换：`2，4，1`，8，9

三轮比较三位数组即可，把1和4交换：`2，1`，4，8，9

四轮比较两位数字即可，把1和2交换：`1`，2，4，8，9

```js
let arr = [22,33,7,8,99,111,5,20]
function bubbleSort(arr) {
    for(let j = arr.length-1; j > 0; j--) {
        for(let i = 0; i< j; i++) {
            if(arr[i] > arr[i+1]) {
                let temp = arr[i]
                arr[i] = arr[arr.length-1-i]
                arr[arr.length-1-i] = temp
            }
   		}
    }
    return arr
}
```

##### （2）选择排序

##### （3）快速排序

##### （4）sort排序方法

1. sort() 方法用于对数组的元素进行排序

2. 排序顺序可以是字母或数字，并按升序或降序

3. 默认排序顺序为按字母升序

4. 这种方法会改变原始数组

**数字数组排序**

```js
// 1. 升序
var points = [40,100,1,5,25,10];
points.sort(function(a,b){return a-b});
// 1,5,10,25,40,100

// 2. 降序
var points = [40,100,1,5,25,10];
points.sort(function(a,b){return b-a});
// 100,40,25,10,5,1
```

**字母数组排序**

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
// 1. 升序
fruits.sort(); // Apple,Banana,Mango,Orange
// 2. 降序
fruits.reverse(); //  Orange,Mango,Banana,Apple
```





#### 13. 判断数组是否存在重复

##### （1）利用哈希

```js
// 传入一个数组
// 这里有个限制,数组里面的每个item必须是一个对象,才能用.语法;如果数组里面是字符串会找不到
function isRepeat(arr) {
    let hash = {}
    for(let i in arr) {
        // 2、下一个对象循环的时候,如果拿到的arr[i]为true,则重复了
        if(hash[arr[i]]) {
        	// 存在重复，则return true,后面不再判断
        	return true
        }
        // 1、遍历每个item,把每个item赋值true给哈希对象
        hash[arr[i]] = true
    }
    // 遍历完整个数组，都没有找到重复值, return false
    return false
}
```

##### （1）直接用for循环比较，需要先排序

```js
// 函数需要传入一维数组，不能是对象数组
let arr = [1,2,3,4,2]
// 排序
let sortArr = arr.sort()
function isRepeat(sortArr) {
    for(let i = 0; i < sortArr.length; i++) {
        if(sortArr[i] === sortArr[i+1]) {
            alert('重复的内容：',sort[i])
            break
        }
    }
}
```

#### 14. 数组去重

##### （1）map结构对象数组去重

```js
const unique = (arr) => {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
}
```

##### （2）非对象数组去重

```js
const newarr = Array.from(new Set(arr))
```

##### （3）算法题拓展

 想办法先随机生成100个随机字符串整数扔到一个数组里，比如var arr = ['1'，'2'，'3' ....]，arr的长度是100，再设计一个算法去重，不允许用new set。

```ts
var arr = Array.from({ length: 100 }).map(item => Math.floor(Math.random() * 100).toString())
var cloneArr = []
arr.forEach(item => {
  if(cloneArr.indexOf(item) === -1) {
    cloneArr.push(item)
  }
})
console.log(cloneArr);
```



## 四、Math对象

#### 1. Math 构造器

与其他全局对象不同，Math对象没有构造函数。方法和属性是静态的。

可以在不首先创建Math对象的情况下使用所有方法和属性（常量）。

#### 2. Math属性和方法

Math属性和方法有很多，参考[JavaScript 数学教程](https://www.w3school.com.cn/js/js_math.asp)

#### （1） Math.floor()

floor() 方法将数字向下舍入为最接近的整数，并返回结果。

如果传递的参数是整数，则不会舍入该值。

```js
Math.floor(0.6); //0
Math.floor(5.1);  //5
Math.floor(-5.1); //-6
Math.floor(-5.9); //-6
```

#### （2） Math.ceil()

ceil() 方法将数字向上舍入为最接近的整数，并返回结果。

如果传递的参数是整数，则不会舍入该值。

```js
Math.ceil(5); //5
Math.ceil(5.1); //6
Math.ceil(-5.1); //-5
```

#### （3）Math.random()

Math.random() 返回介于 0（包括） 与 1（不包括） 之间的随机数

## 五、深拷贝和浅拷贝
#### 浅拷贝: Object.assign()
如果对象的属性值为简单类型`（string，number）`，通过`Object.assign({},srcobj)`，得到的新对象为深拷贝；

如果属性值是对象或其他引用类型，那对于这个引用数据类型而言是浅拷贝的。
#### 浅拷贝：_.clone()
#### 深拷贝：JSON.parse(JSON.stringify())

#### 深拷贝：_.cloneDeep()
深拷贝建议用Lodash的_.cloneDeep()

## 六、
<Valine></Valine>



