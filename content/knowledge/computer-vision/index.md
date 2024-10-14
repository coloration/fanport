## CV pipeline

1. input data
  - images or image frames
2. pre-progressing
  - noise reduction
  - scaling
  - changing color spaces
3. selecting areas of interest
  - object detection
  - image segmentation
4. feature extraction
  - extracting data about features
5. prediction/recognition
  - object recongnion
  - feature matching


Training a Neural Network 神经网络训练过程

为了训练计算机视觉神经网络，我们通常提供一组标记图像，我们可以将其与预测的输出标签或识别测量进行比较。然后，神经网络监视它所犯的任何错误（通过将正确的标签与输出标签进行比较），并通过修改其查找图像数据之间的模式和差异的方式以及优先顺序来纠正错误。最终，如果有足够的标记数据，模型应该能够表征它看到的任何新的、未标记的图像数据！

``` bash
1. labeled image input(标记图像输入)

2. feature extraction(特征提取)

3. convolutional neural network(卷积神经网络): 
  learns to recognize differences and patterns in features
4. output: 
  predicted emotions

5. error:
  between labels and output, repeat 1.
```



`Convolutional neural network`: 卷积神经网络是计算机视觉应用中常用的一种特定类型的神经网络。他们学习识别一组给定图像中的模式。<https://ujjwalkarn.me/2016/08/11/intuitive-explanation-convnets/>
`Gradient descent`: 梯度下降是一种最小化神经网络误差的数学方法。<https://en.wikipedia.org/wiki/Gradient_descent>


当我们谈论图像分类和模式识别中使用的机器学习和神经网络时，我们实际上谈论的是一组可以学习识别数据模式并将数据分组的算法。


图像的颜色是否有用要看具体的分类任务。如果对人眼来说 彩色图像识别起来更轻松，那么彩色图像对算法来说也更轻松些

- 区分黄色和白色的车道线


Color Thresholds  颜色阈值


``` py
import matplotlib.pyplot as plt
import numpy as np
import cv2

###

image = cv2.imread('images/pizza_bluescreen.jpg')

print('This image is:', type(image), 'with dimensions: ', image.shape)

###

%matplotlib inline

image_copy = np.copy(image)
image_copy = cv2.cvtColor(image_copy, cv2.COLOR_BGR2RGB)

plt.imshow(image_copy)

### define the color threshold

lower_blue = np.array([0, 0, 220])
upper_blue = np.array([50, 70, 255])

### create a mask

mask = cv2.inRange(image_copy, lower_blue, upper_blue)

plt.imshow(mask, cmap = 'gray')

###

masked_image = np.copy(image_copy)

masked_image[mask != 0] = [0, 0, 0]

plt.imshow(masked_image)

### Mask and add a background image
background_image = cv2.imread('images/space_background.jpg')
background_image = cv2.cvtColor(background_image, cv2.COLOR_BGR2RGB)

crop_background = background_image[0:514, 0:816]
crop_background[mask == 0] = [0, 0, 0]

plt.imshow(crop_background)

###

complete_image = crop_background + masked_image
plt.imshow(complete_image)
```

### Color Space

选择适合的颜色空间模型来处理图像

#### RGB

- Red
- Green
- Blue

#### HSV



- Hue 色相：基本不受隐隐或过高亮度的影响 stays fairly consistent in shadow or excessive brightness
- Saturation 饱和度
- Value 明度：受照明条件影响最大 which varies the most under different lighting conditions


舍弃明度维度来对彩色物体进行检测，效果会比在 RGB 空间中更为可靠

#### HLS

- Hue 色相
- Lightness 亮度
- Saturation 饱和度


#### e.g. 提取单一颜色物体 

Part1.Lesson4.Concept17 video




#### e.g. 平均亮度 Average Brightness 

Part1.Lesson4.Concept26 video

以下是我们提取图像平均亮度所采取的步骤。

- 将图像转换为 HSV 颜色空间（值通道是亮度的近似值）
- 将 Value 通道中所有像素的值相加
- 将亮度总和除以图像面积（宽度乘以高度）。

