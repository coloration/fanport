--- 
title: 函数与闭包
index: Language.Rust.Syntax
--- 

[[toc]]

## 函数 fn

函数的关键字和类型都是 `fn`

``` rust
fn foo(x: 32) {}
fn bar() -> i32 {
    5
}
fn bar() -> i32 {
    return 5;
}

bar(); // 5;

// 不能通过编译，需要删除分号
fn baz() -> i32 {
    5;
}

```

### 函数参数模式

参数解构

``` rust
fn print_coordinates(&(x, y): &(i32, i32)) {

}
```


### 发散函数 `!`

不返回任何值 never type

``` rust
fn bar() -> ! {
    // -- snip --
}
```

### 函数指针 function pointer

通过函数指针允许我们使用函数作为另一个函数的参数

``` rust
fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    let answer = do_twice(add_one, 5);
}
```

不同于闭包，fn 是一个类型而不是一个 trait


``` rust
enum Status {
    Value(u32),
    Stop,
}

let list_of_statuses: Vec<Status> = (0u32..20)
    .map(Status::Value).collect();
```


## 闭包 closures

### 声明与使用

闭包不用声明类型。但当两次调用同一个闭包但参数类型不同时。编译器会报错

``` rust
let add_one = |x: u32| -> u32 { x + 1 };
let add_one = |x| {x + 1};
let add_one = |x| x + 1;

let three = add_one(2);
```

### 使用带有泛型和 Fn trait 的闭包

``` rust
struct Cacher<T>
where T: Fn(u32) -> u32 {
    calculation: T,
    value: Option<u32>
}

impl Cacher {
    value(&self, arg: u32) {
        match &self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            }
        }
    }
}
```

### 闭包会捕获作用域变量

``` rust
fn main {
    let x = 4;
    let equal_to_x = |z| z == x;
    let y = 4;

    equal_to_x(y); // true
}
```

闭包可以通过三种方式捕获其环境，他们直接对应函数的三种获取参数的方式

- 获取所有权
- 可变借用
- 不可变借用

这三种捕获值的方式被编码为如下三个 Fn trait：

- `FnOnce` 消费从周围作用域捕获的变量，闭包周围的作用域被称为其 `环境environment`。为了消费捕获到的变量，闭包必须获取其所有权并在定义闭包时将其移动进闭包。其名称的 Once 部分代表了闭包不能多次获取相同变量的所有权的事实，所以它只能被调用一次。
- `FnMut` 获取可变的借用值所以可以改变其环境
- `Fn` 从其环境获取不可变的借用值

#### `move` 移动所有权 

``` rust
fn main() {
    let x = vec![1, 2, 3];
    let equal_to_x = move |z| z == x;

    // Compile Error
    // 闭包使用了 move 转移了所有权
    // x 是对象不会被复制
    println!("can't use x here: {:?}", x);

    let y = vec![1, 2, 3];
    assert!(equal_to_x(y));
}
```

### 返回闭包

Rust 并不知道需要多少空间来储存闭包, 所以必须返回它的指针

``` rust
fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}
```