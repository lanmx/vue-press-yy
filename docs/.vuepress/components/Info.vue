<template>
  <div class="info-outer">
    <div class="image">
      <img src="../public/sculpture.png" alt="">
    </div>
    <div class="label">
      <div class="label-item">
        <div class="num">{{ number }}</div>
        <div class="text">文章</div>
      </div>
      <div class="label-item">
        <div class="num">{{ label }}</div>
        <div class="text">标签</div>
      </div>
    </div>
    <div class="nav-box">

    </div>
  </div>
</template>
<script setup>
const number = __ARTICLE__['number']
const label = __MENU__['all'].length
</script>
<style scoped>
.info-outer {
  padding: 15px 0px;
}
.image {
    text-align: center;
}
img {
  max-width: 150px;
  border: 1px solid #eee;
  padding: 2px;
  border-radius: 50%;
  transition: transform 1s ease-out;
}
.label {
  display: flex;
  justify-content: center;
}
.num {
  font-weight: bolder;
  font-size: 1.2rem;
  line-height: 38px;
}
.text {
  font-size: 0.8rem;
  text-align: center;
  color: #566573;
}

.label-item {
    margin-left: 10px;
    margin-right: 10px;
}
</style>