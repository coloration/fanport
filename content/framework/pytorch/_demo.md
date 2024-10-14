<ToggleContent title="Classifying Clothing Images" :level=2>

分类服饰 Fashion-MNIST dataset



``` py

INPUT_SIZE = 28 * 28
```

### 定义模型

``` py
# TODO: Define your network architecture here


```

### 预处理


### 训练模型

``` py
# TODO: Create the network,define the criterion and optimizer

```


``` py
# TODO: Train the network here
 
```


### 测试模型

``` py
dataiter = iter(testloader)
images, labels = dataiter.next()
img = images[0]

# Convert 2D image to 1D vector
img = img.resize_(1, 784)

# TODO: Calculate the class probabilities (softmax) for img
ps = 

# Plot the image and probabilities
helper.view_classify(img.resize_(1, 28, 28), ps)
```


</ToggleContent>