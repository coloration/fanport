---
title: TypeScript 类型挑战 (二) Medium
index: Language.TypeScript.Practice
---

[[toc]]
  
- 项目地址 [Github](https://github.com/type-challenges/type-challenges)
- 项目描述: 高质量的类型可以帮助提高项目的可维护性，同时避免潜在的错误。
  

### Medium 版需要注意的事情

- 这部分挑战有很多使用递归来实现。还涉及很多类型语言的特殊用法。比如如何判断 never。利用数组来计数等等。

## Get Return Type

`Medium`, `#infer`, `#built-in`

实现 TS 内置的 `ReturnType<T>`，但不可以使用它。


```ts
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

答案

```ts
type MyReturnType<T> = T extends (...arg: any) => infer R ? R : never
```

## Omit

`Medium`, `#union`, `#built-in`

不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。
Omit 会创建一个省略 K 中字段的 T 对象。

``` ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

```

答案

``` ts
type MyExclude<T, K> = T extends K ? never : T

type MyOmit<T, K> = {
  [V in MyExclude<keyof T, K>]: T[V]
}
```

  

## Readonly 2

`Medium`, `#readonly`, `#object-keys`

实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

`K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

``` ts
interface Todo {

  title: string
  description: string
  completed: boolean
  
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {

  title: "Hey",
  description: "foobar",
  completed: false,
  
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK

```

答案

``` ts

type MyReadonly2<T, K extends keyof T = keyof T> = {

  [P in keyof T as P extends K ? never : P] : T[P]
  
} & {

  readonly [P in keyof T as P extends K ? P : never] : T[P]
  
}
```

  

## Deep Readonly

`Medium`, `#readonly`, `#object-keys`, `#deep`

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

  

``` ts
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`

```

答案

``` ts
type DeepReadonly<T> = {

  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>

}
```

  
## Tuple to Union

`Medium`, `#infer`, `#tuple`, `#union`
  
实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

``` ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

答案

``` ts

type TupleToUnion<T extends any[]> = T[number]

```
  

## Chainable Options

`Medium`, `#application`

在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。

  

``` ts
declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。
  

答案

```ts
type Chainable<T = {}> = {

  option<K extends string, V extends any>(key: K, value: V)
	: Chainable<T & { [P in K] : V }>
  get(): T

}
```

  

## Last of Array

`Medium`, `#array`

实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

``` ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

答案

``` ts
type Last<T extends any[]> = T extends [... infer rest, infer L] ? L : undefined
```

  

## Pop, Shift, Push, Unshift

`Medium`, `#array`

实现一个通用`Pop<T>`，它接受一个数组`T`并返回一个没有最后一个元素的数组。


``` ts

type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]

```

**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？  

答案


``` ts

type Pop<T extends any[]> = T extends [... infer R, infer last] ? R : T

type Push<T extends any[], V extends any> = [...T, V]

type Shift<T extends any[]> = T extends [infer head, ... infer R] ? R : T

type Unshift<T extends any[], V extends any> = [V, ...T]

```


## Promise.all

`Medium`, `#array`, `#built-in`

键入函数`PromiseAll`，它接受PromiseLike对象数组，返回值应为`Promise<T>`，其中`T`是解析的结果数组。

``` ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = Promise.all([promise1, promise2, promise3] as const)

```

答案

``` ts
declare function PromiseAll<T extends any[]>(values: readonly [...T])
  : Promise<{ [K in keyof T] : T[K] extends Promise<infer R> ? R : T[K] }>

```

## Type Lookup

`Medium`, `#union`, `#map

有时，您可能希望根据某个属性在联合类型中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中搜索公共`type`字段来获取相应的类型。换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得`Dog`，`LookUp<Dog | Cat, 'cat'>`获得`Cat`。

``` ts
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`

```

答案

``` ts
type LookUp<U, V extends string> = U extends { type: infer T } 
	? V extends T ? U : never 
	: never

```

## Trim Left

`Medium`, `#template-literal`

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

``` ts
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
```

答案

``` ts
type TrimChar = ' ' | '\n' | '\t'

type TrimLeft<S extends string> = 
	S extends `${TrimChar}${infer R}` ? TrimLeft<R> : S

```

## Trim

`Medium`, `#template-literal`

实现`Trim<T>`，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

``` ts
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

答案

``` ts
type TrimChar = ' ' | '\n' | '\t'

type TrimLeft<S extends string> =
  S extends `${TrimChar}${infer R}` ? TrimLeft<R> : S

type TrimRight<S extends string> =
  S extends `${infer L}${TrimChar}` ? TrimRight<L> : S


type Trim<S extends string> = TrimLeft<TrimRight<S>>
```

## Capitalize

`Medium`, `#template-literal`

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

``` ts
type capitalized = MyCapitalize<'hello world'> // expected to be 'Hello world'
```

答案

``` ts
type MyCapitalize<S extends string> = S extends `${infer H}${infer R}` 
	? `${Uppercase<H>}${R}` : S

```

## Replace

`Medium`, `#template-iteral`

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

``` ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'> 
// 期望是 'types are awesome!'
```

答案

``` ts
type Replace<S extends string, From extends string, To extends string> = 
	From extends '' 
		? S 
		: S extends `${infer H}${From}${infer E}` ? `${H}${To}${E}` : S

```

## ReplaceAll

`Medium`, `#template-literal`

实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

``` ts
type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'

```

答案

``` ts
type ReplaceAll<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer H}${From}${infer E}` 
	    ? `${H}${To}${ReplaceAll<E, From, To>}` 
	    : S
```


## Append Argument

`Medium`, `#arguments`

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

``` ts
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number
```

答案

``` ts
type AppendArgument<Fn extends (...args: any[]) => any, A> = 
	Fn extends (...args: infer Arg) => infer R 
	? (...arg: [...Arg, A]) => R 
	: never
```

## Permutation

`Medium`, `#union`

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```ts
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

答案

``` ts
type Permutation<T, K=T> =
	[T] extends [never]
		? []
		: K extends K
			? [K, ...Permutation<Exclude<T, K>>]
			: never
```

https://github.com/type-challenges/type-challenges/issues/614

Note

``` ts
T extends never // 不生效
T[] extends never // 不生效
[T] extends [never] // 生效
```

## Length of String

`Medium`, `#template-literal`

计算字符串的长度，类似于 `String#length` 。

```ts
LengthOfString<'kumiko'> // 6
```

答案

``` ts
type StringToArray<S extends string> = 
	S extends `${infer H}${infer R}` 
		? [H, ...StringToArray<R>] 
		: []

type LengthOfString<S extends string> = StringToArray<S>['length']
```


## Flatten 

`Medium`, `#array`

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

答案

``` ts
type Flatten<T extends any[]> = 
	T extends [infer H, ...infer R]
	  ? [
	    ...(H extends any[] ? Flatten<H> : [H]),
	    ...(R extends any[] ? Flatten<R> : [R]),
	  ]
	  : []
```



## Append to object

`Medium`, `#object-keys`

实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

```ts
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

答案

``` ts
type AppendToObject<
	T extends {}, 
	U extends string | number | symbol, 
	V
> = {
	[K in keyof T | U]: K extends keyof T
	    ? K extends U
			? V
			: T[K]
	    : V
}
```



## Absolute
`Medium`, `#math` ,`#template-literal`

实现一个接收string,number或bigInt类型参数的`Absolute`类型,返回一个正数字符串。

```ts
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

答案

``` ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer X}` ? X : `${T}`
```



## String to Union
`Medium`, `#union` , `#string`

实现一个将接收到的String参数转换为一个字母Union的类型。

```ts
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

答案

``` ts
type StringToUnion<T extends string> = 
	T extends `${infer H}${infer R}` 
		? H | StringToUnion<R> 
		: never
```


## Merge

`Medium`, `#object`

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```ts
type foo = {
  name: string;
  age: string;
}
type coo = {
  age: number;
  sex: string
}

type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
```

答案

``` ts
type Merge<T extends {}, S extends {}> = {
  [K in (keyof T | keyof S)]: K extends keyof S
    ? S[K]
    : K extends keyof T ? T[K] : never
}
```


## KebabCase

`Medium`, `#`

`FooBarBaz` -> `foo-bar-baz`

```ts
type KebabCase<'`FooBarBaz`'> // `foo-bar-baz`
```

答案

``` ts
type _KebaCase<S extends string> = S extends `${infer H}${infer R}`
  ? H extends Lowercase<H>
    ? `${H}${_KebaCase<R>}`
    : `-${Lowercase<H>}${_KebaCase<R>}`
  : ''

  

type KebabCase<S extends string> = S extends `${infer H}${infer R}`
  ? H extends Lowercase<H>
    ? `${H}${_KebaCase<R>}`
    : `${Lowercase<H>}${_KebaCase<R>}`
  : ''
```


## Diff

`Medium`, `#object`

获取两个接口类型中的差值属性。

```ts
type Foo = {
  a: string;
  b: number;
}
type Bar = {
  a: string;
  c: boolean
}

type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }
```

答案

``` ts
type Diff<O extends {}, O1 extends {}> = {
  [K in Exclude<keyof O1, keyof O> | Exclude<keyof O, keyof O1>] :
    K extends keyof O
      ? O[K]
      : K extends keyof O1
        ? O1[K]
        : never
}
```



## AnyOf

`Medium`, `#array`

在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
```

答案

``` ts
type Falsy = '' | [] | false | Record<keyof any, never> | 0
type AnyOf<T extends readonly any[]> = T[number] extends Falsy ? false : true
```



## IsNever

`Medium`, `#union` , `#utils`

实现 `IsNever` 类型, 解析输入 T 类型为 `never` 返回 `true` 否则 返回 `false`

```ts
type A = IsNever<never>  // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

答案

``` ts
type IsNever<T extends any> = [T] extends [never] ? true : false

// note T extends never 无法判定

```


## IsUnion

`Medium`, `#union` , `#utils`

实现 `IsUnion` 类型, 解析输入 T 类型为联合类型 返回 `true` 否则 返回 `false`

```ts
type case1 = IsUnion<string>  // false
type case2 = IsUnion<string|number>  // true
type case3 = IsUnion<[string|number]>  // false
```

答案

``` ts
type IsUnionImpl<T, C extends T = T> = 
	(T extends T 
		? C extends T 
			? true 
			: unknown 
		: never
	) extends true ? false : true
type IsUnion<T> = IsUnionImpl<T>
```


## ReplaceKeys

`Medium`

实现 `ReplaceKeys` 类型, 它将替换联合类型中类型的键值， 如果该类型没有这个Key则跳过，如果有则替换。

```ts
type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type Nodes = NodeA | NodeB | NodeC

type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

答案

``` ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T
    ? Y[keyof Y & K]
    : U[K]
}
```


## Remove Index Signature

`Medium`

从对象类型中排除索引签名。

```ts
type Foo = {
  [key: string]: any;
  foo(): void;
}

type A = RemoveIndexSignature<Foo>  // expected { foo(): void }

```

答案

https://github.com/type-challenges/type-challenges/issues/3542


``` ts
type RemoveIndexSignature<T> = {
    [K in keyof T as K extends `${infer _}` ? K : never]: T[K]
}

// `${infer _}` 不同于 string
// 我们需要将K约束为字符串的值，而不是字符串类型
```

## Percentage Parser

`Medium`

实现类型 PercentageParser。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。

匹配的结果由三部分组成，分别是：[`正负号`, `数字`, `单位`]，如果没有匹配，则默认是空字符串。

```ts
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]
```

答案

``` ts
type Prefix<T extends string> = T extends `${infer P}${string}`
  ? P extends '-' | '+' ? P : ''
  : ''

