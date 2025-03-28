## 前端模块化

前端模块化：AMD / CMD / CommonJS / ES6

模块化的核心：导入导出（变量，函数，类，组件）

### 1. CommonJS

- 导入

  ```js
  module.exports = {
      flag: true,
      testFn(a,b) {
          return a + b
      }
  }
  ```

- 导出

  ```js
  let { flag, testFn } = require('moduleA')
  // 等价于
  let _MA = require(moduleA)
  let fn = _MA.testFn()
  ```

  

### 2. ES6的模块化

- 导出

  ```js
  	let bol = true,
      testFn(a,b) {
          return a + b
      }
  	export {
  		bol,testFn
  	}
      // 也可以这样写
      export let name = 'lanminxiao'
      
  ```

- 导入

  ```js
  import { testFn, bol,name } from '../mA'
  // 导入的东西太多，可以全部导入，不用一个个写
  import * as mA from '../mA'
  mA.testFn()
  ```

- `export default` 

  1. 默认只能有一个导出
  2. 导入者可以自己自定义名字

  ```js
  export default name
  import myName from '../'
  ```

### 3. 打包工具与模块化的关系

- 大多浏览器支持ES6规范，所以可以直接使用；

- 不支持AMD/CMD/CommonJS规范，浏览器不能识别，因此需要webpack等打包工具转化
- ES6之前，模块化开发必须借助其他工具；
- webpack其中一个核心就是可以模块化开发，并且会帮助我们处理模块间的依赖关系
- webpack不仅仅可以处理JavaScript文件，还能处理CSS，图片，json图片等

### 4. 打包

打包可以理解为将webpack中各种资源模块进行打包合并成一个或者多个包（Bunble）

打包过程中，可以对资源进行处理，例如压缩图片，将scss转换为css，将ES6语法转成ES5，将TypeScript转成javaScript


<ClientOnly>
  <Valine></Valine>
</ClientOnly>