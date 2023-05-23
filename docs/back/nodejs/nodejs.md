---
title: nodejs基础
description: nodejs基础入门
meta:
  - name: keywords
    content: nodejs 基础 入门
---

# nodejs基础

Node.js发布于2009年5月，由Ryan Dahl开发，是一个基于Chrome V8引擎的JavaScript运行环境，
使用了一个事件驱动、非阻塞式I/O模型,让JavaScript 运行在服务端的开发平台，
它让JavaScript成为与PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言。

Node.js对一些特殊用例进行优化，提供替代的API，使得V8在非浏览器环境下运行得更好，V8引擎执行Javascript的速度非常快，
性能非常好，基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的网络应用。

## 一、HTTP

服务器和普通电脑的区别在于，服务器安装了web服务器软件，例如IIS、Apache，通过这些软件就能把一台电脑变成一台web服务器

在node.js中，我们不需要IIS、Apache等这些第三方的web服务器软件。因为我们可以基于Node.js提供的http模块，就能写一个服务器软件，从而对外提供服务

## 二、IP

- IP地址是互联网上每台计算机的唯一地址，具有唯一性；

IP地址格式：点分十进制，0~255，例如：192.168.1.1

- 终端：ping www.baidu.com  ，可看百度的网址的IP地址

- 在开发期间，127.0.0.1访问自己电脑的服务器

## 三、域名

IP能唯一标记网络上的计算机，但是不直观，不便于记忆，于是有了域名（Domain name）地址。

域名和IP地址一一对应，这种关系存放在域名服务器（DNS，Domain name server），域名服务器提供IP地址和域名的转换服务

## 四、端口号

在一台电脑中，可以运行百上千个web服务，每个服务对应唯一端口号。通过端口号，客户端发送过来的请求可以准确的交给对应的web服务处理

- 每个端口号不能同时被多个web服务占用
- 在实际应用中，url中的80端口可以被省略。例如，如果127.0.0.1的端口为80，则可以省略不写端口号

## 五、简单创建web服务器

#### 1. 导入http模块

```typescript
const http = require('http')
```

#### 2. 创建web服务器实例

```typescript
const serve = http.createServer()
```

#### 3. 为服务器实例.on绑定request事件，监听客户端请求

只要有人在请求http://127.0.0.1:8080这个网址就会粗发request这个回调方法

```typescript
server.on('request', (req, res) => {
    console.log('server--')
    // 请求地址
    const url = req.url
    // 请求方法
    const method = req.method
    // 发送的内容包含中文，则需设置响应头
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    // 响应结束请求,向客户端发送指定内容
    res.end()
})
```

#### 4. 启动服务器listen

```typescript
server.listen(8080,() => {
    console.log('server running at http://127.0.0.1')
})
```

#### 5. 根据不同url响应不同内容

```typescript
server.on('request', (req, res) => {
    console.log('server--')
    // 请求地址
    const url = req.url
    let text = '<h1>404 Not found!'
    if(url === '/' || url === '/index.html') {	
        text = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        text = '<h1>关于</h1>'
    }
    const fpath = path.join(__dirname. url)
    fs.readFile(fpath, 'utf8', (err, data) => {
        if(err) res.end('404 Not found')
        res.end(data)
    })
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end(text)
})
```

## 六、CommonJS模块化

提高戴代码可维护性，复用性，按需加载，防止变量 全局污染

内置模块：fs，path，http

#### 1. require加载模块

require()加载模块其实是加载module.exports熟悉，require引入的结果，永远以module.exports指向的对象为准

#### 2. module

每个自定义模块都有一个module对象

![image-20220622214226512](@alias/image-20220622214226512.png)

```typescript
Module {
  id: '.',
  path: 'D:\\my\\myproject\\nodejs',
  exports: {},
  filename: 'D:\\my\\myproject\\nodejs\\node.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\my\\myproject\\nodejs\\node_modules',
    'D:\\my\\myproject\\node_modules',
    'D:\\my\\node_modules',
    'D:\\node_modules'
  ]
}
```

#### 3. module.exports

对外共享成员

#### 4. exports

 module.exports和exports指向同一个对象，但是require引入的结果，永远以module.exports指向的对象为准

## 七、npm和包

https://www.npmjs.com 全球最大搜索包的共享平台，国外npm,Inc公司提供地址为https://registry.npmjs.org服务器共享所有包，我们可以用这个服务器下载自己需要的包

npm（Node Package Manager）npm包管理工具，Node.js自带

#### 1. moment时间格式化包

