import filesystem from 'fs'
import path from 'path'

/**
 * 读取文件路径下的子目录
 * @param {*} dir 文件路径
 * @param {boolean} allFile 是否读取所有目录下的文件。默认否；仅读取当前目录下的文件
 * @returns 
 */
var getChildFloders = function(dir, allFile) {
  var results = [];
  filesystem.readdirSync(dir).forEach(function(file) {
      file = dir+'/'+file;
      var stat = filesystem.statSync(file);
      if(allFile) {
        if (stat && stat.isDirectory()) {
          results = results.concat(getChildFloders(file))
        } else {
          // 提取文件夹
          if(isDirectory(file)) {
            // 读取文件夹名称
            results.push(fileName(file));
          }
        }
      } else {
        if(isDirectory(file)) {
          results.push(fileName(file));
        }
      }
  });
  return results;
};

// 判断是否为文件夹
var isDirectory = function(dir) {
  var stat = filesystem.lstatSync(dir);
  return stat.isDirectory()
}
// 读取文件夹
var fileName = function(dir) {
  dir = path.join(dir).replace(/\\/g,"/")
  return {
    text: dir.substring(dir.lastIndexOf('/')+1),
    link: dir
  }
}

export default getChildFloders
