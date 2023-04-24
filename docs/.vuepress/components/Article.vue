<template>
  <div class="column-head">
    <div class="tab-icon">
      <svg t="1682082154303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3486" width="200" height="200"><path d="M686.4 224c-6.4-6.4-6.4-16 0-22.4l68-68c6.4-6.4 16-6.4 22.4 0l112.8 112.8c6.4 6.4 6.4 16 0 22.4l-68 68c-6.4 6.4-16 6.4-22.4 0L686.4 224zM384 776l372-372c5.6-5.6 4.8-15.2-1.6-20.8L641.6 269.6c-6.4-6.4-16-7.2-20.8-1.6L248 640l-56 192 192-56zM64 896v64h896v-64H64z" p-id="3487" fill="#707070"></path></svg>
    </div>
    <div class="tab-box">
      <div class="tab-name" :class="{'active-line': all }" @click="getAllAct('all')">全部文章</div>
    </div>
    <div class="tab-box" v-for="item in menu" :key="item.text">
      <div class="tab-name" :class="{'active-line': !all && item.name == cateItem.name }" @click="getAllAct(item)">{{ item.name }}</div>
    </div>
  </div>
  <div class="article-box" >
    <div v-for="item in list" :key="item.text">
      <div class="card-box">
        <router-link class="card-inner" :to="item.link">
          <div class="title">{{ item.text }}</div>
          <!-- <div class="label-box">
            <div class="label-item" v-for="item in item.parent" :key="item">{{ item }}</div>
            <div class="label-item">{{ item.parent }}</div>
          </div> -->
          <!-- <div class="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div> -->
          <!-- <div class="label-footer">
            <div class="icon-item">
              <svg t="1682077266481" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3249" width="200" height="200"><path d="M510.548 105.582c-129.797 0-235.386 105.593-235.386 235.39 0 93.999 55.509 175.067 135.354 212.767-147.613 43.35-255.793 179.825-255.793 341.273 0 10.275 8.327 18.594 18.594 18.594 10.267 0 18.594-8.319 18.594-18.594 0-175.702 142.956-318.65 318.636-318.65 129.797 0 235.395-105.593 235.395-235.39s-105.598-235.39-235.395-235.39z m0 433.591c-109.294 0-198.197-88.917-198.197-198.202 0-109.29 88.903-198.202 198.197-198.202 109.298 0 198.206 88.912 198.206 198.202 0 109.29-88.903 198.202-198.206 198.202z m0 0z m215.838 72.907c-8.175-6.229-19.83-4.686-26.057 3.487-6.245 8.17-4.686 19.826 3.484 26.074 79.681 60.886 125.367 153.241 125.367 253.366 0 10.279 8.332 18.598 18.595 18.598 10.275 0 18.594-8.319 18.594-18.598 0-111.818-51.024-214.941-139.984-282.927z m0 0z" fill="#707070" p-id="3250"></path></svg>
              <span class="label-t">author</span><span><a>author</a></span>
            </div>
            <div class="icon-item">
              <svg t="1682077186764" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2296" width="200" height="200"><path d="M821.248 400.896c-66.56-100.352-180.224-166.912-309.248-166.912-129.024 0-243.2 66.56-309.248 166.912-16.896 25.6-30.208 52.736-40.448 81.92 10.24 28.672 23.552 56.32 40.448 81.92 66.56 100.352 180.224 166.912 309.248 166.912 129.024 0 243.2-66.56 309.248-166.912 16.896-25.6 30.208-52.736 40.448-81.92-9.728-28.672-23.552-56.32-40.448-81.92z m-309.248 286.72c-138.752 0-258.56-84.48-309.76-204.8 51.2-120.32 171.008-204.8 309.76-204.8s258.56 84.48 309.76 204.8c-51.2 120.32-171.008 204.8-309.76 204.8z" p-id="2297" fill="#707070"></path><path d="M512 346.112c-75.264 0-136.704 61.44-136.704 136.704S436.736 619.52 512 619.52s136.704-61.44 136.704-136.704-61.44-136.704-136.704-136.704z m0 229.376c-51.2 0-92.672-41.472-92.672-92.672S460.8 390.144 512 390.144s92.672 41.472 92.672 92.672-41.472 92.672-92.672 92.672z" p-id="2298" fill="#707070"></path></svg>
              <span class="label-t">阅读量</span><span>9999+</span>
            </div>
          </div> -->
        </router-link>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, getCurrentInstance, watch  } from 'vue'
