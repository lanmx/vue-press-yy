## rxjs核心概念之Subject

Subject既是Observable对象，又是Observer对象。

当有新消息时，Subject会通知内部的所有观察者。

Subject & Observable

​	Subject是一类特殊的Observable，它可以向多个Observer多路推送数值。因为Subject内部维护了一个观察者列表，所以当观察者订阅Subject对象时，Subject对象会把订阅者添加到观察者列表中，每当有Subject对象接收到新值时，它就会遍历观察者列表，依次调用观察者内部的next()方法，把值一一送出。
​	由于Subject即实现了Observable又实现了Observer，所以在Subject类中有五个重要的方法：

- next —— 每当 Subject 对象接收到新值的时候，next 方法会被调用。

- error —— 运行中出现异常，error 方法会被调用。
- complete —— Subject 订阅的 Observable 对象结束后，complete 方法会被调用。
- subscribe —— 添加观察者。
- unsubscribe —— 取消订阅（设置终止标识符、清空观察者列表）。

原文链接：https://blog.csdn.net/HH921227/article/details/103801831

<ClientOnly>
  <Valine></Valine>
</ClientOnly>