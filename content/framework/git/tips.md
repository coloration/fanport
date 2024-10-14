---
title: Tips
index: Framework.Git.Practice
---

### 为项目添加新源

``` bash
$ git remote add <new origin> <git url>
$ git push -u <new origin> <branch1> <branch2>
# or 
$ git push -u <new origin> * # 只会推本地有的分支
```

### 清楚文件夹冗余文件 

``` bash
$ git clean -df
```



## 创建git项目
``` bash
$ git init --bare test.git
$ chown -R git:git test.git
```

## 查看log

``` sh
$ git log
$ git log --graph

:q
# 按q退出
```


## 配置钩子

``` bash
$ cd test.git/hooks
hooks$ touch post-receive
hooks$ chown git:git post-receive
hooks$ chmod 755 post-receive
hooks$ vi post-receive
```

编辑 post-receive

脚本[参考](https://blog.csdn.net/u010837612/article/details/70825225?utm_source=itdadao&utm_medium=referral)，还可以使用推送方式

``` bash
#!/bin/sh
DEPLOY_PATH=/your/project/path/

# 这条命令很重要
unset  GIT_DIR 
cd $DEPLOY_PATH
git reset --hard
git pull
chown www:www -R $DEPLOY_PATH 
```

ps: git 需要有 www 目录写的权限

``` bash
# 将 git 添加到 www 用户组
$ usermod -a -G www git 

# 给用户组赋予写的权限
$ chmod 774 www  
```

或者直接在 `/etc/sudoers` 文件中添加 git sudo 权限, 然后改用 `sudo` 执行 `chown` 命令

``` diff
admin ALL=(ALL)  NOPASSWD:ALL
+ git ALL=(ALL) NOPASSWD:ALL
```

``` bash
#!/bin/sh
# ...
sudo chown www:www -R $DEPLOY_PATH 
```

### 查看远程源信息 

``` bash
$ git remote -v ## --verbose

```

### git 第一次连接远程仓库 

``` bash
# git remote add <origin_name> <server_url>
$ git remote add origin git@xx.xxx.xx.xx:~/xxx.git
```

### 指定推送源

``` bash
# git push -u <origin_name> (<branch_name>)
$ git push -u origin master
```

### 拉取代码时报错 `error: invalid path <path>`


``` bash
$ git config --global core.protectNTFS false
```


### 推送报错 `ssh: connect to host github.com port 22: Connection timed out`

新建文件

``` bash
$ touch ~/.ssh/config
```

编辑文件

``` bash
Host github.com
Hostname ssh.github.com
Port 443
```

测试

``` bash
$ ssh -T git@github.com
```

[ref](https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out)


### 推送报错 `fatal: unable to access 'https://github.com/a/b': Failed to connect to github.com port 443 after n ms: Couldn't connect to server`

清除代理

``` bash
$ git config --global --unset https.proxy
$ git config --global --unset http.proxy
```


### github

`raw.githubusercontent.com` ping 不通

> Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed

修改 host 

```
185.199.108.133 raw.githubusercontent.com
```
