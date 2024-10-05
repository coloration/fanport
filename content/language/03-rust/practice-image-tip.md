---
title: Image crate tips
index: Language.Rust.Practice
---

### 数据类型转换

``` rust

use base64::{engine::general_purpose, Engine as _};
use std::io::{Cursor, Read, Seek, SeekFrom};

pub fn image_to_base64(img: DynamicImage, format: ImageFormat) -> String {
  let mut c = Cursor::new(Vec::new());
  match img.write_to(&mut c, format) {
      Ok(c) => c,
      Err(error) => {
          panic!(
              "There was a problem writing the resulting buffer: {:?}",
              error
          )
      }
  };

  c.seek(SeekFrom::Start(0)).unwrap();
  let mut out = Vec::new();

  c.read_to_end(&mut out).unwrap();

  let stt = general_purpose::STANDARD.encode(&mut out);

  format!("data:{};base64,{}", format.to_mime_type(), stt)
}

pub fn buffer_to_image(buf: &[u8], format: ImageFormat) -> DynamicImage {
  match image::load_from_memory_with_format(buf, format) {
    Ok(img) => {
      println!("convert succeed!");
      img
    }
    Err(error) => {
      panic!("can not convert the picture: {:?}", error)
    }
  }
}
```


### 颜色转换

``` rust

// 字符串16进制转 RGBA #FF0000

pub fn hex_to_rgb(hex_str: &str) -> Rgba<u8> {
  let hex_r = &hex_str[1..3];
  let hex_g = &hex_str[3..5];
  let hex_b = &hex_str[5..7];
  
  Rgba ([
    base_n_to_10(hex_r, 16) as u8,
    base_n_to_10(hex_g, 16) as u8,
    base_n_to_10(hex_b, 16) as u8,
    255
  ])
}

```