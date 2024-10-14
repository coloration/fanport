---
title: Commit Message
index: Framework.Git.Practice
---



约定式提交: <https://www.conventionalcommits.org/zh-hans/v1.0.0/>

### commit 规范

``` 
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

> type(scope):description

- `type`: 用于说明commit的类别，规定为如下几种
  - `feat`: 新增功能
  - `fix`: 修复bug
  - `docs`: 修改文档
  - `refactor`: 代码重构，未新增任何功能和修复任何bug
  - `build`: 改变构建流程，新增依赖库、工具等（例如webpack修改）
  - `style`: 仅仅修改了空格、缩进等，不改变代码逻辑
  - `perf`: 改善性能和体现的修改
  - `chore`: 非src和test的修改
  - `test`: 测试用例的修改
  - `ci`: 自动化流程配置修改
  - `revert`: 回滚到上一个版本
- `scope`(可选): 用于说明commit的影响范围
- `description`: commit的简要说明，尽量简短



#### demo

``` bash
fix: fix foo to enable bar

This fixes the broken behavior of the component by doing xyz. 

BREAKING CHANGE
Before this fix foo wasn't enabled at all, behavior changes from <old> to <new>

Closes D2IQ-12345
```

