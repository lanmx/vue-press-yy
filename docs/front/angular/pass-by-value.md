# 子传父通信
## 一、Input父传子

父组件不仅可以传数据，也可以传方法和整个组件实例

### 1. 父组件绑定变量传值

```html
<app-header [msg]="msg" [run]="run" [home]="this"></app-header>
```

### 2. 子组件引入Input模块

```typescript
import { Input } from '@angular/core'
```

### 3. 子组件@Input接收父组件传过来的数据

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


## 二、ViewChild子传父

父组件获取子组件的数据和方法：通过@ViewChild

### 1. 给调用组件定义一个名称

在子组件上定义`#drawerMsg`

##### html

```html
<drawer-msg-page #drawerMsg (drawerEmit)="onDrawerEmit()"></drawer-msg-page>
```

### 2.父组件引入@ViewChild

```
import { ViewChild } from '@angular/core'
```

### 3. 父组件接收和获取子组件实例

##### ts

```typescript
// 1. 引入ViewChild
import { Component, ViewChild, EventEmitter } from '@angular/core';
export class complianceHomePage {
  // 2. 定义
  @ViewChild("drawerMsg") drawerMsg :any
  constructor() {}
  onDrawerEmit() {
    // 获取实例变量
    this.drawerVisible = this.drawerMsg.drawerVisible
  }
}
```

## 三、emit子传父

### 1. 子组件传值

```typescript
// 1. 引入EventEmitter，Output
import { Component, EventEmitter, Output } from '@angular/core';
export class drawerMsgPage {
  // 2. 定义传值出去的变量drawerEmit
  @Output() drawerEmit = new EventEmitter<boolean>()
  constructor() {}
  openDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
    // 3. 把值this.drawerVisible传出去
    this.drawerEmit.emit(this.drawerVisible)
  }
}
```

### 2. 父组件接收

##### html

```html
<drawer-msg-page #drawerMsg (drawerEmit)="onDrawerEmit($event)"></drawer-msg-page>
```

##### ts

```typescript
// 1. 引入Input
import { Component, Input } from '@angular/core';
export class complianceHomePage {
  // 2. 引入子组件传过来的值
  @Input() drawerEmit
  @ViewChild("drawerMsg") drawerMsg :any
  constructor() {}
  onDrawerEmit(e) {
    // 获取子组件数据
    this.drawerVisible = e
    this.drawerVisible = this.drawerMsg.drawerVisible
  }
}
```



<ClientOnly>
  <Valine></Valine>
</ClientOnly>