---
title: Visual Studio Code 配合 Unity3D
date: 2017-02-07
updated: true
tag:
- unity3d
- vscode
---

> 2017.7.13 更新支持 `.lua.txt` 语法高亮

[官方参考](http://code.visualstudio.com/Docs/runtimes/unity) 

### windows
需要安装

[Microsoft .NET Core](https://www.microsoft.com/net/download/core)
[Microsoft .NET Framework 3.5 SP1](https://www.microsoft.com/net/download/framework)

ps:  `.NET Framework 3.5`  安装时需要保证 window update 开启。否则更新不成功。window10 下开启 window update 方法：按 `WIN + r` 打开运行，输入 `services.msc` 回车。找到 “Windows update”。

### OSX

需要安装

[Mono](http://www.mono-project.com/download/#download-mac) 跨平台的 .NET 框架。
homebrew: 打开终端执行 `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 
[dotnet cli](https://github.com/dotnet/cli)

ps: 后来发现安装 homebrew 是为了更好地安装 dotnet cli。

### 通用

使用 VSCode 写 Unity 时，需要为 **每一个** unity 项目单独配置一下，在项目的 `Assets` 目录下新建 `Plugins/Editor` 文件夹，将下载的 [VSCode.cs](https://raw.githubusercontent.com/dotBunny/VSCode/master/Plugins/Editor/VSCode.cs) 脚本文件放到这个目录下。重启一下 Unity。在 `Preferences...` 中（OSX 下的 Unity 选项卡，Windows 下的Edit选项卡）。
![Z5(`{E9{L%WLRPE(85}0V_E.png](http://upload-images.jianshu.io/upload_images/711226-db6535159d5adae6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

勾选六项。再次开启 unity 时就会自动启动 VSCode。根据 VSCode 控制台的（报错）信息  。去下载上方提到的几种前置。

## 支持 .lua.txt

1. 安装 lua 扩展
2. 在设置中添加配置项

``` javascript
// 首选项 - 设置 - settings.json
{
  // ...
  "files.associations": {
    "*.lua.txt": "lua"
  }
}
```

windows 如果双击文件不打开 vscode，尝试勾选掉 Unity Preferences/VSCode 中的 enable Integration



## 插件

- C#：VSCode 下的 C# 语法支持
- Unity Snippets: 提供一些语法片段
- C# Extensions: 语法快捷扩展

## 设置
``` json
// settings.json
{
  "editor.fontSize": 18,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "editor.rulers": [ 80, 100 ],
  // "editor.renderWhitespace": "boundary",

  "files.autoGuessEncoding": true,
  "files.autoSave": "onWindowChange",
  "files.defaultLanguage": "zh-cn",

  "markdown.preview.fontSize": 18,
  "extensions.autoUpdate": true,

  "workbench.colorTheme": "Material Theme",
  "workbench.iconTheme": "vs-seti"
}


```

## 异常问题

1. 编辑器启动报错：OmniSharp.MSBuild.ProjectFile.ProjectFileInfo The reference assemblies for framework ".NETFramework,Version=v2.0" were not found.
电脑中包含多个版本的 mono
解决方案：`brew unlink mono; brew link mono`，
惨嚎链接：https://github.com/OmniSharp/omnisharp-vscode/issues/1004