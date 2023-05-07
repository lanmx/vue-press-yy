## TypeScript

**前言**

> typescript源于JavaScript，归于JavaScript。
>
> TypeScript只是JavaScript的基础上加了类型检测。
>
> TypeScript最终还是需要转换为JavaScript代码才能真正运行。
>
> 因此，TypeScript不可能取代js.
>
> 如果JavaScript语言本身加入类型检测，那么typeScript和flow都会退出舞台。
>
> **作用**：运行效率比javascript高
>
> 能在写代码的时候发现错误，就不要在编译阶段
>
> 能在编译的时候发现错误，就不要在运行阶段
>
> 宽松的类型约束使javascript不适合开发大型项目，



## 1. 安装ts

1. 在目录下输入安装命令

```css
npm install -g typescript
```

2. 再使用tsc --init生成tsconfig.json文件时提示以下错误

![image-20220730222443818](@alias/image-20220730222443818.png)

3. 解决方法

```css
npx tsc --init
```

![image-20220730222517960](@alias/image-20220730222517960.png)

## 2. 数据类型

- 布尔类型（boolean）

- 数字类型（number）

- 字符串类型（string）

- 数组类型（array）

- 元组类型（tuple）：保存的数据类型可以不同

  元组就是固定长度的数组

  ```ts
  let arr:[string,number,boolean]=["ts",3.18,true]
  ```

- 枚举类型 （enum）

  把所有可能的情况都列出来

  ```ts
  enum Flag{success=1,error=-1}
  ```

- 任意类型（any）

- null 和 undefined

- void类型

  表示空，以函数为例，就表示没有返回值的函数

- nerver类型

  表示永远不会返回结果

- [propName:string]:any

  表示任意类型的属性

## 3. 内置类型

```typescript
var title: string  // 字符串
var name: string = 'mx'  // 字符串
var isShow: boolean = false  // 布尔
var length: number = 0  // 数字
var age: number | string // 多个类型
// & 表示同时
var age2: number & string // 表示age2既是数字又是字符串（不建议这么用）
let such: { name: string } & { age: number }  // such的name满足字符串类型，同时age要满足数字类型

// 数组类型声明
var jobsList: Array<string> = ['警察', '医生', '教师']  // 字符串数组
var hoppyList: string[] = ['睡觉', '吃饭', '散步']  // 字符串数组
var numlist: Array<number> = [3, 2, 1]  // 数字数组
var numlist: number[] = [3, 2, 1]  // 数字数组
// 任意类型，设置any相当于对该变量关闭了TS类型检查
var list: any = [
    {
        name: 'mx',
        age: 24,
        fat: false
    }
]

// any类型可以赋值给任意变量，不会报错；
// 如果声明变量不指定类型，则TS解析器会自动判断变量的类型为any(隐式的any)
var city;

// 未知类型unknown，实际上是一个类型安全的any
// unkown类型不可以赋值给任何一个类型，因为该类型是未知的，哪个类型都匹配不上
var address: unknown

// 类型断言:可以用来告诉解析器变量的实际类型
title = address as string;
title = <string>address;

// Object对象{},{}用来指定对象中可以包含哪些属性, ?表示属性是可选的，例如下面的myobj的height属性可以不存在
let myobj = { name: string, age: number | string, height?: string }

// [proName: string]: number 表示任意数字类型的属性
let myobj2 = { name: string, [proName: string]: number }
myobj2 = { name: 'lanmx', age: 20, height: 180 }

// 枚举
enum Status { Success = 200, Error = -1 }

// 无类型void
/**
 * void类型意味着不期望那里有类型。通常用作函数的返回值，表示没有任何返回值。
 */
function setName(name: string): void {
    this.name = name
}
// 函数入参和返回值类型
// 入参必须为string类型，冒号后面的string代表函数返回的值必须是boolean类型
function foo(bar:string): boolean {
	console.log(bar.length)
    return true
}
// 表示永远不会返回结果
function fn(): never {
    throw new Error('报错了~~')
}
```

**拓展：类型的别名**

```ts
type myType = string
type otherType = {
    name: string
    age: number
    job?: string
}
```

**拓展：字面量**

通过字面量可以指定变量的类型，可以确定变量的取值范围

```ts
let color: 'red' | 'blue' | 'black';
let type: 1 | 2 | 3 | 4 | 5;
```



## 4. 枚举类型

```typescript
// 枚举
const enum FundType { ETF, ETFLink, Index }  // 用const定义的枚举变量不能解构
enum Status { Success = 200, Error = -1 }
enum FundTypeSting { Fund1 = "A", Fund2 = "B", Fund3 = "C" }
enum FundTypeList { Fund4, Fund5, Fund6 }
enum MoreConfusion {
  A,
  B = 2,
  C = "C"
}
console.log(FundType.ETF,"ETF");
console.log(FundType.ETFLink,"ETFLink");
console.log(FundType.Index,"Index");
const { Success, Error } = Status  // 不用const定义的枚举变量可以解构
const { A,B,C } = MoreConfusion
const { Fund1,Fund2,Fund3 } = FundTypeSting
const { Fund4,Fund5,Fund6 } = FundTypeList
console.log(Success, Error, A,B,C );
console.log(Fund1,Fund2,Fund3, "Fund1,Fund2,Fund3" );
console.log(Fund4,Fund5,Fund6, "Fund4,Fund5,Fund6" );
console.log(FundTypeList[0],FundTypeList[1],FundTypeList[2], "FundTypeList[0]" );
console.log(FundTypeList['Fund4'],FundTypeList['Fund5'],FundTypeList['Fund6'], "FundTypeList['Fund4']" );
console.log(FundTypeList, "FundTypeList" );
```

![image-20220729203632636](@alias/image-20220729203632636.png)

## 5. 类

```typescript
class Person {
  userinfo: {
      first_name: string;
      last_name: string;
      age: number;
      married: boolean;
  }
  getUserinfo(): Object {
      console.log(this.userinfo)
      return this.userinfo
  }
}
```

