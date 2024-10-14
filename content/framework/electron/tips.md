---  
title: Electron tips
index: Framework.Electron.Practice
--- 

## electron 实现静默打印 

``` ts
// main 
const winprints = new BrowserWindow({ show: false });
    winprints.loadURL(`https://www.baidu.com`);
    winprints.webContents.on('did-finish-load', () => {
        return // 
        winprints.webContents.print({ silent: true, printBackground: true });
    });
```

- <https://github.com/electron/remote>
- electron-pos-printer: <https://juejin.cn/post/7003660906651451400>
- 使用electron静默打印: <https://www.jianshu.com/p/a71aa0ee15b1>

## 使用electron C/S架构

- electron-vite-template
- hono server
- zod 
- primas


## 镜像问题

搜索查看 `node` - `npm` 的镜像安装