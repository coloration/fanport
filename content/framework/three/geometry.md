---
title: 几何体
---

## 内置几何体

### 基本类

- Geometry
    - vertices
    - faces
- BufferGeometry 符合GPU的期待的数据组织形式
    - atttributes
    - index


### 两种类转换

``` ts
// buffer -> normal
normalGeometry.fromBufferGeometry(bufferGeometry)

// normal -> buffer
bufferGeometry.formGeometry(normalGeometry)
```


### 衍生类

- 二维网格
    - CircleGeometry/CircleBufferGeometry 圆形
    - RingGeometry/RingBufferGeometry 环形
    - PlaneGeometry/PlaneBufferGeometry 平面
    - ShapeGeometry/ShapeBufferGeometry 任意图形

- 三维网格
    - BoxGeometry/BoxBufferGeometry 长方体
    - SphereGeometry/SphereBufferGeometry 球体
    - CylinderGeometry/CylinderBufferGeometry 圆柱体
    - ConeGeometry/ConeBufferGeometry 圆锥体
    - TorusGeometry/TorusBufferGeometry 圆环
    - TorusKnotGeometry/TorusKnotBufferGeometry 环状扭结

- 自定义网格
    - PolyhedronGeometry/PolyhedronBufferGeometry 多面体
    - IcosahedronGeometry/IcosahedronBufferGeometry 二十面体
    - OctahedronGeometry/OctahedronBufferGeometry 八面体
    - TetrahedronGeometry/TetrahedronBufferGeometry 四面体
    - DodecahedronGeometry/DodecahedronBufferGeometry 十二面体

- 高阶网格 `three/examples/jsm/geometries`
    - ConvexGeometry
    - LatheGeometry
    - TubeGeometry 通过曲线创建管道
    - ExtrudeGeometry 图形挤出，二维网格，svg(SVGLoader)
    - TextGeometry 三维文字
        1. facetype.js 将 opentype/truetype 字体转换为 json
        2. FontLoader 载入字体
    - ParametricGeometry 根据UV公式创建网格体

