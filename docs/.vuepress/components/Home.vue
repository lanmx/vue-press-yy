<template>
  <div class="home-bg">
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup(props, context) {
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {

    }
  },

  onMounted() {
  },
  
}
</script>
<style lang="less" scoped>
.home-bg {
  width: 100%;
  height: 100%;
}
</style>