type Suffix<T extends string> = T extends `${string}%` ? '%' : ''

type Num<T extends string> = T extends `${Prefix<T>}${infer R}${Suffix<T>}` ? R : never

type PercentageParser<A extends string> = [Prefix<A>, Num<A>, Suffix<A>]
```


## Drop Char

`Medium`

从字符串中剔除指定字符。

```ts
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

答案

``` ts
type DropChar<S extends string, C extends string> = S extends `${infer H}${infer R}`
  ? `${H extends C ? '' : H}${DropChar<R, C>}`
  : S
```


## MinusOne

`Medium`, `Math`

给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

```ts
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

答案

``` ts
type MinusOne<T extends number, U extends number[] = []> = 
	U['length'] extends T 
	? U[0] 
	: MinusOne<T, [U['length'], ...U]>
// max 999 -> 998 TS最大递归次数
```


## PickByType

`Medium`, `object`

从 `F` 中选出类型相同的属性

```ts
type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }

```

答案

``` ts
type PickByType<T extends {}, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}
```

## OmitByType

`Medium`, `#object`

保留没有在U中指定的类型的字段

```ts
type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }
```

答案

``` ts
type OmitByType<T extends {}, U> = {

  [K in keyof T as T[K] extends U ? never : K] : T[K]

}
```



