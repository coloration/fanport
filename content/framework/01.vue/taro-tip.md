---
title: Taro Vue3 tip
index: Framework.Vue.Practice
---

[toc]

## 路由

<ToggleContent title="路由参数">

``` ts
// users.vue
import { navigateTo } from '@tarojs/taro'

function goUsers() {
    navigateTo({
        url: '/pages/user/index?id=1'
    })
}

// user.vue
import { useLoad } from '@tarojs/taro'
useLoad((param) => {
    const userId: number = Number(param.id || 0)
})
```

</ToggleContent>