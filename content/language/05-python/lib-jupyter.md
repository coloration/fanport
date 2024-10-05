---
title: Jupyter Notebook
index: Language.Python.Library
---


## Startup

``` bash
$ python -m venv venv
$ source venv/bin/activate.bash
$ pip install jupyter
$ pip freeze > requirements.txt

$ jupyter notebook [--port PORT]
```

## Shortcut

`命令模式` 下按 `h` 查看快捷键

- `命令模式`: 按 `ESC` 激活, 边条为蓝色
- `编辑模式`: 按 `Enter` 激活, 边条为绿色


- `Space` 向下滚动页面
- `Shift` + `Space` 向上滚动页面
- `j`, `↓` 移动至下方单元格
- `k`, `↑` 移动至上方单元格
- `ctrl` + `enter` 执行当前单元格
- `shift` + `enter` 执行当前单元格, 并向下移动一个单元格,如果下方没有单元格则创建
- `shift` + `m` 向下合并单元格
- `a` 在上方创建单元格
- `b` 在下方创建单元格
- `d` + `d` 删除单元格
- `c` 复制单元格
- `x` 剪切单元格
- `shift` + `v` 在当前单元格上方粘贴
- `v` 在当前单元格下方粘贴
- `z` 撤销操作
- `o` 隐藏当前单元格的输出信息
- `l` 显示当前单元格的行号

- `shift` + `l` 显示代码块行号



### Ref

- Jupyter Notebook 快捷键: <https://zhuanlan.zhihu.com/p/341503927>