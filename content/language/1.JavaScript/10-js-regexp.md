---
title: 正则表达式
index: Language.JavaScript.Snytax
---

[[toc]]

描述字符模式的对象

- 在线测试 [regexr](http://regexr.com/)
- [正则常用参考](http://www.cnblogs.com/zxin/archive/2013/01/26/2877765.html)

---

## 01.修饰符

> 用来指定整个正则表达式的匹配模式

### 声明

1. 字面量：`const re = /pattern/flags`
2. 面向对象: `const re = new RegExp('pattern', 'flags')` 可以动态创建正则表达式

### 含义

|||||
|:---|:---|:---|:---|
|`/foo/i`|`reg.ignoreCase`|ignore case|忽略匹配模式的字母大小写|
|`/foo/g`|`reg.global`|global search|全局匹配|
|`/foo/m`|`reg.multiline`|multiline|转换为多行，分别进行匹配|
|`/foo/u`|`reg.unicode`|unicode|使用 unicode 码的模式进行匹配|
|`/foo/y`|`reg.sticky`|sticky|执行“粘性 (sticky)”搜索，匹配从目标字符串的当前位置开始。|
|`/foo/s`|`reg.dotall`|single line ES2018|允许 `.` 匹配换行符|
|`/foo/d`|`reg.hasIndices`|indices ES2022|标志表示正则表达式匹配的结果应该包含每个捕获组子字符串开始和结束的索引。|

<br>
<br>

---

## 02.字符集 Character Set

> 匹配字符集内`[]`的**某一个**字符 

### 字符集中的特殊符号

- `/[^abc]/`: 否定，不包含字符集中的任何一个
- `/[a-c]/`: 表示范围。即 `/[abc]/`。

**Note:**
字符集中的 `-` 只要有一侧没有字符就不用转义。eg:`/[-2]/` 匹配 `-` 或 `2`
字符集中的 `.` 不用转义
字符集中的 `\b` 代表退格符（即 `[\b]`）, 不要与转移字符集 `\b` 混淆

### 转义字符集

|转义符号|等价|含义|
|:---|:---|:---|
|`\d`|`[0-9]`|匹配数字|
|`\D`|`[^0-9]`|匹配非数字|
|`\w`|`[a-zA-Z0-9_]`|word: 匹配字母、数字和下划线 `_`（ASCII单词）。|
|`\W`|`[^a-zA-Z0-9_]`|匹配除字母、数字和下划线以外的字符（非ASCII单词）。|
|`\s`|`\f`, `\n`, `\r`, `\t`, `\v`, <br>`\u0020`, `\u00a0`, `\u1680`, `\u180e`, <br>  `\u2000-\u200a`, `\u2028`, `\u2029`, <br> `\u202f`, `\u205f`, `\u3000`, `\ufeff`|匹配一个空白字符，包括空格、制表符、换页符和换行符 <br>  - 水平制表符 `\t` `U+0009` <br> - 垂直制表符 `\v` `U+000B` <br> - 换行符 `\n` `U+000A` <br> - 换页符 `\f` `U+000C` <br> - 回车符 `\r` `U+000D` |
|`\S`|非 `\f`, `\n`, `\r`, `\t`, `\v`, <br>`\u0020`, `\u00a0`, `\u1680`, `\u180e`, <br>  `\u2000-\u200a`, `\u2028`, `\u2029`, <br> `\u202f`, `\u205f`, `\u3000`, `\ufeff`|非 `\s` 代表的字符 |
|`\b`|不匹配任何字符|word boundary: 查找`\w`字边界组成的单词的字边界，本身并不匹配内容。（详情查看本页**锚**）|
|`\B`|不匹配任何字符|与 `\b` 相反，查找非字边界，本身并不匹配内容。（详情查看本页**锚**）|
|`\0`|Null `U+0000`||
|`\非零数字`|引用群组|使用第n个群组进行匹配（详情查看本页**群组的引用**）|
|`\xhh`|`\x00-\xFF`|匹配一个两位十六进制数（\x00-\xFF）表示的字符。|
|`\uhhhh`||匹配一个四位十六进制数表示的 UTF-16 代码单元。|
|`\u{hhhh}`<br>`\u{hhhhh}`||仅当设置了 u 标志时, 匹配一个十六进制数表示的 Unicode 字符。|

<br>
<br>

---

## 03.重复 Repetiion

|||
|:---|:---|
|`*`| 0个及以上 |
|`?`| 1个及以下|
|`+`| 1个及以上 |
|`{2}`| 2个 |
|`{2,}`| 2个以上 |
|`{2,4}` | 2到4个 |

### 非贪婪重复

正则的重复规则默认匹配尽量多的字符，使用 `?` 来匹配尽可能少的字符

e.g. `'aaab'`

1. `/a+?/` 匹配第一个 `a`。`'aaab'.replace(/a+?/, 'b')` `'baab'`
2. `/a+?/g` 匹配3个 `a`。 `'aaab'.replace(/a+?/g, 'c')` `'cccb'`
3. `/a+?b/` 匹配 `aaaab` 与贪婪模式一致。（正则总是寻找字符串中第一个可匹配的字符进行匹配[1]）

<br>
<br>

---

## 04.特殊符号

- `/./` 通配符: 匹配换行符以外的所有字符
- `/png|gif|jpg/` 选择符: 或者

**Note:** 
匹配 `.` 本身需要转义 `/\./`
`/a|ab/g` abc => a 

<br>
<br>

---

## 05.锚 Anchor

> **不**匹配可见字符，只用来指定匹配发生的位置。（零宽断言）

``` bash
TypeScript 
CoffeeScript 
Scripting 
ActionScriptEditor
```

- `/^Script/m` : 匹配以 `Script` 开头的字符。`Scripting`
- `/Script$/mg` : 匹配以 `Script` 结束的字符。`TypeScript`，`CoffeeScript`
- `/Script\b/mg` ：字边界。匹配以 `Script` 结尾的单词 `TypeScript`，`CoffeeScript`
- `/Script\B/mg`: 非字边界。匹配单词中含有 `Script` 的单词，但单词不能以 `Script` 结尾。`Scripting`，`ActionScriptEditor`

**Note:** 
以上4例中匹配的结果均为 `Script`，而非某个完整单词
`[\b]` 代表退格符


<br>
<br>

---

## 06.群组 Group

> 在正则中定义一个子查询，在相应的api中会返回更多的匹配信息

1. 方便使用重复符号 `/Java(Script)?/`: Java 或者 JavaScript

### 群组的引用

\\ 加上群组的序数

eg: `/<h(\d)>.*<\/h\1>/` 匹配一个闭合标签，`\1`代表前面的群组 `(\d)` 匹配到的数字。

``` diff
+ <h1>h1</h1>   ✅
+ <h2>h2</h2>   ✅
- <h3>xxxx</h4> ❎
```

**Note:**

- $ 加上数字可以取得正则表达式匹配结构中的第几个群组，例如 `$1` 在 `/Java(Script)/` 中即为 `Script`，用法参照下方的 string.replace 方法

- `$&` 可以获取匹配的整个项目，既上面的 `JavaScript`

- `?:`不为群组添加引用 `(?:Script)` 不存储群组的匹配值，既使用 $1 不能得到 `Script`，只能得到字符串形式的 `'$1'`

<br>
<br>

---

## 07.环视 Lookarounds

> 正则中所有用于判断的规则都可以称为断言。但因为其他的形式均比较常见，所以提及断言时一般指的都是 Lookarounds

### 断言 `assertions` 的分类

``` bash
断言
|- 零宽断言 (Zero-width): 只匹配内容，但不消耗字符
|   |- Lookarounds (见下方)
|   |   |- 先行断言 Lookahead 
|   |   |   |- 先行断言肯定形式 (?=foo)
|   |   |   |- 先行断言否定形式 (?!foo)
|   |   |
|   |   |- 反向断言 Lookbehind
|   |       |- 反向断言肯定形式 (?<=foo)
|   |       |- 反向断言否定形式 (?<!foo)
|   |
|   |- 锚 Anchors (见05.锚)
|       |- ^, $, \b, \B etc.
|
|- 非零宽断言：匹配内容，同时消耗字符
    |- 字符集 (见02.字符集)
    |   |- 字符 jpg, [a-z] etc
    |   |- 转义字符 /d, /s etc.
    |
    |- 重复 (见03.重复)
    |
    |- etc.
```

**Note:**

1. Lookaround 断言均为零宽断言
2. 先行断言 `lookahead` 是匹配断言前面的字符，所以放在要匹配字符的后面
3. 反向断言 `lookbehind` 是匹配断言后面的字符，所以放在要匹配字符的前面
### 先行断言 lookahead

#### 先行断言肯定形式 `(?=foo)`

``` ts
`3px 6em 120px`.match(/\d+(?=px)/g) // [3, 120]
```

#### 先行断言否定形式 `(?!foo)`

- `(?!foo)` 零宽反向先行断言，之后的字符不与其匹配

``` ts
'3px 6em 120px'.match(/\d+(?!px)/g) // [6, 12]
'3px 6em 120px'.match(/\d+(?!px)(?!\d+)/g) // [6] 只匹配不是以 px 结尾的数字
```

### 反向断言 lookbehind `ES2018`

#### 反向断言肯定形式 `(?<=foo)`

``` ts
'$123.89 ￥10.05'.match(/(?<=\D)[\d\.]+/g) // [123.89, 10.05]
```

#### 反向断言否定形式 `(?!=foo)`

``` ts
'$123.89 ￥10.05'.match(/(?<!\$)[\d\.]+/g) // ['23.89', '10.05']
'$123.89 ￥10.05'.match(/(?<![\d\.]+)(?<!\$)[\d\.]+/g) // ['10.05'] 只匹配不是以 $ 开头的数字
```

---
## 08.字符串实例方法

- `string.match(regExp) [array/null]` 
  * 返回一个由匹配结果组成的数组，没有匹配项则返回 `null`。
  * 如果有修饰符 g 则数组中包含所有匹配结果；如果没有修饰符 g，返回的数组第一项是匹配结果，而后数组的第n项是 $n。
  * 数组后添加的 index 属性是字符串中匹配的起始位置。
  * 数组后添加的 input 的属性是原始的字符串。

- `string.matchAll(regExp) [Iterator]`

  ``` ts
  const str = 'abc_abc_abc'

  str.matchAll(/abc/)
  // Error String.prototype.matchAll called with a non-global RegExp argument

  str.matchAll(/abc/g)
  // RegExpStringIterator {}

  [...str.matchAll(/abc/g)]
  // [
  //     ['abc', index: 0, input: 'abc_abc_abc', groups: undefined],
  //     ['abc', index: 4, input: 'abc_abc_abc', groups: undefined],
  //     ['abc', index: 8, input: 'abc_abc_abc', groups: undefined]
  // ] 
  ```

- `string.search(regExp) [number]` 
  * 返回匹配的起始位置，如果不存在匹配字符则返回 -1。
  * 不支持全局检索，即会忽略修饰符 g。
  * 如果传入的参数不是正则实例，则内部使用 RegExp 构造函数先将参数转化为正则实例。

  ``` ts
  'abc_abc_abc'.search(/_[a-z]+/) // 3
  'abc_abc_abc'.search('_[a-z]+') // 3
  ```

- `string.replace(regExp|string, newString|function) [string]` [3]
  * 第一个参数是匹配的模式，如果是字符串则使用 RegExp 构造函数先将参数转化为正则实例。
  * 第二个参数是替换后的字符，如果参数是函数，那么函数的返回值则是替换的内容
  * 如果用于替换后的字符中包含了未使用的引用，则将其视为原始字符处理 eg4。

  ``` javascript
  'jaVAscriPt'.replace(/javascript/i, 'JavaScript')
  // => JavaScript

  'false can use?'.replace(false, true) 
  // =>'true can use?'
  
  'iOS, windows Phone, Android'.replace(/(ios)(.*)(android)/i, '$3$2$1')
  // => 'Android, windows Phone, iOS'
  
  'iOS, windows Phone, Android'.replace(/(ios)(.*)(android)/i, '$3$2$1$4')
  // => 'Android, windows Phone, iOS$4'

  'phone systems: iOS, windows Phone, Android'.replace(
    /(ios)(.*)(android)/i, 
    function (match, $1, $2, $3, index, input) {
      // match: 'iOS, windows Phone, Android'
      // $1: 'iOS'
      // $2: ', windows Phone, '
      // $3: 'Android'
      // index: 15
      // input: 'phone systems: iOS, windows Phone, Android'
      return 'phone systems: ' + $3 + $2 + $1
    }
  )
  // => 'phone systems: Android, windows Phone, iOS'
  ```

- `string.split(string|regexp) [array]`   [4]
  * 使用参数切分字符串，并将结果保存到数组中返回。
  * 如果字符串最末是切分的标志，则返回的数组最后一项则是空字符串。

``` javascript
'user=jack&id=233&city=beijing'.split('&')
// => ['user=jack', 'id=233', 'city=beijing']

'1x2Y3s4E5'.split(/[a-z]/i)
// => ['1', '2', '3', '4', '5']

'1w2Y3s4E5x'.split(/[a-z]/i)
// => ['1', '2', '3', '4', '5', '']
```
---
## 09. 正则对象实例

``` javascript
const pattern = /foo$/
const pattern = new RegExp("foo$")
```

每次使用直接量都会创建新的对象（eg : `/foo/`）

### 实例属性

- `[string] regexp.source` 正则表达式文本，只读
  ``` javascript
  /[^foo]/.source // => "[^foo]" 
  ```
- `[boolean] regexp.ignoreCase` 是否带有 i 修饰符，只读
- `[boolean] regexp.multiline` 是否带有 m 修饰符，只读
- `[boolean] regexp.global` 是否含有 g 修饰符，只读
  ``` javascript
  /foo/i.global // => false
  /baz/g.global // => true
  ```

- `[number] regexp.lastIndex`同一个正则实例会存储上一次匹配正确的位置。为了保证匹配结果容易控制，可以每次使用新的实例来进行匹配，或者使用字符串的实例方法。


  ```javascript
  /** 全局匹配 **/
  const pattern = /\d/g

  pattern.lastIndex    // 0
  pattern.exec('1234') // ["1", index: 0, input: "1234"]
  
  pattern.lastIndex    // 1
  pattern.test('1234') // true
  
  pattern.lastIndex    // 2
  pattern.exec('1234') // ["3", index: 2, input: "1234"]
  
  /** 非全局匹配 **/
  const pattern = /\d/

  pattern.lastIndex    // 0
  pattern.exec('1234') // ["1", index: 0, input: "1234"]
  
  pattern.lastIndex    // 0
  pattern.test('1234') // true
  
  pattern.lastIndex    // 0
  pattern.exec('1234') // ["1", index: 0, input: "1234"]
  ```
- `[string] regexp.source`
  ```ts
  /\d+(?=px)/g.source // '\\d+(?=px)'
  ```
- `[string] regexp.flag`
  ``` ts
  /\d+/mgid.flags // 'dgim'
  ```
- `[boolean] regexp.sticky`: 存在flag `y` 
- `[boolean] regexp.unicode`: 存在flag `u` 
- `[boolean] regexp.multiline`: 存在flag `m` 
- `[boolean] regexp.dotall`: 存在flag `s` 
- `[boolean] regexp.global`: 存在flag `g` 
- `[boolean] regexp.hasIndices`: 存在flag `d` 
- `[boolean] regexp.ignoreCase`: 存在flag `i` 

### 实例方法

- `regexp.exec(string) [null/Array]` 
  * 匹配失败返回 `null`，匹配成功返回一个数组。但数组总只有一项，既总是只返回匹配到的第一个结果，修饰符 g 此处无效。
  * 数组后添加的 index 属性是字符串中匹配的起始位置。
  * 数组后添加的 input 的属性是原始的字符串。

  ``` javascript
  /\d/.exec('1234')
  // => ['1', index: 0, input: '1234']

  /\d/g.exec('a1234')
  // => ['1', index: 1, input: 'a1234']
  ```

- `regexp.test(string) [boolean]`  regexp.exec()的简单版，只返回一个布尔值。

---





**参考**：
1. 《 Javascript 权威指南（第六版）》第10章
- [宁浩网-正则表达式](http://ninghao.net/course/4020)
- [MDN JavaScript String.prototype.replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [MDN JavaScript String.prototype.split](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [MDN 正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)