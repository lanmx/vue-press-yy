<template>
  <!-- 音乐按钮 -->
  <div class="svg-icon" @click="openClick">
    <svg t="1683354468097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2555" width="200" height="200"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="2556" fill="#4abf8a"></path></svg>
  </div>
  <div class="music-box" v-if="curMusic.name" @mouseover="onmouseover" @mouseleave="onmouseleave">
    <div class="music-icon">
      <svg t="1682245190827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2374" width="200" height="200"><path d="M158.249961 614.402466c37.219322 0 67.372153 30.559802 67.372153 68.272422v273.065023c0 37.700288-30.152831 68.260089-67.372153 68.260089S90.865475 993.440198 90.865475 955.739911V682.674888a68.753387 68.753387 0 0 1 19.731914-48.269194 66.977515 66.977515 0 0 1 47.652572-20.003228zM394.083329 0.04933c37.20699 0 67.372153 30.572134 67.372153 68.272422v887.418159c0 37.700288-30.165163 68.260089-67.372153 68.260089s-67.322823-30.559802-67.322824-68.260089V68.272422c0-37.700288 30.103501-68.223092 67.322824-68.223092zM629.916696 273.077355c37.20699 0 67.384486 30.559802 67.384486 68.260089v614.402467c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089v-614.402467c0-37.700288 30.165163-68.260089 67.384486-68.260089z m235.833368-136.544844a66.878855 66.878855 0 0 1 47.640239 20.003228 68.704057 68.704057 0 0 1 19.731914 48.269194v750.934978c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089V204.767936a68.753387 68.753387 0 0 1 19.731914-48.269195 66.928185 66.928185 0 0 1 47.652572-20.003227z m0 0" p-id="2375" fill="#4abf8a"></path></svg>
    </div>
    <div class="music-name">
      {{ curMusic.name  }}
    </div>
    <div v-if="tooltip" class="tooltip-box">
      <div class="arrow"></div>
      <div class="text">{{ curMusic.name  }}</div>
    </div>
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
    :append-to-body="true"
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
import { ref, onMounted } from 'vue'
import Music from '../components/Music.vue'


export default {
  props: {
    cate: String
  },
  components:{
    Music
  },
  setup(props, context) {
    // 音乐播放器
    const drawer = ref(false)
    const cancelClick = () => {
      drawer.value = false
    }
    const openClick = () => {
      drawer.value = true
      console.log(drawer.value);
    }

    // 获取当前播放音乐
    const curMusic = ref({});
    const getcurMusic = (value) => {
      value ? curMusic.value = value : curMusic.value = { name: '' };
    }
    onMounted(() => {
      getcurMusic();
    })

    // 鼠标事件
    const tooltip = ref(false)
    const onmouseover = () => {
      tooltip.value = true
    }
    const onmouseleave = () => {
      tooltip.value = false
    }
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      drawer,
      curMusic,
      tooltip,
      cancelClick,
      openClick,
      getcurMusic,
      onmouseover,
      onmouseleave
    }
  },

  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
  },
  
}
</script>
<style lang="less" scoped>
.svg-icon {
  margin-left: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 26px;
    height: 26px;
  }
}
.music-box {
  display: flex;
  color: var(--c-text);
  .music-icon {
    svg {
      width: 11px;
      height: 11px;
    }
  }
  .music-name {
    width: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
}
.tooltip-box {
  color: var(--c-text);
  position: relative;
  width: 0px;
    .text {
      position: absolute;
      top: 36px;
      left: -46px;
      padding: 2px 12px;
      border-radius: 5px;
      background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 200px;
    }
    .arrow {
      display: inline-block;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 31px;
      background: conic-gradient(from 90deg at 0% 0, #b2e68d 0, #bce689 45deg, transparent 45.1deg);
      left: -36px;
      transform: rotate(-45deg);
    }
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
</style>