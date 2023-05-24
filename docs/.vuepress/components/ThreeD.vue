<template>
	<div class="pic">
		<!-- <div id="midground" class="wall"></div>
		<div id="foreground" class="wall"></div> -->
		<div class="show">
			<img src="@alias/a.jpg" alt="" class="box">
			<img src="@alias/b.jpg" alt="" class="box">
			<img src="@alias/c.jpg" alt="" class="box">
			<img src="@alias/d.jpg" alt="" class="box">
			<img src="@alias/e.jpg" alt="" class="box">
			<img src="@alias/f.jpg" alt="" class="box">
			<img src="@alias/g.jpg" alt="" class="square">
			<img src="@alias/h.jpg" alt="" class="square">
			<img src="@alias/i.jpg" alt="" class="square">
			<img src="@alias/j.jpg" alt="" class="square">
			<img src="@alias/k.jpg" alt="" class="square">
			<img src="@alias/l.jpg" alt="" class="square">
		</div>
	</div>
  
</template>
<script setup>

</script>
<style scoped>
*{
	padding: 0;
	margin: 0;
}
.pic{
	height: auto;
	width: 100%;
	/*溢出隐藏*/
	overflow:hidden;
}

/*满天星*/
.wall{
    position: absolute;
    top: 0;
    left: 0;
		bottom: -200px;
    right: 0;
    overflow: hidden;
}

@keyframes c {
	/*0％是开头动画，100％是当动画完成。*/
	/*为了获得最佳的浏览器支持，您应该始终定义为0％和100％的选择器。*/
	0%{
		background-position: 0 0;
	}
	100%{
		background-position: 1000% 0;
	}
}

div#midground{
	background: url("@alias/midground.png");
	/*溢出隐藏，内容超过显示布局，隐藏超出部分*/
	overflow: hidden;
	/*linear:表示动画从头到尾的速度都是相同的。*/
	/*infinite：设置动画无线循环播放。*/
	animation: c 240s linear infinite;
}

div#foreground{
	background: url("@alias/foreground.png");
	/*溢出隐藏，内容超过显示布局，隐藏超出部分*/
	overflow: hidden;
	/*linear:表示动画从头到尾的速度都是相同的。*/
	/*infinite：设置动画无线循环播放。*/
	animation: c 200s linear infinite;
}

.show{
	width: 200px;
	height: 200px;
	margin: 200px auto;
	position: relative;
	perspective: 2000px;
	/*实现3D效果*/
	transform-style: preserve-3d;  /*表示所有子元素在3D空间中呈现。*/
	transform: rotateX(20deg) rotateY(30deg); /*定义转换，只用X轴的值   定义转换，只用X轴的值*/
	transform-origin: 100px 100px 0;
	animation: move 6s linear infinite;
	/*  linear:每一步的距离和前一步都是相同的，也就是等速
	若不加linear，那会默认速度会加快然后最后一点距离再减速 */
}
/*大正方形样式*/
.show .box{
	position: absolute;
	width: 200px;
	height: 200px;
	opacity: 0.8;
	transition: 2.5s;
}
/* translateZ(z)  定义 3D 转换，只是用 Z 轴的值。*/
/* scaleY(y)   通过设置 Y 轴的值来定义缩放转换。*/
.show>img:nth-child(1){
	transform: rotateY(0deg) translateZ(100px);
}
.show>img:nth-child(2){
	transform: translateZ(-100px) rotateY(180deg);
}
.show>img:nth-child(3){
	transform: rotateY(90deg) translateZ(100px);
}
.show>img:nth-child(4){
	transform: rotateY(-90deg) translateZ(100px);
}
.show>img:nth-child(5){
	transform: rotateX(90deg) translateZ(100px);
}
.show>img:nth-child(6){
	transform: rotateX(-90deg) translateZ(100px);
}

/*小正方形*/
.show .square{
	display: block;
	width: 100px;
	height: 100px;
	left: 50px;
	top: 50px;
	position: absolute;
}
.show>img:nth-child(7){
	transform: rotateY(0deg) translateZ(50px);
}
.show>img:nth-child(8){
	transform: translateZ(-50px) rotateY(180deg);
}
.show>img:nth-child(9){
	transform: rotateY(90deg) translateZ(50px);
}
.show>img:nth-child(10){
	transform: rotateY(-90deg) translateZ(50px);
}
.show>img:nth-child(11){
	transform: rotateX(90deg) translateZ(50px);
}
.show>img:nth-child(12){
	transform: rotateX(-90deg) translateZ(50px);
}
/* cursor属性定义了鼠标指针放在一个元素边界范围内时所用的光标形状 */
.show:hover{
cursor: pointer;
}

.show:hover>img:nth-child(1){
	transform: rotateY(0deg) translateZ(200px);
}
.show:hover>img:nth-child(2){
	transform: translateZ(-200px) rotateY(180deg);
}
.show:hover>img:nth-child(3){
	transform: rotateY(90deg) translateZ(200px);
}
.show:hover>img:nth-child(4){
	transform: rotateY(-90deg) translateZ(200px);
}
.show:hover>img:nth-child(5){
	transform: rotateX(90deg) translateZ(200px);
}
.show:hover>img:nth-child(6){
	transform: rotateX(-90deg) translateZ(200px);
}

@keyframes move {
	0%{
		transform: rotateX(0deg) rotateY(0deg);
	}
	100%{
		transform: rotateX(360deg) rotateY(360deg);
	}
} 
</style>