## StartsWith, EndsWith

`Medium`， `#template-literal`

实现`StartsWith<T, U>`,接收两个string类型参数,然后判断`T`是否以`U`开头,根据结果返回`true`或`false`

```ts
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

答案

``` ts
type StartsWith<T extends string, U extends string> = 
	T extends `${U}${string}` ? true : false

type EndsWith<T extends string, U extends string> = 
	T extends `${string}${U}` ? true : false
```


## PartialByKeys

`Medium`, `#object`

实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。

```ts
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
```

答案

``` ts
type Copy<T> = {
  [K in keyof T]:T[K]
}

type PartialByKeys<T , K extends keyof any = keyof T> = 
	Copy<Partial<Pick<T,Extract<keyof T, K>>> & Omit<T,K>>
```


## RequiredByKeys

`Medium`, `#object`

实现一个通用的`RequiredByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设为必选的`T`的属性集。当没有提供`K`时，它就和普通的`Required<T>`一样使所有的属性成为必选的。

```ts
interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
```

答案

``` ts
type Copy<T> = {
  [K in keyof T]:T[K]
}

type RequiredByKeys<T, K extends keyof any = keyof T> = 
	Copy<Required<Pick<T,Extract<keyof T, K>>> & Omit<T,K>>
```

## Mutable

`Medium`, `#readonly`, `object-keys`

