

``` js
import express from 'express'
import bodyParser from 'body-parser'

import blogCommentRouter from './router/blogComment'
const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8')

  next()
})

app.use(blogCommentRouter)


app.get('/', (req, res) => {
  res.send('hello~')
})

app.listen(7788, (err) => {
  if (err) {

  }
  else {
    console.log('启动')
  }
})
```