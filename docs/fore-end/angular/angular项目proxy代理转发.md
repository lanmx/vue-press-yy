## 一、新建proxy.conf.json文件

![image-20230306162626248](@alias/image-20230306162626248.png)

> 不同项目服务器不一样，但是需要调取其他项目的接口，但是服务器不一样，直接调接口不通；
>
> 这时候，可以通过proxy代理配置，让代理帮忙转发接口；

## 二、配置proxy.conf.json文件

例如，MBP项目里需要转发的接口是OA服务器的，在MBP项目的根目录下新建proxy.conf.json文件

- `/oa/`：是给请求地址添加的前缀
- `target`：请求的目标服务器`IP`地址
- `secure`：为false时，允许不是`https`和安全证书无效的服务
- `pathRewrite`：把`/oa/`重写为''。不加该字段，则请求 `http://localhost:8100/oa/getUser`会请求到 `http://localhost:8100/oa/getUser` 。加上了，则请求到 `http://localhost:8100/getUser`
- `changeOrigin`：为true ，允许请求跨域
- `logLevel`："debug", // 是否打印转发日志

```json
{
  "/oa/*": {
    "target": "http://10.89.186.100:80",
    "secure": false,
    "pathRewrite":  {
        "^/oa": ""
    }
  }
}
```

## 三、在package.json文件中添加服务启动时同时启动代理文件

在项目启动命令后面加上 `--proxy-config ./proxy.conf.json`

```json
 "scripts": {
        "serve": "node --max_old_space_size=10240 --max-old-space-size=10240 --max_semi_space_size=512 --max-semi-space-size=512 ./node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js serve --webpack ./webpack.config.js --proxy-config ./proxy.conf.json",
 },
```

## 四、请求地址加前缀

- 请求`url`地址不需要加上`IP`地址，直接拼后缀

- 前缀要加上`/oa/`

```js
getempUser(params) {
    let query = `bosid=${params.bosid}&login=${params.login}`
    let url =  `/oa/GFProject/FOS/OTMAC/SignalFlowApp/interface/isCplxrFinish.jsp?${query}`;
    this.http.get(url).subscribe(res=> {
        console.log('111111-res:', res)
    })
}
```

![image-20230306164238877](@alias/image-20230306164238877.png)

![image-20230306164839365](@alias/image-20230306164839365.png)