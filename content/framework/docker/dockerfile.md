--- 
title: dockerfile
---



## 指令



- `FROM`
- `WORKDIR`
- `RUN`
- `COPY`
- `EXPOSE`
- `CMD`

### 前端部署 demo

``` bash
FROM node:20-alpine AS build-stage

WORKDIR /app

RUN npm config set -g registry https://registry.npmmirror.com

RUN npm i pnpm -g

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## 注释

``` bash
# 使用官方的 Node.js 镜像作为构建阶段基础镜像
```


### 后端部署 demo


``` bash
# 使用官方的 Node.js 镜像作为构建阶段基础镜像
FROM node:20-alpine

WORKDIR /app

RUN npm config set -g registry https://registry.npmmirror.com

RUN npm i pnpm -g

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]

```