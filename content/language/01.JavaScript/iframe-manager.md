---
title: iframe Manager
---


``` ts
export class Frame {
  
  private static _id = 0

  static create (manager: FrameManager, selector: string | HTMLIFrameElement) {
    const frameDom: HTMLIFrameElement | null = 
      typeof selector === 'string' 
        ? window.document.querySelector(selector)
        : selector
    if (!frameDom) return null

    Frame._id += 1
    const frame = new Frame({
      frameId: Frame._id + '',
      frameWindow: frameDom.contentWindow,
      frameManager: manager
    })
    
    return frame
  }

  private frameWindow: Window
  public frameId: string
  private frameManager: FrameManager

  private constructor (option: any) {
    this.frameId = option.frameId
    this.frameWindow = option.frameWindow
    this.frameWindow.name = this.frameId
    this.frameManager = option.frameManager
  }

  public send (frameId: string, message: any) {
    if (!this.frameWindow) return
    const targetFrame = this.frameManager.findFrame(frameId)
    if (!targetFrame) return

    this.frameWindow.postMessage({ message }, targetFrame.frameWindow.location.origin)
    
  }

  public on (cb: (message: any) => void) {
    this.frameWindow.addEventListener('message', cb)
  }

  public once (cb: (message: any) => void) {
    this.on((message) => {
      cb(message)
      this.remove(cb)
    })
  }

  public remove (cb: (message: any) => void) {
    this.frameWindow.removeEventListener('message', cb)
  }
}

export class FrameManager {

  private frames: Frame[] = []

  public createFrame (selector: string | HTMLIFrameElement) {
    const frame = Frame.create(this, selector)
    if (frame) this.frames.push(frame)
    return frame
  }

  public findFrame (frameId: string) {
    return this.frames.find(f => f.frameId === frameId)
  }

  public removeFrame (frameId: string) {
    const frameIndex = this.frames.findIndex(f => f.frameId === frameId)
    if (frameIndex < 0) return
    this.frames.splice(frameIndex, 1)
  }
}
```