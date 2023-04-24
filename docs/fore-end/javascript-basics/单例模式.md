## 单例在前端的应用场景

### 一、Vuex

vuex的store就是一个单例模式，采用了单一状态树，一个对象为唯一的数据源。

### 二、Redux

Redux提供的全局store，和Vuex一样，必须是一个单例模式；否则每个组件各玩各的，实现不了数据协调同步。

### 三、全局组件

只有一个实例，状态唯一。例如登录弹窗，购物车。

### 四、localStorage

### 五、ES6的Import



ES6中，import引入的模块会自动执行，有时候我们重复引入一个模块，但是不会执行多次，因为import用到了Singleton模式

## storage单例的实现

### 一、思路

一个类只有一个实例。

### 二、实现

在获取一个类的实例之前，去判断这个实例是否存在，如果存在则直接把这个实例返回。（那不就是一个类只有一个实例了吗）

### 三、代码

```js
class Storage {
  static instance
  static getInstance() {
      return Storage.instance || (Storage.instance = new Storage());
  };
  getItem(key) {
      return localStorage.getItem(key);
  };
  setItem(key,value) {
      localStorage.setItem(key,value)
  }
}
// 测试
const s1 = Storage.getInstance()
const s2 = Storage.getInstance()
console.log(s1);
console.log(s2);
s1.setItem('name','aaa')
s2.setItem('name','bbb')
console.log(s1.getItem('name'));  // bbb
console.log(s1 === s2); // true
```





