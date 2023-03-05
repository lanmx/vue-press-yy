## 一、angular命令新建组件

```
ng g component components/news
ng g component home
```

## 二、创建项目不安装依赖

```
ng new angulardemo --skip-install
```

## 三、声明属性的几种方式

- public 共有，可以在这个类里面使用，也可以在类外面使用
- protected  保护类型 只有当前类和他的子类可以访问
- private  私有 只有当前类才可以访问这个属性

```typescript
public name:any="lanmx"
public user: object={
    username: "lanmx",
    age:"20
}
public user: any={
    username: "lanmx",
    age:"20
}
public msghtml="<h1>你好</h1>"
public list:any[]=['11',22,'EE']
public list:Array<any>=[1,3,4,5]
```

## 四、angular模块属性

#### 1. title

鼠标以上该DOM显示`title`内容

```html
<div title="kkk"></div>
<div [title]="msg"></div>
```

#### 2. innerHTML

 innerHTML绑定html

```html
<div innerHTML="<h1>你好</h1>"></div>
<div [innerHTML]="msghtml"</div>
```

#### 3. *ngFor

数据循环，遍历

用法和vue的v-for类似

```HTML
<ul>
    <li *ngFor="let item of list; let key = index">
        {{ item }}
    </li>
</ul>
```

#### 4. *ngIf

条件判断，是否显示，用法和vue的v-if类似

#### 5. src

```html
<img src="assets/images/01.png" />
<img [src]="url" />
```

#### 6. class

```html
<span class="red">文字样式变红色</span>
```

#### 7. *ngSwitch

```html
<ul [ngSwitch]="score">
    <li *ngSwitchCase="1">已支付</li>
    <li *ngSwitchCase="2">已发货</li>
    <li *ngSwitchDefault="3">无效</li>
</ul>
```



#### 8.  (click)="getData"

#### 9.  (change)="changeData"



#### 9. 表单事件

#### （1）keydown

```html
<input type="text" (keydown)="keyDown($event)">
<input type="text" (keyup)="keyUp($event)">
<button (click)="clickButton($event)">点击变红色</button>
```

```typescript
// 按键敲下触发
keyDown(e) {
    console.log('11')
    if(e.keyCode == 13) {
        console.log('按了一下回车键');
    }
    // 获取DOM对象
    console.log(e.target);
    // 获取DOM对象的value值
    console.log(e.target.value);
}
// 按键抬起触发
keyUp() {
}
clickButton(event) {
    let dom:any = event.target
    dom.style.color="red"
}
```

#### 10. 双向数据绑定

#### （1）导入

```typescript
// app.module.ts
import { FromsModule } from '@angular/forms'

@NgModule({
    declarations: [],
    imports: [
        FromsModule
    ],
    providers: [],
    bootstrap: []
})
export class AppModule {}
```

#### （2）使用

```html
<input type="text" [ngModel]="inputValue">
```

```typescript
 public inputValue: string="默认值"
```



#### 11. [ngClass]

```html
<div [ngClass]="{'orange': true, 'red': false}">
	橙色
</div>
```



#### 12. [ngStyle]

```html
<div [ngStyle]="{'color: green'}">
    绿色
</div>
<div [ngStyle]="{'color: attr'}">
    绿色
</div>
```

```typescript
public attr='red'
```

#### 13. 管道（pipe）

管道是用来对输入的数据进行处理，如大小写转换，数值和日期格式化

#### （1）日期格式转换

```html
<div>
    {{ today | date: 'yyyy-MM-dd HH:mm:ss' }}
</div>
```

#### （2）JavaScript对象序列化

```html
<div>
    {{ name: 'lanmx' | json }}
    <!-- { "name": "lanmx" } -->
</div>
```

#### （3）大小写转换

```html
<!-- 转成大写 -->
<p> {{ str | uppercase }} </p>  
<!-- 转成小写 -->
<p> {{ str | lowercase }} </p>
```

#### （4）小数位数

保留2~4位小数

```html
<!-- 保留2~4位小数 -->
<p> {{ number | number: '1.2-4' }} </p>
```

#### （5）slice

```html
<!-- 字符串切割: lan -->
<p> {{ 'lanmx' | slice: 0:3 }} </p>
```

#### （6）管道链

```html
<!-- 字符串切割: LAN -->
<p> {{ 'lanmx' | slice: 0:3 | uppercase}} </p>
```

#### （7）自定义管道

1. 新建sex-reform管道文件

   ```
   ng g pipe sex-reform
   ```

2. 编辑sex-reform.pipe.ts文件

   ```typescript
   import { Pipe, PipeTransform } form '@angular/core'; //引入PipeTransform是为了继承transform方法
   
   
   @Pipe({ name: 'sexReform' }) //name属性值惯用小驼峰是写法, name的值为html中| 后面的名称
   
   
   export class SexReformPipe implements PipeTransform {
       transform(value: string, args?: any): string {
           switch(value){
               case 'male': return '男';
               case 'female': return '女';
               default: return '雌雄同体';
           } 
       }
   }
   ```

