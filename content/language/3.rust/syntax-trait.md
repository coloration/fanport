---
title: 注解 Trait
index: Language.Rust.Syntax
---

## 注解 trait

定义抽象功能，有点像其他语言的接口 `interface`

``` rust
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{} by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{} : {}", self.username, self.content)
    }
}
```

``` rust
let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from("of course, as you probably already know, people"),
    reply: false,
    retweet: false,
};

println!("1 new tweet: {}", tweet.summarize());
```

默认实现

``` rust
pub trait Summary {
    fn summarize(&self) -> String {
        format!("Read more ...")
    }
}

impl Summary for NewsArticle {}
```

默认实现允许调用相同 trait 中的其他方法，哪怕这些方法没有默认实现。

``` rust
pub trait Summary {
    fn summarize(&self) -> String {
        format!("Read more from {}...", self.summarize_author())
    }

    fn summarize_author(&self) -> String;
}

impl Summary for Tweet {
    // 实现未定义的方法即可
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```

### trait 作为参数

``` rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

### Trait Bound 语法

默认写法是 Trait Bound 另一种形式，各有优势

``` rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

pub fn notify(item1: &impl Summary, item2: &Summary) {}

pub fn notify<T: Summary>(item1: &T, item2: &T) {}
```

### 指定多个 Trait Bound 

``` rust
pub fn notify(item: &(impl Summary + Display)) {}
pub fn notify<T: Summary + Display>(item: &T) {}
```

### 通过 where 简化 trait bound

``` rust
fn foo<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}

fn foo<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone, U: Clone + Debug 
{
    
}
```

### 返回 Trait

``` rust
fn returns_summarizable() -> impl Summary {
    Tweet { /* */ }
}

// WRANING: compile error
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewArticle {}
    }
    else {
        Tweet {}
    }
}
``` 

### 使用 trait bound 有条件地实现方法

``` rust
use std::fmt::Display;

struct Pair<T> {
    x: T, y: T
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        }
        else {
            println!("The largest member is y = {}", self .y);
        }
    }
}
```

### blanket implementation

> 对任何实现了特定 trait 的类型有条件地实现 trait 

例如，标准库为任何实现了 Display trait 的类型实现了 ToString trait

``` rust
impl<T: Display> ToString for T {
    // --snip--
}
``` 

blanket implementation 会出现在 trait 文档的 “Implementers” 部分。


### trait 关联类型 associated types

``` rust
pub trait Iterator {
    type Item;
    
    fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {

    }
}
```

此时 Item 起到占位作用，直到实现这个 trait next 函数的实现者来决定 Item 的类型.

不使用泛型是因为，这种场景下只能实现一个 Counter。并且不会每次使用时将类型指定为 `u32`

``` rust
pub trait Iterator<T> {
    fn next(&mut self) -> Option<T>;
}
```




### 运算符重载 Operator overloading

是指在特定情况下自定义运算符（比如 +）行为的操作。

Rust 只允许重载 `std::ops` 中提供的运算符

``` rust
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32, y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Pointer) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    )
}
```

### 默认(泛型)类型参数 default type parameters

默认参数类型主要用于如下两个方面：

- 扩展类型而不破坏现有代码。
- 在大部分用户都不需要的特定情况进行自定义。

``` rust
trait Add<Rhs = Self> {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}

// Rhs: Right hand side
```

``` rust
use std::ops::Add

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

这种将现有类型简单封装进另一个结构体的方式被称为 newtype 模式



### 完全限定语法与消歧义：调用相同名称的方法


``` rust
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously.");
    }
}

fn main() {
    let person = Human;
    person.fly(); // "*waving arms furiously."
}
```

默认会调用实现在类型上的方法

``` rust
fn main() {
    let person = Human;
    Pilot::fly(&person);  // "This is your captain speaking."
    Wizard::fly(&person); // "Up!"
    person.fly();         // "*waving arms furiously."
    Human::fly(&person);  // "*waving arms furiously."
}
```

完全限定语法 fully qualified syntax

``` rust
trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("Puppy")
    }
}

fn main() {
    Dog::baby_name(); // "Spot"
    <Dog as Animal>::baby_name(); // "Puppy"
}
```


### 父 trait 用于在另一个 trait 中使用某 trait 的功能

``` rust
// **********
// *        *
// * (1, 3) *
// *        *
// **********
use std::fmt;

trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}

struct Point {
    x: i32, y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

impl OutlinePrint for Point {}
```

### newtype 模式用以在外部类型上实现外部 trait

e.g. 为Vec实现Display。

```rust
use std::fmt;

struct Wrapper(Vec<String>);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}
```


如果想要在 Wrapper 上使用 Vec 的方法，则要在 Wrapper 上实现 Vec的每一个方法。
或者可以使用 `Deref trait` 
