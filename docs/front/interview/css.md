## 1. css垂直居中

- 父元素没有高度，可以用margin

- 父元素有高度，可以用line-height等于父元素高度；如果用p标签则需要把margin: 0；因为p标签默认有margin值；line-height适用控制单行文字

- 父元素有固定高度，有多行文字，可以给父元素设置弹性布局；

  ```js
  display: flex;
  justify-content: center;
  align-items: center;
  ```

  

- ul li标签的标题可以用table，建议用flex

  ```js
  ul {
      display: table
  }
  li {
      display: table-cell;
      vertical-align: middle
  }
  ```

- grid建议用来做多行多列布局

  ```js
  ul {
      display: grid;
     justify-content: center;
     align-items: center;
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

从大到小排序

### （2）align-self

align-self:  flex-end覆盖flex-container的align-items

### （3）flex-grow

均设1，则扩大，总和大余1，则平均，按比例扩大

### （4）flex-shrink

按比例缩小

### （5）flex-basis

flex-basis的优先级高于width



## 3. rem和em

在css中单位长度用的最多的是px、em、rem，这三个的区别是：

- px是固定的像素，px是相对长度单位，它是相对于显示器屏幕分辨率而言的，比较稳定和精确，但在浏览器中放大或缩放浏览页面时会出现页面混乱的情况，一旦设置了就无法因为适应页面大小而改变。

- em是相对长度单位，em是相对于父元素来设计字体大小的。如果当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺；em的值并不是固定的，它会继承父级元素的字体大小。

- rem是CSS3新增的一个相对单位，rem是相对单位，是相对HTML根元素。

  这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

- em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。对于em和rem的区别一句话概括：em相对于父元素，rem相对于根元素。

rem中的r意思是root（根源），这也就不难理解了。

默认的情况下：1em=16px
