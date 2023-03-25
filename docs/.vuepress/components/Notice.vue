<template>
  <div class="content">
    <el-button type="success" @click="dialogVisible = true">加入我们</el-button> &nbsp; QQ群：743092907
    <el-dialog
      v-model="dialogVisible"
      title="QQ群：743092907"
      width="auto"
      align-center
    >
      <div class="pic">
        <img src='@alias/qq.jpg' />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.pic {
  text-align: center;
}
.content {
  padding: 10px 0;
}
</style>