---
title: Setup
index: Framework.Vue.Syntax
---



记录一些 setup 的语法

## Basic

1. setup option

```ts
import { Btn } from '@/components'
import { formatDate } from '@/utils'

export default defineComponent({
  components: { Btn },
  setup() {
    function handleClick () {}
    return { handleClick, formatDate }
  }
})
```

2. setup flag

``` html
<script setup>
// auto expose component
import { Btn } from '@/components'
// auto expose variable
import { formatDate } from '@/utils'
function handleClick () {}

</script>
```

## Props

### 定义

1. setup 选项写法

```js
export default defineComponent({
  props: {
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    watch(
      () => props.disabled, 
      (newVal) => { /* todo */ }, 
      { immediate: true }
    )
  }
})
```

2. setup 标记写法

``` html
<!-- 简写 -->
<script setup>
// without default value
const props = defineProps(['disabled'])

// with default value
const props = defineProps({
  disabled: { type: Boolean, default: false },
})

</script>
```

3. setup 标记写法 & typescript

``` html
<!-- 推荐 -->
<script setup lang="ts">

// without default value
const props = defineProps<{ disabled?: boolean }>()

// with default value.01 推荐
const props = withDefaults(
  // Note: 
  // disabled? mean not required
  // disabled mean required
  defineProps<{ disabled?: boolean }>(),
  { disabled: true },
)


// with default value.02
const props = defineProps({
  disabled: { type: Boolean as PropType<boolean>, default: false },
})
</script>
```

### 使用

``` html
<script setup lang="ts">
const props = //... 

// use
watch(
  () => props.disabled, 
  (newVal) => /* todo */, 
  { immediate: true }
)
```

### 暴露给外部使用 defineExpose

``` html
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({ a, b })
</script>
```


## Emits

### 定义

1. setup 选项

``` ts
export default defineComponent({
  emit: ['change'],
  // or
  emit: {
    change: null,
    delete: (payload) => {
      // TODO: what is payload
      // TODO: how to check?
    }
  },
  setup(_props, context) {
    context.emit('change'/*,  */)
  }
})
```

2. setup 标记

``` html
<script setup>
const emits = defineEmits(['close', 'increase'])
</script>

<!-- before v3.4 --> 
<script setup lang="ts">
const emits = defineEmits<{
  (e: 'close') :void,
  (e: 'increase', num: number) : void
}>()
</script>

<!-- after v3.4 推荐 --> 
<script setup lang="ts">
const emits = defineEmits<{
  close: [],
  increase: [num: number]
}>()
</script>

```


### 使用

``` ts
function handleClose () {
	// ... codes
	emits('close')
}

function handleAdd (n: number) {
	// ... codes
	emits('increase', n)
}
```


## define component name


setup flag。值不能设置为非常量

``` ts
// after 3.3
import { defineOptions } from 'vue'
defineOptions({
  name: 'OneBar',
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
```

## use context

``` ts
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
```

## use vuex in vue2

1. setup option OR setup flag

``` ts
// <script setup>
const instance = getCurrentInstance()
instance?.proxy.$store
```

2. useStore

``` ts
export function useStore() {
  return getCurrentInstance().proxy.$router
}

// use
const store = useStore()
```

## use vue-router in vue2

1. setup option OR setup flag

``` ts
// <script setup>
const instance = getCurrentInstance()
instance?.proxy.$router.push('/about')
```

2. useRouter

``` ts
export function useRouter () {
  return getCurrentInstance().proxy.$router
}

export function useRoute () {
  return getCurrentInstance().proxy.$route
}

// use
const router = useRouter()
router.push('/about')
```
