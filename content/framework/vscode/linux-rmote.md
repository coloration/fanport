---
title: Rmote + VSCode 修改远程服务器文件
date: 2018-05-03
tag: 
- linux
---

**Note:**不能打开文件夹

> foo/ is a directory and rmate is unable to handle directories.

参考
- <https://www.cnblogs.com/learn21cn/p/6189023.html>
- <https://raw.githubusercontent.com/aurora/rmate>

### 本机

1. vscode 安装 Remote VSCode 插件
2. 安装完后 `command + p` 输入 `> remote` 点击 `Remote Start Server`
3. 打开终端执行 `ssh -R 52698:localhost:52698 [远程主机用户]@[远程主机IP]` 
  
- 这里的端口改不了，好像写死在 shell 脚本里了
- windows 可以使用 [Cmder](http://cmder.net/) 代替终端 

### 远程服务器

``` bash
$ wget https://raw.githubusercontent.com/aurora/rmate/master/rmate
$ chmod +x ./rmate
$ mv ./rmate /usr/local/bin/

$ touch ~/foo.txt
$ rmate ~/foo.txt
``