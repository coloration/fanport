---
title: 结构体 struct
index: Language.Rust.Syntax
---

[[toc]]

## 定义与使用

``` rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

let user_foo = User {
    email: String::from("foo@bar.com"),
    username: String::from("foo"),
    active: true,
    sign_in_count: 1,
};

let mut user_baz = User {
    // ...
};

user_baz.active = false;

fn build_user(email: String, username: String) -> User {
    User {
        email, // 等同于 email: email
        username, // 等同于 username: username
        active: true,
        sign_in_count: 1,
    }
}

// 更新语法

let user_bao = User {
    email: String::from("bao@bar.com"),
    username: String::from("bao"),
    ..user_baz  // 必须放在最后，不会覆盖上面的字段, 没有尾逗号

    // 需要注意的是，这种赋值语法会发生移动，
    // 如果此处我们没有为 user_bao 的 email 字段赋新的值，那将会使用user_baz的值。
    // 从而发生了变量移动，当你再次访问user_baz.email就无法通过编译。
    // 但仍然可以访问 user_baz.username, 因为没有发生移动

    // active 与 sign_in_count 是标量字段(或者说是储存在栈上，或者说实现了 Copy trait), 
    // 赋值也不会发生移动

}


```

## 元组结构体 tuple struct

``` rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);

let r = black.0;
let z = origin.2;

// !!! 暂时不知道如何解构元组结构体
```
Note: 

- black 和 origin 的类型并不相等
- 可以使用 .索引来单独访问变量


## 类单元结构体 unit-like struct

``` rust
struct AlwaysEqual;

let subject = AlwaysEqual;
```


## 结构体的生命周期

当结构体拥有它所有的数据（而不是持有其他引用，比如`&str`）时，只要整个结构体是有效的话其数据也是有效的。

当结构体持有其他引用时，需要为这个引用设定**生命周期 lifetimes**，否则无法通过编译。

## 打印结构体 

``` rust
#[derive(Debug)] // 外部属性
struct Rectangle {
    width: u32,
    height: u32,
}

let rect = Rectangle {
    width: 30, height: 50,
};
// 告诉println! 使用叫做 Debug 的输出格式{:?}
println!("rect is {:?}", rect);
dbg!(&rect);
```

## 在结构体上定义方法

一个结构体可以有很多个 `impl`

``` rust
#[derive(Debug)]
struct Rectangle {
    width: u32, height: u32,
}

impl Rectangle {
    // &self = self: &Self Self是impl 块的类型的别名，即 Rectangle 的别名

    // &mut self 允许修改调用方法的实例
    fn area(&self) -> u32 { 
        self.width * self.height
    }

    // 定义同名方法
    fn width(&self) -> bool {
        self.width > 0
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

## 关联函数 associated functions

关联函数不以`&self`为第一个参数，所以不是实例方法。一般作为构造函数使用

``` rust
impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

println!("square area is {}", Rectangle::square(20).area());
```


## 解构结构体

``` rust
struct Point {
    x: i32, y:i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };
    let Point { x: a, y: b } = p;

    assert_eq!(0, a);
    assert_eq!(7, b);

    let Point { x, y } = p;

    assert_eq!(0, x);
    assert_eq!(7, y);
}
```