``` ts
function fileChange (e) {
  const file = this.$refs.fileInput.files[0]
  
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      

      console.log('22222', reader.result)
      // const img = new Image()
      // img.onload = () => {
      //   this.draw(this.imageObject = img)
      // }
      // img.src = reader.result
    }

    // reader.readAsArrayBuffer(file)
    // reader.readAsText(file)
    reader.readAsDataURL(file)
  }

}

function draw (dataUrl) {
  console.log(dataUrl)

  if (!this.canvasCtx) {
    const canvas = this.$refs.canvas
    this.canvasCtx = canvas.getContext('2d')
  }
  
  this.canvasCtx.drawImage(dataUrl, 10, 10)
}
    
function changeSize(option) {
  this.sizeType = option.value
  const canvas = this.$refs.canvas
  canvas.width = option.width
  canvas.height = option.height

  if (this.imageObject) {
    this.draw(this.imageObject)
  }
}
```