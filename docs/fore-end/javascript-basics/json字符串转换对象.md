## 一、json字符串转对象

1. 使用`JSON.parse()`不支持没有引号的中文作为变量名

   ```typescript
   中文字符串没有引号
   let json = "[{手工正常:0},{未执行:287},{异常:0},{正常:0},{执行中:0},{任务总数:287}]"
   const obj = JSON.parse(json)
   ```


2. 使用`JSON.parse()`不支持单引号的中文作为变量名

   ```typescript
   中文字符串为单引号
   let json = "[{'手工正常':0},{'未执行':287},{'异常':0},{'正常':0},{'执行中':0},{'任务总数':287}]"
   const obj = JSON.parse(json)
   ```


3. 中文名变量必须用双引号

```typescript
let json = "[{手工正常:0},{未执行:287},{异常:0},{正常:0},{执行中:0},{任务总数:287}]"
const obj = JSON.parse(json)
// 总数
this.totalNum = obj[5]['任务总数']
// 未办理数
this.nothandledNum = obj[1]['未执行']
```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>