---
title: 摄像机
---



### 以摄像机目标为球心旋转摄像机

``` ts
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

const cameraControls = new TrackballControls(camera, renderer.domElement)

function renderScene() {
    // ...
    cameraControls.update()
    // ...
    renderer.render(scene, camera)
    requestAnimationFrame(renderScene)
}
```
