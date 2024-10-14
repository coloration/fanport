---
title: threejs
---

## startup

### 安装依赖 

``` bash
$ npm i three
$ npm i @types/three -D
```

### 初始化场景

``` ts
import { AxesHelper } from 'three'

const renderer = MainRenderer.instance
const camera = MainCamera.instance
const scene = MainScene.instance

const axes = new AxesHelper(20)
scene.add(axes)

camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

renderer.render(scene, camera)
```


## three 应用体系

拥有 `几何形状(geometry)` 和 `材质(meterial)` 的 `网格(mesh)` 才能正确显示。还需要在场景中添加环境光

``` bash
three
|- scene
|   |- * props
|   |   |- children:mesh[], 
|   |   
|   |- mesh(object)
|   |   |- * props
|   |   |   |- position: Vector3
|   |   |   |- rotation{x, y, z}
|   |   |
|   |   |- geometry
|   |   |   |-* props
|   |   |       |- vertice:Vector3[]
|   |   |       |- face:Face3[]
|   |   |     
|   |   |- meterial
|   |       |- * props
|   |       |   |- color:Color
|   |       |- shader
|   |       |- texture
|   |   
|   |- light
|   
|- camera
|   |- * props
|       |- position:Vector3
|       |- lookAt(Vector3)
|   
|- renderer
    |- * props
        |- render(scene, camera)
```

## 核心功能的单例实现

``` ts
export class Util {
    static fullWidth = globalThis.innerWidth
    static fullHeight = globalThis.innerHeight
    static screenRatio = Util.fullWidth / Util.fullHeight
}
```

### 场景

```ts
import { Scene } from 'three'

export class MainScene extends Scene {
    private static ins: MainScene
    static get instance () {
        return MainScene.ins || (MainScene.ins = new MainScene())
    }

    private constructor() {
        super()
    }
}
```

### 透视相机

``` ts
import { PerspectiveCamera } from 'three'

export class MainCamera extends PerspectiveCamera {
    private static ins: MainCamera
    static get instance () {
        return MainCamera.ins || (MainCamera.ins = new MainCamera())
    }

    private constructor() {
        super(45, Util.screenRatio, 0.1, 1000)
    }
}
```

### 渲染器

``` ts
import { WebGLRenderer } from 'three'

export class MainRenderer extends WebGLRenderer {
    private static ins: MainRenderer
    static get instance () {
        return MainRenderer.ins || (MainRenderer.ins = new MainRenderer())
    }

    private constructor() {
        super()
        this.setClearColor(0x000000)
        this.setSize(Util.fullWidth, Util.fullHeight)
    }
    
    mount() {
        document.body.appendChild(this.domElement)   
    }
}
```

## 常用工具

- 预览模型 <https://gltf-viewer.donmccurdy.com/>
- 免费模型 <https://polyhaven.com/>
- 材质资源 <http://blendermada.com/>