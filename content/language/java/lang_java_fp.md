---
title: Java8 函数式编程
date: 2018-06-27
tag:
- java
---



### 外部迭代与内部迭代

外部迭代

``` java
int count = 0;

for (Artist artist : allArtists) {
  if (artist.isFrom("London")) {
    count++;
  }
}

// 内部代码
Iterator<Artist> iterator = allArtists.iterator();
while (iterator.hasNext()) {
  Artist artist = iterator.next();
  if (artist.isFrom("London")) {
    count++;
  }
}
```

内部迭代

``` java
int count = allArtists.stream()
            .filter(artist -> artist.isFrom("London"))
            .count();
```


> Stream 是用函数式编程方式在集合类上进行复杂操作的工具

两种迭代的对比


``` bash
应用代码         集合代码     应用代码         集合代码
|                  |          |              |
| iter             |          |              | iter
|----------|       |          |              |-------|
|hasNext() | ==>== |          | build  ==>== |       |
|hasNext   | ==<== |          |              |       |
|next()    | ==>== |          |              |       |
|element   | ==<== |          | result ==<== |       |
|----------|       |          |              |-------|
|                  |          |              |
```

### Java Stream 特点

- **惰性求值**：不产生新集合，单独调用也不会执行
- **及早求值**：最终会从 stream 产生值的方法
- 返回的是 Stream 是惰性求值，返回的是另一个值或者空是及早求值

### 常用流操作

1. collect(toList()) 

  ``` java
  List<String> collected = Stream.of("a", "b", "c")
                                 .collect(Collectors.toList());
  // Arrays.asList("a", "b", "c");
  ```

2. map (lazy)

  ``` java
  List<String> collected = Stream.of("a", "b", "hello")
                                 .map(str -> str.toUpperCase())
                                 .collect(toList())
  // asList("A", "B", "HELLO")                               
  ```

3. filter (lazy)

  ``` java
  List<String> beginningWithNumbers
  = Stream.of("a", "1abc", "abc1")
          .filter(value -> isDigit(value.charAt(0)))
          .collect(toList());

  // asList("1abc")
  ```

4. flatMap

  > flatMap 方法可用 Stream 替换值，然后将多个 Stream 连接成一个 Stream

  ``` java
  List<Integer> together = Stream.of(asList(1, 2), asList(3, 4))
                                 .flatMap(nums -> num.stream())
                                 .collect(toList());
  ```

5. max, min

  ``` java
  List<Track> tracks = asList(
    new Track("Bakai", 524),
    new Track("Violets for Your Furs", 378),
    new Track("Time Was", 451)
  );

  Track shortestTrack = 
    tracks.stream()
          .min(Comparator.comparing(track -> track.getLength()))
          .get();
  // tracks.get(1)
  ```

6. reduce

  > reduce 操作可以实现从一组值中生成一个值。count、min 和 max 方法，因为常用而被纳入标准库中。事实上，这些方法都是 reduce 操作。

  ``` java
  int count = 
    Stream.of(1, 2, 3)
    .reduce(0, (acc, element) -> acc + element);
            // (0, 1) -> 0 + 1
            // (1, 2) -> 1 + 2
            // (3, 3) -> 3 + 3
            // 6
  ```

### 整合操作

> 找出某张专辑上所有乐队的国籍?

``` java
// 1. 找出专辑上的所有表演者。  - Album.getMusicians<Stream> 获得所有表演者
// 2. 分辨出哪些表演者是乐队。  - 使用 filter 方法对表演者进行过滤，只保留乐队;
// 3. 找出每个乐队的国籍。     - 使用 map 方法将乐队映射为其所属国家;
// 4. 将找出的国籍放入一个集合。- 使用 collect(Collectors.toList()) 方法将国籍放入一个列表

Set<String> origins = 
  album.getMusicians()
  .filter(artist -> artist.getName().startsWith("The"))
  .map(artist -> artist.getNationality())
  .collect(toSet());
```

> (重构)找出长度大于 1 分钟的曲目

``` java
public Set<String> findLongTracks(List<Album> albums) { 
  Set<String> trackNames = new HashSet<>();
  for(Album album : albums) {
    for (Track track : album.getTrackList()) { 
      if (track.getLength() > 60) {
          String name = track.getName();
          trackNames.add(name);
      }
    } 
  }
  return trackNames;
}

public Set<String> findLongTracks(List<Album> albums) {
  return albums.stream()
  .flatMap(album -> album.getTarckList())
  .filter(track -> track.getLength() > 60)
  .map(track -> track.getName())
  .collect(toSet())
}
```

**高阶函数**：接受另外一个函 数作为参数，或返回一个函数的函数。
如果函数 的参数列表里包含函数接口，或该函数返回一个函数接口，那么该函数就是高阶函数
ps: Comparator 有且只有一个抽象方法，所以实际上是一个函数接口。


在 Lambda 表达式中使用局部变量， 可以不使用 final 关键字，但局部变量在既成事实上必须是 final 的。

无论何时，将 Lambda 表达式传给 Stream 上的高阶函数，都应该尽量避免副作用。唯一的 例外是 forEach 方法，它是一个终结方法。

### Chapter 3 进阶练习

java 不太熟，用js写了

``` js
// 只用 reduce 和 Lambda 表达式写出实现 Stream 上的 map 操作的代码
// 只用 reduce 和 Lambda 表达式写出实现 Stream 上的 filter 操作的代码
const map = (collect, optFunc) => 
  collect.reduce([], (acc, elt) => {
    acc.push(optFunc(elt))
    return acc
  })

const filter = (collect, optFunc) => 
  collect.reduce([], (acc, elt) => {
    optFunc(elt) && acc.push(elt)
    return acc
  })

```

多用特殊处理方法来提高性能 

``` java
.map(track -> track.getLength())
.mapToInt(track -> track.getLength())
```

简写

``` java
artist -> artist.getName /* - */ Artist::getName
(name, nationality) -> new Artist(name, nationality) /* - */ Artst::new

```


不能保证对类似 HashSet 这种没有顺序的类型做处理的时候保证顺序