## 一、通过nanoid生成唯一的值引发的问题

### 一、需求解释：

下发张数对象是一个动态的对象数组，每个下发张数对象可以增删，每个下发张数对象里面有多个对象。里面的对象也是一个动态数组，可以添加删除。

限制：所有的下发张数对象的（申请人）不可以重复选择。（不可重复限制比较复杂）。



提交后，清空申请人和临时保存申请的值

再次打开的时候，每张单据的唯一生成的nanoid变为了undefined，为什么会出现这种情况。

```js
// 数据结构
formSendBill: { // 添加单据对象
    documentsType: 'application',
    otherType: 'within3days',
    // 下发张数动态表单对象
     fills: [
      { 
         num: '1', 
         sheetid: nanoid(),  // 通过nanoid拿到唯一的哈希值
         filledBy: []
      }
     ],
},
// 提交代码
// 下发单据-打开下发单据时，清空申请人临时数组和表单对象数组
mixiusendBill() {
    this.formSendBill.fills.forEach(ele => ele.filledBy = [])
    this.tempfilledBys = []
},

```

![image-20211128142454847](@alias/image-20211128142454847.png)



### 二、子组件通过监听prop修改元素变化；子组件更改元素，再次打开子组件，监听父组件元素不生效的问题

打开修改页，监听函数执行。

打开用户选择器，删除元素时，点击取消，再次返回，监听不执行（因为没有操作元素，元素没有变化），但是我没有点击确定。所以再次打开的时候，应该选中修改页中已保存的元素。但是又因为监听函数已经不执行了，所以组件的元素没有再次更新。

```js
// 计算属性监听props
computed: {
    ccUserData() {
      return JSON.parse(JSON.stringify(this.ccUserChange))
    }
},
    
watch: {
    ccUserData: {
      handler(newVal,oldVal) {
        console.log("12131231",newVal);
        let ccUser = JSON.parse(JSON.stringify(newVal))
        this.userSelected = ccUser.map(item => {
          return {
            id: item.ccId,
            name: item.ccBy
          }
        })
        // 更改_checked值，给选中加颜色
        let userId = ccUser.map(ele => ele.ccId)
        this.userList.forEach(ele => {
          if(userId.includes(ele.id)) {
            ele._checked = true
          } else {
            ele._checked = false
          }
        })
        this.tablekey++
      },
      deep: true
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
