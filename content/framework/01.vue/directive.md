---
title: directive 指令
index: Framework.Vue.Syntax
---



## 声明

``` ts
function formatSize (el) {
  el.style.height = el.offsetWidth + 'px'
}

Vue.directive('square', {
  inserted: formatSize,
  // update: formatSize,
  componentUpdated: formatSize,

})
```