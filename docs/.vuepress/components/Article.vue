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
    <!-- <div class="tab-box search-i">
      <el-input v-model="searchValue" class="w-50 m-2" placeholder="请输入搜索文章" @change="search()">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </div> -->
  </div>
  <div class="tab-title">
    <div class="tab-title-item"
      v-for="item in tabTitle"
      :key="item.text"
      :class="{'active-title': item.name === currentTitle }"
      @click="changeType(item)"
    >
      {{ item.name }}
    </div>
  </div>
  <div class="article-box">
    <div v-for="item in list" :key="item.text" @click="goToArticle(item)">
      <div class="card-box">
        <router-link class="card-inner" :to="item.link">
          <div class="title">{{ item.text }}</div>
          <!-- <div class="label-box">
            <div class="label-item" v-for="item in item.label" :key="item">{{ item }}</span></div>
          </div> -->
          <div class="content">{{ item.description }}</div>
        </router-link>
        <div class="info">
            <div class="info-inner">
              <div class="info-item">
                <svg t="1693790444209" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6734" width="200" height="200"><path d="M512.173 795c171.39 0 318.422-118.888 356.196-283.157C830.477 347.727 683.517 229 512.245 229c-171.39 0-318.422 118.888-356.197 283.157C193.941 676.273 340.9 795 512.173 795zM75.93 504.096C118.297 298.658 299.91 149 512.245 149c212.19 0 393.717 149.458 436.234 354.712a40 40 0 0 1 0.007 16.192C906.121 725.342 724.507 875 512.173 875c-212.191 0-393.718-149.458-436.235-354.712a40 40 0 0 1-0.007-16.192zM512 704c-106.039 0-192-85.961-192-192s85.961-192 192-192 192 85.961 192 192-85.961 192-192 192z m0-80c61.856 0 112-50.144 112-112s-50.144-112-112-112-112 50.144-112 112 50.144 112 112 112z" fill="#8a8a8a" p-id="6735"></path></svg>
              </div>
              <div class="info-item">
                {{ item.read_count }}
              </div>
            </div>
            <div class="info-inner" @click="clickLike(item)">
              <div class="info-item">
                <svg v-if="item.islike" t="1693798235833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7939" width="200" height="200"><path d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667z" fill="#0275ff" p-id="7940"></path></svg>
                <svg v-if="!item.islike" t="1693790401468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5428" width="200" height="200"><path d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667zM544.256 149.333333c39.253333 0 59.498667 36.48 49.888 84.928-7.573333 38.144-21.984 104.426667-43.221333 198.666667-4.512 20.021333 10.56 39.093333 30.912 39.093333h218.666666c6.101333 0 12.16 1.066667 17.909334 3.168 27.445333 9.984 41.674667 40.554667 31.776 68.266667l-85.568 239.573333C744.981333 838.026667 693.301333 874.666667 635.402667 874.666667H223.498667C194.314667 874.666667 170.666667 850.784 170.666667 821.333333V503.498667c0-17.866667 14.144-32.448 31.829333-32.821334l21.866667-0.469333a221.12 221.12 0 0 0 167.381333-82.56c34.346667-42.602667 59.146667-99.306667 74.869333-169.877333C482.101333 166.336 499.552 149.333333 544.266667 149.333333z" fill="#bfbfbf" p-id="5429"></path></svg>
              </div>
              <div class="info-item">
                {{ item.good }}
              </div>
            </div>
          </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, getCurrentInstance, watch  } from 'vue'
import _ from 'lodash'
import { getArticle, getCateArticle, searchArticle } from '../api/article'
import { addRead, addLike, removeLike } from '../api/article'
import formatjs from '../../utils/format'
import { Calendar, Search } from '@element-plus/icons-vue'
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
        console.log(menu);
      }
    }
    onBeforeMount(() => {
      getMenu();
      getArticleFn();
    })
    const articleData = __ARTICLE__[cate];
    onBeforeMount(() => {
      console.log('articleData', articleData, props)
    })
    const list = ref([])
    articleData.list = articleData.list.filter(item => item.text !== 'README');
    // list.value = articleData.list;
    // 根据类别获取文章列表
    const getArticleFn = (param = '') => {
      const params = { cate: cate, parent: param }
      getCateArticle(params).then(res => {
        console.log(res);
        if (res && res.data) {
          res.data.forEach(item => {
            item.read_count = formatjs.transNumberToShort(item.read_count);
            item.good = formatjs.transNumberToShort(item.good);
          })
          list.value = res.data
        }
      }).catch((err) => {
        console.log(err);
      })
    }
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
      // list.value = articleData.list.filter(item => item.parent === value.text);
      getArticleFn(value.text)
      window.scrollTo(0,0);
    }

    // 获取所有文章
    const all = ref(true);
    const getAllAct = (item) => {
      if (item === 'all') {
        all.value = true;
        // list.value = _.cloneDeep(articleData.list);
        getArticleFn();
        cateItem.value = { text: '', name: 'all'}
      } else {
        all.value = false;
        cateItem.value = item;
        getCateList(item);
        console.log(item)
      }
      window.scrollTo(0,0);
    }

    const searchValue = ref('');
    const searchlist = ref([])
    const search = () => {
      const params = { 
        cate: cate,
        parent: '',
        text: ''
      }
      searchArticle(params).then(res => {
        console.log(res);
        list.value = res.data || []
      }).catch((err) => {
        console.log(err);
      })
    }

    // 添加阅读量
    const goToArticle = (item) => {
      const params = {
        id: item.id
      }
      addRead(params).then(res => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
    const islike = ref(false);
    const clickLike = (item) => {
      item.islike = !item.islike;
      if (item.islike) {
        const params = {
          id: item.id
        }
        addLike(params).then(res => {
          console.log(res);
          item.good++;
        }).catch((err) => {
          console.log(err);
        })
      } else {
        // 取消点赞
        const params = {
          id: item.id
        }
        removeLike(params).then(res => {
          console.log(res);
          item.good--;
        }).catch((err) => {
          console.log(err);
        })
      }
    }

    const tabTitle = [
      { name: '推荐' }, 
      { name: '最热' }
    ]
    const currentTitle = ref('推荐')
    const changeType = (item) => {
      currentTitle.value = item.name;
      if (item.name === '最热') {
        list.value.sort((a, b) => b.read_count - a.read_count)
      } else {
        getArticleFn(cateItem.value.text);
      }
    }
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      articleData,
      cateItem,
      all,
      list,
      menu,
      searchValue,
      searchlist,
      tabTitle,
      currentTitle,
      islike,
      getAllAct,
      getCateList,
      search,
      goToArticle,
      clickLike,
      changeType
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
    border-bottom: 3px solid var(--c-text-accent);
    font-weight: bold;
    color: var(--c-text-accent);
  }
  .tab-box {
    padding: 0 15px;
  }
  .tab-box:hover {
    color: var(--c-text-accent);
    font-weight: bold;
  }
  .search-i {
    margin-top: 8px;
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

.info {
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: #8a8a8a;
  .info-inner {
    display: flex;
    margin-right: 10px;
    .info-item {
      line-height: 19px;
      margin-right: 3px;
      cursor: pointer;
    }
  }
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
}
.tab-title {
  display: flex;
  .tab-title-item {
    margin-right: 15px;
    padding-top: 10px;
    cursor: pointer;
  }
  .tab-title-item:hover {
    color: #0275ff;
  }
  .active-title {
    color: #0275ff;
  }
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
  border: 3px solid var(--c-text-accent);
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