## netlify


创建项目

``` bash
$ cd sample-project
sample-project$ netlify sites:create
```

只是在 .gitignore 中添加了 `.netlify` 忽略


创建函数

``` bash
sample-project$ touch netlify/functions/index.ts # netlify function 不会创建文件夹，导致报错
sample-project$ netlify functions:create --name get_xxx
- javascript # select language 
- serverless # select function type
- hello_world_template # select template

```

连接 mongodb altas

``` bash
sample-project$ npm i mongodb -S

```





