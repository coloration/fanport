``` js
import Mock from 'mockjs'

const Random = Mock.Random

const taskData = function (){
  let tasklist=[]
  for (let i = 0; i < 15; i++) {
    let address = Random.county(true)
    let newTaskObject = {
      index:i+1,
      date:Random.date(),
      name:Random.cname(),
      province:address.split(' ')[0],
      city:address.split(' ')[1],
      address: address.split(' ')[2],
      zip:Random.zip()
    }
    tasklist.push(newTaskObject)
  }
  return { tasklist: tasklist}
}

Mock.mock('/tasks/tasklist','post',taskData)
```


### ref

- <https://jsonplaceholder.typicode.com/>