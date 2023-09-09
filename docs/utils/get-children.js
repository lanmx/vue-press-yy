import fs from 'fs'
import path from 'path'
import { getDirname } from '@vuepress/utils'
const __dirname = getDirname(import.meta.url)
import fileUrlMap from './md-url-map'

function getChildren(path) {
  const root = []
  readDirSync(path,root)
  getFileTitle(root)
  // console.log(root,"root")
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
  let parent = basePath.substring(basePath.lastIndexOf('/')+1)
  let index = basePath.indexOf("/")
  // 去除一级目录地址
  basePath = basePath.slice(index,path.length)
  // replace用于处理windows电脑的路径用\表示的问题
  basePath = path.join(basePath,dirPath).replace(/\\/g,"/")
  // 获取文件标题
  let title = basePath.substring(basePath.lastIndexOf('/')+1, basePath.indexOf("."))
  const mdDirPath = path.join(__dirname, '../' + basePath).replace(/\\/g,"/")
  return {
    text: title,
    link: basePath,
    parent: parent,
    mdDirPath: mdDirPath
  }
}

function getFileTitle(root) {
  root.forEach(e => {
    const target = fileUrlMap.find(item => item.link === e.link)
    if (target) {
      e.text = target.text;
      e['url'] = 'https://blog.pengxiao.xyz' + target.link.replace('.md', '.html');
      e['describe'] = target.describe ? target.describe : target.text;
      e['label'] = target.label.split(',');
      e['publish_time'] = target['publish_time']
    }
  })
}

export default getChildren