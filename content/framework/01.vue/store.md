---
title: Store 状态管理
index: Framework.Vue.Practice
---



## Vue3

### Pinia

pinia in ts: <https://runthatline.com/pinia-typescript-type-state-actions-getters/>

### Vue vanilla

#### Implement

``` ts
// global
const _count = ref(1)


export function useCountStore() {

  const count = computed(() => _count.value)

  function increase() {
    _count.value++
  }

  function decrease() {
    _count.value--
  }


  return { count, increase, decrease }
}
```

#### Use

``` ts
// component A
const { increase } = useCountStore()
increase()

// component B
const { count } = useCountStore()
```


## Vue2

### Pinia

### Vuex `Deprecated`

#### Implement

``` ts
import Vue from 'vue'
import Vuex from 'vuex'

// register vuex as a plugin with vue in Vue 2
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    ADD_ITEM(state, item) {
      state.items.push(item)
    },
    REMOVE_ITEM(state, id) {
      state.items = state.items.filter(item => item.id !== id)
    }
  },
  getters: {
    totalLength: state => state.items.length
  }
})
```
#### Use

``` html
<template>
  <ul>
    <li v-for="(item, i) in $store.state.items" :key="i">
      {{ item.name }}
    </li>
  </ul>
  <form @submit.prevent="handleSubmit">
    <input v-model="value" required placeholder="Item Name">
  </form>
</template>

<script>
export default {
  data:() => ({value: ''}),
  methods: {
    handleSubmit(){
      this.$store.commit('ADD_ITEM', {
        id: Math.random().toString(),
        name: this.value
      });
      this.value = ''
    }
  }
} 
</script>
```


### Tips

- vuex action 中不要既同步执行 mutation 又异步执行 mutation 这会使下游的监听函数执行多次. 应该在action层拆分


## SSR