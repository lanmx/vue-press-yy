<template>
  <div>
    <div class="footer-nav">
      <div class="left">
        <div class="title">嘟嘟在蓝色海底的技术博客</div>
        <div class="l-text">
          相信有些伙伴和我一样, 使用markdown作为日常记录学习笔记和工作笔记, 
          但是文档存放电脑的地址改变了，导致图片识别不了，
          因此基于vuepress做了个文档仓库。
        </div>
        <p>网站日常记录和分享技术。（所有权归作者所有）</p>
      </div>
      <div class="right">
        <div class="title">推荐文章导航</div>
        <div class="r-list">
          <div class="r-item" v-for="item in list" :key="item.text" @click="linkToDoc(item.link)">
            <router-link :to="item.link">{{ item.text }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="line"></div>
  <div class="tips">
    <p>MIT Licensed | Copyright © 2018-2023 蓝敏晓</p>
    <a href="https://beian.miit.gov.cn" target="_blank">备案号：粤ICP备2023024899号-1</a> 
  </div>
</template>
<script setup>
import { ref } from 'vue'
const list = ref([
  { text: '作用域链', link: '/front/javascript/浏览器工作原理和作用域链.md' },
  { text: 'Set Map', link: '/front/javascript/Set Map weakSet weakMap.md' },
  { text: '事件循环', link: '/front/javascript/Promise await async 宏微任务 事件循环.md' },
  { text: '响应式原理', link: '/front/javascript/Proxy Reflect vue2 vue3响应式原理.md' },
  { text: '手写双向绑定原理', link: '/front/vue/手写双向绑定原理.md' },
  { text: 'this', link: '/front/javascript/this call apply 箭头函数.md' },
  { text: '原型链', link: '/front/javascript/面向对象 构造函数 原型链 继承.md' },
  { text: 'ES6', link: '/front/javascript/ES6知识点.md' },
  { text: '闭包', link: '/front/javascript/闭包 内存泄漏.md' },
  { text: '内存管理', link: '/front/javascript/内存管理和垃圾回收机制.md' },
  { text: 'Webpack', link: '/front/packer-tool/Webpack.md'  },
  { text: '队列', link: '/back/data-struct/队列.md'  },
  { text: '链表', link: '/back/data-struct/链表.md'  },
  { text: '栈', link: '/back/data-struct/栈.md'  },
  { text: 'nodejs', link: '/back/nodejs/nodejs基础.md'  },
])
const linkToDoc = () => {
  // console.log(this.$router);
}
</script>
<style scoped>
.footer-nav {
  border-top: 1px solid var(--c-border);
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  color: #4e6e8e;
  font-size: 14px;
  padding-top: 15px;
}
.title {
  font-weight: bold;
  line-height: 30px;
}
.left {
  width: 54%;
  padding-right: 15px;
}
.right {
  width: 38%;
  padding-right: 5px;
  padding-left: 5px;
}
.l-text {
    line-height: 22px;
}
.r-list {
    display: flex;
    white-space: nowrap;
    flex-wrap: wrap;
}
.r-item {
    margin: 5px 15px 2px 0;
    cursor: pointer;
}
.r-item:hover {
  color: rgb(50, 142, 223)
}
.tips {
    padding: 1.5rem;
    padding-bottom: 2.5rem;
    text-align: center;
    color: #4e6e8e;
    font-size: 14px;
}
a {
    color: #4e6e8e;
}
a:hover {
  color: rgb(50, 142, 223)
}
</style>