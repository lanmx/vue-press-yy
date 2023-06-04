// seo优化第一步： 优化md文件访问的url，避免输出中文和符号
const fileUrlMap = [
  { text: "angular基础知识", link: "/front/angular/angular-basics.md", parent: "angular", label: 'angular', describe: '入门angular框架，基础学习掌握angular的基本使用' },
  { text: "angular自定义指令", link: "/front/angular/directive.md", parent: "angular", label: 'angular,自定义指令', describe: 'angular自定义指令实现鼠标事件显示颜色，angular自定义指令实现多选只显示一个选中标签，其余+N显示，鼠标移上显示全部。' },
  { text: "angular项目proxy代理转发", link: "/front/angular/angular-proxy.md", parent: "angular", label: 'angular,proxy', describe: '不同项目调取其他项目的接口，但是服务器不一样调接口不通；这时候，可以通过proxy代理配置，让代理帮忙转发接口。' },
  { text: "rxjs核心概念之Subject", link: "/front/angular/rxjs-subject.md", parent: "angular", label: 'rxjs,subject', describe: 'Subject既是Observable对象，又是Observer对象，当有新消息时，Subject会通知内部的所有观察者。'  },
  { text: "service和module结构", link: "/front/angular/service-module.md", parent: "angular", label: 'angular', describe: 'angular新建service服务和module模块'  },
  { text: "angular父子组件通信", link: "/front/angular/pass-by-value.md", parent: "angular", label: 'angular', describe: 'angular父子组件之间传值的三种方法：input、ViewChild、emit'  },
  { text: "子组件传父组件用订阅subject", link: "/front/angular/pass-value-by-subject.md", parent: "angular", label: 'subject', describe: '利用subject实现子组件向父组件通信传值，新建new Subject, $_sub.next()向父组件发送参数，父组件$_sub.subscribe接收订阅发送过来的数据'  },
  { text: "axios请求成功依然跑catch", link: "/front/classic-example/axios-catch.md", parent: "classic-example", label: 'angular', describe: '这是因为请求成功的代码里有错误，因此会跑catch。' },
  { text: "hrm分享：父组件不修改子组件不能监听的问题", link: "/front/classic-example/hrm-vue-watch.md", parent: "classic-example", label: 'vue,watch', describe: '需求解释：下发张数对象是一个动态的对象数组，每个下发张数对象可以增删，每个下发张数对象里面有多个对象。里面的对象也是一个动态数组，可以添加删除。' },
  { text: "hrm需求案例：三层嵌套异步需求案例", link: "/front/classic-example/hrm-deep-request.md", parent: "classic-example", label: 'await,async', describe: '函数异步请求里嵌套着一个await，await要求是一个promise，所以await this.getJobType()返回的要求是一个promise，才可以异步' },
  { text: "vue3前端导出文件和发送base64给后端接口", link: "/front/classic-example/vue3-export-base64.md", parent: "classic-example", label: 'xlsx', describe: '前端使用XLSX插件转换xlsx文件为base64传参' },
  { text: "vue中v-if和v-for不建议同时使用的坑", link: "/front/classic-example/v-if-v-for.md", parent: "classic-example", label: 'vue', describe: '原因：v-for比v-if优先级高，所以使用的话，每次v-for都会执行v-if,造成不必要的计算，影响性能，尤其是当之需要渲染很小一部分的时候' },
  { text: "xlsx表格导入导出功能", link: "/front/classic-example/xlsx-import-export.md", parent: "classic-example", label: 'xlsx', describe: '纯前端导入xlsx，导出xlsx功能实现' },
  { text: "yarn dev跑vue2项目到一半停了", link: "/front/classic-example/vue2-cannot-run.md", parent: "classic-example", label: 'vue', describe: '多加了一个template标签导致的，或者template里面的根目录div不止一个。' },
  { text: "下拉加载更多功能", link: "/front/classic-example/nz-scroll.md", parent: "classic-example", label: 'antd', describe: '可以使用AntDesign UI组件库的搜索选择器的nzScrollToBottom方法实现滚动到底部加载更多数据(nzScrollToBottom)下拉列表滚动到底部的回调' },
  { text: "分组合并表格逻辑", link: "/front/classic-example/merge-table.md", parent: "classic-example", label: 'table', describe: 'table表格合并行或者合并列逻辑处理' },
  { text: "列表循环自动滚动", link: "/front/classic-example/scroll-list.md", parent: "classic-example", label: 'scroll', describe: '拷贝一份无缝衔接循环的列表数据，和真正的列表数据不能是同一个dom，无缝衔接替换。' },
  { text: "利用css-animation实现自动滚动列表", link: "/front/classic-example/css-anim-scroll.md", parent: "classic-example", label: 'scroll', describe: '没有js逻辑，单纯利用css样式的css-animation实现自动滚动列表' },
  { text: "利用数组差集实现穿梭框权限分配", link: "/front/classic-example/arr-minis.md", parent: "classic-example", label: 'array', describe: '很简单，利用js数组差集实现分配权限功能' },
  { text: "利用服务实现非父子页面传值", link: "/front/classic-example/pass-value-by-service.md", parent: "classic-example", label: 'service', describe: '太巧了，利用@Injectable()实现非父子页面传值，原来还能这样玩！' },
  { text: "动态增删表单（多层嵌套数组）", link: "/front/classic-example/deep-form.md", parent: "classic-example", label: 'array', describe: '需求描述：单据是一个动态的对象数组，每个单据可以增删，每个单据里面有多个对象。里面的对象也是一个动态数组，可以添加删除。' },
  { text: "双层嵌套对象不能访问内层属性", link: "/front/classic-example/inner-attr.md", parent: "classic-example", label: 'vue', describe: '这个是因为外层属性还没渲染，所以访问内存属性会undefined，给该dom包一层div，用v-if属性判断外层属性是否存在，太巧妙了！' },
  { text: "导出xlsx文件并且根据内容自适应列宽", link: "/front/classic-example/export-self-adapt.md", parent: "classic-example", label: 'xlsx', describe: '纯前端导出xlsx文件，且实现列自适用列宽，学起来~~' },
  { text: "将一位数组转换为树形结构", link: "/front/classic-example/flat-to-tree.md", parent: "classic-example", label: 'javascript', describe: '前端基础骚操作一定要会写啊，一维数组转换为多维数组，很难吗？' },
  { text: "手写动态左右翻页功能", link: "/front/classic-example/change-page.md", parent: "classic-example", label: 'javascript', describe: '需求如此激发潜能，翻页功能手写一个吧，真的不难！' },
  { text: "操作dom修复ui组件testarea遮盖高度的问题", link: "/front/classic-example/dom-fix-textarea.md", parent: "classic-example", label: 'javascript', describe: 'antd ui组件库的textarea高度计算问题导致遮盖，操作dom来修复！' },
  { text: "树形对象数组转换为一维数组", link: "/front/classic-example/tree-to-flat.md", parent: "classic-example", label: 'javascript', describe: '前端基础骚操作一定要会写啊，多维数组转换为一维数组，很简单吧！' },
  { text: "用户选择器全局组件实现", link: "/front/classic-example/user-selector.md", parent: "classic-example", label: 'vue', describe: 'vue组件开发封装全局用户选择器组件，so easy' },
  { text: "BFC", link: "/front/html-css/bfc.md", parent: "html-css", label: 'css', describe: 'Dlock Formatting Context：格式化上下文，指一个独立的渲染区域，可以理解为一个独立的空间，不会影响到外面的元素' },
  { text: "box-shadow", link: "/front/html-css/box-shadow.md", parent: "html-css", label: 'css', describe: 'css: 盒子阴影box-shadow' },
  { text: "css响应式布局", link: "/front/html-css/css-self-layout.md", parent: "html-css", label: 'css', describe: 'cSS3媒体查询可以让我们针对不同的媒体类型定义不同的样式， 当重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。' },
  { text: "overflow属性", link: "/front/html-css/overflow.md", parent: "html-css", label: 'css', describe: 'css: 如果内容溢出一个元素的框，通过overflow属性设置效果' },
  { text: "translate3d()", link: "/front/html-css/translate3d.md", parent: "html-css", label: 'css', describe: ' CSS 函数在3D空间内移动一个元素的位置。这个移动由一个三维向量来表达，分别表示他在三个方向上移动的距离' },
  { text: "常用css样式", link: "/front/html-css/common-css.md", parent: "html-css", label: 'css', describe: '整理一些常用的css样式，很nice~' },
  { text: "苹果内核吸顶字体变形", link: "/front/html-css/ios-font-warp.md", parent: "html-css", label: 'css', describe: '为了避免 2D transform 动画在开始和结束时发生的 repaint 操作，我们可以硬编码一些样式来解决这个问题' },
  { text: "面试问题集合", link: "/front/interview/interview.md", parent: "interview", label: '面试', describe: '面试问题和答案整理' },
  { text: "ES6知识点", link: "/front/javascript/es6.md", parent: "javascript", label: 'es6', describe: 'class person{}创建类只是构造函数、原型链的语法糖，最终还是要转换为原型链' },
  { text: "ES7-ES12", link: "/front/javascript/es7-es12.md", parent: "javascript", label: 'javascript', describe: 'includes判断数组是否包含元素，Object.values获取对象所有属性的值' },
  { text: "Promise await async 宏微任务 事件循环", link: "/front/javascript/promise-event-loop.md", parent: "javascript", label: '事件循环,promise', describe: 'Promise是异步编程的一种解决方案；简单的说，Promise是一个容器，里面保存着某个未来才会结束的事情' },
  { text: "Proxy Reflect vue2 vue3响应式原理", link: "/front/javascript/proxy-reflect.md", parent: "javascript", label: 'proxy,reflect,vue', describe: 'vue3通过 Proxy监听数据的变化和收集相关依赖，vue2通过 Object.defineProerty监听数据的变化和收集相关依赖' },
  { text: "Set Map weakSet weakMap", link: "/front/javascript/set-map-weakset-weakmap.md", parent: "javascript", label: 'Set,Map', describe: 'Set是一个新增的数据结构，可以用来保存数据，类似数组，但是和数组的区别是元素不能重复' },
  { text: "this call apply 箭头函数", link: "/front/javascript/this-call-apply.md", parent: "javascript", label: 'this', describe: '在JavaScript语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象下运行，而 this 就是函数运行时的环境' },
  { text: "内存管理和垃圾回收机制", link: "/front/javascript/memory-management.md", parent: "javascript", label: '内存管理', describe: '不管是什么编程语言，在代码执行过程中都需要给它分配内存，不同的是有些编程语言需要手动管理内存，有些编程语言可以自动帮助我们管理内存' },
  { text: "函数式编程 纯函数 柯里化 组合函数", link: "/front/javascript/function.md", parent: "javascript", label: '函数', describe: '函数式编程中有一个非常重要的概念叫纯函数，JavaScript符合函数式编程的范式，因此有纯函数的概念' },
  { text: "浏览器工作原理和作用域链", link: "/front/javascript/browser-scope.md", parent: "javascript", label: '浏览器,作用域链', describe: 'js引擎在执行代码之前会进行预解析，代码被解释，V8引擎内部会在堆内存中给我们创建一个对象GlobalObject' },
  { text: "高级函数、闭包和内存泄漏", link: "/front/javascript/closure-memory.md", parent: "javascript", label: '闭包,内存', describe: '如果一个函数接受另外一个函数作为参数，或者该函数会返回另外一个函数作为返回值的函数，那么这个函数就是高阶函数' },
  { text: "面向对象 构造函数 原型链 继承", link: "/front/javascript/object-scope.md", parent: "javascript", label: '原型链,继承', describe: '面向对象是现实的抽象方式，Java是纯面向对象的编程语言。在实现任何现实抽象时都需要创建一个类，根据类再去创建对象' },
  { text: "Arrayfrom", link: "/front/javascript-basics/array-from.md", parent: "javascript-basics", label: 'js数组', describe: '将一个类数组对象或者可遍历对象转换成一个真正的数组 类数组对象：最基本的要求就是具体length属性的对象' },
  { text: "debounce防抖的使用", link: "/front/javascript-basics/debounce.md", parent: "javascript-basics", label: '防抖', describe: '在vue2项目中使用debounce防抖函数' },
  { text: "get请求封装", link: "/front/javascript-basics/get-api.md", parent: "javascript-basics", label: 'get', describe: '利用new Promise和subscribe封装get，还是利用toPromise和try catch封装get...' },
  { text: "JavaScript基础", link: "/front/javascript-basics/javascript-basic.md", parent: "javascript-basics", label: 'javascript', describe: '入门JavaScript基础，入门小菜菜一定要进来温习哦~~~' },
  { text: "json字符串转换对象", link: "/front/javascript-basics/json-object.md", parent: "javascript-basics", label: 'javascript', describe: 'JavaScript中json字符串转换为对象' },
  { text: "js去掉小数部分和前后空格", link: "/front/javascript-basics/blank-space.md", parent: "javascript-basics", label: 'javascript', describe: '一些取整方法：弃掉小数部分，保留整数部分' },
  { text: "js计算两个数组的交集、差集、并集、补集", link: "/front/javascript-basics/js-arr-mixed.md", parent: "javascript-basics", label: 'javascript', describe: 'js使用多种办法计算两个数组的交集、差集、并集、补集' },
  { text: "TypeScript基础", link: "/front/javascript-basics/typescript.md", parent: "javascript-basics", label: 'tavascript', describe: 'typescript源于JavaScript，归于JavaScript。TypeScript只是JavaScript的基础上加了类型检测' },
  { text: "WebSocket全双工通道", link: "/front/javascript-basics/websocket.md", parent: "javascript-basics", label: '全双工通道', describe: 'Websocket是一个持久化的协议，它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的，一旦 Web 客户端与服务器建立起连接，之后的全部数据通信都通过这个连接进行' },
  { text: "单例模式", link: "/front/javascript-basics/single.md", parent: "javascript-basics", label: '单例模式', describe: 'vuex的store就是一个单例模式，采用了单一状态树，一个对象为唯一的数据源' },
  { text: "图片懒加载", link: "/front/javascript-basics/img-lazy-loading.md", parent: "javascript-basics", label: '懒加载', describe: '懒加载是为了让浏览器只加载可视区内的图片，可视区外的大量图片不进行加载，当页面滚动到后面去的时候再进行加载' },
  { text: "数组随机排序的方法", link: "/front/javascript-basics/array-sort.md", parent: "javascript-basics", label: '数组排序', describe: '数组随机排序的多种方法' },
  { text: "正则匹配替换", link: "/front/javascript-basics/erp-replace.md", parent: "javascript-basics", label: '正则', describe: 'replace替换' },
  { text: "初始化scrollto()不生效", link: "/front/mobile-terminal/fix-scrollto.md", parent: "mobile-terminal", label: '移动端', describe: '解决方法：使用resize()方法在ngAfterViewInit()再次调用，重新计算窗口大小' },
  { text: "解决移动端样式id冲突", link: "/front/mobile-terminal/dom-id.md", parent: "mobile-terminal", label: '移动端', describe: '相同组件在复用时代码编译解析的dom不是同一个节点，但是echart图表的id用的是用一个，因此导致在复用的其他页面渲染图表id无效' },
  { text: "Webpack基础", link: "/front/packer-tool/webpack.md", parent: "packer-tool", label: 'webpack', describe: 'webpack更加强调模块化开发管理，而文件压缩合并，预处理等功能，只是附带功能' },
  { text: "computed和watch的区别", link: "/front/vue/computed-watch.md", parent: "vue", label: 'vue,watch,computed', describe: '计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。' },
  { text: "data属性为啥是函数", link: "/front/vue/data-fn.md", parent: "vue", label: 'vue', describe: 'data之所以是一个函数，是因为一个组件可能会多处调用，而每一次调用就会执行data函数并返回新的数据对象，这样，可以避免多处调用之间的数据污染' },
  { text: "nextTick异步执行", link: "/front/vue/nexttick.md", parent: "vue", label: 'vue,nextTick', describe: 'nextTick中的回调函数，在下一次DOM更新循环结束后，执行回调，可以用于获取更新后的DOM' },
  { text: "vue-slot插槽的使用", link: "/front/vue/slot.md", parent: "vue", label: 'vue,插槽', describe: '功能：插槽可以增强组件拓展性；同样功能样式写成组件，组件不同的地方用插槽实现。' },
  { text: "SSR渲染", link: "/front/vue/ssr.md", parent: "vue", label: 'SSR渲染', describe: 'SPA不利于搜索引擎的抓取，首次渲染速度相对较慢，用SSR优化！' },
  { text: "v-if v-show v-for", link: "/front/vue/v-if-show-for.md", parent: "vue", label: 'vue', describe: 'v-show隐藏则是为该元素添加css--display:none，dom元素依旧还在。v-if显示隐藏是将dom元素整个添加或删除' },
  { text: "vue中组件传值常用的几种方式", link: "/front/vue/vue-pass-value.md", parent: "vue", label: 'vue', describe: '父组件传值给子组件，子组件使用props进行接收；子组件传值给父组件，子组件使用$emit+事件对父组件进行传值。' },
  { text: "vue响应式原理", link: "/front/vue/vue-response-principle.md", parent: "vue", label: 'vue', describe: '对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持，数组则是通过重写数组方法来实现' },
  { text: "Vue父子组件生命周期", link: "/front/vue/vue-hook.md", parent: "vue", label: 'vue', describe: 'created是在组件实例一旦创建完成的时候立刻调用，这时候页面dom节点并未生成；mounted是在页面dom节点渲染完毕之后就立刻执行；触发时机上created是比mounted要更早。' },
  { text: "前端模块化", link: "/front/vue/font-module.md", parent: "vue", label: '前端,模块', describe: '前端模块化：AMD / CMD / CommonJS / ES6；模块化的核心：导入导出（变量，函数，类，组件）' },
  { text: "手写双向绑定原理", link: "/front/vue/v-model.md", parent: "vue", label: '双向绑定原理', describe: '手撕！简单实现双向绑定原理，vue2双向绑定原理，以及vue3双向绑定原理！' },
  { text: "vuepress侧边栏自动生成目录", link: "/front/vuepress/auto-sidebar.md", parent: "vuepress", label: 'vuepress,侧边栏', describe: 'vuepress的config.js文件sidebar侧边栏自动生成目录' },
  { text: "vuepress刷新页面404", link: "/front/vuepress/reflesh404.md", parent: "vuepress", label: 'vuepress', describe: '组件打包报错了，导致打包文件缺失，刷新部分缺失页面404' },
  { text: "vuepress引入UI组件库", link: "/front/vuepress/in-ui-library.md", parent: "vuepress", label: 'vuepress', describe: 'vuepress主题颜色和ant design样式冲突，使用element Plus UI组件库' },
  { text: "vuepress插槽的使用", link: "/front/vuepress/vuepress-slot.md", parent: "vuepress", label: 'vuepress,slot', describe: '想要定制化改变vuepress默认主题，使用插槽定制化页面非常实用' },
  { text: "vuepress项目上传到阿里云服务器", link: "/front/vuepress/to-alicloud.md", parent: "vuepress", label: 'vuepress', describe: '宝塔面板上传vuepress项目到阿里云服务器教程~' },
  { text: "架构深入了解vuepress 2", link: "/front/vuepress/vuepress2.md", parent: "vuepress", label: 'vuepress', describe: 'Bundler 会将 Client App 和临时文件一起进行打包，就像处理一个普通的 Vue SPA 一样' },
  { text: "常用cmd命令", link: "/back/computer-basics/cmd.md", parent: "computer-basics", label: 'cmd', describe: '整理一些常用的cmd命令。' },
  { text: "端口进程命令", link: "/back/computer-basics/net-start.md", parent: "computer-basics", label: '计算机网络', describe: '在cmd终端输入命令，看是否有列出占用进程；8100占用进程是2188' },
  { text: "计算机网络", link: "/back/computer-basics/computer.md", parent: "computer-basics", label: '计算机网络', describe: '输入网址，浏览器对网址进行DNS解析，找到网址对应的IP地址，DNS其实就是一个数据库，记录着很多url和对应的IP地址。' },
  { text: "冒泡选择快速排序", link: "/back/data-struct/sort.md", parent: "data-struct", label: '排序', describe: '手撕冒泡选择快速排序方法~' },
  { text: "栈", link: "/back/data-struct/stack.md", parent: "data-struct", label: '栈', describe: '栈，是一种受线的线性表，后进先出（LIFO），last in first out；限制仅允许在表的一端进行插入和删除运算；允许插入和删除操作的一端被称为栈顶，另一端称为栈底。' },
  { text: "链表", link: "/back/data-struct/list.md", parent: "data-struct", label: '链表', describe: '链表和数组一样，可以用于存储一系列的元素，但是链表和数组的实现机制完全不同；链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（有些语言称为指针或连接）组成。' },
  { text: "队列", link: "/back/data-struct/queue.md", parent: "data-struct", label: '队列', describe: '队列，是一种受限的线性表，先进先出（FIFO），first in first out；它只允许在表的前端（font）进行删除操作，只允许在后端（rear） 进行插入操作。' },
  { text: "git分支使用", link: "/back/git/git-branch.md", parent: "git", label: 'git', describe: '一些git分支操作的使用' },
  { text: "git报错", link: "/back/git/git-error.md", parent: "git", label: 'git', describe: 'git pull 时提示 Please enter a commit message to explain why this merge is necessary' },
  { text: "搭建属于自己github仓库", link: "/back/git/warehouse.md", parent: "git", label: 'git', describe: '快来搭建属于自己github仓库吧！' },
  { text: "nodejs基础", link: "/back/nodejs/nodejs.md", parent: "nodejs", label: 'nodejs', describe: 'Node.js使用了一个事件驱动、非阻塞式I/O模型,让JavaScript 运行在服务端的开发平台， 它让JavaScript成为与PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言。' },
  { text: "nodejs项目部署到云服务器（完整教程）", link: "/back/nodejs/nodejs-to-alicloud.md", parent: "nodejs", label: 'nodejs', describe: '吐血整理笔记，终于把node后端项目部署到云服务器了！完整教程~' },
  { text: "浏览器前端https网站接口请求http报错", link: "/back/nodejs/https-http-error.md", parent: "nodejs", label: 'nodejs', describe: '前端项目配置了SSL hhtps安全访问，接口调用node项目用的http报错app-e3a33bd9.js:83 Mixed Content: The page at xxx was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint xxx. This request has been blocked; the content must be served over HTTPS.' },
  { text: "阿里云免费申请SSL证书https安全访问网站", link: "/back/nodejs/ssl-https.md", parent: "nodejs", label: 'nodejs', describe: '步骤整理：阿里云免费申请SSL证书https安全访问网站~' },
  { text: "工作笔记", link: "/back/work/work-notes.md", parent: "work", label: 'javascript', describe: '我的一些工作笔记~~~~' },
  { text: "今天学习angular路由", link: "/front/angular/angular-router.md", parent: "angular", label: 'angular', describe: 'back、forward、go方法会触发页面刷新，pushState、replaceState方法不会刷新页面' },
  { text: "git最基础的必会操作", link: "/back/git/git-basics.md", parent: "git", label: 'git', describe: '有时候会忘记切分支，导致代码提交在了master或者其他人分支上，这时候可以使用check-pick把commit 复制过来。' },
]

export default fileUrlMap