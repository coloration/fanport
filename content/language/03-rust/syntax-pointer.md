---
title: 智能指针 smart pointer
index: Language.Rust.Syntax
---

[[toc]]

Rust 中的指针
- 引用 rederence: 
    - 只借用数据
- 智能指针 smart pointer: 
    - 拥有他们指向的数据

## `Box<T>`

box 允许你将一个值放在堆上而不是栈上。留在栈上的则是指向堆数据的指针。

当作用域结束时，存在栈上的Box，以及它指向的堆上的数据都会被释放。

Box 没有特殊的功能，也不会带来除了存储以外的性能损失。

``` rust
let b = Box::new(5);
println!("b = {}", b);
```

使用场景

- 当有一个在编译时未知大小的类型，而又想要在需要确切大小的上下文中使用这个类型值的时候
    - 递归类型

    ``` rust
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    use crate::List::{Cons, Nil};

    let list = Cons(
        1, Box::new(Cons(
            2, Box::new(Cons(
                3, Box::new(Nil)
            ))
        ))
    );
    ```

- 当有大量数据并希望在确保数据不被拷贝的情况下转移所有权的时候
- 当希望拥有一个值并只关心它的类型是否实现了特定 trait 而不是其具体类型的时候

## Deref Trait 

通过实现 Deref trait 将某类型像引用一样处理

``` rust
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    type Target = T;
    // deref 返回了我希望通过 * 运算符访问的值的引用
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
let x = 5;
let y = MyBox::new(x);

assert_eq!(5, x);
assert_eq!(5, *y);
// Rust 在底层运行
*(y.deref());
```

### 函数和方法的隐式 Deref 强制转换

**Deref 强制转换(deref coercions)**, 只会作用于实现了 Deref trait 的类型。

Deref 强制转换 可以将 &String 转换为 &str，因为 String 实现了 Deref trait 因此可以返回 &str。

``` rust
fn hello(name: &str) {
    println!("Hello, {}!", name);
}

let m = MyBox::new(String::from("Rust"));
hello(&m);
// 如果Rust没有实现 Deref 强制转换
hello(&(*m)[..]);
```

当所涉及到的类型定义了 Deref trait，Rust 会分析这些类型并使用任意多次 Deref::deref 调用以获得匹配参数的类型。这些解析都发生在编译时，所以利用 Deref 强制转换并没有运行时损耗。

### Deref 强制转换如何与可变性交互

Rust 在发现类型和 trait 实现满足三种情况时会进行 Deref 强制转换：

- 当 `T: Deref<Target=U>` 时从 `&T` 到 `&U`。
- 当 `T: DerefMut<Target=U>` 时从 `&mut T` 到 `&mut U`。
- 当 `T: Deref<Target=U>` 时从 `&mut T` 到 `&U`。但不可能将不可变引用转为可变引用

``` rust
```

## Drop Trait

Drop Trait 允许我们在值要离开作用域时执行一些代码

例如，当 `Box<T>` 被丢弃时会释放 box 指向的堆空间。

``` rust
impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CSP with data `{}`!", self.data)
    }
}
```

### 通过 `std::mem::drop` 提早丢弃值

Drop Trait 的drop方法不能显式调用。

``` rust
use std::mem::drop;

let c = CustomSmartPointer {
    data: String::from("some data"),
};

drop(c); // Dropping CSP with data `some data`!

println!("CSP dropped before the end of main.");
```

## 引用计数 rederence counting 

`Rc<T>` 可以用于启用多所有权 (只读共享)

``` rust
enum List {
    Cons(i32, Rc<List>),
    Nil
}

use crate::List::{Cons, Nil};
// 手动引入
use std::rc::Rc;

let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
let b = Cons(3, Rc::clone(&a));
{
    let c = Cons(4, Rc::clone(&a));
    println!("count: {}", Rc::strong_count(&a)); // 3
}
println!("count: {}", Rc::strong_count(&a)); // 2
```

## 内部可变性 interior mutability

即使在有不可变引用时也可以改变数据，这通常是借用规则所不允许的。

### 通过 `RefCell<T>` 在运行时检查借用规则

`RefCell<T>` 代表其数据的唯一的所有权, 其不可变性作用于运行时。违反规则时触发 panic

`RefCell<T>` 正是用于当你确信代码遵守借用规则，而编译器不能理解和确定的时候。

只适用于单线程场景


``` rust
pub trait Messager {
    fn send(&self, msg: &str);
}

pub struct LimitTracker<'a, T: Messager> {
    messager: &'a T,
    value: usize,
    max: usize,
}

impl<'a, T> LimitTracker<'a, T>
where T: Messager {
    pub fn new(messager: &T, max: usize) -> LimitTracker<T> {
        LimitTracker {
            messager,
            value: 0,
            max,
        }
    }

    pub fn set_value(&mut self, value: usize) {
        self.value = value;
        let percentage_of_max = self.value as f64 / self.max as f64;

        if percentage_of_max >= 1.0 {
            self.messager.send("Error: You are over your quota!");
        }
        else if percentage_of_max >= 0.9 {
            self.messager.send("Urgent warning: You've used up over 90% of your quota!");
        }
        else if percentage_of_max > 0.75 {
            self.messager.send("Warning: You've used up over 75% of your quota!");
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    struct MockMesseger {
        sent_messages: RefCell<Vec<String>>,
    }

    impl MockMesseger {
        fn new() -> MockMesseger {
            MockMesseger {
                sent_messages: RefCell::new(vec![]),
            }
        }
    }

    impl Messager for MockMesseger {
        fn send(&self, message: &str) {
            self.sent_messages.borrow_mut().push(String::from(message));
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMesseger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);

        limit_tracker.set_value(80);

        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1);
    }
}
```





### 结合 `Rc<T>` 和 `RefCell<T>` 来拥有多个可变数据所有者

``` rust
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil
}

use List::{Cons, Nil};

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));
    let b = Cons(Rc::new(RefCell::new(3)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(4)), Rc::clone(&a));

    *value.borrow_mut() += 10;

    println!("a after = {:?}", a);
    println!("b after = {:?}", b);
    println!("c after = {:?}", c);
}

// a after = Cons(RefCell { value: 15 }, Nil)
// b after = Cons(RefCell { value: 3 }, Cons(RefCell { value: 15 }, Nil))
// c after = Cons(RefCell { value: 4 }, Cons(RefCell { value: 15 }, Nil))

```

## 智能指针间的异同

- 所有者数量
    - `Rc<T>` 允许相同数据有多个所有者; 
    - `Box<T>`,`RefCell<T>` 有单一所有者
- 检查方式
    - `Box<T>` 允许在编译时执行不可变或可变借用检查；
    - `Rc<T>` 仅允许在编译时执行不可变借用检查；
    - `RefCell<T>` 允许在运行时执行不可变或可变借用检查；因为允许在运行时进行可变借用检查，所以我们可以在即便`RefCell<T>` 不可变的情况下修改其内部的值


## 引用循环与内存泄漏

``` rust
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil
}

use List::{Cons, Nil};

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}

fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));
    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell:new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after chaging a = {}", Rc::strong_count(&b));
    println!("a rc count after chaging a = {}", Rc::strong_count(&a));

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack
    // println!("a next item = {:?}", a.tail());

}

```

### 避免引用循环：将 `Rc<T>` 变为 `Weak<T>`