## angular写自定义指令
## 1、angular自定义指令实现鼠标事件显示颜色
新建ts文件
```ts
import { 
  AfterViewInit, 
  Directive, 
  ElementRef, 
  Input,
  HostListener
} from '@angular/core'

// 接收的参数
interface Options {
  bgColor?: string
}
@Directive({
  selector: "[appHover]"
})
export class HoverDirective implements AfterViewInit {
  @input('appHover') appHover: Option = {}
  element: HTMLElement
  constructor(
    private elementRef: ElementRef
  ) {
    this.element = this.elementRef.nativeElement
  }
  ngAfterViewInit() {
    this.element.style.backgroundColor = this.appHover.bgColor || 'skyblue'
  }
  @HostListener('mouseenter') enter() {
    this.element.style.backgroundColor = 'pink'
  }
  @HostListener('mouseleave') leave() {
    this.element.style.backgroundColor = 'red'
  }
}
```
module注册声明
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// 引入指令
import { HoverDirective } from './appHover'

@NgModule({
  declarations: [
    AppComponent,
    // 必须声明
    HoverDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
html使用
```html
<div [appHover]="{ bgColor: 'red' }">gggggggg</div>
```

## 2、angular自定义指令实现多选只显示一个选中标签

antd 1.8.1版本的UI组件库，由于版本过低，不支持多选只显示一个选中标签
因此使用angular自定义指令的方法，实现该功能：

> 多选只显示一个选中标签，其余选中内容+N显示，鼠标移上显示所有选中内容。

![img](工作笔记.assets/企业微信截图_16836167546093.png)

引入Directive模块，定义指令标签名称和事件方法

```typescript
@Directive({
  selector: "[maxTagCount]",
  host: {
    '(click)': 'click($event)'
  },
})
```

自定义指令组件代码：

```ts
import {
    Directive,
    ElementRef,
    AfterViewInit,
    OnChanges,
    Input,
    NgZone,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[maxTagCount]',
    host: {
        '(click)': 'click($event)'
    },
})

// 支持树级下拉选择器，也支持普通下拉选择器
// 支持antd 1.8.1版本UI组件库，其他组件库使用请比较是否有版本差异，适用再用。
export class MaxTagCountDirective implements AfterViewInit, OnChanges {
    @Input() maxTagCount;  // 必填参数，值默认为1，目前只支持最多显示选中标签为一个，其余均+N显示
    @Input() ngChecked;  // 必填参数，ngModel双向绑定的值
    @Input() checkedName;  // 选填参数：string[];，开启鼠标移上显示的标签；ngModel双向绑定的值,名称，用于显示鼠标移上显示的标签
    El;
    lastNodeLen: Number = 0;
    lastChecked: string[];
    lastIndex: Number;
    domId = null;
    input = null;
    init = true;
    tagDomId = null;
    constructor(private Ele: ElementRef,
        private zone: NgZone,
        private renderer: Renderer2) { }

    ngAfterViewInit() {
        this.El = this.Ele.nativeElement;
        setTimeout(() => {
            this.tagCountChange();
        }, 1000);
    }

    ngOnChanges(changes) {
        // console.log(changes);
        // console.log(this.ngChecked, this.checkedName);
        this.tagCountChange();
    }

    tagCountChange() {
        if (this.El) {
            const ulList = this.El.querySelector('ul');
            ulList.setAttribute('style', 'display: none;');
            const liList = ulList.querySelectorAll('li');
            if (liList) {
                // 移除输入框
                const input = this.El.getElementsByClassName('ant-select-search ant-select-search--inline');
                if (input && input.length > 0) {
                    this.input = input[0];
                    for (const item of input) {
                        ulList.removeChild(item);
                    }
                }
                if (!this.ngChecked) {
                    this.ngChecked = [];
                }
                if (!this.checkedName) {
                    this.checkedName = [];
                }
                // 判断是否存在+1
                const existli = document.getElementById(this.domId);
                if (!existli) {
                    // 不存在，则新建一个+1dom节点
                    if (this.ngChecked && this.ngChecked.length > 1) {
                        const li = document.createElement('li');
                        this.domId = (new Date()).getTime();
                        li.id = this.domId;
                        li.setAttribute('class',
                        'ant-select-selection__choice ng-trigger ng-trigger-selectTagAnimation ng-tns-c4-0 ng-star-inserted');
                        const number = this.ngChecked.length - 1;
                        li.innerHTML = '+' + number + '...';
                        this.onMouse(li, this.checkedName, ulList);
                        // 判断是否存在输入框
                        if (liList.length > 0) {
                            if (liList[liList.length - 1].className === 'ant-select-search ant-select-search--inline') {
                                // 其他节点均隐藏
                                for (const item of liList) {
                                    item.hidden = true;
                                }
                                liList[liList.length - 1].hidden = false;
                            } else {
                                for (const item of liList) {
                                    item.hidden = true;
                                }
                            }
                        }
                        ulList.append(li);
                        // 初始化默认选中
                        if (this.init) {
                            if (liList.length > 2) {
                                liList[liList.length - 2].hidden = false;
                            }
                            this.init = false;
                        }
                    }
                } else {
                    if (this.lastNodeLen === this.ngChecked.length) {
                        for (const item of liList) {
                            item.hidden = true;
                        }
                        if (liList.length > 1) {
                            liList[liList.length - 2].hidden = false;
                        }
                        liList[liList.length - 1].hidden = false;
                    }
                    // 添加选中
                    if (this.lastNodeLen < this.ngChecked.length) {
                        if (this.ngChecked.length > 1) {
                            // 其他节点均隐藏
                            this.zone.run(() => {
                                // 判断是否存在输入框
                                if (liList[liList.length - 1].className === 'ant-select-search ant-select-search--inline') {
                                    for (const item of liList) {
                                        item.hidden = true;
                                    }
                                    liList[liList.length - 2].hidden = false;
                                    liList[liList.length - 1].hidden = false;
                                } else {
                                    for (const item of liList) {
                                        item.hidden = true;
                                    }
                                    liList[liList.length - 1].hidden = false;
                                }
                            });
                        }
                    }
                    // 删除选中
                    if (this.lastNodeLen > this.ngChecked.length) {
                        this.zone.run(() => {
                            if (this.ngChecked.length === 1) {
                                for (const item of liList) {
                                    item.hidden = false;
                                }
                            } else {
                                // 数组差集
                                const minus = this.lastChecked.filter(v => this.ngChecked.indexOf(v) === -1);
                                // console.log(minus,"minus");
                                if (minus && minus.length) {
                                    this.lastIndex = this.lastChecked.indexOf(minus[0]);
                                    let num = true;
                                    liList.forEach((item, i) => {
                                        if (i !== this.lastIndex) {
                                            if (num) {
                                                item.hidden = false;
                                                num = false;
                                            } else {
                                                item.hidden = true;
                                            }
                                        } else {
                                            item.hidden = true;
                                        }
                                    });
                                }
                                liList[liList.length - 1].hidden = false;
                            }
                            // 异步回调获取dom，为了获取渲染后的dom，处理特殊情况
                            // 处理树级下拉框：全选大类再取消小类情况
                            setTimeout(() => {
                                const ul = this.El.querySelector('ul');
                                const lis = ul.querySelectorAll('li');
                                if (lis && lis.length) {
                                    let num = true;
                                    lis.forEach((item, i) => {
                                        if (i !== this.lastIndex) {
                                            if (num) {
                                                item.hidden = false;
                                                num = false;
                                            } else {
                                                item.hidden = true;
                                            }
                                        } else {
                                            item.hidden = true;
                                        }
                                    });
                                    lis[lis.length - 1].hidden = false;
                                }
                                // 如果存在+1 dom节点，重新计算选择的数据
                                if (liList) {
                                    const li = document.getElementById(this.domId);
                                    if (li) {
                                        const number = this.ngChecked.length - 1;
                                        li.innerHTML = '+' + number + '...';
                                        this.onMouse(li, this.checkedName, ulList);
                                    }
                                }
                            }, 300);
                        });
                    }
                    // 若当前选中的节点只有一个或者0个，则去掉+1 dom节点
                    if (this.ngChecked.length === 1 || this.ngChecked.length === 0) {
                        const li = document.getElementById(this.domId);
                        if (li) {
                            ulList.removeChild(li);
                        }
                    }
                    // 如果存在+1 dom节点，重新计算选择的数据
                    if (liList) {
                        const li = document.getElementById(this.domId);
                        if (li) {
                            const number = this.ngChecked.length - 1;
                            li.innerHTML = '+' + number + '...';
                            this.onMouse(li, this.checkedName, ulList);
                        }
                    }
                }
            }
            ulList.setAttribute('style', 'display: block;');
        }
        // 记录上一次选中的长度
        this.lastNodeLen = this.ngChecked ? this.ngChecked.length : 0;
        // 记录上一次选中的内容
        this.lastChecked = this.ngChecked;
    }

    click(e) {
        if (this.input) {
            const ul = this.El.querySelector('ul');
            ul.append(this.input);
        }
    }

    // 鼠标移上hover/leave事件，tag显示+n具体内容
    onMouse(dom, checkedName, ulList) {
        if (checkedName.length > 1) {
            dom.onmouseover = function() {
                const hoverDiv = document.createElement('div');
                this.tagdomId = (new Date()).getTime();
                hoverDiv.id = this.tagdomId;
                hoverDiv.setAttribute('style',
                `background-color:#404040; border-radius:3px; border-radius: 3px; position: absolute;
                top: 36px; right: -20%; padding: 5px 12px;`);
                // console.log(hoverDiv);
                checkedName.forEach(tag => {
                    const childDiv = document.createElement('div');
                    childDiv.innerHTML = '. ' + tag;
                    childDiv.setAttribute('style', 'color:#fff; white-space: nowrap;');
                    hoverDiv.appendChild(childDiv);
                });
                // 三角形
                const traigle = document.createElement('div');
                traigle.setAttribute('style',
                `height: 0px; width: 0px; border: 8px solid #000; border-color: transparent transparent #404040 transparent;
                position: absolute; top: -16px; left: 50%;`);
                hoverDiv.appendChild(traigle);
                ulList.appendChild(hoverDiv);
                // console.log('onmouseover');
            };
            dom.onmouseleave = function() {
                const tagDiv = document.getElementById(this.tagdomId);
                if (tagDiv) {
                    ulList.removeChild(tagDiv);
                }
            };
        }
    }
}

```

模块引入写好的自定义指令：

```ts
/*
* 共享模块
*/
import { NgModule } from '@angular/core';

// 指令
import { MaxTagCountDirective } from './directive/maxtag.directive';
@NgModule({
  imports: [
  ],
  declarations: [
    MaxTagCountDirective
  ],
  exports: [
    MaxTagCountDirective
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class SharedModule { }

```

HTML上使用改指令<maxTagCount ngChecked  checkedName>

```html
<div class="button-select">
    <span class="searchlabel">托管人：</span>
    <nz-select [maxTagCount]="1" [ngChecked]="tghName" [checkedName]="tghName"
               style="min-width: 160px;" nzMode="multiple" [nzDropdownMatchSelectWidth]="false"
               [(ngModel)]="tghName" nzAllowClear nzPlaceHolder="输入托管人">
        <nz-option 
                   *ngFor="let item of trusteeList" 
                   [nzValue]="item.vc_tgh_name" 
                   [nzLabel]="item.vc_tgh_name">
        </nz-option>
    </nz-select>
</div>
```