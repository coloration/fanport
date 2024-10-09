---
title: OO
index: Language.Python.Snytax
---

[[toc]]

## class

```python
import datetime

class Person (object):
  def __init__ (self, name):
    self.name = name
    try: 
      lastBlank = name.rindex(' ')
      self.lastName = name[lastBlank + 1:]
    except:
      self.lastName = name
    
    self.birthday = None

  def getName (self):
    return self.name
  
  def getLastName (self):
    return self.lastName
  
  def setBirthday (self, birthdate):
    self.birthday = birthdate
  
  def getAge (self):
    if self.birthday == None:
      raise ValueError

    return (datetime.date.today() - self.birthday).days

  
  ## __lt__ 重载 < 操作符 
  def __lt__ (self, other):
    if self.lastName == other.lastName:
      return self.name < other.name
    
    return self.lastName < other.lastName


  ## str(person) 调用的方法
  def __str__ (self):
    return self.name


  ## 以双下划线开头但不以他们结尾的属性 对外不可见

me = Person('Michael Guttag')
him = Person('Barack Hussein Obama')
her = Person('Madonna')

print(him.getLastName())
him.setBirthday(datetime.date(1961, 8, 4))
her.setBirthday(datetime.date(1958, 8, 16))

print(him.getName(), 'is', him.getAge(), 'days old')
```