## 特征类型

任意图像都逃不过三种特征

- 边缘 edges: 图像区域发生突变的区域，也称为高强度梯度区域
- 角点 corners: 两个边缘相交的地方
- 斑点 blobs： 按特征划分的**区域**，可能是强度特别高或特别低的区域，或是具备独特纹理的区域。


### Corners 角点

我们最想检测出的特征就是角点。角点是可重复性最高的特征。即给出同一景象的两张或以上图像。我们就能很轻易地识别出不同图像上的这类特征。


#### Corner Detectors

我们可以在卷积窗中计算强度梯度变化的程度来确定卷积窗中是否有角点：
- 使用 sobel-x 和 sobel-y 运算符计算图像小窗口的梯度（不应用二进制阈值）。
- 使用向量加法根据这两个值计算总梯度的大小和方向。
- 当您在图像上滑动窗口时应用此计算，计算每个窗口的梯度。当检测到梯度的方向和大小有很大变化时 - 就发现了一个角点！

e.g. 寻找棋盘上的角点(棋盘容易观察检测出的角点)

``` py
image = cv2.imread('images/skewed_chessboard.png')

image_copy = np.copy(image)
image_copy = cv2.cvtColor(image_copy, cv2.COLOR_BGR2RGB)

plt.imshow(image_copy)

## 角点检测依赖强度变化，所以转化为灰度图像
gray = cv2.cvtColor(image_copy, cv2.COLOR_RGB2GRAY)

## 转化为 float 类型，以便 Hrarris 检点检测器使用
gray = np.float32(gray)

## detect corners
dst = cv2.cornerHarris(
  gray, # need float
  2,    # 监测潜在角点所需观察的相邻像素大小， 2*2像素方块
  3,    # Sobel 卷积核大小
  0.04  # 确定哪些点会被视为角点。越小检测出的角点越多
)

plt.imshow(dst, cmap = 'gray')

## 在计算机视觉里，膨胀会放大明亮的区域或是位于前景的区域
## Dilate corner image to enhance corner pointers
dst = cv2.dilate(dst, None) 

plt.imshow(dst, cmap = 'gray')

### Select and display strong corners

## Define a threshold for extracting strong corners
## This value may vary depending on the image
thresh = 0.1 * dst.max()

## Create an image copy to draw corners on 
corner_image = np.copy(image_copy)

## Iterate through all the corners and draw them on the image (if they pass the threshold)
for j in range(0, dst.shape[0]):
  for i in range(0, dst.shape[1]):
    if (dst[j, i] > thresh):
      # image, center pt, radius, color thickness
      cv2.circle(corner_image, (i, j), 2, (0, 255, 0), 1)

plt.imshow(corner_image)

```


### 增强特征方法

膨胀和腐蚀被称为形态学运算。它们通常在二值图像上执行，类似于轮廓检测。膨胀通过向图像中物体的感知边界添加像素来放大图像中的明亮白色区域。侵蚀则相反：它沿着对象边界移除像素并缩小对象的大小。通常这两个操作按顺序执行以增强重要的对象特征！

#### Dilation 膨胀

e.g. 如果 5x5 窗口中任何周围像素为白色，则将像素变为白色

``` py
# Reads in a binary image
image = cv2.imread('j.png', 0) 

# Create a 5x5 kernel of ones
kernel = np.ones((5, 5), np.uint8)

# Dilate the image
dilation = cv2.dilate(image, kernel, iterations = 1)
```



#### Erosion 腐蚀

??? 腐蚀的逻辑是什么

``` py
# Erode the image
erosion = cv2.erode(image, kernel, iterations = 1)
```


#### Opening 开运算

开运算是膨胀和腐蚀的组合。先腐蚀后膨胀。这对于降噪很有用，其中腐蚀首先消除噪声（并缩小对象），然后膨胀再次放大对象，但噪声将从之前的腐蚀中消失！


``` py
opening = cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
```

#### Closing 闭运算

闭运算是开运算的逆组合；它是先膨胀后腐蚀，这对于封闭物体内的小孔或黑暗区域很有用。

``` py
closing = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)
```

05 image segmentation

## 图像分割

图像分割最简单的情况是背景减除。在视频和其他应用中，经常需要将人类与静态或移动背景隔离开来，因此我们必须使用分割方法来区分这些区域。图像分割还用于各种复杂的识别任务，例如对道路图像中的每个像素进行分类。


1. 使用轮廓绘制图像不同部分的边界
2. 通过某种颜色或纹理相似性度量对图像数据进行聚类


### K-Means Clustering

1. Choose k random center points
2. assign every data point to a cluster, based on its nearest center pointer
3. Takes the mean of all the values in each cluster
  - these mean values become the new center points
4. repeat steps 2 and 3 until convergence is reached

> 10 K-means Implementtation video

``` py
# reshape image into a 2D array of pixels and 3 color values (RGB)
pixel_vals = image_copy.reshape((-1, 3))

# Convert to float type
pixel_vals = np.float32(pixel_vals)

# define stopping criteria
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)

k = 2 

retval, labels, centers = cv2.kmeans(
  pixel_vals,
  k,
  None,
  criteria,
  10,
  cv2.KMEANS_RANDOM_CENTERS
)

# Convert data into 8 bit values
centers = np.uint8(centers)
segmented_data = centers[labels.flatten()]

# Reshape data into the original image dimensions
segmented_image = segmented_data.reshape((image_copy.shape))
labels_reshape = labels.reshape(image_copy.shape[0], image_copy.shape[1])

plt.imshow(segmented_image)

plt.imshow(labels_reshape == 1, cmap = 'gray')

# Mask image segment
masked_image = np.copy(image_copy)

masked_image[labels_reshape == 1] = [0, 0, 0]

plt.imshow(masked_image)
``` 