```typescript
const moment = require('moment')
// moment()得到当前时间
const time = moment().format('YYYY-MM-DD HH:mm:ss')
```

#### 2. node_modules

node_modules用来存放已安装到项目的包，require()导入就是从这个项目查找并加载包

node_modules添加到.gitignore忽略文件中

#### 3. package-lock.json

package-lock.json配置文件用来记录每个包的下载信息，名字，版本号，下载地址等

npm  i momemt@2.22.2（指定版本号）

#### 4. package.json

```typescript
npm init -y 快速新建packagejson文件
```

用来记录与项目有关的一些配置信息，下载自动记录。

记录项目名称，版本，描述，项目所用的包。

哪些包开发期间使用devDependencies（开发依赖包），哪些是开发和部署都要使用dependencies（核心依赖包）

package.json必须包含name,verson,main（包的名字，版本号，包的入口）

#### 5. npm install

一次性安装所有依赖包

npm uninstall 包名： 卸载包 

#### 6. devDependencies

```npm
// 简写
npm i moment -D
npm install moment --save-dev
```

#### 7. dependencies

#### 8. npm下载速度

npm下载默认使用国外的http://registry.npmjs/org服务器下载，网络数据传输需要经过漫长的海底光缆。所以很慢

**淘宝npm镜像服务器**

淘宝在国内搭建了一个服务器，专门把国外服务器的包同步到国内，然后在国内提供包下载服务，提高了下载速度

> 镜像Mirroring是一种文件存储形式，一个磁盘上的数据在另一个磁盘上存在一个相同的副本即为镜像

**切换npm下载镜像源**

```typescript
// 查看下载包镜像源
npm config get registry
// 切换为淘宝镜像源
npm config set registry=https:registry.npm.taobao.org/
// 查看是否切换成功
npm config get regisry
```

**借助nrm工具**

```typescript
npm i nrm -g
// 查看所有可用镜像源
nrm ls
// 切换淘宝镜像源
nrm use taobao
```

#### 9. 包

全局包 -g

只有工具性能的包有全局安装的必要，因为他们提供了很好的终端命令

**i5ting_toc**

i5ting_toc可以把md转换为html页面

```typescript
npm i -g i5ting_toc
i5ting_toc -f 文件路径 -o
```

#### 10. 手写一个包

1. 新建一个文件夹，里面有入口文件，例如index.js
2. 文件夹必须有package.json
3. 文件夹有readme.md说明文件

使用自己的包：

- 引入文件夹即可，不需要引入index.js；因为package.json已经告诉此包的入口文件main为index.js

#### 11. npm publish发布自己的包

切换到自己的包根目录，使用npm publish

- npm unpublish

删除发布包npm unpublish，只能删除72小时内发布的包

删除的包，24小时内不允许重复发布

- npm unpublish 报名 --force

强制删除发布包



## 八、模块加载机制

- 模块第一次加载后会被缓存，不会多次调用，提高效率 。
- 内置模块加载优先，不会去加载node_modules目录下相同的包
- 如果require()没有指定路径，那么会从内置模块或者第三方模块寻找；因此加载自定义模块，路径需要以./或者../开头

- 如果忽略加载文件拓展名，node会按顺序加载：
  1. 按照确切文件名加载
  2. 补全.js拓展名加载
  3. 补全.json加载
  4. 补全.node加载
  5. 加载失败
- 如果不是内置，也没有指定路径，会尝试用node_modules加载：
  1. 先从当前目录查找node_modules
  2. 依次往外层目录查找node_modules，直到根目录



#### 目录作为模块

- 查找package.json，寻找main属性作为require入口
- 如果没有package.json或者main无法解析，会加载目录的index.js
- 否则错误can‘t found module xxx



## 九、express

### 1. 认识express

基于node平台，快速、极简单的web开发框架，基于node.js内置的http模块进一步封装出来的

express和node内置的http模块类似，专门用来创建web服务器

不使用express可以用node.js原生提供的http接口，但是http内置用起来复杂，效率低。

**作用**：

使用Express，可以快速创建Web网站的服务器和Api的服务器

### 2. 安装

```css
npm i express@4.17.1
```

### 3. 使用

```js
// 1. 导入express
const express = require('express')
// 2. 创建web服务器
const app = express()

// 3. 监听GET请求
app.get('/user', (req, res) => {
    res.send( { data: { name: 'lanmx' }, code: 200, status: 'success' } )
})
// 4. 监听POST请求
app.post('/user', (req, res) => {
    res.send( { data: { name: 'lanmx' }, code: 200, status: 'success' } )
})
// 5. 启动服务器：调用app.listen端口号，启动成功后返回回调函数
app.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})
```

