<template>
  <div v-for="item in list" :key="item.id">
    <div class="title">这是自定义的组件 {{ item.title }}</div>
    <div class="info">
      xxx
    </div>
    <div class="content">xxx</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const list = ref([{ title: 'Foo', id: '1' }, { title: 'Bar',id: '2' }])
</script>
<style scoped>
.title {

}
.info {
  display: flex;
}
.content {

}
</style>