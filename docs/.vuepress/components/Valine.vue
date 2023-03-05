<template>
  <section style="border-top: 2px solid #eaecef; padding-top:1.5rem; margin-top:2rem;">
    <div>
      <!-- id 将作为查询条件 -->
      <span class="leancloud-visitors"
            data-flag-title="Your Article Title">
        <em class="post-meta-item-text">阅读量： </em>
        <i class="leancloud-visitors-count"></i>
      </span>
    </div>
    <h4 style="padding-bottom: 1rem;">
      <a href="javascript:;"></a>
      评 论：
    </h4>
    <div id="vcomments"></div>
  </section>
</template>

<script>
import emojiMaps from "../../utils/valine-emoji"
import Valine from "valine"
import AV from 'leancloud-storage'
export default {
  name: 'Valine',
  mounted: function () {
    // require window
    if (typeof window !== 'undefined') {
      document.getElementsByClassName('leancloud-visitors')[0].id
        = window.location.pathname
      this.window = window
      window.AV = AV
    }

    new Valine({
      el: '#vcomments',
      appId: '9Xn82veZTCg5XxM9FAxvCJHZ-gzGzoHsz',// your appId
      appKey: '2wiyzSlHA4yweIYu3JXXbEYk', // your appKey    
      notify: false,
      verify: false,
      path: window.location.pathname,
      visitor: true,
      avatar: 'mm',
      placeholder: 'write here',
      // 设置Bilibili表情包地址
      emojiCDN: '//i0.hdslb.com/bfs/emote/',
      emojiMaps
    });
  },
}
</script>
