---
title: Pandas
index: Language.Python.Library
---

[[toc]]

## Startup

``` bash
(venv)$ pip install pandas
```

``` py
import pandas as pd
```

---

- ref: <https://pandas.pydata.org/docs/reference/index.html>

## Series

Note: 
- Series 中的数据是有序的。
- 可以将 Series 视为带有索引的一维数组。
- 索引可以是唯一的，但不是必须的。
- 数据可以是标量、列表、NumPy 数组等。

### 创建 Series

|param|type|default|desc|
|:---|:---|:---|:---|
|data|array-like, Iterable, dict, scalar value|`None`|数据源|
|index|array-like or Index (1d)|`None`|数据索引标签，如果不指定，默认从 0 开始。|
|dtype|str, numpy.dtype, ExtensionDtype|optional|数据类型|
|name |Hashable|`None`|名称|
|copy |bool|`False`|复制|


<ToggleContent title="自动分配索引创建" :level="4">

``` py
pd.Series([1, 2, 3])

#    0
# 0  1
# 1  2
# 2  3
```

</ToggleContent>



<ToggleContent title="指定索引创建" :level="4">



``` py
data = pd.Series(["Google", "Runoob", "Wiki"], index = ["x", "y", "z"])
# or
data = pd.Series({ "x": "Google", "y": "Runoob", "z": "Wiki" })

# x    Google
# y    Runoob
# z      Wiki
# dtype: object

data["x"] # => "Google"
```

</ToggleContent>


---

### 读取 Series

``` py
# by index
one = data[0]
google = data['x']
one_two = data[0:2] 

# loop

for idx, val in e.items():
  print(f"Index: {idx}, Value: {val}")

# Index: 0, Value: 1
# Index: 1, Value: 2
# Index: 2, Value: 3


```

---

### 更新 Series

``` py
data[data > 2] # 选择大于2的元素

#    0
# 2  3

np.sqrt(data) # 取平方根

# 0    1.000000
# 1    1.414214
# 2    1.732051
```

### Series 属性

``` py
# 获取索引
index = series_with_index.index

# 获取值数组
values = series_with_index.values

# 获取描述统计信息
stats = series_with_index.describe()

# 获取最大值和最小值的索引
max_index = series_with_index.idxmax()
min_index = series_with_index.idxmin()
```


## DateFrame


### 创建 DateFrame

> DataFrame( data, index, columns, dtype, copy)


<ToggleContent title="自动分配索引创建" :level="4">


``` py
pd.DataFrame(
  [['Google', 10], ['Runoob', 12], ['Wiki', 13]], 
  columns = ['Site', 'Age']
)

# or
pd.DataFrame({
  'Site':['Google', 'Runoob', 'Wiki'], 
  'Age':[10, 12, 13]
})

# or
pd.DataFrame([
  { 'Site': 'Google', 'Age': 10 },
  { 'Site': 'Runoob', 'Age': 12 },
  { 'Site': 'Wiki', 'Age': 13 },
])

#      Site  Age
# 0  Google   10
# 1  Runoob   12
# 2    Wiki   13
```
</ToggleContent>

<ToggleContent title="指定索引创建" :level="4">


``` py
pd.DataFrame({
  'Site':['Google', 'Runoob', 'Wiki'], 
  'Age':[10, 12, 13]
}, index = ['1st', '2nd', '3rd'])

#        Site  Age
# 1st  Google   10
# 2nd  Runoob   12
# 3rd    Wiki   13
```

</ToggleContent>

<ToggleContent title="外部数据源创建" :level="4">



``` py
# 从CSV文件创建 DataFrame
df_csv = pd.read_csv('example.csv')

# 从Excel文件创建 DataFrame
df_excel = pd.read_excel('example.xlsx')

# 从Json文件创建 DataFrame 扁平的json
df_json = pd.read_json('example.json') 
df_json = pd.read_json('https://jsonplaceholder.typicode.com/albums') 

```

</ToggleContent>

<ToggleContent title="使用更复杂Json数据创建" :level="4">



``` json
// nested_mix.json
{
    "school_name": "local primary school",
    "class": "Year 1",
    "info": {
      "president": "John Kasich",
      "address": "ABC road, London, UK",
      "contacts": {
        "email": "admin@e.com",
        "tel": "123456789"
      }
    },
    "students": [
    {
        "id": "A001",
        "name": "Tom",
        "math": 60,
        "physics": 66,
        "chemistry": 61
    },
    {
        "id": "A002",
        "name": "James",
        "math": 89,
        "physics": 76,
        "chemistry": 51
    },
    {
        "id": "A003",
        "name": "Jenny",
        "math": 79,
        "physics": 90,
        "chemistry": 78
    }]
}
```

``` py
import pandas as pd
import json

# 使用 Python JSON 模块载入数据
with open('nested_mix.json','r') as f:
    data = json.loads(f.read())

# 展平数据
df = pd.json_normalize(
    data,
    record_path =['students'],
    meta=[
        'class',
        ['info', 'president'],
        ['info', 'contacts', 'tel']
    ]
)

#      id   name  math  physics  chemistry   class info.president info.contacts.tel
# 0  A001    Tom    60       66         61  Year 1    John Kasich         123456789
# 1  A002  James    89       76         51  Year 1    John Kasich         123456789
# 2  A003  Jenny    79       90         78  Year 1    John Kasich         123456789
```

</ToggleContent>

