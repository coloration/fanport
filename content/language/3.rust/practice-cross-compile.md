---
title: Rust cross compile
index: Language.Rust.Practice
---

1. 查看树莓派的内核版本
  - 1.1 登录树莓派
  - 1.2 `uname -m` -> `armv7l` or `aarch64`

2. 确认内核对应的 target
  - `armv7l`: `<target>: armv7-unknown-linux-musleabihf`
  - `aarch64`: `<target>: aarch64-unknown-linux-musl`

3. 为本机安装 rs-cross
  - `cargo install cross --git https://github.com/cross-rs/cross`

4. 交叉编译代替 `cargo build`
  - `cross build --target <target>`
  - **注意**: `cross` 执行时需要开启 `docker` or `podman` 

5. 移动二进制文件到树莓派
  - `scp ./target/<target>/debug/<bin> pi@<ip>:/home/pi`

6. 登录树莓派执行文件
  - `pi$ sudo /home/pi/<bin>`
