---
title: Vue3 Feature
index: Framework.Vue.Syntax
---



## 3.4 灌篮高手 Slam Dunk

> 新特性(Feature)

### Feat.defineModel

此功能简化子组件实现 `v-model`. （实现子组件双向绑定这个功能从V1开始前后至少有5种写法了。现在倒是看起来简单了 但是你需要承担两个必须亲自验证的长久的心智负担。1. defineModel返回的modelValue的作用域是什么 2. 你永远都得记得 defineModel 帮你声明了一个prop。这一切看起来似乎很简单。等着记混吧）

```html
<!-- BEFORE  -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
console.log(props.modelValue)

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <input :value="modelValue" @input="onInput" />
</template>


<!-- AFTER -->
<script setup>
const modelValue = defineModel()
console.log(modelValue.value)
</script>

<template>
  <input v-model="modelValue" />
</template>
```

### Feat.v-bind 同名简写

``` html
before:
<img :id="id" :src="src" :alt="alt">

now:
<img :id :src :alt>

```

> 性能提升(PERF)

### ✅ PERF.SFC

- 解析器速度提高 2 倍并提高 SFC 构建性能


### ✅ PERF.更高效的反应系统

此种情况下，当计算属性结果不变时，不会重新触发 `watchEffect`。3.4之前每次更改计算属性都会触发回调

``` ts
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // logs true

count.value = 2 // logs true again
```

## 3.3 浪客剑心 Rurouni Kenshin

> TS 支持

### TS.支持导入外部类型

```html
<script setup lang="ts">
import type { Props } from './foo'

// imported + intersection type
defineProps<Props & { extraProp?: string }>()
</script>
```

Note: 当时用条件类型时，只能作用于Prop上的单个属性，不能将条件类型作为Prop的整体


### TS.泛型组件

#### 示例1

``` html
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```


#### 示例2

``` html
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

### TS.defineEmits 写法优化


``` ts
// before: 太反人类了，没回写都得查文档
const emit = defineEmits<{
  (e: 'foo', id: number): void
  (e: 'bar', name: string, ...rest: any[]): void
}>()

// now
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
```

defineEmits 的类型字面量 key为事件名，value为参数的数组类型


> 新增功能 Feature

### Feature.新增defineSlots

setup 写法

```html
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
</script>
```

组件写法

``` ts
import { SlotsType } from 'vue'

defineComponent({
  slots: Object as SlotsType<{
    default: { foo: string; bar: number }
    item: { data: number }
  }>,
  setup(props, { slots }) {
    expectType<undefined | ((scope: { foo: string; bar: number }) => any)>(
      slots.default
    )
    expectType<undefined | ((scope: { data: number }) => any)>(slots.item)
  }
})
```

NOTE: 
- defineSlots 的类型字面量 key为插槽名，value插槽函数，插槽函数第一个函数为插槽期望接受的prop
- defineSlots 的返回值与 useSlots 返回的槽对象相同。

---

### Feature.新增defineOption

可以在 setup script 中定义option。不需要单独的script. (难以想象直到3.3才出这个东西)

``` html
<script setup>
defineOptions({ inheritAttrs: false })
</script>
```


### Feature.JSX 导入源支持

目前，Vue 的类型自动注册全局 JSX 类型。这可能会导致与其他需要 JSX 类型推断的库一起使用的冲突，特别是 React。

从 3.3 开始，Vue 支持通过 TypeScript 的 jsxImportSource 选项指定 JSX 命名空间。这允许用户根据他们的用例选择全局或每个文件选择加入。

为了向后兼容，3.3 仍然全局注册 JSX 命名空间。我们计划在 3.4 中删除默认的全局注册。如果您将 TSX 与 Vue 结合使用，则应在升级到 3.3 后将显式 jsxImportSource 添加到 tsconfig.json 中，以避免在 3.4 中出现损坏。


> 性能提升(PERF)

### ✅ PERF.基础设施

- 通过将类型检查与汇总构建分开并从 `rollup-plugin-typescript2` 移动到 `rollup-plugin-esbuild` ，构建速度提高了 10 倍。
- 从 `Jest` 迁移到 `Vitest`，测试速度更快。
- 从 `@microsoft/api-extractor` 移动到 `rollup-plugin-dts`，更快地生成类型。
- 通过 `ecosystem-ci` 进行全面回归测试 - 在发布之前捕获主要生态系统依赖项的回归！

---

## 3.2 五等分的花嫁 Quintessential Quintuplets

> SFC 新特性


### SFC v-memo

新的组件缓存策略 

``` html
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

- [官方文档](https://cn.vuejs.org/api/built-in-directives.html#v-memo)

---

### ✅ SFC setup flag

setup 被正式引入 Vue。简化了 Vue 单文件组件仅使用 Composition API 时的语法。

1. 声明的变量, 指令和组件可以直接应用到模板中
2. 除 setup 外选项的语法补充

- [关于setup更多语法](./setup)
- [官方文档](https://cn.vuejs.org/api/sfc-script-setup.html#script-setup)


---

### ✅ SFC.动态CSS 

`<style>v-bind<style>` 在 `<style>` 标签中绑定 vue 变量


#### 案例1

``` html
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return { color: 'red' }
  }
}
</script>

<style>
.text { color: v-bind(color); }
</style>
```

#### 案例2

``` html
<script setup>
const theme = { color: 'red' }
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
/* 用引号包裹是vue语法限制 */
p { color: v-bind('theme.color'); }
</style>
```

渲染结果：

``` html
<p style="--d4948df9-theme_color:red;">hello</p>

<style>
p {
  color: var(--d4948df9-theme_color);
}
</style>
```

Note: css自定义变量会在组件根元素上设置，并非本元素

- [官方文档](//cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)

---

> WebComponent

### WebComponent.使用 `defineCustomElement` 自定义 WebComponent 

---

> SSR

### SSR.`@vue/server-renderer` 提供非 Node 运行时构建

---

> Effect Scope API

解决问题: 不同组件使用同一个组合API时, 因互相持有相同变量, 而无法解耦的情况.



#### effectScope()
#### getCurrentScope()
#### onScopeDispose()

--- 

> 性能提升(PERF)

### ✅ PERF.Vue 响应式系统

- 更高效的 ref 实现（读取速度快约 260% / 写入速度快约 50%）
- 依赖跟踪速度提高约 40%
- 内存使用量减少约 17%

### ✅ PERF.模板编译

- 普通元素 VNode 的创建速度提高了约 200%