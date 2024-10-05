---
title: Cargo (Rust 包管理)
index: Language.Rust.Practice
---

cargo 作为 rust 的内置安装包随 rust 一起安装。就像 npm 之于 node.


## cli 

```bash
$ rustc --version
$ cargo --version 

# 创建项目
$ cargo new <project_name>

# 创建库
$ cargo new --lib <library_name>

# 构建项目
<project_name>$ cargo build 
<project_name>$ .\target\debug\hello-cargo.exe

<project_name>$ cargo build --release

# 一步构建并运行项目
<project_name>$ cargo run

# 在不生成二进制文件的情况下构建项目来检查错误
<project_name>$ cargo check

# 更新依赖
<project_name>$ cargo update

# 构建所有安装包crate的文档 以查看trait
<project_name>$ cargo doc --open


## 查看 cargo 的命令
## 自定义 cargo 命令在环境变量中定义 cargo-something
## 即可 cargo something 调用。同时也可使用下方命令查到
<project_name>$ cargo --list
```

## 依赖管理 


``` bash
$ cargo add image

$ cargo remove image
```

## 测试

``` bash
# 默认配置运行测试
$ cargo test 

# 控制线程数1 不要使用任何并行机制
$ cargo test -- --test-threads=1 

# 显示成功通过测试的 println!，默认只在失败时显示函数内部的println!内容
$ cargo test -- --show-output

# 通过指定名称运行单个测试
$ cargo test foo

# 通过指定部分名称运行多个测试
$ cargo test ba # 运行 bar baz

## 忽略某些测试
## 1.为测试方法添加ignore注解
## [#ignore]
## 2.1 运行
$ cargo test
## 2.2 cmd 只运行 ignore 的测试用例，
$ cargo test -- --ignored


## 指定集成测试文件
## 文件名 tests/integration_test.rs
$ cargo test --test integration_test 


```

### 发布

``` bash
$ cargo login <api_token> # token 需要登录 crates.io 获取
$ cargo publish
```

### 撤回 

撤回版本并不能删除代码(不可删除)。只能阻止新项目使用。如果已经使用的项目也能继续使用

``` bash
# 撤回版本
$ cargo yank --vers 1.0.1
# 取消撤回
$ cargo yank --vers 1.0.1 --undo
```

## cargo.toml

``` yaml
[package]
name = "foo" # 发布到 crate的名称，用 cargo new 创建的默认名称
license = "MIT" # 发布必备
version = "0.0.1" # 发布必备，每次更新需要修改

# 编译优化级别 0-3, 级别越高编译时间越长
[profile.dev] 
opt-level = 1 # default 0

[profile.release]
opt-level = 2 # default 3
```

## 工作空间

``` bash
/add/               # mkdir add
├── Cargo.lock
├── Cargo.toml      # touch Cargo.toml
├── add_one         # cargo new add_one
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── adder           # cargo new adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

``` yaml
# /add/Cargo.toml
[workspace]

members = [
    "adder",    # 手动添加
    "add_one",  # 手动添加
]
```

- 在 `/add/` 根目录下安装的 `crate` 所有子包都可以使用
- 在 `/add/` 根目录下执行的 `cargo` 命令都会对子包生效。e.g. `cargo test`, 
- 单独运行某个包 `cargo run -p adder`


### 依赖兄弟 crate

并不假定工作空间中的 crates 会相互依赖。需要手动声明

``` yaml
# /add/adder/Cargo.toml
[dependencies]
add_one = { path = "../add_one" }
```