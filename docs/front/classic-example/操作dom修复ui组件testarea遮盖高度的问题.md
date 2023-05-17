#### 操作dom修复ui组件textarea高度计算误差导致的遮盖文字问题

```ts
ngAfterViewInit() {
    // 操作dom修复ui组件textarea高度计算误差导致的遮盖文字问题
    setTimeout(() => {  // 获取的dom节点只能获取到上一次的DOM节点，为了实时获取dom, settimeout宏任务可以解决
      this.getTemplateEle()
    },600)
  }

  // 操作dom修复ui组件textarea高度计算误差导致的遮盖文字问题
  getTemplateEle() {
    console.log(this.el.nativeElement,"getTemplateEle");
    if(this.el.nativeElement) {
      // 获取表格所有textarea标签
      const list = this.el.nativeElement.querySelectorAll('textarea')
      for(const item of list) {
        // 获取每个textarea的滚动高度
        let temp = item.scrollHeight
        // 把显示高度修改为滚动高度
        item.style.height = temp + 'px'
        // console.log(item.scrollHeight ,item.clientHeight, item.style.height,"scrollHeight");
      }
    }
  }
```

