:frowning_man: 前端面试webpack打包工具必问，特别是面试中高级工程师，回答问题时要全面，深度也要够:muscle:，才能深的面试官认可噢~加油鸭ヾ(◍°∇°◍)ﾉﾞ :duck::duck::duck:
## 1、webpack的构建流程
webpack的构建流程是一个串行的过程。从启动到结束会依次执行下面过程：
![](@alias/1b1f6127fd15fb8cf4557aa078febce2.png)
### （一）初始化参数。
从配置文件（默认webpack.config.js）和shell语句当中读取和合并参数，构建内部Options对象，包括Entry和Output等基本参数，还包括Loader和Plugin的配置参数，得出最终参数。

### （二）开始编译。
用上一步得到的参数初始化Complier对象，通过执行Complier对象的run方法启动编译。Compiler对象是Webpack的主要实例，继承了Tapable，其中定义了许多钩子函数(hooks)。Webpack在不同的阶段通过触发不同的钩子函数来执行相应的任务。
### 拓展
webpack的钩子函数
```js
const { SyncHook, SyncBailHook, AsyncSeriesHook } = require("tapable");
class Compiler {
  constructor() {
    // 1. 定义生命周期钩子
    this.hooks = Object.freeze({
      // ...只列举几个常用的常见钩子，更多hook就不列举了，有兴趣看源码
      done: new AsyncSeriesHook(["stats"]),//一次编译完成后执行，回调参数：stats
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),//在编译器开始读取记录前执行
      emit: new AsyncSeriesHook(["compilation"]),//在生成文件到output目录之前执行，回调参数： compilation
      afterEmit: new AsyncSeriesHook(["compilation"]),//在生成文件到output目录之后执行
      compilation: new SyncHook(["compilation", "params"]),//在一次compilation创建后执行插件
      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),//在一个新的compilation创建之前执行
      make:new AsyncParallelHook(["compilation"]),//完成一次编译之前执行
      afterCompile: new AsyncSeriesHook(["compilation"]),
      watchRun: new AsyncSeriesHook(["compiler"]),
      failed: new SyncHook(["error"]),
      watchClose: new SyncHook([]),
      afterPlugins: new SyncHook(["compiler"]),
      entryOption: new SyncBailHook(["context", "entry"])
    });
    // ...省略代码
  }
}
```
这里列几个常用的钩子函数：
> 常用的钩子函数：
> make: 编译完成前
> done: 编译完成后
> beforeRun: 在编译器执行前
> run: 在编译器开始读取记录前执行
> emit: 文件提交到dist目录前
> afterEmit: 文件提交到dist目录后
> compilation: 创建compilation后
> beforeCompile: 在编译前
> compile: 创建compilation前

执行了run方法后，首先会触发compile，主要是构建一个Compilation对象，该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象。主要流程如下：
- compile 开始编译
- make 从入口点分析模块及其依赖的模块，创建这些模块对象
- build-module 构建模块
- seal 封装构建结果
- emit 把各个chunk输出到结果文件
- compile 编译

### （三）确定entry入口
根据配置中的entry找出所有的入口文件。

### （四）编译模块（解析依赖模块递归生成依赖关系图）
从入口文件出发，调用modules.rules所有配置项的loader对象模块进行相应的转换处理，转换后，再找出当前模块依赖的其它模块，再递归本步骤直到所有入口依赖的文件都经过处理。

### （五）完成编译模块
经过第四步后，得到每个模块被编译之后的最终内容和他们之间的关系。

### （六）输出资源结果
根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chuck，再将每个chuck转换成一个单独的文件加入输出列表中，这是可以修改输出内容的最后机会。（在依赖关系图的基础上，Webpack通过插件机制进行优化和增强，在适当的时候生sourcemaps和索引表等文件，）

### （七）输出完成
再确定输出内容后，根据配置的output参数，将文件的内容写入到文件系统中。


简单讲述webpack构建流程：

webpack启动后，从entry入口开始，递归解析entry依赖的所有module，找到每个modules.rules里配置的loader进行相应的转换处理，对module转换后，解析当前模块依赖的其它模块，解析的结果是一个一个chunk，最后webpack会将所有的chunk转换成文件输出的output。在整个构建过程中，webpack会在恰当的时机执行plugin当中的插件，完成plugin的任务。

webpack主要配置项：

entry：模块入口，使得源文件加入到构建流程中。入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始。
进入入口起点后,webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
每个依赖项随即被处理,最后输出到称之为 bundles 的文件中。

