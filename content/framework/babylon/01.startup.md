---
title: Babylon startup
---

### 用编辑器创建新项目
 
可以用编辑器创建，编辑器默认使用webpack构建应用。 

WIP

### 在web项目中开发
 
``` bash
$ npm create vite@latest babylon-demo -- --template vanilla-ts
# $ pnpm create vite babylon-demo --template vanilla-ts

$ cd babylon-demo
babylon-demo$ npm i @babylonjs/core --save # 7.2.1
``` 


``` ts
// main.ts

import * as Babylon from '@babylonjs/core'

const canvas = document.getElementById('canvas-window') as HTMLCanvasElement

const engine = new Babylon.Engine(canvas, true)

const scene = new Babylon.Scene(engine)

const camera = new Babylon.ArcRotateCamera(
  'camera', // name
  0, // alpha horizontal angle
  0, // beta vertical angle
  10, // radius
  Babylon.Vector3.Zero(), // look at
  scene
)

camera.attachControl(canvas, true)

const sphere = Babylon.MeshBuilder.CreateSphere(
  'sphere', // name
  { diameter: 2 }, // radius
  scene
)

// 半球光，防止暗部太黑 
const envLight = new Babylon.HemisphericLight(
  'env-light', // env light
  new Babylon.Vector3(1, 1, 0), 
  scene
)

const light = new Babylon.DirectionalLight(
  'light', // name
  new Babylon.Vector3(0, -1, 0), // direction
  scene
)

engine.runRenderLoop(() => {
  scene.render()
})

window.addEventListener('resize', () => {
  engine.resize()
})
```

### Module

| package name | description |
|:---|:---|
|@babylonjs/core | babylon的核心库，引入它就能让程序跑起来，下面的是功能补充的库|
|@babylonjs/materials | 集合了babylon官方提供的一组高级材质，提供更炫酷的效果|
|@babylonjs/loaders | 能够让babylon支持导入OBJ, STL, glTF等3d文件|
|@babylonjs/post-processes | 后期特效库，能够让场景展示电影级别的滤镜效果|
|@babylonjs/procedural-textures | babylon官方提供的一组纹理贴图，可以展示更酷的效果|
|@babylonjs/serializers | 能够把场景Scene和物体mesh等元素序列化成为json配置并导出.|
|@babylonjs/gui | 交互组件库，支持按钮、复选框、下拉列表等表单元素|
|@babylonjs/inspector | 对babylon的3d场景进行运行时调试，可详细记录并显示babylon甚至webGL的运行情况，非常|强大
|@babylonjs/viewer | Babylon查看器，几行代码就能让3d内容展示到网页上。|


### Inspector

WIP 调试工具

### Refs

- doc: <https://doc.babylonjs.com/>
- sandbox: <https://sandbox.babylonjs.com/>
- 节点材质编辑器: <https://nme.babylonjs.com/>
- playground: <https://playground.babylonjs.com/>
- editor: <https://editor.babylonjs.com/>
- 论坛: <https://forum.babylonjs.com/>
- cyos 着色器编辑器: <https://cyos.babylonjs.com/>
- SpectorJS - webGL 调试工具 chrome 插件: <https://chromewebstore.google.com/detail/spectorjs>
- babylon101: <https://doc.cnbabylon.com/2-0-first-steps/>