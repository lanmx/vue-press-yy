<template>
  <div class="article-nav-bar" :class="{'nav-bar-fix': scrollTop > 30 }">
    <!-- 个人信息 -->
    <Info />
    <!-- 文章导航 -->
    <div class="nav-bar-outer">
      <div v-for="item in menu" :key="item.text">
        <div class="nav-item"
          :class="{ 'nav-item-active': item.name === curCate }"
          @click="goPage(item)">
          <p>{{ item.name }}</p>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, onMounted, provide, getCurrentInstance } from 'vue'
// import { 
//   usePageData,
//   usePageFrontmatter,
//   useSiteData,
//   useSiteLocaleData,
//   usePageHead,
//   usePageHeadTitle,
//   usePageLang,
//   useRouteLocale,
// } from "@vuepress/client";
import Info from '../components/Info.vue'


export default {
  props: {
    cate: String
  },
  components:{
    Info
  },
  setup(props, context) {

    const cate = props.cate;
    const menu = __MENU__[cate];

    // 文档菜单目录和标题名称的映射
    const menuMap = {
      'javascript-basics': 'JavaScript基础',
      'javascript': '高级JavaScript教程',
      'vue': 'Vue',
      'angular': 'Angular',
      'classic-example': '经典例子',
      'html-css': 'HTML CSS',
      'mobile-terminal': '移动端',
      'packer-tool': '打包工具',
      'vuepress': 'vuePress',
      'data-struct': '数据结构与算法',
      'computer-basics': '计算机基础',
      'nodejs': 'Nodejs',
      'git': 'Git',
      'interview': '前端面试集合',
      'work': '工作笔记',
    };

    // 初始化菜单
    const getMenu = () => {
      if (menu) {
        menu.forEach(m => {
          m.name = menuMap[m.text]
        })
        // console.log(menu);
      }
    }
    onBeforeMount(() => {
      getMenu();
    })
    const scrollTop = ref(0);
    const scrollToTop = () => { 
      scrollTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    };

    const curCate = ref('')
    const instance = getCurrentInstance();
    // 文章跳转
    const goPage = (item) => {
      curCate.value = item.name;
      instance?.proxy?.$Bus.emit('getCurCate', item)
    }

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      scrollTop,
      menuMap,
      menu,
      curCate,
      goPage,
      scrollToTop,
    }
  },

  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
    // console.log('usePageData', usePageData().value,
    //   'usePageFrontmatter', usePageFrontmatter().value,
    //   'useSiteData', useSiteData().value,
    //   'useSiteLocaleData', useSiteLocaleData().value,
    //   'usePageHead', usePageHead().value,
    //   'usePageHeadTitle', usePageHeadTitle().value,
    //   'usePageLang', usePageLang().value,
    //   'useRouteLocale', useRouteLocale().value,
    //   'menu', this.menu);
  },
  
  beforeRouteLeave(to, form, next){
    window.removeEventListener('scroll', this.scrollToTop);
    next();
  }
}
</script>
<style lang="less" scoped>
.article-nav-bar {
  position: absolute;
  right: 20px;
  top: 100px;
  width: 240px;
  max-height: 60%;
  overflow-y: auto;
  border-left: 1px solid var(--c-border);
  padding: 10px 15px;
  
}
.nav-bar-fix {
  position: fixed !important;
  top: 70px !important;
}
.nav-item {
  cursor: pointer;
}
.nav-item:hover {
  color: #42b983;
  text-decoration: none;
  &::before{
    content:'';
    display: block;
    width: 5px;
    height: 5px;
    background:#42b983;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 6px;
    float: left;
    margin-top: 13px;
  }
}
.nav-item-active {
  color: #42b983;
  text-decoration: none;
  &::before{
    content:'';
    display: block;
    width: 5px;
    height: 5px;
    background:#42b983;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 6px;
    float: left;
    margin-top: 13px;
  }
}

.article-nav-bar::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等*/
  width: 8px;
  // height:10px;
  // display: none;
}
.article-nav-bar::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
  background:#f5f7fa;
}
.article-nav-bar::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分）*/
  background:#f5f7fa;
}
.article-nav-bar::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分*/
  background: #00000033;
  border-radius:4px;
}
.article-nav-bar::-webkit-scrollbar-corner {/*边角*/
  background: #c0c0c0;
}
.music-button {
  position: fixed;
  right: 0px;
  bottom: 90px;
  width: 110px;
  background-color: #6b6c6d;
  height: 60px;
  border-radius: 30px 0px 0px 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.music-icon {
  padding-left: 10px;
  padding-right: 5px;
  svg {
    width: 26px;
    height: 26px;
  }
}
.music-name {
  color: #e6e6e6;
  text-overflow: ellipsis;
  overflow: hidden;
} 
.header-box {
  display: flex;
  svg {
    width: 30px;
    height: 30px;
  }
  .play-music {
    line-height: 34px;
    padding-left: 10px;
    color: #949596;
  }
  span.cur-name {
    padding-left: 10px;
    color: #d2d4d6;
  }
}
</style>
<style>
.drawer-outer {
  border-radius: 30px 30px 0 0;
  width: 100%;
}
@media screen and  (max-width: 1000px){ 
  .article-nav-bar {
    display: none;
  }
}
</style>

