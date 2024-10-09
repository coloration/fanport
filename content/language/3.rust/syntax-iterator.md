---
title: 迭代器 iterator
index: Language.Rust.Syntax
---

[[toc]]

Rust 中迭代器是**惰性的 lazy**, 这以为着迭代器在使用之前不会有效果

迭代器是Rust **零成本抽象 zero-cost abstractions** 之一，抽象不会引起额外的开销。与CPP中 **零开销** 相同。

## 声明与使用

``` rust
let v1 = vec![1, 2, 3];
let v1_iter = v1.iter(); // 不会发生任何事情

for val in v1_iter {
    println!("Got: {}", val);
}
```

标准库 Iterator trait 定义 

``` rust
pub trait Iterator {
    type Item; // 关联类型
    fn next(&mut self) -> Option<Self::Item>; // 迭代器唯一需要实现的方法
}
```

``` rust
let v1 = vec![1, 2, 3];

// v1_iter 需要定义为可变 mut，调用next方法后迭代器上记录next位置发生了变化
// for 获取了迭代器的所有权并在后台使其可变
let mut v1_iter = v1.iter();

// next 返回的是迭代器的不可变引用
v1_iter.next(); // Some(&1);
v1_iter.next(); // Some(&2);
v1_iter.next(); // Some(&3);
v1_iter.next(); // None;

// 如果需要获取 v1的所有权并返回拥有所有权的迭代器，可以使用 v1.into_iter()
```

## 消费迭代器的方法

调用迭代器 `next` 方法的方法称为**消费适配器** `consuming adaptors`. 它会消耗掉迭代器。e.g. `sum`

``` rust
let v1 = vec![1, 2, 3];
let v1_iter = v1.iter();
// 调用 sum后不能再使用 v1_iter 因为sum调用时获取了迭代器的所有权
let total: i32 = v1_iter.sum();

// total: 6
```

## 产生新迭代器的方法

**迭代器适配器** `iterator adaptors`, 将当前迭代器变为不同类型的迭代器。

所有的迭代器都是惰性的，直到调用一个**消费适配器**才可以获得结果。

``` rust
let v1: Vec<i32> = vec![1, 2, 3];
let v2 = v1.iter().map(|x| x + 1); // 直到此时会得到编译警告，必须消费掉迭代器
let v3 = v2.collect();

shoes.into_iter().filter(|s| s.size == shoe.size).collect();
```

## 实现自定义迭代器

``` rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        }
        else {
            None
        }
    }
}
```

``` rust
let sum: u32 = Counter::new()
    .zip(Counter::new().skip(1)) 
    // [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
    .map(|(a, b)| a * b)
    // [0, 2, 6, 12, 20]
    .filter(|x| x % 3 == 0)
    // [6, 12]
    .sum();
    // 18
```
