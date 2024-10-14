### 推理和验证 Inference and Validation

防止过拟合（用训练数据训练的模型无法泛化到测试集上）

#### import 

``` py
%matplotlib inline
%config InlineBackend.figure_format = 'retina'

import matplotlib.pyplot as plt
import numpy as np
import time

import torch
from torch import nn, optim
from torch.nn.functional as F
from torchvision import datasets, transforms

import helper

```

#### load dataset

``` py
transform = transforms.Compose([
  transforms.ToTensor(),
  transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

trainset = datasets.FashionMNIST('F_MNIST_data/', download = True, train = True, transform = transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size = 64, shuffle = True)

testset = datasets.FashionMNIST('F_MNIST_data/', download = True, train = False, transform = transform)
testloader = torch.utils.data.DataLoader(testset, batch_size = 64, shuffle = True)

```

#### Building the network

``` py
hidden_layers = [512, 256, 128]

class Network(nn.Module):
  def __init__ (self, input_size, output_size, hidden_layers, drop_p = 0.5):
    ''' Builds a feedforward network with arbitrary hidden layers.

        Arguments
        ---------
        input_size: integer, size of the input 
        output_size: integer, size of the output layer
        hidden_layers: list of integers, the sizes of the hidden layers
        drop_p: float between 0 and 1, dropout probability
    '''
    super().__init__()

    # Add the first lay, input to a hidden layer
    self.hidden_layers = nn.ModuleList[nn.Linear(input_size, hidden_layers[0])]

    # add a veriable number of more hidden layers
    layer_sizes = zip(hidden_layers[:-1], hidden_layers[1:])
    self.hidden_layers.extend([nn.Linear(h1, h2) for h1, h2 in layer_sizes])

    self.output = nn.Linear(hidden_layers[-1], output_size)
    #### 丢弃层(dropout) 随机删除层级之间的某些连接，促使网络中的神经元学习输入数据中的各种特征。帮助网络泛化。
    self.dropout = nn.Dropout(p = drop_p) ## 丢弃概率

  def forward(self, x):
    ''' Forward pass through the network, returns the output logits'''
    # Forward through each layer in `hidden_layers`, with ReLU activation and dropout
    for linear in self.hidden_layers:
      x = F.relu(linear(x))
      x = self.dropout(x)

    x = self.output(x)

    ### softmax 返回的是概率分布，很多时候非常接近0或1。由于将数字表示为浮点数不太精确，会导致计算不稳定，并从整体上造成很多错误

    ### 对 softmax 取对数，使结果远离0,1。变成正态分布。有助于计算变得稳定起来，提高精确率。通常处理对数空间里的概率函数轻松许多（？？）
    return F.log_softmax(x, dim = 1)

```

#### Create

``` py
model = Network(784, 10, [516, 256], drop_p = 0.5)

### 使用负对数似然损失函数(negative log-likelihood loss)。与 log_softmax 对应
criterion = nn.NLLLoss()

### adam 是随机梯度下降的变体，使用了动量。比普通的随机梯度下降训练速度要快
optimizer = optim.Adam(model.parameters(), lr = 0.001)
```


#### Validation

``` py
def validation (model, testloader, criterion):
  test_loss = 0
  accuracy = 0
  for images, labels in testloader:
    images.resize_(image.shape[0], 784)

    output = model.forward(images)
    test_loss += criterion(output, labels).item()

    ps = torch.exp(output)
    equality = (labels.data == ps.max(dim = 1)[1])
    accuracy += equality.type(torch.FloatTensor).mean()

  return test_loss, accuracy
```

#### training

``` py
epochs = 2
steps = 0
running_loss = 0
print_every = 40

for e in range(epochs):

  model.train()

  for images, labels in trainloader:
    step += 1

    # Flatten images into a 784 long vector
    images.resize_(images.size()[0], 784)

    optimizer.zero_grad()

    output = model.forward(images)

    loss = criterion(output, labels)
    loss.backward()
    optimizer.step()

    running_loss += loss.item()

    if steps % print_every == 0:

      ## 使网络模型进入推理和验证模式
      ## 防止在验证时进行drop
      model.eval()

      ## 关闭所有张量的梯度， 在验证过程中我们不关心梯度. 加快验证算法
      with torch.no_grad():
        test_loss, accuracy = validation(model, testloader, criterion)


      print(
        'Epoch: {}/{}...'.format(e + 1, epochs),
        'Training Loss: {:.3f}..'.format(running_lss / print_every),
        'Test Loss: {:.3f}.. '.format(test_loss / len(testloader)),
        'Test Accuracy: {:.3f}'.format(accuracy / len(testloader))
      )

      running_loss = 0

      model.train()
```


#### Inference

``` py
model.eval()

dataiter = iter(testloader)
images, labels = dataiter.next()
img = images[0]

# Convert 2D image to 1D vector
img = img.view(1, 784)

with torch.no_grad():
  output = model.forward(img)

ps = torch.exp(output) # 求指数 log_softmax => softmax

helper.view_classify(img.view(1, 28, 28), ps, version = 'Fashion')


```


