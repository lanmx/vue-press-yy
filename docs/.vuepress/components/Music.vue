<template>
  <div class="content">
    <div class="title-music">{{ name + ' - ' + author }}</div>
    <div class="music-body">
      <div class="cover">
        <div class="cover-div">
          <div :class="{'cover-inner': true, 'img-auto': !stopshow }"><img :src="imgurl" /></div>
        </div>
      </div>
      <div class="song-word">
        纯音乐
      </div>
      <div class="rhy-thm">
      <div v-for="item in rhythmlist" :key="item" :class="{'rhy-thm-item-stop': stopshow, 'rhy-thm-item': !stopshow}">
        <!-- <div v-for="ele in item" :key="ele" class="rhy-thm-ele"></div> -->
      </div>
    </div>
    </div>
    <div class="footer">
      <!-- 进度条 -->
      <div class="progress">
        <div class="time">{{ time.current }}</div>
        <div class="slider-demo-block">
          <el-slider v-model="process" :format-tooltip="format" />
        </div>
        <div class="time-end">{{ time.duration }}</div>
      </div>
       <!-- 按钮 -->
      <div class="btn">
        <svg v-show="!circleshow" @click="circle" t="1678588582295" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9873" width="200" height="200"><path d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z" p-id="9874" fill="#333333"></path><path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="9875" fill="#333333"></path></svg>
        <svg v-show="circleshow" @click="single" t="1678588417737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7311" width="200" height="200"><path d="M861.742545 520.005818c13.963636 0 25.460364 10.146909 27.648 23.458909l0.372364 4.514909v77.730909a183.435636 183.435636 0 0 1-174.033454 183.20291l-9.448728 0.279272H229.981091l90.437818 90.437818a28.439273 28.439273 0 0 1 3.258182 36.305455l-3.258182 3.909818a28.439273 28.439273 0 0 1-36.305454 3.258182l-3.909819-3.258182-136.192-136.192a33.978182 33.978182 0 0 1-3.490909-44.218182l3.490909-4.049454 133.911273-133.911273a28.439273 28.439273 0 0 1 43.52 36.305455l-3.258182 3.909818-87.412363 87.365818-4.049455 4.142545h479.557818a127.441455 127.441455 0 0 0 127.255273-119.714909l0.232727-7.773091v-77.730909c0-15.453091 12.520727-27.973818 27.973818-27.973818z m-122.135272-438.923636l3.956363 3.258182L879.709091 220.532364a33.978182 33.978182 0 0 1 8.192 13.079272l0.651636 2.187637c2.606545 9.774545 0.791273 20.48-5.399272 28.951272l-3.444364 4.049455-133.911273 133.911273a28.439273 28.439273 0 0 1-43.52-36.305455l3.258182-3.909818 87.412364-87.365818 4.049454-4.189091-479.604363 0.046545a127.441455 127.441455 0 0 0-127.208728 119.714909l-0.232727 7.726546v77.730909a28.020364 28.020364 0 0 1-55.621818 4.561455l-0.372364-4.561455V398.429091a183.435636 183.435636 0 0 1 173.986909-183.202909l9.448728-0.232727h476.346181L703.301818 124.555636a28.439273 28.439273 0 0 1-3.304727-36.305454l3.258182-3.909818a28.439273 28.439273 0 0 1 36.305454-3.258182z" fill="#333333" p-id="7312"></path></svg>
        <svg @click="before" t="1678588662852" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11560" id="mx_n_1678588662853" width="200" height="200"><path d="M174.087409 63.83998c-13.8351 0-25.03007 11.19497-25.03007 25.03007l0 846.257853c0 13.836123 11.19497 25.031093 25.03007 25.031093 13.836123 0 25.03007-11.193947 25.03007-25.031093l0-404.727835c0 14.395872 8.677637 26.985608 21.852704 35.272341l550.793538 347.114672c10.169617 6.40385 24.835641 9.777691 36.665061 9.777691 35.004235 0 66.512856-28.501124 66.512856-63.457264L874.941638 164.890444c0-34.979676-32.756031-63.431681-67.733661-63.431681-11.80793 0-25.568329 3.372817-35.737946 9.753131L222.021118 458.31531c-13.175067 8.262174-22.903639 20.874423-22.903639 35.247782L199.117478 88.87005C199.117478 75.03495 187.922509 63.83998 174.087409 63.83998zM242.701113 500.700653 795.939329 153.621796c2.222621-1.39272 8.847505-2.101871 11.268648-2.101871 6.427386 0 17.672498 5.108345 17.672498 13.370519l0 694.217065c0 11.342326-16.524348 16.379039-24.663726 11.294231L244.852102 523.287067c-5.622044-3.569292-7.333012-9.093099-7.333012-11.293207C237.51909 509.744633 237.079068 504.220826 242.701113 500.700653z" p-id="11561" fill="#333333"></path></svg>
        <svg v-show="!stopshow" @click="stop" t="1678588459900" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8483" id="mx_n_1678588459901" width="200" height="200"><path d="M512 1024C228.266667 1024 0 795.733333 0 512S228.266667 0 512 0s512 228.266667 512 512-228.266667 512-512 512z m0-42.666667c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333z m-106.666667-682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384c0 12.8-8.533333 21.333333-21.333334 21.333333s-21.333333-8.533333-21.333333-21.333333V320c0-12.8 8.533333-21.333333 21.333333-21.333333z m213.333334 0c12.8 0 21.333333 8.533333 21.333333 21.333333v384c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333z" fill="#333333" fill-opacity=".9" p-id="8484"></path></svg>
        <svg v-show="loading" t="1678713247849" class="icon loading" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9933" id="mx_n_1678713247850" width="200" height="200"><path d="M471 419.59a36.83 36.83 0 0 1-26.47-62.43l82.79-85.74-85.74-82.86a36.83 36.83 0 0 1 51.21-52.94l104.12 100.55a48.1 48.1 0 0 1 0.94 68.26L497.51 408.36A36.59 36.59 0 0 1 471 419.59zM545.63 289c0.14 0.07 0.22 0.22 0.29 0.29z m-0.5-36l-0.36 0.36z" fill="#333333" p-id="9934"></path><path d="M512 898.69c-185.79 0-336.91-151.12-336.91-336.91S326.25 224.88 512 224.88a36.83 36.83 0 0 1 0 73.65c-145.15 0-263.25 118.1-263.25 263.25S366.89 825 512 825s263.18-118.1 263.18-263.25a36.83 36.83 0 0 1 73.65 0c0.04 185.82-151.08 336.94-336.83 336.94z" fill="#333333" p-id="9935"></path></svg>
        <svg v-show="stopshow && !loading" @click="play"  t="1678588390378" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7107" width="200" height="200"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z" fill="#333333" p-id="7108"></path><path d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" fill="#333333" p-id="7109"></path></svg>
        <svg @click="next" t="1678588682369" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12088" id="mx_n_1678588682370" width="200" height="200"><path d="M849.911568 960.158996c13.8351 0 25.031093-11.193947 25.031093-25.031093L874.942661 88.87005c0-13.8351-11.195993-25.03007-25.031093-25.03007s-25.031093 11.19497-25.031093 25.03007l0 400.63461c0-11.95324-15.619746-22.440082-26.937512-29.528524L237.640863 109.330034c-9.850345-6.183839-18.381649-9.435906-29.822213-9.435906-33.927717 0-58.762335 27.572986-58.762335 61.476143L149.056316 862.629729c0 33.878598 24.125467 61.500703 58.053184 61.500703 11.440563 0 20.973684-3.275603 30.824029-9.486048l560.889477-350.633822c11.316743-7.089465 26.056446-17.574261 26.056446-29.5275l0 400.645866C824.880475 948.96505 836.076468 960.158996 849.911568 960.158996zM768.464581 521.648754 209.60432 872.25904c-1.906419 1.172709-0.440022 1.809205-2.493797 1.809205-4.620227 0-7.993045-3.665483-7.993045-11.438517L199.117478 161.371294c0-7.822153 3.372817-11.414981 7.993045-11.414981 2.053776 0 2.322905 0.610914 4.229325 1.784646l557.956681 350.622566c4.64274 2.90926 4.936429 7.284917 4.936429 9.655917C774.232958 514.364861 773.083785 518.740518 768.464581 521.648754z" p-id="12089" fill="#333333"></path></svg>
        <el-dropdown trigger="click" placement="top">
        <svg t="1678588735035" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13064" width="200" height="200"><path d="M981.333333 917.333333a21.333333 21.333333 0 0 1-21.333333 21.333334H64a21.333333 21.333333 0 0 1 0-42.666667h896a21.333333 21.333333 0 0 1 21.333333 21.333333zM490.666667 170.666667h469.333333a21.333333 21.333333 0 0 0 0-42.666667H490.666667a21.333333 21.333333 0 0 0 0 42.666667z m469.333333 341.333333H64a21.333333 21.333333 0 0 0 0 42.666667h896a21.333333 21.333333 0 0 0 0-42.666667zM76.193333 446.32C96 461.16 121.953333 469.333333 149.333333 469.333333s53.333333-8.173333 73.14-23.013333c21.333333-16 33.526667-38.666667 33.526667-62.32V179.266667q3.206667 3.58 6.586667 6.813333a21.473333 21.473333 0 0 0 2.953333 2.366667 64.24 64.24 0 0 1 13.333333 12c8.666667 10.22 15.84 24.18 20.733334 40.373333a21.333333 21.333333 0 0 0 40.84-12.346667c-6.666667-22.053333-16.44-40.773333-29.04-55.626666a107.46 107.46 0 0 0-20.493334-18.78c-8.813333-8.806667-16.526667-20.666667-22.36-34.42-9.033333-21.333333-11.813333-42.666667-12.553333-56.78A21.333333 21.333333 0 0 0 234.666667 42.666667h-0.566667A21.333333 21.333333 0 0 0 213.333333 64v251.56C195 304.613333 172.666667 298.666667 149.333333 298.666667c-27.38 0-53.333333 8.173333-73.14 23.013333-21.333333 16-33.526667 38.666667-33.526666 62.32s12.22 46.34 33.526666 62.32z" fill="#333333" p-id="13065"></path></svg>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in musiclist" :key="item" @click="changeMusic(item)">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import formatjs from '../../utils/format'

