---
title: tips
index: Language.Rust.Practice
---

## 类型转换

### 字符串转数字

``` rust
let mut guess = String::new();

io::stdin().read_line(&mut guess).expect("Cannot read.");

let guess: u32 = guess.trim().parse().expect("Not a number");
```


## 进制转换 


``` rust
const ALL_CHARS: &'static str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

pub fn base_10_to_n(num: u64, radix: u32) -> String {
    if num == 0 {
        return String::from("0");
    }

    let base = base_10_to_n(num / (radix as u64), radix);
    let start = base.strip_prefix("0").unwrap_or(base.as_str());
    let end = match ALL_CHARS.chars().nth((num % (radix as u64)) as usize) {
        Some(data) => String::from(data),
        _ => String::from(""),
    };
    format!("{}{}", start, end)
}

pub fn base_n_to_10(num_str: &str, radix: u32) -> u32 {
    let mut result: u32 = 0;
    for i in 0..num_str.len() {
        result *= radix as u32;
        let target_char = num_str.chars().nth(i).unwrap_or('0');
        let data = ALL_CHARS.chars().position(|i| i == target_char).unwrap_or(0);
        result += data as u32;
    }
    result
}
```