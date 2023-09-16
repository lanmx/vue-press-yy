## 1、node的事件循环
在Node.js中编写代码时，经常会涉及到异步操作，比如文件读写、网络请求等。Node.js采用了事件驱动的模型，通过事件循环来处理这些异步操作。

**事件循环执行过程：**

执行前，会先执行同步任务、再执行process.nextTick 、微任务 ，等所有微任务队列全部执行完后，才进入事件循环event-loop的timers阶段。

在事件循环的每一个子阶段退出之前会判断有没有微任务：process.nextTick、microtask。如果有，会优先执行（process.nextTick先执行于microtask）。
- **进入 event-loop**
- **进入 timers 阶段**：处理通过setTimeout()和setInterval()设置的定时器任务。当定时器到达指定的时间时，事件循环将进入下一个阶段。
- **进入 IO callbacks阶段**：处理异步I/O操作的回调函数，比如文件读写、网络请求的回调函数。当这些异步操作完成时，相关的回调函数会被添加到事件循环的I/O队列中。
- **进入 idle，prepare 阶段**：该阶段在内部使用。
- **进入 poll 阶段**

轮询阶段（Poll queue）：此阶段是Node.js事件循环的核心。在此阶段：

Node.js会检查是否有待处理的I/O事件回调函数，如果有，将其移至下一个阶段。

如果没有I/O事件回调函数，Node.js会等待新的I/O事件的到来。

在等待过程中，如果定时器到达指定时间，或者其他预定的条件满足，事件循环将会立即进入下一个阶段。


![](@alias/da63df50e47e4db2acc40af9181e2e12.png)
- **进入 check 阶段**：
在此阶段执行setImmediate()回调函数。setImmediate()函数用于注册在事件循环的下一个轮询阶段之前执行的回调函数。
- **进入 closing 阶段**。
处理关闭事件的回调函数，如socket.on('close')
- 检查是否有活跃的 handles（定时器、IO等事件句柄）。
  如果有，继续下一轮循环。
  如果没有，结束事件循环，退出程序。

## 2、用过nodejs的什么框架，为什么用express框架，有什么优点
express、koa、egg、nest、midway都是常见的nodejs开源框架。
其关系，基本如下：
```js
Midway.js ---|> Egg.js ---|> Koa.js,
               Nest.js ---|> Express.js
```
而koa实际上是express团队用新理念重写的，从架构上讲，更加先进一些。

midway.js和egg.js背后都是阿里的团队，其架构基于koa。

nest.js背后是国外的Trilon团队，其架构基于express
### (1) Koa
koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

koa是一个拥有洋葱模型中间件的http处理库，一个请求，经过一系列的中间件，最后生成响应。Koa的大致实现原理：context上下文的保存和传递，中间件的管理和next方法的实现。

所以koa的开发过程中，往往要引用他人开发的中间件，或是自己开发中间件，然后再开发业务逻辑。

Koa和Express之间的主要区别在于它们处理中间件的方式。Express在应用程序框架中包括路由和模板。另一方面，Koa需要具有这些功能的模块，因此使其更具模块化或可定制性。
```js
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000, () => console.log('Koa is listening to http://localhost:3000'));
```
Node的req和res对象已被Koa的Context对象替换。该对象包括ctx.request和ctx.response属性。

**Koa的路由：**

Koa不提供任何内置的路由中间件，因此您必须安装类似koa-router的模块。

**Koa的优点：**

使用Koa，由于该框架具有灵活性，因此更容易编写中间件。它被设计为既使写作又使阅读愉快。它还使用ES6异步/等待功能来消除对回调的使用。另一个重要的考虑因素是Koa的下载量很小。它非常轻巧，大约有500行代码。

**Koa的缺点：**

虽然Koa可能是新的，但它也比其较旧的兄弟版Express不稳定。相比之下，开源社区也要小得多，这意味着可用的支持较少。尽管async / await消除了对回调的需求，但一次多个异步调用仍可能导致async / await hell。Koa特定的中间件也与其他框架不兼容。

```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // …
  .put('/users', (ctx, next) => {
    // …
  .del('/users', (ctx, next) => {
    // …
  });
app
  .use(router.routes())
  .use(router.allowedMethods());
```
有了Koa，这是一个简单的路由器。如果请求/响应周期中存在错误，则内置错误处理功能，这意味着它将所有错误输出到stderr。
### (2) Express
Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能。

使用Express，路由也相对简单。使用app.route，您可以将路径的路由处理程序链接在一起，同时保持代码DRY。

尽管Express有其广泛的优点，但并非没有缺点。从根本上讲，这是非常劳动密集型的。它要求开发人员手动创建所有端点，这意味着代码库越大，重构就越困难。随后，您需要有条理地维护代码，因为很容易在所有中间件中迷失方向。它还没有像Koa和Hapi这样的内置错误处理。
### (3) midway
MidwayJS 是阿里巴巴开源的 Node.js 服务端框架，它基于 Egg 和 TypeScript 封装而成，提供了更加完善的依赖注入、ORM、GraphQL 等功能，适合大型企业级项目的开发。MidwayJS 的优点是功能强大、易于扩展、性能稳定，缺点是相对于其他框架来说，学习成本稍高
### (4) egg
Egg 是阿里巴巴开源的企业级 Node.js 框架，它基于 Koa 封装而成，提供了更加完善的插件机制、多进程管理、插件热更新等功能，适合大型项目的开发。Egg 的优点是功能强大、易于扩展、性能稳定，缺点是相对于 Express 和 Koa 来说，学习成本稍高
### (5) nest
NestJS 是一个基于 TypeScript 和 Express 的 Web 框架，它提供了类似于 Angular 的依赖注入、模块化、面向切面编程等功能，适合大型企业级项目的开发。NestJS 的优点是代码结构清晰、易于维护、可测试性强，缺点是相对于其他框架来说，学习成本稍高。
