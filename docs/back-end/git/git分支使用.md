## 一、Git重命名分支名称

### 1. 本地分支重命名（还没有推送到远程仓库）

```css
$ git branch -m oldName newName
```

### 2 远程分支重命名 （已经推送到远程仓库，并假设本地当前分支和远程对应分支名称相同）

###    2-1 重命名远程分支对应的本地分支

```css
$ git branch -m oldNme newName
```

###    2-2 删除远程分支

```css
$ git push --delete origin oldName
```

###   2-3 上传新命名的本地分支

```css
$ git push origin newName
```

###   2-4 把修改后的本地分支与远程分支关联

```css
$ git branch --set-upstream-to origin/newName
```



## 二、Git仓库与本地项目链接

1. 新建仓库
2. 配置密钥
3. git init 项目初始化
4. git remote远程连接


<Valine></Valine>
