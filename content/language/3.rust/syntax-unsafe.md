---
title: 不安全的 Rust
index: Language.Rust.Syntax
---

[[toc]]

不安全的超能力

- 解引用裸指针
- 调用不安全的函数或方法
- 访问或修改可变静态变量
- 实现不安全的 trait
- 访问 union 的字段

unsafe 关键字只提供以上五种功能。在不安全的代码中使用引用仍然会被rust检查

## 解引用裸指针 raw pointers

裸指针与引用和智能指针的区别：

- 允许忽略借用规则，可以同时拥有不可变和可变的指针，或多个指向相同位置的可变指针
- 不保证指向有效的内存
- 允许为空
- 不能实现任何自动清理功能

``` rust
let mut num = 5;

// *const T *mut T 中的 * 不是解引用操作，是类型的一部分
// 此时没有使用 unsafe，代表裸指针可以在安全代码中创建，但是不能使用
let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

unsafe {
    // 如果同时操作这两个引用，可能会造成数据竞争
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
```

## 调用不安全函数或方法

``` rust
unsafe fn dangerous() {}

unsafe {
    dangerous();
}
```

### 创建不安全代码的安全抽象

``` rust
fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();

    assert!(mid <= len);
    // Compile Error!
    (&mut slice[..mid], &mut slice[mid..])
}
```
上面的代码无法通过检查，因为Rust无法分辨出我们是借用 slice 的不同部分各一次，还是借用了slice两次

``` rust
// 使用 unsafe 块，裸指针和一些不安全函数调用来实现 split_at_mut

use std::slice;

fn split_at_mut(slice: &mut [i32], mid: usize)
-> (&mut [i32], &mut [i32]) {
    let len = slice.len();
    // 访问 slice 的裸指针 => *mut i32
    let ptr = slice.as_mut_ptr();

    assert!(mid < len);

    unsafe {
        (
            slice::from_raw_parts_mut(ptr, mid),
            slice::from_raw_parts_mut(ptr.add(mid), len - mid)
        )
    }
}
```

### 使用 extern 函数调用外部代码

`extern` 帮助创建和使用**外部函数接口**(Foreign Function Interface FFI)


extern 块中声明的函数在 Rust 代码中总是不安全的。因为其他语言不会强制执行 Rust 的规则且 Rust 无法检查它们

e.g. 使用c标准库的abs函数

``` rust
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

### 从其他语言调用 Rust 函数

``` rust
#[no_mangle]
pub extern "C" fn call_form_c() {
    println!("Just called a Rust function from C!");
}
```

## 静态变量

Rust 中的全局变量 

读取不可变的静态变量是安全的 

``` rust
static HELLO: &str = "Hello";

fn main() {
    println!("name is: {}", HELLO);
}
```

读取和修改可变静态变量都是不安全的

``` rust
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);
    
    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```

## 实现不安全的 trait

当 trait 中至少有一个方法中包含编译器无法验证的不变式（invariant）时 trait 是不安全的。

``` rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}

fn main() {}
```