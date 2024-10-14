``` py
transforms = transforms.Compose([
  transforms.Resize(255),
  transforms.CenterCrop(224),
  transforms.ToTensor(),
])

dataloader = torch.utils.data.DataLoader(dataset, batch_size = 32, shuffle = True)

## Looping through it, get a batch on each loop
for images, labels in dataloader:
  pass

## Get one batch
images, labels = next(iter(dataloader))
```


### data augmentation 数据扩张

为数据本身赋予随机性。e.g. 变动位置，旋转方向

``` py
train_transforms = transforms.Compose([
  transforms.RandomRotation(30),
  transforms.RandomResizedCrop(100),
  transforms.RandomHorizontalFlip(),
  transforms.ToTensor(),
  transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])
```

Note: 数据验证时，只需要缩放和剪裁图像，希望验证结果更接近模型的最终形态