## 菜单左右翻页功能

整体布局已经做好了，菜单图标超过了需要加左右翻页功能，如果使用AntDesign的slide左右滑动，数据结构需要全部改变。

于是，手写了一个左右翻页，每页展示的图标数量动态根据模块最大展示数量控制。

### 1. 效果图

![](@alias/1655281611508.png)

### 2. 数据结构处理

控制翻页按钮的逻辑主要用到的参数有四个，分别是

1. `hideMax`：每个模块最多展示多少个
2. `fold`：控制超过最大出现翻页按钮
3. `slide`：根据超过最大倍数生成的数组，控制出现多少个翻页按钮
4. `active`：默认当前选中的翻页按钮，根据选中修改按钮样式，当active===slide[i]为true即为选中按钮
4. `hidden`：是否显示

```typescript
/**
 * 一维数组转换为树形结构数组
 * @author lanmx
 * @description 适用首页菜单列表的业务逻辑
 * @date 2022-05-23
 * @param {Array} arr 一维对象数组
 * @returns {Array<any>} treeArr 树形结构对象数组
 */
const flatToTree = (flatArr: Array<any>) => {
    // 数组结构修改
    let title = flatArr.map(item => {
        return {
            name: item.vc_module_name,
            // 1.每个模块最多展示多少个
            hideMax: item.l_max_show,
            // 2.控制超过最大出现翻页按钮
            fold: false, 
            // 3.根据超过最大倍数确定滑动多少页，控制出现多少个翻页按钮
            slide: [],
            ischild: item.l_is_child === '1' ? true : false,
            sort: item.vc_module_sort,
            // 4.默认当前选中的翻页按钮，修改按钮样式
            active: -1,
        }
    })
    // 大标题过滤子菜单
    title = title.filter(item => item.ischild === false)
    title = unique(title)
    const treeArr = title.map(item => {
        return {
            name: item.name,
            hideMax: item.hideMax,
            fold: item.fold,
            list: [],
            sort: item.sort,
            slide: item.slide,
            active: item.active
        }
    })
    let childArr = flatArr.filter(o => o.l_is_child === '1')
    flatArr = flatArr.filter(o => o.l_is_child !== '1')
    treeArr.forEach(e => {
        flatArr.forEach(ele => {
            if(e.name === ele.vc_module_name) {
                e.list.push({
                    ...ele,
                    list: [],
                    hidden: false
                })
            }
        })
        childArr.forEach(child => {
            if(child.vc_module_name === e.name) {
                e.list.forEach(item => {
                    if(item.vc_nav_name === child.vc_nav_name) {
                        item.list.push(child)
                    }
                })
            }
        })
    })
    treeArr.forEach(s => {
        s.hideMax < s.list.length ? s.fold = true : s.fold = false
    })
     // 给每个模块添加slide数组控制左右翻页
    let i = 0
    treeArr.forEach(m => {
        let num = Math.ceil(m.list.length/m.hideMax)
        let slideArr = new Array(num)
        let j = 0
        while(num > 0) {
            slideArr[j] = i
            num--
            i++
            j++
        }
        m.slide = slideArr
    })
    // 默认选中第一个按钮，把active = slide[0]
    treeArr.forEach(s => {
        s.fold ? s.active = s.slide[0] : s.active = -1
    })
    return treeArr
}
const unique = (arr) => {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1));
}
export {
    flatToTree
}
```

### 3. 翻页逻辑

#### html

1. 若模块不需折叠，也就是当前页数量不超过允许最大展示数量，则隐藏`*ngIf="module.fold"`
2. 通过`let item of module.slide`控制按钮出现数量
3. 通过`[ngClass]="{ 'icon-next-c': item === module.active }"`控制选中按钮的样式

```html
<div *ngFor="let module of menuList">
    <div class="title">{{ module.name }}</div>
    <div class="content">
        <div class="title">{{ module.name }}</div>
        <div class="content">
            <div>...此处省略翻页内容</div>
            <!-- 翻页html代码 -->
            <div class="expand-box" *ngIf="module.fold">
                <div class="expand">
                    <div class="expand-content">
                        <div *ngFor="let item of module.slide; let i = index">
                            <div class="expand-item" (click)="slideChange(module, i, item)">
                                <div class="icon-next" [ngClass]="{ 'icon-next-c': item === module.active }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### ts逻辑

通过一个判断条件拿到当前页的所有index

`if(index >= i * module.hideMax && (index < module.hideMax * (i + 1)))`

> 例如：设最大页面为6
>
> 第一页：index >= 0 * 6 && index < 6* 1：则index为0,1,2,3,3,4,5
>
> 第二页：index >= 1 * 6 && index < 6 * 2：则index为6,7,8,9,10,11,12
>
> 第三页：index >= 2 * 6 && index < 6 * 3：则index为13,14,15,16,17,18

```typescript
export class complianceHomePage {
    menuList: any = []
    constructor(
  ) {
      // 初始化当前模块滑动数据
      this.menuList.forEach(module => {
          if(module.fold) {
              this.slideChange(module, 0, module.slide[0])
          }
      })
  }
}

slideChange(module, i, item) {
    this.menuList.forEach(m => {
        if(m.fold && m.name === module.name){
            m.active = item
            m.list.forEach((e,index) => {
                // 精髓在这儿：
                // 通过index和当前页i,每页最大展示数量判断是否是当前页的index，如果是当前页的index，则把hidden变为false；其他变为true,隐藏起来
                if(index >= i * module.hideMax && (index < module.hideMax * (i + 1))) {
                    e.hidden = false
                } else {
                    e.hidden = true
                }
            })
        }
    })
}
```


<ClientOnly>
  <Valine></Valine>
</ClientOnly>