3. 在module中声明管道

   ```typescript
   declarations: [SexReformPipe] 
   ```

4. 组件中使用自定义管道

   ```typescript
   // demo.component.ts
   export Class DemoComponent {
       sexValue = 'male';
   }
   
   // demo.component.html
   <span>{{ sexValue | sexReform }}</span>
   
   // 浏览器输出
   男
   
   ```

同@Component({})和@NgModel({})一样，@Pipe({})代表这是一个管道，里面定义了一组元数据，用来告诉angular这个管道是如何工作的；

每一个自定义管道都需要实现PipeTransform接口， transform方法用来对传入的值进行一系列处理，最后转化为需要的值后return即可；

transform()方法参数格式 - transform(value: string, args1: any, args2: any): value为传入的值（即为需要用此管道处理的值， | 前面的值）; args 为传入的参数(?:代表可选)；

html中使用管道格式

```html
<!-- 字符串切割: lan -->
<p> {{ '数据' | '管道名' : '参数1' : '参数2' }} </p>
```




## 五、缓存数据

显示ng所有的命令列表和解释

```
ng g
```

创建服务命令

```typescript
ng g service my-new-service
// 创建到指定目录
ng g service services/storage
```

在app.module.ts里面输入创建的服务

```typescript
import { StorageSerivce } from './storage.service'
@ngModule {
	providers: [StorageSerivce]    
}
```

使用缓存

```typescript
localstorage.setItem(set,value)

localstorage.getItem(key)

localstorage.removeItem(key)
```



## 六、服务相互调用

## 七、生命周期
https://angular.cn/   Angular中文官方文档

声明周期钩子顺序，如下图

![image-20230220215848247](@alias/image-20230220215848247.png)

- **ngOnChanges**：当组件数据绑定的输入属性发生变化时触发，该方法接收一个SimpleChanges对象，包括当前值和上一个属性值。首次调用一定发生在ngOnInit前，值得注意的是该方法仅限于对象的引用发生变化时才触发。
- **ngOninit**：组件和指令初始化完成，并不是真正的dom加载完成。在Angular第一次显示数据绑定和设置指令或组件的输入属性之后，初始化指令或组件，该方法只调用一次

- **ngAfterViewInit()**：视图加载完成以后触发的方法，dom加载已完成，dom操作可在这里获取



## 八、ViewChild

**ViewChild**也可以获取dom节点，ViewChild对原生节点做了封装

```html
<div #mybox>
    你好
</div>
```

```typescript
import { ViewChild } from '@angular/core'
// 获取dom节点
@ViewChild('mybox') mybox:any
```

父组件通过ViewChild调用子组件方法，直接给子组件定义#footerDom，再用ViewChild

**ViewChild**也可以获取dom节点，ViewChild对原生节点做了封装

```html
<app-header #header>
    你好
</app-header>
```

```typescript
import { ViewChild } from '@angular/core'
// 获取子组件整个实例
@ViewChild('header') header:any
// 使用
this.header.run()
```

```typescript
import { ViewChild，ElementRef } from '@angular/core'
// 获取子组件整个实例
@ViewChild('header') header:ElementRef
// 使用
this.header.run()
```



## 九、父子组件通信

### 父传子

父组件不仅可以传数据，也可以传方法和整个组件实例

#### 1. 父组件绑定变量传值

```html
<app-header [msg]="msg" [run]="run" [home]="this"></app-header>
```

#### 2. 子组件引入Input模块

```typescript
import { Input } from '@angular/core'
```

#### 3. 子组件@Input接收父组件传过来的数据

```typescript
export class HeaderComponent implements OnInit {
    @Input() msg: string  // 传数据
    @Input() run: any  // 传方法
    @Input() home: any  // 组件实例
    constructor() {}
    ngOnInit() {
        console.log(this.msg)
        this.run()
        console.log(this.home.msg)
    }
}
```

### 子传父

父组件获取子组件的数据和方法：通过@ViewChild

#### 1. 给调用组件定义一个名称

```html
<app-footer #footerChild></app-footer>
```

#### 2.父组件引入@ViewChild

```
import { ViewChild } from '@angular/core'
```

#### 3. 父组件接收和获取

```typescript
export class HeaderComponent implements OnInit {
   @ViewChild('footer') footer :any
    constructor() {}
    ngOnInit() {
    	// 获取子组件数据和执行子组件方法
        console.log(this.footer.msg)
        console.log(this.footer.run())
    }
}
```

#### 父组件监听子组件的事件

