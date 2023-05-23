---
title: 链表
description: 认识链表
meta:
  - name: keywords
    content: 链表 link
---
# 链表

## 一、认识链表

1. 链表和数组一样，可以用于存储一系列的元素，但是链表和数组的实现机制完全不同。

2. 链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（有些语言称为指针或连接）组成。

   ![image-20211121172241426](@alias/image-20211121172241426.png)

3. 如果链表为空，head指针指向空对象。

4. 链表最后一个节点指向空对象。

   > 生活中的例子：
   >
   > 1. 火车。火车头连接下一个节点，节点上有乘客（类似数据），依次类推。

   ![image-20211121172427339](@alias/image-20211121172427339.png)

## 二、相对链表，数组的缺点

1. 数组的创建通常需要申请一段链接的内存空间，一整块的内存，并且大小都是固定的，大多数编程语言的数组都是固定大小。
2. 所以当当前数组不能满足容量需求时，需要扩容。一般情况下申请一个更大的数组，比如2倍，然后将原数组拷贝过去。
3. 在数组开头或中间位置插入和删除数据成本高，需要进行大量元素的位移。（但是如果通过数组的下标值更改数据，效率也是非常高的。）
4. JavaScript的Array类的实现原理就是数组

## 三、相对数组，链表的优势

1. 链表不同于数组，链表中的内存中不必是连续的空间。可以充分利用计算机的内存，实现灵活的内存动态管理。
2. 链表不必在创建时确定大小，并且大小可以无限延伸。
3. 链表在插入和删除数据时，时间复杂度可以达到O(1)，相对数组效率高很多。

## 四、相对数组，链表的缺点

1. 链表访问任何一个位置的元素时，需要从头开始访问。无法跳过第一个元素访问任何一个元素。因为链表是相连的。
2. 无法通过下标直接访问元素，需要从头一个个访问，直到找到对应的元素。

## 五、链表常见操作

操作方法和数组类似，因为链表本身就是可以替代数组的结构。

1. append(element)：向列表尾部添加一个新的项
2. insert(position, element)：向列表的特定我位置插入一个新的项 (相对比较复杂)
3. get(position)：获取对应位置的元素
4. indexOf(element)：返回元素在列表中的索引。如果列表没有该元素则返回-1
5. update(position)：修改某个位置的元素
6. removeAt(position)：从列表特定位置移出一项
7. remove(element)：从列表中移出一项
8. isEmpty()：判断链表是否为空
9. size()：返回链表元素个数
10. toString()：把链表数据转换为字符串数据

## 六、单向链表结构的代码封装实现

1. 封装LinkedList类，用于表示链表结构。（和java的链表同名，不同的是java中的这个类是双向链表）

2. 链表LinkedList类中有一个Node类，用于封装每个节点上的信息（类似优先队列封装）
3. 链表中保存两个属性，一个是链表的长度，一个是链表中的第一个节点。

封装代码：

```js
// prototype是链表类的一个属性指向原型对象，可以在构造函数中给原型对象添加属性方法。
// 把方法写在prototype里，直接直接调用里面的方法，用this的话要给实例对象赋方法，占用内存。
// 原型写在构造函数里，实现继承时会有很多问题，建议写在外面。这个例子是把原型写在构造函数里。
// 封装单向链表类
function LinkedList() {
    // 内部类：节点类
    function Node(data) {
        this.data = data
        this.next = null
    }
    // 属性
    this.head = null
    this.length = 0
    
    // 方法
    // 1. 追加方法
    LinkedList.prototype.append = function (data) {
        // 步骤：
        // 1.创建新节点
        // 2.更改节点引用
        
        // 1. 创建新节点
        let newNode = new Node()
        // 判断是否是第一个节点
        if (this.length === 0) {
            this.head = newNode
        } else {
            // 用while找到最后一个节点
            // 把头节点赋给当前节点，判断头节点指向是否为空 ,如果是，把当前节点指向下一个节点。
            let current = this.head
            while( current.next) {
                current = current.next
            }
            // 把最后的节点指向新节点
            current.next = newNode
        }
        // 追加完后，记得把长度加1
        this.length += 1
    }
    
    // 2. toString方法
    LinkedList.prototype.toString = function () {
        let current = this.head
        let listString = ''
        while (current) {
            listString += current.data + ' '
            current = current.next
        }
        return listString
    }
    
    // 3.insert方法(两个参数)
    LinkedList.prototype.insert = function (position, data) {
        // 1. 对position的越界判断
        if( position < 0 || position > this.length) return false
        
        let newNode = new Node()
        // position为0的情况
        // 第一个节点是被head引用指向，这时候把head指向赋值给新的元素的指向next，那么新的元素的next指向就会指向原来的第一个元素; 
        // 然后再把指向原来第一个元素的head头指向指向新插入的元素。
        if (position === 0) {
            newNode.next = this.head
            this.head = newNode
        } else {
            let index = 0
            let current = this.head
            let previous = null // 前一个节点
            while( index++ < position ) {
                previous = current
                current = current.next
            }
            newNode.next = current
            previous.next = newNode
        }
        this.length += 1
        return true
    }
    
    // 4.get获取data方法
    LinkedList.prototype.get = function (position) {
        if (position < 0 || position > this.length-1 ) return false
        let index = 0
        let current = this.head
        while (index++ < position) {
           current = current.next
        }
        return current.data
    }
    
    // 5.indexOf
    LinkedList.prototype.indexOf = function (data) {
        let current = this.head
        let index = 0
        while (current) {
           if( current.data === data ) return index
           current = current.next
           index++
        }
        // 没找到，返回-1
        return -1
    }
    // 6.update
    LinkedList.prototype.update = function (position,newData) {
        if (position < 0 || position > this.length ) return false
        let current = this.head
        let index = 0
        while (index++ < position) {
            current = current.next
        }
        current.data = newData
        return true
    }
    
    // 7. removeAt(position)方法
    LinkedList.prototype.removeAt = function (position) {
        // 越界，返回空对象
        if (position < 0 || position > this.length ) return null
        let current = this.head
        if (position === 0) {
            this.head = this.head.next
            // 把头指向下一个元素，第一个元素虽然引用了下一个元素，但是引用它的头指针已经引用别人了，它自己没有别人引用了，会被回收机制回收，所以可以不用删，可以不用管
        } else {
             let previous = null
             let index = 0
             while (index++ < position) {
                 previous = current
           		 current = current.next
        	 }
             previous.next = current.next
        }
        this.length--
        return current.data
    }
    
    // 8. remove(element)方法
    LinkedList.prototype.remove = function (data) {
        let position = this.indexOf(data)
        return this.removeAt(position)
    }
    
    // 9.isEmpty()
    LinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }
    // 10.size()
    
    LinkedList.prototype.size = function () {
        return this.length
    }
}
```

链表的insert方法画图：

![image-20211121191513930](@alias/image-20211121191513930.png)

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