``` py
import cv2
import helpers

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

%matplotlib inline 

image_dir_training = 'day_night_image/training/'
image_dir_test = 'day_night_images/test/'

### easy to access by index: IMAGE_LIST[0][:]
IMAGE_LIST = helpers.load_dataset(image_dir_training)

### Construct a STANDARDIZED_LIST of input images and output labels.

STANDARDIZED_LIST = helpers.standardize(IMAGE_LIST)

### Visualize the standardized data

image_num = 0
selected_image = STANDARDIZED_LIST[image_num][0]
selected_label = STANDARDIZED_LIST[image_num][0]

plt.imshow(selected_image)
print('Shape:' + str(selected_image.shape))
print('Label [1 = day, 0 = night]: ' + str(selected_label))

### Feature Extraction

image_num = 0
test_img = STANDARDIZED_LIST[image_num][0]
test_label = STANDARDIZED_LIST[image_num][1]

hsv = cv2.cvtColor(test_im, cv2.COLOR_RGB2HSV)

print('Label: ' + str(test_label))

h = hsv[:, :, 0]
s = hsv[:, :, 1]
v = hsv[:, :, 2]

f, (ax1, ax2, ax3, ax4) = plt.subplots(1, 4, figsize = (20, 10))

ax1.set_title('Standardized image')
ax1.imshow(test_im)

ax2.set_title('H channel')
ax2.imshow(h, cmap = 'gray')

ax3.set_title('S channel')
ax3.imshow(s, cmap = 'gray')

ax3.set_title('V channel')
ax3.imshow(v, cmap = 'gray')

### Find the average brightness using the V channel

def avg_brightness(rgb_image):
  hsv = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2HSV)
  sum_brightness = np.sum(hsv[:, :, 2])

  area = 600 * 1100.0

  avg = sum_brightness / area

  return avg

# Look at day and night images and their avg brightness

image_num = 0
test_im = STANDARDIZED_LIST[image_num][0]

avg = avg_brightness(test_im)

print('Avg brightness: ' + str(avg))

plt.imshow(test_im)
```

可以将平均亮度看做一个特征，下面编写一个分类器

``` py
### Classification

def estimate_label(rgb_image):
  avg = avg_brightness(rgb_image)

  threshold = 100
  predicted_label = 1 if avg > threshold else 0

  return predicted_label

### Testing the classifier
import random 

TEST_IMAGE_LIST = helpers.load_dataset(image_dir_test)

STANDARDIZED_TEST_LIST = helpers.standardize(TEST_IMAGE_LIST)

random.shuffle(STANDARDIZED_TEST_LIST)

### Determine the Accuracy

def get_misclassified_images(test_image):
  misclassfiled_images_labels = []
  
  for image in test_images:
    im = image[0]
    true_label = image[1]

    predicted_label = estimate_label(im)

    if (predicted_label != true_label):
      misclassified_images_labels.append((im, predicted_label, true_label))

  
  return misclassified_images_labels

MISCLASSIFIED = get_misclassified_images(STANDARDIZED_TEST_LIST)

total = len(STNADARDIZED_TEST_LIST)
num_correct = total - len(MISCLASSIFIED)
accuracy = num_correct / total

print('Accuracy: ' + str(accuracy))
print('Number of misclassified images = ' + str(len(MISCLASSIFIED)) + 'out of ' + str(total))
```


#### 饱和度的突然变化可以用来检测边缘


## Standardizing and Pre-processing

标准化和预处理

要从任意图像中稳定地提取特征，必须预处理并归一化图像


## Features


特征是图像或物体的可测量组成部分，理想情况下，该特征在不同条件下（例如在不同光线或相机角度下）是唯一且可识别的。

我们将特征描述为图像中​​可测量的数据片段，有助于区分不同类别的图像。有两种主要类型的功能：

1. Color-based and  基于颜色和
2. Shape-based  基于形状


这两种方法在不同的情况下都有用，而且通常一起发挥强大的作用。我们知道，如果您想要对白天/夜间图像进行分类或实现绿屏，那么颜色就是您所需要的。让我们看另一个例子：假设我想对停车标志与任何其他交通标志进行分类。停车标志应该在颜色和形状上脱颖而出！停车标志是一个八边形（有 8 个平边），颜色非常红。它的红色通常足以区分它，但该标志可能会被树木或其他人工制品遮挡，而且形状最终也很重要。

作为一个不同的示例，假设我想检测面部并执行面部识别。我首先要检测给定图像中的人脸；这意味着至少能够识别该脸上的边界和一些特征，这些特征都是由形状决定的。具体来说，我想要识别脸部的边缘以及脸部的眼睛和嘴巴，以便我可以识别脸部并识别它。在这种情况下，颜色不是很有用，但形状至关重要。

## Numerical vs. Categorical

数值与分类


许多机器学习算法不使用分类数据；他们要求所有输出都是数字的。数字很​​容易比较并存储在内存中，因此，我们经常必须将分类值转换为数字标签。您会遇到两种主要方法：

### Integer encoding  整数编码

