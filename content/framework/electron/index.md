---
title: Electron
---

## electron 线程通讯

### 定义

> type

``` ts
export enum IpcType {
    REQUEST_RENDERER_RECEIVE = 'REQUEST_RENDERER_RECEIVE',
    REQUEST_RENDERER_SEND = 'REQUEST_RENDERER_SEND',
    REQUEST_MAIN_RECEIVE = 'REQUEST_RENDERER_SEND',
    REQUEST_MAIN_SEND = 'REQUEST_RENDERER_RECEIVE',  
}

export enum MainRequestType {
    DEMO,
}

export type RequestResponse<T = any> = {
    status: number,
    message: string,
    data: T
}
```


> main

``` ts
import { ipcMain, IpcMainEvent } from 'electron'
const _map = new Map()

export interface AnswerContext {
  reply: (data: any) => void,
  event: IpcMainEvent,
  type: MainRequestType,
}

ipcMain.on(IpcType.REQUEST_MAIN_RECEIVE, (event, params) => {
    const reply = function (data: any) {
      event.reply(IpcType.REQUEST_MAIN_SEND, {
        _symbol: params._symbol,
        // data 传递给客户端，最终 resolve 它
        data
      })
    }
    const ctx: AnswerContext = {
      reply,
      event,
      type: params.type
    }
    const cb = _map.get(params.type)
    if (typeof cb === 'function') {
      cb(ctx, params.data)
    } else {
      // 没有注册~
    }
})

export function regist (type: MainRequestType, cb: <T = any>(ctx: AnswerContext, data: T) => any) {
	_map.set(type, cb)
}
```

> renderer

``` ts
import { ipcRenderer } from 'electron'

const _map = new Map<string, Function>()

ipcRenderer.on(IpcType.REQUEST_RENDERER_RECEIVE, (event: any, params: any) => {
    const cb = _map.get(params._symbol)
    if (typeof cb === 'function') {
        _map.delete(params.symbol)
        cb(params.data)
    }
})

export function askMain<K = any>(type: MainRequestType, data?: any) {
    const _symbol = `${Date.now()}/${type}`
    return new Promise<K>(resolve => {
        _map.set(_symbol, (data: K) => {
            resolve(data)
        })

        ipcRenderer.send(IpcType.REQUEST_RENDERER_SEND, {
            _symbol, type, data
        })
    })
}
```

### 使用

> main

``` ts
regist(MainRequestType.DEMO, async (ctx, args) => {

    const responseData = await doSomethingWithArgs()

    ctx.reply({
        status: 200,
        message: 'sucess',
        data: responseData
    })
})
```

> renderer 

``` ts
askMain(MainRequestType.DEMO, args)
.then(response => {
    const {
        status, message, data
    } = response
})
```

