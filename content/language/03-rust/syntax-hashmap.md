---
title: HashMap
index: Language.Rust.Syntax
---

``` rust
use std::collections:HashMap;
```

- `std::collection` doc: <https://doc.rust-lang.org/std/collections/index.html>

### Create


``` rust
// 1.
let mut scores<String, i32> = HashMap::new();

// 2.  + update
let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);

// 3. functional
let team = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];

let mut scores: HashMap<_, _> = 
    teams.iter().zip(initial_scores.iter()).collect();

```


### Update


``` rust
// 覆盖更新
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);

// 没有值时更新
scores.entry(String::from("Yellow")).or_insert(50);
```

``` rust
let text = "hello world wonderful world";
let mut map = HashMap::new();

for w in text.split_whitespace() {
    let count = map.entry(w).or_insert(0);
    *count += 1;
}

println!("{:#?}", map);
```



### Read

``` rust

// 1
let team_name = String::from("Blue");
let score = scores.get(&team_name); // 注意引用
// or
let score = scores.get("Blue");

println!("Blue team score: {:?}", score); // Some(10)

match score {
    Some(v) => *v,
    None => {
        
    }
}


// 2
for (key, value) in &scores {
    println!("{}: {}", key, value);
}



```

### Note

- 实现了 Copy trait 的类型(i32)，值会复制到 HashMap，
- 否则值会移动，所有权转移给 HashMap, 所以可以插入值的引用，但引用的值在 HashMap 存在的生命周期必须保持有效
- Hash 函数，HashBuilder trait 来更改 