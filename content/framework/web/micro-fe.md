---
title: micro frontend
speaker: Binyu.wang
---

<slide class="bg-apple aligncenter">

## 微前端架构 - 前端模块化实践 {.text-landing.text-shadow}

---

<!-- By Binyu {.text-intro} -->

</slide>
<slide class="bg-apple">

#### 基本原理
#### 代码原理
#### 开发框架

</slide>
<slide class="bg-apple">

## 基本原理

``` json
-------- System Context ---------      SaaS
|                               |
| -------- Container ---------- |      Segment Management
| |                           | |
| | ------- Component ------- | |      Tree List
| | |  Code                 | | |      Tree Data Format
| | |  Code                 | | |
| | ------------------------- | |
| |                           | |
| | ------- Component ------- | |      Segment List
| | |  Code                 | | |
| | |  Code                 | | |
| | ------------------------- | |
|                               |
| -------- Container ---------- |      Good Management
| |                           | |
| | ------- Component ------- | |      List
| | |  Code                 | | |      Normal List
| | |  Code                 | | |
| | ------------------------- | |
| |                           | |
| | ------- Component ------- | |      Detail
| | |  Code                 | | |      Normal Form Submit
| | |  Code                 | | |
| | ------------------------- | |
| ----------------------------- |


```
</slide>
<slide class="bg-apple">

## 基本原理 - Context 生命周期

---

``` json
     Context mount
           |
------------------------
| register Containers  |
|          |           |
|    start Context     |  
|          |           |
|    alt Containers    | <- (Single-SPA)
|          |           |
|     stop Context     |
|          |           |
|  unload Containers   |
------------------------
           |
    Context unmount
```


</slide>
<slide class="bg-apple">

## 基本原理 - 切换容器

---

```js
registerApplication(
    someContainer.name,
    () => import('@container/some-container'),
    /** 路径匹配时, 进入容器的生命周期 */
    pathPrefix('/some-container'),
    someContainerProps
)
```

```html
<body>
<div id="some-container"></div>
<div id="some-container-2"></div>
<div id="some-container-3"></div>
</body>
```

<br>

- 路径和容器是`多对多`关系


</slide>
<slide class="bg-apple">

## 基本原理 - Container 生命周期

---

[Bootstrap](){.button.ghost} -> [Mount](){.button.ghost} -> [Unmount](){.button.ghost}

``` js

const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent,
    domElementGetter () {
        return document.getElementById('some-container')
    }
})

/** lifecycle hooks */
export const bootstrap = [
  lifecycles.bootstrap, (props) => {
    /** todo */
    return Promise.resolve(props)
  }
]

export const mount = [...]
export const umount = [...]
```

</slide>
<slide class="bg-apple">


## 基本原理 - 其他微前端方案

---

- #### iframe
- #### url定向
- #### WebComponent(Wrapper)

</slide>
<slide class="bg-apple">

## 代码管理

</slide>
<slide class="bg-apple">

## 代码管理 - 结构概览

``` json
git repository            git repository            git repository                git repository
|- contexts                |- containers              |- containers                 |- repos
|   |- some-context        |   |- some-container      |   |- another-container      |   |- framework
|- lerna.json              |   |- some-container2     |   |- another-container2     |   |- kit
                           |   |- _context-example    |   |- _context-example       |   |- ui
                           |- lerna.json              |   |- _storybook             |   |- chart
                                                      |- lerna.json                 |   |- _storybook
                                                                                    |- lerna.json
```

``` json
npm module
|- @system-context/some-context
|- @container/some-container
|- @container/some-container2
|- @container/another-container
|- @container/another-container2
|- @util/framework
|- @util/kit
|- @util/ui
```

``` json
|- _storybook         # component development
|- _context-example   # container development
```


</slide>
<slide class="bg-apple">

## 代码管理 - 开发流程

``` json 
0. git repository - git, lerna
1. Component 开发 - storybook
2. Component 测试 - 未设计
3. Component 发布 - lerna/npm

4. Container 依赖更新 - lerna/npm
5. Container 开发 - webpack
6. Container 测试 - 未设计
7. Container 发布 - lerna/npm

8. Context 依赖更新 - lerna/npm
9. Context 开发 - webpack
10. Context 测试 - 未设计
11. Context 发布 - lerna/npm
12. Context 部署 - docker
```

</slide>
<slide class="bg-apple">

## 开发框架

---

#### 数据管理 (目前只支持 React Hooks)
#### API复用
#### 权限系统
#### 待实现

</slide>
<slide class="bg-apple">

## 数据管理 - 全局数据通信

---

``` js
/// 在 Context 装载阶段注册模块 Module
registerModule(portalModule.name, portalModule)
registerModule(dashboardModule.name, dashboardModule)

/// 在具体组件中使用
const { state, dispatch } = useGlobalModule<PortalModuleState, PortalActionTypes>(portalModule.name)

useEffect(() => {
    if (!state.isLogin) {
        history.replace('/login')
    }
}, [state.isLogin])

const logout = useCallback(() => {
    dispatch(PortalActionTypes.updatePortalState, { info: {}, isLogin: false })
}, [])
```

</slide>
<slide class="bg-apple">

## 数据管理 - 业务内部数据通信

---

``` jsx
// store.ts
const S = new ReactStore<IChannelManageStore>({ x: 1 })

const Provider = S.provider
const useStore = S.useStore

// rootComponent.ts
<Provider store={{ api, rootPath, access }}>
    <Router basename={rootPath}>
        <Route path="/report" exact component={Report} />
        <Route path="/query" exact component={QueryContainer} />
        <Route path="/" exact component={DashboardContainer} />
    </Router>
</Provider>

// Function Component
const { store: { api }, updateStore } = useStore()

updateStore({ x: 3 })
```


也可以使用其他各种库, e.g. Redux

</slide>
<slide class="bg-apple">

## API 复用

``` js
// no any
interface IBiApi {
    metadata: MetadataFunc,
    enum: EnumFunc,
    query: QueryFunc,
    download: DownloadFunc,
    creativeOptionsFetcher: OptionsFetcherFunc,
    platformOptionsFetcher: OptionsFetcherFunc,
    cookieMapping: CookieMappingFunc,
}

// container 默认实现一个标准的 Api 
class BiApi extends Api implements IBiApi {}

// context 实例化后传入 container root props 中
const biReportProps: IBiReportRootProps = {
    api: new BiApi(
        { baseUrl: 'http://biapi.yoyi.com.cn/bi-query/api' },
        { skipToken: true }
    ),
    // ....
} 

// 或者实现一个新的 IBiApi 传入
class SaaSBiApi implements IBiApi {}

```

迁移过程中,最花时间的部分

</slide>
<slide class="bg-apple">

## 权限系统

---

#### 1. 通过 Container Root Props 传递
#### 2. 动态权限需要配合数据通信模块实现

</slide>
<slide class="bg-apple">

## 待实现

---

### 1. 测试
### 2. 发布项目
### 3. 更友好的开发环境(framework cli)
### 4. 可视化开发模式
### 5. 集成主流框架
### More ...

</slide>
<slide class="bg-apple">

## Lib

- #### [Single-SPA](https://github.com/single-spa/single-spa)
- #### [Lerna](https://github.com/lerna/lerna)
- #### [Storybook](https://github.com/storybookjs/storybook)

</slide>