# 利用服务实现非父子页面传值

## 1. 新建一个service.ts文件

代码如下，两个页面需要传值的变量定义在里面。

- 通过setData()函数保存当前页面的值
- 通过getData()函数获取上个页面传过来的值

```ts
import {  Injectable } from '@angular/core'

@Injectable()
export class TransferService {
    // chart.component和data.component页面传值
    date = new Date();
    mainoption = null;
    fundType = null;
    fund = null;
    constructor(
    ) {}

    setData(data) {
        this.date = data.date
        this.mainoption = data.mainoption
        this.fundType = data.fundType
        this.fund = data.fund
    }

    getData() {
        const data = {
            date: this.date,
            mainoption: this.mainoption,
            fundType: this.fundType,
            fund: this.fund
        }
        return data
    }

}
```

## 2. chart.component.ts页面

跳转到另一个页面之前，先保存需要传过来的值

```ts
change() {
    if (this.radioValue === '2') {
      const data = {
        date: this.date,
        mainoption: this.mainoption,
        fundType: this.fundType,
        fund: this.fund
      }
      this.TransferService.setData(data)
      this.router.navigateByUrl(`/tmp_product_show/data?userid=${this.currentAccount}`);
    }
  }
```

## 3. 在data.component.ts页面接收

```ts
  // 获取服务传过来的数据
  getTransfer() {
    const data = this.TransferService.getData()
    this.date = data.date
    this.fundType = data.fundType
    this.fund = data.fund
  }
```

## 4. 如果两个页面之前需要相互传值

如果两个页面之前需要相互传值，那个重复使用服务的setData()和getData()方法就好了。