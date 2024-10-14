---
title: FlyLine
---

使用三种方式实现飞线


主要思路为，先生成曲线。再提取曲线上的点，修改 geometry 或 meterial上对应点的表现方式。


<ToggleContent title="Common">

``` ts
import { Group, Scene } from "three"

export interface FlyLineBegin2End {
    begin: number[]
    end: number[]
    height: number
}

export abstract class FlyBase {
    abstract scene: Scene
    abstract data: Array<FlyLineBegin2End>
    abstract group: Group

    abstract draw(): Group
    abstract animate(): void
}


export function genFlyLine() {
    const data: FlyLineBegin2End[] = [
        { begin: [0, 0], end: [10, 0], height: 10 },
        { begin: [0, 0], end: [-20, 0], height: 10 },
        { begin: [0, 0], end: [15, 15], height: 10 },
    ]
    return data
}

export interface LineOption {
    routeColor?: string
    flyColor?: string
    cycle: number
}
```

调用

``` ts
// new FlyGeometryLine(scene, genFlyLine())

// new FlyTextureLine(scene, genFlyLine())

new FlyShaderLine(scene, genFlyLine())



const cameraControls = new TrackballControls(camera, renderer.domElement)

function render() {
    cameraControls.update()
    
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

render()
```

</ToggleContent>


<ToggleContent title="几何体实现">


``` ts
import { BufferAttribute, BufferGeometry, CatmullRomCurve3, Color, Group, Line, LineBasicMaterial, Mesh, Object3D, Scene, Vector3 } from 'three'
import { FlyBase, FlyLineBegin2End, LineOption } from './base'
import { Tween, update } from '@tweenjs/tween.js'

export class FlyGeometryLine extends FlyBase {
    data: FlyLineBegin2End[]
    cycle: number
    routeColor: string
    flyColor: string
    group: Group
    scene: Scene

    constructor(scene: Scene, data: FlyLineBegin2End[], option?: LineOption) {
        super()
        this.scene = scene
        this.data = data
        this.routeColor = option?.routeColor || '#00FFFF'
        this.flyColor = option?.flyColor || '#ff0000'
        this.cycle = option?.cycle || 2000
        this.group = new Group()

        scene.add(this.draw())
        this.animate()
    }

    getPoints(data: FlyLineBegin2End) {
        
        const startPoint = data.begin
        const endPoint = data.end
        const curveH = data.height

        const pointInLine = [
            new Vector3(startPoint[0], 0, startPoint[0]),
            new Vector3(
                (startPoint[0] + endPoint[0]) / 2,
                curveH,
                (startPoint[1] + endPoint[1]) / 2,
            ),
            new Vector3(endPoint[0], 0, endPoint[1])
        ]

        const curve = new CatmullRomCurve3(pointInLine)
        const points = curve.getSpacedPoints(100)

        return points
    }

    // 创建轨迹线
    createFixedLine(points: Vector3[]) {
        return new Line(
            new BufferGeometry().setFromPoints(points),
            new LineBasicMaterial({ color: this.routeColor })
        )
    }

    createMoveLine(points: Vector3[], length: number) {
        const onlinePoints = points.slice(0, length)
        const flyLineGeometry = new BufferGeometry()
        flyLineGeometry.setFromPoints(onlinePoints)

        const colorArr: number[] = []
        const startColor = new Color(this.routeColor)
        const endColor = new Color(this.flyColor)

        onlinePoints.forEach((p, i) => {
            const { r, g, b } = startColor.lerp(endColor, i / 5)            
            colorArr.push(r, g, b)
        })

        flyLineGeometry.setAttribute('color', new BufferAttribute(new Float32Array(colorArr), 3))
        flyLineGeometry.attributes.position.needsUpdate = true

        const material = new LineBasicMaterial({
            vertexColors: true
        })

        return new Line(flyLineGeometry, material)
    }

    draw(): Group {
        this.data.map((line) => {
            const points = this.getPoints(line)
            // const fixedLine = this.createFixedLine(points)
            const movedLine = this.createMoveLine(points, 10)

            this.group.add(
                // fixedLine, 
                movedLine
            )

            const tween = new Tween({ index: 0 })
            .to({ index: 100 }, this.cycle)
            .onUpdate((t) => {
                const movedLineGeometry = movedLine.geometry
                const id = Math.ceil(t.index)
                const currPoints = points.slice(id, id + 10)
                movedLineGeometry && movedLineGeometry.setFromPoints(currPoints)
                movedLineGeometry.attributes.position.needsUpdate = true
            })
            .repeat(Infinity)


            tween.start()
        })
        return this.group
    }

    animate(): void {
        update()
        requestAnimationFrame(() => this.animate())
    }
}
```

</ToggleContent>


<ToggleContent title="纹理贴图实现">

