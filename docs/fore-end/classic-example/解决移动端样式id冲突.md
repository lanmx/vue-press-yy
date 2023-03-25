## 移动端样式id冲突原因

项目使用angular2框架，ionic3 UI框架；

同一个组件在复用时代码编译解析的dom不是同一个节点，如此会导致使用原生 `document.getElementById("id")`获取的id是同一个节点，获取dom节点错误。

相同组件在复用时代码编译解析的dom不是同一个节点，但是echart图表的id用的是用一个，因此导致在复用的其他页面渲染图表id无效

### 1. 解决办法：使用时间戳保存id

当一个页面存在多个id，则在生成多个时间戳id时，需要保证每个时间戳不一样，因此要加1（代码执行速度极快）

##### ts

```typescript
export class First_pages1 implements OnInit, OnDestroy {
    @ViewChild('firstPageScroll')  firstPageScroll:any;
    timer
    homeuspId
    parentDomId
    childDomId
    constructor() 
  {
    // 用时间戳保存id,防止id冲突
    this.homeuspId = (new Date()).getTime().toString()
    this.parentDomId = ((new Date()).getTime()+1).toString()
    this.childDomId = ((new Date()).getTime()+2).toString()
  }
  /**
   * 消息列表自动滚动
   * @function autoMsg
   */
  autoMsg() {
    clearInterval(this.timer)
    this.parentDom = document.getElementById(this.parentDomId)
    this.childDom = document.getElementById(this.childDomId)
    if(this.parentDom && this.childDom) {
      this.timer = setInterval(() => {
        if(this.parentDom.scrollTop > this.childDom.scrollHeight ){
          this.parentDom.scrollTop=0
        } else { 
          this.parentDom.scrollTop++
        } 
      }, 300)
    }
  }
  gotoqd(key){
    if(key){
      this.test = key
      // document.getElementById(this.homeuspId).scrollIntoView();
      let element = document.getElementById(this.homeuspId);
      this.firstPageScroll.scrollTo( 0, element.offsetTop - 5 )
    }
  }
}
```

##### html

```html
<!--  渠道数据-->
<show-first-page [id]="homeuspId" [loginid]="loginid" [sk_confirmdate]="baoyList.sk_confirmdate" [test]="test"></show-first-page>

<!--消息中心-->
<ion-card class="auto-msg-list-top-to-bottom">
    <ion-card-content class="msg-content-box" [id]="parentDomId">
        <ion-list inset  (click)="gotomessage()" [id]="childDomId">
            <ion-item *ngFor="let item of msgList">
                <div  class="flex-box-content2" >
                    <i> <img class="msg-icon" src="assets/img/usp/first-tz-icon.png" alt=""></i>
                    <span class="flex-box-content2-span">{{item.vc_subtype}}</span>
                    <p class="card_content_p">{{item.vc_title}}</p>
                    <p style="width: 80px;text-align: center;">{{item.vc_createtime}}</p>
                </div>
            </ion-item>
            <div  *ngIf="msgList.length == 0" style="color: #666;" >暂无新消息通知，点击查看历史消息。</div>
        </ion-list>
        <!-- 循环滚动列表复制dom -->
        <ion-list inset  (click)="gotomessage()">
            <ion-item *ngFor="let item of msgList">
                <div  class="flex-box-content2" >
                    <i> <img class="msg-icon" src="assets/img/usp/first-tz-icon.png" alt=""></i>
                    <span class="flex-box-content2-span">{{item.vc_subtype}}</span>
                    <p class="card_content_p">{{item.vc_title}}</p>
                    <p style="width: 80px;text-align: center;">{{item.vc_createtime}}</p>
                </div>
            </ion-item>
        </ion-list>
    </ion-card-content>
</ion-card>
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>