![image-20220731112253687](@alias/image-20220731112253687.png)



### 4.获取URL携带参数req.query

http://127.0.0.1/user?id=2&type=info

```js
app.get('/user', (req, res) => {
    console.log(req.query)
    let params = req.query
    if(params.id === '2' && params.type ==='info') {
        res.send( { data: { name: 'lanmx' }, code: 200, status: 'success' } )
    } else {
        res.send( { error: '不存在的id'})
    }
})
```



### 5. 获取URL动态参数

```js
http://127.0.0.1/user/1/info
// 3. 监听GET请求动态参数
app.get('/user/:id/:type', (req, res) => {
    console.log(req.params)
    res.send(req.params)
})
// 请求返回的body
{
    "id": "1",
    "type": "info"
}
```



### 6. 托管静态资源

#### （1）express.status()

express.status(‘文件名’)，可以很方便创建一个静态资源服务器，该文件下的静态资源可以对外访问了。

```js
app.use(express.status('public'))
app.use(express.status('files'))
```


#### （2）挂载路径前缀

```js
app.use('/public', express.status('public'))
```




### 7. nodemon

在编写Node.js项目时，如果修改了项目的代码，则要频繁的手动重启，非常繁琐，借助https://www/npmjs.com/package/nodemon，可以监听项目文件的变动，代码被修改好，会自动重启项目，方便开发和调试

#### （1）安装

```css
npm i -g nodemon
```

#### （2）node命令替换为nodemon

```css
nodemon app.js
// 或
npx nodemon serve.js
```



### 8. express路由 

#### （1）路由组成

express的路由，指的事客户端请求和服务器函数直接的映射关系；

express中的路由有三部分组成：

1. 请求的类型
2. 请求的URL地址
3. 处理的函数

```js
app.METHOD(PATH, HANDLER)
```

```js
// 挂载路由
app.get('/user', (req, res) => {
    res.send( { data: { name: 'lanmx' }, code: 200, status: 'success' } )
})
// 挂载路由
app.post('/user', (req, res) => {
    res.send( { data: { name: 'lanmx' }, code: 200, status: 'success' } )
})
```

#### （2）路由匹配规则

每一个请求到达服务器后，需要先经过路由的匹配，如果请求类型和请求的URL同时匹配成功，则会调用对应的处理函数。

1. 按定义的先后顺序进行匹配
2. 请求类型和请求URL同时匹配成功会调用对应的处理函数

#### （3）路由模块化

不建议将路由之间挂载到app上，推荐将路由分为单独的模块

1. 创建模块js文件
2. 向对象上挂载具体路由
3. 使用module.exports向外共享路由对象
4. 使用app.use()注册路由模块

userRouter.js

```js
const express = require('express')
const router = express.Router()
router.get('/user/list', (req, res) => {
    res.send('sucess to get list')
})
router.post('/user/add', (req, res) => {
    res.send('sucess to add')
})
module.exports = router
```

app.js

```js
const express = require('express')
const app = express()
const userRouter = require('./router')
app.use(userRouter)
app.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})
```

#### （4）为模块路由统一添加前缀

```js
app.use('/api', userRouter)
```

http://127.0.0.1/api/user/list



### 9. express中间件

中间件：中间处理环节，

app.use()函数的作用，就是来注册全局中间件。

express的中间件，本质上是一个function处理函数，Express中间件的格式

![image-20220731153523306](@alias/image-20220731153523306.png)

中间件函数的形参列表中，必须包含next参数，而且路由处理函数只包含req和res

#### （1）**next函数**：实现多个中间件连续调用的关键，表示转交给下一个中间件或路由

![image-20220731154218909](@alias/image-20220731154218909.png)

#### （2）全局中间件，使用app.use()

```
// 全局中间件
const fnzjj = function(req, res, next) {
	console.log('fnzjj')
	next()
}
app.use(fnzjj)
```

#### （3）局部中间件，不使用app.use()

```js
const express = require('express')
const router = express.Router()
// 局部中间件
const  { partMiddle } = require('./middleware')
router.post('/user/delete', partMiddle, (req, res) => {
    res.send('sucess to add')
})
module.exports = router
```

定义多个中间件

```js
// 局部中间件
const  { partMiddle,partMiddle2 } = require('./middleware')
router.post('/user/delete', partMiddle, partMiddle2 (req, res) => {
    res.send('sucess to add')
})
router.post('/user/delete', [partMiddle, partMiddle2], (req, res) => {
    res.send('sucess to add')
})
```

