---
title: git pull 时提示 Please enter a commit message to explain why this merge is necessary
description: git pull 时提示 Please enter a commit message to explain why this merge is necessary
meta:
  - name: keywords
    content: git pull
---
## 一、git pull 时提示 Please enter a commit message to explain why this merge is necessary

如何退出：

1. 按i键，进入插入（insert）描述操作，可以选择不输入
2. 按Esc键，结束插入描述操作
3. 按:wq，表示保存并结束本次操作
4. enter键即可结束本次错误信息



## 二、git push报错：Failed to connect to git.xxx.xxxx.com port 443 after 2026ms

![image-20220713210925409](@alias/image-20220713210925409.png)

### 解决方法
在github项目在本地的根目录下打开git命令行，执行下面的命令：

```ABAP
git config --global --unset http.proxy
```

再去PULL或者PUSH代码的时候接可以了

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
