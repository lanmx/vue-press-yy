---
title: 冒泡，选择，快速选择排序
description: 三种排序方法：冒泡，选择，快速选择
meta:
  - name: keywords
    content: 冒泡 选择 快速选择 排序
---
## 冒泡排序 O(n2)
```js
function bubblingSort() {
  let arr = [9,5,8,0,3,6]
  for(let j=0 ; j < arr.length; j++) {
    for(let i=0; i < arr.length - j; i++) {
      if(arr[i] > arr[i+1]) {
        let temp = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = temp
      }
      console.log(i,j,arr);
    }
  }
}
```

## 快速选择排序 (二分法)
```js
function quickSort(arr) {
  if(arr.length <= 1) return arr
  let midIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(midIndex,1)
  let left = []
  let right = []
  for(let i=0; i<arr.length; i++) {
    if(arr[i]<pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  console.log(left,pivot,right)
  return quickSort(left).concat(pivot, quickSort(right))
}
```

## 选择排序O(n2)
```js
function selectSort(arr) {
  for(let i=0; i<arr.length-1; i++){
    console.log(i);
    let min = i
    for(let j=min+1; j<arr.length; j++) {
      if(arr[min]>arr[j]) {
        min = j
      }
    }
    let temp = arr[min]
    arr[min] = arr[i]
    arr[i] = temp
  }
  return arr
}
console.log(selectSort([3,4,7,2,9,1]));
```