import _ from 'lodash'

export default {
  props: {
    cate: String
  },
	// setup函数中要使用props的话，要接收一下
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
    console.log(cate, props.cate);
    const articleData = __ARTICLE__[cate];
    // onBeforeMount(() => {
    //   console.log('articleData', articleData, props)
    // })
    const list = ref([])
    list.value = articleData.list.filter(item => item.text !== 'README')
    const cateItem = ref({});
    const instance = getCurrentInstance()
    instance?.proxy?.$Bus.on('getCurCate', (res) => {
      if (res) {
        console.log(res)
        cateItem.value = res;
        all.value = false;
      }
    })

    watch(cateItem, (newValue, oldValue) => {
        console.log('值发生了变更', newValue, oldValue);
        getCateList(newValue);
      },
      { deep: true, flush: 'post' }
    );
    // 获取文章类别
    const getCateList = (value) => {
      console.log(value)
      list.value = articleData.list.filter(item => item.parent === value.text);
      window.scrollTo(0,0);
    }

    // 获取所有文章
    const all = ref(true);
    const getAllAct = (item) => {
      if (item === 'all') {
        all.value = true;
        list.value = _.cloneDeep(articleData.list);
      } else {
        all.value = false;
        cateItem.value = item;
        getCateList(item);
      }
      window.scrollTo(0,0);
    }
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      articleData,
      cateItem,
      all,
      list,
      menu,
      getAllAct,
      getCateList
    }
  },
}
</script>
<style lang="less" scoped>
.column-head {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
  position: sticky;
  top: 55px;
  background-color: var(--c-bg);
  flex-wrap: wrap;
  height: auto;
  z-index: 9;
  border-bottom: 1px solid var(--c-border);
  svg {
    width: 1.7rem;
    height: 1.7rem;
  }
  .tab-name {
    font-size: 1.3rem;
    line-height: 40px;
    cursor: pointer;
  }
  .tab-icon {
    padding-right: 10px;
  }
  .active-line {
    border-bottom: 3px solid #3eaf7c;
    font-weight: bold;
  }
  .tab-box {
    padding: 0 15px;
  }
}
.title {
  font-size: 1.2rem;
  line-height: 2rem;
  color: var(--c-text)
}
.label-box {
  display: flex;
  .label-item {
    border: 1px solid #3eaf7c;
    border-radius: 5px;
    background-color: #eaeceb;
    margin-right: 10px;
    padding-left: 5px;
    padding-right: 5px;
    transform: skew(-10deg);
}
}
.info {
  display: flex;
}
.line {
  border: 1px solid var(--c-border);
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 16px; 
}
// 内容超出三行显示省略号
.content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.label-footer {
  display: flex;
  .icon-item {
    display: flex;
    align-items: center;
    line-height: 2.4rem;
    margin-right: 20px;
  }
  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
}
span.label-t {
    font-style: oblique;
    color: #c1c1c1;
    margin-right: 10px;
    white-space: nowrap;
}
.article-box {
  padding-top: 20px;
  padding-bottom: 20px;
}
.card-box {
  padding-bottom: 10px;
  padding-top: 10px;
}
.card-box:hover {
  color: red !important;
  background-color: #fafafa;
}
.el-card {
  transition: background .3s ease-in-out,transform .3s ease-in-out;
}
.el-card:hover {
  border: 3px solid #3eaf7c;
  transform: scale(1.05);
}
</style>