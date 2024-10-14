---
title: Plugin 插件
index: Framework.Vue.Practice
---



### 注册插件

``` ts
import { createApp } from 'vue'
import Main from './alert.vue'

const Alert = {}

Alert.install = app => {

  let instance
  let container = null

  const loadAlert = options => {
    if (container) return
    let { handleClose } = options
    options.handleClose = () => {
      handleClose && handleClose()
      document.body.removeChild(container)
      instance.unmount()
      container = null
    }

    container = document.createElement('div')
    instance = createApp(Main, options)
    instance.mount(container)
    document.body.appendChild(container)
  }

  app.config.globalProperties.$alert = loadAlert
}

export default Alert
```