---
title: Command
index: Framework.Docker.Syntax 
---



# Docker

## Startup

### 1. CentOS

#### Install

``` bash
$ curl -fsSL https://get.docker.com/ | sh

$ systemctl start docker

# 开机启动
$ systemctl enable docker
```

#### Uninstall

``` bash
# 列出包含docker字段的软件的信息
$ rpm -qa | grep docker

$ yum remove <list>
# e.g.
$ yum remove docker-ce-cli.x86_64 1:19.03.5-3.el7
```

#### Upgrade

1. Uninstall 
2. Install

## 修改 docker 镜像源

``` bash
$ vi /etc/docker/daemon.json

{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}

$ systemctl daemon-reload
$ systemctl reload docker
```

## 镜像 Image

### 搜索远程镜像 


- <https://hub.docker.com/>

``` bash
$ docker search <image_name> 

# e.g. 

$ docker search centOS

# NAME                               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
# centos                             The official build of CentOS.                   6503      [OK]
# ansible/centos7-ansible            Ansible on Centos7                              133                  [OK]
# consol/centos-xfce-vnc             Centos container with "headless" VNC session…   128                  [OK]
# jdeathe/centos-ssh                 OpenSSH / Supervisor / EPEL/IUS/SCL Repos - …   117                  [OK]
# centos/systemd                     systemd enabled base container.                 97                   [OK]


$ docker search nginx --filter "is-official=true"
$ docker search nginx --limit 100
```

### 查看本地镜像

``` bash
$ docker images

# e.g. 
# 只会返回悬虚镜像
$ docker images --filter dangling=true 
# REPOSITORY TAG     IMAGE ID      CREATED     SIZE
# <none>     <none>  4fd34124afe0  7 days ago  14.5MB
```

> 悬虚镜像（dangling image）：新构建的镜像与旧镜像同名，导致旧镜像被覆盖变成`<none>:<none>`

### 拉取远程镜像

``` bash
$ docker pull <repository>(:<tag>)

# e.g.
$ docker pull node:20-alpine
$ docker pull nginx:1.27.1-alpine
$ docker pull mongo:latest
$ docker pull alpine # 不指定则拉取 latest
# e.g. 拉取非官方审查的镜像
$ docker pull microsoft/powershell:nanoserver 
$ docker pull microsoft/dotnet:latest
```



### 创建镜像 

#### 1. Dockerfile

``` bash
$ mkdir <image_dir>
$ cd <image_dir>
<image_dir> $ vi Dockerfile 

### EDIT Dockerfile

$ docker build [--tag <namespace>/<image_repository>:<tag>] <dockerfile_path>


### e.g. 根据本地创建镜像 

$ docker build -t (--tag) <image_name> <dockerfile_path>
$ docker build -t benxi-silo-saas-server .

$ docker run -p 3001:3000 benxi-silo-saas-server
```




#### 2. 手动

``` bash
$ docker commit -m <commit_message> \
                -a <author> <container_name | container_id> \
                <namespace>/<image_repository>:<tag>
```

### 删除镜像

在镜像上启动的容器全部停止之前，镜像无法被删除

``` bash
## 删除所有使用该镜像的容器
$ docker rm <container_id> | <container_name>
$ docker rmi <image_repository> | <image_id>

## 删除所有悬虚镜像
$ docker image prune -a
$ docker image prune -a -f 

## 删除异常停止的镜像
docker rm `docker ps -a | grep Exited | awk '{print $1}'`

## 删除名称或标签为none的镜像
docker rmi -f  `docker images | grep '<none>' | awk '{print $3}'` 
```

### 推送镜像 

``` bash
$ docker login
$ docker push <namespace>/<image_repository>
```


## 容器 Container

### 启动容器(运行镜像)

``` bash
## first time
$ docker run [--name <container_name>] <image_name> [<cmd>]

## later 
$ docker start <container_name | container_id>


## 交互容器
$ docker run --interractive | -i <image_name> <path>


## e.g. 
$ docker run -i centos /bin/bash
[root <container_id>]\# exit
$

## 挂起
$ docker run --detach | -d run centos [<cmd>]

e.g.
$ docker run --name ping_baidu -d centos ping baidu.com
$ docker logs --follow ping_baidu
$ docker stop ping_baidu

```

### 查看容器

``` bash
$ docker ps ## 运行中
$ docker ps --all | -a 
$ docker ps --latest
```

### 查看容器日志

``` bash
$ docker logs <container_name | container_id>
```

### 停止容器 

``` bash
$ docker stop <container_name | container_id>
```

### 重启容器 

``` bash
$ docker restart <container_name | container_id>
```

### 删除容器

``` bash
$ docker rm <container_name | container_id>
```

### 进入容器并使用 sh

``` sh
$ docker exec -it <container_name | container_id> sh
## e.g.
$ docker exec -it mongo_db_service sh
```

### 退出容器 

`Ctrl` + `P` + `Q`

### 复制文件进入容器

``` sh
$ docker cp <local/file/path> <container_name | container_id>:<container/file/path>
## e.g.
$ docker cp ./dump/ mongo_db_service:/backup
```



