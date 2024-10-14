---
title: Mixin(Deprecated)
index: Framework.Vue.Syntax
---


``` js
const actionName = 'setPageTransitionName'

export default {
  methods: {

    $routerPush (path) {
      this.$store.dispatch(actionName, 'push')
      const stack = this.$store.state.global.pageStack.slice()
      stack.push(path)
      this.$store.dispatch('setPageStack', stack)
      this.$router.push(path)
    },

    $routerBack () {
      this.$store.dispatch(actionName, 'pop')
      const stack = this.$store.state.global.pageStack.slice(0, this.$store.state.global.pageStack.length - 1)
      this.$store.dispatch('setPageStack', stack)
      this.$router.back()
    },

    $routerGo (n, aniName = 'pop') {
      if (n >= 0) return window.console.error('$routerGo n < 0')

      const stack = this.$store.state.global.pageStack.slice(0, this.$store.state.global.pageStack.length + n)
      this.$store.dispatch('setPageStack', stack)
      this.$store.dispatch(actionName, aniName)
      this.$router.go(n)
    },

    $routerReplace(path, to = 'slide-left') {
      this.$store.dispatch(actionName, to)
      const stack = this.$store.state.global.pageStack.slice()
      stack[stack.length === 0 ? 0 : stack.length - 1] = path
      this.$store.dispatch('setPageStack', stack)

      this.$router.replace(path)
    },
    $routerClearAnimate () {
      this.$store.dispatch(actionName, 'none')
    },

    $routerClearStack () {
      return this.$store.dispatch('setPageStack', [])
    }
  },

  mounted () {
    this.$store.dispatch(actionName, 'none')
  }
}
```