#### （4）使用中间件注意

1. 一定要在路由之前注册中间件
2. 客户端发过来的请求，可以连续调用多个中间件
3. 执行完中间件后，不要忘记写next()函数
4. 调完next()后不要再额外写其他代码，避免逻辑混乱
5. 连续调用多个中间件，多个中间件之间，共享req和res对象



#### （5）中间件级别

1. ###### 应用级别

   ```js
   // 绑定在app上
   app.use(middle)
   ```

2. 路由级别

   ```js
   // 绑定在router上
   router.use(middle)
   ```

3. 错误级别

   专门用来捕获异常错误，防止项目崩溃问题

   错误级别的形参必须有4个

   ```js
   // 错误级别中间件
   const error = function(err, req, res, next) {
       console.error('发生了错误：'+ err.message)
       res.send('Error! ' + err.message)
   }
   ```

   注意：捕获错误的中间件必须写在路由后面

4. express内置的中间件

   - express.static 快速托管静态资源的中间件
   - express.json解析JSON格式的请求体数据（有兼容性，仅4.16.0+版本可用）
   - express.urlencoded解析URL-encoded格式的请求体数据（有兼容性，仅4.16.0+版本可用）
   - querystring处理查询字符串，解析成对象格式

   

   **（1）express.json**

   app.post请求默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined

   ![image-20220731183431199](@alias/image-20220731183431199.png)

   通过express.json中间件，解析表单JSON格式的数据；

   解决方法：必须在路由前去挂载express.json中间件

   

   **（2）express.urlencoded**

   ![image-20220801210541005](@alias/image-20220801210541005.png)

   **（3）querystring**

   

5. 第三方中间件

   1. **body-parser** :  解析请求体数据

      ```js
      // 导入解析表单的第三方中间件body-parser
      const parser = require('body-parser')
      app.use(parser.urlencoded({ extended: false }))
      ```

   

6. 自定义中间件

   监听req对象的data事件，来获取客户端发送到服务端的数据，如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割，分批发送到服务端，所以data事件可能会触发多次，每次触发data事件，获取的数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。

   

### 10. CORS跨域资源共享

cors为Express的第三方中间件，可以解决跨域，在路由之前（一定要在路由之前）用app.use(cors())配置

```css
npm i cors
```



#### （1）CORS

CORS（Cross-Origin Resource Sharing, 跨域资源共享）由一系列的HTTP请求头组成，这些HTTP响应头决定浏览器是否阻止JS代码跨域获取资源。

浏览器的同源安全策略默认阻止网页跨域获取资源，但如果接口服务器配置了CORS相关的HTTP响应头，就可以解除浏览器的跨域访问机制。

![image-20220803203009802](@alias/image-20220803203009802.png)

> CORS主要在服务端配置，客户端浏览器无需做额外配置。
>
> CORS在浏览器中有兼容性。只有支持XMLHttpRequest Level2的浏览器，才能正常访问开启了CORS的服务器接口



#### （2）CORS响应头部

**Access-Control-Allow-Origin**

Access-Control-Allow-Origin:  `<origin>` | *

origin指定允许访问资源的外域URL

只允许 http://itcast.cn 的请求

```js
res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn') 
```

`*` 表示允许所有域名的请求

```js
res.setHeader('Access-Control-Allow-Origin', '*') 
```



**Access-Control-Allow-Headers**

![image-20220803205108013](@alias/image-20220803205108013.png)

允许客户端额外向服务器发送Content-Type 请求头和X-Custom-Header

```js
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header') 
```



**Access-Control-Allow-Methods**

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求

如果想要支持PUT、DELETE，则需要在服务端通过Access-Control-Allow-Methods指明实际请求允许使用的HTTP方法

```js
res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,HEAD')
res.setHeader('Access-Control-Allow-Methods', '*')
```



#### （3）简单请求和预检请求

**简单请求**：满足以下条件

- 请求方式：GET、POST、HEAD

- HTTP头部信息不超过以下几种字段：无自定义头部字段

  Accept 、 Accept-Language、Content-Language、DPR、...

  ![image-20220803220051942](@alias/image-20220803220051942.png)

**预检请求**：满足以下条件

- 请求方式为GET、POST、HEAD之外的请求Method类型
- 请求头包含自定义头部字段
- 向服务器发送了application/json格式的数据

在浏览器和服务器正式通信之前，浏览器会先发送OPTION请求进行预检，获知服务器是否允许该实际请求，所以这一次OPTTION请求为预检请求。服务端成功响应预检请求后，才会发送真正的请求，并且携带真实数据。例如delete请求

