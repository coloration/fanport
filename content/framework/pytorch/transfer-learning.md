
> 使用预先训练的网络检测和提取图像中的特征

深度学习：庞大的数据集和庞大的神经网络相结合

用 ImageNet 训练这些网络后，这些模型作为特征检测器，在不是ImageNet的图像上效果也非常好

### Prepare

``` py
%matplotlib inline
%config InlineBackend.figure_format = 'retina'

import matplotlib.pyplot as plt
import torch
from torch import nn
from torch import optim
import torch.nn.function as F
from torchvision import datasets, transforms, models
```

### 预处理

大多数模型的图片尺寸为 224*224. 颜色通道要单独标准化。均值为`[0.485, 0.456, 0.406]`, 标准差为 `[0.229, 0.224, 0.225]`

``` py
data_dir = 'Cat_Dog_data'

model.models.densenet121(pretrained = True)
```

### 处理模型 

``` py
# 不希望训练原有模型的特征参数，只修改最后的分类器

# 冻结模型特征层的梯度计算
for param in model.parameters():
  param.requires_grad = False

# 重新定义分类器
from collections import OrderedDict
classifier = nn.Sequential(OrderedDict([
  ('fc1', nn.Linear(1024, 500)), ## 1024 来自原始model的最后的分类器的输入, `print(model)` 查看
  ('relu', nn.ReLU()),
  ('fc2', nn.Linear(500, 2)),
  ('output', nn.LogSoftmax(dim = 1))
]))

model.classifier = classifier
```

### 使用GPU训练

大多数框架都依赖CUDA在GPU上运行。GPU更擅长矩阵运算. 将张量转移到GPU上

#### 测试速度

``` py

model.to('cuda')
model.to('cpu')

for device in ['cpu', 'cuda']:
  criterion = nn.NLLLoss()
  ### 只训练分类器部分
  optimizer = optim.Adam(model.classifier.parameters(), lr = 0.001)

  model.to(device)

  for ii, (inputs, labels) in enumerate(trainloader):
    inputs, labels = inputs.to(device), labels.to(device)

    start = time.time()

    outputs = model.forward(inputs)
    loss = criterion(outputs, labels)
    loss.backward()
    optimizer.step()

    if ii == 3:
      break

    print(f"Device = {device}; Time per batch: {(time.time() - start)/3:.3f} seconds")
```

#### Fallback

``` py
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

inputs = data.to(device)
model = MyModule(...).to(device)

```