---
title: Babylon Layer
date: 2024-05-28
---

### 全局辉光效果

``` ts
const glowLayer = new BABYLON.GlowLayer('glow', scene)
glowLayer.intensity = 0.3
```

### 默认所有物体不发光

``` ts
glowLayer.customEmissiveColorSelector = function (_mesh, _subMesh, _mat, result) {
      result.set(0, 0, 0, 0)
    }
```

#### 剔除指定网格辉光 

``` ts
glowLayer.addExcludedMesh(mesh)
```

- Refs
  - 辉光动画: https://playground.babylonjs.com/#7QCYPB


#### 根据自身材质发射辉光

``` ts
glowLayer.referenceMeshToUseItsOwnMaterial(mesh)
```


### 指定模型辉光

``` ts
const highlightLayer = new BABYLON.HighlightLayer('highlightLayer', scene)

// 只对立方体应用辉光效果
highlightLayer.addMesh(box, BABYLON.Color3.Red());

// 删除辉光效果
highlightLayer.removeMesh(box)
``` 