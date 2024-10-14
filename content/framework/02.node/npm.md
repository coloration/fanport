---
title: npm
index: Framework.Node.Syntax
---


## 常用命令

- 查看配置: `npm config get`
- 删除配置: `npm config delete electron_mirror`
- 查看全局安装地址: `npm root -g`
- 初始化项目: `npm init -y`
- 安装项目依赖
    - `--save` or `-S` 保存到 `package.json` 的 `dependencies` 字段中
    - `--save-dev` or `-D` 保存到 `package.json` 的 `devDependencies` 字段中


## 修改全局安装路径和缓存路径

- 修改全局安装路径 需要添加到环境变量中
- 单独配置全局安装路径后，切换node版本也不需要重新安装全局包

``` bash
PATH/node$ mkdir node_global node_cache
$ npm config set prefix "PATH/node/node_global"
$ npm config set cache "PATH/node/node_cache"


$ pnpm config set global-bin-dir "PATH/node/node_global"

```

## 修改个别项目的下载路径

1. 命令行修改全局变量

``` bash
$ npm config set electron_mirror https://registry.npmmirror.com/mirrors/electron/
$ npm config set cypress_mirror https://registry.npmmirror.com/mirrors/cypress/

$ npm config set node_sass_mirror https://registry.npmmirror.com/mirrors/node-sass/
$ npm config set electron_builder_binaries_mirror https://registry.npmmirror.com/mirrors/electron-builder-binaries/
```

2. 手动修改全局变量

> `xxx_mirror` is not a valid npm option

- `npm config edit` 

```
sharp_binary_host = "https://npmmirror.com/mirrors/sharp/"
sharp_libvips_binary_host = "https://npmmirror.com/mirrors/sharp-libvips/"
```


3. 在项目中 `.npmrc` 修改

``` bash
# For electron-builder
# https://github.com/electron-userland/electron-builder/issues/6289#issuecomment-1042620422
shamefully-hoist=true

# For China 🇨🇳 developers
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://registry.npmmirror.com/mirrors/electron-builder-binaries/
```



## 切换镜像源

``` bash
$ npm i -g nrm

$ nrm ls

# npm ---------- https://registry.npmjs.org/
# yarn --------- https://registry.yarnpkg.com/
# tencent ------ https://mirrors.cloud.tencent.com/npm/
# cnpm --------- https://r.cnpmjs.org/
# taobao ------- https://registry.npmmirror.com/
# npmMirror ---- https://skimdb.npmjs.com/registry/

$ nrm use taobao
```

## 切换 Node 版本

### NVM (Windows)

下载安装: <https://github.com/coreybutler/nvm-windows>

- 先删除原始安装的 node
- 1.1.9 自定义目录无效

``` bash
# 安装
$ nvm install 16

# 查看安装版本
$ nvm ls
# 16.18.0
# 14.20.1

# 查看当前使用版本
$ nvm current

# 使用某版本 必须用完整版本号
$ nvm use 16.18.0

```

- windows 设置环境变量
    1. `win` + `r`
    2. `sysdm.cpl`
    3. 高级 - 环境变量

### N (Mac Linux)

``` bash
# 安装
$ npm i -g n
```


## 版本号的含义

`(Decoration)Major.Minor.Patch(Suffix)`

- Major: 重大版本升级，破坏性更新（不兼容）
- Minor: 添加了新特性（向下兼容）
- Patch: 补丁更新，bug修复（向下兼容）
- Decoration:
    - `~M.m.P`: 只能升级Patch(P) 版本
    - `^M.m.P`: 可升级Patch(P), Minor(m) 版本
    - `M.m.P` or `@M.m.P`: 不可升级，锁定特定版本
    - `*`: 可升级 Major(M), Minor(m), Patch(P) 版本
- Suffix: 重要模块为了保证稳定，会在放出正式版本之前提供先行版本
    - `M.m.P-alpha.n`: 内部测试版，主要给开发和测试找bug用
    - `M.m.P-beta.n`: 公开测版本，主要用于给用户提前体验一些功能
    - `M.m.P-rc.n`: `Release candidate` 正式版本的候选版本，可以理解为预览版，不会再增加新功能，再改一些小bug，就会到正式的版本了



## npm 命令

### 安装包 install | i | add


|cmd|description|demo|
|:---|:---|:---|
|`npm i` |初始化项目|- `git clone <project> & cd $_` <br /> - `npm i` |
|`npm i [<@scope>/]<pkg>` |安装最新版本npm包|- `npm i react -S` <br /> - `npm i @vue/cli -g`|
|`npm i [<@scope>/]<pkg>@tag`||`npm i vue-demi@lastest` |
|`npm i [<@scope>/]<pkg>@<version>`|指定版本|`$ npm i jquery@3.5.1`|
|`npm i [<@scope>/]<pkg>@<version range>`|指定版本范围|`$ npm i jquery@">=1.11.0 <2.0.0"`|

