import fs from 'fs'
import path from 'path'
import pug from 'pug'
import markdownCompile from './markdown/compile'
import { getCompileFiles, fileDirPath } from './compare'
import parseFrontmatter from './util/parseFrontmatter'
import markdown from './markdown'
import { formatDate } from './util/date'

getCompileFiles()
.then(files => {

  const distPath = path.resolve(__dirname, '../dist/wiki/')

  console.log(fs.existsSync(distPath))
  // 创建目标文件夹
  if (!fs.existsSync(distPath)) {
    // fs.mkdirSync(distPath, { recursive: true }) // node v10.x
    fs.mkdirSync(path.resolve(__dirname, '../dist/'))
    fs.mkdirSync(distPath)
    fs.mkdirSync(path.resolve(__dirname, '../dist/style/'))
    console.log(1)
  }

  // 复制css
  const stylePath = path.resolve(__dirname, './style')
  fs.readdirSync(stylePath)
  .forEach(file => {
    const content = fs.readFileSync(`${stylePath}/${file}`, 'utf-8')
    fs.writeFileSync(path.resolve(__dirname, `../dist/style/${file}`), content)
  })
  
  const md = markdown()
  const tempPath = path.resolve(__dirname, './views/wiki.pug')
  const wikiCompiler = pug.compileFile(tempPath, {
    self: true,
  })

  
  // 提取头部信息
  files.forEach(file => {
    const src = fs.readFileSync(`${fileDirPath}/${file}`, 'utf-8')
    const matter = parseFrontmatter(src)


    const content = md.render(matter.content)

    const page = wikiCompiler({
      content,
      title: matter.data.title,
      date: formatDate(matter.data.date)
    })

    fs.writeFile(`${distPath}/${file.replace(/md$/i, 'html')}`, page, (err) => {
      console.log(err)
    })
  })

//   // 编译 markdown
//   const articles = markdownCompile(files, fileDirPath)

//   // console.log(articles)
  


//   // 写文件
//   articles.forEach(a => {
//     // 读取模板，替换内容

//     const page = wikiTemplate.replace(/_CONTENT_/, a.result)

//     // 写文件
//     fs.writeFile(`${distPath}/${a.file}.html`, page, (err) => {
//       console.log(err)
//     })
//   })
  
})