#### （4）JSONP接口

浏览器通过`<script>`标签的`src`属性，请求服务器上的数据，服务器返回函数回调，这种请求数据的方式叫JSONP

- JSONP不属于真正的Ajax请求，因为没有使用XMLHttpRequest对象
- JSONP仅支持GET请求，不支持POST、PUT、DELETE等请求



## 十、数据库

### 一、传统型数据库

又叫关系型数据库或SQL数据库

- MYSQL（最广泛流行度最高）（Community社区免费 + Enterprise企业收费）
- Oracle（收费）
- SQL Server（收费） 

### 二、新型数据库

又叫非关系型数据库或NoSQL数据库，一定程度上弥补了传统型数据库的缺陷

- Mongodb（Community社区免费 + Enterprise企业收费）

### 三、传统型数据库

数据库（database）、数据表（table），数据行（row），字段（field）

实际项目开发中，每个项目对应独立的数据库，不同的数据，存放到不同的表。每一行数据代表一条具体的数据。

### 四、安装SQL

- MySQL Server：专门用来提供数据存储和服务的软件
- MySQL Workbench：可视化的MySQL管理工具，通过它方便操作存储在MYSQL Server中的数据

### 五、数据库和表及字段

- int
- varchar
- tinyint(1)布尔值字段
- PK（Primary Key）主键、唯一标识
- NN（Not Null）值不允许为空
- UQ（Unique）值唯一
- AI（Auto Increment）值自动增长

### 六、SQL

SQL：Structured Query Language，结构化查询语言，专门用来访问和处理数据库的编程语言。可以以编程的形式操作
（增、删、改、查）数据库里面的数据。

SQL只能在关系型数据库中使用（例如MYSQL，Oracle，SQL Server）。非关系型数据库如Mongodb不支持SQL语言。

#### 1、查询数据select

```sql
SELECT * FROM 表名称 WHERE 列 运算符 值
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
```

#### 2、插入数据insert into

```sql
INSERT INTO table_name(列1,列2,...) VALUES(值1,值2)
```

#### 3、更新数据update

```sql
UPDATE 表名称 SET 列名称 = 新值 WHERE 列 运算符 值
```

#### 4、删除数据delete

```sql
DELETE FROM user WHERE 列 运算符 值
```

#### 5、SQL语法

- where条件

- and （并）和 or （或）运算符

- order by排序

  ```sql
  SELECT * FROM 表名 ORDER BY 列  // 升序
  SELECT * FROM 表名 ORDER BY 列 ASC  // 升序
  SELECT * FROM 表名 ORDER BY 列 DESC  // 降序
  // 多重排序
  SELECT * FROM 表名 ORDER BY 列名1 DESC, 列名2 ASC
  ```

- count(*)函数 

  返回查询结果的总数据条数

  ```sql
   SELECT COUNT(*) FROM 表名称
   SELECT COUNT(*) FROM 表名称 WHERE 列 运算符 值
  ```

- AS 为列设置别名

  ```sql
  SELECT COUNT(*) AS total FROM 表名称 WHERE 列 运算符 值
  ```

- 运算符

  | 运算符    | 描述         |
  | --------- | ------------ |
  | =         | 等于         |
  | <>  /  != | 不等于       |
  | >         | 大于         |
  | <         | 小于         |
  | >=        | 大于等于     |
  | <=        | 小于等于     |
  | BETWEEN   | 在某个范围内 |
  | LIKE      | 搜索某种模式 |

  

### 七、项目中操作MYSQL

#### 1、安装sql模块

mysql模块是托管于npm上的第三方模块，提供了在node.js项目中连接和操作MYSQL数据库的功能。

必须先对mysql模块进行必要的配置

```js
npm install mysql
```

```js
// 导入
const mysql = require('mysql')
// 建立数据库连接
cosnt db = mysql.creatwPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'my_db_01'
})
```

测试配置是否正常，调用db.query()函数：

```sql
db.query('SELECT 1', (err, result) => {
    if(err) return console.log(err.message)
    console.log(result)  // RowDataPacket { '1': 1 }
})
```

#### 2、查询数据

```js
db.query('SELECT * FROM users', (err, results) => {
    if(err) return console.log(err)
    console.log(results)
})
```

#### 3、插入数据

```js
const user = { username: 'lanmx', password: '123456'}
const sqlStr = 'INSERT INTO users SET ?'
db.query(sqlStr, {
    username: user.username,
    password: user.password,
}, (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
```