const rhythmlist = ref(Array.from({ length: 28 }).map(() => Math.floor(Math.random() * 70)));
let process = ref<number>(0);
const musiclist = ref([
  { name: 'Somnambulating', artist: '羽肿', url: 'https://www.ytmp3.cn/down/46190.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20180410/20180410122319206458.jpg' },
  { name: '为霜', artist: '羽肿', url: 'https://www.ytmp3.cn/down/60103.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20180330/20180330222216412111.jpg' },
  { name: '花火が瞬く夜に', artist: '羽肿', url: 'https://www.ytmp3.cn/down/54323.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170622/20170622214007481858.jpg' },
  { name: 'Windy Hill', artist: '羽肿', url: 'https://www.ytmp3.cn/down/53896.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170815/20170815070007812976.jpg' },
  { name: '也许是天意', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/75787.mp3', cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20201110/20201110004118192.jpg' },
  { name: '瞬间的永恒', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/53702.mp3', cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20201110/20201110004118192.jpg',
    lrc: "", theme: "rgb(127, 218, 180)" }, // 播放这首歌曲时的主题色},
  { name: '夜空的寂静', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/75788.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { name: '秋的思念', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/47097.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { name: '红豆', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/78229.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { name: '安静的午后', artist: '高至豪', url: 'https://www.ytmp3.cn/down/76204.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20190121/20190121191448339234.jpg' },
  { name: 'River Flows in You', artist: '米歇尔很甜', url: 'https://www.ytmp3.cn/down/76694.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20210727/20210727132932390942.jpg' },
  { name: '夜的钢琴曲五', artist: 'Caxey', url: 'https://www.ytmp3.cn/down/76887.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20211120/20211120100105497430.jpg' },
  { name: '时代を超える想い2（穿越时空的思念）', artist: '和田薫', url: 'https://www.ytmp3.cn/down/54475.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20201111/20201111230549290345.jpg' },
  { name: '鸟の诗', artist: 'TAMUSIC', url: 'https://www.ytmp3.cn/down/78502.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20220810/20220810060304757664.jpg' },
  { name: '風の住む街', artist: '磯村由紀子', url: 'https://www.ytmp3.cn/down/78495.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20220628/20220628120801520056.jpg' },
  { name: '卡农(钢琴)', artist: '纯音乐', url: 'https://www.ytmp3.cn/down/47043.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20211015/20211015211704185932.jpg' },
  { name: '城南花已开', artist: '三亩地', url: 'https://www.ytmp3.cn/down/47675.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20181102/20181102115543498345.jpg' },

])
const name = ref(musiclist.value[0].name)
const author = ref(musiclist.value[0].artist)
const time = ref({ duration: '00:00', current: '00:00'})
const circleshow = ref(false);
const stopshow = ref(true);
const loading = ref(false)
const imgurl = ref(musiclist.value[0].cover)
let curmusic = new Audio(musiclist.value[0].url);
type TimerType = NodeJS.Timeout
let timer = ref<TimerType>()
onMounted(async () =>{
  time.value.duration = curmusic.duration ? formatjs.secondsminute(curmusic.duration) : '02:45'
  time.value.current = formatjs.secondsminute(curmusic.currentTime)
  init();
})
// 初始化
const init = () => {
  const status = getstatus()
  if(curmusic && status==='playing') {
    stopshow.value = false
    timeInterval();
  }
}
// 歌曲时长
const format = (val: number) => {
  // 根据百分比获取当前播放时间
  time.value.current = formatjs.secondsminute(Math.ceil(formatjs.minuteseconds(time.value.duration) * (val / 100)))
  return val
}
// 切换音乐
const changeMusic = async (item) => {
  if(item.name === name) return
  if(!curmusic.paused) curmusic.pause();
  playMusic(item);
}
// 暂停
const stop = () => {
  curmusic.pause();
  console.log(curmusic,curmusic.paused);
  stopshow.value = true
  setstatus('stop')
  clearTimeout(timer.value);
}
// 播放
const play = async () => {
  if(curmusic.paused) {
    loading.value = true
    await curmusic.play();
    stopshow.value = false
    loading.value = false
    setstatus('playing')
    timeInterval();
    console.log(curmusic,curmusic.paused);
  }
}
// 实时获取当前播放时间
const timeInterval = () => {
  timer.value = setInterval(getCurrent, 1000);
}
// 循环播放
const circle = () => {
  curmusic.loop = false
  circleshow.value = true
  console.log(curmusic.loop);
}
// 单曲循环
const single = () => {
  curmusic.loop = true
  circleshow.value = false
  console.log(curmusic.loop);
}
// 下一首
const next = () => {
  const index = musiclist.value.findIndex(item => item.name === name.value)
  curmusic.pause();
  if(index === musiclist.value.length-1) {
    playMusic(musiclist.value[0])
  } else {
    playMusic(musiclist.value[index+1])
  }
}
// 上一首
const before = () => {
  const index = musiclist.value.findIndex(item => item.name === name.value)
  curmusic.pause();
  if(index>0) {
    playMusic(musiclist.value[index-1]);
  } else {
    playMusic(musiclist.value[musiclist.value.length - 1]);
  }
}
// 播放音乐
const playMusic = (music?) => {
  if(music) {
    curmusic = new Audio(music.url);
  } else {  // 否则默认播放第一首
    curmusic = new Audio(musiclist.value[0].url)
  }
  return new Promise(async (resolve, rej) => {
    try {
      loading.value = true
      stopshow.value = true
      await curmusic.play();
      curmusic.preload = 'auto'
      time.value.duration = curmusic.duration ? formatjs.secondsminute(String(Math.round(curmusic.duration))) : '3:45'
      time.value.current = formatjs.secondsminute(String(curmusic.currentTime))
      name.value = music.name;
      author.value = music.artist;
      imgurl.value = music.cover;
      stopshow.value = false
      loading.value = false
      setstatus('playing');
      timeInterval();
      console.log('Playing...');
      resolve(true)
    } catch (err) {
      rej(err)
      console.log('Failed to play...' + err);
    }
  })
}
// 获取当前时间
const getCurrent = () => {
  time.value.current = formatjs.secondsminute(Math.round(curmusic.currentTime))
  process.value = Math.floor((100* curmusic.currentTime) / curmusic.duration)
}
// 本地保存音乐播放状态
const setstatus = (e) => {
  return localStorage.setItem('musicstatus',e)
}
// 获取本地保存音乐播放状态
const getstatus = () => {
  return localStorage.getItem('musicstatus')
}

</script>
<style scoped>
.content {
  width: 100%;
  height: calc(100% - 78px);
  background-image: linear-gradient(180deg, #22272e, rgb(122, 122, 122));
  position: absolute;
  left: 0;
  z-index: 1;
}
.title-music {
    line-height: 100px;
    font-weight: bold;
    text-align: center;
    font-size: 36px;
    color: #adbac7;
}
.music-body {
  width: 100%;
  height: 800px;
  color: #adbac7;
}
.cover {
  width: 100%;
  height: auto;
}
.cover-div {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: #000;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: auto;
}
.cover-inner {
    width: 130px;
    height: 130px;
    border-radius: 75px;
    background-color: #67686a;
    overflow: hidden;
}
.img-auto {
  animation: round 9s infinite linear;
}
.song-word {
  height: 46%;
  text-align: center;
  padding: auto;
  line-height: 300px;
  opacity: 0.7;
}
.rhy-thm {
  display: flex;
  justify-content: center;
  height: 48%;
  transform: rotateX(180deg);
  padding: 0 5%;
}
.rhy-thm-item {
  margin: 0.3%;
  width: 2%;
  height: 0%;
  animation: music 1s .5s linear infinite alternate;
}
.rhy-thm-item-stop {
  margin: 0.3%;
  width: 2%;
  height: 2%;
  background-image: linear-gradient(180deg, #1303f4, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(1) {
  background-image: linear-gradient(180deg, #0000FF, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(2) {
  animation-delay: .1s;
  background-image: linear-gradient(180deg, #21E412, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(3) {
  animation-delay: .4s;
  background-image: linear-gradient(180deg, #B10880, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(4) {
  animation-delay: .3s;
  background-image: linear-gradient(180deg, #FFFF00, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(5) {
  animation-delay: -.5s;
  background-image: linear-gradient(180deg, #FF0000, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(6) {
  animation-delay: .2s;
  background-image: linear-gradient(180deg, #EEAD0E, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(7) {
  animation-delay: -.6s;
  background-image: linear-gradient(180deg, #FF00FF, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(8) {
  animation-delay: .2s;
  background-image: linear-gradient(180deg, #808000, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(9) {
  animation-delay: -.4s;
  background-image: linear-gradient(180deg, #32CD32, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(10) {
  animation-delay: -.1s;
  background-image: linear-gradient(180deg, #644ABA, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(11) {
  animation-delay: -.3s;
  background-image: linear-gradient(180deg, #0c23d0, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(12) {
  animation-delay: -.4s;
  background-image: linear-gradient(180deg, #05e052, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(13) {
  animation-delay: .1s;
  background-image: linear-gradient(180deg, #0a35e2, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(14) {
  animation-delay: -.4s;
  background-image: linear-gradient(180deg, #FF00FF, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(15) {
  animation-delay: -.2s;
  background-image: linear-gradient(180deg, #EEAD0E, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(16) {
  animation-delay: .1s;
  background-image: linear-gradient(180deg, #dd2408, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(17) {
  animation-delay: .3s;
  background-image: linear-gradient(180deg, #200ee8, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(18) {
  animation-delay: -.2s;
  background-image: linear-gradient(180deg, #e2170d, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(19) {
  background-image: linear-gradient(180deg, #f408ec, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(20) {
  animation-delay: -.2s;
  background-image: linear-gradient(180deg, #7904df, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(21) {
  animation-delay: .1s;
  background-image: linear-gradient(180deg, #07e3fc, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(22) {
  animation-delay: -.1s;
  background-image: linear-gradient(180deg, #4e0ef0, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(23) {
  animation-delay: .2s;
  background-image: linear-gradient(180deg, #1009df, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(24) {
  animation-delay: .2s;
  background-image: linear-gradient(180deg, #f31818, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(25) {
  animation-delay: -.1s;
  background-image: linear-gradient(180deg, #1decc6, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(26) {
  animation-delay: .2s;
  background-image: linear-gradient(180deg, #e79b18, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(27) {
  animation-delay: -.5s;
  background-image: linear-gradient(180deg, #1da7ec, rgb(223, 221, 221));
}
.rhy-thm-item:nth-child(28) {
  animation-delay: .1s;
  background-image: linear-gradient(180deg, #e616d4, rgb(223, 221, 221));
}
@keyframes music {
  20% {
    height: 10%;
  }
  50% {
    height: 50%;
  }
  100% {
    height: 30%;
  }
}
.loading {
  animation: round 1.5s infinite linear;
}
@keyframes round {
  0% {
    transform: rotate(0deg); /* 开始旋转 div 元素 */
  }
  100% {
    transform: rotate(360deg); /* 结束旋转 div 元素 */
  }
}
.footer {
  width: 100%;
  height: 130px;	
  position: absolute;
  bottom: 0px;
}
.btn {
  width: 100%;
  height: 60px;	
  /* position: absolute;
  bottom: 0px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
svg {
    width: 24px;
    height: 24px;
    padding: 5px 10px;
    cursor: pointer;
}
.progress {
  display: flex;
  justify-content: center;
}
.slider-demo-block {
  width: calc(100% - 150px);
  padding-top: 10px;
  padding-bottom: 10px;
}
.el-progress__text {
  color: #acb3c1;
}
.time {
  color: #ffffff;
  padding-top: 15px;
  margin-right: 10px;
}
.time-end {
  color: #d0c6c6;
  padding-top: 15px;
  margin-left: 10px;
}
</style>