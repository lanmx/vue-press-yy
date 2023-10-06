## 1. Angular的生命周期函数
angular的生命周期函数一共有8个，分别是ngOnChanges, ngOnInit, ngDoCheck, 
ngAfterContentInit，ngAfterContentChecked，ngAfterViewInit, ngAfterViewChecked, ngOnDestroy,
在项目开发中会经常用到的生命周期函数有ngOnChanges ，ngOnInit, ngAfterViewInit 和 ngOnDestroy，
在ngOnChanges，组件绑定的引用数据发生变化的时候触发，我们可以在此周期需要获取变更后的数据处理逻辑。
在ngOnInit周期，指令和组件初始化完成，我们常会在这个周期里初始化数据，调接口获取数据，
在ngAfterViewInit 周期，dom初始化完成，操作dom的逻辑常在这个周期处理；
在ngOnDestroy阶段，销毁指令和组件之前触发，可在这里移除事件监听等清扫操作；

## 2. 组件如何传值？父子组件和同级组件的传值？
对于父子组件，可以用input，emit，ViewChild传值；对于非父子组件，可以用service传值，或者localstorage

## 3. 谈一谈路由传参的详细？
路由传参是一种将数据传递给路由组件的方式，在angular中有两种类型传参，路径传参和查询传参；
路径传参是通过URL的路径部分传递的，例如get/:id，在目标组件中，通过注册ActivatedRoute服务，调用route.params.subscribe方法来获取传过来的数据；
查询参数是通过URL的查询字符串进行传递的，查询字符串是URL中跟在问号后面的一系列key=value对，它们用and(&)分隔，例如?page=1;
目标组件接收数据也是通过注册ActivatedRoute服务，调用route.queryParams.subscribe方法。

## 4. 谈一下angular的双向绑定原理？
angular的双向绑定是通过ngModal指令实现的，该实现原理是基于Observable和Zone.js实现，当一个属性绑定到表达式时，
angular会创建一个可观察对象，并且在这个对象上注册一个观察者，当这个属性值发生变化时，会通知所有观察者；
另外，Angular使用了zone.js库来拦截异步操作。当Angular捕获到异步操作时，它会触发脏检测机制并更新视图层。

## 5. 假如页面上有上百个双向绑定？你怎么优化性能？
- 检查真正必要的双向绑定，非必要的数据改为使用单向绑定（One-way binding），
- 使用OnPush变更检测策略，分批处理数据，数据懒加载和分页加载，
- 使用虚拟滚动，虚拟列表（例如React-Virtualized或Vue-Virtual-Scroller），
- 使用更轻量级的数据双向绑定库，如Microjs提供了更小和更快的双向绑定功能。
- 避免频繁触发绑定更新，可使用debounce或throttle来延迟或限制更新的频率，
- 使用事件委托，将事件处理程序绑定到父元素上，而不是直接在每个子元素上绑定，
减少事件处理数量，减少内存占用。

## 6. 说一说你的虚拟列表怎么实现的？替换数据的时候怎么替换的？
面对数据量大的列表渲染卡顿问题，可通过虚拟列表技术提高性能，假如数据列表为10万条，可见区域列表为10行，那么，
通过计算可见高度，根据可见区域的起始索引和数量，把数据动态渲染到页面上，然后监听列表滚动事件，
判断该数据项是否在可见区域内，如果在，则更新数据；如果不在可见区域内，则需要更新索引位置，更新数据源。

## 7. 实现节流函数，说说原理，解释一下代码
节流函数是指在n秒内运行一次，如果n秒内重复触发，只有一次生效；
其实现原理是通过函数闭包实现的，可以通过setTimeout设定一个时间间隔，在这个时间间隔内只执行一次函数调用；
两个参数分别为要节流的函数和时间间隔，通过定时器延迟调用该函数，调完后清空定时器；
也可以通过时间戳实现，通过计算上一个时间和当前时间的差值是否大于设定的间隔时间，如果大于，则调取函数，
且同时更新上一次时间为当前时间；
## 8. angular的路由导航，可以说说吗
[angular路由](/front/angular/angular-router.html)

## 9. angular和vue的区别
- angular是mvvm框架, 而vue是一个渐进式的框架, 相当于view层。
- 都有双向数据绑定, 但是angular中的双向数据绑定是基于脏检查机制，vue的双向数据绑定是基于ES5的getter和setter来实现。
- angular的指令都是ng-xxx。vue的指令都是v-xxx。
- Angularjs是在整个html页面下进行实例化，而vue需要一个el对象进行实例化。
- Angularjs适合用于复杂的 Web 应用的开发，Vue.JS 则适用于构建中小型 Web 应用程序，和移动端的开发
- Vue 相比于 Angular 更加灵活，可以按照不同的需要去组织项目的应用代码。比如，甚至可以直接像引用jquery那样在HTML中引用vue，然后仅仅当成一个前端的模板引擎来用。
- vue比angular更轻量, 占用空间更小，性能上更高效, 比angular更容易上手, 学习成本低。
