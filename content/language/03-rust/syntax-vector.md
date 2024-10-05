---
title: Vector
index: Language.Rust.Syntax
---

[[toc]]

## Vector

### CREATE

``` rust
let v: Vec<i32> = Vec::new();

// 宏创建
let v = vec![1, 2, 3];
```

### READ

``` rust
// 索引读取 返回的是引用. 适用于严重错误 使程序崩溃 panic
let third: &i32 = &v[2];

// get方法 返回 Option. 适用于越界属于正常情况，加以判断
match v.get(2) {
    Some(third) => third,
    None => println!("There is no third element."),
}

for i in &v {
    println!("{}", i);
}
```



### UPDATE

``` rust

let mut v = vec![100, 32, 57];
for i in &mut v {
    // 使用 `解引用运算符*` 获取i对应的值, 才可以修改
    *i += 50;
}

let mut v: Vec<i32> = Vec::new();

v.push(5);

/// 不能在Vec借用后修改它的值，会引起编译错误
/// vector 的工作方式, 添加元素在内存不足时会重新分配，
/// 第一个元素的引用就指向了被释放的内存
let first = &v[0];
v.push(6);


```

### 利用枚举使Vector可以存储多种类型 

``` rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Float(10.12),
    SpreadsheetCell::Text(String::from("blue")),
]
```


