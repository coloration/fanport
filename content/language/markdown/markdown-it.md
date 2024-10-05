
``` js
import Markdown from 'markdown-it'
import anchor from 'markdown-it-anchor'
import linkOpen from './linkOpen'
import highlight from './highlight'
import toc from 'markdown-it-table-of-contents'

export default (config = {}) => new Markdown({
  // html: true,
  highlight
})
.use(anchor, {
  level: [1, 2, 3],
  premalink: true,
  premalinkBefore: true,
  premalinkSymbol: '#'
})
.use(toc, {
  includeLevel: [2, 3]
})
.use(linkOpen)
```

``` js
// ./linkOpen.js

// a 标签添加 target 属性
function tokenRender (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

export default function (md, opt = {}) {

  const defaultRender = md.renderer.rules.link_open || tokenRender
  const type = opt.target || 'blank'
  const attr = 'target'

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex(attr)

    if (aIndex < 0) {
      tokens[idx].attrPush([attr, type])
    }
    else {
      tokens[idx].attrs[aIndex][1] = type
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}
```

``` js
// highlight.js
const chalk = require('chalk')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
const escapeHtml = require('escape-html')

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

function wrap (code, lang) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<div class="language-${lang}">
  <pre class="language-${lang}"><code>${code}</code></pre></div>`
}

module.exports = (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      logger.warn(chalk.yellow(`[wran] Syntax highlight for language "${lang}" is not supported.`))
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}

```


### 程序化控制 


``` js
// compile
import fs from 'fs'
import Markdown from 'markdown-it'
import catchWiki from './catchWiki'
import anchorPlugin from 'markdown-it-anchor'
import linkOpenPlugin from './linkOpen'
import catchLib from './catchLib'
import highlight from './highlight'


export default function (files, fileDirPath) {
  const md = new Markdown({
    html: true,
    linkify: true,
    typographer: true,
    highlight
    
  })

  md.use(anchorPlugin, { level: [1, 2, 3] })
  md.use(linkOpenPlugin)

  let wikiGroups = []

  // 读wiki
  files.forEach(file => {
    
    const filePath = `${fileDirPath}/${file}`
    const fileName = file.replace(/\.md$/, '')
  
    const str = fs.readFileSync(filePath, 'utf-8')

    if (str === '') return 
    wikiGroups = wikiGroups.concat(catchWiki(str, { fileName }))
  })

  // 写 wiki
  return files.map(file => {
    
    const filePath = `${fileDirPath}/${file}`
    const fileName = file.replace(/\.md$/, '')
  
    const str = fs.readFileSync(filePath, 'utf-8')

    if (str === '') return 
    let html = md.render(str)

    const libs = catchLib(str)
    libs.forEach(lib => {
      const group = wikiGroups.find(g => g.id === lib.lid)

      // console.log(group)
      if (group) {
        html += `<div class="wiki">${ group.result }</div>`
      }
    })

    return {
      result: html,
      file: fileName
    }
  })
}

// catchWiki
import Markdown from 'markdown-it'
import anchorPlugin from 'markdown-it-anchor'
import linkOpenPlugin from './linkOpen'
import highlight from './highlight'


export default function (src, opt = {}) {
  const openType = opt.openType || 'heading_open'
  const openTag = opt.openTag || 'h3'
  const closeType = opt.closeType || 'hr'
  const closeTag = opt.closeTag || 'hr'
  const origin = opt.fileName || ''

  const env = {}
  const md = new Markdown({
    highlight
  })

  md.use(anchorPlugin)
  md.use(linkOpenPlugin)


  const tokens = md.parse(src, env)

  const groups = []
  let opening = false
  let currentGroup = null

  // 分组
  tokens.forEach(token => {
    const type = token.type
    const tag = token.tag

    if (!opening && type === openType && tag === openTag) {
      opening = true
      currentGroup = { 
        tokens: [], 
        id: `${origin}#${token.attrs[0][1]}`, 
        origin,
        head: token.attrs[0][1]
      }
      groups.push(currentGroup)
    }

    if (opening) currentGroup.tokens.push(token)

    if (opening && type === closeType && tag === closeTag) {
      opening = false
    }
  })

  // 转化
  groups.forEach(group => {
    group.result = md.renderer.render(group.tokens, md.options, env)
  })

  return groups
}


// // 获取 wiki 字段
// export default function (md, opt = {}) {

//   const openType = opt.openType || 'heading_open'
//   const openTag = opt.openTag || 'h3'
//   const closeType = opt.closeType || 'hr'
//   const closeTag = opt.closeTag || 'hr'

//   const defaultRender = md.render

//   md.render = function (src, env) {
//     console.log('eeee', env)
//     env = env || {}

//     const tokens = md.parse(src, env)
//     const filterToken = []
//     let opening = false

//     tokens.forEach(token => {
//       const type = token.type
//       const tag = token.tag

//       if (!opening && type === openType && tag === openTag) {
//         opening = true
//       }

//       if (opening) filterToken.push(token)

//       if (opening && type === closeType && tag === closeTag) {
//         opening = false
//       }
//     })

//     return md.renderer.render(filterToken, md.options, env)
//   }
// }


// catchLib.js
import Markdown from 'markdown-it'
import anchorPlugin from 'markdown-it-anchor'
import linkOpenPlugin from './linkOpen'

function linkHandler (token) {
  const match = token.content.match(/(?<!(http|https):\/\/)(?<=\.?\/)[a-z_#1-9&-]+/ig)
  const content = token.content.match(/(?<=\[)[a-z0-9_\-&]+/)
  const lid = match ? match[0] : '#'
  const info = lid.split('#')
  
  return { lid, content: content ? content[0] : '', post: info[0], head: info[1] }
}

export default function (src, opt = {}) {
  const openTag = opt.openTag || 'h4'
  const openType = opt.openType || 'heading_open'
  const closeTag = opt.closeTag || 'hr'
  const closeType = opt.closeType || 'hr'
  const openTitle = opt.openTitle || '+LIBRARY' 

  const md = new Markdown({
    html: true,
    linkify: true,
    typographer: true
  })
  // md.use(anchorPlugin, { level: 4 })
  md.use(linkOpenPlugin)

  let libs = null
  const tokens = md.parse(src, {})

  // console.log('xxxxx', tokens)

  tokens.findIndex((token, index) => {
    if (
      token.tag === openTag && 
      token.type === openType &&
      tokens[index+1].children[0].content === openTitle
    ) {
      libs = []
      return false
    }

    if (!libs) return false

    if (token.type === 'inline' && token.children[0].type === 'link_open') {
      libs.push(linkHandler(token))
      return false
    }
    

    return libs && token.tag === closeTag && token.type === closeType
  })

  return libs || []
}
```


``` js
// 
import matter from 'gray-matter'

export const parseFrontmatter = content => matter(content, {
  excerpt_separator: '<!-- more -->'
})
```