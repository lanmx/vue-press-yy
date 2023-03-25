## overflow属性

### overflow

如果内容溢出一个元素的框，通过overflow属性设置效果

默认值为visible

> visible	  默认值。内容不会被修剪，会呈现在元素框之外。
> hidden	内容会被修剪，并且其余内容是不可见的。
> scroll	   内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
> auto	     如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
> inherit	 规定应该从父元素继承 overflow 属性的值。

### overflow-x

### overflow-y

overflow-x属性指定如果它溢出了元素的内容区是否剪辑左/右边缘内容。

overflow-y属性来判断顶部和底部边缘是否裁剪。

> visible	 	  不裁剪内容，可能会显示在内容框之外。
> hidden	 	 裁剪内容 - 不提供滚动机制。
> scroll	         裁剪内容 - 提供滚动机制。
> auto	           如果溢出框，则应该提供滚动机制。
> no-display	 如果内容不适合内容框，则删除整个框。
> no-content	如果内容不适合内容框，则隐藏整个内容。


<ClientOnly>
  <Valine></Valine>
</ClientOnly>