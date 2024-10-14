---
title: SSH
index: Framework.Linux.Command
---



### SSH 

``` bash
$ ssh-keygen -t rsa
```

> C:/Users/Administrator/.ssh

### SSH 免密登录

``` bash
# 先登录远程服务器
$ ssh user@<host>
# input password

# 复制公钥 .pub 到 authorized_keys 文件
~$ vi .ssh/authorized_keys

# 如果没有需要创建
~$ mkdir .ssh
~$ touch .ssh/authorized_keys
~$ chmod 700 -R .ssh
~$ chmod 600 .ssh/authorized_keys
```