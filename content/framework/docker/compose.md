---
title: Docker Compose
index: Framework.Docker.Practice
---

# docker-compose 

Compose 是用于定义和运行多容器 Docker 应用程序的工具

## Install

``` bash
# 查看最新版本
$ curl --silent https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*\d'


# 下载https://github.com/docker/compose/tags
$ curl -L https://github.com/docker/compose/releases/download/x.xx.x/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

# 太慢 host 换成get.daocloud.io
$ curl -L https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

# 执行权限
$ chmod +x /usr/local/bin/docker-compose
```

## Uninstall

``` bash
$ sudo rm rf /usr/local/bin/docker-compose
```

#### docker-compose 常用命令

``` bash
# 构建镜像  
# production.yml 中的 services 名称 [IMAME_NAME]
# 修改端口也要重新构建镜像
$ docker-compose -f production.yml build [IMAME_NAME]

# 启动服务
$ docker-compose -f production.yml up -d

# 重新构建并启动服务
$ docker-compose up -d --build

# 查看状态
$ docker-compose ps

# 查看日志
$ docker-compose -f production.yml logs [IMAME_NAME]
```


#### demo


``` yaml
# ports:
#  - 外部端口:内部端口 
version: "3.7"

services:

  saas-service:
    build: ./server
    container_name: saas-service
    restart: always
    networks:
      - saas-network
    environment:
      - APP_NAME=saas-serivce
      - DEV=False
      - DEBUG=False
      
      # use container inner port
      # https://stackoverflow.com/questions/55523273/why-container-cant-request-to-another
      - MEDIA_SERVICE_RESTFUL_API_URL=http://media-service:80/index/api
    ports:
      - 5678:5678
  media-service:
    image: panjjo/zlmediakit
    container_name: media-service
    restart: always
    ports:
      - 1935:1935 
      - 8080:80 
      - 8554:554 
      - 10000:10000 
      - 10000:10000/udp
    networks:
      - saas-network
  saas-website:
    build: ./client
    container_name: saas-website
    ports:
      - 80:80
    networks:
      - saas-network
  # db:
  #   image: postgres
  #   networks:
  #     - saas-network

networks:
  saas-network:
```


e.g.

``` yaml
version: '3'

services: 
  bitnami_postgres:
    image: 'bitnami/postgresql:latest'
    ports: 
      - 5432:5432
    restart: always
    environment: 
      POSTGRESQL_PASSWORD: '123456'
    networks:
      - app-tier
    volumes: 
      - ./volumes:/bitnami/postgresql
  pgadmin4:
    image: 'dpage/pgadmin4:latest'
    restart: always
    ports:
      - 8080:80
    depends_on: 
      - bitnami_postgres
    environment: 
      PGADMIN_DEFAULT_EMAIL: 'pgadmin@gmail.com'
      PGADMIN_DEFAULT_PASSWORD: '123456'
    networks: 
      - app-tier

networks: 
  app-tier:
    driver: bridge
```