output：配置打包文件生成出口。output 属性告诉 webpack 在哪里输出它所创建的 bundles,以及如何命名这些文件,默认值为 ./dist。
基本上,整个应用程序结构,都会被编译到你指定的输出路径的文件夹中

module：配置各种类型的模块的处理规则

loader: loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块,然后你就可以利用 webpack 的打包能力,对它们进行处理。
本质上,webpack loader 将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

plugin：配置拓展插件。loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。
插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能极其强大,可以用来处理各种各样的任务

devServer：实现本地服务，包括http  模块热替换  sourse map等服务


## 2、plugin和loader的区别
### （一）loader
loader直译为“加载器”。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

loader用于对模块源码的转换，loader描述了webpack如何处理非javascript模块，并且在buld中引入这些依赖。loader可以将文件从不同的语言（如TypeScript）转换为JavaScript，或者将内联图像转换为data URL。比如说：CSS-Loader，Style-Loader等。

一个loader的职责是单一的，只需要完成一种转换。一个loader其实就是一个Node.js模块。当需要调用多个loader去转换一个文件时，每个loader会链式的顺序执行。

loader它只专注于转化文件（transform）这一个领域，完成压缩，打包，语言翻译
; 而plugin不仅只局限在打包，资源的加载上，还可以打包优
化和压缩，重新定义环境变量等。
### （二）plugin
plugin可以为loader带来更多特性。

Plugin直译为“插件”。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。

webpack提供了很多开箱即用的插件：CommonChunkPlugin主要用于提取第三方库和公共模块，避免首屏加载的bundle文件，或者按需加载的bundle文件体积过大，导致加载时间过长，是一把优化的利器。而在多页面应用中，更是能够为每个页面间的应用程序共享代码创建bundle。

### （三）用法不同
Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

### （四）运作时间不同

loader运行在打包文件之前（loader为在模块加载时的预处理文件）；plugins在整个编译周期都起作用。

## 3、如何优化webpack

打包后，dist文件目录过大怎么解决：
- dist中生成的.map，可以把这个map文件去掉，在vue.config.js配置文件中：productionSourceMap:false

- 按需加载UI组件可以减少文件的大小

- 文件和图片的压缩 compression-webpack-plugin

最小化代码minisize(true)

分割代码：splitChunks，超过限定值的文件进行压缩，threshold: 文件大小（字节为单位）

图片的压缩，如果要求图片像素，建议把连接访问图片，可以把图片放在图床或者服务器上。

开启多进程打包：

- thread-loader（webpack4 官方推荐）
- HappyPack

合理利用缓存（缩短连续构建时间，增加初始构建时间）

优化压缩时间

`ParallelUglifyPlugin` 插件实现了多进程压缩，`ParallelUglifyPlugin` 会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，每个子进程其实还是通过 `UglifyJS` 去压缩代码，但是变成了并行执行。 所以 `ParallelUglifyPlugin` 能更快的完成对多个文件的压缩工作。

webpack4 中 `webpack.optimize.UglifyJsPlugin` 已被废弃。

也不推荐使用 ParallelUglifyPlugin，项目基本处于没人维护的阶段，issue 没人处理，pr没人合并。

webpack4 默认内置使用 `terser-webpack-plugin` 插件压缩优化代码，而该插件使用 `terser` 来缩小  `JavaScript` 。

本地开发效率：热更新


## 4、用过webpack哪些优化打包插件
### （0）常见的loader和plugin插件
Loader:
1. 样式：style-loader、css-loader、less-loader、sass-loader等
2. 文件：raw-loader、file-loader 、url-loader等
Plugin:
1. webpack内置UglifyJsPlugin，压缩和混淆代码,通过UglifyES压缩ES6代码。
2. webpack内置CommonsChunkPlugin，提取公共代码,提高打包效率，将第三方库和业务代码分开打包
3. ProvidePlugin：自动加载模块，代替require和import
### （1）hard-source-webpack-plugin
HardSourceWebpackPlugin是webpack的插件，为模块提供中间缓存步骤。为了查看结果，您需要使用此插件运行webpack两次：第一次构建将花费正常的时间。第二次构建将显着加快（大概提升90%的构建速度）
```js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new HardSourceWebpackPlugin(),
        ]
      }
    }
  },
```
可选配置项
```js
new HardSourceWebpackPlugin({
	//忽略缓存mini-css-extract-plugin模块
  	test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
    // 果清除了node_modules，则缓存也是如此
    cacheDirectory:'node_modules/.cache/hard-source/[confighash]',
    // Either an absolute path or relative to webpack's options.context.
    // Sets webpack's recordsPath if not already set.
    recordsPath:'node_modules/.cache/hard-source/[confighash]/records.json',
    // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
    // 置构建不同的缓存
    configHash: function(webpackConfig) {
       // node-object-hash on npm can be used to build this.
       return require('node-object-hash')({sort:false}).hash(webpackConfig);
    },
    // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
    // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
    environmentHash: {
       root: process.cwd(),
       directories: [],
       files: ['package-lock.json','yarn.lock'],
    },
})

```
### （2）compression-webpack-plugin
compression-webpack-plugin是webpack压缩插件，在webpack搭建的vue项目中，引入该插件后，npm run build除了会生成压缩后的静态资源（JS、css），还会生成gz形式的JS、CSS。
```js
const CompressionPlugin = require('compression-webpack-plugin')
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/,
            // 超过10k才压缩
            threshold: 10240,
            // 是否删除源文件
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
```
### （3）terser-webpack-plugin
主要用于webpack打包时自动去除console.log

