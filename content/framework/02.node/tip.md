---
title: tip
index: Framework.Node.Practice
---


## 使用 es module

`esno` 已经迁移至 `tsx`

### 1. 全局使用

``` bash
$ npm i tsx -g
$ tsx main.ts
```

### 2. 脚本使用

``` bash
$ npm i tsx -D
```

``` ts
// package.json
{
  "scripts": {
    "start": "tsx main.ts"
  }
}
```

<ToggleContent title="3. outdated">

1. 安装需要的 package

```bash
$ npm i babel-cli babel-preset-es2015 babel-preset-stage-0 nodemon -y -D
```

2. 配置 `.babelrc`

```json
{ "presets": [ "es2015", "stage-0" ] }
```

3. 配置package.json

``` js
{
  //...
  "scripts": {
    "start": "./node_modules/.bin/nodemon --exec babel-node index.js" 
    // 自动编译重启，所有可执行命令都在 ./node_modules/.bin/ 目录下
  }
}
```

</ToggleContent>

---


## PM2 启动 es6 项目
``` bash
# 全局安装 pm2 和 babel-cli
$ npm i -g pm2 babel-cli

# 添加软连接
# node 的路径根据本机路径填写
$ ln -s /usr/local/src/node-v8.11.1-linux-x64/bin/babel-node /user/bin/babel-node
$ ln -s /usr/local/src/node-v8.11.1-linux-x64/bin/pm2 /usr/bin/pm2

# 启动
$ pm2 start --interpreter babel-node app.js
```