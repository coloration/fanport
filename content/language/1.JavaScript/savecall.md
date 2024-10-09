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