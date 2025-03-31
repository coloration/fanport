---
title: Hono Startup
date: 2025-02-26
---

## Startup

### install

``` ts
$ npm i hono
```

### Define

``` ts
// core.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'

export const app = new Hono()

app.use(
  '*',
  cors({
    origin: '*', // 允许所有来源
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
    allowHeaders: ['Content-Type', 'Authorization'], // 允许的自定义头
  })
)

app.onError((err, c) => {
  console.error('Server Error:', err)
  return c.json({ error: 'Internal Server Error' }, 500)
})
```

### Serve

用 Bun 启动

``` ts
// 用 bun
import { serve } from 'bun' 
// or 用 Node
import { serve } from '@hono/node-server' 


import { app } from './core'
import './router'

const port = Number(import.meta.env.port) || 9750
console.log(`server is listening: ${port}`)

serve({
  fetch: app.fetch,
  port,
})
```