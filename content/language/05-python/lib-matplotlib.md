---
title: Matplotlib
index: Language.Python.Library
---

matplotlib 是 Python 主要的科学绘图库，其功能为生成可发布的可视化内容，如折线图、直方图、散点图等。将数据及各种分析可视化，可以让你产生深刻的理解，而我们将用 matplotlib 完成所有的可视化内容。

## 安装与引用

``` bash
$ pip install matplotlib
```

## 基础绘制

``` py
im = array(PIL.Image.open('path'))

# 绘制图像
imshow(im)

x = [100, 100, 400, 400]
y = [200, 500, 200, 500]

plot(x,y)         # 默认为蓝色实线
plot(x,y,'r*')    # 红色星状标记
plot(x,y,'go-')   # 带有圆圈标记的绿线
plot(x,y,'ks:')   # 带有正方形标记的黑色点线

# 'b' 蓝色
# 'g' 绿色
# 'r' 红色
# 'c' 青色
# 'm' 品红
# 'y' 黄色
# 'k' 黑色
# 'w' 白色
# ----
# '-' 实线
# '--' 虚线
# ':' 点线
# '.' 点
# 'o' 圆圈
# 's' 正方形
# '*' 星形
# '+' 加号
# 'x' 叉号
# 绘制线
plot(x[:2], y[:2])

# 标题
title('title string')

# 新建图像
figure()


# 置灰 不显示颜色信息
gray()

# 在原点的左上角显示轮廓图像
contour(im, origin='image')
axis('equal')
axis('off')

# 二值化
hist(im.flatten(), 128)


show()
```

## 交互

``` py
im = array(Image.open('path'))
imshow(im)
print('Please click 3 points')
x = ginput(3)
print 'you clicked:', x
show()
```

## 绘制正弦函数

``` python
import numpy as np
import matplotlib.pyplot as plt

## 生成坐标点
x = np.arange(0, 6, 0.1)
y1 = np.sin(x)
y2 = np.cos(x)


plt.plot(x, y1, label="sin")
plt.plot(x, y2, linestyle="--", label="cos")
plt.xlabel('x')           # x轴的单位
plt.ylabel('y')           # y轴的单位
plt.title('sin & cos')    # 图标标题
plt.legend()              # 绘制图例 sin - cos --
plt.show()
```

## 绘制阶跃函数 

``` python
import numpy as np
import matplotlib.pylab as plt

step_function = lambda x: np.array(x > 0, dtype = np.int)

x = np.arange(-5.0, 5.0, 0.1)
y = step_function(x)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)
plt.show()
```

## 绘制 Sigmoid 函数

``` python
import numpy as np
import matplotlib.pylab as plt

sigmoid = lambda x: 1 / (1 + np.exp(-x))

x = np.arange(-5.0, 5.0, 0.1)
y = sigmoid(x)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)
plt.show()
```



## 绘制图片


``` python
import matplotlib as plt
from matplotlib.image import imread

# 只能绘制 png
img = imread('your/path/pic.png')

plt.imshow(img)
plt.show()
```