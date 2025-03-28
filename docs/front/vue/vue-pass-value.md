## vue中组件传值常用的几种方式

- **props**：父组件传值给子组件，子组件使用props进行接收

- **$emit**：子组件传值给父组件，子组件使用$emit+事件对父组件进行传值

- **$refs**：使用$refs获取组件实例，进而获取数据

- **$parent和$children**：组件中可以使用$parent和$children获取到父组件实例和子组件实例，进而获取数据

- **$attrs和$listeners**：使用$attrs和$listeners，在子组件上v-bind和v-on，在对一些组件进行二次封装时可以方便传值，例如A->B->C

- **provide和inject**：使用provide和inject（依赖注入），在父组件中使用provide方法提供数据，然后在子组件中使用inject方法注入数据。这种方式可以跨层级地传递数据，不仅仅限于父子组件关系。

- **eventBus**：使用eventBus进行跨组件触发事件，进而传递数据，new Vue()挂载一个实例到eventBus；如果是nuxt.js项目，直接导出（_, inject{  inject('eventBus', new Vue())}）

- **Vuex**：使用Vuex进行状态管理

- **localStorage**：使用浏览器本地缓存，例如localStorage



### 一、父子组件传值

1. props / $emit
2. $parant / children
3. $ref

```js
// 1.父亲访问儿子,儿子定义props,父亲双向绑定即可
// 2.在子组件发射事件给父组件
this.$emit('自定义事件名','传递的参数' )
// 3.在父亲访问儿子
this.$children[0].msg
// 4.在儿子访问父亲
this.$parant.msg();
// 5.ref命名，通过名字去找组件的事件和方法
```



### 二、非父子间传值

1. 事件总线

   ```js
   // 一个公共的js文件，很多地方都需要用到里面的方法，例如pubilc.js
   import public from './public.js'
   // 传递信息
   public.$emit('msg',val)
   // 监听信息
   pubilc.$on('msg',val = >{
       console.log(val,"回调函数")
   })
   
   ```

   

2. $atrrs 、$listeners

3. vuex

### 三、vue3组件传值方法有哪些？
- **Props（属性传值）**：使用组件的props属性来传递数据。在父组件中定义props属性，并通过属性绑定的方式将数据传递给子组件。子组件通过props接收传递的值，并在组件中使用。
- **Emit（事件传值）**：通过自定义事件进行传值。在子组件中使用$emit方法触发一个自定义事件，并将需要传递的数据作为事件参数。在父组件中通过添加事件监听器来接收传递的数据。
- **Provide / Inject（依赖注入）**：在父组件中使用provide方法提供数据，然后在子组件中使用inject方法注入数据。这种方式可以跨层级地传递数据，不仅仅限于父子组件关系。
- **$attrs 和 listeners**：在组件之间进行传递未声明的props和事件监听器。listeners：在组件之间进行传递未声明的props和事件监听器。attrs对象包含父组件传递给子组件但子组件未声明的props，而$listeners对象包含父组件传递给子组件的事件监听器。
- **Vuex（状态管理）**：如果需要在多个组件之间共享状态数据，你可以使用Vue的官方状态管理库Vuex。通过定义全局的状态管理模块，在多个组件中读取和修改共享的状态。

### 四、vue3组件子传父
1、子组件先定义defineEmits
```ts
const emit = defineEmits(['getcurMusic'])
```

2、子组件函数中发射
```ts
// 初始化
const init = () => {
  emit('getcurMusic', musiclist.value[0])
}
```
3、父组件使用
```html
<Music @getcurMusic="getcurMusic" />
```
```ts
onMounted(() => {
  getcurMusic();
})
```

### 五、vue3使用mitt插件实现事件总线传值
1、在client.js客户端文件全局引入mitt插件并注册
```ts
import { defineClientConfig } from '@vuepress/client'
import mitt from 'mitt'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.config.globalProperties.$Bus = mitt();
  },
  setup() {},
})
```

2、在组件中使用

要注意的是，事件总线的方法不能调用实例函数,因为事件总线不在实例生命周期里

如果想要在实现总线方法里调实例函数，可以用watch函数监听变化值再调用

```ts
import { getCurrentInstance  } from 'vue'
export default {
  props: {
  },
  setup() {
    const cateItem = ref({});
    const instance = getCurrentInstance()
    instance?.proxy?.$Bus.on('getCurCate', (res) => {
      if (res) {
        cateItem.value = res;
        // ...
      }
    })
    watch(cateItem, (newValue, oldValue) => {
        console.log('值发生了变更', newValue, oldValue);
        getCateList(newValue);
      },
      { deep: true, flush: 'post' }
    );

    // 获取文章类别
    const getCateList = (value) => {
      console.log(value);
    }
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      cateItem,
      getCateList
    }
  },
}
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>