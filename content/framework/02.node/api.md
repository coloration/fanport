---
title: 常用 API
index: Framework.Node.Syntax
---



node API

## EventEmitter

``` js
const EventEmitter = require('event')
const emitter = new EventEmitter()

emitter.on([eventName],  [callback])
emitter.once([eventName],  [callback])

emitter.emit([eventName], callbackArguments)
```


## http

```js
const http = require('http')

// 网络请求
const options = {
  protocol: 'http:',
  hostname: 'api.douban.com',
  port: '80',
  method: 'GET',
  path: '/v2/movie/top250'
}

http.request(options, [callback<responseStream>]) => request 
request.on('error', [callback<error>])
request.end()

responseStream.setEncoding([typeString]) // typeString: 'utf8'
responseStream.on('data', [callback<dataChunk>])

// 服务器
http.createServer() => server
server.on('request', [callback<request, response>])
server.listen([port])

```


## path

```js
const path = require('path')

path.resolve([startPath], [aimPath])
```

