<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import MusicBtn from '../components/MusicBtn.vue'
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
    <template #sidebar-top>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template>
    <template #page-content-top>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template>
    <template #page-content-bottom>
      蓝敏晓蓝敏晓蓝敏晓蓝敏晓
    </template> -->
    <template #navbar-after>
      <MusicBtn />
    </template>
    <template #page-bottom>
      <div class="my-footer">
        <div class="tips">
          <p>MIT Licensed | Copyright © 2023-2025 蓝敏晓</p>
          <a href="https://beian.miit.gov.cn" target="_blank">备案号：粤ICP备2023024899号-1</a> 
        </div>
      </div>
    </template>
  </ParentLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  created() {
    var siteUrl = this.$site.themeConfig.domain;      
    if (typeof this.$ssrContext !== "undefined") {    
      var pageTitle = this.$page.title ? this.$page.title.toString().replace(/["|'|\\]/g, '') : null;
      var imageUrl = this.$page.frontmatter.image ? this.$page.frontmatter.image : 'https://cdn.jsdelivr.net/gh/dbdgs/images@main/dabai.jpg';
      var siteName = this.$site.title || null;
      var publishedTime = dayjs(this.$page.frontmatter.date).toISOString() || dayjs(this.$page.lastUpdated).toISOString() || moment().toISOString();
      var modifiedTime = dayjs(this.$page.lastUpdated).toISOString() || moment().toISOString();
      var pageUrl = siteUrl + this.$page.path;
      var pageType = this.$page.path.length <= 1 ? 'website' : 'article' ;
      // var author = this.$site.themeConfig.personalInfo ? this.$site.themeConfig.personalInfo : null;    

      const data =
      {
          "@context": "https://schema.org",
          "@graph": [
              {
                  "@type": "ImageObject",
                  "@id": imageUrl,
                  "inLanguage": "zh-CN",
                  "url": imageUrl,
                  "width": 266,
                  "height": 266,
                  "caption": pageTitle + " - " + siteName
              },
              {
                  "@type": "WebPage",
                  "@id": pageUrl,
                  "url": pageUrl,
                  "name": this.$title,
                  "isPartOf": {
                      "@id": siteUrl,
                      "name": siteName
                  },
                  "primaryImageOfPage": {
                      "@id": siteUrl,
                      "name": siteName
                  },
                  "datePublished": publishedTime,
                  "dateModified": modifiedTime,
                  "description": this.$description,
                  "inLanguage": "zh-CN",
                  "potentialAction": [
                      {
                          "@type": "ReadAction",
                          "target": [
                              pageUrl
                          ]
                      }
                  ]
              },
              {
                  "@type": pageType,
                  "@id": pageUrl,
                  "isPartOf": {
                      "@id": pageUrl
                  },
                  "author": {
                      "@id": siteUrl,
                      "name": siteName
                  },
                  "headline": this.$title,
                  "datePublished": publishedTime,
                  "dateModified": modifiedTime,
                  "commentCount": 30,
                  "publisher": {
                      "@id": siteUrl,
                      "name": siteName
                  },
                  "image": {
                      "@id": imageUrl
                  },
                  "articleSection": this.$title,
                  "inLanguage": "zh-CN",
                  "potentialAction": [
                      {
                          "@type": "CommentAction",
                          "name": "Comment",
                          "target": [
                              pageUrl
                          ]
                      }
                  ]
              },
              {
                  "@type": "Person",
                  "@id": siteUrl,
                  "name": siteName
              },
              {
                  "@context": "https://schema.org/",
                  "@type": "Recipe",
                  "name": this.$description,
                  "description": this.$description,
                  "author": {
                      "@type": "Person",
                      "name": siteName
                  },
                  "image": [
                      imageUrl
                  ],
                  "url": pageUrl,
                  "recipeIngredient": [
                      "第1步",
                      "第2步",
                      "第3步",
                      "第4步"
                  ],
                  "recipeInstructions": [
                      {
                          "@type": "HowToStep",
                          "text": "第1步",
                          "url": pageUrl + "#step-1"
                      },
                      {
                          "@type": "HowToStep",
                          "text": "第2步",
                          "url": pageUrl + "#step-2"
                      },
                      {
                          "@type": "HowToStep",
                          "text": "第3步",
                          "url": pageUrl + "#step-3"
                      }
                  ],
                  "datePublished": publishedTime,
                  "@id": pageUrl,
                  "isPartOf": {
                      "@id": siteUrl
                  },
                  "mainEntityOfPage": siteUrl
              }
          ]
      };

      //creating the script element and storing the JSON-LD
      var my_jsonld = '\n<script type="application/ld+json">\n' + JSON.stringify(data, null, 2) + "\n<\/script>\n";
      this.$ssrContext.userHeadTags += my_jsonld;
    }
  }
})
</script>

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