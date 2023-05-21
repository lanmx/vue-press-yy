## 动态增删表单-多层嵌套数组

### 一、需求解释：

单据是一个动态的对象数组，每个单据可以增删，每个单据里面有多个对象。里面的对象也是一个动态数组，可以添加删除。

限制：所有的单据的对象数组（申请人）不可以重复选择。（不可重复限制比较复杂）

1. 删除/添加申请人

   （1）临时id数组申请人的删除/添加

   （2）this对象的申请人删除/删除

2. 删除表单

   （1）临时id数组的删除（删除此表单的id数组的每个id）

   （2）this对象的表单赋值为空数组

3. 所有表单不可以重复选择申请人

   （1）当前已选择的数组和已选择的临时id数组取差集判断

### 二、定义数据结构：

```js
data() {
    return {
      formSendBill: { // 添加单据对象
        documentsType: 'application',
        otherType: 'within3days',
        // 下发张数动态表单对象数组
        fills: [
            { 
              num: '1', 
              sheetid: nanoid(),  // 通过nanoid拿到唯一的哈希值
              filledBy: []  // 对象数组
            }
        ],
      },
        
      // 当前单据sheetid的nanoid
      currentSheetid: '',
      // 临时保存已选择用户
      tempfilledBys: [],
      // 下发张数动态控制按钮显隐
      addModel: false,
      delModel: false,
    }
}
```

![image-20211125223117151](@alias/image-20211125223117151.png)



### 三、通过nanoid生成唯一的值引发的问题：

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

### 四、代码

由于涉及到多个页面，于是用了mixins混入：

```js
// ----- 这是请假、加班、调休、外出的下发单据：动态增删下发张数单据的混入 ----- 
import { nanoid } from 'nanoid'

const attendanceMixin = {
  data() {
    return {
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
      // 当前sheetid的nanoid
      currentSheetid: '',
      // 临时保存已选择用户
      tempfilledBys: [],
      // 下发张数动态控制按钮显隐
      addModel: false,
      delModel: false,
      issueTableKey: 1
    }
  },
  methods: {
    // 下发单据-选择用户
    mixingetUser(getUser, cancel) {
      if(cancel === 'close') {
        this.userModal = false
        return false
      }

      // 下发单据-下发张数的申请人是否重复校验
      if(this.userStatus === 'form') {
        let getUserId = [];
        getUserId = getUser.map(item => item.id)
        //交集
        let intersect = getUserId.filter(v => this.tempfilledBys.includes(v))
        if( intersect.length > 0 ) {
          this.$Message.warning("请勿重复选择！")
          return false
        }
      }
      return true
    },
    // 把数组push进对象
    mixinfilledby(params) {
       this.formSendBill.fills.forEach(ele => {
          if(ele.sheetid === this.currentSheetid) {
            ele.filledBy.push(params)
            this.tempfilledBys.push(params.filledId)
          }
        })
      console.log(this.tempfilledBys,"临时保存的数组");
    },
    // 下发单据-提交：用户校验、传参
    mixinSubmit(name) {
       this.$refs[name].validate((valid) => {
        if (valid) {
          let eachfilledBys = false
          this.formSendBill.fills.forEach(item => {
            if(item.filledBy.length === 0) {
              eachfilledBys = true
            }
          })
          if(eachfilledBys) {
            this.$Message.info("请选择申请人！")
            return false
          }
          // 过滤每个单据fills的唯一哈希值，不作传参
          // map数组用于传参
          this.formSendBill.fills.forEach(ele => {
            ele.sheetid = undefined
            ele.filledBy = ele.filledBy.map(element => {
              return {
                 filledId: element.filledId,
                 filledBy: element.filledBy
              }
            })
          })
        }
        })
        return true
    },
    // 下发单据-打开下发单据时，清空申请人临时数组和表单对象数组
    mixiusendBill() {
      this.formSendBill.fills.forEach(ele => ele.filledBy = [])
      this.tempfilledBys = []
    },
    
    // 打开用户选择器，标识是哪一张下发单据
    mixinselectUser(nanoid) {
      this.currentSheetid = nanoid
    },

    // 删除申请人
    mixindeleteApply(id) {
      console.log("删除",id);
      this.issueTableKey++
      this.formSendBill.fills.forEach(element => {
        console.log(9999999988098,element);
        let itemUserList = element.filledBy.filter(ele => {
          return id !== ele.filledId
        })
        element.filledBy = itemUserList
        console.log(itemUserList,"赋值的数据");
      })
      console.log(this.formSendBill.fills);
      console.log(this.tempfilledBys);
      // 过滤删除的的值
      this.tempfilledBys = this.tempfilledBys.filter(ele => {
          return ele !== id
      })
    },
    // 添加下发张数
    addSheets() {
      let length = this.formSendBill.fills.length
      if(length < 3) {
        this.formSendBill.fills.push({
          filledBy: [],
          sheetid: nanoid(),
          num: "1"
        })
        this.delModel = true
      }
      length === 2 && (this.addModel = true)
    },
    // 删除下发张数
    deleteSheet(nanoid) {
      let length = this.formSendBill.fills.length
      if( length > 1 ) {
         // 删除该fills临时保存的值
        this.formSendBill.fills.forEach(item => {
          if(item.sheetid === nanoid) {
            let delId = item.filledBy.map(val => val.filledId)
            this.tempfilledBys = this.tempfilledBys.filter(element => {
              return !delId.includes(element)
            })
          }
        })
        // 删除该fills已选择的值
        this.formSendBill.fills = this.formSendBill.fills.filter((ele) => {
          return ele.sheetid !== nanoid
        })
        this.addModel = false
      }
      length === 2 && ( this.delModel = false )
      
    },

  }
}

export {
  attendanceMixin
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>