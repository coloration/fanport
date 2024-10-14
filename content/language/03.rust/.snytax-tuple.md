---
title: tuple

---

### 声明

``` rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
```


### 解构

``` rust
let tup: (i32, f64, u8) = (500, 6.4, 1);

let (x, y, z) = tup;
```

### 访问 


``` ts
let tup: (i32, f64, u8) = (500, 6.4, 1);
let x = tup.1;
let y = tup.2;
let z = tup.3;
```


### 修改