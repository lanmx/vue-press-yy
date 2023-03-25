# 栈（stack）

## 一、认识栈结构

1. 栈，是一种受线的线性表，后进先出（LIFO），last in first out；限制仅允许在表的一端进行插入和删除运算；允许插入和删除操作的一端被称为栈顶，另一端称为栈底；

> 生活中案例：
>
> 1. 自动餐托盘。最后放在上面的托盘，往往先被拿出去使用。
>
> 2. 邮件。从上往下处理邮件，最先受到的最先处理。

2. 向一个栈插入新元素又称进栈、入栈或压栈
3. 向一个栈删除元素又称出栈或退栈

![image-20211121110224840](@alias/image-20211121110224840.png)



## 二、函数调用栈

1. 函数直接的相互调用。A调用B，B调用C，C调用D。函数不断压栈的过程，每执行一个函数的时候才会出栈。

   函数的执行顺序：压栈过程：A-》B-》C-》D；D执行完才会出栈，出栈顺序：D-》C-》Ｂ-》A。

   函数调用栈的称呼，来自它的内部实现机制。

   ```js
   function A() {
   	function B() {
   		function C() {
   			function D() {
   				...
   			}
   		}
   	}
   }
   ```

   ![image-20211121112203329](@alias/image-20211121112203329.png)

## 三、栈结构面试题

![image-20211121113055903](@alias/image-20211121113055903.png)



## 四、栈结构的实现方式

1. 基于数组
2. 基于链表（JavaScript没有自带链表结构）



## 五、基于数组实现的栈的封装

1. 给栈中添加属性

   ```js
   this.items = []
   ```

2. 给栈中添加方法

   ```js
    // 1. 给每个实例添加方法，这种方法不是特别推荐，消耗内存过大，效率低；每个实例都生成了一个方法。
   this.push = function () {}
   
    // 2. 给类添加方法，推荐，省内存，效率高；这个方法继承于类Stack
   Stack.prototype.push = function () {}
   ```

3. 栈封装的代码

   ```js
   // Method: 和某一个对象实例有联系
   // 封装栈类 function
   function Stack() {
       // 栈的属性，用数组把所有属性放在一起
       this.items = []
       
       // 栈的相关操作（方法）
       // 1. 压栈
       Stack.prototype.push = function (element) {
           this.items.push(element)
       }
       // 2. 出栈
       Stack.prototype.pop = function () {
           return this.items.pop()
       }
       // 3. 查看栈顶元素 (只是查看，不改变元素)
       Stack.prototype.peek = function () {
           return this.items[this.items.length - 1]
       }
       // 4. 判断栈是否为空
       Stack.prototype.isEmpty = function () {
           return this.items.length === 0
       }
       // 5. 获取栈中的个数
       Stack.prototype.size = function () {
           return this.items.length
       }
       // 6. toString
       Stack.prototype.toString = function () {
           let resultString = ''
           for(let i = 0; i < this.items.length; i++ ) {
               resultString += this.item[i] + ''
           }
           return resultString
       }
   }
   ```

   

## 六、栈 - 十进制转二进制

1. 为什么十进制转二进制：计算机的所有内容都是用二进制数字表示，生活中用十进制。

2. 十进制转二进制函数代码

```js
function (decNumber) {
    // 定义栈对象
    let stack = new Stack()
    
    while (decNumber > 0) {
        // 入栈
        stack.push(decNumber % 2)
        decNumber = Math.floor(decNumber / 2)
    }
    let binaryString = ''
    while (!stack.isEmpty()) {
        // 出栈
        binaryString += stack.pop()
    }
    return binaryString
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
   
   
