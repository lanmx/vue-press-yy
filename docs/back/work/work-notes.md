---
title: 复选框选择不能及时显示半选和全选的问题
description: 复选框选择不能及时显示半选和全选的问题
meta:
  - name: keywords
    content: 工作笔记
---
<!-- ## 1、table表多行数据打开下拉框和选择数据慢和优化方法 -->

## 1、复选框选择不能及时显示半选和全选的问题

有问题的代码：

```html
<td style="width:30px;">
    <label nz-checkbox (ngModelChange)="singleChecked($event,tableList)" [nzDisabled]="table_disabled" [(ngModel)]="data['checked']">
    </label>
</td>
```

我把(ngModelChange)函数放在后面，就好了；

```html
<td style="width:30px;">
    <label nz-checkbox [nzDisabled]="table_disabled" [(ngModel)]="data['checked']"
           (ngModelChange)="singleChecked($event,tableList)">
    </label>
</td>
```

## 2、get请求封装

利用new Promise 和subscribe

```ts
function get(url) {
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

## 3、ts类型Pickkeyof使用

```ts
enum Field = ['vc_eval_date','vc_fund_code','vc_fund_name','vc_jzdata'];
const c = item[key] as Pick<keyof KSB.FOS_C02_1460Output,  Field>
```

## 4、vxe-table树级表格默认展开子级的方法

vxe-table默认展开子级的方法

给vxe-table定义ref="boardTableRef"

```ts
// 在dom渲染结果后调用setAllTreeExpand(true)方法
boardTableRef.value?.setAllTreeExpand(true)
```

重新加载表格防抖

```ts
onMounted(() => {
    window.addEventListener('resize', debounce(() => {
        boardTableRef.value?.reloadData(tableData)
    }, 500))
});
```

## 5、关于table宽度样式不生效

th标签宽度不生效，必须设置table的宽度th宽度才能生效，别问为什么，源码里就是这样计算的。

table的th td标签的宽度设置受其它th td宽度影响，设置table标签样式 table-layout: fixed。

colspan和rowspan不接受小数值，所以如果你想在两个列里面分三个平均列，那么把colspan或者rowspan的最大计量单位改为其最小公倍数。例如，两列里面需分三个平均列，那么把两列改为最小公倍数，也就是为2和3的公倍数6。

## 6、angular自定义指令实现多选只显示一个选中标签

antd 1.8.1版本的UI组件库，由于版本过低，不支持多选只显示一个选中标签
因此使用angular自定义指令的方法，实现该功能：

> 多选只显示一个选中标签，其余选中内容+N显示，鼠标移上显示所有选中内容。

![img](@alias/企业微信截图_16836167546093.png)

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
    lastNodeLen: number = 0;
    lastChecked: string[];
    lastIndex: number;
    domId = null;
    input = null;
    init = true;
    tagDomId = null;
    countNum: number = 0;
    constructor(private Ele: ElementRef,
        private zone: NgZone,
        private renderer: Renderer2) { }

    ngAfterViewInit() {
        this.El = this.Ele.nativeElement;
        if (this.El && this.El.querySelector('.ant-select-selection')) {
            const uls = this.El.querySelector('ul');
            uls.setAttribute('style', 'display: none;');
        }
        setTimeout(() => {
            if (this.El && this.El.querySelector('.ant-select-selection')) {
                this.tagCountChange();
            }
        }, 1000);
    }

    ngOnChanges(changes) {
        // console.log(changes);
        // console.log(this.ngChecked, this.checkedName);
        if (this.El && this.El.querySelector('.ant-select-selection')) {
            this.tagCountChange();
        }
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
            if (this.checkedName && this.checkedName.length > 0) {
                ulList.setAttribute('style', 'display: block;');
            } else if (this.checkedName && this.countNum > 1 && this.init) {
                ulList.setAttribute('style', 'display: block;');
            }
            if (!this.checkedName) {
                ulList.setAttribute('style', 'display: block;');
            }
        }
        // 记录上一次选中的长度
        this.lastNodeLen = this.ngChecked ? this.ngChecked.length : 0;
        // 记录上一次选中的内容
        this.lastChecked = this.ngChecked;
        this.countNum++;
    }

    click(e) {
        if (this.input) {
            const ul = this.El.querySelector('ul');
            ul.append(this.input);
        }
    }

    // 鼠标移上hover/leave事件，tag显示+n具体内容
    onMouse(dom, checkedName, ulList) {
        checkedName = checkedName || [];
        if (checkedName.length > 1) {
            dom.onmouseover = function() {
                const hoverDiv = document.createElement('div');
                this.tagdomId = (new Date()).getTime();
                hoverDiv.id = this.tagdomId;
                hoverDiv.setAttribute('style',
                `background-color:#404040; border-radius:3px; border-radius: 3px; position: absolute;
                top: 36px; right: -20%; padding: 5px 12px; z-index: 9; `);
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
                position: absolute; top: -16px; left: 50%; z-index: 9;`);
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

HTML上使用改指令`maxTagCount ngChecked checkedName`

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
## 7. 项目运行或打包报错echarts.d.ts(10728,69): error TS1005: ';' expected.

项目npm run start 或者npm build报错，导致部分模块编译失败，部分页面打不开。

![image-20230530110822120](@alias/image-20230530110822120.png)

在网上搜索量很多资料，大部分答案都说是typescript版本过低的问题，重新按照最新版本的typescript。但是我按步骤操作，依然报错。

最后大佬帮忙解决了，解决步骤如下：

### 解决方法

1. 打开../../node_modules/echarts/types/dist/echarts.d.ts文件，把所有代码注释掉~

   ![image-20230530111119995](@alias/image-20230530111119995.png)

2. 在该文件的最后加上这一行代码

   ```ts
   declare module 'echarts' {
       const init: any;
       export { init }
   }
   ```

   ![image-20230530111228363](@alias/image-20230530111228363.png)

3. 重新npm run start，编译成功了

   ![image-20230530111346676](@alias/image-20230530111346676.png)
   
