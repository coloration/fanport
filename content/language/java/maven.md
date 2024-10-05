---
title: maven
---

## install

maven 不随java一同安装

1. download zip files & unzip

- <https://maven.apache.org/download.cgi>

2. 配置环境变量

- `PATH\maven\bin` -> 环境变量

3. check

``` bash
$ mvn --version

# Apache Maven 3.8.7 (b89d5959fcde851dcb1c8946a785a163f14e1e29)
# Maven home: PATH\dev\maven
# ...
```

## startup

1. 新建项目

``` bash
$ mvn archetype:generate -DgroupId=<package name> -DartifactId=<project name> -DarchetypeArtifactId=<template id> -Dversion=<version>
# groupId: com.json
# artifactId: test
# archetypeArtifactId: maven-archetype-quickstart
# version: 0.0.1

## e.g.

$ mvn archetype:generate -DgroupId=me.binyu -DartifactId=test -DarchetypeArtifactId=maven-archetype-quickstart -Dversion=0.0.1
```


### 安装依赖

https://mvnrepository.com





## 配置镜像源

