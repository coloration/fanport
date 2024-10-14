---
title: Babylon Particle 粒子系统
date: 2024-05-21
---

### startup

1. 创建粒子系统并配置
2. 设定发射源和材质
3. 启动粒子系统

Doc: <https://doc.babylonjs.com/typedoc/classes/BABYLON.ParticleSystem>


<ToggleContent title="雪花特效" level="3" expand>

``` ts
async function createSnowSystem(
  options: Partial<ParticleSystem> | null, 
  scene: Scene, 
  gui?: boolean
) {
  // 1. 创建粒子系统并配置
  const snowSystem = new ParticleSystem('snow-particles', 1500, scene, null, true)
  snowSystem.particleTexture = new Texture('/snowflake.png', scene)

  const defaultOptions: Partial<ParticleSystem> = {
    startSpriteCellID: 0,
    endSpriteCellID: 0,
    spriteCellHeight: 512,
    spriteCellWidth: 512,
    minEmitBox: new Vector3(-300, 0, -300), // starting all from
    maxEmitBox: new Vector3(300, 0, 300),   // to

    minSize: 0.5,
    maxSize: 4,

    minLifeTime: 1.6,
    maxLifeTime: 2.4,
    
    emitRate: 150,
    blendMode: ParticleSystem.BLENDMODE_ONEONE,
    gravity: new Vector3(0, -98, 0),
    direction1: new Vector3(5.5, -1, 5.5),
    direction2: new Vector3(-5.5, -1, -5.5),

    minAngularSpeed: 0,
    maxAngularSpeed: Math.PI,

    minEmitPower: 1,
    maxEmitPower: 10,
    updateSpeed: .005
  }
  
  Object.assign(snowSystem, defaultOptions, options)

  // 2. 创建粒子发射源
  const fountain = MeshBuilder.CreateBox('fountain', { size: .1 }, scene)
  fountain.position = new Vector3(0, 10, 0)
  fountain.isVisible = false

  // where the particles come from 
  snowSystem.emitter = fountain

  if (gui) {
    const gui = new dat.GUI();
    gui.add(particleSystem, 'minSize', 0.1, 5);
    gui.add(particleSystem, 'maxSize', 0.1, 5);
    gui.add(particleSystem, 'emitRate', 1, 500);
    gui.add(particleSystem, 'updateSpeed', 0, 0.02);
  }
  
  return { snowSystem }
}

const { snowSystem } = createSnowSystem(null, scene)

scene.registerBeforeRender(() => {
  snowSystem.startSpriteCellID = Math.round(Math.random() * 3 - 1)
  snowSystem.endSpriteCellID = snowSystem.startSpriteCellID
})

snowSystem.start()
```

> snowflake.png

<div class="bg-indigo-400">

![snowflake.png](./i/snowflake.png)

</div>

</ToggleContent>