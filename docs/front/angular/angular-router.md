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

Angular路由守卫用于控制和保护路由导航，分别有**CanLoad、CanActivate、CanActivateChild、Resolve 和 CanDeactivate**

- **CanLoad**：进入到当前路由前触发

默认值为true，表明路由是否可以被加载，返回false，相应的组件不会被加载。一般不会认为控制这个守卫逻辑，99.99%情况下，默认所有app模块下路由均允许canLoad

- **CanActivate**：进入到当前路由的时候触发（即使返回false，用户没有权限访问该路由，但是相应的模块和组件会被加载）

是否允许进入该路由，一般多用于权限控制，比如客户未登录的情况下查询某些资料页面，在此方法中去判断客户是否登陆，如未登录则强制导航到登陆页或者提示无权限，即将返回等信息提示。

- **CanActivateChild**：刚刚进入子路由触发。

用于确定是否允许导航到子路由。

CanActivateChild 守卫主要用于保护子路由，确保用户在访问父级路由时也具有足够的权限。一般用于需要在父级路由通过验证后才能验证子路由的场景。例如，在一个具有特定权限要求的管理后台应用中，可以使用 CanActivateChild 守卫确保只有管理员才能访问子路由模块。常见的使用场景包括需要控制子路由访问权限的路由模块、需要在父级路由通过验证后才能验证子路由的场景等。

- **Resolve**：进入当前路由之后，离开之前触发

- **CanDeactivate**：离开当前路由离开的时候触发

路由离开的时候进行触发，通常是某些页面比如表单页面填写的内容需要保存，客户突然跳转其它页面或者浏览器点击后退等改变地址的操作，可以在守卫中增加弹窗提示用户正在试图离开当前页面，数据还未保存 等提示。

例如，使用canActivate路由守卫控制用户是否登录

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

Angular路由的实现基于Angular中的依赖注入机制和观察者模式。在路由模块初始化时，会创建Router服务对象，该对象是全局唯一的，负责监听URL的变化，解析路由参数，并在必要时加载组件。