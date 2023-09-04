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
      <div class="label-item">
        <div class="num">{{ total }}</div>
        <div class="text">阅读</div>
      </div>
      <div class="label-item">
        <div class="num">{{ like }}</div>
        <div class="text">点赞</div>
      </div>
    </div>
    <div class="nav-box">
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch  } from 'vue'
import { getArticle } from '../api/article'
import formatjs from '../../utils/format'
const number = __ARTICLE__['number']
const label = __MENU__['all'].length
const total = ref(0);
const like = ref(0)
const getArticleFn = () => {
  getArticle().then(res => {
    console.log(res);
    const readCount = res.data.reduce((pre, cur) => {
      return pre + cur.read_count
    }, 0)
    const likeCount = res.data.reduce((pre, cur) => {
      return pre + cur.good
    },0)
    total.value = formatjs.transNumberToShort(readCount);
    like.value = formatjs.transNumberToShort(likeCount);
  }).catch((err) => {
    console.log(err);
  })
}
onBeforeMount(() => {
  getArticleFn();
})
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