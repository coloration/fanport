---
title: FileReader
---

``` html
<template>
  <div>
    <input ref="input" type="file" @change="handleChange">
    <img :src="resultUrl" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      resultUrl: ''
    }
  },
  methods: {
    handleChange (_e) {
      const file = this.$refs.input.files[0]
      const file = e.target.files[0]

      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {

          const base64Url = this.handleImage(img)
          this.resultUrl = base64Url
        }
        img.src = reader.result
        
      }
      reader.readAsDataURL(file)
      
    },

    handleImage (img) {
      console.log(img)
      const canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 400
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, 600, 400)

      return canvas.toDataURL()

    }
  }
}
</script>
```