子组件暴露一个EventEmitter属性，当事件发生时，子组件利用该属性emits发射事件，父组件绑定这个事件属性，就会在事件发生时做出反应。

子组件的EventEmitter属性通常带有@Output装饰器



## 十、 服务Service

#### 1. 创建服务

服务于服务之间可以相互调用；

注入根，所有模块使用同一个服务实例对象

```typescript
import { Injectable } from '@angular/core'
@Injectable({
    providedIn: 'root'
})
export class TestService{}
```

注入模块，该模块使用同一个服务实例对象

```typescript
import { Injectable } from '@angular/core'
import { CarModule } from './car.module'
@Injectable({
    providedIn: 'CarModule'
})
export class CarService{}
```

```typescript
import { CarService } from './car.service'
@Ngmodule({
    providers: 'CarService'
})
export class CarModule{}
```

在组件级别注册服务，该组件和其子组件使用同一个服务实例对象

```typescript
import { Commponent } from '@angular/core'
import { CarService } from './car.service'
@Commponent({
    selector: 'Car-list-page',
    templateUrl: './Car-list.component.html',
    providers: [CarService]
})
```

## 十一、DI框架

### （1） 注入器 Injectors

![img](@alias/企业微信截图_16503841733650.png)

![img](@alias/企业微信截图_16503842839435.png)

### （2） 提供者 Provider：注入器的配置对象

配置注入器的对象，指定创建实例对象的服务类和访问服务实例对象的标识

```typescript
const injector = ReflectiveInjector.resolveAndCreate([
    { provide: MailService, useClass: MailService}
    // provides是useClass类的标识名字
    // useClass: MailService是所使用类的名字
]
```

访问依赖对象的标识也可以是字符串类型

```typescript
const injector = ReflectiveInjector.resolveAndCreate([
    { provide: 'mail', useClass: MailService }
]
```

useValue

```typescript
const injector = ReflectiveInjector.resolveAndCreate([
    { provide: 'config', 
      useValue: Object.freeze({
          APIKEY: "API77979"
      })
    }
])
const config = injector.get('config')
```

实例对象和外部的引用建立松耦关系，外部提供标识获取实例对象，只要标识保持不变，内部代码怎么变都不会影响到外部



## 十一、RxJS

获取异步方法： 

- 回调函数，回调地狱

- Promise

  ```typescript
  getDate() {
  	return new Promise((resolve,reject) => {
          setTimeout(() => {
              resolve()
          },1000)
      })    
  }
  this.getDate().then(() => {
      
  }).catch(() => {
      
  })
  ```

- RxJS

RxJS可以让异步更加简单，常用有Observable和fromEvent

```
import { Observable } from 'rxjs';
const stream = new Observable(observer => {
	setTimeout(() => {
		observer.next('observerable timeout')
    },1000)
})
stream.subscribe(value => {

})
```

```
import { Observable } from 'rxjs';
getDate() {
	return new Observable((observer) => {
        setTimeout(() => {
            observer.next()
            observer.error()
        },1000)
    })    
}
this.getDate().subscribe(() => {
})
```



## 十二、Promise和RxJS对比

用法类似，`RxJS`用的是`then()`和`resolve()`，而`RxJS`里面用的是`subscribe()`和`next()`



## 十三、RxJS强大之处

- 中途撤回
- 发射多个值
- Rxjs提供多种工具函数

#### 1. 中途撤回：取消订阅unsbusctibe

Promise不可以中途撤回。

Observable可以通过unsbusctibe中途撤回，在Observable中做了智能处理。

实质上是请求已经发送了，只是不订阅返回的数据。

```typescript
// 0.5秒后取消订阅
setTimeout(() => {
    this.getDate().unsbusctibe()
},500)
```



#### 1. 订阅后多次执行

Promise要么resolve，要么reject，而且都只能触发一次。

而Observable不一样，它可以`next()`不停触发下一个值

```typescript
getPromise() {
    return new Promise((resolve,reject) => {
        // 只执行一次
        setInterval(() => {
            console.log(11)
            resolve()
        },1000)
    })    
}
```

```typescript
getObservable() {
	return new Observable((observer) => {
        // 执行多次
        setTimeout(() => {
            observer.next()
        },1000)
    })    
}
```



## 十四、Angular6.x之前使用的工具函数

- map
- filter
- throtteTime：延迟执行

angular6以后使用以前的rxjs方法，必须安装rxjs-compat模块才可以使用map、filter方法。

angular6后官方是使用RXJS6新特性

```
npm install rxjs-compat
```

```typescript
import { Observable, fromEvent } from 'rxjs'
import 'rxjs/Rx'
```

