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
            <div class="label-item" v-for="item in item.label" :key="item">{{ item }}></span></div>
          </div> -->
          <div class="content">{{ item.describe }}</div>
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
    const articleData = __ARTICLE__[cate];
    // onBeforeMount(() => {
    //   console.log('articleData', articleData, props)
    // })
    const list = ref([])
    articleData.list = articleData.list.filter(item => item.text !== 'README');
    list.value = articleData.list;
    const cateItem = ref({});
    const instance = getCurrentInstance()
    instance?.proxy?.$Bus.on('getCurCate', (res) => {
      if (res) {
        // console.log(res)
        cateItem.value = res;
        all.value = false;
      }
    })

    watch(cateItem, (newValue, oldValue) => {
        // console.log('值发生了变更', newValue, oldValue);
        getCateList(newValue);
      },
      { deep: true, flush: 'post' }
    );
    // 获取文章类别
    const getCateList = (value) => {
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
    width: 1.5rem;
    height: 1.5rem;
  }
  .tab-name {
    font-size: 1.1rem;
    line-height: 40px;
    cursor: pointer;
  }
  .tab-icon {
    padding-right: 3px;
    padding-top: 3px;
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
  font-size: 1.1rem;
  line-height: 2rem;
  color: var(--c-text);
  font-weight: bolder;
}
.label-box {
  display: flex;
  padding-bottom: 2px;
  .label-item {
    border-radius: 5px;
    // background-color: #eaeceb;
    margin-right: 10px;
    padding-left: 5px;
    padding-right: 5px;
    color: #8a919f;
    font-size: 14px;
    // color: var(--c-text);
  }
}
.info {
  display: flex;
}
.line {
  border-bottom: 1px solid var(--c-border);
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 16px; 
}
// 内容超出三行显示省略号
.content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--c-text);
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
  background-color: #fafafa;
}
.card-inner {
  text-decoration: none !important;
}
.el-card {
  transition: background .3s ease-in-out,transform .3s ease-in-out;
}
.el-card:hover {
  border: 3px solid #3eaf7c;
  transform: scale(1.05);
}
@media screen and (max-width: 540px){
  .column-head {
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: auto;
  }

}
</style>