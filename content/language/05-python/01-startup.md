---
title: Python startup
index: Language.Python.Snytax
---

[[toc]]

## Basic

### 安装Python

1. 手动下载安装python <https://www.python.org/downloads/>
2. test `python -V` in terminal

``` bash
$ python -V
## Python 3.12.0
```

### 创建项目


``` bash
# 新建目录
$ mkdir <project>
$ cd <project>

# init git
<p>$ git init

# gitignore

## windows powershell
<p>$ powershell Start-BitsTransfer -Source https://www.toptal.com/developers/gitignore/api/python -Destination .gitignore

## linux
<p>$ wget https://www.toptal.com/developers/gitignore/api/python -O .gitignore
<p>$ curl https://www.toptal.com/developers/gitignore/api/python -o .gitignore

# 创建虚拟环境
<p>$ python -m venv <venvName>

# 激活虚拟环境
## linux 
<p>$ source <venvName>/bin/activate

## windows
<p>$ <venvName>\Scripts\activate

## 安装依赖
<venvName>$ pip install numpy

## 保存依赖
<venvName>$ pip freeze > requirements.txt


## coding
<venvName>$ touch main.py

## run
<venvName>$ python main.py
```


refs:
- [Flask](/language/05-python/lib-flask)
- [gitignore](https://www.toptal.com/developers/gitignore/api/python)




### 使用项目

``` bash
$ git clone <github:project>
$ cd project

# 创建虚拟环境
<p>$ python -m venv <venvName>

# 激活虚拟环境（上面）

# 根据依赖文件安装依赖
<venvName>$ pip install -r requirements.txt
```


## Pip

- 查看版本 `pip -V`
- 升级pip `python -m pip install --upgrade pip` 
  * windows 需要管理员权限
- 查看安装的包 `pip list`
- 查看安装包版本号 `pip freeze`
- 生成依赖文件 `pip freeze > requirements.txt`
- 安装包 `pip install`
- 卸载包 `pip uninstall`
- 根据依赖文件安装依赖 `pip install -r requirements.txt`
- 切换源
  * 单切: pip install markdown -i https://pypi.tuna.tsinghua.edu.cn/simple
  * 全切: pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
  * 可用源
    - https://pypi.tuna.tsinghua.edu.cn/simple
    - https://mirrors.aliyun.com/pypi/simple
    - http://mirrors.cloud.tencent.com/pypi/simple
    - http://pypi.douban.com/simple




### Trouble Shooting 

> pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available.