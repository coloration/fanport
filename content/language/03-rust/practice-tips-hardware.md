---
title: hardware
index: Language.Rust.Practice
---

``` bash
[dependencies]
clap = { version = "4.0.19", features = ["derive"] }
sysfs_gpio = "0.6"
```

``` rust
use sysfs_gpio::{Direction, Pin};
use std::thread::sleep;
use std::time::Duration;
use clap::Parser;

#[derive(Parser, Debug)]
struct Args {
    #[arg(short, long)]
    gpio: u8,
}

fn main() {
    let args = Args::parse();
    
    println!("GPIO Setting: {}", args.gpio);
    let led = Pin::new(args.gpio.into());

    led.with_exported(|| {
        led.set_direction(Direction::Out).unwrap();

        for i in 1..10 {
            println!("blink {} times", i);
            led.set_value(1).unwrap();
            sleep(Duration::from_millis(500));
            led.set_value(0).unwrap();
            sleep(Duration::from_millis(500));
        }

        Ok(())
    }).unwrap();
}

```