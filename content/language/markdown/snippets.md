[[toc]]


### Markdown 开启 code snippet

打开 User Setting(JSON) 后输入 `"[markdown]"` 会为你自动补全设置，每个版本的设置不太一样。

``` json

{
  "[markdown]": {
    "editor.unicodeHighlight.ambiguousCharacters": false,
    "editor.unicodeHighlight.invisibleCharacters": false,
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
        "comments": "on",
        "strings": "on",
        "other": "on"
    }
}
}

```


<ToggleContent title="Markdown">

``` json
"article title": {
		"prefix": "---title",
		"body": [
			"---",
			"title: $1",
			"date:",
			"tag:",
			"---"
		]
	}
```

``` json
"bold": {
  "prefix": "$b",
  "body": [
    "**$1**$2"
  ], 
  "description": "bold block"
},
```

``` json
"italic": {
  "prefix": "$i",
  "body": [
    "__$1__$2"
  ],
  "description": "italic block"
},
```

``` json
"bold-italic": {
  "prefix": "$bi",
  "body": [
    "__**$1**__$2"
  ], 
  "description": "bold italic block"
},
```

``` json
"code": {
  "prefix": "$code",
  "body": [
    "``` $1",
    "$2",
    "```",
    "$3"
  ],
  "description": "code block"
},
```




``` json
"detail": {
  "prefix": "$detail",
  "body": [
    "<detail>",
    "<summary>$1</summary>",
    "$2",
    "</detail>",
    "$3"
  ]
},
```

</ToggleContent>