---
title: 错误处理 error
index: Language.Rust.Syntax
---

[[toc]]

错误类型

- 可恢复的 recoverable
    - 文件未找到
- 不可恢复的 unrecoverable
    - bug 访问超过数组末端的位置

## panic! 处理不可恢复错误

在 `/Cargo.toml` 中指定 `painc` 宏的行为模式

``` yaml
[profile.release]
panic = 'abort' # 终止 'abort': 不清理数据就退出程序，让操作系统自行清理
                # 默认为 展开 'unwinding' 模式，回溯栈并清理它遇到的每一个函数的数据
```

``` rust
fn main() {
    panic!("crash and burn");
}

```

根据 `cargo run` 提供的 `RUST_BACKTRACE` 查看调用栈

``` bash
$ RUST_BACKTRACE=1 cargo run
```

## 用 Result 处理可恢复的错误

``` rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };
}
```

## panic 的简写

``` rust
use std:fs::File;

fn main() {
    let f = File::open("hello.txt").unwrap();
    // 如果是 Result::Ok 返回 Ok中的值
    // 如果是 Result::Err 则调用 panic 

    let f = File::open("hello.txt").expect("Failed to open hello.txt");
    // 调用 panic 时附带信息


}
```

## 传播错误 propagating

``` rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let f = File::open("hello.txt");

    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e),
    }

    let mut s = String::new();

    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}
```

## ? 简写

``` rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io:Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}
```


``` rust
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
```


