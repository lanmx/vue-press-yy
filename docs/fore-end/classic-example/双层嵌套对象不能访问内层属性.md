## 双层嵌套对象不能访问内层属性

这个是因为外层属性还没渲染，所以访问内存属性会undefined，给该dom包一层div，用v-if属性判断外层属性是否存在就可以了。

```html
<div class="detail-bz">
<!-- 写两个步骤条，是为了解决v-if隐藏经理审核，而导致Step数组顺序改变的问题 -->
<!-- 外层单独包div，v-if是为解决访问stepStatus[currentStatus].count出现undefined的问题 -->
<div v-if="stepStatus[currentStatus]">  
    <Steps :current="stepStatus[currentStatus].count" :status="stepStatus[currentStatus].status" v-if="managerTitleShow">
      <Step title="下发单据" />
      <Step title="填写单据" />
      <Step title="上级审核" />
      <Step title="经理审核" />
      <Step title="人事复核" />
    </Steps>
</div>
<div v-if="stepStatus[currentStatus]">
  <Steps :current="stepStatus[currentStatus].count" :status="stepStatus[currentStatus].status" v-if="!managerTitleShow">
    <Step title="下发单据" />
    <Step title="填写单据" />
    <Step title="上级审核" />
    <Step title="人事复核" />
  </Steps>
</div>
</div>
```


```html
<div class="detail-bz">
<!-- 写两个步骤条，是为了解决v-if隐藏经理审核，而导致Step数组顺序改变的问题 -->
<!-- 外层单独包div，v-if是为解决访问stepStatus[currentStatus].count出现undefined的问题 -->
<div v-if="stepStatus[currentStatus]">  
    <Steps :current="stepStatus[currentStatus].count" :status="stepStatus[currentStatus].status" v-if="managerTitleShow">
      <Step title="下发单据" />
      <Step title="填写单据" />
      <Step title="上级审核" />
      <Step title="经理审核" />
      <Step title="人事复核" />
    </Steps>
</div>
<div v-if="stepStatus[currentStatus]">
  <Steps :current="stepStatus[currentStatus].count" :status="stepStatus[currentStatus].status" v-if="!managerTitleShow">
    <Step title="下发单据" />
    <Step title="填写单据" />
    <Step title="上级审核" />
    <Step title="人事复核" />
  </Steps>
</div>
</div>
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>