**插入数据的便捷方式：**

如果数据对象的每个属性和数据表字段一一对应，写法可以更便捷

```js
const user = { username: 'lanmx', password: '123456'}
const sqlStr = 'INSERT INTO users SET ?'
db.query(sqlStr, user, (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
```



#### 4、更新数据

```js
const user = { id: 7, username: 'aaa', password: '555'}
const sqlStr = 'UPDATE users SET username=?, password=? WHERE id = ?'
db.query(sqlStr, [user.username, user.password, user.id], (err, result) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
```

**更新数据的便捷方式：**

如果数据对象的每个属性和数据表字段一一对应，写法可以更便捷

```js
const user = { username: 'lanmx', password: '123456'}
const sqlStr = 'UPDATE users SET ? WHERE id=?'
db.query(sqlStr, [user, user.id], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('更新数据成功')
    }
})
```

#### 5、删除数据

```
const sqlStr = 'DELETE FROM users WHRER id=?'
// 如果SQL语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
// 如果SQL语句中只有一个占位符，则可以省略数组
db.query(sqlStr, 7, (err, result) => {
	if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('删除数据成功')
    }
})
```

#### 6、标记删除

在使用DELETE语句，会真正吧数据从表删除，为了保险，推荐使用标记删除的形式，模拟删除动作。所谓标记删除，类似status状态字段，来标记数据是否被删除。也就是使用UPDATE语句修改status字段，标记为删除状态。

```js
db.query('UPDATE USERS SET status = 1 WHERE id = ?', [1,6], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('更新数据成功')
    }
})
```



## 十一、前后端身份认证

#### 一、服务端渲染的web开发模式

服务端发送给客户端HTML页面，是在服务端通过字符串拼接动态生成的。所以客户端不需要用Ajax技术额外请求页面数据。

```js
app.get('/index.html', (req, res) => {
    const user = { name: 'lanxm', age: 20 }
    const html = `<h1>姓名： ${user.name}, 年龄：${user.age}</h1>`
    res.send(html)
})
```

##### 1、服务端渲染优点

- 前端耗时少。因为是服务器生成的HTML页面，浏览器之需要渲染即可，尤其是移动端，更省电。
- 有利于SEO。因为服务端响应的是完整的HTML页面内容，爬虫更容易爬取信息，更有利于SEO。

##### 2、服务端渲染缺点

- 占用服务端资源。如果请求过多，会给服务器造成一定的访问压力
- 不利于前后端分离，开发效率低。使用服务端渲染，无法分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。



#### 二、前后端分离的web开发模式

前后端分离的开发模式，依赖于Ajax技术。后端只负责提供API接口，前端使用Ajax调用接口的开发模式。

###### 1、服务端渲染优点

- 开发体验好。前端专注UI开发，后端专注api开发，且前端有更多选择性。
- 用户体验好。Ajax广泛应用，提高用户体验，可以轻松实现局部刷新。
- 减轻服务器渲染压力。因为页面是在每个用户的浏览器生成的。

###### 2、服务端渲染缺点

- 不利于SEO。因为完整的HTML页面是在客户端完成渲染的，爬虫无法爬取有效信息。（解决方法：利用Vue、React等前端框架的SSR(server side render)技术能够很好的解决SEO。）



#### 三、如何选择Web开发模式

- 企业级网站，主要功能是展示而没有复杂的交互，且需要良好的SEO，用服务端渲染。
- 类似后台管理项目，交互性较强，不需要考虑SEO，可以使用前后端分离的开发模式。
- 为了同时兼顾首页渲染速度和前后端分离的开发效率，一些网站采用首屏服务端渲染  + 其它页面前后端分离的开发模式。



#### 四、身份认证

身份认证（Authentication）又称身份验证、鉴权，指通过一定的手段，完成对用户身份的确认。例如高铁验票，支付宝支付密码，二维码登录，手机验证码登录，邮箱密码登录。

不同开发模式下的身份认证：

- 服务端渲染推荐使用Session认证机制
- 前后端分离推荐使用JWT认证机制

##### 1、HTTP协议的无状态性

了解http协议的无状态性是进一步学习Session认证机制的必要前提。

HTTP协议的无状态性，指的是客户端的每次HTTP请求都是独立的，连续多个请求之前没有直接关系，服务端不会主动保留每次HTTP请求的状态。

现实生活中会员卡身份认证方式，在Web开发中叫Cookie.

##### 2、Cookie

