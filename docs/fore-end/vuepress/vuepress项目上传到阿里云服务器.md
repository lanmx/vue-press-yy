## 一、宝塔面板

宝塔面板安装参考：[【官方教程】宝塔Linux面板安装教程](https://www.bt.cn/bbs/thread-19376-1-1.html)
## 二、vuepress项目搭建
[vuepress](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85)

## 三、宝塔软件安装
### 1. Nginx / Apache 
根据个人需求任意安装一个，用于反向代理做域名绑定或80端口访问使用
![](@alias/1679724777239.jpg)
### 2. Node.js版本管理器
下载nodejs版本管理器
![](@alias/1679740471786.jpg)
记得要设置Node.js版本，如果需要使用命令行模式安装vuepress，则必须设置，否则无法使用命令行模式

## 四、建立网站及上传dist打包文件
### 1. 新建网站
![](@alias/1679725470214.jpg)
vuepress是静态网站，记得数据库选择 【不创建】，PHP版本选择【纯静态】
### 2. 打开网站目录，删除所有默认文件
![](@alias/1679725687111.jpg)
user.ini文件无法被批量删除，就点击文件右侧的删除按钮进行删除
### 3. 申请SSL证书
申请SSL证书之前，确保域名已解析，如未解析会导致申请失败。

例如我购买的是阿里云域名，域名备案申请通过之后，登录阿里云域名列表，点击云解析DNS，添加一条记录即可；
![](@alias/1679726027009.jpg)
### 4. 部署vuepress项目
1. 在本地项目运行yarn build打包项目
2. 把项目生成的dist文件内容全部copy到网站目录下
![](@alias/1679726395697.jpg)
浏览器访问域名，打开项目了！！
![](@alias/1679726254775.jpg)

<Valine></Valine>