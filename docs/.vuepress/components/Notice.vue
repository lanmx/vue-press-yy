<template>
  <el-button type="success" @click="dialogVisible = true">加入我们</el-button>  QQ群：743092907
  <el-dialog
    v-model="dialogVisible"
    title="QQ群：743092907"
    width="30%"
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
</style>