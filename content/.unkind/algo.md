### 计算平方根 

#### 二分法

``` py
x = 25
epsilon = 0.01
numGuesses = 0
low = 0.0
high = max(1.0, x)
ans = (high + low)/2.0
while abs(ans**2 - x) >= epsilon:
    print('low =', low, 'high =', high, 'ans =', ans)
    numGuesses += 1
    if ans**2 < x:
        low = ans
    else:
        high = ans
    ans = (high + low)/2.0
print('numGuesses =', numGuesses)
print(ans, 'is close to square root of', x)
```

#### 牛顿-拉夫森法

> 如果存在一个值guess 是多项式p的根的近似值，那么guess - p(guess)/p' (guess)就是一个更好的近似值

``` py
#利用牛顿-拉弗森法寻找平方根
#寻找x，满足x**2-24在epsilon和0之间
epsilon = 0.01
k = 24.0
guess = k/2.0
while abs(guess*guess - k) >= epsilon:
    guess = guess - (((guess**2) - k)/(2*guess))
print('Square root of', k, 'is about', guess)
```


- [Timsort 入门 - Python 的默认排序算法是 Timsort，它的表现据说好于快排（quicksort）。本文解释了这种算法的基本原理。"](https://hackernoon.com/timsort-the-fastest-sorting-algorithm-youve-never-heard-of-36b28417f399) 
- [各种算法的 Python 实现](https://github.com/TheAlgorithms/Python)
- [数据结构和算法必知必会的50个代码实](https://github.com/wangzheng0822/algo)
- [Timsort 介绍 - Timsort 是 Python、Java 等的默认排序算法，本文简要介绍这种算法。](https://skerritt.blog/timsort-the-fastest-sorting-algorithm-youve-never-heard-of/)
[算法可视化 - 该网站收集了50多种算法，每种算法都有可视化动画和示例代码。](https://algorithm-visualizer.org/)
[JavaScript 算法与数据结构（中文）](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)
[算法 开源英文电子书，作者是美国伊利诺伊大学的教师，本书是他的讲课笔记，偏重于数学](https://github.com/jeffgerickson/algorithms)
[Visu Algo 各种算法的动态演示网站。](https://visualgo.net/zh)
[algorithm-visualizer 一个直观的算法可视化工具](https://github.com/algorithm-visualizer/algorithm-visualizer)
[数据结构可视化](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- [Hash 算法简介 - Hash 算法的概念性介绍。](https://medium.com/zkcapital/the-state-of-hashing-algorithms-the-why-the-how-and-the-future-b21d5c0440de) 
- [图数据结构入门 - 图（graph）是一种数据结构，由点（vertex）和边（edge）组成。本文介绍图结构的算法基本知识。"](https://adrianmejia.com/blog/2018/05/14/data-structures-for-beginners-graphs-time-complexity-tutorial/) 
- [二叉树算法介绍：go 语言实现为例](https://about.sourcegraph.com/go/gophercon-2018-binary-search-tree-algorithms/)
[图（graph）是一种数据结构，由点（vertex）和边（edge）组成。本文介绍图结构的算法基本知识](https://adrianmejia.com/blog/2018/05/14/data-structures-for-beginners-graphs-time-complexity-tutorial/)
[SHA-256 哈希算法](https://medium.com/biffures/part-5-hashing-with-sha-256-4c2afc191c40)
[JPEG 图像还原](https://parametric.press/issue-01/unraveling-the-jpeg/)
[各种数据结构的 JavaScript 实现](https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/)
[SHA256 的实现](https://webassemblycode.com/sha256-books-implementation/)
[密码学简明教程](http://davidlowryduda.com/a-brief-notebook-on-cryptography/)
[压缩算法的解释](http://www.codersnotes.com/notes/elegance-of-deflate/)
[ZIP 压缩算法详细分析](https://www.cnblogs.com/esingchan/p/3958962.html)
[dumb-crypto 常见加密算法的实现演示。作者用容易懂的代码、详细的注释帮助读者理解这些加密算法的实现。](https://github.com/indutny/dumb-crypto)
- [GRAIL 笔迹识别算法（英文） - 这篇教程详细介绍一种手写识别算法，并且附有多个可视化示例可以操作。这篇的英语看起来有点费劲，但是耐心看一定可以看懂，因为解释得很好，也没有复杂的数学。](https://jackschaedler.github.io/handwriting-recognition/) 
  - [BitTorrent如何运作？ - 本文通俗地介绍 BT 下载的原理和算法，包括磁性链接如何运作。](https://skerritt.blog/bit-torr)
- [数据结构参考](http://www.interviewcake.com/data-structures-reference) 
- [TCP 协议的堵塞控制算法 网络数据包如果一次发送太多，就会造成网络拥堵；如果发送太少，就浪费了带宽，延长了通信时间。TCP 协议有一个拥堵窗口机制，负责动态调整每次发送数据包的数量。本文通俗地解释了这种算法的细节。](http://squidarth.com/rc/programming/networking/2018/07/18/intro-congestion.html)

