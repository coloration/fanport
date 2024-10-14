---
title: dat.gui
---



## startup

``` bash
$ npm i dat.gui
$ npm i @types/dat.gui -D
```

## usage

``` ts
import { GUI } from 'dat.gui'

const gui = new GUI()


enum ControlType {
    rotationSpeed = 'rotationSpeed',
    bouncingSpeed = 'bouncingSpeed',
}

// const { rotationSpeed, bouncingSpeed } = controls
export const controls = {
    [ControlType.rotationSpeed]: 0.02,
    [ControlType.bouncingSpeed]: 0.03
}

// control object, control field, min, max, step
gui.add(controls, ControlType.rotationSpeed, 0, 0.5, 0.1) 
gui.add(controls, ControlType.bouncingSpeed, 0, 0.5, 0.1)
```


### 添加按钮回调


``` ts
import { GUI } from 'dat.gui'

enum ControlType {
    addCube = 'addCube',
    removeCube = 'removeCube',
}

export const controls = {
    [ControlType.addCube]: function () {
        // create cube ...
        scene.add(cube)

    },
    [ControlType.removeCube]: function () {
        scene.remove(cube)
    },
}

const gui = new GUI()

gui.add(controls, ControlType.addCube)
gui.add(controls, ControlType.removeCube)
```



- doc <https://github.com/dataarts/dat.gui/blob/HEAD/API.md>