如果你使用的是 webpack v5 或以上版本，你不需要安装这个插件。webpack v5 自带最新的 terser-webpack-plugin。如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本。
```js
const TerserPlugin = require('terser-webpack-plugin') // 引入删除console插件
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                ecma: undefined,
                warnings: false, // 传递true以在中返回压缩机警告result.warnings。使用该值可"verbose"获取更详细的警告。
                parse: {},
                compress: {
                  drop_console: true, // 移除console
                  drop_debugger: true, // 移除debugger
                  pure_funcs: ['console.log'] // 移除console
                }
              }
            })
          ]
        }
      }
    }
  },

```
### （4）拆包splitChunks
简单的来说就是Webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件。
```js
  chainWebpack(config) {



    config.when(process.env.NODE_ENV !== 'development', config => {

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }

```
我这里是吧element UI、常用的components进行拆包处理，你也可以根据你的需求进行拆包
### （5）优化loader的配置
我们可以从如下几个方面对loader进行优化：
- 优化正则匹配——减少文件查询时间
- 通过cacheDirectory选项开启缓存——减少再次打包时间
- 通过 include、exclude 来减少被处理的文件。
### （6）happyPack 多进程打包
在整个 Webpack 构建流程中，最耗时的流程可能就是 Loader 对文件的转换操作了，因为要转换的文件数据巨多，而且这些转换操作都只能一个个挨着处理。HappyPack 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少了总的构建时间。
```js
rules: [
  {
  test: /\.js$/,
  //把对.js文件的处理转交给id为babel的HappyPack实例
  use: ['happypack/loader?id=babel'],
  include: srcPath
  }
],
plugins: [
  new HappyPack({
  //用唯一的标识符id来代表当前的HappyPack是用来处理一类特定的文件
  id: 'babel',
  //如何处理.js文件，用法和loader配置中一样
  loaders: ['babel-loader?cacheDirectory']
})
]
```
### （7）ParallelUglifyPlugin
开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成，每个子进程其实还是通过UglifyJS去压缩代码，但是变成了并行执行。
```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

plugins: [
  new ParallelUglifyPlugin({
    //cacheDir 用于配置缓存存放的目录路径。
    cacheDir: '.cache/',
    sourceMap: true,
    uglifyJS: {
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    },
  }),
]
```
### （8）CommonChunkPlugin
CommonChunkPlugin主要用于提取第三方库和公共模块，避免首屏加载的bundle文件，或者按需加载的bundle文件体积过大，导致加载时间过长，是一把优化的利器。而在多页面应用中，更是能够为每个页面间的应用程序共享代码创建bundle。

## 5、理解webpack的热更新

`HMR`全称 `Hot Module Replacement`，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用

例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失

如果使用的是 `HMR`，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用

`webpack.config.js`配置

```js
const webpackMerge = require('webpack-merge')
const baseconfig = require('./base.config')
module.export = webpackMerge(baseconfig, module.export = {
  devServer: {
    contentBase: './dist',
    inline: true,
    hot: true // 开启热更新
  }
})
```

通过上述这种配置，如果我们修改并保存`css`文件，确实能够以不刷新的形式更新到页面中

但是，当我们修改并保存`js`文件之后，页面依旧自动刷新了，这里并没有触发热模块

所以，`HMR`并不像 `Webpack` 的其他特性一样可以开箱即用，需要有一些额外的操作

`./src/index.js`配置

```js
// ...
if (module.hot) {
  module.hot.accept(['./content.js'], () => {
    render()
  })
}
```

