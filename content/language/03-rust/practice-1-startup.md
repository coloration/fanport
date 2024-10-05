---
title: Rust Startup
index: Language.Rust.Practice
---

## 安装 Rust

### 安装 rustup

1. 官网下载 RUSTUP-INIT.exe <https://www.rust-lang.org/zh-CN/tools/install>

2. 安装其他

- Windows 需要C++前置：<https://rust-lang.github.io/rustup/installation/windows-msvc.html>

3. 执行 rustup 设置rust版本

``` bash
$ rustup default stable
```

4. 验证

``` bash
$ rustc --version
# rustc 1.71.0 (8ede3aae2 2023-07-12)
```


### 环境

- 在 WebAssembly 中使用参考 `Rust WebAssembly`
- 树莓派交叉编译 `Rust cross compile`