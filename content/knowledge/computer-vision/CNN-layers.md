
卷积神经网络(CNN Convolutional Neural Networks) 是深度神经网络的一种

卷积神经网络分层 

- 卷积层 Convolutional layers
- 池化层 pooling layers
  - 最大池化层 maxpooling
- 全连接层 fully-connected layers
  - 全连接（线性）层 linear
- ... others

## Convolutional Layer  卷积层

该网络中直接处理输入图像的第一层是卷积层。

- 卷积层将图像作为输入
- 卷积层由一组卷积滤波器组成
- 每个过滤器提取特定类型的特征 e.g. 高通滤波器通常用于检测对象的边缘。

给定卷积层的输出是一组特征图feature maps（也称为激活图activation maps），它们是原始输入图像的过滤版本。

卷积层是指特征映射堆栈

### Activation Function  激活函数

您可能还注意到，该图显示为“卷积 + ReLu”，ReLu 代表修正线性单元 (ReLU) 激活函数。当输入 x <= 0 时，该激活函数为零；当 x > 0 时，该激活函数与斜率 = 1 成线性。ReLu 和其他激活函数通常放置在卷积层之后，以稍微变换输出，以便更有效地执行反向传播并有效地训练网络。

<ToggleContent title="CNN简单示例" :level="3">

``` py
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):


  def __init__ (self, n_classes):
  
    super(Net, self).__init__()

    # 1 input image channel(grayscale), 32 out channels/feature maps
    # 5x5 square convolution kernel
    self.conv1 = nn.Conv2d(1, 32, 5)

    # maxpool layer
    # pool with kernel_size = 2, stride = 2
    self.pool = nn.MaxPool2d(2, 2)

    # fully-connected layer
    # 32*4 input size to account for the downsamples image size after pooling num_classes outputs (for n_classes of image data)
    self.fc1 = nn.linear(32 * 4， n_classes)

  # define the feedforward behavior
  def forward(self, x):
    
    # one conv/relu + pool layers
    x = self.pool(F.relu(self.conv1(x)))

    # prep for linear layer by flattening the feature maps into feature vectors
    x = view(x.size(0), -1)
    # linear layer
    x = F.relu(self.fc1(x))

    # final output
    return x
```

</ToggleContent>


## Pooling Layer 池化层 

过多的卷积层内的过滤器过多，可能会提取太多的特征导致过拟合。

过滤器越多意味着卷积层的维度可能会很庞大，维度越高需要更多的参数。所以降低维度数可以有效抑制过拟合


- 池化层接收图像（通常是经过过滤的图像）并输出该图像的缩小版本
- 池化层降低了输入的维度


### 最大池化层 Max Pooling layer


查看输入图像中的区域（如下图所示的 4x4 像素区域），并选择将该区域中的最大像素值保留在新的缩小尺寸区域中。

e.g. 2*2 的窗口，步长为2

``` 
single depth slice

  |1|1|2|4|                                 
  |5|6|7|8|   2x2 filters window         |6|8|
  |3|2|1|0|   and stride 2  --->         |3|4|
  |1|2|3|4|
```

每个特征映射的宽高都减小了


### 全局平均池化层 Global Average Pooling Layer

更为极端对特征映射进行池化。

``` 
  |1|1|2|4|   (1+1+2+4                              
  |5|6|7|8|   +5+6+7+8      
  |3|2|1|0|   +3+2+1+0      --->   3.125
  |1|2|3|4|   +1+2+3+4)/16
```

全局平均池化将过滤器组成的多维数组变成了单维向量


## 全连接层 Fully-Connected Layer 

将输入转换成需要形式的输出。这意味着将图像特征矩阵转换为维度为 1xC 的特征向量，其中 C 是类别数。

#### softmax

可以将任何值向量作为输入，并返回一个相同长度的向量，其值都在 (0, 1) 范围内，并且这些值加在一起将等于 1。

该函数常见于必须将特征向量转换为概率分布的分类模型。

## 防止过拟合的层

并不是CNN必要的层，但可以使用它防止网络过拟合

### Dropout Layer* 衰减层

Dropout 以某种指定的概率(e.g. 20%)随机关闭构成网络各层的感知器（节点）。

提供了一种平衡网络的方法，以便每个节点都平等地朝着相同的方向工作目标，如果犯了错误，它不会主宰我们模型的行为。

### Momentum Layer* 动量层

动量是处在0~1之间的常量 β

梯度下降难以找到全局最小值。通过添加动量帮其越过局部最小值，继续往下寻找.

距离最近的step影响越大，越远影响强度递减

> STEP(n) -> β^0*STEP(n) + β^1*STEP(n-1) + β^2*STEP(n-2)


## 如何决定网络结构




## As you learn

当您第一次学习 CNN 的分类或任何其他任务时，您可以通过处理简单的任务（例如服装分类）并快速尝试新方法来提高您对模型设计的直觉。我们鼓励您：

1. 改变卷积层的数量，看看会发生什么
2. 增加卷积核的大小以获得更大的图像
3. 更改损失/优化函数以查看模型的响应方式（尤其是更改学习率等超参数并查看会4. 发生什么 - 您将在本课程的第二个模块中了解有关超参数的更多信息）
5. 添加图层以防止过度拟合
6. 更改数据加载器的batch_size，以查看较大的批次大小对您的训练有何影响

