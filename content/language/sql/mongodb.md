---
title: MongoDB
index: Language.SQL.Library
---

## startup

``` bash
$ npm i mongodb -S
$ npm i @types/node -D
```


## 连接 mongodb atlas

``` ts
import { MongoClient } from 'mongodb'

// https://www.mongodb.com/atlas
const url = 'mongodb+srv://<username>:<password>@<cluster_address>';
const dbName = '<database_name>'

const client = new MongoClient(url)

async function main() {
  await client.connect()

  const db = client.db(dbName)
  const match = db.collection('<table_name>')

  await match.insertOne(/* insert_content */)
  await client.close()

}

main()
```


### Singleton

``` ts
import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

const { MONGODB_URI, MONGODB_DATABASE } = process.env

export class Database {
  
  static #uniqueInstance: Database
  static get instance () {
    return Database.#uniqueInstance 
      || (Database.#uniqueInstance = new Database(MONGODB_URI!))
  }

  client: MongoClient

  constructor (uri: string) {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })
  }

  async connect() {
    await this.client.connect()
  }

  async drop() {
    await this.client.close()
  }

  db (db?: string) {
    return this.client.db(db || MONGODB_DATABASE!)
  }
}


```

## CRUD

``` ts
const client = Database.instance.client
const connect = await client.connect()
const db = client.db()
const coll = db.collection(collection)
const doc: Document
const docs: Document
```


### Create 

``` ts
(async function () {
  
  await coll.insertOne(
    // document!
    { league: 'World Cup - Wonmen', date: '2023-08-08' }
    // options?
    // {}
  )

  await coll.insertMany(
    // document[]!
    [
      { league: 'World Cup - Wonmen', date: '2023-08-08' },
      { league: 'Premier League', date: '2023-08-11' },
    ],
    // options?
    // {}
  )
})()
```

### Delete

``` ts
(async function () {
  // 删除匹配条件的所有
  await coll.deleteMany(
    // filter?
    { date: '2023-08-08' }, 
    // options?
    // {},
  )

  // 清空集合
  await coll.deleteMany({})

  // 删除匹配条件的第一个
  await coll.deleteOne(
    // filter?
    { date: '2023-08-08' }, 
    // options?
    // {}, 
  )

})()
```


### Update

``` ts

(async () => {
  // 返回更新后的值
  await coll.findOneAndUpdate(
    // filter!
    { league: 'World Cup - Wonmen' }, 
    // updateFilter!
    {
      $set: { data: '2023-06-08' }
    },
    // options?
    // {}
  )

  // 不返回更新的值
  await coll.updateOne(
    // filter
    // filter!
    { league: 'World Cup - Wonmen' }, 
    // updateFilter!
    {
      $set: { data: '2023-06-08' }
    },
    // options?
    // {}
  )

  

  await coll.replaceOne(
    // filter!
    { date: dailyLeague.date, league: dailyLeague.league },
    // document!
    dailyLeague,
    // option?
    { upsert: true } 
  )

  


  
})()
```

### Read


``` ts
(async () => {
  // find all doc in the collection
  await coll.find(
    // filter!
    {},
    // option?
    // {}
  ).toArray()

  // 返回匹配条件的第一个
  await coll.findOne(
    // filter!
    { date: '2023-08-08' },
    // option?
    // {}
  )


  
})()
```


## Option

|field|type|desc|
|:---|:---|:---|
|`upsert`|`boolean`| - `true` 沒匹配到則插入|