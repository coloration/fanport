---
title: std

---

### Ordering


``` rust
use std::cmp::Ordering;

let mut guess = String::new();

let guess:u32 = guess.trim().parse().expect("Not a number.");

match guess.cmp(&secret_number) {
  Ordering::Less => println!("Too small!"),
  Ordering::Greater => println!("To large!"),
  Ordering::Equal => println!("You Win!"),
}
```