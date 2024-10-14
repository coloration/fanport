---
title: 获取数据源
---
### 读取图片

``` py
img = cv2.imread("512_512.png")

cv2.imshow("Test", img)

if cv2.waitKey(0):
  cv2.destroyAllWindows()
```

### 读取视频流

``` py
import cv2

cap = cv2.VideoCapture('video.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)

print("%s", fps)

while True:
  ret, frame1 = cap.read()
  cv2.imshow("Video Original", frame1)
  if cv2.waitKey(int(1000/fps)) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()
```

## 图像处理



### 转灰度图像

``` py
import cv2 as cv

## 1.
img = cv.imread('512_512.png')
gray_img = cv.cvtColor(img, cv.COLOR_RGB2GRAY)

## 2.
gray_img = cv.imread('512_512.png', cv.IMREAD_GRAYSCALE)
```

### 阈值处理

### 图像裁切

``` py
origin_img = img[y_start:y_end, x_start:x_end]
```


## 数据可视化

### 灰度直方图

``` py

## 1.
import cv2 as cv
from matplotlib import pyplot as plt
import numpy as np

def img_gray_distribute(img):
  rows, cols = img.shape
  gray_vals = np.zeros([256], np.uint64)
  for row in range(rows):
    for col in range(cols):
      gray_vals[img[row][col]] += 1
  
  return gray_vals

def plt_gray_histogram(img, show = False):
  gray_vals = img_gray_distribute(img)
  plt.plot(range(256), gray_vals)
  plt.axis([0, 255, 0, np.max(gray_vals)])
  plt.xlabel('gray level')
  plt.ylabel('number of pixels')
  if show:
    plt.show()

## 2.

#images，必须用方括号括起来。
#channels，是用于计算直方图的通道，这里使用灰度图计算直方图，所以就直接使用第一个通道。
#Mask，图像掩模，没有使用则填写None。
#histSize，表示这个直方图分成多少份（即多少个直方柱）。
#ranges，表示直方图中各个像素的值，[0.0, 256.0]表示直方图能表示像素值从0.0到256的像素。
#accumulate，为一个布尔值，用来表示直方图是否叠加。

hist = cv.calcHist([gray_img], [0], None, [256], [0, 256])
plt.plot(hist)
plt.show()


```
