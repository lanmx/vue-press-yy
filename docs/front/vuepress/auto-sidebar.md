vuepress的config.js文件sidebar配置可设置侧边栏目录；
```js
sidebar: {
  {
    text: '一级目录',
    children: [
      { text: 'xxx', link: '/data-struct/xxx.md'  },
      { text: 'xxxx', link: '/data-struct/xxxx.md'  },
      { text: 'xxxxx', link: '/data-struct/xxxxx.md'  },
      ...
    ]
  }
}
```
每次新增文章的时候，都需要配置目录名称和文章地址，不太灵活；

## 手写一个自动生成菜单列表
- 参数：传一个菜单目录的相对地址
- 功能：获取该菜单目录下的所有md文件名和路径
- 返回：对象数组格式返回该菜单目录下的所有md文件名和路径
```js
import fs from 'fs'
import path from 'path'
function getChildren(path) {
  const root = []
  readDirSync(path,root)
  return root
}

function readDirSync(path,root){
  var pa = fs.readdirSync(path);
  pa.forEach(function(ele,index){
    var info = fs.statSync(path+"/"+ele)
    if(info.isDirectory()) {
      readDirSync(path+ele,root)
    } else {
      if (checkFileType(ele)) {
        root.push(prefixPath(path,ele))
      }
    }
  })
}

function checkFileType(path) {
  return path.includes(".md")
}

function prefixPath(basePath,dirPath) {
  let index = basePath.indexOf("/")
  // 去除一级目录地址
  basePath = basePath.slice(index,path.length)
  // replace用于处理windows电脑的路径用\表示的问题
  basePath = path.join(basePath,dirPath).replace(/\\/g,"/")
  // 获取文件标题
  let title = basePath.substring(basePath.lastIndexOf('/')+1, basePath.indexOf("."))
  return {
    text: title,
    link: basePath
  }
}

export default getChildren
```

- 使用方法
```js
import getChildren from "../utils/get-children"
...
sidebar: {
'/front/': [
  {
    text: 'JavaScript基础',
    collapsible: true,
    children: getChildren('docs/front/javascript-basics/')
  },
  {
    text: '高级JavaScript教程',   // 必要的
    collapsible: true,
    sidebarDepth: 3,    // 可选的, 默认值是 2
    children: getChildren('docs/front/javascript/')
  },
]
}
```
这样就能自动获取该目录下所有的md文件路径和文件名了，自动生成菜单列表。
![](@alias/1679739104289.jpg)

<ClientOnly>
  <Valine></Valine>
</ClientOnly>
