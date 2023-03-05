<template>
  <div class="content">
    <div @click="goSmallPro()">炫酷满天星</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const list = ref([{ title: 'Foo', id: '1' }, { title: 'Bar',id: '2' }])
const goSmallPro = async () => {
  console.log(111);
  router.push("after");
};
</script>
<style scoped>
.content {
  width: 100%;
  /* margin: auto; */
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

}
</style>