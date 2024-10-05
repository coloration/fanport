---
title: Dart VSCode 代码片段
date:  2018-08-12
tag:
- dart
- language
---


### Flutter Statefull Widget

``` json
{
  "Flutter Statefull Widget": {
    "prefix": "fltStatefullWidget",
    "body": [
      "class $1 extends StatefulWidget {",
      "  @override",
      "  createState () => new _$1State();",
      "}",
      "",
      "class _$1State extends State<$1> {",
      "",
      "  @override",
      "  build (BuildContext content) {",
      "    $3",
      "    return $4;",
      "  }",
      "}"
    ]
  }
}
```

---

### exec end

``` json
{
  "exec end": {
    "prefix": "()",
    "body": [
      "($1);",
      "$2"
    ]
  }
}
```

---