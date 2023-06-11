## 1. http的缓存机制（服务端的缓存策略）

### （1）强制缓存

客户端向服务端第一次请求资源，服务端返回资源，服务器response header响应头设置缓存Cache-Control；max-age：3153600

如果不希望缓存就设置no-cache

客户端会根据响应头是否需要缓存资源到本地，所以资源是否需要缓存都是由服务端决定的

![image-20220224090455799](@alias/image-20220224090455799.png)

![image-20220224090521304](@alias/image-20220224090521304.png)

### （2）协商缓存（对比缓存）

客户端向服务端请求资源，如果服务端认为这些资源可以缓存的话，就会返回资源和资源标识；

客户端后续发送请求带上资源标识，服务端根据资源标识判断资源是否有更新过，如果更新过，则返回200状态码、最新的资源和资源标识；如果是最新的资源了（没有更新过），服务端返回304状态码即可（响应体很小），客户端则直接从缓存里拿资源。

![image-20220224091034721](@alias/image-20220224091034721.png)

![image-20220224084319810](@alias/image-20220224084319810.png)

https://www.bilibili.com/video/BV17Q4y127We?p=4

https://www.cnblogs.com/chenqf/p/6386163.html

### （3）客户端的资源标识（请求头）

- If-Modified-Since：拿到服务端请求的数据时同时会拿到资源的修改时间（也就是服务端拿到的Last-Modified），再次请求的时候会带上
- If-None-Match：资源对应的唯一字符串，请求时带上，服务端会把它与ETag比较是否一样，一样则走304，不一样就重新请求

### （4）服务端的资源标识（响应头）

- Last-Modified：资源上一次修改的时间
- ETag：资源的唯一字符串

### （5）ETag与Last-Modified的区别

**优先使用ETag**

1. 因为Last-Modified的值只会精确到秒级，不够精确，js文件修改一般以毫秒为单位。

1. 文件如果每隔一段时间都有重复生成，但内容相同，Last-Modified也会返回资源文件，即使内容相同（因为修改时间更新了），但是ETag可以判断出文件内容相同，就会返回304，使用缓存。


## 2、http请求头的类型有哪些
HTTP请求头提供了关于请求，响应或者其他的发送实体的信息。
HTTP的头信息包括通用头、请求头、响应头和实体头四个部分。
每个头域由一个域名，冒号（:）和域值三部分组成。
- 通用头标：即可用于请求，也可用于响应，是作为一个整体而不是特定资源与事务相关联。
- 请求头标：允许客户端传递关于自身的信息和希望的响应形式。
- 响应头标：服务器和于传递自身信息的响应。
- 实体头标：定义被传送资源的信息。即可用于请求，也可用于响应。
根据上面的分类我们可以把他们分为:Request和Response两部分。
### （1）HTTP Request Header 请求头
```js
Accept：指定客户端能够接收的内容类型。
Accept-Charset：浏览器可以接受的字符编码集。
Accept-Encoding：指定浏览器可以支持的web服务器返回内容压缩编码类型。
Accept-Language：浏览器可接受的语言。
Accept-Ranges：可以请求网页实体的一个或者多个子范围字段。
AuthorizationHTTP：授权的授权证书。
Cache-Control：指定请求和响应遵循的缓存机制。
Connection：表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
CookieHTTP：请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。
Content-Length：请求的内容长度。
Content-Type：请求的与实体对应的MIME信息。
Date：请求发送的日期和时间。
Expect：请求的特定的服务器行为。
From：发出请求的用户的Email。
Host：指定请求的服务器的域名和端口号。
If-Match：只有请求内容与实体相匹配才有效。
If-Modified-Since：如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码。
If-None-Match：如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变。
If-Range：如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。
If-Unmodified-Since：只在实体在指定时间之后未被修改才请求成功。
Max-Forwards：限制信息通过代理和网关传送的时间。
Pragma：用来包含实现特定的指令。
Proxy-Authorization：连接到代理的授权证书。
Range：只请求实体的一部分，指定范围。
Referer：先前网页的地址，当前请求网页紧随其后,即来路。
TE：客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息。
Upgrade：向服务器指定某种传输协议以便服务器进行转换（如果支持。
User-AgentUser-Agent：的内容包含发出请求的用户信息。
Via：通知中间网关或代理服务器地址，通信协议。
Warning：关于消息实体的警告信息
```
### （2）HTTP Responses Header 响应头
```js
Accept-Ranges：表明服务器是否支持指定范围请求及哪种类型的分段请求。
Age：从原始服务器到代理缓存形成的估算时间（以秒计，非负）。
Allow：对某网络资源的有效的请求行为，不允许则返回405。
Cache-Control：告诉所有的缓存机制是否可以缓存及哪种类型。
Content-Encodingweb：服务器支持的返回内容压缩编码类型。。
Content-Language：响应体的语言。
Content-Length：响应体的长度。
Content-Location：请求资源可替代的备用的另一地址。
Content-MD5：返回资源的MD5校验值。
Content-Range：在整个返回体中本部分的字节位置。
Content-Type：返回内容的MIME类型。
Date：原始服务器消息发出的时间。
ETag：请求变量的实体标签的当前值。
Expires：响应过期的日期和时间。
Last-Modified：请求资源的最后修改时间。
Location：用来重定向接收方到非请求URL的位置来完成请求或标识新的资源。
Pragma：包括实现特定的指令，它可应用到响应链上的任何接收方。
Proxy-Authenticate：它指出认证方案和可应用到代理的该URL上的参数。
refresh：应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）
Retry-After：如果实体暂时不可取，通知客户端在指定时间之后再次尝试。
Serverweb：服务器软件名称。
Set-Cookie：设置Http Cookie。
Trailer：指出头域在分块传输编码的尾部存在。
Transfer-Encoding：文件传输编码。
Vary：告诉下游代理是使用缓存响应还是从原始服务器请求。
Via：告知代理客户端响应是通过哪里发送的。
Warning：警告实体可能存在的问题。
WWW-Authenticate：表明客户端请求实体应该使用的授权方案
```