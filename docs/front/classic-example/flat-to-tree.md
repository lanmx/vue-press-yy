## 将一位数组转换为树形结构

https://juejin.cn/post/6983904373508145189

### 方法一：递归查找children，数组必须按级别顺序排序

```js
// pid是父级id, pid为0表示为根节点
let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 2 },
    { id: 7, name: '部门7', pid: 6 },
    { id: 8, name: '部门7', pid: 0 },
]
/**
* @param arr: 扁平数组
*/
// 缺点： 数组必须按照顺序排序，否则会忽视前面的child
function getTree(arr) {
    let newArr = []
    arr.forEach((item,index) => {
        console.log(item)
        if(item.pid === 0) {
            newArr.push(item)
        } else {
            flat(newArr, item, index)
        }
    })
    return newArr
}
// 遍历每个children, 判断children是否有children
function flat(newArr,item,index) {
    newArr.forEach(ele => {
        !ele.hasOwnProperty('children') && (ele.children = [])
        ele.id === item.pid && ele.children.push(item)
        ele.children.length > 0 && flat(ele.children,item,index) 
    })
}
//
console.log(getTree(arr))
```

### 方法二：递归查找，必须知道根节点的pid

```js
let flatArr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 2 },
    { id: 7, name: '部门7', pid: 6 },
    { id: 8, name: '部门7', pid: 0 },
  ]
/**
 * @param flatArr: 扁平结构
 * @param pid: 根节点
*/
const toTree = (flatArr, pid) => {
  let result = []
  getChildren(flatArr, result, pid)
  return result
}
// 获取每个节点的children, 从根节点开始找
// 缺点，必须知道根节点的pid，最高层的pid, 否则会忽略前面的结构
const getChildren = (flatArr, result, pid) => {
  for(const item of flatArr) {
    if(item.pid === pid) {
      const newItem = {...item, children: []}
      result.push(newItem)
      getChildren(flatArr, newItem.children, item.id)
    }
  }
}
console.log(toTree(flatArr, 0))
```

### 方法三：map结构映射，不必按照顺序排序，一次循环即可，性能最优

```js
  let flatArr = [
    { id: 9, name: '部门1', pid: 8 },
    { id: 1, name: '部门1', pid: 0 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 2 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 8, name: '部门7', pid: 0 },
    { id: 7, name: '部门7', pid: 6 },
  ]
  console.log(toTree(flatArr))
  function toTree(items) {
    let result = []
    let itemMap = {}
    for(const item of items) {
      let id = item.id
      let pid = item.pid
      if(!itemMap[id]) {
        itemMap[id] = { children: [] }
      }
      itemMap[id] = { ...item, children: itemMap[id]['children']}
      let treeItem = itemMap[id]
      
      if(pid === 0) {
        result.push(treeItem)
      } else {
        if(!itemMap[pid]) { itemMap[pid] = { children: [] } }
        itemMap[pid].children.push(treeItem)
      }
    }
    return result
  }
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>


