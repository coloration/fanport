---
title: Typescript Syntax
---

### function 

``` ts
function test () : void {
  console.log('test')
}

function greet (firstName: string, lastName?: string, sex: string = 'sir') : string {
  return `hello~ ${ firstName } ${ lastName }. ${sex}`
}

greet('王')
greet('王', '彬宇')
greet('王', '小惠', '女士')

// 泛型方法
function log<T> (param: T) : T { 
  console.log(param) 
  return param
}

```

---


### interface

``` ts


// interface

// 一般对象接口
interface User {
  name: String,
  power?: Number[],
  readonly id: Number
}

const user172: User = {
  name: '172',
  id: 172
}

const user643 = <User>{
  name: '643',
  id: 643
}

// 函数接口
interface EasyFunction {
  (type: Number) : String
}

let easyCome: EasyFunction = function () : String {
  return '11'
}

let easyGo: EasyFunction = function (post: Number) : String {
  return '12'
}


//泛型接口
interface  BaseDao<T> {
  findById (id:number): T
  findPageList (param: any): T[]
  findPageCount (param: any): number
  save (o:T): void
  update (o:T): void
  deleteById (id:number): T
}

// 类接口

interface EasyClass {
  title: String,
  log (params: Object): void
  test? (): String
}

class Easy implements EasyClass {
  readonly title: String = 'easy'

  constructor (t: String) {
    this.title = t
  }

  log (params: Object) {
    console.log(params)
  }
}

const easy = new Easy('12')
// easy.title = '2' // Error

// 继承接口

```

---


### class

``` ts
/// 类

class Task {
  
  noop<T> (s: T): T { return s }
}

const t = new Task()

t.noop(1)
```

---


### enum

``` ts
// enums 
// 默认 0, 1, 2, 3
// 设定 44.5, 45.5, 46.5, 12
// 如果 User 是非数字，则 Admin, ET 必须设定值
enum UserRole {
  User = 44.5,
  Admin,
  ET,
  Tiger = 12
}

```
---