## 树形对象数组转换为一维数组

![image-20220206104006313](@alias/image-20220206104006313.png)

把改数组的所有叶子节点找出来，不需要父亲的节点

```js
flatTree: [] // 先定义flatTree为空数组，扁平后的数组保存在flatTree
// Arr是我需要传进来的多维对象数组，第二个参数是用来判断有没有children
flatTreeFunc(Arr, childName='children'){
  // 如果传进来的数据不是数组类型，我强制转换维数组类型
  if(!Array.isArray(Arr)) {
      this.flatTree.push(Arr.value)
      return []
  }
  Arr.forEach(item => item[childName]?.length ? this.flatTreeFunc(item[childName]) : this.flatTree.push(item.value))
  // 上行代码等价于：
  // data.forEach(item => {
  //   if(item[childName]){
  //     if (item[childName].length) {
  //       this.flatTreeFunc(item[childName])
  //     }
  //   } else {
  //     this.flatTree.push(item.value)
  //   }
  // })
 }
}
```

其它办法

```js
// 拿到部门树形对象数组
deptTreeArr(data) {
    let newArr = []
    data.map(item => {
        let Data = {}
        Data.value = item.id
        Data.label = item.deptname
        if (item.children) {
            Data.children = this.deptTreeArr(item.children)
        }
        newArr.push(Data)
    })
    return newArr
},
// 把部门树形对象数组转换为一维数组
deptFlatArr(arr) {
   return arr.reduce((pre,cur)=> {
       cur.children ? this.deptFlatArr(cur.children) : this.flatTree.push(cur.value)
   },[])
},
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