**args**

`[--save-prod|--save-dev|--save-optional] [--save-exact] [--no-save]`

|arg|alias|position|desc|
|:---|:---|:---|:---|
|`--global`|`-g`|1|忽略项目全局安装|
|`--save-prod`(默认)|`--save`, `-S`|1|保存到 `package.json/dependencies`|
|`--save-dev`|`-D`|1|保存到 `package.json/devDependencies`|
|`--save-optional`|`-O`|1|保存到`package.json/optionalDependencies`|
|`--save-exact`|`-E`|2|安装精确版本|
|`--no-save`||2|不会记录到 `package.json`, 也无法用 `npm ls` 查出来，但是可以被`npm uninstall`卸载|

!> 一个包只能安装在 `dependencies`, `devDependencies`, `optionalDependencies`, `peerDependencies` 其中一个位置上


### 卸载包 uninstall | un | unlink | remove | rm | r


**args** 

`npm uninstall [<@scope>/]<pkg>[@<version>]...`

`[--save-prod|--save-dev|--save-optional] [--no-save]`


!> `--no-save` 只会删除包，不会修改 package.json

!> 其他参数都无效，无论依赖添加在哪里都会从 package.json 删除


### 更新包 update | up | upgrade


`npm update [-g] [<pkg>...]`

> 根据**版本号约束规则**进行更新 


### 发布包 publish


1. 切换 npm官方源(或者自己的源) `$ npm config set registry http://registry.npmjs.org/`
2. 登录并输入信息:  `$ npm login`
3. 发布: `$ npm publish --access public`

## 版本号

### 版本号表示

- `0.0.1-alpha.1`
- `0.0.1-beta.1`
- `0.0.1-rc.1`
- `0.0.1`

### 版本号约束

> `major`.`minor`.`patch` 主版本号·次版本号·修补版本号

|类型|含义|例子|
|:---|:---|:---|
|`major.minor.patch`|固定版本 `-E`|`1.12.5`|
|`^major.minor.patch`|锁定左侧第一个非零版本(默认)|- `^1.12.5`: `<2.0.0` <br /> - `^0.2.0`: `<0.3.0` <br /> - `^0.0.17`: `0.0.17`|
|`~major.minor.patch`|只允许更新patch版本|- `~1.12.5`: `<1.13.0`|

**举例**

``` js
{
  "dist-tags": { "latest": "1.2.2" },
  "versions": [
    "1.2.2", "1.2.1", "1.2.0",
    "1.1.2", "1.1.1",
    "1.0.0",
    "0.4.1", "0.4.0",
    "0.2.0"
  ]
}

// package: ^1.1.1 => 1.2.2
// package: ~1.1.1 => 1.1.2
// package:  1.1.1 => 1.1.1
// package: ^0.2.0 => 0.2.0
// package: ^0.4.0 => 0.4.1
```


### npm 切换源

**npm**

- 淘宝源: `$ npm config set registry https://registry.npm.taobao.org`
- 官方源: `$ npm config set registry http://www.npmjs.org`

**npm with nrm**

1. 安装nrm `$ npm i nrm -g`
2. 查看可使用的源 `$ nrm ls`
3. 切换源 `$ nrm use taobao`
4. 添加源 `$ nrm add <name> <protocol://address>`
5. 删除源 `$ nrm delete <name>`
6. 源测速 `$ nrm test`

---


## package.json 为命令添加软连接

``` json
// package.json
{
  // ...
  "scripts": {
    "build": "./node_modules/.bin/webpack"
  }
}
```

运行

```bash
$ npm run build
$ yarn build
```

---

## yarn 命令

### yarn 安装

- linux (CentOS)
1. 下载 `$ wget https://github.com/yarnpkg/yarn/releases/download/v1.7.0/yarn-v1.7.0.tar.gz`
2. 解压 `$ tar -zxvf yarn-v1.7.0.tar.gz -C /usr/local/src`
3. 添加软连接 `$ ln -s /usr/local/src/yarn-v1.7.0/bin/yarn /usr/bin/yarn`

### yarn 升级

- MacOS: `$ brew update yarn`



## yarn flow


### yarn 切换源

- 淘宝源: `$ yarn config set registry https://registry.npm.taobao.org`
- 官方源: `$ yarn config set registry https://registry.yarnpkg.com`

### yarn 清除缓存

``` bash
$ yarn cache clean
```


- [package.json 大数据分析](https://medium.com/warsawjs/state-of-package-json-dependencies-de99828b6c3f)
- [如何通过 npm 窃取信用卡密码？](https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5) 
