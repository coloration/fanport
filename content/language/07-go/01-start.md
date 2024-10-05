---
title: GO Start

---


### install 

#### windows 

1. 下载安装文件

homepage: <https://go.dev/>
  - 32位: go1.22.5.windows-386.msi
  - 64位: go1.22.5.windows-amd64.msi

#### linux 



#### docker



### create project


``` bash
$ mkdir go-app
$ cd go-app
go-app$ go mod init go-app
```


### change goproxy

``` bash
$ go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/
```


### install dependence

``` bash
$ go get github.com/gofiber/fiber/v2
```



### check dependence

``` bash
$ go mod tidy
```

### download dependence

``` bash
$ go mod download
```