```typescript
import { Observable } from 'rxjs'
import { map , filter, throtteTime } from 'rxjs/operators'

var streamNum = this.request.getObservable
// filter
streamNum.pipe(filter(item => {
    return item%2 == 0
})).subscribe(data => {
    // 返回过滤后的data
    console.log(data)
})

// map
streamNum.pipe(map(item => {
    return item * item
})).subscribe(data => {
    // 返回过滤后的data
    console.log(data)
})

// 组合使用
streamNum.pipe(filter(item => {
    return item%2 == 0
}),
	map(ele => {
    return item * item
})).subscribe(data => {
    // 返回过滤后的data
    console.log(data)
})

// 延迟执行
fromEvent(button, 'click').pipe(
    throtteTime(1000)
).subscribe(() => {
    
})
```



## 十五、Angular 中 get / post / json

#### 1. get

Angular 5.x后使用get / post和服务器交互的是 HttpClientModule模块

在app.module.ts中引入HttpClientModule并注入

```typescript
import { HttpClientModule } from '@angular/common/http'
@NgModule({
    imports: [
        HttpClientModule,
    ]
})
export class AppModule{}
```

在使用的地方引入HttpClient 、HttpHeaders并构造函数声明

```typescript
import { HttpClient,HttpHeaders } from '@angular/common/http
constructor(
    public http: HttpClient
)

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
this.http.get(api,params, httpOptions).subscribe(res => {
    console.log(res)
})
```

#### 2. post / put 

看源码就会用了

#### 3. jsonp

在app.module.ts中引入HttpClientJsonpModule并注入

```typescript
import { HttpClientModule,  HttpClientJsonpModule } from '@angular/common/http
@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ]
})
export class AppModule{}
```



#### 4. angular中使用axios

安装

```
cnpm install axios --save
```

引入

```typescript
import axios from 'axios'
```

使用

```typescript
getData() {
    return new Promise((resolve, reject) => {
        axios.get(api).then((res) => {
            resolve(res)
        })
    }) 
    
}
```



## 十六、路由

根据不同url，动态地让根组件挂载其它组件，来实现单页面应用

#### 1. 使用路由

app-routing.module.ts：配置路由的模块

在该模块引入路由的组件

```typescript
import { HomeComponent } from './home/home.component'
```

配置路由

```typescript
const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'home/:id', component: HomeComponent
    },
    {
        path: '', redirctTo: '/home', pathMatch: 'full'
    },
    {
        path: '**', component: 404
    },
]
```

app-component.html

```html
<a routerLink="/home">首页</a>
<a [routerLink]="['/path', routerparam ]" routerLinkActive="active">{{ name }}</a>
<-- 在css里可直接配置 .active { color: red } -->
<router-outlet></router-outlet>
```

#### 2. 路由传参

#### （1）get传值

```html
<div *ngFor="let item of list; let key = index">
    <a [routerLink]="['/path']" [queryParams]="{item}">{{ name }}</a>
</div>
```

#### （2）获取路由传值

```typescript
import { ActivatedRoute } from '@angular/router'
 constructor() {
     pubilc route: ActivatedRoute
 }
ngOnInit() {
    this.route.queryParams
    this.route.queryParams.subscribe(param => {
        console.log(param)
    })
}
```

#### （3）动态路由传值

动态路由配置

```typescript
{
    path: 'home/:key', component: HomeComponent
},
```

动态路由跳转，路由地址会带上参数

```html
<div *ngFor="let item of list; let key = index">
    <a [routerLink]="['/path', key ]">{{ name }}</a>
</div>
```

获取动态路由传值

```typescript
import { ActivatedRoute } from '@angular/router'
 constructor() {
     pubilc route: ActivatedRoute
 }
ngOnInit() {
    this.route.params.subscribe(param => {
        console.log(param)
    })
}
```

#### 3. 普通路由和动态路由跳转

```typescript
import { Router } from '@angular/router'

export class PageComponent {
    goPage() {
        this.router.navigte(['/home',param])
    }
    goPag1e() {
        this.router.navigte(['/home'])
    }
}
```

#### 4. get传值的动态路由

```typescript
import { Router, NavigationExtras } from '@angular/router'

// 不引入NavigationExtras也行，只是引用更标准一些，NavigationExtras
export class PageComponent {
    goPage() {
        const queryParams: NavigationExtras = {
            queryParams: { id: 1 }
        }
        const queryParams1 = {
            queryParams: { id: 1 }
        }
        this.router.navigte(['/home'], queryParams1)
    }
}
```



#### 5. 父子路由

```typescript
const routes: Routes = [
    {
        path: 'home', component: HomeComponent，
        children: [
        	path: 'product', component: productComponent，
        	path: 'welcome', component: welcomeComponent，
        ]
    },
]
```

```html
<a routerLink="/home/product">首页</a>
```

还需在挂载的父亲路由那挂载子组件；在哪儿挂载就写在哪儿

```html
<router-outlet></router-outlet>
```

<Valine></Valine>
