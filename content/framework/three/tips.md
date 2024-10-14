---
title: tips

---

## 自适应屏幕

``` ts
globalThis.addEventListener('resize', function () {
    camera.aspect = globalThis.innerWidth / globalThis.innerHeight
    camera.updateProjectionMatrix() // 防止窗口改变时，图像拉伸

    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight)
})
```

## 背景透明

``` ts
rendererInstance.setColorAlpha(0)
```

## 覆盖场景的所有对象的材质

```ts
scene.overrideMaterial = new MeshLambertMaterial({ color: 0xff0000 }) 
```

## 场景添加雾化效果

``` ts
scene.fog = new FogExp2(0xffffff, 0.01)
```

## 加载模型(gltf)


**Note:**

- 加载资源需要服务器环境
- gltf模型是自带场景的，其内部的材质资源引用路径都是相对路径。

``` ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()

loader.loadAsync('your/model/path.gltf')
.then((model) => {
    modelScene = model.scene
    modelScene.position.set(0, 0, 0)
    // 根据不同的模型进行调整
    modelScene.scale.set(10, 10, 10)
    
    scene.add(modelScene)
})
.then(() => {
    // 添加灯光才能看到模型
    scene.add(new AmbientLight(0xffffff))
    
    renderer.render(scene, camera)
})
```

## 播放模型骨骼动画

``` ts
import { AnimationMixer } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
let mixer: AnimationMixer | null = null
loader.loadAsync('/robot.gltf')
.then(model => {
    model.scene.scale.set(5, 5, 5)
    model.scene.position.set(0, 0, 0)
    model.scene.rotateY(Math.PI / -4)
    scene.add(model.scene)

    
    mixer = new AnimationMixer(model.scene)

    // 将模型动画添加到动画混合器中
    model.animations.forEach((animation, i) => {
        mixer!.clipAction(animation).play()
    })
})


const clock = new Clock()

function render() {
    
    if (mixer) {
        const delta = clock.getDelta()
        mixer.update(delta)
    }

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}
```

## 使用 tween.js 制作简单动画

``` ts
import { Tween, update } from '@tweenjs/tween.js'

const tween = new Tween({ index: 0 })
    .to({ index: Math.PI * 2 }, 5000)
    .onUpdate((t) => {
        const direction = Math.cos(t.index) > 0 ? -1 : 1

        model.scene.position.set(Math.sin(t.index) * -15, 0, 0)
        model.scene.rotation.set(0, Math.PI / 2 * direction, 0)
    })
    .repeat(Infinity)

    tween.start()


function render() {
    
    update()
   

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

render()
```

## 修改模型材质透明度

``` ts
const h = 20
const geometry = new CylinderGeometry(15, 15, 20, 32)
// 中心在底部
geometry.translate(0, h/2, 0)

const material = new MeshBasicMaterial({ color: 0xFFFFFF*Math.random() })
// 设置透明
material.transparent = true
material.opacity = 0.5

const cylinder = new Mesh(geometry, material)
```

## 修改模型高度

``` ts
const h = 20
const geometry = new CylinderGeometry(15, 15, h, 32)
// 中心在底部
geometry.translate(0, h/2, 0)

const material = new MeshBasicMaterial({ color: 0xFF0000 })

const cylinder = new Mesh(geometry, material)

const newGeometry = new CylinderGeometry(15, 15, h + 20, 32)
// 中心在底部
newGeometry.translate(0, (h + 20)/2, 0)

// 替换
cylinder.geometry = newGeometry
```