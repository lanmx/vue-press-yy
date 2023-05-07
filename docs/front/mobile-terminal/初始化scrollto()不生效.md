## 初始化scrollTo()不生效

需求：点击元素A把元素B跳转到顶部

### 1. 使用scrollIntoView()

会忽略绝对定位，有版本兼容问题

### 2. 使用scrollTo()初始化不生效

bug：

1. 首页初始化进来时，点击跳转，scrollTo()方法没有生效。切换到其他页面再回来scrollTo()方法才生效

原因：

scrollHeight有值的时候，scrollTo()方法才可以跳转；如果scrollHeight为0，则不会生效。

初始化时，scrollHeight的计算有bug，scrollHeight的计算在dom渲染完成之前就已经计算了，所以初始化时scrollHeight为0。

解决方法：使用resize()方法在ngAfterViewInit()再次调用，重新计算窗口大小。即可解决。

### 解决方法：

```typescript
import { Content } from 'ionic-angular';
import { ViewChild } from '@angular/core';
```

```typescript
export class First_pages1 {
    @ViewChild('firstPageScroll')  firstPageScroll:any;
  	@ViewChild(Content) content: Content;
    constructor() {}

    ngAfterViewInit() {
        // 解决bug的关键步骤
        // 重新计算窗口大小
        this.content.resize()
    }
    gotoqd(key){
        if(key){
          this.test = key
          // document.getElementById(this.homeuspId).scrollIntoView();
          let element = document.getElementById(this.homeuspId);
          // this.firstPageScroll.scrollTo( 0, element.offsetTop - 5 ) // 或者使用此步骤也能生效
          this.content.scrollTo(0, element.offsetTop - 5 )
        }
  }
}

```
