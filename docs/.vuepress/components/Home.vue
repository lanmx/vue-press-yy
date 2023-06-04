<template>
  <div>
    ccccccccccc
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'

export default {
  props: {
    cate: String
  },
  components:{
    Article
  },
  setup(props, context) {
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {

    }
  },

  mounted() {
  },
  
}
</script>
<style lang="less" scoped>
</style>