---
title: TypeScript in Vue3
index: Framework.Vue.Practice
---

---
# $slidev .\ts-and-vue3.md

layout: center
---

# TypeScript in Vue3

---

# Overview

- Why TypeScript
- Using TypeScript
- Vue3 
- Using TypeScript in Vue3

---
layout: center
---

# 为什么使用 TypeScript

---

# 下面的代码会发生什么

```js
const husky = new Dog()

husky.run()
```

<v-click>

``` js
class Dog {
    bark(some) {
        console.log(some)
    }
}
```
</v-click>
<br>

<v-click>

## in JavaScript Runtime

``` js
# In Console
Uncaught TypeError: husky.run is not a function
```

</v-click>

---

## in TypeScript Eslint

``` ts

husky.run() 
// In IDE
// Property 'run' does not exist on type 'Dog'. 
```

<v-click>

目的：
- 程序角度：避免运行时错误，降低运行时开销
- 开发角度：降低维护成本与心智负担

``` js
// somebody
delete husky.bark

// you
husky.hasOwnProperty('bark') && husky.bark();
```

</v-click>

---
layout: center
---


# 使用 TypeScript

---

## 使用时无感知

``` ts
const husky = new Dog()

husky.run()
```

<v-click>

不需要复用时定义也是无感知的（基于TS类型推导）

``` ts
const foo = [] // foo: unknown[]
foo.substring(0, 1) 
// In IDE
// Uncaught TypeError: foo.substring is not a function
```

</v-click>

<br />

<v-click>

## 复用定义时需要声明类型

``` ts
export function queryToObject(query: string) {
    query.split('&');
    // skip
}
```

</v-click>


---

## 接口用例：Component Props

``` ts
// 个人建议以I开头
export interface IMyButtonProps {
    type?: 'primary' | 'normal' | 'glost',
    size?: 'sm' | 'md' | 'lg' | 'xl',
    disabled?: boolean,
    loading?: boolean,
}
```

<v-click>

``` html
<script lang="ts" setup>
// 没有默认值
const props = defineProps<IMyButtonProps>()

// 有默认值
const props = withDefaults(
    defineProps<IMyButtonProps>(),
    { type: 'normal', size: 'md', disabled: false, loading: false }
)
</script>
```

</v-click>

<v-click>

