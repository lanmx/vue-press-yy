## 1. css垂直居中的方法有哪些？

- 父元素有高度，可以用line-height等于父元素高度；如果用p标签则需要把margin: 0；因为p标签默认有margin值；line-height适用控制单行文字

- 使用flex布局，父元素有固定高度，有多行文字，可以给父元素设置弹性布局；

```css
display: flex;
justify-content: center;
align-items: center;
```

- 使用table表格布局：将容器元素的display属性设置为table，并将要居中的元素设置为display: table-cell; vertical-align: middle;。
ul li标签的标题可以用table，建议用flex
```css
.container {
  display: table;
}

.centered {
  display: table-cell;
  vertical-align: middle;
}
```
```css
ul {
    display: table
}
li {
    display: table-cell;
    vertical-align: middle
}
```

- 使用grid布局：将容器元素的display属性设置为grid，并使用place-items或align-self属性来实现垂直居中。grid建议用来做多行多列布局
```css
.container {
  display: grid;
  place-items: center;
} 
.centered {
  align-self: center;
}
```
```css
ul {
  display: grid;
  justify-content: center;
  align-items: center;
}
```
- 使用绝对定位和transform属性：将要垂直居中的元素设置为绝对定位，并设置top和left属性为50%，然后使用transform属性的translateY(-50%)将元素向上平移50%的高度。
```css
.container {
  position: relative;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 2. flex

- 父元素开启flex

```css
display:flex
display:inline-flex  行内元素
```

### 父元素属性

### （1）flex-direction

- 主轴叉轴方向 main cross

```css
flex-direction: row/row-reverse,主轴方向改变
flex-direction: coloum/coloum-reverse,从下到上
```

### （2）justify-content（main方向）

-   justify-content: space-evenly

![image-20220219105746261](@alias/image-20220219105746261.png)

- justify-content: space-between;

![image-20220219105759918](@alias/image-20220219105759918.png)

- justify-content: space-around;

![image-20220219105818974](@alias/image-20220219105818974.png)

- justify-content: center;

![image-20220219110001845](@alias/image-20220219110001845.png)

![image-20220219105933768](@alias/image-20220219105933768.png)

### （3）align-items（单行）（cross方向）

决定了flex items在cross axios的对齐方式

- normal(类似stretch)：拉伸
- flex-start
- flex-end
- center
- baseline以基准线对齐，第一行为准，例如文字第一行文字对齐

### （4）align-content（多行）（cross方向）

- flex-start

- flex-end

- center

- space-between

- space-evenly

- space-around

### （5）flex-wrap

- wrap
- nowrap

### 项目属性

flex是flex-grow（放大），flex-shrink（缩小），flex-basis（宽度）三个属性值的缩写

默认值为 flex: 0 1 auto; 后两个属性可选 

### （1）order
数值小的Flex项将会排在数值大的Flex项的前面。

### （2）align-self

align-self: auto|stretch|center|flex-start|flex-end|baseline|initial|inherit;

align-self 属性定义flex子项单独在侧轴（纵轴）方向上的对齐方式。

注意：align-self 属性可重写灵活容器的 align-items 属性。


### （3）flex-grow

均设1，则扩大，总和大余1，则平均，按比例扩大

### （4）flex-shrink
用于指定 flex 项目在空间不足时的缩小比例，默认为 1。

当flex容器空间不足时候, 单个元素的收缩比例。

如果元素不是弹性盒对象的元素，则 flex-shrink 属性不起作用。

默认为1，即如果空间不足，该项目将缩小。

如果所有项目的 flex-shrink 属性都为1，当空间不足时，都将等比例缩小。

如果一个项目的 flex-shrink 属性为0，其他项目都为1，则空间不足时，前者不缩小。
### （5）flex-basis
flex-basis: auto | width | initial | inherit;

此CSS属性指定flex项目的初始大小。它仅适用于flex-items

- auto：是默认值。此值将项目的宽度设置为等于其width属性的值（如果已定义）。但是，如果未为flex-item指定width属性，则会根据内容设置宽度。
- width：此值是使用相对或绝对单位定义的。它定义了弹性项目的初始长度。不允许负值。
- initial：将属性设置为其默认值。
- inherit：来自其父元素的属性。


## 3. px,rem和em的区别

在css中单位长度用的最多的是px、em、rem，这三个的区别是：

- px是固定的像素，像素（Pixel）是一个绝对单位，表示屏幕上的一个物理像素点。使用像素单位（px）指定的尺寸大小在不同屏幕上具有固定的像素值，不会根据屏幕大小或父元素的尺寸而改变。

- em 元素像素（Element EM）也是一个相对单位，相对于父元素的字体大小来计算。这意味着一个元素的 em 值是相对于其直接父元素的字体大小而言的。

如果一个元素未显式地设置字体大小，则会继承其父元素的字体大小。例如，如果一个父元素的字体大小设置为 20 像素，而一个子元素的宽度设置为 2em，则子元素的宽度将为 40 像素（2 乘以父元素的字体大小）。

em 单位可以被嵌套使用，即一个元素的 em 值可以相对于其祖父元素的字体大小来计算，以此类推。

- rem是CSS3新增的一个相对单位，rem是相对单位，是相对HTML根元素。

  这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

- em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。对于em和rem的区别一句话概括：em相对于父元素，rem相对于根元素。

rem中的r意思是root（根源），这也就不难理解了。

默认的情况下：1em=16px

## 4. display:none; 和 visibility:hidden; 的区别是什么？
display:none; 彻底消失，释放空间。能引发页面的reflow回流（重排）。

visibility:hidden; 就是隐藏，但是位置没释放，好比opacity:0; 不引发页面回流。

## 5. CSS 优先级和权重值如何计算
内嵌样式>内部样式>外部样式>导入式

！important > 内嵌 1000 >Id 100 > class=[]=伪类 10 > tag=伪元素 1 > ( * + > ~) 0
## 6. 如何触发BFC，以及BFC的作用
BFC：块级格式化上下文block formatting context，是一个独立渲染区域。规定了内部box如何布局，并且与这个区域外部毫不相干。

触发：
- float的值不是none；
- position的值不是static或者relative；
- display的值是inline-block、block、table-cell、flex、table-caption或者inline-flex；
- overflow的值不是visible。

作用：避免margin重叠；自适应两栏布局；清除浮动。

## 7. CSS盒模型
CSS盒模型有两种：标准盒模型和怪异盒模型（也叫IE盒模型）。

标准盒模型（box-sizing: content-box）是CSS规范定义的盒模型，默认的盒模型。在标准盒模型中，一个元素的宽度（width）和高度（height）仅包括内容区域（content），不包括填充区域（padding）、边框区域（border）和外边距区域（margin）。这意味着设置元素的宽度和高度只会影响内容区域的大小，而填充、边框和外边距会增加元素的总尺寸。

怪异盒模型（box-sizing: border-box）是由Internet Explorer 5.5之前的版本引入的一种特殊的盒模型，后来其他浏览器也支持了这种盒模型。在怪异盒模型中，一个元素的宽度（width）和高度（height）包括了内容区域（content）、填充区域（padding）和边框区域（border），但不包括外边距区域（margin）。这意味着设置元素的宽度和高度会影响整个盒模型的大小，包括内容、填充和边框。

可以使用CSS的box-sizing属性来指定盒模型的类型。默认情况下是标准盒模型（box-sizing: content-box），若要使用怪异盒模型，可以将box-sizing设置为border-box。

小结：怪异盒子模型的宽高是定死的，设置 padding 或 border 不会影响页面布局。怪异盒子模型的 width 或 height 等于 content + padding + border 的宽或高。