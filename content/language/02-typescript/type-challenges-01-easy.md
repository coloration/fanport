---
title: TypeScript 类型挑战 (一) Easy
index: Language.TypeScript.Practice
---
 

[[toc]]

- 项目地址 [Github](https://github.com/type-challenges/type-challenges) 
- 项目描述: 高质量的类型可以帮助提高项目的可维护性，同时避免潜在的错误。


### 优势

- 提高 TypeScript 技术能更好的在编译阶段处理一些问题, 这些问题可能**在运行时侵占更多的资源**. 例如一个只读的对象属性, 在 JavaScript 中的一种实现方式就是在该属性的 setter 中抛出异常. 在TS中使用关键字即可在编译阶段就阻止这样的代码写入程序.

``` js
// 运行时
class Husky {
  set a () {  
    throw new Error('a is a readonly propertype')
  }
}

```

``` ts
class Husky {
  readonly a 
}
```

- 提升程序稳定性, 可预期的代码行为, 更好的代码说明性.



### 劣势

- 引入TypeScript 就是引入复杂度, 项目必须编写更多运行时以外的说明代码.
- 对程序人员技术要求更高, 一个复杂的类型约束可能非常不好读. 项目最后很有可能编程 AnyScript 
- 并完全不能替代运行时的类型校验, 因为数据很有可能都是后端传递过来的无法控制. Superstruct 运行时类型检查


### Easy 版需要注意的事情

1. 需要了解基本的语法含义比如 `extends` `keyof` `typeof` `infer` `...` 他们有些和 JavaScript 语法形式一致. 但含义并不相同. 类型操作是在类型命名空间. 值操作(即JavaScript)是在值命名空间进行. 所以在编译后抹去所有的类型操作, 并不会影响程序运行.
2. 基于上一条, 刚进行类型挑战的人. 比如刚才的我, 很难注意到类型和值边界. 所有的类型的操作所返回的东西依然是类型, 尽管它看起来是一个值. 比如: `type Exclude<'a' | 'b', 'a'> => 'b'`

你可以去源码仓库去在线实操一下. 更容易掌握. 更多的类型技术需要更长的时间进行积累. 下面我们开始吧.

Note: 
- 有意思的是校验挑战的正确性的程序本身也是 TypeScript 的类型语法. 所以 TypeScript 自称是图灵完备的. 但是项目中的这句话被横线划掉了, 这看起来就很有意思了, 我们随着挑战的进行继续看下去吧.
- 练习时也可以使用编辑器新建TS文件, 通过这种方式进行校验.

## Pick

`Easy`, `#union`, `#built-in`


实现 TS 内置的 `Pick<T, K>`，但不可以使用它。

从类型 T 中选择出属性 K，构造成一个新的类型。

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

答案

```ts
type MyPick<T, U extends keyof T> = {
  [K in U]: T[K]
}

// U = keyof T = ['title', 'description', 'completed']
// K = 循环 U

```

## Readonly

`Easy`, `#union`, `#built-in`

不要使用内置的 `Readonly<T>`，自己实现一个。

该 Readonly 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。

也就是不可以再对该对象的属性赋值。

``` ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

答案

``` ts
type MyReadonly<T> = {
  readonly[K in keyof T]: T[K]
}
```

## Tuple to Object

`Easy`

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

``` ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> 
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

答案

``` ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K
}

// T = ['string', 'string', 'string', 'string']
// T[number] = tuple
// K = 循环 T[number] = 循环 tuple
// readonly 对应 as const
```

## First of Array

`Easy`, `#array`

实现一个通用 `First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

``` ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

答案 

``` ts
type First<T extends any[]> = T extends [] ? never : T[0]
```

## Length of Tuple

创建一个通用的 `Length`，接受一个 `readonly` 的数组，返回这个数组的长度。

``` ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

答案

``` ts
type Length<T extends readonly any[]> = T['length']
```

## Exclude

`Easy`, `#built-in`

实现内置的 `Exclude <T, U>` 类型，但不能直接使用它本身。

``` ts
type MyExclude<'a' | 'b' | 'c', 'a'>  // Exclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'
type MyExclude<string | number | (() => void), Function> // Exclude<string | number | (() => void), Function> // string | number
```

答案

```ts
type MyExclude<T, U> = T extends U ? never : T

// Exclude = T - U
```

## Awaited

`Easy`, `#promise`, `#built-in`

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

``` ts
type X = MyAwaited<Promise<string>> // string
type Y = MyAwaited<Promise<{ field: number }>> // { field: number }
type Z = MyAwaited<Promise<Promise<Promise<string | number>>>> // string | number

```

答案

``` ts
type MyAwaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : T
```

## If

`Easy`, `#utils`

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 true 或者 false， `T` 和 `F` 可以是任意类型。

``` ts
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

答案

``` ts
type If<C extends boolean, T, F> = C extends true ? T : F
```

## Concat

`Easy`, `#array`

在类型系统里实现 JavaScript 内置的 Array.concat 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

``` ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

答案 

``` ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

## Includes

`Easy`, `#array`

在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

答案

``` ts
type Equal<X, Y> = <T>() => T extends X ? 1 : 2 extends <T>() => T extends Y ? 1 : 2 ? true : false

type Includes<T extends readonly any[], U> = 
  T extends [infer First, ...infer Rest]
    ? Equal<U, First> extends true
      ? true
      : Includes<Rest, U>
    : false
```

## Push

`Easy`, `#array`

在类型系统里实现通用的 Array.push 

``` ts
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

```ts
type Push<T extends any[], U> = [...T, U]
```

## Unshift

`Easy`, `#array`

在类型系统里实现通用的 Array.unshift 

``` ts
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

```ts
type Unshift<T extends any[], U> = [U, ...T]
```

## Parameters

`Easy`, `#infer`, `#tuple`, `#built-in`

实现内置的 Parameters 类型

``` ts
const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type MyParameters<typeof foo> // [string, number]
type MyParameters<typeof bar> // [boolean, { a: 'A' }]
type MyParameters<typeof baz> // []
]
```

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never
```