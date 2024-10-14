
## 快捷键


||version||
|:---:|:---:|:---|
|`f12`||查找定义|
|`shift + alt + f12`|[1.29.1](https://code.visualstudio.com/updates/v1_29#_references-view)|查找所有引用，在列表界面使用 `f4` 下移, `shift + f4` 上移|



## 配置项
  

- window.nativeFullScreen: [1.29.1](https://code.visualstudio.com/updates/v1_29#_macos-full-screen-support) macOS 全屏特性
- workbench.editor.highlightModifiedTabs [1.29.1](https://code.visualstudio.com/updates/v1_29#_highlight-modified-tabs)  true 新增的修改区域的左侧会出现边框

- breadcrumbs.symbolSortOrder [1.29.1](https://code.visualstudio.com/updates/v1_29#_symbol-order-in-breadcrumbs) 控制“导航路径”大纲视图中符号的排序方式。
  - position - 文件位置 (default)
  - name - 字母顺序
  - type - 符号类型
- "files.autoSave": "onFocusChange" 自动保存


**Note:**不能打开文件夹

> foo/ is a directory and rmate is unable to handle directories.

参考
- <https://www.cnblogs.com/learn21cn/p/6189023.html>
- <https://raw.githubusercontent.com/aurora/rmate>

### 本机

1. vscode 安装 Remote VSCode 插件
2. 安装完后 `command + p` 输入 `> remote` 点击 `Remote Start Server`
3. 打开终端执行 `ssh -R 52698:localhost:52698 [远程主机用户]@[远程主机IP]` 
  
- 这里的端口改不了，好像写死在 shell 脚本里了
- windows 可以使用 [Cmder](http://cmder.net/) 代替终端 

### 远程服务器

``` bash
$ wget https://raw.githubusercontent.com/aurora/rmate/master/rmate
$ chmod +x ./rmate
$ mv ./rmate /usr/local/bin/

$ touch ~/foo.txt
$ rmate ~/foo.txt
```



## Error

2. 修改配置报错: Unable to write into user settings. Please open the user settings to correct errors/warnings in it and try again.

随后会打开用户设置，是因为文件内有格式错误需要检查