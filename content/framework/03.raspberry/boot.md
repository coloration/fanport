---
title: 烧录系统
index: Framework.Raspberry.Practice
---


[下载镜像烧录工具 Raspberry PI Imager](https://www.raspberrypi.com/software/)

在配置中设置 ssh, wifi 密码. 老的 pi 用户已经被官方删掉, 如果不在这配置则无法远程登录.


## 注意事项

- WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!: 更换系统后要删除 `~/.ssh/known_hosts` 对应行

如果你连接过同一个ip下的烧录了第二次的树莓派, 可能因为记录过 ssh 登录而无法再次登录

需要根据提示消息删除 ip对应的 sha256

```
$ vi /Users/apple/.ssh/known_hosts
$ dd <lastest_row>
```

#### 2.3 flow

- 进入系统设置: `$ sudo raspi-config`
- 重启: `$ sudo reboot`
- 安装: `$ sudo apt install ffmpeg`
- 卸载: 
  - `$ sudo apt remove python`
  - `$ sudo apt autoremove`
- 软链接:
  - `$ sudo ln -s /usr/bin/python3 /usr/bin/python`
- 网络:
  - 查看可用wifi `$ sudo iwlist wlan0 scan | grep SSID`
  - 查看wifi 信道(系统地区影响信道): `$sudo iwlast wlan0 freq`





#### 3.2 链接wifi

修改sd卡根目录的 network-config 

#### 安装 docker 

```
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
```

---

比较过时的烧录方式

1. MacOS 烧录
  * 1.1 查看磁盘路径 `diskutil list` 记录路径 e.g. `/dev/disk2`
  * 1.2 取消tf卡挂载 `diskutil unmountDisk <sd_path>` 
  * 1.3 烧录镜像 `sudo dd if=<img_path> of=<sd_path> bs=1m;sync` [dd 命令](https://www.runoob.com/linux/linux-comm-dd.html)
  * 1.4 退出tf `$ diskutil eject <sd_path>`


2. 烧录树莓派系统

  * 2.1 烧录系统
    - 下载镜像: <https://www.raspberrypi.org/software/>
    - 格式化sd卡: 磁盘工具 or SD Card Formatter   

  * 2.2 开启远程 ssh 功能
    - 有系统界面的不能用这个方法
    - 第一次启动前在根目录创建 `ssh` 空文件.


  * 2.3 自动连接wifi

    - 有系统界面的不能用这个方法
    - 第一次启动前在根目录创建 `wpa_supplicant.conf` 文件.
    - 中文wifi名需要转码
      ```
      country=CN
      ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
      update_config=1
      network={
              ssid="第一个WIFI名称，优先级1"
              psk="WIFI密码"
              key_mgmt=WPA-PSK
              priority=1
      }
      network={
              ssid="第二个WIFI名称，无密码，优先级2"
              key_mgmt=NONE
              priority=2
      }


      network={
        # 中文的wifi名
        ssid=e79b9be59889e7a791e68a80
        psk="88888888"
        key_mgmt=WPA-PSK
      }
      ```

      e.g.
      

3. 烧录 ubuntu 系统

- 3.1 烧录系统
  - 安装 xz 命令 

  ``` bash
  $ xz -d xxx.img.xz
  $ sudo dd if=/Users/apple/Downloads/ubuntu-20.04.2-preinstalled-server-arm64+raspi.img of=/dev/disk3 bs=4m;sync
  ```