---
title: 队列
description: 认识队列结构，队列的实现
meta:
  - name: keywords
    content: 队列 Queue
---

# 队列（Queue）

## 一、认识队列结构

1. 队列，是一种受限的线性表，先进先出（FIFO），first in first out；它只允许在表的前端（font）进行删除操作，只允许在后端（rear） 进行插入操作。

   > 生活中的例子：
   >
   > 1. 排队买电影票。优先排队的人优先处理。
   > 2. 饭堂排队打饭。
   > 3. 打印队列。优先打印先放入的文档

   > 开发中的例子：
   >
   > 1. 线程队列。
   >
   >    在开发中，为了让多个任务并行处理，通过会启用多线程。
   >
   >    但是不能让大量的线程同时处理任务，会占用过多的资源。
   >
   >    这时候使用线程队列，线程队列会依照次序启动线程，并且处理对应的任务。

   ![image-20211121131723311](@alias/image-20211121131723311.png)

## 二、队列的实现

队列的实现和栈一样。

1. 基于数组
2. 基于链表

## 三、基于数组实现的队列的封装

1. 给队列中添加属性

   ```js
   this.items = []
   ```

2. 给队列中添加方法

   ```js
   // 给类添加方法，继承于类Queue
   Queue.prototype.enqueue = function () {}
   ```

3. 队列封装的代码

   3.1  普通队列代码封装
   
   ```js
   // 封装队列 function
   function Queue() {
       // 属性
       this.items = []
       
       // 方法
       // 1. 加入队列
       Queue.prototype.enqueue = function (ele) {
           this.items.push(ele)
       }
       // 2. 删除前端元素
       Queue.prototype.dequeue = function () {
           return this.items.shift()
       }
       // 3. 查看前端元素
       Queue.prototype.front = function () {
           return this.item[0]
       }
       // 4. 是否为空
       Queue.prototype.isEmpty = function () {
           return this.items.length === 0
       }
       // 5. 查看队列元素个数
       Queue.prototype.size = function () {
           return this.items.length
       }
       // 6. toString
       Queue.prototype.toString = function () {
           let resultString = ''
           for(let i = 0; i < this.items.length; i++ ) {
               resultString += this.item[i] + ''
           }
           return resultString
       }
   }
   ```
   
   3.2 优先级队列代码封装
   
   ```js
   // 封装队列 function
   function PriorityQueue() {
       // 属性
       this.items = []
       
       // 方法
       // 1. 加入队列
       PriorityQueue.prototype.enqueue = function (ele) {
           this.items.push(ele)
       }
       // 2. 删除前端元素
       PriorityQueue.prototype.dequeue = function () {
           return this.items.shift()
       }
       // 3. 查看前端元素
       PriorityQueue.prototype.front = function () {
           return this.item[0]
       }
       // 4. 是否为空
       PriorityQueue.prototype.isEmpty = function () {
           return this.items.length === 0
       }
       // 5. 查看队列元素个数
       PriorityQueue.prototype.size = function () {
           return this.items.length
       }
       // 6. toString
       PriorityQueue.prototype.toString = function () {
           let resultString = ''
           for(let i = 0; i < this.items.length; i++ ) {
               resultString += this.item[i].element + '' + this.items[i].priority + ''
           }
           return resultString
       }
   }
   ```
   
   

## 四、队列面试题 - 击鼓传花

击鼓传花是一道常见的面试算法题

```js
// 击鼓传花
function passFlower(nameList,num) {
    // 1. 新建队列结构
    let queue = new Queue()
    // 2. 将所有人一次加入队列中
    for(let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }
    // 3. 开始游戏，数数字，用while一直循环，直到只剩一个人
    while(queue.size() > 1) {
        // 3.1 先把不是这个数字的人删掉，并且再加入到队列尾部
  		for(let i = 0; i < num - 1; i++) {
       		queue.enqueue(queue.dequeue())
    	}
        // 3.2 这时候，是这个数字的人已经跑着最前面了，把是这个数字的人删掉
        queue.dequeue()
    }
    // 4. 获取最后那个人
    let endName = queue.front()
    return nameList(indexOf(endName))
}
```



## 五、优先级队列

1. 普通的队列插入一个元素，数据会被放在后端，前面的元素处理完后才会处理后端的数据。

2. 优先级队列，插入一个元素会考虑该元素的优先级，和其它元素进行优先级比较，跟进优先级放入正确的位置。

   > 生活中的案例：
   >
   > 1. 机场登机。头等舱和商务舱的优先级高于经济舱。
   > 2. 在有些国家，老年人的孕妇登机优先级高于其它乘客。
   > 3. 医院的急诊科。医生优先处理病情比较严重的患者。
   >
   > 计算机中的例子：
   >
   > 1. 每个线程处理的任务重要性不同，根据优先级决定线程在队列中处理的次序。

## 六、优先级队列的代码封装实现

1. 元素和优先级放在一起，在当前类里面再封装一个类（内部类），即封装一个新的构造函数，和java的类封装有点类似。
2. 添加元素时，将新插入的元素的优先级和队列中已存在的元素优先级进行比较，重新排序。
3. 其实，就是在添加元素之前，加入排序。仅仅多了排序。

```js
// 优先级队列函数封装
function PriorityQueue() {
    // 在PriorityQueue重新创建一个类，可以理解为内部类
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }
    // 封装属性
    this.items = []
    // 封装方法
    PriorityQueue.prototype.enqueue = function (element, priority) {
        // 1. 创建QueueElement对象
        let queueElement = new QueueElement(element, priority)
        // 2. 判断队列是否为空
        if (this.items.length === 0 ) {
            this.items.push(queueElement)
        } else { // 排序比较确定插入位置
            let added = false
            for(let i = 0; i < items.length; i++) {
                if( queueElement.priority < items[i].priority ) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            // 如果所有元素的优先级都小于插入的新元素，则直接在后面push
            !added && (this.items.push(queueElement)) 
            alert(this.items) // alert默认调用toString()
        }
    }
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

