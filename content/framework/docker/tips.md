---
title: Docker Tips
---

### Windows 启动 docker 后显示 Docker Engine stopped

REF: <https://www.cnblogs.com/jokingremarks/p/18156334>

1. 检查自己系统是不是内置了虚拟机

2. 检查CPU是否开启虚拟化
  - 任务管理器 - 性能 - CPU - 虚拟化
  - 进入BIOS开启虚拟化
  - 控制面板-程序-程序和功能-启用或关闭Windows功能-勾选 Hyper-V 


3.是否启动了Docker Desktop Service服务

``` bash
$ net start com.docker.service

# Docker Desktop Service 服务正在启动 .
# Docker Desktop Service 服务已经启动成功。
```

4.wsl安装及版本更新

``` bash
$ wsl --update

# 正在检查更新。
# 正在将适用于 Linux 的 Windows 子系统更新到版本： 2.3.24。
```

5.启动docker daemon


``` bash
$ cd "C:\your\docker\path\Docker"
Docker$ .\DockerCli.exe -SwitchDaemon

```

6.管理员启动docker desktop

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


### cenOS 安装 Docker


``` bash
# 1. 更新系统
$ sudo yum update -y

# 2. 卸载旧版本
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine

# 3. 设置 Docker 仓库
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 4. 安装 Docker 引擎
sudo yum install docker-ce docker-ce-cli containerd.io -y
```


## CentOS 安装 Docker Compose

``` bash
# 1.安装Python

# 2.使用pip安装docker-compose
$ sudo pip3 install docker-compose
```


## linux 设置 docker 自动启动

``` bash
sudo systemctl start docker
sudo systemctl enable docker
```

## 修改 docker 镜像源

``` bash
# linux
$ vi /etc/docker/daemon.json



{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}

$ systemctl daemon-reload
$ systemctl reload docker


# windows 在客户端中修改 
```


## 本地构建镜像，部署离线镜像

``` bash
$ docker-compose build
$ docker save -o zlmediakit.tar zlmediakit/zlmediakit:master
$ docker save -o ms-web-service.tar media-server-ms-web-service:latest

## zlmediakit.tar ms-web-service.tar 以及 docker-compose.yml 上传到目标服务器
$ scp -r ./ user@192.168.1.100:/path/to/remote/directory

$ docker load -i ms-web-service.tar
$ docker load -i zlmediakit.tar

$ docker-compose up -d
```



- [docker-slim - 一个 Docker 镜像文件的瘦身工具，据称最好情况下，可以让镜像文件体积缩小为原来的30分之一。](https://github.com/docker-slim/docker-slim)
- [如何将 Web 应用做成 Docker？](https://itnext.io/dockerizing-modern-web-apps-cd9667eebf44)
- [一篇简短扼要的教程，如何使用 Docker Compose 很方便地安装 PostgreSQL。](https://www.brock.sh/docker-compose-postgresql/)
- [如何在主机和 Docker 容器之间复制文件 - 软件以 Docker 容器发布的情况越来越多，docker cp命令可以在容器内外复制文件。](https://linuxhandbook.com/docker-cp-example/)
- [云原生技术公开课 - 本课程由阿里云和CNCF联合开发，课程全程免费且无需注册，主要介绍容器和 kubernetes。](https://edu.aliyun.com/roadmap/cloudnative?from=timeline)
- [Kubernetes 中文指南 - 本书是第一本系统整理的开源中文版 Kubernetes 参考资料，记录了本人从零开始学习和使用 Kubernetes 的历程，着重于总结和资料分享，同时也会有相关的概念解析](https://jimmysong.io/kubernetes-handbook/)
- [Docker 镜像构建教程：减小镜像体积](https://fuckcloudnative.io/posts/docker-images-part1-reducing-image-size/)
- [k8s YAML 生成器](https://k8syaml.com/)