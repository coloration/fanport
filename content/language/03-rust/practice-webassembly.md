---
title: Rust WebAssembly
index: Language.Rust.Practice
---

Rust 一大应用就是编译成 WebAssembly 代码供 JavaScript 使用来提高后者的性能。



## wasm-pack


将 rust 项目打包成 WebAssembly 可调用的程序


### 安装

- 链接下载 <https://rustwasm.github.io/wasm-pack/installer/>
- 或者npm安装 

``` bash
$ npm i -g wasm-pack
```



### 使用

https://rustwasm.github.io/wasm-pack/book/quickstart.html



## vite 集成

### 自己开发

vite-plugin-wasm-pack: <https://www.npmjs.com/package/vite-plugin-wasm-pack>

在目录中新建项目 

``` bash
$ wasm-pack new <crate-name>

$ wasm-pack build ./<crate-name> --target web
```


``` bash
$ npm i vite-plugin-wasm-pack -D
```

``` ts
import { defineConfig } from 'vite'
import wasmPack from 'vite-plugin-wasm-pack'

export default defineConfig({
  plugins: [wasmPack('./<crate-name>')]
})
```


``` ts
import init, { greet } from '<crate-name>' 

init().then(greet)
```

### 使用 npm package

vite-plugin-wasm: <https://www.npmjs.com/package/vite-plugin-wasm>


``` bash
$ npm i vite-plugin-wasm vite-plugin-top-level-await -D
```


``` ts
import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [wasm(), topLevelAwait()]
})
```


``` ts
const photon = await import('@silvia-odwyer/photon')

let newImage = photon.open_image(canvasRef.value, ctx)

photon.filter(newImage, 'radio')
photon.putImageData(canvasRef.value, ctx, newImage)
```


### Rust 中调用 JS 函数 


``` rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // js_namespace 设置命名空间
    #[wasm_bindgen(js_namespace = console)]
    fn log(message: String);

    // js_name 设置别名
    #[wasm_bindgen(js_namespace = console, js_name = info)]
    fn info_2(message: String);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  log(format!("Hello, {}!", name));
  info_2(format!("Hello, {}!", name));
}
```


### Rust 中处理 JsValue 


#### 使用 Reflect 读取值

``` rust
use js_sys::Reflect;

pub fn get_param_field(param: &JsValue, field: &str) -> JsValue {
  match Reflect::get(param, &JsValue::from(field)) {
    Ok(v) => v,
    Err(err) => {
      log(format!("error param [{}] field.", field));
      panic!("{:?}", err);
    }
  }
}

pub fn param_field_number(param: &JsValue, field: &str) -> f64 {
  match get_param_field(param, field).as_f64() {
    Some(v) => v,
    None => {
      log(format!("can not convert [{}] field to number", field));
      panic!()
    }
  }
}


// 使用
let w = param_field_number(param, "width") as u32;
let h = param_field_number(param, "height") as u32;



// 其他类型, TODO 使用 enum + generic 优化代码， 支持 struct
pub fn param_field_string(param: &JsValue, field: &str) -> String {
  match get_param_field(param, field).as_string() {
    Some(v) => v,
    None => {
      log(format!("can not convert [{}] field to string", field));
      panic!()
    }
  }
}

pub fn param_field_boolean(param: &JsValue, field: &str) -> bool {
  match get_param_field(param, field).as_bool() {
    Some(v) => v,
    None => {
      log(format!("can not convert [{}] field to boolean", field));
      panic!()
    }
  }
}

```


