import fs from 'fs'
import path from 'path'
import md5 from 'md5'


const cacheFilePath = path.resolve(__dirname, '../cache/md5.json')
export const fileDirPath = path.resolve(__dirname, './docs/')

function readCache () {
  return new Promise((resolve) => {
    fs.readFile(cacheFilePath, 'utf-8', (error, fileString = '{}') => {
      resolve(JSON.parse(fileString))
    })
  })
}

function readFileMD5 () {
  const cache = {}

  fs.readdirSync(fileDirPath)
  .forEach(fileName => {
    cache[fileName] = md5(fs.readFileSync(`${fileDirPath}/${fileName}`))
  })

  return Promise.resolve(cache)
}

export function getCompileFiles () {
  
  return Promise.all([readCache(), readFileMD5()])
  .then(([oldVal, newVal]) => {
    
    // 清楚已经不存在的缓存
    // Object.keys(oldVal)
    // .filter(oldKey => !(oldKey in newVal))
    // .forEach(missKey => delete oldVal[missKey])
    
    // 需要更新的
    const needUpdateFiles = Object.keys(newVal)
    .filter(key => !(key in oldVal) || newVal[key] !== oldVal[key])


    return Promise.resolve(needUpdateFiles, newVal, oldVal)
    
  })


  

  
}


export function writeMD5Cache (compiledFiles) {

}

