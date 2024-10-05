---
title: TypeScript Tip
---


2. 箭头函数泛型

不能在 tsx 文件中使用 

``` ts
type Add = <T = any>(a: T, b: T) => T
```


1. 构造函数类型声明

``` ts
interface Greeter {
  getGreeting(): string
}

interface GreeterConstructor {
  new(): Greeter
}

function getGreeterBase(): GreetConstructor {}
```


- [类型缩小](https://juejin.cn/post/7139419781605621790)
- [阮一峰 - TypeScript 教程](https://wangdoc.com/typescript)