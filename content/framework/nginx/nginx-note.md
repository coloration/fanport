---
title: nginx 笔记
date: 2018-06-28
tag:
- nginx
---

## 安装

``` bash
$ vi /etc/yum.repos.d/nginx.repo
```

``` bash
# nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0 # 不检查 gpg
enabled=1  # 默认开启
```

``` bash
$ yum install nginx -y
# 浏览器访问IP即可
```

``` bash
# 测试配置
$ nginx -t 

# 启动
$ systemctl start nginx
$ systemctl enable nginx

# 重启
$ systemctrl reload nginx
```

## 配置

`/etc/nginx/nginx.conf`


|directive|desc|
|:---:|:---|
|`user [user] [group]?`|运行 nginx 的用户和群组|
|`worker_processes [count]`|工作进程的数量（一般设置为服务器CPU的核心数量）|
|`error_log [dir] [level]`|设置错误日志: <br> - dir: /var/log/nginx/error.log <br>- level: warn, debug, info, notice, error |
|`pid  [dir]` |保证主进程的进程id文件虽在位置 <br> - dir: /var/run/nginx.pid |


### events

|directive|desc|
|:---:|:---|
|`worker_connections [count]`|一个工作进程可以接受连接的数量|

### http

|directive|desc|
|:---:|:---|
|`include [dir]`|引入其他配置文件 <br> - dir: /etc/nginx/mime.types, /etc/nginx/conf.d/*.conf|
|`default_type [type]`|默认文件处理方式(如果 mine.types 中没有定义) <br> - type: application/octet-stream<二进制>|
|`log_format [format_log_name] [format]`|设置日志格式|
|`access_log [dir] [format_log_name]`|指定访问日志的位置|
|`send_file [switch]`|是否使用这种优化过的方法传输数据<br> - switch: on, off|


mine.types 定义文件类型，告诉浏览器该如何处理次文件


### server 虚拟服务器

|directive|desc|
|:---:|:---|
|`listen [port]`|监听端口号|
|`server_name [name] [name]? ..`|该服务器绑定的主机名，决定是否用此服务器接待用户|
|`location [url_pattern] [setting]`||

### server.location 访问区域

|directive|desc|
|:---:|:---|
|`root [dir]`|资源存放目录|
|`index [dir]`|默认打开的页面|
|`return [状态码]`||
|`proxy_pass [url]`|反向代理地址，<br>反向代理：收到用户请求的时候会断开连接，再把这个请求发送到其他的服务器去处理|
|`proxy_set_header [key] [value]`||
|`try_files [param]`||


### 反向代理时传递真实IP

```
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```


### 403 for forbidden

``` bash 
$ getenforce 
# 如果是 Disabled 可能是其他权限引起的，如果不是[eg:Enforincing]就修改这个selinux配置
# chcon -Rt httpd_sys_content_t [访问路径]
```
http://www.ha97.com/4336.html

https://www.barretlee.com/blog/2016/11/19/nginx-configuration-start/


### 配置二级域名

1. 在运营商处未二级域名添加解析(多个二级域名解析到同一个 ip 即可)
2. 在nginx server 模块中添加配置 `server_name  2.yourdomain.top two.youdomain.cc;`