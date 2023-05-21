### 下拉加载更多功能

#### 1. (nzScrollToBottom) 


可以使用AntDesign UI组件库的搜索选择器的nzScrollToBottom方法实现滚动到底部加载更多数据

(nzScrollToBottom) 下拉列表滚动到底部的回调

#### 2. 实现思路

1. 搜索接口的入参有翻页page和页面大小size
2. 使用（nzOnSearch）方法调用搜索内容，页数1，页面大小10
3. 滚动到底部使用（nzScrollToBottom）方法调用更多数据，页面++1，页面大小10（每次调nzScrollToBottom方法时，页面+1，保证拿到非重复的数据，把数据push进数组）
4. 如果页码已是最大，返回的数据为null，则提示已全部加载完毕，不再调接口
5. 如果搜索输入框重新搜索，则把页数重置为1，重复以上逻辑。

js代码

```js
export class complianceHomePage {
    // 搜索列表
  searchList: any = []
  searchValue: string = ''
  isLoading: boolean = false
  page: number = 1
   constructor(
  ) {}
  // 搜索列表接口
  getSearchList(e: string, page: number, size: number) {
    return new Promise((resolve, reject) => { 
      const params = {
        vc_search_i: e,
        l_page_i: page,
        l_pagesize_i: size,
      }
      this.service.searchList(params,res => {
        if(res && res.code === 200) {
          res.data && res.data.length ? resolve(res.data) : resolve(null)
        } else {
          reject()
        }
        this.isLoading = false
      });
    })
  },
  // 搜索
  async onSearch(e) {
    this.isLoading = true
    this.page = 1
    this.searchValue = e
    let data = await this.getSearchList(e, 1, 10)
    this.searchList = data
  },
  // 滚动到底部搜索
  async scrollList() {
    this.isLoading = true
    this.page++
    let data = await this.getSearchList(this.searchValue, this.page, 10)
    if(data) {
      this.searchList = this.searchList.concat(data)
    } else {
      this.message.success('数据已全部更新！');
    }
  }
}

```

#### 3. 前端搜索

前端对 nz-option 进行过滤，前端搜索只搜索前十条的数据

#### 4. 服务搜索

AntDesign UI组件库的搜索选择器有一个属性是nzServerSearch，是否使用服务端搜索。

> [nzServerSearch]	是否使用服务端搜索，当为 true 时，将不再在前端对 nz-option 进行过滤

前端搜索有个BUG，该前端搜索只搜索第一页的数据，所以如果做下拉加载功能，不会对第2页以后的数据筛选。把服务端搜索开启起来就可以了。
