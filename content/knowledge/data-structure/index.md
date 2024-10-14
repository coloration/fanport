---
title: 数据结构的 JavaScript 实现
index2: Thought.Data Structure.Practice
---

- [Data Structures in JavaScript: Arrays, HashMaps, and Lists](https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/)

|Name|Insert|Access|Search|Delete|Comments|
|:---|:---|:---|:---|:---|:---|
|Array|O(n)|O(1)|O(n)|O(n)|在最后插入O(1)|
|HashMap|O(1)|O(1)|O(1)|O(1)|Rehashing might affect insertion time|



## Array



``` ts
class MyArray<T = any> {
	array: T[] = []

	// O(n)
	insertHead(item: T) {
		this.array.unshift(item)
		return this.array
	}

	// O(1)
	insertTail(item: T) {
		this.array.push(item)
		return this.array
	}

	// O(n)
	insert(i: number, item: T) {
		this.array.splice(i, 0, item)
		return this.array
	}

	// O(1)
	access(i: number) {
		return this.array[i]
	}

	// O(n)
	search(item: T) {
		return this.array.find(o => o === item)
	}

	// O(n)
	delete(i: number) {
		this.array.splice(i, 1)
		return this.array
	}

	// O(1)
	deleteTail() {
		this.array.pop()
		return this.array
	}
	
}
```

## HashMap


