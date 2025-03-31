---
title: Hono Router
date: 2025-02-26
---

### 声明路由

``` ts
import { app } from '~/core'

app.get('/users', async (c) => {
  return c.json({
    data: [/* user1 *//*, user2 */]
  })
})
```

### 获取参数 


``` ts
// DELETE /demos/12
app.delete('/demos/:id', async (c) => {
  const id = c.req.param('id')

  await db('demos').where({ id }).del()
  return c.json({
    data: null
  })
})

// POST /demos { name: 12 }
app.post('/demos', async (c) => {
  const post = await c.req.json()

  const [insertId] = await db('demos').insert({ name: post.name })

  const demo = await db('demos').where({ id: insertId }).first()
  return c.json({
    data: demo
  })
})

// GET /demos?page=1
app.get('/demos', async (c) => {
  const params: Record<string, string> = c.req.query()
  const page: string = c.req.query('page')


})
```


### 代理 API

``` ts
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import Axios from 'axios'

app.all('/proxy/*', async (c) => {
  // 目标 API 地址
  const targetUrl = c.req.path.replace('/proxy', '')

  try {
    // 处理 GET 之外的请求体
    const data = c.req.method === 'GET' ? null : await c.req.json()

    const requestConfig = {
      method: c.req.method,
      url: targetUrl,
      headers: c.req.header(),
      data,
    }

    console.log('proxy request:', requestConfig)

    // 代理请求
    const response = await axios.request(requestConfig)
    
    return c.json(response.data, response.status as ContentfulStatusCode)

  } catch (error: any) {
    return c.json(
      { error: error.message, details: error.response?.data },
      error.response?.status || 500
    )
  }
})
```
