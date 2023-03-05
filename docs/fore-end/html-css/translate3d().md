## translate3d()

`translate3d()` CSS 函数在3D空间内移动一个元素的位置。这个移动由一个三维向量来表达，分别表示他在三个方向上移动的距离

```css
<-- HTML标签 -->
<p class="transformed">bar</p>

<-- CSS标签 -->
.transformed {
  transform: perspective(500px) translate3d(10px,0px,0px);
  /* equivalent to perspective(500px) translateX(10px)*/
}
```

<Valine></Valine>
