---
title: 所有权 ownership
index: Language.Rust.Syntax
---

[[toc]]

管理内存的几种方式

- GC 运行时扫描内存
- 手动
- 所有权 在作用域结束时，自动调用 drop函数
    - 编译时通过规则检查，违反规则则不能通过
    - 主要目的是管理内存堆 Heap 上的数据

## 所有权规则

1. 每一个值都有一个所有者(owner)
2. 值在任意时刻有且只有一个所有者
3. 当所有者(变量)离开作用域，这个值将被丢弃

## 作用域

与其他语言类似

``` rust
{   // foo 无效
    let foo = "bar"; // foo 有效
}

// foo 无效
```

## 所有权移动

``` rust
let x = 5;
let y = x;
println!("x = {}, y = {}", x, y); 
// "x = 5, y = 5"
// 栈上的数据不会被移动

let s1 = String::from("foo");
let s2 = s1;
println!("s1 = {}, s2 = {}", s1, s2);
// ERROR! 
// 堆上的数据被**移动**后，当即失效(s1), s2会被保留到作用域结束

let s1 = String::from("foo");
let s2 = s1.clone();
println!("s1 = {}, s2 = {}", s1, s2);
// "s1 = foo, s2 = foo"
```

## 引用

- 在任意给定时间，要么 只能有一个可变引用，要么 只能有多个不可变引用。
- 引用必须总是有效的。

``` rust
fn foo() {
    let s = String::from("bar"); // s进入作用域
    takes_ownership(s);          // s被移动后失效

    let x = 5;                   // x进入作用域
    make_copy(x);                // x存在栈中不会失效
    
    // 可以通过函数的返回值传递变量
    let s2 = takes_ownership(s1);

    // 可以通过引用reference 将变量借出但不转移所有权
    fn cal_len(s: &String) -> usize {
        s.len()
    }

    let len = cal_len(&s2);
    // s2 在作用域结束前仍然有效
}

```

### 可变引用 

``` rust
let mut s = String::from("bar");

change(&mut s);

fn change(str: &mut String) {
    str.push_str(", world");
}

let s1 = &mut s;
let s2 = &mut s; // Compile Error 只能创建一个可变引用

let s1 = &s;
let s2 = &s;
let s3 = &mut s; // Compile Error 不可同时持有不可变和可变引用
```

限制可变引用的数量可以在编译阶段避免**数据竞争**:

- 两个或更多指针同时访问同一数据
- 至少有一个指针被用来写入数据
- 没有同步数据访问的机制

数据竞争会导致未定义行为，难以在运行时追踪，并且难以诊断和修复;

移动变量或显式创建作用域来使用更多的可变引用(移动变量也是改变作用域的方式)

``` rust

let mut s = String::from("bar");

{
    let s1 = &mut s;
}

let s2 = &mut s;

// ---
let s1 = &s;
let s2 = &s;
println!("s1: {}, s2: {}", s1, s2);

let s3 = &mut s3;
```

Note: 编译器在作用域结束之前判断不再使用的引用的能力被称为 非词法作用域生命周期（Non-Lexical Lifetimes，简称 NLL）

### 悬垂引用 Dangling Renderences

悬垂指针 Dangling Pointer:

指针在其指向的内存被释放后仍然存在

rust 没有指针的概念，也会在编译时阻止悬垂引用的产生

## Slice

### 字符串 slice

`&str`

``` ts
let s = String::from("hello world");
let hello = &s[..5]; // "hello" 等同于 &s[0..5]
let world = &s[6..]; // "world" 等同于 &s[6..11]

let hello_world: &str = &s[..] // "hello_world" 等同于 &s[0..s.len()]
```

