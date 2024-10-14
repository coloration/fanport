---
title: Awesome
index: Language.JavaScript.Practice
---


## JS 编程实践-用 Promise 或 async/await 代替回调函数

避免陷入回调地狱

### using promise

```js
return functionA()
.then(functionB)
.then(functionC)
.then(functionD)
.catch((err) => logger.error(err))
.finally(alwaysExecuteThisFunction)
```

### using async/await 

``` js
async function executeAsyncTask () {
  try {
    const valueA = await functionA();
    const valueB = await functionB(valueA);
    const valueC = await functionC(valueB);
    return await functionD(valueC);
  }
  catch (err) {
    logger.error(err);
  } finally {
    await alwaysExecuteThisFunction();
  }
}
```

### convert callback to promise

1. node 环境可以快速转换

``` js
const fs = require('fs')
const util = require('util')

const readFilePromise = util.promisify(fs.readFile)
```

2. 非node环境

```js
const growTreesPromise = (...args) => {
  return new Promise((resolve, reject) => {
    growTrees(...args, (error, location, size) => {
      if (err) return reject(err)
      // resolve 不支持多参数 
      // Using an array object
      resolve([location, size])

      // Using an object
      resolve({location, size})
    })
  })
}
```

### 循环 Promise 

``` ts

// 同时进行
const promises = Array.from({ length: 4 }).map(async (_, i) => {
  return await (new Promise((resolve) => {
    setTimeout(() => {
      resolve(i)
    }, 500 - i * 100)
  }))
})

Promise.all(promises)
  .then((res) => {
    globalThis.console.log('final', res)
  })

// 依次执行
const res: number[] = []

Array.from({ length: 4 }).reduce(async (last: Promise<any>, _, i) => {
  await last
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i)
      res.push(i)
    }, 500 - i * 100)
  })
}, Promise.resolve())
  .then(() => {
    globalThis.console.log('final', res)
  })

```

### 用 finally 处理状态

```ts
loading = true

request.get()
.then(doSomething)
.catch(doError)
.finally(() => loading = false)

try {
  const res = await request.get()
  doSomething(res)
}
catch (e) {
  doError(e)
}
finally {
  loading = false
}
```


### SaveCall

``` ts
function SaveCall (exceptHandler) {
      return function (scopeFunction) {
        let scopeReturn
        try {
          scopeReturn = scopeFunction(exceptHandler)
          if (Promise && scopeReturn instanceof Promise) {
           scopeReturn.catch(exceptHandler) 
          }
        }
        catch (e) {
          exceptHandler(e)
        }

        return scopeReturn
      }
    }

const saveCall = SaveCall(e => {
  console.log(e.constructor, e.message || e.error)
})

saveCall(() => {
  var a = {}
  var c = a.b.c
})

saveCall(() => {
  throw { error: 2 }
})

saveCall(() => {
  return Promise.reject({ error: 1 })
})
```

---

待整理

- <https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md>
- [JavaScript 编程技巧](https://dev.to/hellomeghna/tips-to-write-better-conditionals-in-javascript-2189)