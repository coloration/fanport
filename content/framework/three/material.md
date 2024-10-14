---
title: 材质 
---

## 添加图片纹理

e.g. 为球体添加图片纹理

``` ts
import { TextureLoader, MeshStandardMaterial, SphereGeometry, Mesh } from 'three'

const txLoader = new TextureLoader()

// 加载贴图
txLoader.loadAsync('/texture/path.jpg')
.then(tx => {
    const mat = new MeshStandardMaterial({
        map: tx
    })
    const geo = new SphereGeometry(3, 20, 20)
    const mesh = new Mesh(geo, mat)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)
})
.then(render)
```
### 凹凸贴图

``` ts
mat.bumpMap = txLoader.load('/texture-bump/path.jpg')
mat.bumpScale = 0.5
```

- 凹凸贴图只包含像素的相对高度，没有倾斜方向信息
- bumpScale: 正数代表高度，负数代表深度。范围(-1, 1)


### 法相贴图

``` ts
mat.normalMap = txLoader.load('texture-normal/path.jpg')
mat.normalScale.set(2, 2.5)
```

- normalScale(x, y) 用来指定凹凸程度，为负数高度就会翻转



### 位移贴图


``` ts
mat.displacementMap = txLoader.load('texture-displacement/path.jpg')
```

- 移位贴图则能够根据贴图的内容，真正改变模型的形状。
- 贴图中越亮的部分会使顶点位移越远
- 位移贴图需要模型有大量顶点，否则其顶点移位效果看起来会与移位贴图并不相像。这是因为顶点过少的模型没有足够的顶点可以移动。


### 环境光遮挡贴图

``` ts
const mat = new MeshStandardMaterial({
    aoMap: txLoader.load('texture-aomap/path.png'),
    aoMapIntensity: 2
})
```
- 环境光遮挡贴图的作用是指出模型上哪些部分处于阴影中，应该从环境光中接受较少的光照。
- aoMapIntensity: 来指定环境光遮挡贴图的影响程度。

### 光照贴图

``` ts

```

- 实现静态阴影


### 金属光泽度、粗糙度贴图

### Alpha贴图

### 自发光贴图

### 高光贴图

## UV