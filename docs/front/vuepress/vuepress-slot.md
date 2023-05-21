想要定制化改变vuepress默认主题，使用插槽定制化页面非常实用

```html
<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import Info from '../components/Info.vue'
</script>

<template>
  <ParentLayout>
    <!-- 默认主题插槽：
      navbar 导航栏
      navbar-before
      navbar-after
      sidebar 左侧栏
      sidebar-top
      sidebar-bottom
      page 页面
      page-top
      page-bottom
      page-content-top
      page-content-bottom
     -->
    <template #sidebar-bottom>
      <Info></Info>
    </template>
    <!-- <template #navbar-before>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
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
    <!-- <template #page-bottom>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template> -->
  </ParentLayout>
</template>
```