---
title: GLSL
---


Shader 利用 GPU 多管道的并行处理。来提高总体像素的处理速度。但这会造成一些先天逻辑缺失。管道与管道之间无法进行逻辑交互。而且管道运行时序也没有逻辑。当前处理天空，下一次可能处理水波纹，再下一次可能UI上的按钮

GLSL 是一种类C的语言




### 变量类型 

- `vec2`: 二分量浮点向量
- `vec3`: 三分量浮点向量
- `vec4`: 四分量浮点向量
- `int`: 整型
- `bool`: 布尔型
- `float`: 单精度浮点型


### 结构与定义

```c
// 宏定义
#ifdef GL_ES
precision mediump float; // 设定所有的浮点值都是中等精度
                         // OR: precision lowp float
                         // OR: precision highp float
#endif                   

// 变量定义
vec3 color = vec3(1.0)

// 函数定义
vec4 red() {
  return vec4(1.0, 0.0, 0.0, 1.0);
}

// 主函数
main() {

  gl_FragColor = red();

}

// 定义Vec4
vec4 color = vec4(vec3(1.0, 0.0, 1.0), 1.0);
```


### 输入值/统一值 uniform

所有线程的输入值必须统一(uniform) 且为只读。数据类型通常为
- `float`
- `vec2`, `vec3`, `vec4`
- `mat2`, `mat3`, `mat4`
- `sampler2D`, `samplerCube`

``` c
uniform vec2 u_resolution; // 画布尺寸（宽，高）
uniform vec2 u_mouse;      // 鼠标位置（在屏幕上哪个像素）
uniform float u_time;     // 时间（加载后的秒数）
```

### 变化值 varying

- `gl_FragCoord`

``` c

gl_FragCoord // 存储了活动线程正在处理的像素或屏幕碎片的坐标

// 将所有像素规范化 (x, y)/(width, height) 均落在 0.0~1.0 之间
vec2 st = gl_FragCoord.xy/u_resolution;

// 将x, y的值分布在红色和绿色上可以看到，
// 坐标系的原点是在左下角(黑色)
// x 轴水平向右
// y 轴垂直向上
gl_FragColor = vec4(st.x,st.y,0.0,1.0);
```


### 内置函数 

- <http://www.bimant.com/docs/glsl-es/>

- 三角函数：`sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`
- 指数/幂函数: `pow()`, `exp()`, `log()`, `sqrt()`
- 分段函数: `abs()`, `sign()`, `floor()`, `ceil()`, `min()`, `max()`, `fract()`, `mod()`, `clamp()`

- 插值函数 
  - `smoothstep<T>(max: T, min: T, x: T) where T = float | vec2 | vec3 | vec4`


###  规范化类型



### 示例 

``` c

uniform vec2 u_resolution;

// 画 y = x 这条线
float plot(vec2 st) {    
    // 
    return smoothstep(0.01, 0.0, abs(st.y - st.x));

    // === 
          // 使用 smoothstep 计算 st.y - st.x 相对于 0.0 和 0.01 之间的平滑插值。
          // smoothstep 超越edge1(右侧)为1, 超越edge0(左侧)为0，因为edge1 不一定 大于 edge0 这两个值只是用来插值的，超越的意思不一定是大于, 要根据 edge0, edge1 的相对关系决定

          // 当 y - x < 0(超越edge1) ，返回 1。
          // 当 y - x > 0.01(超越edge0)，返回 0。
          // 当 0.01 > y - x > 0.0 时，返回插值
    return smoothstep(0.01, 0.0, st.y - st.x)   
          // 与上方同理
          // x - y > 0.01 时，返回1
          // x - y < 0，返回0
          // 0.0 < x - y < 0.01 返回插值
         - smoothstep(0.0, 0.01, st.x - st.y);  // x 比 y 大 0.01 的面积
    

    // 还等同于 
    // y < x 返回1
    // y > x + 0.01 返回0
    return smoothstep(st.x + 0.01, st.x, st.y)
    // y < x - 0.01 返回1
    // y > x 返回0
         - smoothstep(st.x, st.x - 0.01, st.y) 

    // 最终面积相减得到线
}

main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = st.x;
  vec3 color = vec3(y); // vec3(y, y, y) 以当前x归一化后的值最为灰度值 
  gl_FragColor = vec4(color, 1.0);
}
```

