## angular写自定义指令
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