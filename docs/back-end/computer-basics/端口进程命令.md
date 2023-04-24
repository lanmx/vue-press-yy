## 一、查看端口是否被占用

在cmd终端输入命令，看是否有列出占用进程；8100占用进程是2188；

```powershell
netstat -ano|findstr 8100
```

![image-20230307144850057](@alias/image-20230307144850057.png)

## 二、强制杀掉端口进程

输入2188，强制杀掉

```powershell
taskkill /pid 2188 -f -t
```

![image-20230307145030269](@alias/image-20230307145030269.png)