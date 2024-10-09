---
title: OOP 
index: Language.Rust.Syntax
---

[[toc]]

## 多态

Rust 中没有继承的功能，但可以使用 `trait` 实现多态

``` rust
pub trait Draw {
    fn draw(&self);
}

// 这里如果使用泛型 `trait bound` Screen components 就会被约束成单一的组件 Button 或 TextField
pub struct Screen {
    pub components: Vec<Box<dyn Draw>>
}

// pub struct Screen<T: Draw> {
//     pub components: Vec<T>
// }


impl Screen {
    pub fn run(&self) {
        for cmp in self.components.iter() {
            cmp.draw();
        }
    }
}

pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}

impl Draw for Button {
    fn draw(&self) {
        println!("Draw a button {}.", &self.label);
    }
}

impl Clickable for Button {
    fn click(&self) {
        println!("Click a button {}.", &self.label);
    }
}
```

### trait 对象执行动态分发 

**静态分发 static dispatch**发生于编译器在编译时就知晓调用了什么方法的时候。这与 **动态分发 dynamic dispatch**相对，这时编译器在编译时无法知晓调用了什么方法。在动态分发的情况下，编译器会生成在运行时确定调用了什么方法的代码。

### trait对象需要类型安全

只有对象安全（object-safe）的trait可以实现为特征对象。

- 返回值不是 Self
- 没有泛型类型的参数


## 实现设计模式

**状态模式（state pattern）**

- 博文从空白的草案开始。
- 一旦草案完成，请求审核博文。
- 一旦博文过审，它将被发表。
- 只有被发表的博文的内容会被打印，这样就不会意外打印出没有被审核的博文的文本。

- 增加 reject 方法将博文的状态从 PendingReview 变回 Draft
- 在将状态变为 Published 之前需要两次 approve 调用
- 只允许博文处于 Draft 状态时增加文本内容。提示：让状态对象负责内容可能发生什么改变，但不负责修改 Post。

``` rust
// main.rs
use blog::Post;

fn main() {

    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today.");

    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    post.approve();
    assert_eq!("I ate a salad for lunch today.", post.content());
}
```

``` rust
// lib.rs
pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft{})),
            content: String::new(),
        }
    }

    pub fn add_text(&mut self, text: &str) {
        self.content = self.state
            .as_ref()
            .unwrap()
            .add_text(self.content.clone(), text);
    }

    pub fn content(&self) -> &str {
        self.state
            // 将 state 移动出借用的 &self 函数参数
            // Option<Box<dyn State>> TO Option<&Box<dyn State>>
            .as_ref()
            .unwrap()
            .content(self)
    }

    pub fn request_review(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review())
        }
    }

    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve())
        }
    }

    pub fn reject(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.reject())
        }
    }
}

trait State {
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
    fn reject(self: Box<Self>) -> Box<dyn State>;
    fn add_text(&self, post_content: String, _text: &str) -> String {
        post_content
    } 
    fn content<'a>(&self, _post: &'a Post) -> &'a str {
        ""
    }
}

struct Draft {}
struct PendingReview {
    approve_count: u32
}
struct Published {}

impl State for Draft {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview {
            approve_count: 0
        })
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        Box::new(Published {})
    }

    fn reject(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn add_text(&self, mut post_content: String, text: &str) -> String {
        post_content.push_str(text);
        post_content
    }
}


impl State for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn approve(mut self: Box<Self>) -> Box<dyn State> {
        if self.approve_count < 1 {
            self.approve_count += 1;
            self
        }
        else {
            Box::new(Published {})
        }
    }

    fn reject(self: Box<Self>) -> Box<dyn State> {
        Box::new(Draft {})
    }
}

impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn reject(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn content<'a>(&self, post: &'a Post) -> &'a str {
        &post.content
    }
}
```





### Refs

- <https://llever.com/gentle-intro/object-orientation.zh.html>