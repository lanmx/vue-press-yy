<template>
  <div class="content">{{ nowTime }}</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// 时钟
let nowTime = ref('')
onMounted(() =>{
  getNowTime();
})
const getNowTime = () => {
  let newDate = new Date()
  let weekday = new Array(7)
  weekday[0] = '星期日'
  weekday[1] = '星期一'
  weekday[2] = '星期二'
  weekday[3] = '星期三'
  weekday[4] = '星期四'
  weekday[5] = '星期五'
  weekday[6] = '星期六'
  let year = newDate.getFullYear()
  let month = fixInt(newDate.getMonth() + 1, 2)
  let date = fixInt(newDate.getDate(), 2)
  let day = weekday[newDate.getDay()]
  let hour = fixInt(newDate.getHours(), 2)
  let minutes = fixInt(newDate.getMinutes(), 2)
  let seconds = fixInt(newDate.getSeconds(), 2)
  nowTime.value = year + '/' + month + '/' + date + ' ' + day + ' ' + hour + ':' + minutes + ':' + seconds
}
setInterval(getNowTime, 1000)
/**
 * 03 一位小数显示n位,例如1显示01
 * @param {Number} num 传入需要处理的数
 * @param {Number} length 显示的位数
 */
 const fixInt = (num: number, length: number) => {
  if(length < 0) throw console.error('Parameter length must be greater than 0');
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
</script>
<style scoped>
.content {
    text-align: right;
    padding: 15px 0;
}
</style>