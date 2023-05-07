## slot的使用

功能：插槽可以增强组件拓展性；

应用：同样功能样式写成组件，组件不同的地方用插槽实现；

### 1. 默认插槽

- 如果使用的组件内不嵌套任何标签会显示默认插槽

- 直接在组件内嵌套标签内容，会直接替代默认插槽

### 2. 具名插槽

### 3. 作用域插槽

- 编译作用域：父组件实例的变量会在父组件的实例找；子组件的访问的变量会在子组件实例查找，不会跨域
- 如果父组件想要获取子组件插槽里的变量，并且对该变量做一些其它样式或者逻辑计算，可用slot-scopt='slotProps'获取属性
- 子组件的slot同时需要绑定:data="变量名"；绑定的data名字可以自定义

### 4. 子组件使用slot

```js
<template>
  <div>
    <!-- 插槽的使用：直接在组件里面写<slot></slot> -->
    <div>组件开始----------------------</div>

    <!-- 用法1. 默认插槽 -->
    <slot>
      <span>默认插槽</span>
      <button>取消</button>
      <button>提交</button>
    </slot>

    <!-- 用法2. 具名插槽 -->
    <slot name="header">
      <div style="font-size: 28px">
        <span style="font-size: 16px">具名插槽header：</span><span>显示标题</span>
      </div>
    </slot>
    <slot name="footer">
      <div style="font-size: 20px">
        <span style="font-size: 16px">具名插槽footer：</span>
        <button>取消</button>
        <button>确定</button>
      </div>
    </slot>

    <!-- 3. 作用域插槽 -->
    <!-- 编译作用域：
        父组件实例的变量会在父组件的实例找；子组件的访问的变量会在子组件实例查找，不会跨域 -->
    <!-- 如果父组件想要获取子组件插槽里的变量，并且对该变量做一些其它样式或者逻辑计算，可用slot-scopt='slotProps'获取属性 -->
    <!-- 子组件的slot同时需要绑定:data="变量名"；data名字可以自定义 -->
    <slot name="scopt-sloter" :data="slotData">
      <span>作用域插槽：</span>
    </slot>
    <slot name="scopt-sloter2" :slotData="slotData">
      <span>作用域插槽：</span>
    </slot>
    <div>----------------------组件结束</div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      slotData: [
        {
          name: 'mx',
          score: 119
        },
        {
          name: 'kk',
          score: 120
        },
        {
          name: 'gg',
          score: 141
        }
      ]
    }
  }
}
</script>
```

### 5. 在父组件使用子组件的插槽

```js
<template>
  <div>
    <!-- 1. 显示默认插槽 -->
    <compn />
    </br>
    </br>
    <!-- 直接在组件内嵌套标签内容，会直接替代默认插槽 -->
    <compn><button>放弃</button><button>确定</button></compn>
    </br>
    </br>
    <!-- 2. 具名插槽 -->
    <compn>
      <div slot="header">
        <p>驳回审核标题</p>
      </div>
      <div slot="footer">
        <p>终止审核</p>
      </div>
    </compn>
    </br>
    </br>
    <!-- 3. 作用域插槽 -->
    <compn>
      <div slot="scopt-sloter" slot-scope="slot">
        <span>作用域插槽：</span>
        <div v-for="item in slot.data" :key="item.name">
          {{ item.name }}：{{ item.score }}
        </div>
        <span>总计：</span>
      </div>

      <div slot="scopt-sloter2" slot-scope="slot">
        <span>作用域插槽data名字可自定义：</span>
        <div v-for="item in slot.slotData" :key="item.name">
          {{ item.name }}：{{ item.score }}
        </div>
        <span>总计：</span>
      </div>
    </compn>
  </div>
</template>
<script>
import compn from './vue/compn.vue'
export default {
  components: {
    compn
  }
}
</script>
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

