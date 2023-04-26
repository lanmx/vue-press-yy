## 一、什么是websocket
WebSocket是HTML5下一种新的协议（websocket协议本质上是一个基于tcp的协议），Websocket是一个持久化的协议，它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的。

一旦 Web 客户端与服务器建立起连接，之后的全部数据通信都通过这个连接进行。由于 WebSocket 只需要一次 HTTP 握手，服务端就能一直与客户端保持通信，直到关闭连接，这样就解决了服务器需要反复解析 HTTP 协议，减少了资源的开销。
## 二、websocket的用法
1. WebSocket 的方法
- ws.send() - 向服务器发送数据
- ws.close() - 关闭连接
2. WebSocket 的事件
- ws.onopen - 建立连接时触发
- ws.onmessage - 客户端接受服务端数据时触发
- ws.onerror - 通信错误时触发
- ws.onclose - 连接关闭时触发
3. WebSocket.readyState

readyState 属性返回实例对象的当前状态，共有四种状态
- 0 - 表示正在连接
- 1 - 表示连接成功，可以进行通信
- 2 - 表示连接正在关闭
- 3 - 表示连接已经关闭，或者打开连接失败
```ts
// 创建一个WebSocket对象
var ws = new WebSocket("接口地址")

// 连接成功时触发
ws.onopen = function() {
    alert("连接成功")
}
// 连接失败时触发
ws.onerror = function() {
    alert("连接失败")
}
// 发送数据
ws.send(); // 向服务端发送请求

// 接收消息时触发
ws.onmessage = function(MessagEvent) {
    console.log(MessagEvent.data)
}
// 连接关闭的回调函数
ws.onclose = function（）{
	alert（"close"）
}
```

## 三、WebSocket与HTTP协议的异同
相同点主要有：

- 都是基于TCP的应用层协议；
- 都使用Request/Response模型进行连接的建立；
- 在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码；
- 都可以在网络中传输数据。

不同点：

- WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用；
- WS是HTML5中的协议，支持持久连接；而Http协议不支持持久连接。
- WS的连接不能通过中间人来转发，它必须是一个直接连接；
- WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据；
- WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息；
- WS的数据帧有序。

## 四、Websocket优点
Websocket协议相比http优势很明显，首先在效率上有多方面的提升。

传统的http请求，其并发能力都是依赖同时发起多个TCP连接访问服务器实现的(因此并发数受限于浏览器允许的并发连接数)，而websocket则允许我们在一条ws连接上同时并发多个请求，即在A请求发出后A响应还未到达，就可以继续发出B请求。由于TCP的慢启动特性（新连接速度上来是需要时间的），以及连接本身的握手损耗，都使得websocket协议的这一特性有很大的效率提升。

http协议的头部太大，且每个请求携带的几百上千字节的头部大部分是重复的，很多时候可能响应都远没有请求中的header空间大。如此多无效的内容传递是因为无法利用上一条请求内容，websocket则因为复用长连接而没有这一问题。
websocket支持服务器推送消息，这带来了及时消息通知的更好体验，也是ajax请求无法达到的。

## 五、Websocket缺点
服务器长期维护长连接需要一定的成本
各个浏览器支持程度不一
websocket 是长连接，受网络限制比较大，需要处理好重连，比如用户进电梯或电信用户打个电话网断了，这时候就需要重连

## 六、Websocket的作用
解决了传统轮询(Traditional Polling)、长轮询(Long Polling)带来的问题（服务端负载、延迟等）。

## 七、Websocket应用场景
websocket在实时通信领域运用的比较多，比如社交聊天、弹幕、多玩家游戏、协同编辑、股票基金实时报价、体育实况更新、视频会议/聊天、基于位置的应用、在线教育、智能家居等需要高实时的场景。

[参考链接](https://blog.csdn.net/qq_54773998/article/details/123863493)