实现一个通用的类型 `Mutable<T>`，使类型 `T` 的全部属性可变（非只读）。

```ts

interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
```

答案

``` ts
type Mutable<T> = {
  -readonly[K in keyof T]: T[K]
}
```

## ObjectEntries

`Medium`, `#object`

1

```ts
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];

```

答案

``` ts
type ObjectEntries<T extends object, U = keyof T> = {
	[K in keyof T]-?: [
		K, Exclude<T[K], undefined> extends never 
			? undefined 
			: Exclude<T[K], undefined>
	]
}[keyof T]
```


## Tuple to Nested Object

`Medium`

给定只包含字符串的元组，和类型U, 递归构建对象

```ts

type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
```

答案

``` ts
type TupleToNestedObject<T, U> = T extends [infer H extends string, ...infer R]
  ? { [K in H] : TupleToNestedObject<R, U> }
  : U
```


## Reverse

`Medium`, `#tuple`

实现类型版本的数组反转 `Array.reverse`

```ts

type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

答案

``` ts
type Reverse<T extends any[]> = 
	T extends [infer H, ...infer R] ? [...Reverse<R>, H] : []
```


## Flip Arguments

`Medium`, `#arguments`

实现类型版本的 lodash `_.flip` 函数

类型 `FlipArguments<T>` 需要函数 `T` 并返回一个新的函数类型。这个函数类型拥有相同的参数，但参数类型是被反转的。

```ts
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
// (arg0: boolean, arg1: number, arg2: string) => void

```

答案

