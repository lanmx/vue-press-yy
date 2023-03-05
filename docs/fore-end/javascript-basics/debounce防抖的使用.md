##  debounce防抖

### 1.  防抖函数全局引入到vue

```js
import Vue from 'vue'

// 防抖函数
const debounce = function(fn, delay) {
	let timer = null
	return function() {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, arguments)
		}, delay)
	}
}

// 全局引入到vue
Vue.prototype.$debounce = debounce

export default debounce
```

### 2.  使用：DOM部分

```html
// 使用, DOM部分
<Input search placeholder="请输入姓名搜索" clearable @on-change="queryUserDebounce" />
```

### 3.  使用：JS部分

```js
// 使用，JS部分
data() {
    return {
        queryUserDebounce: this.$debounce(this.queryUser, 300)  // 防抖
    }
},
methods: {
    queryUser() {
        ... // 函数体
    }
}
```

### 4. 也可以这样写

```js
// DOM
<Select v-model="formInline.superiorId" :remote-method="$debounce(getPerson, 300)">
// JS
getPerson() {
    ...// 函数体
}
```

### 5. 这样也行

```js
// 直接在JS的函数里面写
methods: {
    queryUser: debounce(function(value) {
		... // 函数体
	}, 500),
}

```

<Valine></Valine>

