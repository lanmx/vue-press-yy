```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<style>
body {
	--maxtop: -260px;
	--durtime: 9s;
}
.box
{
	width:400px;
	height:200px;
	overflow-y: scroll;
}
.content{
	position:relative;
	animation:mymove 9s linear;
	-webkit-animation:mymove 9s linear; /*Safari and Chrome*/
	animation-iteration-count: infinite;
	animation-duration:var(--durtime);
	-webkit-animation-duration:var(--durtime); /* Safari 和 Chrome */
}
/*滚动条样式*/

.box::-webkit-scrollbar {/*滚动条整体样式*/
	/* width:4px;高宽分别对应横竖滚动条的尺寸 */
	/* height:4px; */
	scrollbar-width: thin;
}

/* .box::-webkit-scrollbar-thumb { */
	/*滚动条里面小方块*/
	/* border-radius:5px;
	-webkit-box-shadow: inset005pxrgba(0,0,0,0.2);
	background:rgba(0,0,0,0.2); */
/* } */

/* .box::-webkit-scrollbar-track { */
	/*滚动条里面轨道*/
	/* -webkit-box-shadow: inset005pxrgba(0,0,0,0.2);
	border-radius:0;
	background:rgba(0,0,0,0.1); */
/* } */
.box::-webkit-scrollbar{
	/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
	width:10px;
	/* height:10px; */
}
/* .box::-webkit-scrollbar-button{
	background:#c0c0c0;
	height: 2px;
} */
.box::-webkit-scrollbar-track{
	/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
	background:#f8f9fa;
}
.box::-webkit-scrollbar-track-piece{
	/*内层轨道，滚动条中间部分（位置4）*/
	background:#f8f9fa;
}
.box::-webkit-scrollbar-thumb{
	/*滚动条里面可以拖动的那部分（位置5）*/
	background: #00000033;
	border-radius:4px;
}
.box::-webkit-scrollbar-corner {
	/*边角（位置6）*/
	background: #c0c0c0;
}
/* .box::-webkit-scrollbar-resizer { */
	/* background: #FF0BEE; */
/* } */

@keyframes mymove
{
	from {top:0px;}
	to {top:var(--maxtop);}
}

@-webkit-keyframes mymove /*Safari and Chrome*/
{
	from {top:0px;}
	to {top:var(--maxtop);}
}
</style>
</head>
<body>

<p><strong>注意: </strong> Internet Explorer 9 及更早IE版本不支持 animation 属性。</p>

<div class="box">
	<div class="content">
		<p>网址11111网址11111网址</p>
		<p>版本不支持animation 属性</p>
		<p>便捷中心网址333333</p>
		<p>便捷中心网址44444444444444</p>
		<p>睡觉睡觉睡觉555</p>
		<p>土豪土豪土豪666666</p>
		<p>吃吃饭吃饭</p>
	</div>
	<div class="content">
		<p>网址11111网址11111网址</p>
		<p>版本不支持animation 属性</p>
		<p>便捷中心网址333333</p>
		<p>便捷中心网址44444444444444</p>
		<p>睡觉睡觉睡觉555</p>
		<p>土豪土豪土豪666666</p>
		<p>吃吃饭吃饭</p>
	</div>
</div>

</body>
</html>
```