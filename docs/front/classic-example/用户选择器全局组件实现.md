## 用户选择器全局组件实现

### 1. 注意的点

1. 子组件的mounted() {}只渲染第一次。
2. 通过computed给监听model弹窗打开，再通过watch监听方法给组件重新赋值。

### 2. 组件代码

```js
<!--
 * @Author: your name
 * @Date: 2021-11-16 14:00:16
 * @LastEditTime: 2021-11-17 17:42:48
 * @LastEditors: Please set LastEditors
 * @Description: 这是考勤抄送的用户选择器
 * @FilePath: \langding.fandow.comd:\fd\hrmper\hrm.fandow.com\components\user-search.vue
-->
<template>
<!-- 这是考勤抄送的用户选择器 -->
  <div id="user">
    <Modal
        v-model="userOpenModal"
        title="选择用户"
        width="700px"
        :highlight-row="true"
        @on-ok="ccgetUser"
        @on-cancel="modalCancal">
        <div class="user-content">
          <div class="user-input">
           <Input search placeholder="请输入姓名搜索" clearable @on-change="queryUserDebounce" v-model="searchQuery" />
          </div>
          <div class="user-table">
            <Table ref="selection" height="300" 
                :columns="jobColumns" 
                :data="userList" 
                :show-header="false" 
                :row-class-name="classChange"
                @on-selection-change="selectedRow"
                @on-select-cancel="selectCancel"
                :key="tablekey"
                :loading="spinShow"
                >
                
            </Table>

          </div>
          <div class="user-selected">
            <span v-for="(item) in userSelected" :key="item.id" :value="item.id" class="selected-name">
              {{ item.name }}
              <Icon type="md-close-circle" :size="20" class="selected-icon" @click="selectedNameCancel(item.id)"/>
            </span>
          </div>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    ccUserChange: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      spinShow: false,
      userOpenModal:false,
      jobColumns: [ // 列表表头
          { type: 'selection', width: 35, align: 'center', },
          { title: '姓名', minWidth: 100, key: 'name', },
          { title: '工号', minWidth: 100, key: 'jobNum', },
          { title: '岗位', minWidth: 120, key: 'station',},
          { title: '部门', minWidth: 200, key: 'deptName', }
        ],
      userList: [], // 列表数据
      userSelected: [],  // 已选择的用户
      tablekey: 0, // 用于渲染DOM
      queryUserDebounce: this.$debounce(this.queryUser, 500),  // 防抖
      searchQuery: '', // 搜索参数，模糊搜索
    }
  },
  computed: {
    ccUserModel() {
      return this.userOpenModal
    }
  },
  watch: {
    ccUserModel: {
      handler(newVal,oldVal) {
        let ccUserChange = JSON.parse(JSON.stringify(this.ccUserChange))
        this.userSelected = ccUserChange.map(item => {
          return {
            id: item.ccId,
            name: item.ccBy
          }
        })
        // 更改_checked值，给选中加颜色
        let userId = ccUserChange.map(ele => ele.ccId)
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
    },
  },
  methods: {
    // 模糊搜索用户
    queryUser() {
      let params = {
        type: 'all',
        page: 1,
        perPage: 100,
        name: this.searchQuery
      }
      if(!(params.name.trim())) return
      this.spinShow = true
      this.$API.searchUserCc(params).then((res) => {
        let userIdSelected = this.userSelected.map(item => item.id)
        res.data.list.forEach(ele => {
          if(userIdSelected.includes(ele.id)) {
            ele._checked = true
          } else {
            ele._checked = false
          }
        })
        this.userList = res.data.list
        this.spinShow = false
      }).catch((err) => {
        console.log(err);
        this.spinShow = false
      })
    },

    // 关闭弹窗
    modalCancal() {
      this.userOpenModal = false
    },

    // table选中改变背景颜色
    classChange(row,index) {
      if(this.userList[index]._checked) return 'selected-color'
    },

    // table选中
    selectedRow(selection) {
      console.log(selection);
      // 已选择的用户id
      let selected = this.userSelected.map(ele => ele.id)
      // 如果当前选择的数据不是已选择的，则把该数据放进去已选择的数组里
      selection.forEach(v => {
        if(!selected.includes(v.id)) {
          this.userSelected.push(v)
        }
      })
      // 同时更改_checked值，给选中加颜色
      let userIdSelected = this.userSelected.map(item => item.id)
      this.userList.forEach(ele => {
        if(userIdSelected.includes(ele.id)) {
          ele._checked = true
        } else {
          ele._checked = false
        }
      })
    },
    // table取消
    selectCancel(selection,row) {
      this.cancelDel(row.id)
    },
    // icon删除选中
    selectedNameCancel(id) {
      this.cancelDel(id)
    },
    // 此函数用的比较多，抽离出来调用, (过滤列表的值，并修改颜色)
    cancelDel(id) {
      // 只能传入每一行数据的id
      this.userSelected = this.userSelected.filter(ele => ele.id !== id)
      // 表格选中颜色
      this.userList.forEach(ele => {
        if(ele.id === id) {
          ele._checked = false
        }
      })
      // 渲染DOM
      this.tablekey++
    },

    // 确定
    ccgetUser() {
      this.$emit('ccgetUser',this.userSelected)
    },
  }
}
</script>

<style lang="less" scoped>
/deep/.ivu-modal-body {
  background-color: #f2f2f2;
}
/deep/.ivu-modal-header {
  line-height: 3.7;
  height: 70px
}
.user-content {
  margin: 0px 20px 25px 20px;

  .user-input {
    padding: 0 0 8px 0;
  }
  .user-table /deep/ .ivu-table td {
    padding: 3px 0;
    border-bottom: none;
  }

  // 给选中的背景加样式，用过ivew组件的classChange函数控制
  .user-table /deep/ .ivu-table-body .selected-color {
    td {
      background-color: #e6f7ff !important;
    }
  }
  
  // 已选中icon的div
  .user-selected {
    width: 100%;
    min-height: 75px;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

     .selected-name {
       margin: 10px;
       padding: 10px 6px 10px 26px;
       background-color: #ebebeb;
       border-radius: 10%;
       display: block;
       text-align: center;
     }

     .selected-icon {
        position: relative;
        cursor: pointer;
        left: 16px;
        top: -19px;
     }
  }
}
</style>
```

### 3. 效果图

![image-20211127154254907](@alias/image-20211127154254907.png)


<ClientOnly>
  <Valine></Valine>
</ClientOnly>