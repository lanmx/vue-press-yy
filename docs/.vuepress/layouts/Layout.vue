<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import Info from '../components/Info.vue'
const foo = __FOO__
</script>

<template>
  <ParentLayout>
    <!-- 默认主题插槽：
      navbar
      navbar-before
      navbar-after
      sidebar
      sidebar-top
      sidebar-bottom
      page
      page-top
      page-bottom
      page-content-top
      page-content-bottom
     -->
    <!-- <template #sidebar-bottom>
      <Info></Info>
    </template> -->
    <!-- <template #navbar-before>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓 {{ foo }}
    </template>
    <template #navbar-after>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template>
    <template #sidebar-top>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template>
    <template #page-content-top>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template>
    <template #page-content-bottom>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template> -->
    <template #page-bottom>
      <div class="my-footer">
        <div class="tips">
          <p>MIT Licensed | Copyright © 2018-2023 蓝敏晓</p>
          <a href="https://beian.miit.gov.cn" target="_blank">备案号：粤ICP备2023024899号-1</a> 
        </div>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
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