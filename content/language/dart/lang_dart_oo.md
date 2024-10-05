---
title: Dart OO
date: 2018-08-24
tag: 
- dart
- language
---


### Singleton

``` dart
class Singleton {
  static Singleton _s;

  static get instance => _s ?? (_s = new Singleton._internal());

  Singleton._internal () { /* code */ };
}

// get 
Singleton.instance;

// or factory
class Singleton {
  static Singleton _s;

  factory Singleton () => _s ?? (_s = new Singleton._internal());

  Singleton.internal ();
}

// get
new Singleton();
```

---