## 盒子阴影box-shadow

```css
box-shadow:  offset-x  offset-y   blur  spread   color  inset;
box-shadow:  X轴偏移量  Y轴偏移量 [阴影模糊半径] [阴影扩展] [阴影颜色] [投影方式];
投影方式: blur:模糊 spread:伸展 inset:内凹
```

> offset-x：必需，取值正负都可。offset-x水平阴影的位置。
> offset-y：必需，取值正负都可。offset-y垂直阴影的位置。
> blur:          可选，只能取正值。blur-radius阴影模糊半径，0即无模糊效果，值越大阴影边缘越模糊。
> spread：  可选，取值正负都可。spread代表阴影的周长向四周扩展的尺寸，正值，阴影扩大，负值阴影缩小。
> color:        可选。阴影的颜色。如果不设置，浏览器会取默认颜色，通常是黑色,建议不要省略。可以是rgb(250,0,0)，也可以是有透明值的rgba(250,0,0,0.5)。
> inset:         可选。关键字，将外部投影(默认outset)改为内部投影。inset 阴影在背景之上，内容之下。



### margin塌陷

```css
1.position: absolute;
2.float: left/right;
3.overflow: hidden;
4.display: inline-block;
```


<Valine></Valine>
