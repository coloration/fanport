1. 使用 koa-compose 组合中间件时，同步和异步的不能混合成一组。其中一个会抛弃。（待验证是不是慢的会被抛弃）

2. ctx.throw(500) 与 ctx.status = 500 的区别，前者不可再设置body 的返回值，后者可以。

3. 捕获异常可以在顶层设计中间件
``` javascript
const handler = async (ctx, next) => {
  try { await next() }
  catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = { message: err.message }
  }
}

const main = ctx => ctx.throw(500)

app.use(handler)
app.use(main)
```

4. Koa 处理cookies

``` javascript
const main = ctx => {
  const n = Number(ctx.cookies.get('view') || 0) + 1
  ctx.cookies.set('view', n)
  ctx.response.body = n + 'views'
}
```

5. koa-body 处理post数据 `app.use(koaBody())`

<http://www.ruanyifeng.com/blog/2017/08/koa.html> 最后一个文件上传示例


``` js
const os = require('os')
const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const cors = require('koa-cors')

const app = new Koa()
const router = new Router()

const main = async ctx => {
  const tmpdir = os.tmpdir()
  const filePaths = []

  const files = ctx.request.body.files || {}

  for (let key in files) {
    const file = files[key]
    const filePath = path.join(tmpdir, file.name)
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)

    read.pipe(writer)
    filePaths.push(filePath)
  }

  ctx.body = filePaths
}

const def = ctx => {
  console.log(1)
  ctx.response.body = 1
}

const zipFont = ctx => {
  console.log(ctx.request.body)
  ctx.response.body = { message: '上传成功' }
}

router.post('/zipfont', zipFont)
router.get('/', def)

app.use(cors())
app.use(koaBody({ multipart: true }))
// app.use(main)

app.use(router.routes())
.use(router.allowedMethods())
app.listen(1231)
console.log('listening 1231')
```