---
title: Syntax
index: Language.Rust.Syntax
---

[[toc]]

## 变量

``` rust
let apples = 5;      // 不可变
let mut bananas = 5; // 可变
let (x, y, z) = (1, 2, 3); // (x, y, z) 是模式
let (x, _, _) = (1, 2, 3);
let (x, ..) = (1, 2, 3);

// 变量遮蔽
let x = 5;
let x = x + 1; // 声明一个同名变量 而不是赋值旧变量
{
    let x = x * 2;
    println!("The value of x in the inner scope is: {x}"); // 12
}
println!("The value of x is: {x}"); // 6

const FOO_BAZ: u32 = 12; // 常量必须注明类型

```

### 类型别名 

``` rust
type Kilometers = i32;
let x: i32 = 5;
let y: Kilometers = 5;
x + y;
```

### `!` Never Type

``` rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    // continue 的类型是 !
    Err(_) => continue, 
};

match self {
    Some(val) => val,
    // panic 的表达式的值也是 !
    None => panic!("called `Option::unwrap()` on a `None` value"),
}

// loop 中没有 break 时的表达式的值也是 !
// 因为运行到 break 程序会终止
loop {
    
}
```

### 动态大小类型 DST

DST(dynamically sized types), unsized types

``` rust
// rust 不允许直接声明动态大小类型
let s1: str = "Hello there!";

// 必须将其置于指针中，让指针始终拥有动态大小类型的位置和长度两个信息
let s1: &str = "Hello here!";

Box<str>
Rc<str>

// 另一个动态大小类型是 trait

&dyn Trait
Box<dyn Trait>
Rc<dyn Trait>
```

## 注释

``` rust
// abc
/* def */
 
```

### 文档注释 documentation comments

他们会生成 HTML 文档。这些 HTML 展示公有 API 文档注释的内容, 使用 [cargo](./cargo) 命令查看生成的文档

- `# Example` 创建名为 `Example` 的标题
- Panics: 这个函数可能会 panic! 的场景。并不希望程序崩溃的函数调用者应该确保他们不会在这些情况下调用此函数。
- Errors：如果这个函数返回 Result，此部分描述可能会出现何种错误以及什么情况会造成这些错误，这有助于调用者编写代码来采用不同的方式处理不同的错误。
- Safety：如果这个函数使用 unsafe 代码（这会在第十九章讨论），这一部分应该会涉及到期望函数调用者支持的确保 unsafe 块中代码正常工作的不变条件（invariants）。

``` rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```

以 `//!` 开头的注释后面不会接代码，编译后会出现在文档的顶部。所以一般用在项目说明，即 `/src/lib.rs` 的头部。

``` rust
//! # My Crate
//!
//! `my_crate` is a collection of utilities to make performing certain
//! calculations more convenient.
```


## 控制流

### 条件控制

``` rust
if number < 5 {

}
else if number == 5 {

}
else {

}

let foo = if true { 5 } else { 6 }; // 需要分号
```

### 循环

``` rust
loop {
    continue;

    break;
}

while foo != 0 {
    foo -= 1;
}

for baz in [10, 20, 30] {

}

for (i, &item) in bytes.iter().enumerate() {

}

```

## 范围表达式

只有数字和 `char` 可以使用范围表达式。 因为编译器在编译时检查范围不为空。`char`和数字是仅有的可以判断范围是否为空的类型

``` rust
// start..=end
1..=100 // 包含100
1..4 // 不包含4

use rand::Rng;

rand::thread_rng().gen_range(1..=100); // 生成1-100的随机数

for bar in (1..4).rev() { println!(bar); } // 3, 2, 1
```

## `..` 忽略剩余值

``` rust
let Point { .., z } = point; 

let numbers = (2, 4, 6, 8, 10);
match numbers {
    (first, .., last) => {
        println!("Some numbers: {}, {}", first, last);
    },
}

match number {
    (_, second, .., last) { /* skip */ }
}
```

## println

``` rust
println();  // 函数调用
println!(); // 宏调用

let apples = 5;
println!("Your apples {apples}"); // "Your apples 5"

let x = 5; 
let y = 10;
println!("x = {} and y = {}", x, y); // "x = 5 and y = 10"
```

## 使用标准库

``` rust
use std::io;
use rand::Rng; // cargo install
use std::cmp::Ordering; 
```


## match 控制流结构

`match <condition> {}` 

与 `if` 不同 `match` 的条件可以是任意类型，不限于 `bool`

``` rust
enum Coin {
    Penny, Nickel, Dime, Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

### 绑定值模式

``` rust
#[derive(Debug)]
enum UsState {
    Alabama, Alaska,
}