<ToggleContent title="深度读取json数据创建" :level="4">


``` bash
venv$ pip install glom
```

``` py
from glom import glom

df = pd.read_json('nested_deep.json')

# json.students[n].grade.math
data = df['students'].apply(lambda row: glom(row, 'grade.math'))

```
</ToggleContent>

---

### 读取 DataFrame

``` py
# 读取行

data.loc[0] # 第一行
data.loc['1st']

# Site    Google
# Age         10

data.loc[[0, 2]] # 第一, 三行
data.loc[['1st', '3rd']]

#           Site  Age
# 0(1st)  Google   10
# 2(3rd)    Wiki   13

data.loc[0:2] # 第一, 二，三行
data.head(3)  # 返回前三行，默认返回前5行
data.tail(3)  # 返回后三行，默认返回后5行
#      Site  Age
# 0  Google   10
# 1  Runoob   12
# 2    Wiki   13

# 读取列
data['Site'] # 单列 

# 1st    Google
# 2nd    Runoob
# 3rd      Wiki

data[['Site', 'Age']] # 多列
```

---

### 更新 DataFrame


``` py
# 过滤行
old_data = data[data['Age'] > 10]

#        Site  Age
# 2nd  Runoob   12
# 3rd    Wiki   13


# 添加新列
data['Salary'] = [50000, 60000, 70000]

#        Site  Age  Salary
# 1st  Google   10   50000
# 2nd  Runoob   12   60000
# 3rd    Wiki   13   70000

# 排序
data.sort_values(by='Age', ascending=False, inplace=True)

#        Site  Age
# 3rd    Wiki   13
# 2nd  Runoob   12
# 1st  Google   10


# 重命名列
data.rename(columns={'Site': 'Full Name'}, inplace=True)

#    Full Name  Age
#1st    Google   10
#2nd    Runoob   12
#3rd      Wiki   13
```

---

### 删除 DataFrame

``` py
# 删除列
df.drop('City', axis=1, inplace=True)
```

---

### DataFrame 属性

``` py
# 获取列名
data.columns # Index(['Site', 'Age'], dtype='object')

# 获取形状（行数和列数）
data.shape #(3, 2)

# 获取索引
data.index # Index(['1st', '2nd', '3rd'], dtype='object')

# 获取描述统计信息
data.describe()

#              Age
# count   3.000000
# mean   11.666667
# std     1.527525
# min    10.000000
# 25%    11.000000
# 50%    12.000000
# 75%    12.500000
# max    13.000000

# 基本信息
data.info()

# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 3 entries, 0 to 2
# Data columns (total 2 columns):
# #   Column  Non-Null Count  Dtype
# ---  ------  --------------  -----
# 0   Site    3 non-null      object
# 1   Age     3 non-null      int64
# dtypes: int64(1), object(1)
```

---

## export

### 保存为csv `df.to_csv(path: string, index: bool)`

``` py
import pandas as pd
import datetime

date = datetime.datetime.now().strftime("%Y-%m-%d")

df = pd.DateFrame()
df.to_csv("data/report-{}.csv".format(date), index = False)
```

---

<!-- ### pd.read_table


### pd.get_dummies 

> get_dummies(data, prefix=None, prefix_sep='_', dummy_na=False, columns=None, sparse=False, drop_first=False, dtype=None)

[doc](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.get_dummies.html)


## DataFrame 

### df.drop(labels=None, axis=0, index=None, columns=None, level=None, inplace=False, errors='raise')


[doc](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.drop.html)

Drop specified labels from rows or columns


### df.replace(to_replace=None, value=None, inplace=False, limit=None, regex=False, method='pad')
 -->


## intro


### feature

- 数据清洗：处理缺失数据、重复数据等。
- 数据转换：改变数据的形状、结构或格式。
- 数据分析：进行统计分析、聚合、分组等。
- 数据可视化：通过整合 Matplotlib 和 Seaborn 等库，可以进行数据可视化。

### domain

- 数据清洗和预处理： Pandas被广泛用于清理和预处理数据，包括处理缺失值、异常值、重复值等。它提供了各种方法来使数据更适合进行进一步的分析。

- 数据分析和统计： Pandas使数据分析变得更加简单，通过DataFrame和Series的灵活操作，用户可以轻松地进行统计分析、汇总、聚合等操作。从均值、中位数到标准差和相关性分析，Pandas都提供了丰富的功能。

- 数据可视化： 将Pandas与Matplotlib、Seaborn等数据可视化库结合使用，可以创建各种图表和图形，从而更直观地理解数据分布和趋势。这对于数据科学家、分析师和决策者来说都是关键的。

- 时间序列分析： Pandas在处理时间序列数据方面表现出色，支持对日期和时间进行高效操作。这对于金融领域、生产领域以及其他需要处理时间序列的行业尤为重要。

- 机器学习和数据建模： 在机器学习中，数据预处理是非常关键的一步，而Pandas提供了强大的功能来处理和准备数据。它可以帮助用户将数据整理成适用于机器学习算法的格式。

- 数据库操作： Pandas可以轻松地与数据库进行交互，从数据库中导入数据到DataFrame中，进行分析和处理，然后将结果导回数据库。这在数据库管理和分析中非常有用。

- 实时数据分析： 对于需要实时监控和分析数据的应用，Pandas的高效性能使其成为一个强大的工具。结合其他实时数据处理工具，可以构建实时分析系统。
