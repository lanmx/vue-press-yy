---
# NavLink
# prev:
#   text: Get Started
#   link: /guide/getting-started.html
# # NavLink - 外部 URL
# next:
#   text: GitHub
#   link: https://github.com
---
## 常用cmd命令，环境变量

### 1. cmd

- windows查看端口号使用情况


```js
netstat -ano
```

- 查看特定端口号进程


```json
netstat -ano |findstr "8888"
```

- 使用上箭头，快速定位到上一次执行的命令
- 使用tab键，快速补全命令
- 使用esc键，清空当前输入的命令
- 输入cls，清空终端

- .表示当前目录

- ..表示上一级目录
- dir： 列出当前目录下的所有文件
- cd 目录名：进入指定的目录
- md 目录名：新建文件夹
- rd 目录名：删除文件夹
- 文件名：打开文件
- c + 冒号：进入c磁盘



### 2.  环境变量

### （1）path

> 多个路径以；分开

当我们在命令行窗口打开一个文件，或调用一个程序时，系统会首先在当前目录下寻找文件或程序，如果找到了则直接打开，如果没有找到会依次在环境变量path中查找，如果没有找到则报错。

> 这个原理和js的作用域链是一样的道理，沿着作用域链找。

因此可以将经常访问的程序和文件的路径添加到path中，这样我们既可以在任意位置来访问这些文件和程序了。（也类似于给路径设置为全局）

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
