---
title: 代码组织与模块
index: Language.Rust.Syntax
---

[[toc]]

模块系统
- 包 Packages: Cargo 的一个功能，它允许你构建、测试和分享 crate。
- Crates: 一个模块的树形结构，它形成了库或二进制项目。
- 模块 Modules 和 use: 允许你控制作用域和路径的私有性。
- 路径 path: 一个命名例如结构体、函数或模块等项的方式

## Crate

> Rust 编译时最小代码单位 

Crate 的形式
- 二进制项：可以编译为可执行文件，但必须有 main 函数
- 库：不能执行，可以被其他文件引用

## Package

> 提供一系列功能的一个或者多个 crate

**限制**
- 一个包会包含一个 Cargo.toml 文件
- 可以包含至多一个库 crate(library crate)
- 可以包含任意多个二进制 crate(binary crate) 
- 至少包含一个 crate（无论是库的还是二进制的）

**约定**
- src/main.rs 就是一个与包同名的二进制 crate 的 crate 根
- src/lib.rs，则包带有与其同名的库 crate，且 src/lib.rs 是 crate 根


## Module

原则 
    - `create::`: `/`
    - `super::`: `../`
    - `::`: `/`
    - `use`: `import`
    - `pub`: `export` 


- 声明模块， 声明 `mod garden` 后的查找顺序
    1. 内联，在 `mod garden` 的大括号中
    2. `src/garden.rs`
    3. `src/garden/mod.rs`

- 声明子模块， `garden` 中声明了 `mod vegetables` 后查找顺序
    1. 内联，在 `mod vegetables` 的大括号中
    2. `src/garden/vegetables.rs`
    3. `src/garden/vegetables/mod.rs`

- 声明公用模块使用 `pub garden` 代替 `mod garden`
    - 使公用模块内部成员公用，声明前使用 `pub`

- 模块中的代码路径
    - `crate::garden::vegetables::Asparagus`

- 声明快捷方式 `use`
    - `use crate::garden::vegetables::Asparagus;` 后该作用域可直接使用 Asparagus 类型

- 重导出模块(re-export) 
    - `pub use self::foo::bar::PrimaryColor`
    - `use art::PrimaryColor`

**Demo**

``` bash
# dir struction
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs
```

``` rust
// src/main.rs
use crate::graden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {:?}!", plant);
}
```

``` rust
// src/garden.rs
pub mod vegetables;
```

``` rust
// src/garden/vegetables.rs
#[derive(Debug)]
pub struct Asparagus {}
```

### 在模块中为代码分组

``` bash
$ cargo new --lib restaurant
```

``` rust
// src/lib.rs
mod front_of_hose {
    mod hosting {
        fn add_to_waitlist() {}        

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

``` bash
# crate 的模块树 module tree
# src/main.rs src/lib.rs 称为 crate 跟
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment 
```

### 引用模块

模块外引用

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();
    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}

```

模块内的相对路径引用

``` rust
fn serve_order() {}

mod back_of_house {
    fn fix_incorrect_order {
        cook_order();
        // super 代表父模块，而非当前模块 super::super::...  ../../
        super::serve_order(); 
    }

    fn cook_order() {}
}
```

### 声明公有结构体和枚举

``` rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String, // 外部可读写
        seasonal_fruit: String, // 外部不可读写
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}
``` 

因为 `back_of_house::Breakfast` 具有私有字段，所以这个结构体需要提供一个公共的关联函数来构造 Breakfast 的实例(这里我们命名为 summer)。否则无法在外部创建 Breakfast 实例

### 使用 use 关键字将路径引入作用域

``` rust
mod foo {
    pub mod bar {
        pub fn baz() {}
    }
}

// 推荐使用, 语义上更明确是谁定义的方法
use self::foo::bar;

pub fn call() {
    bar::baz();
}

// 有效语法
use self::foo::bar::baz;

pub fn call() {
    baz();
}

// 而使用 use 引入结构体、枚举和其他项时，习惯是指定它们的完整路径
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}

```

当引入两个同名项时，需要父模块调用，否则无法通过编译

``` rust

use std::fmt;
use std::io;

fn function1() -> fmt::Result {}
fn function2() -> io::Result {}

// Compile Error
use std::fmt::Result;
use std::io::Result;

// 定义别名
use std::fmt:Result;
use std::io::Result as IoResult;

```

使用 pub use 重导出名称

``` rust
mod foo {
    pub mod bar {
        pub fn baz() {}
    }
}

use self::foo::bar;
pub use crate::foo::bar; // 使外部也可以使用 bar::baz();

pub fn call() {
    bar::baz();
}
```

引入多个公有项

``` rust
use std::{cmp::Ordering, io};
// 等同于
use std::cmp::Ordering;
use std::io;

use std::io::{self, Write};
// 等同于
use std::io;
use std::io::Write;
```

引入所有公有项

``` rust
use std::collections::*;
```


### 将模块拆分为多个文件

``` rust
// src/foo.rs
pub mod bar {
    pub fn baz() {}
}

// src/lib.rs 根crate 也可以是 main.rs
mod foo; // 找到 src/foo.rs

pub use crate::foo::bar;

pub fn call() {
    bar::baz();
    bar::baz();
}
```