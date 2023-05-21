## get请求封装

利用new Promise 和subscribe

```ts
get(url) {
    return new Promise<any>((resolve, rej) => {
        this.http.get(url).subscribe(
            res => {
                console.log(res,"subscribe");
                let resBody = {}
                resBody = JSON.parse(res['_body'])
                resolve(resBody)
            },
            error => {
                console.log(error,"error");
                rej(JSON.stringify(error))
            },
            () => {
                console.log("other");
                rej(null)
            })
    })
}
```

利用toPromise和try catch

```ts
async get(url):Promise<any>   {
    try {
        const res = await this.http.get(url).toPromise()
        console.log(res,"subscribe");
        let resBody = {};
        resBody = JSON.parse(res['_body']);
        return resBody
    } catch (error){
        console.log(error,"error");
        if (error) {
            // 接口404报错
            if (error['status'] === 404) {
                const errorbody = JSON.parse(error['_body']);
                const errormsg = `${errorbody['error']},${errorbody['status']}',path:'${errorbody['path']}`;
                return  errormsg
            }  else if (error['status'] === 500) {
                // 服务器报错
                const errormsg = `服务器出错了,${error['status']},${error['_body']}`
                return errormsg
            } else if (error['status'] === 0) {
                // 接口跨域报错
                const errormsg = `接口跨域了,path:${url}`
                return errormsg
            } else {
                // 其它报错
                return `出错了,${JSON.stringify(error)}`;
            }
        } else {
            return null;
        }
    }
}
```