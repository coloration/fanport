---
title: 实用组合式api(composition api)
index: Framework.Vue.Practice
---



### useNativeEventListener

``` ts
import { onMounted, onBeforeUnmount } from '@vue/composition-api'

export function useNativeEventListener (target, evName, callback) {
  onMounted(() => {
    target.addEventListener(evName, callback, false)
  })

  onBeforeUnmount(() => {
    target.addEventListener(evName, callback, false)
  })
}
```


### useStore

``` ts
export class Store {
  store = null

  constructor (store) {
    this.store = reactive(store)
  }


  useStore = () => {
    if (this.store === null) throw new ReferenceError('store is' + this.store)

    const dispatch = (name, value) => {
      console.log('dispatch', name, value)
      this.store[name] = value
    }

    return { store: this.store, dispatch }
  }
}
```

<ToggleContent title="useQueryParams">

``` ts
import { reactive, watchEffect, onMounted, onBeforeMount } from '@vue/composition-api'

export function useQueryParams (defaultParams, raw = true, delay = 16) {
  
  const params = reactive(defaultParams)
  let lastSearch = ''
  let timer = null
  let listeners = []

  watchEffect(() => {
    
    const search = Object.keys(params).reduce((s, key, i) => {
      return s + (i === 0 ? '?' : '&') + `${key}=${params[key]}`
    }, '')

    if (lastSearch === search) return

    window.history.pushState('', null, search)
    listeners.forEach(l => l(params, window.location))
    lastSearch = search
  })

  onMounted(() => {
    
    function loop () {
      
      if (lastSearch !== window.location.search) {
        window.location.search
          .replace(/^\?/, '')
          .split('&')
          .map(str => str.split('='))
          .forEach((pair) => {
            params[pair[0]] = raw ? JSON.parse(pair[1]) : pair[1]
            
          })
        
        lastSearch = window.location.search
      }

      setTimeout(loop, delay)
    }

    timer = setTimeout(loop, delay)
  })

  onBeforeMount(() => {
    clearTimeout(timer)
    listeners = []
  })

  return { params }
}
```

``` ts
// use 
import { watchEffect } from '@vue/composition-api'
import { useQueryParams } from '../composition'
export default {
  setup () {
    const { params } = useQueryParams({
      search: '123456',
      page: 1
    }, false)

    watchEffect(() => {
      const variables = {
        search: params.search,
        page: Number(params.page)
      }
      console.log('fetch', variables)
    }, { deep: true })


    return {
      params
    }
  }
```

</ToggleContent>


<ToggleContent title="usePulldown">

移动端下拉刷新。依赖 vueuse 的插值 composition. `useTransition`

``` ts
import { ref, watch } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'

export function usePulldown (
  el, 
  option
) {
  const { 
    disabled,
    threshold, 
    maxOffset, 
    backDuration,
    backTimingFunction,
    onPulldownStart,
    onPulldownEnd, 

} = Object.assign({ 
    threshold: 10, 
    maxOffset: 50,
    backDuration: 100,
    disabled: ref(false),
    backTimingFunction: TransitionPresets.easeInBack
  }, option)

  const startY = ref(0)
  const isPulling = ref(false)
  const offsetY = ref(0)
  const _offsetY = useTransition(offsetY, {
    duration: backDuration,
    transition: backTimingFunction,
    disabled: isPulling
  })
  
  let touched = false

  function reset() {
    startY.value = 0
    isPulling.value = false
    offsetY.value = 0
    touched = false
  }

  function _handleTouchstart(e) {
    if (isPulling.value) return
    touched = true
    startY.value = e.changedTouches[0].pageY
  }

  function _handleTouchmove(e) {
    
    const moveY = e.changedTouches[0].pageY
    if (!touched || moveY < startY.value || moveY - startY.value < threshold) return
    let goingOn = true
    if (!isPulling.value) {
      goingOn = !onPulldownStart?.(e)
    }

    if (!goingOn) {
      startY.value = e.changedTouches[0].pageY
      return 
    }
    isPulling.value = true
    const offset = moveY - startY.value
    offsetY.value = offset > maxOffset ? maxOffset : offset
  }

  function _handleTouchend(e) {
    if (!touched || !isPulling.value) return
    onPulldownEnd?.(e)
  }

  function mount() {
    if (!el.value) return
    el.value.addEventListener('touchstart', _handleTouchstart)
    el.value.addEventListener('touchmove', _handleTouchmove)
    el.value.addEventListener('touchend', _handleTouchend)
  }

  function unmount() {
    if (!el.value) return
    el.value.removeEventListener('touchstart', _handleTouchstart)
    el.value.removeEventListener('touchmove', _handleTouchmove)
    el.value.removeEventListener('touchend', _handleTouchend)
  }


  watch([
    () => el.value,
    () => disabled.value
  ], () => {
    if (!el.value) return
    console.log('disabled.value', disabled.value)
    if (disabled.value) {
      unmount()
      return
    }

    mount()
  })

  return {
    startY,
    offsetY: _offsetY,
    isPulling,
    reset,
  }
}
```

</ToggleContent>

