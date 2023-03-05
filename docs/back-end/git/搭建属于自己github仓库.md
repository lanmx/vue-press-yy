# 搭建属于自己github仓库
## 一、安装git
## 二、git配置
```js
git config --global user.name "lanmx"
git config --global user.email "1375881038@qq.com"
git config --list   // 查看配置信息
```
![git.jpg](@alias/git.jpg)

## 三、生成ssh密钥
```js
ssh-keygen -t rsa -C "1375881038@qq.com"
// 默认不输入，直接回车
```
在C:\Users\Admin文件夹下会自动生成.ssh文件
![ssh.jpg](@alias/ssh.jpg)

## 四、搭建github仓库.
- 设置ssh密钥
把id_rsa.pub文件里面的密钥全部赋值过来，在github的设置页，进去ssh直接添加；
- 点击新建仓库
![github-1.jpg](@alias/github-1.jpg)
- 输入仓库信息
![github.jpg](@alias/github.jpg)

## 五、上传个人项目到github仓库.
- git clone
把刚刚新建的项目仓库克隆到本地，再把个人项目放进该文件夹
- git add / commit / push 即可把项目上传到仓库
