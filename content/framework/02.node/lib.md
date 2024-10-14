---
title: Node 常用库
---

## Compressing

``` ts
import { zip } from 'compressing'

zip.compressDir(path, to)
```


## Node SSH

``` ts
import { NodeSSH } from 'node-ssh'

(async function () {
  try {
    const ssh = new NodeSSH()

    await ssh.connect({
      host: '10.10.10.10', // remote ip
      username: 'root', // remote user
      privateKeyPath: 'C:/Users/foo/.ssh/id_rsa', // local ssh private key path
    })
    
    // exec remote command
    await ssh.execCommand('rm -rf ./*.*.zip', { cwd: '/opt/application' })
    
    // upload file
    await return ssh.putDirectory(
      // local path
      path.join(process.env.BUNDLE_DIR as string),
      // remote path
      path.join(process.env.SSH_REMOTE_DIR as string),
      // option
      { recursive: true, concurrency: 10 },
    )
  }
  catch {
    //
  }

  finally {
    process.exit(0)
  }

})()
```

## dotenv

管理项目环境变量

### startup

``` bash
$ npm i dotenv -D
```

### 项目结构

``` ts
|- src/
|- package.json
|...
|- .env
|- .env.test
|- .env.production
```

``` bash
# .env
FOO=env_foo
BAZ=env_baz

# .env.test
FOO=test_env_foo
BAZ=test_env_baz

# .env.production
FOO=production_env_foo
BAZ=production_env_baz
```

### code

``` ts
// util.ts
import path from 'path'
import { fileURLToPath } from 'url'
export const __filename = (metaurl: string) => fileURLToPath(metaurl)
export const __dirname = (metaurl: string) => path.dirname(__filename(metaurl))
```

``` ts
// config.ts
import path from 'path'
import dotenv from 'dotenv'
import { __dirname } from './util'

const envPrefixIndex = process.argv.indexOf('--env')
const envName = envPrefixIndex > -1 ? '.env.' + process.argv[envPrefixIndex + 1] : '.env'

dotenv.config({
  path: path.resolve(__dirname(import.meta.url), `../${envName}`),
})

```


### usage

```ts
// main.ts
import 'config.ts'

process.env.FOO // test_env_foo
process.env.BAZ // test_env_baz
```

``` bash
$ npm i tsx -g
$ tsx main.ts --env test
```