---
title: ESlint
index: Language.JavaScript.Tool
---

### startup

#### 准备

```bash
$ npm i eslint -D
```

```js
// eslint.config.js
export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
```

```js
// package.json
{
  "script": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

#### 使用

```bash
$ npm run lint
```

### 忽略lint

#### 忽略文件

```js
// eslint.config.js
export default [
  {
    ignores: [
      ".config/*", // 忽略 .config 目录下所有文件
      "!.config/**/test.js", // 不忽略 .config 目录下的 test.js 文件
    ],
  },
];
```

#### 忽略单行 

> `// eslint-disable-line YOUR_RULE?`


``` ts
const res = eval('42') // eslint-disable-line no-eval
```

> `// eslint-disable-next-line YOUR_RULE?`

``` ts
// eslint-disable-next-line no-eval
const res = eval('42') 
```


#### 忽略代码段

``` ts
/* eslint-disable YOUR_RULE? */
// 这里是需要忽略的代码
/* eslint-enable */
```