![core](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxOS85LzIvMTZjZjIwMzgyNDM1OTM5Nw?x-oss-process=image/format,png)

如上图所示，右侧Server端使用webpack-dev-server去启动本地服务，内部实现主要使用了webpack、express、websocket。

使用express启动本地服务，当浏览器访问资源时对此做响应。
服务端和客户端使用websocket实现长连接
webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。

每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
编译完成后通过socket向客户端推送当前编译的hash戳
客户端的websocket监听到有文件改动推送过来的hash戳，会和上一次对比

一致则走缓存
不一致则通过ajax和jsonp向服务端获取最新资源
使用内存文件系统去替换有修改的内容实现局部刷新

## 6、理解webpack proxy代理

（本地开发请求另一个服务器的资源会因为浏览器安全策略的问题跨域，可以利用中间服务器实现代理，把请求转交给代理服务器，代理服务器响应请求，并把请求转交给目标服务器，目标服务器响应数据后返回给代理服务器，代理服务器再转交给本地。解决浏览器跨域的问题。）

`webpack proxy`，即`webpack`提供的代理服务

基本行为就是接收客户端发送的请求后转发给其他服务器

其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）

想要实现代理首先需要一个中间服务器，`webpack`中提供服务器的工具为`webpack-dev-server`

`proxy`工作原理实质上是利用`http-proxy-middleware` 这个`http`代理中间件，实现请求转发给其他服务器。

### webpack-dev-server

`webpack-dev-server`是 `webpack` 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起

```js
const path = require('path')

module.exports = {
    // ...
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://langding.fandow.com/', // 接口域名
				changeOrigin: true, // 请求头中host会设置成target 可通过request.getHeader("Host")拿到真实的接口域名
				ws: true, // 代理websocket
				rewrite: pathStr => pathStr.replace("/api", ""), // 重写路径
            }
        }
        // ...
    }
}

```

- target：表示的是代理到的目标地址
- pathRewrite：默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite
- secure：默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
- changeOrigin：它表示是否更新代理后请求的 headers 中host地



在开发阶段， `webpack-dev-server` 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 `localhost`的一个端口上，而后端服务又是运行在另外一个地址上

所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题

通过设置`webpack proxy`实现代理请求后，相当于浏览器与服务端中添加一个代理者

当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地

