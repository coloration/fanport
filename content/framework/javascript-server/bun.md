---
title: Bun
date: 2025-02-26
---

``` bash
$ bun config set registry https://registry.npmmirror.com
```


### 后端服务

``` dockerfile
# 使用 Bun 官方镜像
FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun config set registry https://registry.npmmirror.com

# 安装依赖
RUN bun install

# 启动应用
CMD ["bun", "run", "index.ts"]
```