更多 `<script lang="ts" setup>` [语法总结](https://www.binyu.me/framework/vue/setup)

</v-click>

<v-click>

进阶：拓展 `IMyButtonProps` 一个 `icon` 字段以实现 `IMyIconButtonProps` 并在 `vue` 中使用

</v-click>

---


``` ts
interface IMyIconButtonProps extends IMyButtonProps {
    icon?: 'string'
}

withDefaults(
    defineProps<IMyIconButtonProps>(),
    { type: 'normal', size: 'md', disabled: false, loading: false }
)
```


<v-click>

当 `MyIconButton` 的 `type` 与 `IMyButton` 不一致时

``` ts
// Bad: Compile Error
interface IMyIconButtonProps extends IMyButtonProps {
    type: 'primary' | 'normal' | 'glost' | 'icon', 
    icon?: 'string'
}

```

</v-click>

<v-click>

``` ts
// Good
interface IMyIconButtonProps extends Omit<IMyButtonProps, 'type'> {
    type: 'primary' | 'normal' | 'glost' | 'icon', 
    icon?: 'string'
}
```

</v-click>

---


## 类型用例: api 远程调用

```ts {all|16}
interface User {
    id: string,
    name: string
}

type GetUserPayload = string
type GetUserResponse = User & {
    queryTime: string
}

export function getUser(uid: GetUserPayload) {
    return Axios.get<GetUserResponse>(`/user/${uid}`)
}

getUser('like_a_uuid')
// .then((res: AxiosResponse<GetUserResponse>) => {
.then((res) => {
    res.data.name
    res.data.queryTime
})

```


<v-click>

进阶1: 注意 `res` 是什么类型，如果通过拦截器整理数据后应该怎么改写

</v-click>

---

```ts {all|2|10-11|8}
Axios.interceptors.response.use(res => {
    return res.data.data;
}, error => {
    // skip
});

getUser('like_a_uuid')
// .then((res: GetUserResponse) => {
.then((res) => {
    res.name
    res.queryTime
})
```

<v-click>


``` ts
export function getUser(uid: GetUserPayload): Promise<GetUserResponse> {
    return Axios.get(`/user/${uid}`)
}
```

</v-click>

<v-click>

TS类型定义与JS实现是剥离的，可以想想 any

</v-click>

<v-click>

进阶2: 实现一个 `createUser` 的接口函数声明

</v-click>

---


```ts {1-4|6|7-9|11-13|all}
interface User {
    id: string,
    name: string
}

type CreateUserPayload = Pick<User, 'name'>
type CreateUserResponse = User & {
    createTime: string
}

export function createUser(payload: CreateUserPayload) {
    return Axios.post<CreateUserResponse>('/user', payload)
}
```

---

## 枚举用例: Options

```ts {1-5|7-11|13-17|all}
enum ProductStatusType {
    undo = 1,
    doing = 2,
    done = 3,
}

const productStatusMap = Object.freeze({
    [ProductStatusType.undo]: '未受理',
    [ProductStatusType.doing]: '进行中',
    [ProductStatusType.done]: '已完成',
})

const productStatusOptions = Object.freeze([
    { name: productStatusMap[ProductStatusType.undo], value: ProductStatusType.undo },
    { name: productStatusMap[ProductStatusType.doing], value: ProductStatusType.doing },
    { name: productStatusMap[ProductStatusType.done], value: ProductStatusType.done },
])
```

<v-click>

进阶: 完成 productStatusMap, productStatusOptions 的类型声明

</v-click>

---

```ts {1,7,13}
enum ProductStatusType {
  undo = 1,
  doing = 2,
  done = 3,
}

const productStatusMap: Readonly<Record<EntityState, string>> = Object.freeze({
  [ProductStatusType.undo]: '未受理',
  [ProductStatusType.doing]: '进行中',
  [ProductStatusType.done]: '已完成',
})

const productStatusOptions: Readonly<{ name: string, value: ProductStatusType }> = Object.freeze([
  { name: productStatusMap[ProductStatusType.undo], value: ProductStatusType.undo },
  { name: productStatusMap[ProductStatusType.doing], value: ProductStatusType.doing },
  { name: productStatusMap[ProductStatusType.done], value: ProductStatusType.done },
])
```

<v-click>

更多[Utility Type](https://www.typescriptlang.org/docs/handbook/utility-types.html)

</v-click>

--- 

最后我们说一说泛型

``` ts
interface User { userId: string }
interface Product { productId: string }

function getUser(): Promise<User> {}
function getProduct(): Promise<Product> {}

getUser().then((res) => res.userId)
getProduct().then((res) => res.productId)
```

<v-click>

`Promise` 保证我们可以重复使用 `.then`。泛型 `<User>`, `<Product>` 保证我们能读取到相对的类型

</v-click>

<v-click>

所以泛型是什么？

</v-click>

<v-click>

``` ts
type ProductResponsePromise = Promise<Product>
```

</v-click>
<v-click>

``` ts
type CreateUserPayload = Pick<User, 'name'>
```
</v-click>
<v-click>

``` ts
const user = createUser(uid)
``` 

</v-click>
<v-click>

我相信你找到了规律，我们在使用泛型的时候，就相当于在调用 `TS`函数. 类型就是TS语言中的变量，`interface` `utility type` 相当于 TS语言中的函数，而泛型相当于函数的参数(形参)

</v-click>

---

Promise

``` ts
class MyPromise<T = void> {
    constructor(fn: (resolve?: (res?: T) => void, reject?: (err: Error) => void) => void) {
       // TODO
    }

    then<K = any>(fn: (res?: T) => K): MyPromise<K> {
        // TODO
    }

    catch<U = any>(fn: (err?: Error) => U): MyPromise<U> {
        // TODO
    }
}
```

<v-click>

Exclude 

``` ts
MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

</v-click>
<v-click>

``` ts
type MyExclude<T, U> = T extends U ? never : T;
```

</v-click>
<v-click>

TypeScript 类型体操 <https://github.com/type-challenges/type-challenges>

</v-click>

---
layout: center 
---

# Vue3 & Vue2.7

---

# setup option


提供超越UI抽象的逻辑抽象的能力

<v-click>


```html
<script lang="ts">
export default defineComponent({
    components: { Rect },
    setup(_props, _context) { // context.slot() context.emit();
        // 注意dom的绑定方式
        const draggbleDom = ref(null);
        const { x, y } = useDraggle(draggbleDom);
        const rangeX = computed(() => x.value < 0 ? 0 : x.value > 100 ? 100 : x.value);
        const rangeY = computed(() => y.value < 0 ? 0 : y.value > 100 ? 100 : y.value);
        return { x: rangeX, y: rangeY }
    }
})
</script>
<template>
    <div class="demo">
        <Rect ref="draggbleDom" :style="{ left: x, top: y }" class="draggble-rect" />
    </div>
</template>

```

</v-click>

<v-click>

观察一下 setup 中的语句原来都在哪里？

</v-click>

---

Setup Option 还有一些开发体验上不足

<v-click>

不符合 DRY 的组件声明方式

``` ts
import {
    ComponentA,
    ComponentB,
    ComponentC,
} from '@/components'

// skip
component: { ComponentA, ComponentB, ComponentC }
// skip
``` 

</v-click>
<v-click>

意难平的常量暴露方式

``` ts
import { productStatusOptions } from '@/types'
import { formatDate } from '@/utils';

setup() {
    return {
        productStatusOptions,
        formatDate
    }
}

```

</v-click>

---

Setup flag 将 setup 作用域范围提升到 script 标签 

<v-click>

```html
<script setup>
import { ComponentA, ComponentB, ComponentC } from '@/components'
import { productStatusOptions } from '@/types'
import { formatDate } from '@/utils';
</script>
<template>
    <ComponentC>
        <ComponentA 
            :key="opt.value"
            v-for="opt in productStatusOptions" 
            :name="opt.name" 
            :value="opt.value">
            <ComponentB>{{ formatDate(opt.date) }}</ComponentB>
        </ComponentA>
    </ComponentC>
</template>
```

</v-click>

---

提升 setup 后其他option的使用方式

<v-click>

```html {2,4,5|7,8|10,11|all}
<script setup>
const context = getCurrentInstance();

context?.slots;
context?.attrs;

const props = defineProps();
const emits = defineEmits();

// 不建议使用这么危险的用法
// defineExpose({ funcFoo, FuncBar }) 
</script>
```

</v-click>
<v-click>

[LifeCircle](https://cn.vuejs.org/api/)

``` html
<script setup>
// 这里是 setup
onBeforeMount(() => {})
onMounted(() => {})
</script>
```

</v-click>

---

Computed

``` ts
const conditionA = ref(false)
const conditionB = ref(true)

const condition = computed(() => conditionA.value && conditionB.value)
```

<v-click>

Watch

``` ts
const val = ref(1)
// 第一个参数大家看看文档
watch(val, () => {
    emits('change', val)
}, { immediate: true })
```

</v-click>

---

Option Data

``` ts
data () {
    return { a: 12, foo: { x: 0, y: 0 }}
}
```

<v-click>

``` html
<script setup>
const a = ref(12)
const foo = reactive({ x: 0, y: 0 })

const baz = computed(() => a.value === foo.x + 12)
</script>
<template>
<div :data-a="a" :data-foo-x="foo.x" :data-baz="baz">
</template>
```

</v-click>

<v-clicks>

- reactive: 只接受对象参数，返回这个对象的代理

- ref: 接受任意类型参数，返回一个包装对象的代理

- ref, reactive 都是深层监听。只是由于 ref 功能限制必须用 `.value` 取值，同理 computed 也是如此

- 但在模板绑定时可以忽略 `.value`

</v-clicks>

---
layout: center
---

# TypeScript in Vue3


---
layout: iframe

url: https://vitejs-vite-ch4ykr--5173.local-credentialless.webcontainer.io

---

---

<https://stackblitz.com/edit/vitejs-vite-ch4ykr?file=src/App.vue>

---
layout: center
---

# Thanks

Power by Slidev & Stackblitz