Cookie是存储在用户浏览器中的一段不超过4KB的字符串。它由名称（name）、值（Value）和其它就几个用于控制Cookie有效性、安全性、使用范围的可选属性组成

。

不同域名下的Cookie各自成立，每当客户端发起请求，会自动把当前域名下的所有未过期的Cookie一同发到服务器。

**Cookie特性：**

- 自动发送
- 域名独立
- 过期时限
- 4KB限制

##### 3、Cookie在身份证中的作用

客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的Cookie，客户端会自动将Cookie保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份。

![image-20221029195149386](@alias/image-20221029195149386.png)

![image-20221029195229405](@alias/image-20221029195229405.png)

##### 4、Cookie不具有安全性

由于Cookie存在浏览器中，而且浏览器也提供了读写Cookie的API，因此Cookie很容易被伪造，因此不建议服务器将重要的隐私数据（例如用户的身份信息，密码），通过Cookie形式发送给浏览器。

如何提高身份认证的安全性：使用Session。

##### 5、Session认证机制的精髓

**Session工作原理**

![image-20221029200149450](@alias/image-20221029200149450.png)

**在express中使用Session认证**

1. 安装express-session

   ```js
   npm install express-session
   ```

2. 配置express-session中间件

   通过app.use()来注册中间件

   ```js
   const session = require('express-session')
   app.use(
       session({
       secret: 'keyboard cat'， // secret 属性可以为任意字符串
       resave: false, // 固定写法
       saveUninitialized: true // 固定写法
   }))
   ```

3. session中存数据

   当express-session中间件配置成功后，即可通过req.session访问和使用session对象，从而存储用户的关键信息。

   ```js
   app.post('/api/login', (req, res) => {
       // 只有成功配置了express-session中间件，才能通过req获取session
       req.session.user = req.body
       res.session.islogin = true
       res.send({ status: 0, msg: '登录成功'})
   })
   ```

4. 获取session用户数据

   ```js
   app.get('api/username', (req, res) => {
       if(!res.session.islogin) return res.send({ status: 1, msg: 'fail' })
       res.send({
           status: 0,
           msg: 'success',
           username: req.session.user.username
       })
   })
   ```
   
4. 清空服务器保存的session

   ```js
   // 退出登录
   app.post('api/logout', (req, res) => {
       req.session.destroy()
       res.send({ status: 0, msg: '退出登录成功'})
   })
   ```



##### 6、JWT认证机制

1. Session认证的局限性

   Session认证机制需要配合Cookie才能实现，由于Cookie默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口，需要做很多额外的配置，才能实现Session认证。

2. 当前端请求后端接口不存在跨域问题时，推荐使用Session身份认证机制；否则，不推荐用Session，推荐使用JWT。

**JWT**

JWT（JSON Web Token）是目前最流行的跨域认证解决方案。

**JWT工作原理**

用户的信息通过Token的形式，保存在客户端浏览器中，服务器通过还原Token字符串的形式来认证用户的身份。

![image-20221030103910820](@alias/image-20221030103910820.png)

**（一）JWT组成部分**

JWT通常由三部分组成，分别是Header(头部)，Payload(有效荷载)，Signature(签名)；用'.'分隔

```js
Header.Payload.Signature
```

- Payload部分是真正的用户信息，加密用户信息后生成的字符串
- Header和Signature是安全性相关，是为了证明Token的安全性

客户端收到服务器的JWT后，通常会将它存储在localStorage或sessionStorage中，此后，客户端每次与服务端通信，都会带上JWT字符串，从而进行身份认证，推荐的做法是把JWT放在HTTP请求头的Authoriztion字段中。

**（二）在Express中使用JWT**

```js
// 安装
npm install jsonwebtoken express-jwt
```

- jsonwebtoken用于生成JWT字符串
- express-jwt用于将JWT字符串解析还原成JSON对象

**（1）定义secret秘钥**

为了保证JWT字符串安全性，防止JWT字符串在网络传输中被别人破解，需要专门定于用于加密和解密的secret秘钥：

- 当生成JWT字符串时，需要使用secret秘钥对用户信息进行加密，最终得到加密好的JWT字符串
- 当把JWT字符串解析还原成JSON对象的时候，需要用secret秘钥进行解密

```js
app.use('api/login', function(req, res) {
    res.send({
        status: 200,
        message: 'success',
        token: jwt.sign({ username: userinfo.username }, secretKey, { expresIn: '30s'})
    })
})
```

**（2）将JWT字符串还原为JSON对象**

通过express-jwt中间件

```js
app.use(sexpressJWT({ secret: secretKey })).unless({ path: [/^\/api\//]})
// unless配置哪些路由不需要验证
```

