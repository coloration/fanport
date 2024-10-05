---
title: 枚举 enum
index: Language.Rust.Syntax
---

[[toc]]

## 定义与使用

``` rust
enum IpAddrKind {
    V4, V6 // 成员 variants
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

fn route(ip_kind: IpAddrKind) {}

route(IpAddrKind::V4);
route(IpAddrKind::V6);
```

## 类型枚举


``` rust
enum IpAddr {
    V4(u8, u8, u8, u8), V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));

```

Features:
- 省略了一个额外的构造体声明 `struct IpAddr { type: IpAddrKind }`
- 每个枚举成员可以声明为不同的类型, 数字，字符串，结构体甚至是另一个枚举


``` rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

Note:
- 如果枚举成员的类型各不相同，就很难定义一个可以处理所有成员的函数

## 在枚举上定义方法

``` rust
impl Message {
    fn call(&self) {

    }
}

let msg = Message::Write(String::from("hello"));
msg.call();

```

## 内置枚举 Option

该成员可以不适用前缀 `Option::` 调用, `Option::None` 用来代替其他语言中的 `Null` 值

``` rust
// 标准库定义
enum Option<T> {
    None, 
    Some(T),
}

// use
let some_number = Some(5);
let some_char = Some('e');

let absent_number: Option<i32> = None;
let absent_number = Option<i32>::None;
```

`Some<T>` 在未转换为 `T` 之前是无法做为 `T` 操作的。这样就会避免很多空值误操作带来的问题。

- Option 文档: <https://doc.rust-lang.org/std/option/enum.Option.html>

