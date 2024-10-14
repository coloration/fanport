---
title: Vscode Tips
---

## 用户设置

- language-postcss: Li Chen
- Dracula Official: Dracula Theme

``` json
{
    "workbench.colorTheme": "Dracula",
    "workbench.colorCustomizations": {
        "[Dracula]": {
            "editor.background": "#15161C",
            "sideBar.background": "#191A21",
        },
    },
    "editor.tabSize": 2,
    "files.autoSave": "onFocusChange",
    "terminal.integrated.defaultProfile.windows": "Git Bash",
    "terminal.integrated.fontFamily": "SauceCodePro Nerd Font",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "git.openRepositoryInParentFolders": "never",
    "editor.minimap.enabled": false,
    "files.associations": {
        "*.css": "postcss"
    },
    "[markdown]": {
        "editor.quickSuggestions": {
            "comments": "on",
            "strings": "on",
            "other": "on"
        }
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "window.zoomLevel": 1
}
```


## 常用 snippets

## TypeScript

``` json
// typescript.json
{
	"converse default export": {
	"prefix": "$export_default",
	"body": [
			"export { default as $1 } from './$1$2';",
	],
}
```

## Vue

``` json
// vue.json
{
	"insert vue sfc": {
		"prefix": "$sfc",
		"body": [
			"<script lang=\"ts\" setup>",
			"import { defineOptions } from 'vue'",
			"",
			"defineOptions({ name: '${1}' })",
			"",
			"",
			"</script>",
			"",
			"<template>",
  			"  <div class=\"${1}\">",
			"    <!-- -->",
  			"  </div>",
			"</template>",
			"",
			"<style lang=\"postcss\">",
			".${1} {",
  			"  @apply;",
			"}",
			"</style>",
			""
		]
	}, 
}

```

在 script 标签中 snippets 的上下文环境是 lang 指定的语言

``` json
// typescript.json
{
	"define options": {
		"prefix": "$options",
		"body": [
			"defineOptions({",
			"  ${1:name: ''}",
			"})",
			""
		]
	},
	"define props": {
		"prefix": "$props",
		"body": [
			"const props = withDefaults(defineProps<{",
			"  ${1}",
			"}>(), {",
			"  ${2}",
			"})",
			""
		]
	},
	"define emits": {
		"prefix": "$emits",
		"body": [
			"const emits = defineEmits<{",
			"  $1",
			"}>()"
		]
	}
}
```