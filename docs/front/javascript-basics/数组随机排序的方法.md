# 数组随机排序的方法

## 一、方法一

通过while循环一轮数组，随机index拿到数组的随机数，push进新数组，再把原来的删掉。

```js
// 数组随机排序一
const randSort = function(arr) {
  let newArr = []
  while(arr.length > 0) {
    let randomIndex = parseInt(Math.random() * arr.length)
    newArr.push(arr[randomIndex])
    arr.splice(randomIndex,1)
  }
  return newArr
}
```

## 二、方法二

利用sort排序方法和随机降升序排序，Math.random随机生成一个随机数（0-1），减去0.5；如果随机数是0.6，则0.6-0.5为正数，进行降序排序；反之升序排序

```js
// 数组随机排序二
const randSort1 = function(arr) {
  arr.sort(() => {
    return Math.random() - 0.5
  })
  return arr
}
```

## 三、方法三

一轮循环，通过随机index，拿当前循环的数据和随机生成的index拿到的数据交换，直到循环完成。

```js
// 数组随机排序三
const randSort2 = function(arr) {
  for(let i = 0; i < arr.length ; i++) {
    let rand = parseInt(Math.random() * arr.length)
    let temp = arr[rand]
    arr[rand] = arr[i]
    arr[i] = temp
  }
  return arr
}
```

## 四、算法题实操

给定一个数组，随机抽几个数，直到抽完，再把所有的数放回数组里面，重新抽取

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
</body>
<script>
// 数组随机排序一
const randSort = function(arr) {
  let newArr = []
  while(arr.length > 0) {
    let randomIndex = parseInt(Math.random() * arr.length)
    newArr.push(arr[randomIndex])
    arr.splice(randomIndex,1)
  }
  return newArr
}
// 数组随机排序二
const randSort1 = function(arr) {
  arr.sort(() => {
    return Math.random() - 0.5
  })
  return arr
}
// 数组随机排序三
const randSort2 = function(arr) {
  for(let i = 0; i < arr.length ; i++) {
    let rand = parseInt(Math.random() * arr.length)
    let temp = arr[rand]
    arr[rand] = arr[i]
    arr[i] = temp
  }
  return arr
}

console.log(randSort1([1,2,3,4,5,6]))
console.log(randSort2([1,2,3,4,5,6]))
console.log(randSort([1,2,3,4,5,6]))
/** 
 * @param {number[]} nums
 * @return {function} 
 */
//  给定一个数组，随机抽几个数，直到抽完，再把所有的数放回数组里面
const getRandomFn = function(nums) {
  const all = JSON.parse(JSON.stringify(nums))
    return function(count) {
      if(nums.length === 0) {
        nums = JSON.parse(JSON.stringify(all))
      }
      if(count > nums.length) {
        throw '输入的随机个数不能大于最大个数'
        return
      }
      nums = randSort(nums)
      return nums.splice(0,count)
    }
 }
let random = getRandomFn([1,2,3,4,5,6])
console.log(random(2))
console.log(random(1))
console.log(random(3))
console.log(random(1))
console.log(random(6))


</script>
</html>
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

