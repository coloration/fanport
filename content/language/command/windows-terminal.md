
## windows terminal 配置



### 1. 安装 windows terminal

> Windows terminal 可以集成系统下的各种shell, 从而更好控制他们的样式

**一般windows11都会自带** windows terminal. 如果没有去 `Microsoft Store` 搜索下载(`win`键，输入即可打开软件)

### 1. 安装 git bash 

> 提供 linux 命令, 也可以自己安装 `mingw64`

- <https://gitforwindows.org/> 下载软件，安装过程中有一步需要手动勾选 `添加到windows terminal`. 如果没勾选之后也可以手动加。



### 3. 安装 oh my posh 

> 用于美化 shell

- 打开 windows terminal（`win`键，输入 `terminal` 或者 `终端`）
- 输入 `$ winget install JanDeDobbeleer.OhMyPosh`

### 4. 设置主题


**Powershell**: 

打开 Powershell 或者用 Windows Terminal 打开Powershell

``` bash
$ vi $PROFILE
```

添加以下内容，并保存

> oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\M365Princess.omp.json | Invoke-Expression


如果修改完配置文件后再次打开powershell报错。

> 无法加载文件 C:\Users\Administrator\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1，因为在此系统上禁止运行脚本


用管理员权限运行 powershell, 输入命令修改执行策略

``` bash
$ get-ExecutionPolicy   # 查看系统执行策略状态
 
$ set-executionpolicy remotesigned # 修改执行策略状态
```


**Git Bash**:

打开 Git Bash, 编辑 `~/.bashrc` 没有则创建 

``` bash
~$ touch .bashrc
~$ vi .bashrc
```

> eval "$(oh-my-posh --init --shell bash --config ~/AppData/Local/Programs/oh-my-posh/themes/M365Princess.omp.json)"


**Note:** windows terminal 会运行 `.profile` 但有的版本的 git bash 只会运行 `.bashrc`


### 5. 在windows系统中安装兼容字体

设置完主题后，会出现乱码。这时需要安装兼容字体

- <https://www.nerdfonts.com/font-downloads> 找一个喜欢的字体下载
- 打开字体设置(`win`键，输入`字体设置`), 点击浏览并安装字体，按住shift添加所有同名字体。安装完后在下方字体列表中找到字体的名字(字体数量上面的一排小字，我用的是 `SauceCodePro Nerd Font`) 
- 如果没有安装按钮，或拖拽字体文件无效。则去`控制面板\外观和个性化\字体`将所有字体文件拖入。


### 6. 配置 windows terminal

- `windows terminal` 上方标题栏向下箭头打开 `设置` - 左下方 `打开 JSON 文件`

- `在 profiles`下方添加

  ``` js
  {
    "profiles": {
      "deafults": { // 适用于下方list中的所有终端
        "font": 
        {
            "face": "SauceCodePro Nerd Font" // 刚才安装的字体名字
        },
        "opacity": 80, // 背景透明度
        "useAcrylic": true, // 背景模糊
        "startingDirectory": "C:/Users/code/", // 终端启动位置
      }, 
      "list": [
        { // 自带 powershell
          "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
          "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
          "hidden": false,
          "name": "Windows PowerShell"
        },
        { // 自带 cmd
          "commandline": "%SystemRoot%\\System32\\cmd.exe",
          "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
          "hidden": false,
          "name": "\u547d\u4ee4\u63d0\u793a\u7b26"
        },
        { // 安装完 git bash 自动添加的，如果没有选择添加到 terminal, 则需要手动添加下面一行，代替 guid
          // "commandline": C:/Users/software/tool/Git/bin/bash.exe",
          "guid": "{2ece5bfe-50ed-5f3a-ab87-5cd4baafed2b}",
          "hidden": false,
          "name": "Git Bash",
          "source": "Git"
        }
      ]
    }
  }
  ```

- 将 windows terminal 默认启动改为 git bash. `设置` - `启动` - `默认配置文件` 下拉选择 git bash


这样关闭terminal 再重新启动就成功了。


### 配置 git bash 字体

安装完 `oh-my-posh` 后 git bash 样式也会被修改，出现的文字乱码需要设置一下字体

右击`标签栏` - 点击 `options` - 点击 `Text` 选项 - 选择 `Font` 下的 `Select ...` 按钮选择字体. 选择之前下载安装的字体（我用的是 `SauceCodePro Nerd Font`）


### 配置 vscode 终端

打开 VSCode, `ctrl` + `~` 打开终端窗口， 右上角下拉框中选择，`select default profile`。选择 `git bash`. 

如果没有 Git Bash 选项打开用户设置（`ctrl` + `shift` + `p` => `Open User Setting (JSON)`）添加以下配置 

``` json
{
  "terminal.integrated.profiles.windows": {
    "GitBash": {
        "path": "D:/software/Git/bin/bash.exe"
    },
  },
  "terminal.integrated.defaultProfile.windows": "GitBash",
}
```

打开用户设置,搜索 `Terminal › Integrated: Font Family` 填写之前安装的字体名, 或者再user setting 中添加

``` json
{
  "terminal.integrated.fontFamily": "SauceCodePro Nerd Font",
}
```

### refs

- https://www.bilibili.com/video/BV1Qa411T7Au/?spm_id_from=333.880.my_history.page.click&vd_source=9d9240f26d3b2cc94a997061dd650e18
- https://blog.csdn.net/qq_33154343/article/details/120661945
