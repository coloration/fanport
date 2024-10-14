---
title: Tips
index: Framework.Vue.Practice
---

3. 动态组件

``` html
<script setup>
import { h } from 'vue'

function render() {
    return h('div', {}, 'hello!~')
}
</script>
<template>
    <render />
</template>
```


2. `v3` modelValue 无法直接绑定到内部组件的 v-model 中，打包后会报错 `modelValue is not defined`

``` ts
const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue')
})

// v-model="modelValue" => v-model="innerModel"
```

1. 在 `.ts` 文件中引入 `.vue` 文件错误 

```ts
// /env.d.ts

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}

// tsconfig.json
{
    "include": [
        //...
        "env.d.ts"
    ]
}
```