``` ts
import { Tween, update } from '@tweenjs/tween.js'
import { CatmullRomCurve3, Group, Scene, Vector3, TubeGeometry, TextureLoader, RepeatWrapping, MeshBasicMaterial, Mesh } from 'three'
import { FlyBase, FlyLineBegin2End, LineOption } from './base'
import textureImg from './arrow.png'


export class FlyTextureLine extends FlyBase {
    scene: Scene
    data: FlyLineBegin2End[]
    cycle: number
    group: Group

    constructor(scene: Scene, data: FlyLineBegin2End[], option?: LineOption) {
        super()
        this.scene = scene
        this.data = data
        this.group = new Group()
        this.cycle = option?.cycle || 2000
        this.scene.add(this.draw())
        this.animate()
    }

    animate(): void {
        update()
        requestAnimationFrame(() => this.animate())
    }

    draw(): Group {
        this.data.map(data => {
            const startPoint = data.begin
            const endPoint = data.end
            const curveH = data.height

            const pointInline = [
                new Vector3(startPoint[0], startPoint[0]),
                new Vector3(
                    (startPoint[0] + endPoint[0]) / 2,
                    curveH,
                    (startPoint[1] + endPoint[1]) / 2,
                ),
                new Vector3(endPoint[0], 0, endPoint[1]),
            ]

            const lineCurve = new CatmullRomCurve3(pointInline)
            const geometry = new TubeGeometry(lineCurve, 100, 1, 2, false)

            const textloader = new TextureLoader()
            const texture = textloader.load(textureImg)
            texture.repeat.set(2, 7) // 跟图片设置方向
            texture.rotation = - Math.PI / 2 // 根据图片设置方向
            texture.needsUpdate = true
            texture.wrapS = RepeatWrapping
            texture.wrapT = RepeatWrapping

            const material = new MeshBasicMaterial({
                map: texture,
                transparent: true
            })

            this.group.add(new Mesh(geometry, material))

            let tween = new Tween({ x: 0 })
                .to({ x: 100 }, this.cycle)
                .onUpdate((t) => {
                    texture.offset.y -= 0.01 // 根据图片设置 x, y 和方向
                })
                .repeat(Infinity)

            tween.start()
        })

        return this.group
    }
}
```

</ToggleContent>


<ToggleContent title="着色器实现">

``` ts
import { Tween, update } from '@tweenjs/tween.js'
import { BufferGeometry, CatmullRomCurve3, Color, Float32BufferAttribute, Group, Points, Scene, ShaderMaterial, Vector3 } from 'three'
import { FlyBase, FlyLineBegin2End, LineOption } from './base'

export class FlyShaderLine extends FlyBase {
    scene: Scene;
    data: FlyLineBegin2End[]
    cycle: number
    routeColor: string
    flyColor: string
    group: Group

    constructor(scene: Scene, data: FlyLineBegin2End[], option?: LineOption) {
        super()

        this.scene = scene
        this.data = data
        this.group = new Group()
        this.cycle = option?.cycle || 2000
        this.routeColor = option?.routeColor || '#00ffff'
        this.flyColor = option?.flyColor || '#ffff00'
        this.scene.add(this.draw())
        this.animate()

    }

    animate() {
        update()
        requestAnimationFrame(() => this.animate())
    }

    draw(): Group {
        this.data.map(data => {
            const startPoint = data.begin
            const endPoint = data.end
            const curveH = data.height

            const begin = new Vector3(startPoint[0], 0, startPoint[0])
            const end = new Vector3(endPoint[0], 0, endPoint[1])
            const len = begin.distanceTo(end)

            const pointInLine = [
                begin,
                new Vector3(
                    (startPoint[0] + endPoint[0]) / 2,
                    curveH,
                    (startPoint[1] + endPoint[1]) / 2
                ),
                end
            ]

            const lineCurve = new CatmullRomCurve3(pointInLine)
            const points = lineCurve.getPoints(1000)

            const indexList: number[] = []
            const positionList: number[] = []

            points.forEach((item, index) => {
                indexList.push(index)
            })

            const geometry = new BufferGeometry().setFromPoints(points)
            geometry.setAttribute('aIndex', new Float32BufferAttribute(indexList, 1))

            const material = new ShaderMaterial({
                uniforms: {
                    uColor: {
                        value: new Color(this.flyColor)
                    },
                    uTime: {
                        value: 0
                    },
                    uLength: {
                        value: points.length,
                    },
                },
                vertexShader: `
                attribute float aIndex;

                uniform float uTime;
                uniform vec3 uColor;

                varying float vSize;

                void main() {
                    vec4 viewPosition = viewMatrix * modelMatrix *vec4(position, 1);
                    gl_Position = projectionMatrix * viewPosition;

                    if (aIndex < uTime + 100.0 && aIndex > uTime - 100.0) {
                        vSize = (aIndex + 100.0 - uTime) / 60.0;
                    }

                    gl_PointSize = vSize;
                }
                `,

                fragmentShader: `
                varying float vSize;
                uniform vec3 uColor;

                void main() {
                    if (vSize <= 0.0) {
                        gl_FragColor = vec4(1, 0, 0, 0);
                    } 
                    else {
                        gl_FragColor = vec4(uColor, 1);
                    }
                }
                `,
                transparent: true,
            })

            this.group.add(new Points(geometry, material))

            const tween = new Tween({ index: 0 })
                .to({ index: 1000 }, this.cycle)
                .onUpdate(t => {
                    const id = Math.ceil(t.index)
                    material.uniforms.uTime.value = id
                })
                .repeat(Infinity)

            tween.start()
        })

        return this.group
    }
}
```

</ToggleContent>
