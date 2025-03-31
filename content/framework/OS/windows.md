### Nvidia 显卡驱动

1. `Win` 输入 `设备管理器` - `显示适配器` 查看显卡版本号。
  - e.g. `NVIDIA GeForce GTX 1060 6GB`

2. 进入网站 <https://www.nvidia.cn/geforce/drivers/> 根据显卡型号手动搜索驱动

3. 下载 NVIDIA Studio 驱动程序。安装后打开命令行工具输入 `nvidia-smi` 查看 CUDA 版本
  - e.g. `NVIDIA-SMI 536.67 Driver Version: 536.67 CUDA Version: 12.2`


### CUDA Toolkit

1. 进入网站根据信息选择安装程序 <https://developer.nvidia.com/cuda-toolkit-archive>


### 设置快捷方式全屏打开

Chrome: `设置` - `投放，保存与分享` - `创建快捷方式`

``` bash
# 不能用 f11 或 Esc 退出
chrome --kiosk https://www.baidu.com

chrome --start-fullscreen https://www.baidu.com
```

快捷方式图标需要 `.ico` 文件