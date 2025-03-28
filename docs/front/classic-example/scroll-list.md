## 列表循环自动滚

### 效果图

![image-20220616153922214](@alias/image-20220616153922214.png)

### html

```html
<div class="conv-list-content" (mouseover)="handleOver()" (mouseleave)="handleLeave()">
    <!-- 设置高度，超过隐藏 -->
    <div class="conv-list" id="compli-conv-scroll-list-id">
        <div id="conv-scroll-child-id">
            <div *ngFor="let item of convenientList; let i = index" class="compli-conv-scroll-list-item">
                <div class="conv-box">
                    <div class="conv-left">
                        <div class="conv-img">
                            <img *ngIf="item.vc_address" [src]="'assets/images/compliance/' + item.vc_address + '.png'" alt="">
                            <img *ngIf="item.vc_address === ''" [src]="'assets/images/compliance/default.png'" alt="">
                        </div>
                        <div class="conv-text" (click)="goWebSite(item)">
                            {{ item.vc_nav_name }}
                        </div>
                    </div>
                    <nz-dropdown [nzPlacement]="'topLeft'">
                        <div nz-dropdown class="conv-img">
                            <img src="assets/images/compliance/dot.png" alt="">
                        </div>
                        <ul nz-menu>
                            <li nz-menu-item (click)="editModal(item)">
                                <a><i nz-icon type="edit" theme="outline" style="color: #1890ff;"></i> 编辑</a>
                            </li>
                            <li nz-menu-item (click)="delete(item)">
                                <a><i nz-icon type="delete" theme="outline" style="color: #f03e38;"></i> 删除</a>
                            </li>
                        </ul>
                    </nz-dropdown>
                </div>
            </div>
        </div>
        <!-- 拷贝一份无缝衔接循环的列表数据， 另设id，和真正的列表数据不能是同一个dom -->
        <div id="child-copy-scroll-list">
            <div *ngFor="let item of convenientList; let i = index" class="compli-conv-scroll-list-item">
                <div class="conv-box">
                    <div class="conv-left">
                        <div class="conv-img">
                            <img *ngIf="item.vc_address" [src]="'assets/images/compliance/' + item.vc_address + '.png'" alt="">
                            <img *ngIf="item.vc_address === ''" [src]="'assets/images/compliance/default.png'" alt="">
                        </div>
                        <div class="conv-text" (click)="goWebSite(item)">
                            {{ item.vc_nav_name }}
                        </div>
                    </div>
                    <nz-dropdown [nzPlacement]="'topLeft'">
                        <div nz-dropdown class="conv-img">
                            <img src="assets/images/compliance/dot.png" alt="">
                        </div>
                        <ul nz-menu>
                            <li nz-menu-item (click)="editModal(item)">
                                <a><i nz-icon type="edit" theme="outline" style="color: #1890ff;"></i> 编辑</a>
                            </li>
                            <li nz-menu-item (click)="delete(item)">
                                <a><i nz-icon type="delete" theme="outline" style="color: #f03e38;"></i> 删除</a>
                            </li>
                        </ul>
                    </nz-dropdown>
                </div>
            </div>
        </div>
    </div>
</div>
```
### ts逻辑

```js
export class complianceHomePage {
  timer
  parentDom
  childDom1
  constructor(
  ) {}
  ngAfterViewInit() {
    this.autoscroll()
  }
  // 便捷中心列表自动滚动
  autoscroll() {
    clearInterval(this.timer)
    this.parentDom = document.getElementById('compli-conv-scroll-list-id')
    this.childDom1 = document.getElementById('conv-scroll-child-id')
    if(this.parentDom && this.childDom1) {
      this.timer = setInterval(() => {
        if(this.parentDom.scrollTop > this.childDom1.scrollHeight ){
          this.parentDom.scrollTop=0
        } else { 
          this.parentDom.scrollTop++
        } 
      }, 60)
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.timer)
  }
  handleOver() {
    clearInterval(this.timer)
  }
  handleLeave() {
    this.autoscroll()
  }
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>