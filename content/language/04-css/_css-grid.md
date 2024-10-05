
``` css
// 坐标定义
.corrdinates-grid {
    display: grid;

    grid-template-columns: auto 1fr;
    grid-template-rows: 
        auto
        1fr
        auto;
}

.grid-item-01 {
    // 用坐标定位栅格项目的位置， 从1开始
    grid-column: 1;
    grid-row: 1;
}

// 具名定义
#named-grid {
    display: grid;
    // 每一个字符串代表一行，每个字符串中的单词数量必须相同。每个单词代表一个区域
    grid-template-areas: 
        "title stats"
        "score stats"
        "board board"
        "ctrls ctrls";

    // 还需要使用 `grid-template-columns` `grid-template-columns` 定义栅格区域的尺寸
    grid-template-columns: auto 1fr;
    grid-template-rows:
        auto
        auto
        1fr
        auto;
}

#named-grid-title { grid-area: title }


```

[[toc]]

[本篇主要参考了w3c的规范](https://www.w3.org/TR/css-grid/)

当在容器元素中使用 `display: grid | inline-grid;` 则在该元素内部启用了弹性布局。也因此产生了两类 css 属性：

- 作用于 grid container 的 CSS 属性
- 作用于 grid item 的 CSS 属性

``` css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:
        1fr
        1fr;
    grid-template-areas:
        "title stats"
        "score stats"
        "board board"
        "ctrls ctrls";
}

.grid-item {
    grid-row: 1 / 4;
    grid-column: 1 / 3;
}
```

```
<track-list>          = [ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?
<auto-track-list>     = [ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat>
                        [ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?
<explicit-track-list> = [ <line-names>? <track-size> ]+ <line-names>?

<line-name-list>      = [ <line-names> | <name-repeat> ]+
<track-size>          = <track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( <length-percentage> )
<fixed-size>          = <fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )
<track-breadth>       = <length-percentage> | <flex> | min-content | max-content | auto
<inflexible-breadth>  = <length-percentage> | min-content | max-content | auto
<fixed-breadth>       = <length-percentage>
<line-names>          = '[' <custom-ident>* ']'
```

---

## grid-template-columns, grid-template-rows

|||
|---|---|
| 值 | `none`, `<track-list>`, `<auto-track-list>`, `subgrid <line-name-list>?` |
| 初始值 | `none` |
| 适用 | grid 布局容器 |
| 是否继承 | 否 |
| 百分比形式含义 | 参考内容区域的相应维度 |
| 计算值 | `none` 或者计算track-list |
| 动画特征 | 如果列表长度匹配，则按计算跟踪列表中每个项目的计算值类型 |

## grid-template-areas

## grid-template(shorthand)


## grid-auto-columns, grid-auto-rows

## grid-auto-flow

## grid(shorthand)

---

## grid-row-start, grid-row-end, grid-column-start, grid-column-end

## grid-row, grid-column(shorthand)

## grid-area(shorthand)