---
title: Dart 句法
date: 2018-08-05
tag: 
- dart
- language
---



### 注释

```dart
// 单行注释

/*
 * 多行注释
 */
```

### 条件

``` dart
if (aBoolCondition) {

}
else if (anotherBoolCondition) {

}
else {
  
}
```
---


### function

方法参数 getField

---

### import

``` dart
// 引用包 
// 包需要在 pubspec.yaml 中配置并安装才能使用
import 'package:flutter/material.dart';

// 引用其他类
import 'App.dart';
```

---

### variable

未赋值的变量默认值为 `null` 即便声明的类型为 int double

``` dart
// 可以用类型声明变量
int age = 12;
String color = 'red';

// name 被推断为 String 类型
var name = 'Misha';

// 用 dynamic 声明的变量可以改变类型 
dynamic x = '8';
x = 8;

// 用 final 声明恒量
final area = 'Asia';
final String country = 'China';
final val = returnAValue();

// 用 const 声明编译时恒量, 编译时就能确定的值，不能是函数返回值
static const a = 12 * anotherConstInt; // 类变量需要指定 static

// const 还可以指定对象不可变
// 这种方式是将变量引用和实例区分开的
// a 可以更换引用地址，但不能更换类型
var a = const [1, 2];
a[1] = 3;       // Error


a = [2, 3]      // [2, 3]
a = ['a', 'b']; // Error

```

---

### 运算符

|||
|---|---|
|一元后缀|`expr++` `expr--` `()` `[]` `.`  `?.`|
|一元前缀|`-expr` `!expr` `~expr` `++expr` `--expr`|
|乘性|`*` `/` `%` `~/`|
|加性|`+` `-`|
|位移|`<<` `>>`|
|位与|`&`|
|位或|`|`|
|位异或|`^`|
|关系与类型测试|`>=` `>` `<` `<=` `as` `is` |
|相等性|`==` `!=`|
|与|`&&`|
|或|`||`|
|判断 null| `??` |
|流式调用|`..`|
|三目|`expr1 ? expr2 : expr3`|
|赋值|`=` `*=` `/=` `~/=` `%=` `+=` `-=` `<<=` `>>=` `&=` `^=` `|=` `??=`|



``` dart
!null  // true
3 ~/ 4 // 0
4 ~/ 3  // 1

~1 // 4294967294 一元求逆 

int a;
int b = a ?? 1; // a: null b: 1;
a ??= 1;  // a: 1

3 << 1 // 0011 0110   6
3 >> 1 // 0011 0001   1
3 | 1  // 0011 | 0100 7
```

---
