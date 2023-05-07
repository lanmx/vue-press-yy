## 苹果手机吸顶文字渲染失败且变形

资料参考：利用css3属性硬件加速

https://blog.csdn.net/u011140116/article/details/122898455

### 强制使用GPU渲染（transform和will-change）

为了避免 2D transform 动画在开始和结束时发生的 repaint 操作，我们可以硬编码一些样式来解决这个问题：

```css
.example1 {
    transform: translateZ(0);
    will-change: transform, opacity;
}

.example2 {
  	transform: rotateZ(360deg);
    will-change: transform, opacity;
}
```


这段代码的作用就是让浏览器执行 3D transform。浏览器通过该样式创建了一个独立图层，图层中的动画则有GPU进行预处理并且触发了硬件加速。

如果某一个元素的背后是一个复杂元素，那么该元素的 repaint 操作就会耗费大量的资源，此时也可以使用上面的技巧来减少性能开销。

### 简单暴力方法
给变形的字体一个`*ngIf` 或者 `v-if`属性

每次渲染前，设置属性为false，利用`v-if`的原理，直接把dom干掉

获取数据渲染完毕后，再给显示属性设置为`true`

简单暴力有快速解决了样式BUG
<ClientOnly>
  <Valine></Valine>
</ClientOnly>