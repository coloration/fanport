---
title: Dart 类型
date: 2018-08-05
tag: 
- dart
- language
---




### Number

``` dart

int x = 1;
int hex = 0xEADBEF;

1.toString() // '1'

double y = 1.1;
double exponents = 1.42e5;

3.14159.toStringAsFixed(2) // 3.14
```

---

### String

``` dart
String s1 = '单引号可以声明字符串';
String s2 = "双引号也可以声明字符串";
String s3 = 'It\'s 转义 """""" ';
String s4 = "he say: \"hola\" 转义 '''''";

// 模板字符串
// 单变量可省略花括号
String s = 'what';

String one = '你说$s'; // '你说what'
String another = '大写${s.toUpperCase()}'; // '大写WHAT'


// 字符串连接
String all = one + another // '你说what大写WHAT'

// 像JS中那样, 字符串可以作为 key 在 map 中添加和读取字符串
Map<String, String> upperLetter = {'a': 'A' };
upperLetter['b'] = 'B';
upperLetter.length; // 2
upperLetter['c'];  // null 

// 字符串转数字
int.parse('1'); // 1
double.parse('1.1'); // 1.1

// == 可判断两个字符串相等
'1' + '1' == '11';

// 多行字符串
'''
多
行
''';

"""
多
行
""";

// raw string
r'path\new';
'path\new';

var emmm = 'a'
  ' very'
  ' long'
  ' string'; // 'a very long string'
```

---

### Boolean 

true or false, dart 是类型安全的语言，所以不能用非布尔进行 if assert 等条件判断

``` dart
aString.isEmpty
aInt < 0
aNumber.isNaN

```

---


### List & Array

``` dart
var list = [1, 2];
var list = <int>[1, 2];
List<int> list = [1, 2];
var list = new List<int>(2); // [null, null]



// 读取 索引从 0 开始
list[0];     // 1
list[2];     // Index out of rang
list.length; // 2

// 设置
list[1] = 1; // [1, 1]
list[2] = 5; // Index out of rang

// ??? 莫非是动态类型列表 ???
var list = [];
var list = List();
list.addAll([1, 2]); // [1, 2]
list[0] = 'a';       // ['a', 2]
list[0] = 1.2;       // [1.2, 2]
```

### Map

``` dart
var map = { 'a': 'A' };
var map = <String, String>{ 'a' : 'A' };
Map<String, String> map = { 'a', 'A' };
var map = new Map<String, String>(); // {}

// 读取
map['a'] // 'A'
map['x'] // null
map.length // 1
// 设置
map['b'] = 'B'; // {'a': 'A', 'b': 'B'}

// 
var map = Map();
map[1] = 'A';
map['b'] = 2;
// {1: 'A', 'b': 2}
```

### Rune


### Symbol