enum Coin {
    Penny, Nickel, Dime, Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        },
    }
}

value_in_cents(Coin::Quarter(UsState::Alaska));
value_in_cents(Coin::Penny);
```

### 匹配 Option

``` rust
fn plus_one(x: Option<i32>)  -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
``` 

### 匹配是穷尽的

必须覆盖所有枚举情况

``` rust
match x {
    // None => None,        // Compile Error
    Some(i) => Some(i + 1),
}


```

### 通配模式和 `_` 占位符

通配模式: 对一些值做特殊处理，而其他值采取默认操作
占位符: 如果不想使用其他值，可以使用 `_` 通过编译

``` rust
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other), // 通配模式必须放在最后

    // or
    _ => (), // 返回空元组，不执行任何操作
}

fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}
```

### 匹配命名变量

``` rust
let x = Some(5);
let y = 10;

match x {
    Some(50) => println!("Got 50"),
    // 声明了新变量，遮蔽了外部变量
    Some(y) => println!("Matched, y = {:?}", y),
    _ => println!("Default case, x = {:?}", x)

    // Matched, y = 5
}

println!("at the end: x = {:?}, y = {:?}", x, y);
// at the end: x = Some(5), y = 10
```

### 匹配多个模式 

``` rust
let x = 1;
match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
``` 

### 匹配范围值

``` rust
let x = 5;
match x {
    1..=5 => println!("one through five"),
    _ => println!("something else"),
}
```

## 匹配模式的额外条件

``` rust
let num = Some(4);

match num {
    Some(x) if x < 5 => println!("less than five: {}.", x),
    Some(x) => println!("{}", x),
    None => (),
}

let x = 4;
let y = false;

match x {
    // (4 | 5 | 6) AND Y == true
    4 | 5 | 6 if y => println!("yes"), 
    _ => println!("no"),
    // "no"
}
```

### @ 绑定

at 运算符（@）允许我们在创建一个存放值的变量的同时测试其值是否匹配模式。

``` rust
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    // 判断 + 声明变量
    Message::Hello {
        id: id_variable @ 3..=7,
    } => println!("Found an id in range: {}", id_variable),
    // 只能判断，不能声明变量
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    }
    Message::Hello { id } => println!("Found some other id: {}", id),
}
```


### 匹配结构体

``` rust
let p = Point { x: 0, y: 7 };

match p {
    Point { x, y: 0 } => println!("x axis at {}", x),
    Point { x: 0, y } => println!("y axis at {}", y), // matched
    Point { x, y } => println!("On neither axis: ({}, {})", x, y),
}
```

### 匹配枚举

``` rust
enum Message {
    Quit, 
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

let msg = Message::ChangeColor(0, 160, 255);

match msg {
    Message::Quit => { /* skip */ },
    Message::Move { x, y } => { /* skip */ },
    Message::Write(text) => { /* skip */ },
    Message::ChangeColor(r, g, b) => { /* skip */ },
}
```

### `if let` 简化 `match` 控制流结构

使用 `if let` 会丧失 `match` 的穷尽性, 所以需要做好取舍

``` rust
// demo1
let config_max = Some(3u8);
match config_max {
    Some(max) => println!("The maximum is configured to be {}", max),
    _ => (),
}

// 等同于
let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}
// 没有else
```


``` rust

let mut count = 0;
match coin {
    Coin::Quarter(state) => println!("State quarter from {:?}!", state),
    _ => count + 1;
}

// 等同于
let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {:?}!", state);
}
else {
    count += 1;
}

```

## `if let` 条件表达式

``` rust
fn main() {
    let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();

    if let Some(color) = favorite_color {
        println!("Using your favorite color, {}, as the background", color);
    } else if is_tuesday {
        println!("Tuesday is green day!");
    } else if let Ok(age) = age {
        // age 为新声明的变量
        if age > 30 {
            println!("Using purple as the background color");
        } else {
            println!("Using orange as the background color");
        }
    } else {
        println!("Using blue as the background color");
    }
}
```

## `while let` 条件循环

``` rust
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
    println!("{}", top);
}
```

## `for` 循环

``` rust
let v = vec!['a', 'b', 'c'];

//  (index, value) 是模式
for (index, value) in v.iter().enumerate() {
    println!("{} is at index {}", value, index);
}
```

## 模式的两种形式

- 不可反驳的 irrefutable: 
    - `let x = 5;` x可以匹配右侧任何值所以不会失败
    - 函数参数，`let`，`for` 只接受不可反驳模式
- 可反驳的 refutable: 
    - `if let Some(x) = a_value` 如果 a_value 的值为 `None`, 那么模式`Some(x)` 不能进行匹配
    - `if let`, `while let` 只接受可反驳模式