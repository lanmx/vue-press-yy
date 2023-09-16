### BFC

Dlock Formatting Context：格式化上下文

指一个独立的渲染区域，可以理解为一个独立的空间，不会影响到外面的元素

#### 1. 触发BFC的条件：

- 根元素，即HTML元素
- 浮动元素：float值为left、right（float 除 none 以外的值）
- overflow值不为 visible，为 auto、scroll、hidden
- display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position的值为absolute或fixed

#### 2. BFC的特性

- 内部的box会垂直方向一个接着一个放置
- 对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关。
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- bfc的区域不会与float元素重叠
- 计算bfc高度，浮动元素也参与计算
- bfc独立的容器，容器里面的子元素不会影响到外面
