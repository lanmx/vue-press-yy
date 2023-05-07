# Webpack

打包工具：webpack / Vite / grunt / gulp / rollup

- 如果项目工程模块依赖非常简单，或者没有模块化的概念，只需要简单的压缩、合并，使用 grunt / gulp 即可

- 反之，项目使用了模块化管理，相互依赖非常强，用webpack

- grunt / gulp更加强调前端流程的自动化，模块化不是核心
- webpack更加强调模块化开发管理，而文件压缩合并，预处理等功能，只是附带功能

webpack：

1. webpack依赖node环境
2. node环境正常运行依赖很多包，npm可以用来管理这些包（npm:  node packages manager）
3. Node.js自带npm软件包管理工具

## 一、webpack的安装

```js
// 指定版本全局安装
npm install webpack@3.6.0 -g
// 开发时依赖，打包后不再需求
npm install webpack --save dev
```

## 二、webpack打包

```js
// 把src文件夹下的main.js文件打包在dist文件夹的bundle.js
// 如果main.js文件依赖其它文件，也会把其它文件一并打包
> webpack 入口文件 打包目标
> webpack ./src/main.js ./dist/bundle.js
// bundle.js打包文件里会生成一些函数代码来支持一些浏览器不支持的代码
```

#### （1） 配置webpack打包命令

需求：我只需要输入webpack命令就立刻帮我打包文件，这时候就需要先配置好webpack打包的入口以及打包目标文件

通过webpack.config.js文件配置，把入口参数和打包目标文件配置好

#### （2） webpack.config.js配置

```js
const path = require('path') // 路径动态获取依赖包

module.export = {
  // （一）、入口出口文件打包配置
  // 打包入口文件
  entry: './src/main.js',
  // 打包出口文件
  output: {
    // （1）打包出口文件的路径
    // path: './dist'
    // 动态获取路径：
    path: path.resolve(_dirname, 'dist'), // 第一个参数是保存路径的变量，第二个参数的文件夹的名字
    // （2）打包出口文件的文件名
    filename: 'bundle.js',
      // 资源的公共路径
    publicPath: 'dist/'
  },
      
  // （二）、css/less/图片文件配置
  module: [
        // 2.1css文件解释
    {
      // 正则表达式匹配.css文件
      test: /\.css$/i,
      // 把匹配到的文件应用下面两个loader，webpack读取多个loader,会从右向左查找，因此css-loader放在最后，style-loader放在前面，顺序不能交换
      use: ["style-loader", "css-loader"],
    },
    // 2.2 less文件解释
    {
      test: /\.less$/i,
      loader: [
        // compiles Less to CSS
        // 'style-loader',
        // 'css-loader',
        // 'less-loader',
        // 也可以写成对象
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'less-loader'
        }
      ],
    },
    // 2.3图片资源处理
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
              // 小于limit,图片编译成based4字符串(图片命名会以hash哈希)
              // 大于limit,图片编译需要使用file-loader
              limit: 1300,
              // 图片命名规范
              name: 'img/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    // 2.4 ES6转ES5处理
    {
      test: /\.m?js$/,
      // exclude：排除、不包括； include包含
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ],
  resolve: {
    // 导出文件的时候可以省略后缀名
    extensions: ['.js', '.vue', '.css'],
    // alias别名
    alias: {
      // 指定vue访问路径
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```

`npm init`命令生成`package.json`文件

`npm install`命令安装项目依赖的文件，`package.json`也会更新

#### （3） npm run build

需求：希望通过`npm run build`打包项目，希望通过`npm run serve`启动项目;

在package.json配置文件的scripts脚本下加入`'build'`：'入口文件路径'即可

#### （4）全局命令和局部命令

终端运行的命令：全局

git运行命令：局部，加上-g可以运行全局命令

项目目录webpack命令是全局打包，如果想本地打包则需要进入node_modules/webpack ... 

定义脚本的好处：在package.json里面配置了脚本，会优先运行本地的，找不到再去全局找

## 三、package.json配置

```js
{
    name: ''
    version: ''
    description: ''
    main:
    // 脚本
    script: {
        test: ''
        build: ''
        server: ''
        // --open自动打开本地网页
        dev: 'webpack-dev-server --open'
    }
    author:
    license:''
    // 开发时依赖(运行npm install webpack@3.6.0 --save dev自动生成)
    devDependencies: {
        webpack: '^3.6.0'
    }
    // 运行时依赖，npm install安装依赖自动生成
    dependencies: {
        
    }
}
```

#### （1）scripts脚本

package.json的scripts的脚本在执行顺序：

1. 首先，在本地的node.modules/bin路径中对应的路径
2. 如果没找到，到全局的环境变量找

## 四、loader

