---
title: 宏 Macro
index: Language.Rust.Syntax
---

[[toc]]

- 声明宏 Declarative
- 过程宏 Procedural
    - 自定义 `#[derive]` 宏: 在结构体和枚举上指定通过 `derive` 属性添加的代码
    - 类属性 Attribute-like宏定义：可用于任一项的自定义属性
    - 类函数宏：看起来像函数不过作用于作为参数传递的 token


## 使用 macro_rules! 的声明宏用于通用元编程

``` rust
let v: Vec<u32> = vec![1, 2, 3];

#[macro_export]      // 如果没有该注解，这个宏不能被引入作用域。
macro_rules! vec {   // 宏定义 宏名称 后接宏定义体
    // 模式分支 如果与 `($($x:expr), *)` 匹配则执行 => 后面的代码          
    // 宏匹配的是 Rust 代码，而不想匹配模式那样匹配值
    // $() 括号内声明匹配模式
    // `$x:exper` `exper` 匹配 Rust 任意表达式，并将其命名为 `$x`
    // `,` 一个可有可无的逗号分隔符可以出现在 $() 所匹配的代码之后
    // `*` 该模式匹配零个或更多个 * 之前的任何模式
    ($($x:expr), *) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )* // 此处 * 与参数 * 匹配的数量相同

            temp_vec
        }
    };

    // 更复杂的宏还会有其他分支
    // () => {
    //    
    // }
}
```

**Note:** 标准库中实际定义的 vec! 包括预分配适当量的内存的代码。这部分为代码优化，为了让示例简化，此处并没有包含在内。

这种声明宏的编写方式已经过时了

[The Little Book of Rust Macros](https://veykril.github.io/tlborm/)


## 用于从属性生成代码的过程宏