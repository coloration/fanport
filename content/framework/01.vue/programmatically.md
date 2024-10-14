---
title: 程序式开发
index: Framework.Vue.Syntax
---

## Vue3

``` ts
import { h } from 'vue'

{
  ///...
  render () {
    return h('div', {
      id: 'foo',
      onClick: this.onClick
    }, 'hello')
  }
}
```


## Vue2

``` ts
{
  ///...
  render(h) {
    return h('div', {
      attrs: { id: 'foo' },
      on: {
        click: this.click
      }
    }, 'hello')
  }
}
```


