---
title: 滤波
---


- 低通滤波器(LPF): 消除噪音，模糊图像
- 高通滤波器(HPF): 找到边缘

**NOTE**: 因为卷积需要将目标点放在中心，所以卷积核(kernel)必须为基数

``` bash
3 * 3
[
    x, x, x,
    x, O, x,
    x, x, x
]
```


## 均值模糊

- `cv.blur()`
- `cv.boxFilter()`

``` py
# 取中心点四周5 * 5范围内的像素点的均值（包含中心点）
# 作为中心点的新的值
kernel_size = (5, 5)


blur_img = cv.blur(origin_img, kernel_size)
```

## 中值滤波

中心元素总是被图像中的一些像素值所取代，可以有效降低噪音

``` py
# 取中心点四周5 * 5范围内的像素点的中值（包含中心点）
# 作为中心点的新的值

kernel_size = 5
median_blur_img = cv.medianBlur(origin_img, kernel_size)
```


## 高斯模糊

有效消除高斯噪声

``` py
kernel_size = (5, 5)
sigmaX = 0 # {double} 高斯核在X方向的标准差
sigmaY # {double: 0} 高斯核在Y方向的标准差

gaussian_blur_img = cv.GaussianBlur(origin_img, kernel_size, sigmaX)

```

- 只指定 sigmaX, simgaY 与 sigmaX 相同
- 二者都为0时，自行根据高斯核计算标准差

## 双边滤波 TODO

在保持边缘锐利的同时，对噪声去除非常有效。但与其他过滤器相比, 操作速度较慢。

``` py
kernel_size = 9

bi_blur_img = cv.bilateralFilter(origin_img, kernel_size, 75, 75)
```

## ref

- opencv 图像滤波: <https://blog.csdn.net/qq_40755643/article/details/84035850>
- opencv 文档-平滑图像: <https://opencv.apachecn.org/#/docs/4.0.0/4.4-tutorial_py_filtering>