## angular路由
### 一、路由基础

先了解一下路由基础，window.history方法：

back、forward、go方法会触发页面刷新，pushState、replaceState方法不会刷新页面

```js
window.history.back()  // 上一页，相当于window.history.go(-1)
window.history.forward()  // 下一页，相当于window.history.go(1)
window.history.go(-1) // 相当于window.history.back()
window.history.go(1)  // 相当于window.history.forward()
window.history.pushState(state, title, url)
window.history.replaceState(state, title, url)

window.onpopstate = function(event) {
    console.log(111,event);
}
window.history.pushState({state: '1'}, 'xxxx', 'lanmx')
window.history.go(-1)   // 111 PopStateEvent {isTrusted: true, state: {…}, type: "popstate", target: Window, currentTarget: Window, …}
window.history.back() 
```

### 二、Angular路由Route

Angular 路由的核心是 Route（路由）。路由是指定路径（path）和组件（component）之间的映射。当用户导航到某个 URL 时，Angular 路由会查找匹配该 URL 的路由，然后将对应的组件加载到视图中。

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
// 指定路由和组件直接的映射关系
const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```

### 三、Angular路由传参

- 路由配置传参

  ```ts
  { path: 'list/:id', component: Route1Component }
  ```

- HTML使用routerLink传参

  ```html
  <div routerLink="/list"><a>点击跳转</a></div>
  <a [routerLink]="['/route1', 26]">点击跳转</a>
  ```

- 脚本方法传参

  Router类是RouterModule提供的一个服务类，声明依赖即可使用

  ```ts
  import { Router } from '@angular/router';
  constructor(
      private router: Router
    ) { }
    goPage() {
      //   navigateByUrl直接跳转url
      this.router.navigateByUrl('/task/management');
    }
    goPage2(){
      // navigate导航，可带路径参数
      this.router.navigate(['/product', id])   // product/6
      this.router.navigate(['/product'], { id: 6 })  // product;a=1;b=2
      this.router.navigate(['/product'], { { queryParams: { id: 6 } })  // product?id=6
    }
  ```

- 获取路由参数

  ```ts
  this.route.params.subscribe((data) => console.log(data.id));
  ```

### 四、Angular路由守卫

Angular路由守卫有5种，按照执行顺序

：

- CanLoad：进入到当前路由的时候触发（若用户没有权限访问，相应的组件不会被加载）

- CanActivate：进入到当前路由的时候触发（即使返回false，用户没有权限访问该路由，但是相应的模块和组件会被加载）

- CanActivateChild：刚刚进入子路由触发

- Resolve：进入当前路由之后，离开之前触发

- CanDeactivate：离开当前路由离开的时候触发

例如，使用路由守卫控制用户是否登录

```ts
//   路由守卫判断用户是否登陆
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class MyAuthGuard implements CanActivate {
  canActivate(): boolean {
    if (/* 用户已登录 */) {
      return true;
    } else {
      // 跳转到登录页面
      return false;
    }
  }
}
```

### 五、angular路由原理

Angular路由的实现基于Angular中的依赖注入机制和观察者模式。在路由模块初始化时，会创建一个名为Router的服务对象，该对象是全局唯一的，负责监听URL的变化，解析路由参数，并在必要时加载组件。