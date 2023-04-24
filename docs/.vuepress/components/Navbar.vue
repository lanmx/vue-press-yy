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
  <!-- 音乐按钮 -->
  <div v-if="cate === 'back-end'" class="music-button" @click="openClick">
    <div class="music-icon">
      <svg t="1682245190827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2374" width="200" height="200"><path d="M158.249961 614.402466c37.219322 0 67.372153 30.559802 67.372153 68.272422v273.065023c0 37.700288-30.152831 68.260089-67.372153 68.260089S90.865475 993.440198 90.865475 955.739911V682.674888a68.753387 68.753387 0 0 1 19.731914-48.269194 66.977515 66.977515 0 0 1 47.652572-20.003228zM394.083329 0.04933c37.20699 0 67.372153 30.572134 67.372153 68.272422v887.418159c0 37.700288-30.165163 68.260089-67.372153 68.260089s-67.322823-30.559802-67.322824-68.260089V68.272422c0-37.700288 30.103501-68.223092 67.322824-68.223092zM629.916696 273.077355c37.20699 0 67.384486 30.559802 67.384486 68.260089v614.402467c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089v-614.402467c0-37.700288 30.165163-68.260089 67.384486-68.260089z m235.833368-136.544844a66.878855 66.878855 0 0 1 47.640239 20.003228 68.704057 68.704057 0 0 1 19.731914 48.269194v750.934978c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089V204.767936a68.753387 68.753387 0 0 1 19.731914-48.269195 66.928185 66.928185 0 0 1 47.652572-20.003227z m0 0" p-id="2375" fill="#e6e6e6"></path></svg>
    </div>
    <div class="music-name">{{ curMusic.name  }}</div>
  </div>
  <!-- 音乐播放器 -->
  <el-drawer
    class="drawer-outer"
    v-model="drawer"
    title="音乐"
    direction="btt"
    :before-close="cancelClick"
    size="80%"
    :with-footer="false"
  >
    <template #header>
      <div class="header-box">
        <svg t="1682242721646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8832" width="200" height="200"><path d="M74.666667 853.333333c-17.066667 0-32-14.933333-32-32v-426.666666c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v426.666666c0 17.066667-14.933333 32-32 32zM366.933333 853.333333c-17.066667 0-32-14.933333-32-32v-618.666666c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v618.666666c0 17.066667-14.933333 32-32 32zM657.066667 853.333333c-17.066667 0-32-14.933333-32-32v-341.333333c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v341.333333c0 17.066667-12.8 32-32 32zM949.333333 853.333333c-17.066667 0-32-14.933333-32-32v-512c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v512c0 17.066667-14.933333 32-32 32z" fill="#e6e6e6" p-id="8833"></path></svg>
        <div class="play-music">正在播放 <span v-if="curMusic" class="cur-name">{{ curMusic.name  }} - {{ curMusic.artist }}</span></div>
      </div>
    </template>
    <Music @getcurMusic="getcurMusic" />
  </el-drawer>
</template>
<script>
import { ref, onBeforeMount, onMounted, provide, getCurrentInstance } from 'vue'
import { 
  usePageData,
  usePageFrontmatter,
  useSiteData,
  useSiteLocaleData,
  usePageHead,
  usePageHeadTitle,
  usePageLang,
  useRouteLocale,
} from "@vuepress/client";
import Info from '../components/Info.vue'
import Music from '../components/Music.vue'


export default {
  props: {
    cate: String
  },
  components:{
    Info, Music
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
    };

    // 初始化菜单
    const getMenu = () => {
      if (menu) {
        menu.forEach(m => {
          m.name = menuMap[m.text]
        })
        console.log(menu);
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
      console.log(item)
      curCate.value = item.name;
      console.log(curCate.value)
      instance?.proxy?.$Bus.emit('getCurCate', item)
    }

    // 音乐播放器
    const drawer = ref(false)
    const cancelClick = () => {
      drawer.value = false
    }
    const openClick = () => {
      drawer.value = true
    }

    // 获取当前播放音乐
    const curMusic = ref({});
    const getcurMusic = (value) => {
      value ? curMusic.value = value : curMusic.value = { name: 'Somnambulating' };
    }
    onMounted(() => {
      getcurMusic();
    })
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      scrollTop,
      menuMap,
      menu,
      drawer,
      curMusic,
      curCate,
      goPage,
      scrollToTop,
      cancelClick,
      openClick,
      getcurMusic
    }
  },

  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
    console.log('usePageData', usePageData().value,
      'usePageFrontmatter', usePageFrontmatter().value,
      'useSiteData', useSiteData().value,
      'useSiteLocaleData', useSiteLocaleData().value,
      'usePageHead', usePageHead().value,
      'usePageHeadTitle', usePageHeadTitle().value,
      'usePageLang', usePageLang().value,
      'useRouteLocale', useRouteLocale().value,
      'menu', this.menu);
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
}
@media screen and  (max-width: 1000px){ 
  .article-nav-bar {
    display: none;
  }
}
</style>

