## css样式

### 1. 文本一行超出省略号显示

```css
.text {
    width: calc(100% - 25px);
    // 不换行
    white-space: nowrap;
    // 超出省略号显示
    text-overflow: ellipsis;
    // 超出隐藏
    overflow: hidden;
}
```

### 2. 文本两行超出省略号显示

```css
.name-text {
    max-height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
}
```

### 3. 修改原生input样式

```css
input[type="text"] {
    outline: none;
    border: 0px;
}
```

### 4. 滚动条样式修改

```css
.conv-list {
    height: 168px;
    overflow-y: scroll;
    margin-top: 0px;
}
.conv-list::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等*/
    width: 8px;
    // height:10px;
    // display: none;
}
.conv-list::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
    background:#f5f7fa;
}
.conv-list::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分）*/
    background:#f5f7fa;
}
.conv-list::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分*/
    background: #00000033;
    border-radius:4px;
}
.conv-list::-webkit-scrollbar-corner {/*边角*/
    background: #c0c0c0;
}
```

### 5. 动画放大效果（`transition: all .2s cubic-bezier(.4,0,.2,1)`）

```css
.img-title-box {
    font-size: 14px;
}
.img-title-box:hover {
    font-size: 15px;
    // 动态放大效果
    transition: all .2s cubic-bezier(.4,0,.2,1);
}
.img-title-box {
    img {
        height: 60px;
        width: 60px;
    } 
}
.img-title-box:hover {
    img {
        height: 70px;
        width: 70px;
        transition: all .2s cubic-bezier(.4,0,.2,1);
    } 
}
```

### 6. 表格border-collapse

表格首行固定滑动内容导致表格边框也移动，给table加border-collapse: separate属性即可解决

```css
table {
   border-collapse: separate;
}
```

### 7. margin/padding右边距不显示

给外层box设置了左右margin，但是右边距的margin不显示。

```css
.table-box {
    position: relative;
    overflow: scroll;
    margin: 0px 10px;
    width: 100%;
}
```

解决办法：去掉width属性设置就可以显示了。

```css
.table-box {
    position: relative;
    overflow: scroll;
    margin: 0px 10px;
    /* width: 100%; */
}
```

<Valine></Valine>