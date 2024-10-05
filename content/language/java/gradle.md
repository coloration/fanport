


---
title: gradle
---

## install

1. download zip files & unzip

- <https://gradle.org/releases/>

2. 配置环境变量

- `PATH\gradle\bin` -> 环境变量

3. check

``` bash
$ gradle --version

# Welcome to Gradle 7.6!
# ...
```

## startup

### 1. 新建项目

``` bash
$ gradle init
## 弹出命令行交互界面进行选择
```

<ToggleContent title="交互界面">

``` bash
# Select type of project to generate:
#   1: basic
#   2: application
#   3: library
#   4: Gradle plugin
# Enter selection (default: basic) [1..4] 2

# Select implementation language:
#   1: C++
#   2: Groovy
#   3: Java
#   4: Kotlin
#   5: Scala
#   6: Swift
# Enter selection (default: Java) [1..6] 3

# Split functionality across multiple subprojects?:
#   1: no - only one application project
#   2: yes - application and library projects
# Enter selection (default: no - only one application project) [1..2]

# Select build script DSL:
#   1: Groovy
#   2: Kotlin
# Enter selection (default: Groovy) [1..2]

# Generate build using new APIs and behavior (some features may change in the next minor release)? (default: no) [yes, no]
# Select test framework:
#   1: JUnit 4
#   2: TestNG
#   3: Spock
#   4: JUnit Jupiter
# Enter selection (default: JUnit Jupiter) [1..4]
# 
# Project name (default: learn-gradle): startup
# Source package (default: startup): me.binyu
```


</ToggleContent>


### 运行项目

``` bash
$ gradle run
```


### 安装依赖

TODO




## 配置镜像源

TODO

## 打包项目

``` bash
$ gradle clean build
```