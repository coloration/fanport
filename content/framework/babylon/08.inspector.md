---
title: Babylon Inspector 调试工具
date: 2024-05-27
---

### install

``` bash
$ npm i @babylonjs/inspector
```

``` ts
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'

// init scene

scene.debugLayer.show({
  handleResize: true,
  overlay: true,
})
```
