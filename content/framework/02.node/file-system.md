---
title: 文件系统 fs
index: Framework.Node.Syntax
---

## Fs api

``` javascript
const fs = require('fs')

// 目录/文件是否存在
fs.existSync(path)

// 目录/文件信息
fs.stat([dir], [callback<error, stats>])
  stats.isFile<bool>()
  stats.isDirectory<bool>()

// 创建目录
fs.mkdir([dirName], [callback<error>])
fs.mkdirSync([dirName])

// 写入文件(创建或覆盖)
fs.writeFile([dirName], [fileContent], [callback<error>])
// 写入文件(创建或追加)
fs.appendFile([dirName], [appendContent], [callback<error>])

// 读取文件 
fs.readFile([dirName], [callback<error, bufferData>])  //可用 toString 方法转化 bufferData
fs.readFile([dirName], [type], [callback<error. typeData>]) // type: 'utf8'

// 读取目录信息
fs.readdir([dir], [callback<error, files>]) //files: [ 'hello.log', 'subLogs' ]

// 修改目录/文件名
fs.rename([oldDir], [newDir], [callback<error>])

// 删除空目录
fs.rmdir([dir], [callback<error>])

// 删除文件
fs.unlink([dirName], [callback<error>])

// eg: 递归删除
function forceRemove (dir) {
  const sub = fs.readdirSync(dir)
  .map(d => dir + '/' + d)
  .map(dname => fs.statSync(dname).isDirectory() ? 
    forceRemove(dname) : fs.unlinkSync(dname)
  )
  .filter(res => res !== undefined)

  return sub.length === 0 ? fs.rmdirSync(dir) : new Error('删除失败')
}

// 读取流 分次读入减少内存占用，防止崩溃
fs.createReadStream([fileName]) => readStream
readStream.on('data', [callback<dataChunk>])
readStream.on('end', [callback])
readStream.on('error', [callback<error>])
readStream.pipe(writeStream)

// 写入流
fs.createWriteStream([fileName]) => writeStream
writeStream.on('pipe', [callback<source>])
writeStream.write([dataChunk])
```


## fs-extra

``` bash
$ npm i fs-extra
```

## mkdir

``` ts

```