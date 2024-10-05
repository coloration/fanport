---
title: Dart FP
date: 2018-08-24
tag: 
- dart
- language
---


### Map

``` dart
var aList = new List.generate(4, (i) => new ClassA());
var bList = aList.map<ClassB>((a) => new ClassB()).toList();
```

---