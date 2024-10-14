---
title: 实用组件(component)
index: Framework.Vue.Practice
---



## Normal Component 

## Headless Component

:::accordion{title="Collapse Transition"}

> 橱窗动效，自适应内容高度

#### 声明

``` html
<script setup>
import { nextTick， defineOptions } from 'vue'

defineOptions({
    name: 'collapse-transition'
})

// enter-from
function handleBeforeEnter(el) {
    el.style.height = 0;
    el.style.overflow = 'hidden';
}

// enter-to
function handleEnter(el) {
    el.style.transition = 'height .3s ease'
    nextTick(() => {
        el.style.height = el.scrollHeight + 'px'
    })
}

function handleAfterEnter(el) {
    el.style.transition = 'none'
}

// leave-form
function handleBeforeLeave(el) {
    el.style.transition = 'height .3s ease'
}

function handleLeave(el) {
    el.style.height = 0
}

function handleAfterLeave(el) {
    el.style.transition = 'none'
}


</script>
<template>
<Transition
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
>
    <slot></slot>
</Transition>
</template>

```

::accordion

<ToggleContent title="Shell">

> 声明局部变量，可以减少一些模版中的逻辑代码编写

#### 声明

``` html
<!-- Shell.vue -->
<script lang="ts" setup>
defineOptions({ name: 'Shell' })

withDefaults(
    defineProps<{
        variables?: Record<string, any>
    }>(),
    {
        variables: () => ({})
    }
);
</script>
<template>
  <slot v-bind="variables"></slot>
</template>
```

#### 使用

``` html
<List>
  <ListItem
    v-for="item in list"
    :key="item.id"
  >
    <Shell
      :variable="{ isOnline: item.status === SwitchType.on }"
      :v-slot="{ isOnline }">
      {{ item.name }} {{ isOnline ? '售卖中' : '已下架' }}
      <DeleteButton :disabled="isOnline">
    </Shell>
  </ListItem>
</List>
```

</ToggleContent>


### Vue2 一种动态载入组件文件的方式 


``` html
<!-- index.html -->
<div id="app">
    <button @click="tab('testCom')">com</button>
    <button @click="tab('testFoo')">foo</button>
    <component :is="dynamicComponent"></component>
</div>
<script src="./vue.min.js"></script>
<script type="module" src="/main.js"></script>
```

``` js
// main.js
const app = new Vue({
  el: '#app',
  data() {
    return {
      dyCmpScript: null,
      dynamicComponent: Vue.component('abc', {
        template: '<div>123</div>'
      })
    }
  },
  methods: {
    tab (url) {
      const cmpFileUrl = './' + url + '.js'

      const scriptDom = document.createElement('script')
      scriptDom.addEventListener('load', () => {
        // console.log(url, dynamicComponent)
        this.dynamicComponent = dynamicComponent
        document.body.removeChild(scriptDom)
      })

      scriptDom.src = cmpFileUrl

      document.body.appendChild(scriptDom)
    }
  },
  mounted() {
    
  }
})

```

``` js
// test-com.js
// dynamicComponent 全局变量名称统一便于覆盖
var dynamicComponent = Vue.component('test-com', {
	template: `
        <button class="m-header-wrap" @click="log">
            aaaaaaaaaaaaaaa
        </button>
    `,
    data() {
        return {
            msg: 'im com'
        }
    },
    methods: {
        log() {
            console.log(this.msg)
        }
    },
    created() {
        console.log('加载了com')
    },
})

```


``` js
// test-foo.js
var dynamicComponent = Vue.component('test-foo', {
	template: `
        <button class="m-header-wrap" @click="log">
            bbbbbb
        </button>
    `,
    data() {
        return {
            msg: 'im foo'
        }
    },
    methods: {
        log() {
            console.log(this.msg)
        }
    },
    created() {
        console.log('加载了foo')
    },
}
)
```