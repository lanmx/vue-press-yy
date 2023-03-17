<template>
  <div id="aplayer-app">
    <h2>aplayer播放器</h2>
    <br />
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer"></div>
  </div>
</template>

<script>
import APlayer from "APlayer"; // 引入音乐插件
import "APlayer/dist/APlayer.min.css"; // 引入音乐插件的样式
export default {
  name: "App",
  data() {
    return {
      audio: [ // 歌曲列表
        {
          name: "Windy Hill", // 歌曲名字
          artist: "羽肿", // 歌曲演唱者
          url: "https://www.ytmp3.cn/down/53896.mp3",
          cover: "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
        {
          name: "为霜", // 歌曲名字
          artist: "羽肿", // 歌曲演唱者
          url: "https://www.ytmp3.cn/down/60103.mp3",
          cover: "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
        {
          name: "花火が瞬く夜に", // 歌曲名字
          artist: "羽肿", // 歌曲演唱者
          url: "https://www.ytmp3.cn/down/54323.mp3",
          cover: "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
        {
          name: "Somnambulating", // 歌曲名字
          artist: "羽肿", // 歌曲演唱者
          url: "https://www.ytmp3.cn/down/46190.mp3",
          cover: "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
        {
          name: "故郷の原風景",
          artist: "陶笛-犹豫的泥巴",
          url:"https://www.ytmp3.cn/down/46084.mp3",
          cover: "http://imge.kugou.com/stdmusic/150/20200812/20200812134914113741.jpg",
          lrc: "",
          theme: "#baf",
        },
        { name: '米津玄師', artist: 'LOSER', url: 'https://www.ytmp3.cn/down/73654.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: '瞬间的永恒', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/53702.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: '夜空的寂静', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/54888.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: '秋的思念', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/47097.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: '红豆', artist: '赵海洋', url: 'https://www.ytmp3.cn/down/78229.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: '安静的午后', artist: '高至豪', url: 'https://www.ytmp3.cn/down/76204.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: 'River Flows in You', artist: '米歇尔很甜', url: 'https://www.ytmp3.cn/down/76694.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
        { name: '夜的钢琴曲五', artist: 'Caxey', url: 'https://www.ytmp3.cn/down/76887.mp3', cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200' },
      ],
      info: {
        fixed: false, // 不开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: true, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      },
      aplayer: null
    };
  },
  created() {
    // $(document).pjax('#aplayer-app', '#aplayer-app', {fragment:'#aplayer-app', timeout:8000});
  },
  mounted() {
    // this.initScript()
    // 初始化播放器
    this.initAudio();
  },
  methods: {
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      this.aplayer = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
    initScript() {
      const src = ['http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js','https://cdnjs.cloudflare.com/ajax/libs/jquery.pjax/1.9.0/jquery.pjax.js']
      src.forEach(item => {
        const oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = item;
        document.body.appendChild(oScript);
      })
      const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      document.body.appendChild(oScript);
      $(document).pjax('a', '#page', {fragment:'#page', timeout:8000});
    },
  },
};
</script>

<style scoped>
#aplayer-app {
  width: 100%;
  height: 100%;
  padding: 50px;
}
#aplayer {
  width: 480px;
}
</style>