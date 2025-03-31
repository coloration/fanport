---
title: ioredis
date: 2025-02-26
---

### install

`npm:ioredis` 比 `npm:redis` 使用方法更加友好，也支持集群功能 

``` bash
$ npm i ioredis
```


### Define

``` ts
import Redis from 'ioredis'

export const redis = new Redis({
  host: import.meta.env.REDIS_HOSTNAME,
  port: Number(import.meta.env.REDIS_PORT),
  // password: import.meta.env.REDIS_PASSWORD,
  // db: Number(import.meta.env.REDIS_DB)
})

redis.ping()
  .then(res => console.log('Redis connected:', res))
  .catch(console.error)
```


``` ts
import Redis from 'ioredis'

export function redisContext(cb: (client: Redis) => Promise<any>) {
    const client = new Redis(6379, 'localhost')

    return cb(client)
        .then(() => {
            client.disconnect()
            return Promise.resolve()
        })
}

redisContext(async function (client) {
    const key = 'article:1'
    await client.set(key, String(Math.random()))
    await client.get(key)
    // 0.7489682238325692
})
```

### Use

``` ts
// hono router
app.get(`test-redis`, async (c) => {
  await redis.set('test', 'hello world')

  return c.json({
    data: 'ok'
  })
})
```