``` ts
type Reverse<T extends any[]> = 
	T extends [infer H, ...infer R] ? [...Reverse<R>, H] : []

type FlipArguments<T extends (...args: any[]) => any> = 
	T extends (...args: infer P) => infer R 
		? (...args: Reverse<P>) => R 
		: void
```


## FlattenDepth

`Medium`, `#array`

按深度递归展平阵列。

```ts
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

```

答案

``` ts
type FlattenOnce<T extends any[]> =
  T extends [infer H, ...infer R]
    ? H extends any[]
      ? [...H, ...FlattenOnce<R>]
      : [H, ...FlattenOnce<R>]
    : T

type FlattenDepth<
  T extends any[],
  D extends number = 1,
  Count extends 1[] = [],
  Flattened extends any[] = Count['length'] extends D 
	  ? T 
	  : FlattenOnce<T>,
  > = Flattened extends T ? T : FlattenDepth<Flattened, D, [...Count, 1]>
```


## BEM style string

`Medium`

块、元素、修饰符方法 (BEM) 是 CSS 中类的流行命名约定。例如，块组件将表示为 `btn`，依赖于块的元素将表示为 `btn__price`，改变块样式的修饰符将表示为 `btn--big` 或 `btn__price--warning`。实现 BEM<B, E, M> 从这三个参数生成字符串联合。其中 B 是字符串文字，E 和 M 是字符串数组（可以为空）。

```ts

BEM<'btn', ['price'], ['warning', 'success']
// 'btn__price--warning' | 'btn__price--success'
```

答案

``` ts
type BEM<B extends string, E extends string[], M extends string[]> =
  `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`
```


## InorderTraversal

`Medium`,`#object`

实现二叉树中序遍历的类型版本。

```ts
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]

```

答案

``` ts
interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

type InorderTraversal<T extends TreeNode | null> = 
	[T] extends [TreeNode] 
		? [
			...InorderTraversal<T['left']>, 
			T['val'], 
			...InorderTraversal<T['right']>
		] : []
```


## Flip

`Medium`

实现类型 `just-flip-object`:

```ts
Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}

```

答案

``` ts
type Flip<T extends any> = {
  [
    K in keyof T as T[K] extends keyof any
    ? T[K]
    : `${T[K] & (bigint | boolean | null | undefined)}`
  ]: K
}
```


## Fibonacci Squence

`Medium`

