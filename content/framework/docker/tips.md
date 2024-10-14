---
title: Docker Tips
---

### Windows 启动 docker 后显示 Docker Engine stopped

<https://www.cnblogs.com/jokingremarks/p/18156334>


### ubuntu 安装 Docker

ref: <https://zhuanlan.zhihu.com/p/651148141>

``` bash
# 卸载之前版本
$ sudo systemctl stop docker
$ sudo apt-get remove docker docker-engine docker.io containerd runc

# 更新你的系统软件包索引：
$ sudo apt update

# 确保系统上已经安装前置
$ sudo apt install ca-certificates curl gnupg lsb-release

# 添加 Docker 官方的 GPG 密钥以确保你下载的 Docker 包的合法性(aliyun 源)
$ curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -


# 添加docker 软件源
$ sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

# 更新系统的包索引并安装 Docker
$ sudo apt update
$ sudo apt install docker-ce docker-ce-cli containerd.io

# 验证
$ sudo docker --version

# 安装工具
$ apt-get -y install apt-transport-https ca-certificates curl software-properties-common
```

## 设置 docker 自动启动

``` bash
sudo systemctl start docker
sudo systemctl enable docker
```

## 本地构建镜像，部署离线镜像

``` bash
$ docker-compose build
$ docker save -o zlmediakit.tar zlmediakit/zlmediakit:master
$ docker save -o ms-web-service.tar media-server-ms-web-service:latest

## zlmediakit.tar ms-web-service.tar 以及 docker-compose.yml 上传到目标服务器

$ docker load -i ms-web-service.tar
$ docker load -i zlmediakit.tar

$ docker-compose up -d
```