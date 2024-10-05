---
title: 并发编程 concurrent
index: Language.Rust.Syntax
---

[[toc]]


- **并发编程 concurrent programming**: 代表程序的不同部分相互独立的执行
- **并行编程 parallel programming**: 代表程序不同部分于同时执行

## 使用线程同时运行代码 threads

多线程带来的问题

- 竞态条件（Race conditions），多个线程以不一致的顺序访问数据或资源
- 死锁（Deadlocks），两个线程相互等待对方停止使用其所拥有的资源，这会阻止它们继续运行
- 只会发生在特定情况且难以稳定重现和修复的 bug

``` rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} form the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    // 等待新线程结束，再执行主线程代码
    // handle.join().unwrap();
    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    // 等待所有进程结束
    // handle.join().unwrap();
}
```

主线程结束，其他线程自动结束

### 使用 `move` 向线程中移入所有权

``` rust
let v = vec![1, 2, 3];
// rust 不知道线程会存在多久，所以需要将所有权移入线程的闭包中
let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
});

handle.join().unwrap();
```

## 线程间传递数据 channel


``` rust
use std::sync::mpsc; // multiple produce, sigle consumer

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    // recv 会阻塞线程直到得到数据
    // try_recv 会立即返回一个 Result
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

### 发送多个值并观察接收者的等待

``` rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
```

因为主线程中的 for 循环里并没有任何暂停或等待的代码，所以可以说主线程是在等待从新建线程中接收值。

### 通过克隆发送者来创建多个生产者

``` rust
let (tx, rx) = mpsc::channel();
let tx1 = tx.clone();

thread::spawn(move || {
    tx.send("1").unwrap();
});

thread::spawn(move || {
    tx1.send("2").unwrap();
});

for received in rx {
    println!("Got: {}", received);
}
// Got: 1
// Got: 2
```

## 共享状态并发

### 互斥器 mutex

**互斥器 mutual exclusion**任意时刻，其只允许一个线程访问某些数据

为了访问互斥器中的数据，线程首先需要通过获取互斥器的 **锁（lock）**来表明其希望访问数据。锁是一个作为互斥器一部分的数据结构，它记录谁有数据的排他访问权。因此，我们描述互斥器为通过锁系统 **保护（guarding）**其数据。

互斥器的锁相当于麦克风

``` rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }
    
    println!("m = {:?}", m);
}

```

### 原子引用计数 `Arc<T>`

`Arc<T>` (atomically rederence counted) 可安全用于并发环境的 `Rc<T>`

``` rust
let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = thread::spawn(move || {
        let mut num = counter.lock().unwrap();

        *num += 1;
    });

    handles.push(handle);
}

for handle in handles {
    handle.join().unwrap();
}

println!("Result: {}", *counter.lock().unwrap());
```

## Sync 与 Send Traits 的可扩展并发

Rust 语言并不支持并发，而是通过标准库支持，所以可以使用任意库提供的并发方案

然而有两个并发概念是内嵌于语言中的：`std::marker` 中的 `Sync` 和 `Send` trait。

### 通过 Send 允许在线程间转移所有权

实现了 `Send` trait 的类型可以将所有权在线程中传递。除了`Rc<T>`，它被设计为单线程场景。

任何完全由 `Send` 的类型组成的类型也会自动被标记为 `Send`。几乎所有基本类型都是 `Send` 的，除了裸指针（raw pointer）

### Sync 允许多线程访问

实现了 `Sync` traait 的类型可以安全的在多个线程中拥有其值的引用

类似于 `Send` 的情况，基本类型是 `Sync` 的，完全由 `Sync` 的类型组成的类型也是 `Sync` 的。

### 手动实现 Send 和 Sync 是不安全的

通常并不需要手动实现 Send 和 Sync trait，因为由 Send 和 Sync 的类型组成的类型，自动就是 Send 和 Sync 的。因为他们是标记 trait，甚至都不需要实现任何方法。他们只是用来加强并发相关的不可变性的。