整数编码是指为每个类别值分配一个整数值。因此，白天 = 1，晚上 = 0。这是分离二进制数据的好方法，这就是我们对白天和夜间图像所做的操作。

``` py
day = 1
night = 0
```

### One hot-encoding  一种热编码

当需要分离的值超过 2 个时，通常会使用 One-hot 编码。 one-hot 标签是一个一维列表，其长度为类的数量。假设我们正在查看具有以下值的动物变量：“猫”、“老虎”、“河马”和“狗”。这一类别有 4 个类别，因此我们的热门标签将是长度为 4 的列表。该列表将全部为 0 和一个 1； 1表示某个图像属于哪一类。


``` py
cat = [1, 0, 0, 0]
tiger = [0, 1, 0, 0]
hippopotamus = [0, 0, 1, 0]
dog = [0, 0, 0, 1]

```




### 图像的频率变化 High and low frequency （图像特征）

而高频图像是强度变化很大的图像。并且亮度级别从一个像素到下一个像素的变化很快。
- 前景的动物斑纹，衣服花纹
低频图像可能是亮度相对均匀或变化非常缓慢的图像
- 远景的天空，失焦的背景

高频分量也对应于图像中对象的边缘，这可以帮助我们对这些对象进行分类。




### Fourier Transform  傅里叶变换 (方法工具)

傅里叶变换（FT）是一种重要的图像处理工具，用于将图像分解为其频率分量。 FT 的输出表示频域中的图像，而输入图像则相当于空间域 (x, y)。在频域图像中，每个点代表空间域图像中包含的特定频率。因此，对于具有大量高频成分（边缘、角点和条纹）的图像，频域中将存在许多处于高频值的点。

[足球运动员的图像和相应的频域图像（右）。频域图像中心的集中点意味着该图像具有大量低频（平滑背景）成分。](./i/fourier-demo.png)

这种分解在带通滤波器的背景下特别有趣，它可以隔离一定范围的频率并根据低频和高频阈值屏蔽图像。（？）

### 图像滤波器 image filters

图像过滤是一种特征提取技术, 因为它过滤掉不需要的图像信息并提取独特且可识别的特征，例如边缘或角点。


1. filter out unwanted information
2. Amplify features of insterest


#### High-pass Filters 高通滤波器

锐化图像，强化图像高频区域



``` py
import numpy as np
import matplotlib.pyplot as plt
import cv2

%matplotlib inline

image = cv2.imread('images/city_hall.jpg')
image_copy = np.copy(image)
image_copy = cv2.cvtColor(image_copy, cv2.COLOR_BGR2RGB)

plt.imshow(image_copy)

gray = cv2.cvtColor(image_copy, cv2.COLOR_RGB2GRAY)

plt.imshow(gray, cmap = 'gray')

# Sobel filter
sobel_x = np.array([[
  -1, 0, 1,
  -2, 0, 2,
  -1, 0, 1
]])

filtered_image = cv2.filter2D(gray, -1, sobel_x)

plt.imshow(filtered_image, cmap = 'gray')

retval, binary_image = cv2.threshold(filtered_image, 100, 255, cv2.THRESH_BINARY)

plt.imshow(binary_image, cmap = 'gray')

```


#### Edge detection filter 边缘检测过滤器

边缘检测的卷积核的内部数字的加和为0。这类过滤器要计算的事相邻像素的差异（变化）
与图像相乘时可以保证纯色的部分会被过滤为0

##### Sobel filters  索贝尔过滤器

索贝尔滤波器非常常用于边缘检测和查找图像中的强度模式。将 Sobel 滤波器应用于图像是一种在
x 或 y 方向上获取图像导数（近似）的方法。

e.g. 下方的卷积核适合检测水平方向的边缘和线条

``` py
## Sobel Filter 

[[-1, -2, -1],
 [ 0,  0,  0],
 [ 1,  2,  1]]
```


Sobel 还检测哪些边缘最强。这是通过梯度的大小来封装的；幅度越大，边缘越强。梯度的大小或绝对值只是各个 x 和 y 梯度的平方的平方根。对于 x 和 y 方向上的梯度，大小是平方和的平方根。

梯度的方向就是 y 梯度除以 x 梯度的反正切（反正切）

### Edge Handling 

Edge 就是图像里强度发生突变的区域，通常暗示物体边界的存在

边缘是您可以检测到的最简单的形状之一；边缘通常定义对象之间的边界，但它们可能无法提供足够的信息来查找和识别这些对象上的小特征（例如脸上的眼睛），在下一个视频中，我们将了解查找更复杂形状的方法。


### Low-pass Filter

- Blur/smooth an image
- Block high-frequency parts of an image 阻止图像的高频部分

