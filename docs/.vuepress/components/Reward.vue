<template>
  <div class="content">
    <p>坚持原创技术分享，您的支持将鼓励我继续创作！</p>
    <el-button type="danger" @click="open">打赏</el-button>
    <div v-show="visible" class="box">
      <div class="box-e">
        <div>
          <img src='@alias/支付宝二维码.jpg'/>
        </div>
        支付宝
      </div>
      <div class="box-e">
        <div>
          <img src='@alias/微信二维码.jpg' />
        </div>
        微信
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const visible = ref(false)
const open = () => {
  visible.value = !visible.value
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.content {
  padding: 10px 0;
}
.box {
  width: 100%;
  display: flex;
  text-align: center;
}
img {
  width: 240px;
  height: auto;
}
.box-e {
  padding-right: 10px;
  padding-top: 15px;
}
</style>