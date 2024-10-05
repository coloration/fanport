---
title: Mongoose 
index: Language.SQL.Library
--- 

> mongoose 是 mongodb 的 ODM


``` js
// database.js
import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017/blog'

const options = {
  useNewParser: true
}

mongoose.Promise = global.Promise

mongoose.connect(uri, options)
.then(db => console.log('连接数据库成功'))
.catch(err => console.log('连接数据失败'))

export default mongoose
```

### router

``` js
// model.js
import db from './database'

const schema = new db.Schema({
  aid: { type: String, require: true },
  comment: { type: String, require: true },
  visitorName: { type: String, require: true },
  visitorMail: { type: String, require: true },
  date: { type: Number, require: true }
})

export default db.model('comments', schema)
```

``` js
// router.js
import CommentModel from './model'


router.route('/blog/comment/:aid')
.get((req, res) => {

  console.log(req.params)
  CommentModel.find({ aid: req.params.aid })
  .then(docs => {
    res.send({ 
      message: '获取评论成功', 
      data: docs.map(formatDocument)
    })
  })
  .catch(error => {
    res.status(404).send({ 
      message: '获取评论失败', 
      ori: req.params,
      error
    })
  })
})
.post((req, res) => {
  let error = null
  const { aid } = req.params
  const { visitorName, visitorMail, comment } = req.body

  if (!visitorName || !nameReg.test(visitorName)) error = '没有提供名字，或者过长'
  else if (!visitorMail || !mailReg.test(visitorMail)) error = '没有提供邮箱，或者格式不正确'
  else if (!comment || !cmmtReg.test(comment)) error = '没有评论，或者评论过长 <200'
  
  if (error) return res.status(403).send({ message: error, ori: req.body })

  const commentModel = new CommentModel({ 
    aid, 
    visitorName, 
    visitorMail, 
    comment,
    date: new Date()
  })

  commentModel.save()
  .then(doc => res.send({ message: '评论成功', data: formatDocument(doc) }))
  .catch(error => {
    res.status(403).send({
      message: '评论失败',
      ori: res.body,
      error
    })
  })
})

```


### CRUD

``` js
const options = {}

const schema = new db.Schema({
  title: {
    type: String
  }
}, options)

// Model
const Event = db.model('Event', schema)
```

#### Create

``` js
const event1 = new Event({
  title: 'Nodejs 开发者大会'
})

event1.save()
.then(document => console.log(document))
.catch(err => console.log(err))

const data = [
  { title: 'Nodejs 开发者大会' },
  { title: 'Rails 开发者大会' },
  { title: 'Google I/O大会' }
]

Event.insertMany(data)
.then(() => console.log('数据插入成功'))
.catch(err => console.log(err))
```


#### Read

``` js
Event.find()
.then(documents => console.log('\n所有文档\n' + documents))

Event.find({ title: 'Nodejs 开发者大会'})
.then(documents => console.log('\n指定标题的文档\n' + documents))

Event.findOne({ title: 'Nodejs 开发者大会'})
.then(document => console.log('\n findOne 指定标题的文档\n' + document))

Event.findOne({ _id: '5c6241f5f40486052c465662' })
.then(document => console.log('\n findOne 指定_id的文档\n' + document))


// Event.findById({ _id: '5c6241f5f40486052c465662' })
// or
Event.findById('5c6241f5f40486052c465662')
.then(document => console.log('\n findById d的文档\n' + document))
```


#### Update

``` js
Event.findByIdAndUpdate(
  '5c623c47ee4b35049f899db7', 
  { $set: { title: '吐槽大会' + new Date().getTime() } }, 
  { new: true } // 返回更新之后的文档
)
.then(doc => console.log(doc))
``` 

#### Delete 

``` js
Event.findOneAndDelete('5c623c6954975e04a55b4cf9')
.then(removedDoc => console.log(removedDoc))
```