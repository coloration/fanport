---
title: Axios
date: 2025-02-26
---

- [Github](https://github.com/axios/axios)


### 创建实例 

``` ts
import axios from 'axios'

export const PLATFORM_BASEURL = `http://foo`

export const api = axios.create({
  baseURL: PLATFORM_BASEURL,
  headers: {
    'ContentType': 'application/json',
  }
})
```

### get like 

``` ts
import axios from 'axios'

type get = (url: string config: AxiosRequestConfig) => Promise<any>

// GET http://api.io?a=5&b=12
await axios.get(`http://api.io`, { params: { a: 5, b: 12 } })
```

### post like

``` ts
import axios from 'axios'

type get = (url: string, data: any, config: AxiosRequestConfig) => Promise<any>

await axios.post(`http://api.io`, { a: 5, b: 12 }, {
  headers: {
    'ContentType': 'application/json',
  }
})
```



### 拦截请求

``` ts
api.interceptors.request.use(async (config) => {
  if ((config as any).skipAuth) return config
  if (!Token.isValidate()) {
    await Token.refresh()
  }
  config.headers['Authorization'] = `${Token.tokenType} ${Token.cache}`

  return config
})

class Token {
  static cache: string = ''
  static tokenType: string
  static expiresAt: number = 0

  static async refresh() {

    /// 根据具体业务逻辑修改
    const tokenData = await fetchToken()
    // 计算 token 的过期时间（假设 expires_in 是以秒为单位的）
    Token.expiresAt = Date.now() + tokenData.expires_in * 1000
    Token.cache = tokenData.access_token
    Token.tokenType = tokenData.token_type
  }

  static isValidate() {
    return Token.expiresAt - Date.now() > 5 * 60 * 1000
  }
}
```


### 关闭 https 校验

``` ts
import axios from 'axios'
import { Agent } from 'https'

export const api = axios.create({
  baseURL: `http://foo`,
  httpsAgent: new Agent({
    rejectUnauthorized: false
  }),
})
```

