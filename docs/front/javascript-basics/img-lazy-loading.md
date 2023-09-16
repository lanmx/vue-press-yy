## 图片懒加载

### 1. 为什么使用懒加载

图片懒加载是针对图片加载时机的一种优化，在一些图片量比较大的网站（比如电商网站首页，或者团购网站、小游戏首页等），如果我们尝试在用户打开页面的时候，就把所有的图片资源加载完毕，那么很可能会造成白屏、卡顿等现象，因为图片真的太多了，一口气处理这么多任务，浏览器做不到啊！

懒加载是为了让浏览器只加载可视区内的图片，可视区外的大量图片不进行加载，当页面滚动到后面去的时候再进行加载。

这样做有很多好处可以增加首屏加载的速度，毕竟，用户点开页面的瞬间，呈现给他的只是首屏，我们只要把首屏的资源图片加载处理就可以了，至于下面的图片，当用户下滑当当前位置的时候，在加载出来也是没问题的，对于性能压力也小了，用户体验也没有变差。

### 2. 原理

图片懒加载的原理就是需要知道图片是否在可视区内了，当图片到达可视区内就需要去请求对应的图片加载出来

```js
<img class="lazyload" src="placeholder.jpg" data-src="real_image.jpg" />
```

### 3. 节流优化`window.scroll`事件

由于上面某些情况是需要使用到`window.scroll`事件的，所以我们可以增加节流来减少事件处理函数的调用次数。 假设我们判断是否可视区逻辑为函数`loadImage`那么我们可以如下处理。

```js
window.onscroll = throttle(loadImage, 500)
```

### 4. 滚动事件基础

![image-20220211135514480](@alias/image-20220211135514480.png)

### 5. 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    img {
        display: block;
        margin-bottom: 20px;
        width: 100%;
        height: 500px;
    }
</style>
</head>
<body>
  <div>
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg" alt="">
    <img src="default.jpg" data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
    <img src="default.jpg" data-src="../assets/img/banner.png" alt="">
  </div>
    
</body>
<script>
  let num = document.getElementsByTagName('img').length;
  let img = document.getElementsByTagName("img");
  let n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

  lazyload(); //页面载入完毕加载可是区域内的图片

  window.onscroll = lazyload;
  // 节流
  // window.onscroll = throttle(lazyload, 500);

  // 监听页面滚动事件
  function lazyload() { 
      // 可见区域高度clientHeight
      let seeHeight = document.documentElement.clientHeight
      // 滚动条距离顶部高度scrollTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
      for (let i = n; i < num; i++) {
          if (img[i].offsetTop < seeHeight + scrollTop) {
              if (img[i].getAttribute("src") == "default.jpg") {
                  console.log(img[i].getAttribute("data-src"))
                  img[i].src = img[i].getAttribute("data-src");
              }
              n = i + 1;
          }
      }
  }
</script>
</html>
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