实现泛型 `Fibonacci<T>` 传入数字 `T` 返回正确的 [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

```ts
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

答案

``` ts
type Fibonacci<
	T extends number, 
	N1 extends 1[] = [], 
	N2 extends 1[] = [1], 
	Count extends 1[] = [1]
> =
  T extends 0 
	  ? 0
	  : Count['length'] extends T 
		  ? N2['length']
		  : Fibonacci<T, N2, [...N1, ...N2], [...Count, 1]>
```


## AllCombinations

`Medium`

实现类型  `AllCombinations<S>` 返回所有字符组合.

```ts
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
```

答案

``` ts
type String2Union<S extends string> =
  S extends `${infer C}${infer REST}`
  ? C | String2Union<REST>
  : never

type AllCombinations<
  STR extends string,
  S extends string = String2Union<STR>,
> = [S] extends [never]
  ? ''
  : '' | {[K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}`}[S]
```


## Greater Than

`Medium`， `#array`

实现类型 `GreaterThan<T, U>`  来比较大小，就像  `T > U` 。不需要考虑负数

1

```ts
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

答案

``` ts
type GreaterThan<
  TA extends number,
  TB extends number,
  TArray extends unknown[] = [],
  TResult extends [boolean, boolean] = [
    TA extends TArray['length'] ? true : false,
    TB extends TArray['length'] ? true : false
  ]
> = TA extends TB
  ? false
  : TResult extends [true, false]
    ? false
    : TResult extends [false, true]
      ? true
      : GreaterThan<TA, TB, [...TArray, unknown]>
```


## Zip

`Medium`, `#tuple`

实现 `Zip<T, U>` 类型。 T, U 必须为 `Tuple`

```ts
type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
```

答案

``` ts
type Zip<T extends any[], U extends any[]> =
  T extends [infer TH, ...infer TR]
    ? U extends [infer UH, ...infer UR]
      ? [[TH, UH], ...Zip<TR, UR>]
      : []
    : []
```

## IsTuple

`Medium`, `#tuple`

实现 `IsTuple`, 接收类型 `T` 判断 `T` 是否为元组类型

```ts
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

答案

``` ts
type IsTuple<T extends any> =
  [T] extends [never]
    ? false
    : T extends readonly []
      ? true
      : T extends [infer H, ...infer R] | readonly [infer H, ...infer R]
        ? true
        : false


type IsTuple<T extends any> =
  [T] extends [never]
    ? false
    : T extends readonly any[]
      ? number extends T['length']
        ? false
        : true
      : false
```


## Chunk

`Medium`， `#tuple`

实现 `Chunk<T, N>`, 它有两个必填的类型参数，`T` 必须为 `tuple`, `N` 必须为大于1的数字

```ts
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

答案

``` ts
type Chunk<
  T extends any[],
  N extends number,
  Result extends any[] = [],
  Cache extends any[] = []
> = T extends [infer H, ...infer R]
  ? Cache['length'] extends N
    ? Chunk<R, N, [...Result, Cache], [H]>
    : Chunk<R, N, Result, [...Cache, H]>
  : Cache extends []
    ? Result
    : [...Result, Cache]
```


## Fill

`Medium`, `tuple`

`Fill`, 一个常用的 JavaScript 函数, 我们用类型实现它. `Fill<T, N, Start?, End?>`, 它接收4个类型参数,  `T` , `N` 是必填参数 `T`为元组, `N` 为 any,  `Start` , `End` 是可选参数，为大于零的数子. 

```ts
type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
```

为了模拟真实的功能，测试中可能会包含一些边界条件，希望大家喜欢:)


答案

``` ts
type Fill<
  TArray extends Array<unknown>,
  TN,
  TStart extends number = 0,
  TEnd extends number = TArray["length"],
  TResult extends Array<unknown> = [],
  TCanFill = false
> = EmptyRange<TStart, TEnd> extends true
  ? TArray
  : TArray extends [infer First, ...infer Rest]
  ? TResult["length"] extends TStart
    ? Fill<Rest, TN, TStart, TEnd, [...TResult, TN], true>
    : TResult["length"] extends TEnd
    ? Fill<Rest, TN, TStart, TEnd, [...TResult, First], false>
    : Fill<Rest, TN, TStart, TEnd, [...TResult, (TCanFill extends true ? TN : First)], TCanFill>

  : TResult
```


##  Trim Right

`Medium`

实现 `TrimRight<T>` 它采用精确的字符串类型并返回一个删除了空格结尾的新字符串。

```ts
type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
```

答案

``` ts
type TrimChar = ' ' | '\n' | '\t'

type TrimRight<S extends string> =
  S extends `${infer R}${TrimChar}` ? TrimRight<R>: S
```


## Without

`Medium`, `#union`, `#array`

实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

```ts

type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
```

答案

``` ts
type Without<T, U> =
  T extends [U extends any[] ? U[number] : U, ...infer R]
    ? Without<R, U>
    : T extends [infer H, ...infer R]
      ? [H, ...Without<R, U>]
      : T
```


## Trunc

`Medium`, `template-literal`

实现类型版本的 `Math.trunc`. 它接受字符串或数字返回整数部分，提出小数部分

```ts
type A = Trunc<12.34> // 12
```

答案

``` ts
type Trunc<N extends number | string> = `${N}` extends `${infer H}.${string}` 
	? H 
	: `${N}`
```


## IndexOf

`Medium`, `#array`

实现类型版本的 `Array.indexOf<T, U>`, 它接收数组T 和 U 返回U在T中的索引值

```ts
type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
```

答案

``` ts
type IndexOf<T extends any[], U, Cache extends unknown[] = []> =
  T extends [infer H, ...infer R]
    ? Equal<H, U> extends true
      ? Cache['length']
      : IndexOf<R, U, [unknown, ...Cache]>
    : -1
```


## Join

`Medium`, `#array`

实现类型版 `Array.join<T, U>` 接收数组T和字符串或数字 U 

```ts
type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
type Res3 = Join<["o"], "u">; // expected to be 'o'
```

答案

``` ts
type Join<T, U extends string | number, Result extends string = ''> =
  T extends [infer H, ...infer R]
    ? Join<R, U, Result extends '' ? H : `${Result}${U}${H & string}`>
    : Result
```


## LastIndexOf

`Medium`, `#array`

实现类型版本的 `Array.lastIndexOf<T, U>`, 它接收数组T 和 U 返回U在T中的反向索引值

```ts
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
```

答案

``` ts
type LastIndexOf<O extends any[], U, Cache extends unknown[] = []> =
  O extends [...infer R, infer T]
    ? Equal<T, U> extends true
      ? R['length']
      : LastIndexOf<R, U, [...Cache, unknown]>
    : -1
```


## Unique

`Medium`, `#array`

实现类型版本的`Lodash.uniq`, 它接收数组T，返回去重后的T

```ts
type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
```

答案

``` ts
type IsIncludes<T extends any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : IsIncludes<R, U>
  : false

type Unique<T extends any[], U extends any[] = []> =
  T extends [infer H, ...infer R]
    ? IsIncludes<U, H> extends false
      ? Unique<R, [...U, H]>
      : Unique<R, U>
    : U
```


## MapTypes

`Medium`

实现 `MapTypes<T, R>` 它将对象 T 中的类型转换为类型 R 定义的不同类型，类型 R 具有以下结构。

```ts

type StringToNumber = {
  mapFrom: string; // value of key which value is string
  mapTo: number; // will be transformed for number
}

type StringToNumber = { mapFrom: string; mapTo: number;}
type a = MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }

type StringToDate = { mapFrom: string; mapTo: Date;}

type b = MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }


type c = MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }

```

答案

``` ts
type GetMapToType<
  T,
  R,
  Type = R extends { mapFrom: T; mapTo: infer To } ? To : never
> = [Type] extends [never] ? T : Type

type MapTypes<T, R> = {
  [key in keyof T]: GetMapToType<T[key], R>
}
```


## Construct Tuple

`Medium`, `#tuple`

构造一个给定长度的元组

```ts
type result = ConstructTuple<2> // expect to be [unknown, unkonwn]
```

答案

``` ts
type ConstructTuple<L extends number, Res extends unknown[] = []> =
  L extends Res['length']
    ? Res
    : ConstructTuple<L, [...Res, unknown]>
```


## Number Range

`Medium`

有时我们想限制数字的范围......例如。

```ts
type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
```

答案

``` ts
type NumberRange<
  T extends number,
  U extends number,
  R extends any[] = [],
  L extends any[] = [],
  S extends any[] = []
> = T extends R['length']
  ? U extends L['length']
    ? S[number] | L['length']
    : NumberRange<T, U, R, [...L, T], [...S, L['length']]>
  : NumberRange<T, U, [...R, T], [...R, T], S>
```


## Combination

`Medium`, `#array`, `#application`, `#string`

给定一个字符串数组，进行置换和组合。它对于像video controlsList这样的类型也很有用

```ts
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<['foo', 'bar', 'baz']>

```

答案

``` ts
type Combination<T extends string[], U = T[number], A = U> = 
  U extends infer U extends string
    ? `${U} ${Combination<T, Exclude<A, U>>}` | U
    : never
```


## Subsequence

`Medium`, `#union`

给定一个唯一元素数组，返回所有可能的子序列。

子序列是一个序列，可以通过删除一些元素或不删除任何元素而从数组中派生，而不改变其余元素的顺序。

```ts
type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
```

答案

``` ts
type Subsequence<T extends unknown[]> = T extends [infer X, ...infer Y]
  ? [X, ...Subsequence<Y>] | Subsequence<Y>
  : []
```
