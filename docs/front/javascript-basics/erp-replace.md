## replace替换

Js中replace替换所有，给中文加上双引号“”

```typescript
let json = "[{手工正常:0},{未执行:287},{异常:0},{正常:0},{执行中:0},{任务总数:287}]"
json = json.replace(/\{/g,'{"')
json = json.replace(/\:/g,'":')
const obj = JSON.parse(json)
// 总数
this.totalNum = obj[5]['任务总数']
// 未办理数
this.nothandledNum = obj[1]['未执行']
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>