**（3）解析JWT失败**

```js
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        return res.send( { status: 401, message: '无效的token'})
    }
}) 
```



## 十二、初始化项目

```js
初始化：npm init -y
```

#### （一）推荐使用express全局安装一键生成目录

```js
npm install -g express-generator
express 项目名称
cd 项目
npm install 将项目依赖包下载到本地
npm status 启动项目
```



## 十三、登录注册接口

- 定义路由和处理函数

- 验证表单数据
- 实现接口功能

#### 1. 用户密码加密存储

使用bcryptjs加密，优点

- 加密后的密码无法被逆向破解
- 同一明文密码多次加密。得到的加密结果不相同，保证了安全性

```js
npm i bcryptjs
// 调用bcrybt.hashSync('明文密码','随机盐的长度')
user.password = bcrybt.hashSync(user.password,10)
```

#### 2. 优化res.send代码

声明一个中间件，同一处理报错信息

```js
// 在路由之前封装接口返回的函数，res.back函数
app.use(function(req, res, next) {
  // status默认值为1, 表示失败的情况
  // err可能是一个错误对象，也有可能是描述错误的字符串
  res.back = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
```

使用

```js
// if(err) return res.back(err)
```

#### 3. 优化表单数据验证

前端验证为辅，后端验证为主，后端永远不要相信前端提交过来的内容；

使用if ... else ...验证效率低，出错率高，维护性低。因此使用第三方验证模块

```js
// 安装hapi/joi包，为表单中携带的每个数据项，定义验证规则
npm install @hapi/joi  //已弃用
npm install joi 

// 安装escook/express-joi包，实现自动对表单数据验证的功能
npm install @escook/express-joi
```

#### 4. 验证密码和加密密码

调用bcrypt.compareSync('用户提交的密码','数据库中加密的密码')方法比较密码是都正确，返回true为一致，false为不一致

```js
const bol = bcrypt.compareSync('用户提交的密码','数据库中加密的密码')
```

#### 5. 生成JWT的Token字符串

**在生成token字符串前，一定要剔除密码和头像的值**

```js
// 清空密码头像
const user = { ...token[0], password: '', user_pic: ''}
// 下载生成token包
npm i jsonwebtoken@8.5.1
const jwt = require('jsonwebtoken')
// 创建config.js文件，共享加密和还原token的jwtSecretKey字符串
module.exports = {
    jwtSecretKey: 'xxxxx'
}
// 导入配置文件，将用户信息加密成Token字符串
const config = require('../config')
const tokenStr = jwt.sign(user, config.jwtSecreKey, {
    expiresIn: '10h' // token有效期为10小时
})
// 最后token响应给前端
res.send({
    token: 'Bearer ' + tokenStr
})
```

#### 6.安装解析token中间件

```js
npm i express-jwt@5.3.3
```

**定义哪些接口不需要token的身份认证**

```js
// 使用unless()指定api开头的接口都不需要身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//]} ))

const expressJWT = require('express-jwt');
const { jwtSercet } = require('../utils/jwtConfig');

const jwtAuth = expressJWT({
  // 加密时所用的密匙
  secret: jwtSercet,
  // 设置算法
  algorithms: ['HS256'],
  // 无token请求不进行解析，并且抛出异常
  credentialsRequired: false
}).unless({
  path: [
    '/userSession',
    '/salesmanSession',
    '/adminSession',
    '/superAdminSession',
    '/swiper',
    '/freeSalesman',
    '/headImg',
    { url: '/admin', methods: ['GET', 'POST'] },
    { url: /^\/salesman\/.*/, methods: ['GET'] },
    { url: '/productsCate', methods: ['GET'] },
    { url: '/products', methods: ['GET'] },
    { url: /^\/products\/.*/, methods: ['GET'] },
    { url: '/user', methods: ['POST'] },
    { url: /^\/user\/.*/, methods: ['GET'] }
  ]
});

module.exports = jwtAuth

const myFilter = function(){}
unless(myFilter);

unless({
    path:[/^\/user\/.*/]
})

unless({
    path:[
        {url:/^\/user\/.*/,methods:['GET']}
    ]
})

unless({
    path:[
        {url:'/user',methods:['GET']}
    ]
})
unless({
    path:['/user']
})
```

**在错误级别中间件，捕获处理token失败的错误**

```js
// 身份认证失败错误
if(err.name === 'UnauthorizedError') return res.back('身份认证失败！')
```


<ClientOnly>
  <Valine></Valine>
</ClientOnly>