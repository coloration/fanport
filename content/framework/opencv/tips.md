

### Why BGR instead of RGB?

因为在 OpenCV 最初开发时，BGR 颜色格式在相机制造商和图像软件提供商中很流行。红色通道被认为是最不重要的颜色通道之一，因此被列在最后，并且许多位图使用 BGR 格式进行图像存储。



### 去除图片的上的白线


``` python
import cv2
import numpy as np

# 读取图片
image = cv2.imread('1.jpg')

# 图片灰度化
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 通过阈值化识别白色区域
_, mask = cv2.threshold(gray, 220, 255, cv2.THRESH_BINARY)

# 形态学操作优化掩码
kernel = np.ones((3, 3), np.uint8)
mask = cv2.dilate(mask, kernel, iterations=1)


# 使用inpaint函数填充白色区域
result = cv2.inpaint(image, mask, inpaintRadius=2, flags=cv2.INPAINT_TELEA)

# 保存处理后的图片
cv2.imwrite('output_image.jpg', result)

# 显示结果
cv2.imshow('Original Image', image)
cv2.imshow('Mask', mask)
cv2.imshow('Inpainted Image', result)
cv2.waitKey(0)
cv2.destroyAllWindows()
```