## Subject

### 1. new subject

在需要发出消息的组件下新建一个service.ts

new一个subject对象，我起名为$_sub

```typescript
import { Subject } from "rxjs";

export const $_sub = new Subject()
```



### 2. $_sub.next()

```typescript
import { $_sub } from './drawerMsg.service'
export class drawerMsgPage {
  constructor() {}
  openDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
    // 把需要传的值作为$_sub.next()的参数传出去
    $_sub.next(this.drawerVisible)
  }
}
```



### 3. 接收订阅发送过来的数据

```typescript
import { $_sub } from '../drawer_msg/drawerMsg.service'
export class complianceHomePage {
  constructor() {
     $_sub.subscribe((res) => {
      console.log(res);
    })
  }
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

