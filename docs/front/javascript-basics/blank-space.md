## 1. parseInt()取整

弃掉小数部分，保留整数部分

```js
parseInt(3.141592654) // 3
```

## 2. ceil()向上取整

```js
Math.ceil(3.141592654) // 4
```

## 3. floor向下取整

```js
Math.floor(3.141592654) // 3
```

## 4. round()四舍五入

## 5. js去掉前后空格
```js
parseInt(3.141592654) // 3
```
```js
var strr="    1 ad dertasdf sdfASDFDF DFG SDFG    "
    //  type 1-所有空格，2-前后空格，3-前空格，4-后空格

function trim(str,type){
    switch (type){
        case 1:return str.replace(/\s+/g,"");
        case 2:return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:return str.replace(/(^\s*)/g, "");
        case 4:return str.replace(/(\s*$)/g, "");
        default:return str;
    }
}
console.log( trim(strr,1))      //  "1addertasdfsdfASDFDFDFGSDFG"

//  如只需要去除前后空格，可直接使用js的trim()方法：
let str = "  abcd  ";
str.trim()  // "abcd"
```
<ClientOnly>
  <Valine></Valine>
</ClientOnly>