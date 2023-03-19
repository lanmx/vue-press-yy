# css响应式布局
cSS3媒体查询可以让我们针对不同的媒体类型定义不同的样式，
当重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

## 一.响应式实现方式
- 媒体查询(下面具体讲解）
- 流体布局（float）
- 弹性布局（flex）
- 通过 JavaScript、JQuery 进行判断来显示不同的布局页面
- Bootstrap 等第三方框架

### 媒体查询
媒体查询（Media Query）是CSS3新语法。
使用 @media 查询，可以针对不同的媒体类型定义不同的样式@media 可以针对不同的屏幕尺寸设置不同的样式，使用@media才能够实现页面响应式布局。
**语法：**
```css
@media[not|only] type [and][expr] (media feature){
 rules
}
```
**参数说明：**
1. type媒体类型：all(所有设备)、screen(用于电脑屏幕，平板电脑，智能手机等。)
2. media feature
（1）width(浏览器的窗口尺寸，可加min/max)
（2）device-width(设备的参数尺寸，可加min/max)
3. min-width：最小宽度，在媒体查询中，宽度大于或者等于最小宽度时，就触发其CSS样式
4. max-width：最大宽度，在媒体查询中，宽度小于或者等于最大宽度时，就触发其CSS样式
5. 一般都是先实现PC端页面，然后再去做其他设备的兼容（把媒体查询写在默认样式之后）
6. 设置宽度时，最好不要写死(px)，而是用%单位参照父元素的大小

```css
@media (min-width: 768px){ //>=768的设备 }
@media (min-width: 1200){ //>=1200的设备 }

注意下顺序，如果你把768px写在了下面那么会覆盖前面的

@media (min-width: 1200){ //>=1200的设备 }
@media (min-width: 768px){ //>=768的设备 }
因为如果是1440,由于1440>768那么你的1200就会失效。

所以我们用min-width时，小的放上面大的在下面。
同理如果是用max-width那么就是大的在上面，小的在下面。
@media (max-width: 1199){ //<=1199的设备 }
@media (max-width: 991px){ //<=991的设备 }
@media (max-width: 767px){ //<=768的设备 }

@media screen and (min-width:1200px){ 
  #page{
     width: 1100px; 
  }
} 
@media screen and (min-width: 960px) and (max-width: 1199px) { 
  #page{ 
    width: 960px; 
  }
@media only screen and (min-width: 480px) and (max-width: 767px){ 
  #page{ 
    width: 450px; 
  }
}
@media screen and (min-width:1200px){ 
  #page{
     width: 1100px; 
  }
}
```