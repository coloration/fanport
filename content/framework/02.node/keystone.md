---
title: keystoneJS
---

> headless CMS

homepage: <https://keystonejs.com/>
tutorial: <https://keystonejs.com/docs/walkthroughs>

## startup

1. create project

``` bash
cms$ npm init -y
cms$ npm i @keystone-6/core typescript
cms$ touch keystome.ts
```

2. config database

> keystone.ts


``` ts
// keystone.ts
import { config } from '@keystone-6/core'

export default config({
  db: {
    provider: 'mysql', // sqlite, mysql, postgresql
    url: 'file:./keystone.db'
  },
  lists: {
    
  }
})
```

3. config entity

``` ts
// keystone.ts
import { config, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text } from '@keystone-6/core/fields'

export default config({
  // ...
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' })
      }
    })
  }
})
```

4. start dev server

``` js
// package.json
{
  // ...
  "scripts": {
    "dev": "keystone dev"
  }
  // ...
}
```

``` bash
cms$ npm run dev
```

### relationship

``` diff
# keystone.ts
import {
  text, 
+ relationship 
} from '@keystone-6/core/fields'

export default config({
  // ...
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
+       posts: relationship({ ref: 'Post.author', many: true }),
      }
    }),
    Post: list({
      access: allowAll,
      fields: {
        title: text(),
+       author: relationship({ 
+         ref: 'User.posts' 
+         ui: { // 在 post 中能更改 user
+           displayMode: 'cards',
+           cardFields: ['name', 'email'],
+           inlineEdit: { fields: ['name', 'email'] },
+           linkToItem: true,
+           inlineCreate:  { fields: ['name', 'email'] }
+         }
+       }),
      }
    })
  }
  // ...
})
```

### 时间戳与状态流


``` ts
export default config({
  // ..
  list: {
    // ...
    Post: list({
      access: allowAll,
      fields: {
        title: text(),
        // 发布时间为时间戳
        publishAt: timestamp(),
        // 状态切换
        status: select({
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ],
          defaultValue: 'draft',
          ui: {
            displayMode: 'segmented-control', // radio, select, segmented-control
          },
        }),
        // ...
      },
      hooks: {
        resolveInput: ({
          operation, // create, update, delete
          resolvedData // 进行数据预处理
        }) => {
          // 当草稿转为发布状态时,自动更新发布日期
          if (operation === 'update' && resolvedData.status === 'published') {
            resolvedData.publishAt = new Date(Math.floor(new Date().getTime() / 1000) * 1000)
          }

          return resolvedData
        }
      }
    })
  }
})
```
- use hook: <https://keystonejs.com/docs/guides/hooks>
- hook doc: <https://keystonejs.com/docs/config/hooks>


### 登录认证

``` bash
cms$ npm i @keystone-6/auth -S
```


``` ts
// auth.ts
import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
  }
})

const sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --'
const sessionMaxAge = 60 * 60 * 24 * 30 // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
})

export { withAuth, session }
```

``` diff
// keystone.ts
+ import { withAuth, session } from './auth'

const lists: ListSchemaConfig = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
+     password: password({ validation: { isRequired: true }})
    }
  }),
  // ...
}

export default config(
+ withAuth({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db'
    },
    lists,
+   session,
+   ui: {
+     isAccessAllowed: (context) => !!context.session?.data,
+   },
+ })
)
```

### 富文本

``` bash
cms$ yarn add @keystone-6/fields-document -S
```

``` ts
// keystone.ts
import { document } from '@keystone-6/fields-document'

const lists: ListSchemaConfig = {
  Post: list({
    access: allowAll,
    fields: {
      // ...
      content: document({
        formatting: true, // 纯文本富文本切换
        links: true, 
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      })
    },
}
```
