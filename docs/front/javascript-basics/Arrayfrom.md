## Array.from()

作用：将一个类[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)对象或者可遍历对象转换成一个真正的数组
类数组对象：最基本的要求就是具体length属性的对象；

将类数组转换为真正的数组

```ts
let array = {
0:“aaa”,
1:“12”,
2:[“bbb”,“ccc”,“ddd”],
“length”:3
}
let arr = Array.from(array);
输出结果：[“aaa”,“12”,[“bbb”,“ccc”,“ddd”]];
```

如果没有length属性，输出结果为什么？

```
let array = {
0:“aaa”,
1:“12”,
2:[“bbb”,“ccc”,“ddd”],
}
let arr = Array.from(array);
输出结果：[];
```

由以上可以看书，如果将数组中的length属性去掉，那么就会输出一个长度为0的空数组

那么如果对象的属性名不是数字类型，而是字符串型呢？ 

```ts
let array = { 
    “name”:“aaa”, 
    “age”:“12”,
	“friends”:[“bbb”,“ccc”,“ddd”], 
    “length”:3 
} 
let arr = Array.from(array); 输出结果：[undefined,undefined,undefined]
```

可以看出，如果对象的属性名不是数字类型，输出的结果则是长度为3，元素均为undefined的数组 所以我们可以得出以下结论：
类数组对象中必须具有length属性，用于指定数组的长度。如果没有length属性，那么类数组转换后的数组是一个空数组;
类数组对象的属性名必须为数值型或者是字符串型的数字。

- Array.from还可以接收第二个参数，作用类似于数组的map方法，用来对数组中每个元素进行处理，然后再将处理后的值放入返回一个新的数组

```ts
let arr = [2,4,5,6,1,7];
let set = new Set(arr);
console.log(Array.from(set,item=>item+1));// [3,5,6,7,2,8]
```

- 将Set结构的数据转换为真正的数组

  ```ts
  let arr = [2,4,5,6,1,7];
  let set = new Set(arr);
  console.log(Array.from(set));// [2,4,5,6,1,7]
  ```

- 将字符串转换为数组

  ```ts
  let str = “hello world!”
  console.log(Array.from(str));//[“h”, “e”, “l”, “l”, “o”, " ", “w”, “o”, “r”, “l”, “d”, “!”]
  ```

  