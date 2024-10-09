---
title: tips
---


## library

1. wangeditor 插件避免重复注册

``` ts
import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'
import attachmentRenderElem from 'localpath'

// 注册上传附件插件。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
const { editorPlugin } = attachmentModule;
if (editorPlugin && Boot.plugins.lastIndexOf(editorPlugin) < 0) {
    Boot.registerModule(attachmentModule)
    // 自定义上传渲染
    Boot.registerRenderElem(attachmentRenderElem)
}

```