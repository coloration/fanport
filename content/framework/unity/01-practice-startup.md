---
title: Startup 2023
---

## Download

- 下载 Unity Hub <https://unity.cn/releases>

使用 Unity Hub 管理`项目`和 `Unity UnityEngine 版本`

- 偏好设置
  - `项目` 设置创建项目的位置
  - `安装` 可以设置 UnityEngine 的安装位置

## 创建项目

`Unity Hub` - `项目`(`新项目`) - `所有模版` - `3D/2D/...`(`创建项目`)

## 用 Unity Editor 打开项目

`Unity Hub` - `项目`(`双击项目条目`)

## 编写代码

1. 在 `Assets` 下新建 `Scripts` 目录，右键 `Create` - `C# Script` 创建C#脚本 `HiUnity.cs`

添加代码

``` csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HiUnity : MonoBehaviour {
    void Start() {
      // 添加此行代码
      Debug.Log("Hello Unity~");
    }

    void Update() {
        
    }
}

```


2. `Unity Editor` - `Hierarchy 面板`(`右键创建物体`)



3. 点击创建的物体，点击 `Inspector 面板` 中的 `Add Component` 按钮. 搜索刚才创建的脚本名 `HiUnity`

4. 点击 Unity Editor 上方中间的play按钮. 可在控制台查看 Log 信息


## 版本控制

.gitignore: <https://github.com/github/gitignore/blob/main/Unity.gitignore>