---
title: 处理图像对比度
---

增强对比度，就是修改灰度值的分布

## 1. 直方归一


适用于：灰度级主要在0~150之间，造成图像对比度较低，可用直方图归一化将图像灰度级拉伸到0~255,使其更清晰。

``` py
cv2.normalize(src, dst, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U)

# cv2.normalize(src[, dst[, alpha[, beta[, norm_type[, dtype[, mask]]]]]]) → dst
#
# src-输入数组
# dst-输出数组，支持原地运算
# alpha-range normalization模式的最小值
# beta-range normalization模式的最大值，不用于norm normalization(范数归一化)模式。
# normType-归一化的类型，可以有以下的取值：
#    NORM_MINMAX:数组的数值被平移或缩放到一个指定的范围，线性归一化，一般较常用。
#    NORM_INF: 此类型的定义没有查到，根据OpenCV 1的对应项，可能是归一化数组的C-范数(绝对值的最大值)
#    NORM_L1 :  归一化数组的L1-范数(绝对值的和)
#    NORM_L2: 归一化数组的(欧几里德)L2-范数
# dtype-dtype为负数时，输出数组的type与输入数组的type相同；否则，输出数组与输入数组只是通道数相同，而tpye=CV_MAT_DEPTH(dtype).
# mask-操作掩膜，用于指示函数是否仅仅对指定的元素进行操作。
```

``` py
mask = np.zeros(origin_img.shape[:2], np.uint8)
mask[260:850, 500:1850] = 255


masked_img = cv.bitwise_and(gray_img, gray_img, mask = mask)

normalize_img = np.zeros_like(masked_img)
cv.normalize(masked_img, normalize_img, 0, 255, cv.NORM_MINMAX, cv.CV_8U)

hist = cv.calcHist([masked_img], [0], mask, [256], [0, 256])
hist_normalize = cv.calcHist([normalize_img], [0], mask, [256], [0, 256])

plt.subplot(2, 2, 1)
plt.imshow(masked_img, cmap = 'gray')

plt.subplot(2, 2, 2)
plt.imshow(normalize_img, cmap = 'gray')

plt.subplot(2, 2, 3)
plt.plot(hist)

plt.subplot(2, 2, 4)
plt.plot(hist_normalize)
plt.show()

```

## 2. 灰度直方均衡

- 直方图均衡化是将原始的直方图拉伸，使之均匀分布在全部灰度范围内，从而增强图像的对比度。
- 直方图均衡化的中心思想是把原始图像的的灰度直方图从比较集中的某个区域变成在全部灰度范围内的均匀分布。旨在使得图像整体效果均匀，黑与白之间的各个像素级之间的点更均匀一点。

``` py
equalize_hist_img = cv.equalizeHist(gray_img)

hist = cv.calcHist([gray_img], [0], None, [256], [0, 256])
hist_equalize = cv.calcHist([equalize_hist_img], [0], None, [256], [0, 256])

```

### 彩色直方均衡 HE

``` py

I = cv2.imread(r'C:\Users\x\Desktop\47.jpg', cv2.IMREAD_ANYCOLOR)
 
b, g, r = cv2.split(I)
 
b1 = cv2.equalizeHist(b)
g1 = cv2.equalizeHist(g)
r1 = cv2.equalizeHist(r)
 
O = cv2.merge([b1,g1,r1])

```

## 4. 限制对比度自适应直方图均衡化（Contrast Limited Adaptive histgram equalization/CLAHE)

- cv2.createCLAHE(clipLimit, tileGridSize)
- 创建CLAHE对象 clipLimit限制对比度，tileGridSize块的大小
- 这个特性也可以应用到全局直方图均衡化中，即构成所谓的限制对比度直方图均衡（CLHE），但这在实际中很少使用。在CLAHE中，对于每个小区域都必须使用对比度限幅。CLAHE主要是用来克服AHE的过度放大噪音的问题。 

``` py

clahe = cv.createCLAHE(clipLimit = 2.0, tileGridSize = (8, 8))
clahe_img = clahe.apply(gray_img)

hist = cv.calcHist([gray_img], [0], None, [256], [0, 256])
hist_clahe = cv.calcHist([clahe_img], [0], None, [256], [0, 256])

```

## 5. 线性变换

- 拉伸灰度级，提高对比度 a > 1
- 压缩灰度级，降低对比度 a < 1

``` py

a = 2
linear_scale = float(a) * gray_img
linear_scale[linear_scale > 255] = 255
linear_scale_img = np.round(linear_scale).astype(np.uint8)

hist = cv.calcHist([gray_img], [0], None, [256], [0, 256])
hist_linear_scale = cv.calcHist([linear_scale_img], [0], None, [256], [0, 256])

```

## 6. 伽马变换

- 伽马变换（非线性变换）实际上就是对矩阵的每个值进行幂运算
- 适用于：灰度值主要集中在灰度直方图两侧，即灰度值较低和较高的范围内，可用伽马变换修正

``` py


gamma = 0.5
gamma_scale = np.power(gray_img / 255.0, gamma)
gamma_img = np.round(gamma_scale).astype(np.uint8)

hist = cv.calcHist([gray_img], [0], None, [256], [0, 256])
hist_gamma = cv.calcHist([gamma_img], [0], None, [256], [0, 256])

```