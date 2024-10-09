---
title: String & str
index: Language.Rust.Syntax
---

## 字符串对象 `String`


Rust 中的字符串是一个对象（一个Vector`<u8>`的封装），我们通常理解的字符串字面量(`"demo"`) 在Rust中被称为`字符串切片 &str`


### 创建

``` rust
// str => String

let mut s = String::from("Hello");
let mut s = "Hello".to_string();


// 多行字符串slice表示 

"\
abc
def
"
```

### 修改

``` rust

// 追加字符串
s.push_str(", World"); // 
s += "!"; // s 所有权变更 s1 + &s2

// Hello, World!

// 追加字符
s.push('?');

// Hello, World!?

let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3;
let s = format!("{}-{}-{}"，s1, s2, s3); // 不会获得所有权


let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; 
// s1被移动了无法使用，s2可以
// &s2的类型由&String 强制转换(deref coercion)为 &str
// 可以理解为 把 &s2 变成了 &s2[..]



```

### 复制

``` rust
let s2 = s1.clone();
let s2 = &s1[..] 
// &s1[0..s1.len()]
// &s1[..s1.len()]
// &s1[0..]
```

### 删除

``` rust
let s = String::from("Hello World");
s.clear();
```

### 读取

#### 字符串读取方式

- 字节 Bytes
- 标量值 Scalar Values
- 字形簇 Grapheme Clusters

``` rust
let w = "नमस्ते";

for b in w.bytes() {

}

for b in w.chars() {

}
// 三方包


/// Read
let firstChar = "नमस्ते".chars().nth(); // Some('न') O(n)
let length = "नमस्ते".chars().count(); // 6 O(n) 注意count 会转移所有权
let length = "नमस्ते".bytes().count(); // 18 O(n)
```

``` rust

```

``` rust
let s = String::from("Hello World");

let hello = &s[0..5]; // &s[..5]
let world = &s[5..11]; // &s[6..] &[6..s.len()]

```

### 方法

- `len() -> number`: 返回字节数byte（汉字， unicode占2个字节）


### Notes

- `String` 不允许索引的原因，1.不能确定需求是读取字节，标量值，还是字形簇。2.不能保证时间复杂度为O(1)
- 当使用数字进行切片时 `&s[0..5]`，数字代表的是 byte 的位置，如果数字不是在字符的边缘，程序就会panic


## 字符串切片 `&str`

- 字符串切面为不可变引用
- 字符串字面量即为字符串切片
- 字符串字面量也为不可变引用