``` c
// 使用x的值来绘制y, 即 y = x
// 函数代表的意思是 y, x 的误差处在 0.0 - 0.02 之间 
// 反映绘制线条的宽度
float plot(vec2 st) {
  return smoothstep(0.02, 0.0, abs(st.y - st.x))
}


void main() {
  // ...
  float pct = plot(st);
  // 非 y = x 的像素点使用 st.x 作为颜色
  // y = x 上的点使用绿色作为颜色 (0,1,0)
  color = (1.0 - pct) * st.x + pct * vec3(0.0, 1.0, 0.0);

  // ...
}
```

``` ts

```


阶跃函数

``` c
// x < 0.1 返回0, x > 0.1 返回1
float y = step(0.1, st.x) 
```

颜色

别名

``` c
vec3 red = vec3(1.0, 0.0, 0.0)
red.x = 1.0
red.y = 0.0
red.z = 0.0

vec4 vector;
vector[0] = vector.r = vector.x = vector.s;
vector[1] = vector.g = vector.y = vector.t;
vector[2] = vector.b = vector.z = vector.p;
vector[3] = vector.a = vector.w = vector.q;
```


鸡尾酒 

``` c
vec3 yellow, magenta, green;

// Making Yellow
yellow.rg = vec2(1.0);  // Assigning 1. to red and green channels
yellow[2] = 0.0;        // Assigning 0. to blue channel

// Making Magenta
magenta = yellow.rbg;   // Assign the channels with green and blue swapped

// Making Green
green.rgb = yellow.bgb; // Assign the blue channel of Yellow (0) to red and blue channels
```


混合函数 mix

``` c
void main() {
    vec3 color = vec3(0.0);

    float pct = abs(sin(u_time));

    // Mix uses pct (a value from 0-1) to
    // mix the two colors  
    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}
```


https://thebookofshaders.com/06/?lan=ch


``` c
vec3 rgb2hsb( in vec3 c ){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz),
                vec4(c.gb, K.xy),
                step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r),
                vec4(c.r, p.yzx),
                step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
              d / (q.x + e),
              q.x);
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}
```


常用常量 

``` c
#define TWO_PI 6.28318530718
```


画四个圆 

``` c
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float plot_circle(vec2 center) {
  float dist = length(center);
  float edge = sin(u_time * 3.0) * 0.05;
  dist = smoothstep(edge + 0.1, edge + 0.15, dist);
  return dist;
}
void main(){

	vec2 st = gl_FragCoord.xy/u_resolution;
  float pct = 0.0;

	float pct1 = plot_circle(vec2(0.8)-st);
  float pct2 = plot_circle(vec2(0.2)-st);
  float pct3 = plot_circle(vec2(0.2, 0.8)-st);
  float pct4 = plot_circle(vec2(0.8, 0.2)-st);
  // pct = step(pct, 0.3);
  vec3 color = vec3(pct1 * pct2 * pct3 * pct4);

	gl_FragColor = vec4( color, 1.0 );
}
  // TODO
  // 将坐标映射为 -1,1 可以使用 abs 简化上面的写法
  // Remap the space to -1. to 1.
  st = st *2.-1.;
```


位移，缩放，旋转
\
https://thebookofshaders.com/08/?lan=ch


Refs:
- [The Book of Shaders](https://thebookofshaders.com?lan=ch)
- [Shader 在线编辑器](http://editor.thebookofshaders.com/)
- [内置数学函数](https://thebookofshaders.com/glossary/)
- [在 Babylon编写shader](./)
- https://graphtoy.com/


扫描效果

- https://playground.babylonjs.com/#4QH8JM


热力图 

- https://nme.babylonjs.com/#LGTK15#1


shaders
- https://www.shadertoy.com/view/3tBGRm 气泡圆环
- https://www.shadertoy.com/view/ltffzl 下雨玻璃
- https://www.shadertoy.com/view/ldfyzl 涟漪
- https://www.shadertoy.com/view/MX33Dr 隧道n.1
- https://www.shadertoy.com/view/XX3Szr 隧道n.2
- https://www.shadertoy.com/view/XsBfRW 网格n.1
- https://www.shadertoy.com/view/4dBSRK 网格n.2

util - page20