![img](https://static.vue-js.com/65b5e5c0-ace5-11eb-85f6-6fac77c0c9b3.png)

在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据

注意：**服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制**





```js
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/ba
```

## 7、webpack和vite的区别和优缺点
### （1）底层的语言

webpack是基于nodejs构建，js是以毫秒计数。
vite是基于esbulid预构建依赖，esbulid是采用go语言编写的，go语言是纳秒级别的。

总结：因为js是毫秒级别，go语言是纳秒级别。所以vite比webpack打包器快10-100倍。

### （2）打包过程

webpack：分析各个模块之间的依赖=>然后进行编译打包=>打包后的代码在本地服务器渲染。随着模块增多，打包的体积变大，造成热更新速度变慢。
![](@alias/20210417225533423.png)

vite：启动服务器=>请求模块时按需动态编译显示。是先启动开发服务器，请求某个模块时再对该模块进行实时编译，因为现代游览器本身支持ES-Module，所以会自动向依赖的Module发出请求。所以vite就将开发环境下的模块文件作为浏览器的执行文件，而不是像webpack进行打包后交给本地服务器。（vite遵循的是ES Modlues模块规范来执行代码，不需要打包编译成es5模块即可在浏览器运行。）
![](@alias/20210417225611243.png)

总结：vite启动的时候不需要分析各个模块之间的依赖关系、不需要打包编译。vite可按需动态编译缩减时间。当项目越复杂、模块越多的情况下，vite明显优于webpack
分析了webpack和vite的打包方式后，也就明白了为什么vite比webpack打包快，因为它在启动的时候不需要打包，所以不用分析模块与模块之间的依赖关系，不用进行编译。这种方式就类似于我们在使用某个UI框架的时候，可以对其进行按需加载。同样的，vite也是这种机制，当浏览器请求某个模块时，再根据需要对模块内容进行编译。按需动态编译可以缩减编译时间，当项目越复杂，模块越多的情况下，vite明显优于webpack.

### （3）热更新

webpack：模块以及模块依赖的模块需重新编译
vite：浏览器重新请求该模块即可

热更新方面，vite效率更高。当改动了某个模块的时候，也只用让浏览器重新请求该模块，不需要像webpack那样将模块以及模块依赖的模块全部编译一次。
4使用方面

vite开箱即用，更加简单，基于浏览器esm，使得hmr更加优秀，达到极速的效果；webpack更加灵活，api以及插件生态更加丰富。

### （4）原理不同

webpack是bundle，自己实现了一套模块导入导出机制。vite是利用浏览器的esm能力，是bundless。
### （5）优缺点
vite开发阶段，打包快。
vite相关生态没有webpack完善，vite可以作为开发的辅助。



## 8、webpack如何加快热更新速度
### （一）在开发服务器中使用 watchOptions 配置进行优化：
```js
devServer: {
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000, // 轮询文件变化
    aggregateTimeout: 300, // 延迟处理
  },
}
```
其中，ignored 选项可用于忽略某些目录，如 node_modules，减少了无用扫描；poll 选项用于轮询文件变化的时间间隔，可以根据实际情况调整，可适用不同的文件系统和 CPU 处理器；aggregateTimeout 选项是延迟处理时间，在这段时间内，如果有多个文件变化，Webpack 可以只重编译一次，减少重复编译的效果。

### （二）使用 HotModuleReplacementPlugin 插件：
在 Webpack 配置文件中添加 HotModuleReplacementPlugin 插件，它可以使 Webpack 支持模块热替换：
```js
const webpack = require('webpack');
module.exports = {
  // ...
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // ...
  ],
  // ...
};
```
### （三）使用 webpack-dev-server：
webpack-dev-server 是一个快速的开发服务器，并支持热更新：
```js
npm install webpack-dev-server --save-dev
```
在 Webpack 配置文件中，可以设置 devServer 选项：
```js
module.exports = {
  // ...
  devServer: {
    hot: true, // 启用热更新
    // ...
  },
  // ...
};
```
### （四）启用 cache 缓存：
可以使用 cache 缓存来加快速度：
```js
module.exports = {
  // 将选项设置为 true 或传递一个对象，以手动控制缓存方式以及存储位置等。
  cache: true,
  // ...
};
```
### （五）使用 DllPlugin 或 hard-source-webpack-plugin：
DllPlugin 或 hard-source-webpack-plugin 插件可使用预编译的模块，以提高构建速度。使用它们可以避免在每次构建中都重新编译相同的模块。

## 9、优化webpack打包速度的插件有哪些
- **thread-loader**：在多个 worker 池中运行 Loader 以加快构建速度，提高 CPU 利用率。

- **happypack**：允许并行处理多个 Loader 实例，也可用于加速 Babel 转换。

- **cache-loader**：缓存 Loader 执行结果，以减少资源处理时间。

- **hard-source-webpack-plugin**：通过缓存和共享单个缓存来加速重复构建。可以在 CI/CD 或本地使用。

- **uglifyjs-webpack-plugin**：并行压缩生成的 JS 文件，降低构建所需时间。

- **webpack-parallel-uglify-plugin**：基于 UglifyJS 压缩 JS 文件，可以并行化优化构建速度。

- **auto-dll-webpack-plugin**：用于提前编译部分代码，提高构建性能，减少构建所需时间。

- **webpack-bundle-analyzer**：可视化分析打包后的文件大小和依赖关系，以便于优化打包结果。

这些插件都可以通过不同方式来优化 Webpack 打包速度，提高项目的构建效率。使用它们可以将 Webpack 打包时间缩短到最小，并在开发过程中提高代码运行效率。

## 10、优化webpack打包体积的插件有哪些

- **tree-shaking：** Webpack 内置了 tree-shaking 检测并删除无用代码。

- **code-splitting：** 将代码拆分为多个块以减少初始下载和未使用的代码。

- **optimize-css-assets-webpack-plugin：** 压缩 CSS 代码并删除未使用的 CSS 规则。

- **terser-webpack-plugin：** 用于压缩 JavaScript 代码并删除未使用的代码。

- **webpack-bundle-analyzer：** 分析打包的 bundle 所需要的模块，找出其中使用重复代码块并进行移除。

- **compression-webpack-plugin：** 在生成生产构建时使用 gzip 压缩文本文件，减少文件大小。

- **purgecss-webpack-plugin：** 删除未使用的 CSS，减少 CSS 文件大小。

- **webpack-cdn-plugin：** 自动生成 CDN 路径，以便于优化打包效果，减少文件大小。

这些插件都是常用的用于优化 Webpack 打包体积的插件，它们可以帮助您减少打包的文件大小，并缩短页面的加载时间，优化您的项目性能。