加权平均法，富裕中心像素最大的权重。周围像素的权重取决于距离中心点的距离

#### Averagomg Filter


``` py
kernel = [[
  1, 1, 1,
  1, 1, 1,
  1, 1, 1,
]] / 9
```

### Gaussian Blur

既能模糊图像，又能更好地保存图像边缘的过滤器

[wikipedia](https://en.wikipedia.org/wiki/Gaussian_blur)

``` py
kernel = [[
  1, 2, 1,
  2, 4, 2,
  1, 2, 1
]] / 16
```

图像处理，先用低通滤波器降噪，再用高通滤波器检测边缘


### Convolutional Layer  卷积层

卷积层是通过将一系列不同的图像滤波器（也称为卷积核）应用于输入图像而产生的。
滤波器的数量代表着卷积层的深度 


```` bash

---------------
layer 
depth 1 kernel
depth 2 kernel
depth 3 kernel
depth 4 kernel
---------------
````

神经网络会自动学习并分配滤波器的权重

#### 非极大抑制 non-maximum suppression

卷积核如何运算？？？

### Canny Edge Detection

1. 使用高斯模糊过滤掉噪声
2. 使用 Sobel过滤器确定图像边缘的强度和方向
3. 应用非极大抑制(non-maximum suppression) 来观察每个检测边缘的强度和方向、
  - 将最强的边缘绘制成连续的，一个像素宽的细线
4. 用滞后阈值来分离最佳边缘，双阈值化操作
  1. 强度高于高阈值的部分会被定义为边缘
  2. 强度低于低阈值的部分会被舍弃
  3. 在高低阈值之间的只有与高于高阈值部分相连的部分会被保留

筛选边缘




``` py
image = cv2.imread('image/sunflower.jpg')

image_copy = np.copy(image)

image_copy = cv2.cvtColor(image_copy, cv2.COLOR_BGR2RGB)

plt.show(image_copy)

gray = cv2.cvtColor(image_copy, cv2.COLOR_RGB2GRAY)

plt.show(gray)

### 高低阈值保持2:1 or 3:1 效果最佳

lower = 120
upper = 240

edges = cv2.Canny(gray, lower, upper)

wide = cv2.Canny(gray, 30, 100)
tight = cv2.Canny(gray, 180, 240)

```


#### 霍夫变换 Hough Transform

该变换将 x-y 坐标空间中的形状转换为霍夫空间中的相交线

霍夫空间的直线交点，代表三维空间中的线斜率相同，偏移量相同（即在同一根线上）

更多使用极坐标表示


``` py
import = cv2.imread('images/phone.jpg')
image_copy = np.copy(image)
image_copy = cv2.cvtColor(image_copy, cv2.COLOR_BGR2RGB)

### Perform edge detection
gray = cv2.cvtColor(image_copy, cv2.COLOR_RGB2GRAY)

low_threshold = 50
high_threshold = 100

edges = cv2.Canny(gray, low_threshold, high_threshold)

plt.imshow(edges, cmap = 'gray')

# Define the Hough transform parameters
rho = 1 # 1px
theta = np.pi / 180 # 1 degree
threshold = 60 # 霍夫空间要找到1根直线所需的最小相交数
min_line_length = 100
max_line_gap = 5

# Find lines using a Hough transform
lines = cv2.HoughLinesP(
  edges，
  rho,
  theta,
  threshold,
  np.array([]),
  min_line_length,
  max_line_gap
)

line_image = np.copy(image_copy)

for line in lines:
    for x1, y1, x2, y2 in line:
      cv2.line(line_image, (x1, y1), (x2, y2), (255, 0, 0), 5)
```


### Haar cascade classifier Haar级联分类器

这是一种基于机器学习的方法，其中训练级联函数来解决二元分类问题。

它使用大量正面（面部）和负面（非面部）图像进行训练，

Haar 特征就是梯度测量值，测量时算法会观察某个特定像素区域周围的矩形区域。以某种方式减去这些区域，从而计算像素差

能检测边缘，线条，矩形

更大规模的卷积核

级联：每一层去除一部分不需要的东西，最终提取出图像的必要特征。这种迅速舍弃图像无关数据的举措使得这个算法运算十分迅速。因而能在笔记本电脑里试试处理视频流


``` bash
识别人脸：卷积舍弃背景 -> 卷积舍弃衣服 -> 识别人脸特征
```

还可以用 Haar 级联选出特定区域来进行后续处理

``` py
# CVND_Exercises\1_2_Convolutional_Filters_Edge_Detection\7. Haar Cascade, Face Detection.ipynb
```