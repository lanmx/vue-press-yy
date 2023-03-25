## hrm需求案例：三层嵌套异步需求案例

函数异步请求里嵌套着一个await，await要求是一个promise，所以await this.getJobType()返回的要求是一个promise，才可以异步

```js
// 岗位类型列表
getJobType() {
  return new Promise((resolve, reject) => {
    this.$API.deptJobType().then(res => {
      if(res.code === 0) {
        this.jobType = res.data.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        resolve()
      }
    }).catch(err => {
      reject()
      this.$Notice.warning({ title: "错误", desc: "获取岗位列表失败!"})
    })
  })
},

    
// 属性类型选择
async selectType(val,index) {
  this.centerShow(index);
  if(!val) {
    this.proObject[index].property = []
    this.proObject[index].option = { value : [] }
    return false
  }
  // 获取中心部门数据
  if(val.value === 'deptCenter') {
    this.deptCenter = JSON.parse(JSON.stringify(this.department)).map(item => {
      return {
        value: item.value,
        label: item.label,
      }
    })
  }
  // 接口请求为异步
  val.value === 'jobType' && await this.getJobType()
  val.value === 'officeLocation' && await this.getOffice()
  this.proObject[index].type = val
  this.proObject[index].property = JSON.parse(JSON.stringify(this[val.value]))
  this.centerShow(index);
},
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

