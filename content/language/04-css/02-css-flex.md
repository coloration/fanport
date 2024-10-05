---
title: CSS Flex
---

[[toc]]

[本篇主要参考了w3c的规范](https://www.w3.org/TR/css-flexbox/)

---

当在容器元素中使用 `display: flex | inline-flex;` 则在该元素内部启用了弹性布局。也因此产生了两类 css 属性：

- 作用于 flex container 的 CSS 属性
- 作用于 flex item 的 CSS 属性

``` css
.flex-cotnainer {
  display: flex; 
  flex-direction: column;
  flex-wrap: nowrap;
  flex-flow: column nowrap; /* shorthand for flex-direction, flex-wrap */ 
  justify-content: center;
  align-items: center;
  align-content: center;
}

.flex-item {
  order: 1;
  align-self: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 100px;
  flex: 1 0 100px; /* shorthand for flex-grow, flex-shrink, flex-basis */ 
}
```

---

> **作用于 flex container**, `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`



## flex-direction

```css
.flex-direction { flex-grow: column; }
```


|||
|---|---|
| 值 | `row`, `row-reverse`, `column`, `column-reverse` |
| 初始值 | `row` |
| 适用 | flex 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 无 |

**贴士**：

1. flex item 将按照容器设置的主轴`(main axis)`方向进行排布 
2. reverse 不会改变 order 指定的顺序
3. flex 容器的概念中，包含`主轴 main axis`, `交叉轴 cross axis` 的概念，这两个轴始终是正交的
容器内的元素是按照`主轴`的方向进行排布的。默认为 `flex-direction: row`, 即可以理解为横向，也是书写模式中 `inline` 的方向
此时对应的`交叉轴`即为纵向，也是书写模式中 `block` 的方向。当我们指定 `flex-direction: column` 时我们则是指定了 `主轴`的方向
为纵向，书写模式 `block`. 相应的`交叉轴`则变为了横向，书写模式`inline`.
4. 在上面一条的基础上当我们指定 `row-reverse` 时只是将主轴的书写模式从 `inline-start` => `inline-end` 修改为 `inline-end` => `inline-start`
相应 `column-reverse` 则将主轴的书写模式从 `block-start` => `block-end` 改为 `block-end` => `block-start`
5. `交叉轴`的书写模式由 `flex-wrap` 设定

## flex-wrap

|||
|---|---|
| 值 | `nowrap`, `wrap`, `wrap-reverse` |
| 初始值 | `nowrap` |
| 适用 | flex 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 无 |

用来控制容器的内容是单行还是多行

**贴士**

1. 当指定 `nowrap` 时内容不换行，即 `交叉轴 cross axis` 的内容只有一行则不存在修改书写模式方向的问题。
2. 当容器指定高度大于换行后元素的总高度时，元素不会堆积到容器顶部而是根据每行最大高度按比例分配容器的剩余空间. 这部分样式由 flex container 的 `align-content` 设定

``` css
.flex-container {
  width: 300px; height: 400px;
  display: flex; flex-wrap: wrap;
}

.flex-item {
  width: 100px; height: 100px;
}

/*
                                                  +                                                   +
                                                  |                                                   |
          +    flex+start/stretch    +            |           +  align-items: flex-end   +            |           +    align-items: center   +
          |                          |            |           |                          |            |           |                          |
          |   flex container width   |            |           |   flex container width   |            |           |   flex container width   |
          +           300px          +            |           +           300px          +            |           +           300px          +
                                                  |                                                   |
          +--------+--------+--------+ +------+   | +------+                               +------+   | +------+                               +------+
          |        |        |        |            |                                                   |   50px
          |        |        |        |            |   100px                                           | +------+  +--------+--------+--------+
          |        |        |        |  flex      |                                         flex      |           |        |        |        |  flex
+------+  +--------+--------+--------+            | +------+  +--------+--------+--------+            |           |        |        |        |
                                        container |           |        |        |        |  container |           |        |        |        |  container
  100px                                           |           |        |        |        |            | +------+  +--------+--------+--------+
                                        height    |           |        |        |        |  height    |                                         height
+------+  +--------+--------+                     | +------+  +--------+--------+--------+            |   100px
          |        |        |  100px    400px     |                                         400px     |                                         400px
          |        |        |                     |   100px                                           | +------+  +--------+--------+
          |        |        |  rest               |                                                   |           |        |        |  100px
+------+  +--------+--------+                     | +------+  +--------+--------+                     |           |        |        |
                                                  |           |        |        |  100px              |           |        |        |  rest
  100px                                           |           |        |        |                     | +------+  +--------+--------+
                                                  |           |        |        |  rest               |   50px
+------+                               +------+   |           +--------+--------+          +------+   | +------+                               +------+
                                                  |                                                   |
                                                  |                                                   |
                                                  +                                                   |
                                                                                                      +

*/
```

## flex-flow(shorthand)

|||
|---|---|
| 值 | `<flex-direction>[, <flex-wrap>]` |
| 初始值 | 根据单个属性 |
| 适用 | flex 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 根据单个属性 |
| 动画特征 | 无 |

``` css
.flex-container { display: flex; }
.flex-container {
  flex-flow: row;
/*
flex-flow: row nowrap;
flex-direction: row; flex-wrap: nowrap;
*/
  flex-flow: column wrap;
/*
flex-flow: column wrap;
flex-direction: column; flex-wrap: wrap;
*/
}
```

**贴士**：

1. flex-flow 对书写模式(writing-mode)敏感



## justify-content

|||
|---|---|
| 值 | `flex-start`, `flex-end`, `center`, `space-between`, `space-around` |
| 初始值 | `flex-start` |
| 适用 | flex 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 指定关键字 |
| 动画特征 | 无 |

justify-content 属性用来设置主轴方向上内部元素的排布方式

![w3c demo](https://www.w3.org/TR/css-flexbox/images/flex-pack.svg)


**贴士**：

1. `space-around` 在元素之间的间距为容器两端的间距的2倍
2. 截止 `2023.01.13` 标准中还没有对 `space-evenly`, `left`, `right`, `start`, `end` 的功能描述

## align-items

|||
|---|---|
| 值 | `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| 初始值 | `stretch` |
| 适用 | flex 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 指定关键字 |
| 动画特征 | 无 |


![w3c demo](https://www.w3.org/TR/css-flexbox-1/images/flex-align.svg)


**贴士**：
1. 当 flex-item 设置高度会使 `stretch` 撑满容器的效果失效，表现为 `flex-start` 一样的效果 
2. `baseline` 只针对 flex item 中第一行的文字
---

## align-content

|||
|---|---|
| 值 | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch` |
| 初始值 | `stretch`|
| 适用 | **多行**flex 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 无 |

容器内部元素**产生换行时**(flex wrap) 并且容器的主轴**高度大于**多行 flex item 的总高度。容器剩余空间会遵照 align-content 默认值(`stretch`) 分配给每一行

---

## 


> **作用于 flex item**: `flex-grow`, `flex-shrink`, `flex-basis`, `flex`, `order`, `align-self`


## flex-grow


```css
.flex-item { flex-grow: 1; }
```


|||
|---|---|
| 值 | `<数字>` |
| 初始值 | `0`|
| 适用 | flex 布局容器内部的元素 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 依据计算值 |

指定此属性会设置此元素的**弹性成长因子 flex grow fator**, 数值决定了容器剔除空隙之后分配给内部元素的尺寸额度

**贴士**：

1. `flex-grow` 不能设置为负数
2. 推荐使用缩写形式 `flex` 指定 `flex-grow`。缩写形式给予未定义的其他行为以默认值
3. 介于 0 和 1 之间的 Flex 值具有某种特殊行为，当容器内部的 flex-grow 之和小于1时，它们将占用不到100%的可用空间

eg:

``` css
.flex-item-1 { flex-grow: 0.25; }
.flex-item-2 { flex-grow: 0.5; }

/*
┌──────────────────────────────────────────────────────┐
│ ┌───────────┐ ┌──────────────────────┐               │
│ │           │ │                      │               │
│ │           │ │                      │               │
│ │    25%    │ │         50%          │      25%      │
│ │           │ │                      │               │
│ │ grow:0.25 │ │     grow: 0.5        │   container   │
│ │           │ │                      │               │
│ │           │ │                      │     rest      │
│ │           │ │                      │               │
│ └───────────┘ └──────────────────────┘               │
└──────────────────────────────────────────────────────┘
*/
```


## flex-shrink

|||
|---|---|
| 值 | `<数字>` |
| 初始值 | `1`|
| 适用 | flex 布局容器内部的元素 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 数字 |

**贴士**：

1. `flex-shrink` 不能设置为负数
2. 推荐使用缩写形式 `flex` 指定 `flex-shrink`。缩写形式给予未定义的其他行为以默认值
3. 弹性收缩在 flex item 撑满容器之后才会生效
4. **弹性收缩因子 flex shrink fator**越大，收缩的越多

``` css

.flex-container { display: flex; width: 100px; }
.flex-item { width: 50px; }
.flex-item-1 { flex-shrink: 0; }
.flex-item-2 { flex-shrink: 2; }
.flex-item-3 { flex-shrink: 3; }

/**
┌────────────────────────────────────────────────────────────────┐
│                          width: 100px;                         │
│ ┌────────────────────────────┐ ┌───────────────┐ ┌──────────┐  │
│ │                            │ │               │ │          │  │
│ │ width:50px;                │ │width:50px;    │ │width:50px│  │
│ │                            │ │               │ │          │  │
│ │ shrink:0;                  │ │shrink:2;      │ │shrink:3; │  │
│ │                            │ │               │ │          │  │
│ │                            │ │               │ │          │  │
│ │ 50px;                      │ │30px;          │ │20px;     │  │
│ └────────────────────────────┘ └───────────────┘ └──────────┘  │
└────────────────────────────────────────────────────────────────┘
*/
```

## flex-basis

|||
|---|---|
| 值 | `关键字, <width>, <height>` |
| 初始值 | `auto`|
| 适用 | flex 布局容器内部的元素 |
| 是否继承 | 否 |
| 百分比形式含义 |flex 布局容器内部尺寸|
| 计算值 | 由给定的关键字或者百分比的计算值 |
| 动画特征 | 依据计算值 |

- `关键字`: 
  - `max-content`: TODO
  - `min-content`: TODO
  - `fit-content`: TODO
  - `content`: 根据flex子项的内容自动调整大小
  - `auto(default)`: 使用 flex item 自身的 `width` `height`



- `<width|height>`: 
  - `10em`, `3px`,
  - 如果 `flex-basis` 的值为百分数，且它flex容器的尺寸没有被显式设置，此时 flex-basis 的值会被解析为 `content`。

**贴士**：

1. 推荐使用缩写形式 `flex` 指定 `flex-basis`。缩写形式给予未定义的其他行为以默认值
2. 当 `flex-direction` 为 `column | column-reverse` 时 `flex-basis` 的含义为 `height`
3. 当 `flex-basis` 与 `width | height` 同时存在时 `flex-basis` 优先级更高, 但不会消除 `max-width`, `min-width` 对元素的影响
4. `flex-basis` 的 `max-content`, `min-content`, `fit-content` 与 `width` 的这三个属性表现有差异。暂时没试验出来。不推荐使用关键字形式

## flex(shorthand)

|||
|---|---|
| 值 | 内容 | `none | [<flex-grow> <flex-shrink>? || <flex-basis>` ] |
| 初始值 | `0 1 auto`|
| 适用 | flex 布局容器内部的元素 |
| 是否继承 | 否 |
| 百分比形式含义 |根据单个属性的百分比值|
| 计算值 | 根据单个属性的计算值 |
| 动画特征 | 依据计算值 |


``` css
.flex-container { display: flex; }
.flex-item {
  flex: 2;
/*
flex: 2 1 0;
flex-grow: 2; flex-shrink: 1; flex-basis: 0;
*/
  flex: initial;
/*
flex: 0 1 auto;
flex-grow: 0; flex-shrink: 1; flex-basis: auto;
*/
  flex: auto;
/*
flex: 1 1 auto;
flex-grow: 1; flex-shrink: 1; flex-basis: auto;
*/

  flex: none;
/*
flex: 0 0 auto;
flex-grow: 1; flex-shrink: 1; flex-basis: auto;
*/
}
```


---


## order

|||
|---|---|
| 值 | `<整数>` |
| 初始值 | `0`|
| 适用 | flex 布局容器内部的元素 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 数字 |


**贴士**：

1. order 可以设置为负值，值越小 flex item 会排在主轴当前书写模式的前面


``` css
.flex-item-2 {
  order: 1;
}

/* 
┌─────────┐ ┌─────────┐ ┌─────────┐
│         │ │         │ │         │
│ item1   │ │ item3   │ │ item2   │
│         │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘
*/
```

---



## align-self

|||
|---|---|
| 值 | `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| 初始值 | `auto`|
| 适用 | flex 布局容器内部的元素 |
| 是否继承 | 否 |
| 百分比形式含义 | N/A（无百分比形式）|
| 计算值 | 由给定值决定 |
| 动画特征 | 无 |

align-self 作用与 flex item 将会覆盖掉容器指定的 align-item 的值

``` css
.flex-container {
  align-items: center;
}

.flex-item-2 {
  align-self: flex-start;
}

/* 
┌─────────┐ ┌─────────┐
│         │ │         │             ┌─────────┐
│         │ │         │ ┌─────────┐ │         │
│         │ │ item2   │ │         │ │         │
│ item1   │ │         │ │ item3   │ │ item4   │
│         │ │         │ │         │ │         │
│         │ └─────────┘ └─────────┘ │         │
│         │                         └─────────┘
└─────────┘
*/
```



