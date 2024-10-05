---
title: 数据类型 data type
index: Language.Rust.Syntax
---

[[toc]]

## 标量 scalar

- 整型
- 浮点型
- 布尔类型
- 字符类型




### 布尔类型

bool

``` rust
let loading = true;
let initialize: bool = false;
```

### 字符类型

char 四个字节，可以表示

``` rust
let foo = 'z';
let bar: char = 'ℤ';
let baz = '😻';
```

## 复合 compound

- 原生复合类型
    - 元组 tuple
    - 数组 array

### 元组 tuple

``` rust
let bar: (i32. f64, u8) = (500, 6.4, 1);
let baz = (500, 6.4, 1);
// 解构 
let (x, y, z) = baz;

baz.0; // 500
baz.1; // 6.4
baz.2; // 1

// 单元 unit 特殊的元组
let foo: () = ();
```

### 数组

``` rust
let weekends = ["Sat.", "Sun."];
let foo: [i32; 5] = [1, 2, 3, 4, 5];
let bar = [3; 5]; // [3, 3, 3, 3, 3];

weekends[0]; // "Sat."
weekends[1]; // "Sun."

```