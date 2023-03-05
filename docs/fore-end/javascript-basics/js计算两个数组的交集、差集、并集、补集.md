# js计算两个数组的交集、差集、并集、补集

## 方法一：最普遍的做法

使用 ES5 语法来实现虽然会麻烦些，但兼容性最好，不用考虑浏览器 [JavaScript](https://so.csdn.net/so/search?from=pc_blog_highlight&q=JavaScript) 版本。也不用引入其他[第三方库](https://so.csdn.net/so/search?from=pc_blog_highlight&q=第三方库)。

### 1、直接使用 filter、concat 来计算

```js
var a = [1,2,3,4,5]
var b = [2,4,6,8,10]
//交集
var intersect = a.filter(function(v){ return b.indexOf(v) > -1 })
//差集
var minus = a.filter(function(v){ return b.indexOf(v) == -1 })
//补集
var complement = a.filter(function(v){ return !(b.indexOf(v) > -1) })
 .concat(b.filter(function(v){ return !(a.indexOf(v) > -1)}))
//并集
var unionSet = a.concat(b.filter(function(v){ return !(a.indexOf(v) > -1)}));
console.log("数组a：", a);
console.log("数组b：", b);
console.log("a与b的交集：", intersect);
console.log("a与b的差集：", minus);
console.log("a与b的补集：", complement);
console.log("a与b的并集：", unionSet);

```

### 2、对 Array 进行扩展

```js
//数组功能扩展
//数组迭代函数
Array.prototype.each = function(fn){
 fn = fn || Function.K;
 var a = [];
 var args = Array.prototype.slice.call(arguments, 1);
 for(var i = 0; i < this.length; i++){
 var res = fn.apply(this,[this[i],i].concat(args));
 if(res != null) a.push(res);
 }
 return a;
};
//数组是否包含指定元素
Array.prototype.contains = function(suArr){
 for(var i = 0; i < this.length; i ++){
 	if(this[i] == suArr){
	 	return true;
	 }
 }
 return false;
}
//不重复元素构成的数组
Array.prototype.uniquelize = function(){
 var ra = new Array();
 for(var i = 0; i < this.length; i ++){
	 if(!ra.contains(this[i])){
	 	ra.push(this[i]);
	 }
 }
 return ra;
};
//两个数组的交集
Array.intersect = function(a, b){
 return a.uniquelize().each(function(o){return b.contains(o) ? o : null});
};
//两个数组的差集
Array.minus = function(a, b){
 return a.uniquelize().each(function(o){return b.contains(o) ? null : o});
};
//两个数组的补集
Array.complement = function(a, b){
 return Array.minus(Array.union(a, b),Array.intersect(a, b));
};
//两个数组并集
Array.union = function(a, b){
 return a.concat(b).uniquelize();
};

```

使用样例

```js
var a = [1,2,3,4,5]
var b = [2,4,6,8,10]
console.log("数组a：", a);
console.log("数组b：", b);
console.log("a与b的交集：", Array.intersect(a, b));
console.log("a与b的差集：", Array.minus(a, b));
console.log("a与b的补集：", Array.complement(a, b));
console.log("a与b的并集：", Array.union(a, b));
```



## 方法二：使用 ES6 语法实现

而在 ES6 中我们可以借助扩展运算符（…）以及 Set 的特性实现相关计算，代码也会更加简单些。

```js
var a = [1,2,3,4,5]
var b = [2,4,6,8,10]
console.log("数组a：", a);
console.log("数组b：", b);
var sa = new Set(a);
var sb = new Set(b);
// 交集
let intersect = a.filter(x => sb.has(x));
// 差集
let minus = a.filter(x => !sb.has(x));
// 补集
let complement = [...a.filter(x => !sb.has(x)), ...b.filter(x => !sa.has(x))];
// 并集
let unionSet = Array.from(new Set([...a, ...b]));
console.log("a与b的交集：", intersect);
console.log("a与b的差集：", minus);
console.log("a与b的补集：", complement);
console.log("a与b的并集：", unionSet);
```

借助includes以及箭头函数，代码也会更加简单些。

```js
var a = [1,2,3,4,5];
var b = [2,4,6,8,10];
//交集
var intersect = a.filter(v => b.includes(v));
//差集
var minus = a.filter(v => !b.includes(v));
//补集
var complement = a.filter(v => !b.includes(v)).concat(b.filter(v => !a.includes(v)))
//并集
var unionSet = a.concat(b.filter(v => !a.includes(v)));
console.log("a与b的交集：", intersect);
console.log("a与b的差集：", minus);
console.log("a与b的补集：", complement);
console.log("a与b的并集：", unionSet);
```

## 方法三：使用 jQuery 实现

引入 jQuery，那么实现起来也很简单。

```js
var a = [1,2,3,4,5]
var b = [2,4,6,8,10]
console.log("数组a：", a);
console.log("数组b：", b);
// 交集
let intersect = $(a).filter(b).toArray();
// 差集
let minus = $(a).not(b).toArray();
// 补集
let complement = $(a).not(b).toArray().concat($(b).not(a).toArray());
// 并集
let unionSet = $.unique(a.concat(b));
console.log("a与b的交集：", intersect);
console.log("a与b的差集：", minus);
console.log("a与b的补集：", complement);
console.log("a与b的并集：", unionSet);
```

<Valine></Valine>