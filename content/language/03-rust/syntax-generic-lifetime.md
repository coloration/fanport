---
title: 泛型 Generic, 生命周期 Lifetime
index: Langugage.Rust.Syntax
---

[[toc]]

## 泛型

### 函数泛型

``` rust
let number_list = vec![30, 50, 25];
let char_list = vec!['y', 'm', 'c', 'a'];

max(number_list);
max(char_list);

min(number_list);
min(char_list);

fn max<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut max = list[0];
    for &item in list { // &
        if item > max {
            max = item;
        }
    }
    max
}

fn min<T: PartialOrd>(list: &[T]) -> &T {
    // min 变量保存索引值就无须实现 Copy Trait
    let mut min = &list[0]; // &
    for item in list {
        if item < min {
            min = &item // &
        }
    }

    return min
}
```

### 结构体泛型

``` rust
struct Point<T> {
    x: T, y: T,
}
```

### 枚举泛型

``` rust
enum Option<T> {
    Some(T), None,
}
```

### 方法中定义泛型

``` rust

struct Point<T> {
    x: T, y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
```

### 泛型的默认 Trait `Sized`

泛型函数默认只能用于在编译时已知大小的类型

``` rust
fn generic<T>(t: T) {
    // --skip--
}
// 相当于
fn generic<T: Sized>(t: T) {

}

// 放开泛型对动态大小类型的限制
fn generic<T: ?Sized>(t: &T) {
    // --snip--
}
```

## 生命周期 lifetime

### 生命周期注解语法 

生命周期注解并不会改变生命周期，只是为了rust可以完成推断

``` rust
&i32
&'a i32
&'a mut i32
```

### 函数声明中的生命周期注解

``` rust
/// WRANING: Compile Error
/// 代码并不能推测出 &str 持有谁的引用，也就无法推测出对应的生命周期
fn longest(x: &str, y: &str) -> &str {}

/// OK
/// 习惯性以 'a 'b 命名
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {}
```

它的实际含义是 longest 函数返回的引用的生命周期与传入该函数的引用的生命周期的较小者一致。

生命周期注解只存在签名中，不会存在于代码中

`'a` 可以成为 x,y 的泛型生命周期。它代表的含义是 x,y生命周期较短的那一个

### 结构体定义中的生命周期注解

``` rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
``` 
`ImportantExcerpt` 的实例不能比其 `part` 字段中的引用存在的更久

### 生命周期省略规则 lifetime elision rules

- 输入生命周期 input lifetimes 函数或方法的参数的生命周期
- 输出生命周期 output lifetimes 返回值的生命周期

``` rust
fn first_word<'a>(s: &'a str) -> &'a str {}
fn first_word(s: &str) -> &str {}
```

可以省略的三中情况
- 每一个是引用的参数都有自己的生命周期时(输入生命周期)
    - `fn foo<'a>(x: &'a i32)`
    - `fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`
- 只有一个输入生命周期参数，它会被赋予所有输出生命周期
- 如果有 `&self`, `&mut self` 所有输出生命周期都会被赋予 `self` 的生命周期

### 静态生命周期

`'static` 所有字符串都拥有，会存在于整个程序运行期间 

``` rust
let s: &'static str = "I have a static lifetime.";
```

只是补完Rust的逻辑，不应该在程序里使用

### 结合泛型类型参数、trait bounds 和生命周期

```rust
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where T: Display {
    println!("Announcement! {}", ann);
    if x.len() > y.len() { x } else { y }
}
```

