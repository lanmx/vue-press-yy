## 1. git check-pick [head]

有时候会忘记切分支，导致代码提交在了master或者其他人分支上，这时候可以使用check-pick把commit 复制过来。

把A分支的commit提交合并到B分支：

1. git log查看提交记录
2. copy A分支的commit [head]
3. 然后git checkout [B分支] 切到B分支
4. git pull 或者 git pull origin [B分支] 拉取最新代码（养成习惯，每次都拉取一下远程最新的代码）
5. 最后check-pick [head] 复制commit提交

```shell
git check-pick 73ac5b28835d09042f6af5a4636bec8742cd7d47
```

## 2. 本地merge合并分支

工作中经常用到合并分支，例如说合代码到test测试分支，dev开发分支，或者说合代码到master。

这里教大家用命令在本地合并分支，例如，合并分支feature/A，目标分支dev

1. 先git checkout dev 切到dev分支
2. git pull 或者 git pull origin dev 拉取远程最新代码
3. git merge feature/A 合并分支操作
4. git push origin dev 更新远程分支

解决合并冲突也可以使用合并的方法。

例如，我在gitlab给提了merge给负责人，负责人审核代码，但是feature/B合并master冲突了，这时候，可以在本地在合一次master，解决完冲突之后，再更新远程分支即可解决冲突。

1. 先git checkout dev 切到master分支
2. git pull 或者 git pull origin master 拉取远程最新代码
3. git checkout feature/B 切换到我的分支
4. git merge master 合并master的最新代码到分支上
5. git push 或者 git push origin feature/B 更新远程分支
6. 在gitLab查看合并请求，冲突已经解决了。