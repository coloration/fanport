---
title: scalar number
index: Language.Rust.Syntax
---

## 标量 scalar 分类

- 整型
- 浮点型
- 布尔类型
- 字符类型


## 整型

i8, i16, i32, i64, i128, isise 以及对应的无符号整型 u8 ..

字面量表示

```rust
let decimal: u32 = 89_222; // 自定义下划线位置方便读数
let hex: u8 = 0xff;
let octal: u8 = 0o77;
let binary = 0b1111_0000_u8;
let byte = u8 = b'A'; // 仅限 u8

```

### 整型运算 


``` rust
let a:i32 = 5;
let b:i32 = 2;

a / b // => 2

```


Note: 整型溢出时与 % 运算结果相同(即 256 => 0), 如果需要这种功能最好使用标准库 Wrapping 显式调用

## 浮点型

f32, f64 现代浏览器中速度几乎一样，默认为f64

``` rust
let x = 2.0;
let y: f32: 3.0;
let z = 3.0_f64;
```


## 数值比较 

不同类型进行比较，需要转化为相同类型。


### 小转大 可以直接用 as


``` rust

let a: i32 = 100;
let b: u16 = 10;

if a > (b as i32) { /* todo */ }

```

### 大转小 

``` rust

use std::convert::TryInto; // trait

let a: u8 = 100;
let b: u16 = 10;

let _b = b.try_into().unwrap(); // Result<>

if a > _b { /* todo */ }
```


### 整型与浮点型转换

``` rust

// 浮点数转整数


2.5_f32.floor(); // 2
2.5_f32.ceil(); // 3
2.5_f32.round() // 3

2.7_f64 as i32; //  2


(2_i32 as f32) / 1.0 // 1.3333334
```



### 浮点类型比较

``` rust
let a: f32 = 0.1 + 0.2;
let b: f32 = 0.3;

if (a - b).abs() <= f32:EPSILON { /* todo */ }
```


### NAN

``` rust
let x = (-42.0_f32).sqrt();

if x.is_nan() { /* todo */ }
```

### Infinity 


``` rust
if (1.0 / 0.0).is_finite() { /* todo */ }
```