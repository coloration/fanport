---
title: Linux Tips
---


### 查看操作系统信息 

``` bash
$ cat /etc/os-release

## output >>>

# NAME="CentOS Linux"
# VERSION="7 (Core)"
# ID="centos"
# ID_LIKE="rhel fedora"
# VERSION_ID="7"
# PRETTY_NAME="CentOS Linux 7 (Core)"
# ANSI_COLOR="0;31"
# CPE_NAME="cpe:/o:centos:centos:7"
# HOME_URL="https://www.centos.org/"
# BUG_REPORT_URL="https://bugs.centos.org/"

# CENTOS_MANTISBT_PROJECT="CentOS-7"
# CENTOS_MANTISBT_PROJECT_VERSION="7"
# REDHAT_SUPPORT_PRODUCT="centos"
# REDHAT_SUPPORT_PRODUCT_VERSION="7"
```

### 查看系统架构

``` bash
$ uname -m
$ arch

# x86_64 → 64 位 x86 架构（常见于 Intel/AMD 处理器）
# aarch64 或 arm64 → 64 位 ARM 架构
# armv7l 或 armv6l → 32 位 ARM 架构（常见于树莓派等设备）
```

### 查看 CPU 信息

``` bash
$ lscpu

# Architecture:                       x86_64
# CPU op-mode(s):                     32-bit, 64-bit
# Byte Order:                         Little Endian
# Address sizes:                      43 bits physical, 48 bits virtual
# CPU(s):                             4
# On-line CPU(s) list:                0-3
# Thread(s) per core:                 1
# Core(s) per socket:                 1
# Socket(s):                          4
# NUMA node(s):                       1
# Vendor ID:                          GenuineIntel
# CPU family:                         6
# Model:                              85
# Model name:                         Montage Jintide(R) C6230R
# Stepping:                           7
# CPU MHz:                            2095.078
# BogoMIPS:                           4190.15
# Hypervisor vendor:                  VMware
# Virtualization type:                full
# L1d cache:                          128 KiB
# L1i cache:                          128 KiB
# L2 cache:                           4 MiB
# L3 cache:                           143 MiB
# NUMA node0 CPU(s):                  0-3
# ...
```

## 查看内存信息 

显示系统的内存使用情况，包括物理内存、交换内存等. `-h` 选项使输出以人类可读的格式显示（例如，GB、MB）

``` bash
$ free -h

#               total        used        free      shared  buff/cache   available
# Mem:            15G         12G        344M        107M        2.2G        2.1G
# Swap:          7.9G        8.8M        7.9G
```

``` bash
$ cat /proc/meminfo

```