---
title: 测试
index: Language.Rust.Syntax
---

[[toc]]

## 测试函数

通常执行如下三种操作

1. 设置任何所需的数据或状态
2. 运行需要测试的代码
3. 断言其结果是我们所期望的

## 声明与使用 

新建库项目会自动创建测试函数模板`cargo new <project> --lib`

``` rust
// 只在cargo run 编译运行测试代码 
// cfg: configuration
// test: 用于编译和运行测试的配置选项
#[cfg(test)] 
mod tests {
    use super::*; // 使用 glob 全局导入，以便在 tests 模块中使用所有在外部模块定义的内容。

    #[test] // 注解表明这是一个测试函数
    fn it_works() {
        let result = add(2, 2);
        asset_eq!(result, 4); // 断言宏
    }

    #[test]
    fn another() {
        // 抛出错误
        panic!("Make this test fail");
    }
}
```

- test 模块中也可以包含非测试函数
- 所有的基本类型和大部分标准库类型都实现了 `ParialEq` 和 `Debug` trait.
- 自定义结构体需要添加 `#[derive(PartialEq, Debug)]`

``` rust
assert!(2 == 2);  // pass
assert!(2 == 5); // panic!

// 附带 format!信息
sssert!(
    result.contains("Carol"),
    "Greeting did not contain name, value was `{}`",
    result,
);

assert_eq!(2, 2); // pass
assert_eq!(2, 5); // panic!

assert_ne!('2', '5'); // pass
assert_ne!('2', '2'); // panic!
```

## 使用 should_panic 注解检查 panic

``` rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must greater than or equal to 1, got {}", value);
        }
        else if value > 100 {
            panic!("Guess value must less than or equal to 100, got {}.", value);
        }

        Guess { value }
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic] // 在 test 注解之后
    fn less_than_1() {
        Guess::new(0);
    }

    #[test]
    #[should_panic(expected = "Guess value must be less than or equal to 100, got 200.")]
    fn greater_than_100() {
        let guess = Guess::new(200);
    }
}
```

## 将 Result 用于测试

不能使用 `should_panic` 注解

``` rust
#[cfg(test)] 
mod tests {
    use super::*;

    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(());
        }
        else {
            Err(String::from("two plus two does not equal four."));
        }
    }
}
```

## 并行或连续的运行测试 

查看 [cargo](./cargo) 



## 测试的组织结构

- 单元测试(unit tests): 隔离的环境中一次测试一个模块，或者是测试私有接口
- 集成测试(inegration tests): 在代码外部只测试公有接口而且每个测试都有可能会测试多个模块。



### 单元测试 

规范是在每个文件中创建包含测试函数的 tests 模块，并使用 cfg(test) 标注模块。

``` rust
pub fn add_two(a: i32) -> i32 {
    internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        // rust 支持测试私有函数
        assert_eq!(4, internal_adder(2, 2));
    }
}
```

### 集成测试

tests 目录会被编译成单独的 crate. 因此可以进行模块化组织

``` rust
// /tests/integration_test.rs
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

定义通用模块 

``` rust
// /tests/common/mod.rs

/// /tests/common.rs 会出现在测试结果中，如果指向用作通用模块则声明目录下的 mod.rs

pub fn setup() {

}

// /test/integration_test.rs
use adder;
use common;

#[test]
fn it_adds_two() {
    common::setup();
    assert_eq!(4, adder::add_two(2));
}
```