webpack可以处理js代码，并且自动处理js之间的依赖关系；但在项目中不仅仅有js代码，也有less，vue，jsx，TypeScripts和图片等资源；这些资源webpack不支持转化；

解决办法：给webpack拓展loader

#### （1）loader使用

1. npm安装
2. 在webpack.config.js的modules关键字下配置

#### （2）css-loader、style-loader（css文件处理）

#### （3）css-loader、style-loader、less-loader（less文件处理）

#### （4）url-loader、file-loader（图片文件处理）

#### （5）babel-loader、babel-core、babel-preset-env（ES6转ES5）

```js
npm install -D babel-loader @babel/core @babel/preset-env webpack
用法
```

详细看webpack.config.js的 配置



## 五、vue.js的配置

#### 1. 安装vue

#### 2. runtime-only和runtime-compiler

- runtime-only:  代码中不能有template

- runtime-compiler:  代码中，可以有template，因为compiler可以用于编译template

#### 3. el和template

同时写el和template：

template变量里面可以写html代码或者引用组件，挂载时会替换id="app"的全部内容

![image-20220213180507245](@alias/image-20220213180507245.png)

#### 4. .vue文件封装

下面代码的加载需要vue-loader和vue-template-complier处理，开发时依赖。

下载完还要配置，见webpack.config.js

```js
<template>
  <!-- html代码 -->
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
```



## 六、插件plugin

webpack中的插件，是对webpack现有功能的各种扩展，例如打包优化，文件压缩；

#### 1. 如何使用plugin:

1. npm下载需要的插件
2. 在webpack.config.js中的plugins配置插件

#### 2. plugin和loader的区别

loader类似转换器

plugin对webpack本身的扩展

#### 3. 版权声明的plugin

#### 4. 打包html入口文件的plugin

index.html没有在dist文件里面，打包js就会没有意义，因此需要将index.html打包到dist文件中，可以使用HtmlWebpackPlugin插件。

- HtmlWebpackPlugin可以自动生成index.html文件
- HtmlWebpackPlugin可以将打包的js文件，自动通过script标签插入body中

#### 5. 压缩js的插件

uglifyjs-webpack-plugin（丑化js插件）



## 七、搭建本地服务器devServer

webpack提供了本地开发服务器，基于node.js，使用express框架

webpack-dev-server（使用前需求安装）

#### 1. 设置devserver

- contentBase：为哪个文件提供本地服务，默认根文件夹
- port：端口号
- inline：页面实时刷新
- historyApiFallback：在SPA页面中，依赖HTML5的history模式



## 八、配置文件的分离

开发环境和发布环境的配置分离成两个文件

#### 1. base.config.js

#### 2. dev.config.js

#### 3. prod.config.js

#### 4. webpack-merge插件

这个插件可以帮助我们将分离的配置文件合并



## 九、脚手架CLI

CLI（command-Line Interface）命令行界面，俗称脚手架

脚手架可以快速搭建Vue开发环境以及对应的webpack配置，大型项目建议使用CLI，考虑代码目录结构，项目结构和部署、热加载、代码单元测试

#### 1. Vue CLI使用前提一：node

安装node.js;

npm是Nodejs包管理和分发的管理工具

经常使用npm来下载安装开发过程中的依赖包

npm下载很慢，可以安装cnpm淘宝镜像

#### 2. Vue CLI使用前提二：webpack

#### 3. 安装Vue脚手架

```js
npm install -g @vue/cli

yarn global add @vue/cli
```

#### 4. 脚手架初始化项目

CLI2：

```js
vue init webpack my_project
```

CLI3：

```js
vue create my_project
```

#### 5. 脚手架2

- Author：默认.gitconfig的配置
- Vue build: 
  1. Runtime + complier
  2. Runtime + only
- vue-router：
- Set up unit tests
- e2e  with Nightwatch（端到端测试）

![image-20220213223346051](@alias/image-20220213223346051.png)

#### 6. CLI2目录结构

- static：这个文件夹下的内容会原封不动的打包
- .babelrc：pressets env命令独立生成；（时长份额大于1%，最新两个版本，ie > 8）

![image-20220213225910394](@alias/image-20220213225910394.png)

- .editorconfig文件

  ```js
  root = true // 为true时后面代码才执行
  
  insert_final_newline = true
  ```

- package-lock.json

  package-lock.json：记录的是真实的版本

  package.json是指定大概的版本

  这个文件用来映射node_modules下载的版本

  "^3.4.5"

  "~4.5.6"

  ^ ~下载版本的范围

#### 7. 脚手架3



## 九、优化webpack构建

优化`webpack`构建的方式有很多，主要可以从优化搜索时间、缩小文件搜索范围、减少不必要的编译等方面入手

[提高打包速度](https://juejin.cn/post/6844904071736852487)

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

